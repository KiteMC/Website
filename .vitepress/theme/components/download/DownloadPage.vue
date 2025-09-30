<script setup lang="ts">

import {getLatestStable, getVersions, getBuilds, getBranches, type ApiBuild} from "./downloadApi";
import {onMounted, ref, watch, computed} from "vue";
import DownloadVersion from "./components/DownloadVersion.vue";
import {useTranslation} from "./useTranslation";
import UiMessage from "../UiMessage.vue";
import VersionDropdown from "./components/VersionDropdown.vue";
import VersionInfoCard from "./components/VersionInfoCard.vue";
import LatestBuild from "./components/LatestBuild.vue";
import BuildCard from "./components/BuildCard.vue";
import ReleaseCard from "./components/ReleaseCard.vue";
import Pagination from "./components/Pagination.vue";
import {Icon} from "@iconify/vue";

const props = defineProps({
  owner: { 
    type: String, 
    default: 'KiteMC',
    required: true,
    validator: (value: string) => {
      if (value !== 'KiteMC') {
        console.error('Only KiteMC is allowed as owner')
        return false
      }
      return true
    }
  },
  repo: { 
    type: String, 
    default: 'SurviveX',
    required: true
  }
})

const { t } = useTranslation()

// Parameter validation
const isValidConfig = computed(() => {
  return props.owner === 'KiteMC' // Only validate owner, allow any repo
})

const configError = computed(() => {
  if (props.owner !== 'KiteMC') {
    return 'Error: Only KiteMC is allowed as owner'
  }
  return null
})

const versions = ref<string[] | null>(null)
const selectedVersion = ref<string | null>(null)
const builds = ref<ApiBuild[] | null>(null)
const latestBuild = ref<ApiBuild | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const branches = ref<string[]>([])
const releaseTags = ref<string[]>([])
const selectedBranch = ref<string | null>(null)
const releaseTag = ref<string | null>(null)

// Pagination related state
const currentPage = ref(1)
const pageSize = ref(10) // Display 10 items per page

const logoUrl = computed(() => {
  if (props.repo === 'VerifyMC') {
    return 'https://verifymc.cn-nb1.rains3.com/logo.svg'
  }
  return 'https://kite.cn-nb1.rains3.com/logo.svg'
})

const productName = computed(() => {
  return props.repo // Use repo name as product name
})

const branch = computed(() => {
  if (props.repo === 'VerifyMC') return 'master'
  if (props.repo === 'SurviveX') return 'ver/1.21.4'
  return selectedVersion.value
})

const displayBranch = computed(() => {
  if (props.repo === 'VerifyMC') return ['master']
  if (props.repo === 'SurviveX') return ['ver/1.21.4']
  return versions.value || []
})

// Pagination computed properties
const totalBuilds = computed(() => builds.value?.length || 0)
const totalPages = computed(() => Math.ceil(totalBuilds.value / pageSize.value))
const paginatedBuilds = computed(() => {
  if (!builds.value) return []
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return builds.value.slice(start, end)
})

async function loadData() {
  // Only load data when configuration is valid
  if (!isValidConfig.value) {
    console.warn('Invalid configuration:', { owner: props.owner, repo: props.repo })
    loading.value = false
    return
  }
  
  try {
    loading.value = true
    error.value = null
    console.log(`Loading data for ${props.owner}/${props.repo}`)
    
    // Get branches
    branches.value = await getBranches(props.owner, props.repo)
    selectedBranch.value = branches.value[0] || null
    
    // Get release tags
    releaseTags.value = await getVersions(props.owner, props.repo)
    releaseTag.value = releaseTags.value[0] || null
    
    if (releaseTag.value) {
      // Get build history
      builds.value = await getBuilds(releaseTag.value, props.owner, props.repo)
      if (builds.value && builds.value.length > 0) {
        latestBuild.value = builds.value[0] // Latest build
      }
    } else {
      console.warn('No release tag found, cannot fetch builds')
    }
    
    // Reset pagination to first page
    currentPage.value = 1
    
    console.log('✅ Data loaded successfully:', {
      branches: branches.value?.length || 0,
      releaseTag: releaseTag.value,
      builds: builds.value?.length || 0
    })
  } catch (err) {
    console.error('❌ Failed to load data:', err)
    error.value = err instanceof Error ? err.message : 'Loading failed'
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
watch(() => [props.owner, props.repo], loadData)

</script>

<template>
  <!-- Configuration error state -->
  <template v-if="!isValidConfig">
    <UiMessage type="error" :message="configError" />
  </template>

  <!-- Loading state -->
  <template v-else-if="loading">
    <UiMessage type="loading" :message="t('loading.versions')" />
  </template>

  <!-- Error state -->
  <template v-else-if="error">
    <UiMessage type="error" :message="error" />
  </template>

  <!-- Content display -->
  <div class="download-page" v-else-if="releaseTag || (branches && branches.length > 0)">
    <!-- Disabled version dropdown -->
    <VersionDropdown v-if="branches && branches.length > 0" v-model:selected-version="selectedBranch" :versions="branches" :disabled="true" />
    
    <!-- Version info card -->
    <VersionInfoCard v-if="releaseTag" :version="releaseTag" :product-name="productName" :branch="selectedBranch" />
    
    <!-- Latest build info -->
    <LatestBuild v-if="latestBuild && releaseTag" :build="latestBuild" :version="releaseTag" :logo-url="logoUrl" :product-name="productName" :owner="props.owner" :repo="props.repo" />
    
    <!-- Build history list -->
    <div class="builds-history" v-if="builds && builds.length > 0">
      <h2 class="history-title">{{ t('build-history') || 'Build History' }}</h2>
      <p style="color: #666; margin-bottom: 1rem;">Found {{ builds.length }} builds</p>
      <div class="builds-list">
        <!-- Use ReleaseCard for all repositories to render markdown -->
        <ReleaseCard 
          v-for="build in paginatedBuilds" 
          :key="build.build" 
          :build="build" 
          :version="releaseTag" 
          :owner="props.owner" 
          :repo="props.repo" 
        />
      </div>
      
      <!-- Pagination component -->
      <Pagination 
        v-model:currentPage="currentPage"
        :totalPages="totalPages"
        :pageSize="pageSize"
        :total="totalBuilds"
      />
    </div>
    
    <!-- No build history message -->
    <div class="no-builds" v-else-if="builds !== null">
      <UiMessage type="info" :message="t('error.builds')" />
    </div>
  </div>
  <div v-else>
    <UiMessage type="info" message="No branch or version information obtained, please try again later." />
  </div>
</template>

<style scoped lang="scss">

.switch-link {
  font-size: 14px;
  border: 1px solid var(--vp-c-divider);
  width: max-content;
  padding: 0.5rem 1rem;
  border-radius: var(--vp-border-radius);
  transition: var(--vp-anim-dur) ease-in-out background-color;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--vp-c-text-2) !important;
  margin-bottom: 2rem;
  &:hover {
    background-color: var(--vp-c-bg-elv);
  }
}

.download-page {
  animation: fadein 500ms ease forwards;
}

.builds-history {
  margin-top: 2rem;
  
  .history-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--vp-c-text-1);
  }
  
  .builds-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.no-builds {
  margin-top: 2rem;
}

@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
  }
}

</style>