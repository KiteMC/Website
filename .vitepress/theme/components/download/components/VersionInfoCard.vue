<script setup lang="ts">

import {getVerStatus} from "../versionStatus";
import {useTranslation} from "../useTranslation";
import {Icon} from "@iconify/vue";
import Markdown from "../../Markdown.vue";
import { computed } from 'vue'

const props = defineProps<{
  version: string,
  productName?: string,
  branch?: string
}>()
const { t } = useTranslation()

function renderStatusText() {
  const statusKey = getVerStatus(props.version).name
  const raw = t.value('versionStatus.' + statusKey)
  return raw.replaceAll('{productName}', props.productName || 'SurviveX')
}

const mcVersion = computed(() => {
  if (props.productName === 'VerifyMC') return 'master'
  return props.branch || props.version
})
</script>

<template>
  <div :class="['dl-version-tag', getVerStatus(version).cssClass]">
    <Icon :icon="getVerStatus(version).icon" />
    <Markdown class="md-description" :content="renderStatusText()" :unwrap="true" />
  </div>
</template>

<style scoped lang="scss">
@use "../statusColors";

.dl-version-tag {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: var(--vp-border-radius);
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--status-color-soft);
  color: var(--status-color-1);
  transition: 100ms ease-in-out border;
  &:hover {
    border: 1px solid var(--status-color-1);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    color: var(--status-color-1);
  }

  .md-description {
    p {
      padding: 0 !important;
      margin: 0 !important;
      display: none;
    }
  }
}

.branch-label {
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  padding: 0.25em 0.75em;
  font-size: 1em;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  margin-right: 1em;
}
</style>