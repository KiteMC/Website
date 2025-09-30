<script setup lang="ts">
import { ApiBuild, getBuildLink } from "../downloadApi";
import { Icon } from "@iconify/vue";
import { useDateFormat, useTimeAgo } from "@vueuse/core";
import { computed } from "vue";
import Markdown from "../../Markdown.vue";

const props = defineProps<{
  build: ApiBuild,
  version: string,
  owner?: string,
  repo?: string
}>()

// Handle release information, render as markdown if message contains markdown patterns
const commitMessage = props.build.changes[0]?.message || ''
const commitSummary = props.build.changes[0]?.summary || ''

// Check if the message should be rendered as markdown
// Detect markdown patterns like bullet points, headers, or multi-line structured content
const shouldRenderAsMarkdown = computed(() => {
  if (!commitMessage || commitMessage === commitSummary) return false
  
  // Check for common markdown patterns
  const markdownPatterns = [
    /^\s*[-*+]\s+/m, // Bullet points
    /^\s*\d+\.\s+/m, // Numbered lists
    /^\s*#{1,6}\s+/m, // Headers
    /`[^`]+`/, // Inline code
    /\*\*[^*]+\*\*/, // Bold text
    /\*[^*]+\*/, // Italic text
    /^\s*>\s+/m, // Blockquotes
  ]
  
  return markdownPatterns.some(pattern => pattern.test(commitMessage))
})
</script>

<template>
  <div class="build-card">
    <h2>
      <span style="color: var(--vp-c-text-2)">#</span>
      {{ build.build }}
    </h2>

    <!-- Render commit message as markdown if it contains markdown patterns -->
    <div class="release-body" v-if="shouldRenderAsMarkdown">
      <Markdown :content="commitMessage" />
    </div>
    
    <!-- Otherwise display original commit format -->
    <div class="commits-list" v-else>
      <div class="commit" v-for="commit in build.changes">
        <div class="commit-header">
          <a target="_blank" :href="`https://github.com/${owner || 'KiteMC'}/${repo || 'SurviveX'}/commit/${commit.commit}`">
            <code>{{ commit.commit.slice(0, 7) }}</code>
          </a>
          <span class="commit-summary">{{ commit.summary }}</span>
        </div>
        <div class="commit-details" v-if="commit.message !== commit.summary">
          <div class="commit-message">{{ commit.message }}</div>
        </div>
      </div>
    </div>

    <div class="build-info">
      <span class="date">
        <Icon icon="lucide:clock-4" />
        {{ useDateFormat(build.time, "DD.MM.YYYY HH:mm") }}
        ({{ useTimeAgo(build.time) }})
      </span>
      
      <span class="author" v-if="build.changes[0]?.author">
        <Icon icon="lucide:user" />
        {{ build.changes[0].author }}
      </span>
    </div>

    <a class="file" :href="getBuildLink(version, build, owner, repo)">
      <Icon icon="lucide:file-box" class="file-icon" />
      {{ build.downloads.primary.name }}
    </a>
  </div>
</template>

<style scoped lang="scss">
.build-card {
  background-color: var(--vp-c-bg-alt);
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.75rem;
  border-radius: var(--vp-border-radius);
  border: 1px solid var(--vp-c-divider);
  animation: fadein 150ms ease-in-out forwards;
  transition: var(--vp-anim-dur) ease-in-out all;

  &:hover {
    border: 1px solid var(--vp-c-brand-1);
    transform: translateY(-4px);
  }

  h2 {
    border-top: unset;
    border-bottom: 1px solid var(--vp-c-divider);
    margin: 0;
    padding: 0 0 0.1rem 0;
  }

  .release-body {
    :deep(h1), :deep(h2), :deep(h3) {
      margin-top: 0;
      border: none;
      padding: 0;
    }
    
    :deep(p) {
      margin: 0.5rem 0;
    }
    
    :deep(ul), :deep(ol) {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
    }
    
    :deep(code) {
      background-color: var(--vp-c-bg);
      padding: 0.1rem 0.3rem;
      border-radius: 3px;
    }
    
    :deep(pre) {
      background-color: var(--vp-c-bg);
      padding: 1rem;
      border-radius: var(--vp-border-radius);
      overflow-x: auto;
    }
  }

  .build-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    
    .date, .author {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: var(--vp-c-text-2);
      font-size: 0.9rem;
      
      a {
        color: var(--vp-c-brand-1);
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .commits-list {
    .commit {
      .commit-header {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 0.25rem;
        
        a {
          text-decoration: none;
          flex-shrink: 0;
        }
        
        .commit-summary {
          font-weight: 500;
        }
      }
      
      .commit-details {
        margin-left: 2.5rem;
        margin-top: 0.25rem;
        
        .commit-message {
          color: var(--vp-c-text-2);
          font-size: 0.9rem;
          white-space: pre-line;
          line-height: 1.4;
        }
      }
    }
  }

  .file {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--vp-c-brand-1);
    text-decoration-color: var(--vp-c-brand-soft);
    transition: var(--vp-anim-dur) ease-in-out;
    padding: 0 4rem 0 0;
    width: max-content;
    &:hover {
      text-decoration-color: var(--vp-c-brand-1);
      filter: brightness(1.4);
      transform: translate(2px, -1px);
    }
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>