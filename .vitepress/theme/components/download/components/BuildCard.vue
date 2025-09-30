<script setup lang="ts">

import {ApiBuild, getBuildLink} from "../downloadApi";
import { Icon } from "@iconify/vue";
import {useDateFormat, useTimeAgo} from "@vueuse/core";

const props = defineProps<{
  build: ApiBuild,
  version: string,
  owner?: string,
  repo?: string
}>()

</script>

<template>
  <div class="build-card">

    <h2>
      <span style="color: var(--vp-c-text-2)">#</span>
{{ build.build }}
    </h2>

    <div class="commits-list">
      <div class="commit" v-for="commit in build.changes">
        <div class="commit-header">
          <a target="_blank" :href="'https://github.com/KiteMC/SurviveX/commit/' + commit.commit">
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
      
      <span class="author" v-if="build.changes[0]?.commit">
        <Icon icon="lucide:user" />
        <a target="_blank" :href="'https://github.com/KiteMC/SurviveX/commit/' + build.changes[0].commit">
          {{ build.changes[0]?.author || 'Unknown' }}
        </a>
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