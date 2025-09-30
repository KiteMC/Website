import express from 'express';
import axios from 'axios';
import cors from 'cors';

console.log('GITHUB_TOKEN:', process.env.GITHUB_TOKEN);

const app = express();
const PORT = 3000;

app.use(cors());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Get all commits from SurviveX ver/1.21.4 branch
app.get('/api/commits', async (req, res) => {
  try {
    // You can customize repository and branch through query parameters
    const owner = req.query.owner || 'KiteMC';
    const repo = req.query.repo || 'SurviveX';
    const branch = req.query.branch || 'ver/1.21.4';

    // Special handling for VerifyMC: get the latest release tag
    let releaseTag = null;
    if (repo === 'VerifyMC') {
      const releasesUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;
      const releasesRes = await axios.get(releasesUrl, {
        headers: {
          'User-Agent': 'SurviveX-Commit-API',
          ...(GITHUB_TOKEN ? { 'Authorization': `token ${GITHUB_TOKEN}` } : {})
        }
      });
      if (Array.isArray(releasesRes.data) && releasesRes.data.length > 0) {
        releaseTag = releasesRes.data[0].tag_name;
      }
    }

    // Get all commits (paginated, maximum 100 per page)
    let page = 1;
    let allCommits = [];
    while (true) {
      const url = `https://api.github.com/repos/${owner}/${repo}/commits?sha=${branch}&per_page=100&page=${page}`;
      const headers = {
        'User-Agent': 'SurviveX-Commit-API'
      };
      if (GITHUB_TOKEN) {
        headers['Authorization'] = `token ${GITHUB_TOKEN}`;
      }
      const { data } = await axios.get(url, { headers });
      if (data.length === 0) break;
      allCommits = allCommits.concat(data);
      if (data.length < 100) break;
      page++;
    }

    // Latest commit has the highest number
    const result = allCommits.map((commit, idx) => ({
      number: `#${allCommits.length - idx}`,
      hash: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      version: repo === 'VerifyMC' && releaseTag ? releaseTag : branch // Use actual branch name
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get repository branches list
app.get('/api/branches', async (req, res) => {
  try {
    const owner = req.query.owner || 'KiteMC';
    const repo = req.query.repo || 'SurviveX';
    const url = `https://api.github.com/repos/${owner}/${repo}/branches`;
    const headers = {
      'User-Agent': 'SurviveX-Commit-API'
    };
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }
    const { data } = await axios.get(url, { headers });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
}); 