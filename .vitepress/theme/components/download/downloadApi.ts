import {getVerStatus} from "./versionStatus";

// Define interfaces based on real API responses
export interface ApiCommit {
    number: string,
    hash: string,
    message: string,
    author: string,
    date: string,
    version: string
}

// Keep original ApiBuild interface for component compatibility
export interface ApiBuild {
    build: number,
    time: string,
    channel: 'default' | 'experimental',
    changes: {
        commit: string,
        summary: string,
        message: string,
        author: string
    }[],
    downloads: {
        primary: {
            name: string,
            sha256: string
        }
    }
}

export interface ApiProject {
    versions: string[]
}

export interface ApiBuilds {
    builds: ApiBuild[]
}

// New API base URL
const API_BASE = "https://api.kitemc.com/api"

// Convert API response to component required format
function convertCommitToBuild(commit: ApiCommit, repo: string): ApiBuild {
    const buildNumber = parseInt(commit.number.replace('#', ''))
    const lines = commit.message.split('\n')
    const summary = lines[0]
    const fullMessage = commit.message
    let fileName = `${repo}.zip`
    if (repo === 'VerifyMC') fileName = 'VerifyMC.jar'
    return {
        build: buildNumber,
        time: commit.date,
        channel: 'default',
        changes: [
            {
                commit: commit.hash,
                summary: summary,
                message: fullMessage,
                author: commit.author
            }
        ],
        downloads: {
            primary: {
                name: fileName,
                sha256: 'pending'
            }
        }
    }
}

export async function getVersions(owner = 'KiteMC', repo = 'SurviveX'): Promise<string[]> {
    // Try to get GitHub releases first for all repositories
    try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`)
        if (res.ok) {
            const releases = await res.json()
            if (Array.isArray(releases) && releases.length > 0) {
                return releases.map(r => r.tag_name)
            }
        }
    } catch (error) {
        console.warn(`Failed to fetch releases for ${owner}/${repo}:`, error)
    }
    
    // Fallback to specific repo logic
    if (repo === 'SurviveX') {
        return ['ver/1.21.4']
    }
    
    return ['master']
}

export async function getBuilds(version: string, owner = 'KiteMC', repo = 'SurviveX'): Promise<ApiBuild[]> {
    // Try to get GitHub releases first for all repositories
    try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`)
        if (res.ok) {
            const releases = await res.json()
            if (Array.isArray(releases) && releases.length > 0) {
                return releases.map((release, idx) => ({
                    build: release.tag_name, // Use tag as build number
                    time: release.published_at,
                    channel: 'default',
                    changes: [{
                        commit: release.tag_name,
                        summary: release.name || release.tag_name,
                        message: release.body || '',
                        author: release.author?.login || 'Unknown'
                    }],
                    downloads: {
                        primary: {
                            name: release.assets && release.assets[0] ? 
                                (release.assets[0].name.startsWith('original-') ? 
                                    release.assets[0].name.replace(/^original-/, '') : 
                                    release.assets[0].name) : 
                                `${repo}.jar`,
                            sha256: 'pending'
                        }
                    }
                }))
            }
        }
    } catch (error) {
        console.warn(`Failed to fetch releases for ${owner}/${repo}:`, error)
    }
    
    // Fallback to API commits for repositories without releases
    try {
        const url = `${API_BASE}/commits?owner=${owner}&repo=${repo}&branch=${version}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const commits = await response.json() as ApiCommit[]
        if (!commits || commits.length === 0) {
            return []
        }
        const versionCommits = commits.filter(commit => commit.version === version || version === 'master')
        const builds = versionCommits.map(commit => convertCommitToBuild(commit, repo))
        return builds.sort((a, b) => b.build - a.build)
    } catch (error) {
        console.warn(`Failed to fetch commits for ${owner}/${repo}:`, error)
        return []
    }
}

export async function getBranches(owner = 'KiteMC', repo = 'SurviveX'): Promise<string[]> {
    try {
        const res = await fetch(`${API_BASE}/branches?owner=${owner}&repo=${repo}`)
        if (res.ok) {
            const branches = await res.json()
            if (Array.isArray(branches) && branches.length > 0) {
                return branches.map(b => b.name)
            }
        }
    } catch (error) {
        console.warn(`Failed to fetch branches for ${owner}/${repo}:`, error)
    }
    
    // Fallback to default branches when API fails
    if (repo === 'SurviveX') {
        return ['ver/1.21.4']
    }
    if (repo === 'VerifyMC') {
        return ['master']
    }
    return ['main'] // Default fallback for other repos
}

export function getBuildLink(version: string, build: ApiBuild, owner = 'KiteMC', repo = 'SurviveX'): string {
    // Check if this looks like a release tag (starts with v or is from GitHub releases)
    if (version.startsWith('v') || build.build.toString().startsWith('v')) {
        // Handle as GitHub release
        let tag = version.startsWith('v') ? version : `v${version}`
        let fileName = build.downloads.primary.name
        return `https://github.com/${owner}/${repo}/releases/download/${tag}/${fileName}`
    }
    
    // Handle as commit-based download
    return `https://github.com/${owner}/${repo}/archive/${build.changes[0].commit}.zip`
}

export function getLatestStable(versions: string[]): string {
    return versions[0]
}