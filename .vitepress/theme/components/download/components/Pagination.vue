<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  pageSize: number
  total: number
}>()

const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

// Calculate visible page range
const visiblePages = computed(() => {
  const current = props.currentPage
  const total = props.totalPages
  const pages: number[] = []
  
  if (total <= 7) {
    // If total pages <= 7, show all page numbers
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Complex logic: show first page, last page and pages around current page
    if (current <= 4) {
      // Current page is at the front, show 1-5 ... total
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push(-1) // -1 represents ellipsis
      pages.push(total)
    } else if (current >= total - 3) {
      // Current page is at the back, show 1 ... (total-4)-total
      pages.push(1)
      pages.push(-1)
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      // Current page is in the middle, show 1 ... (current-1) current (current+1) ... total
      pages.push(1)
      pages.push(-1)
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push(-1)
      pages.push(total)
    }
  }
  
  return pages
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page)
  }
}

const goToPrevPage = () => {
  if (props.currentPage > 1) {
    goToPage(props.currentPage - 1)
  }
}

const goToNextPage = () => {
  if (props.currentPage < props.totalPages) {
    goToPage(props.currentPage + 1)
  }
}
</script>

<template>
  <div class="pagination" v-if="totalPages > 1">
    <div class="pagination-info">
      Page {{ currentPage }} of {{ totalPages }}, {{ total }} items total
    </div>
    
    <div class="pagination-controls">
      <!-- Previous page -->
      <button 
        class="pagination-btn"
        :class="{ disabled: currentPage <= 1 }"
        @click="goToPrevPage"
        :disabled="currentPage <= 1"
      >
        <Icon icon="lucide:chevron-left" />
        Previous
      </button>
      
      <!-- Page number buttons -->
      <div class="page-numbers">
        <template v-for="page in visiblePages" :key="page">
          <button
            v-if="page === -1"
            class="pagination-btn ellipsis"
            disabled
          >
            ...
          </button>
          <button
            v-else
            class="pagination-btn page-btn"
            :class="{ active: page === currentPage }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </template>
      </div>
      
      <!-- Next page -->
      <button 
        class="pagination-btn"
        :class="{ disabled: currentPage >= totalPages }"
        @click="goToNextPage"
        :disabled="currentPage >= totalPages"
      >
        Next
        <Icon icon="lucide:chevron-right" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  margin-top: 2rem;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  
  .pagination-info {
    color: var(--vp-c-text-2);
    font-size: 0.9rem;
  }
  
  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .pagination-btn {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    border-radius: var(--vp-border-radius);
    cursor: pointer;
    transition: var(--vp-anim-dur) ease-in-out all;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.9rem;
    
    &:hover:not(.disabled):not(:disabled) {
      border-color: var(--vp-c-brand-1);
      background: var(--vp-c-bg-soft);
    }
    
    &.active {
      background: var(--vp-c-brand-1);
      border-color: var(--vp-c-brand-1);
      color: white;
    }
    
    &.disabled,
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    &.ellipsis {
      border: none;
      background: transparent;
      cursor: default;
    }
  }
  
  .page-numbers {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    
    .page-btn {
      min-width: 2.5rem;
      justify-content: center;
    }
  }
}

@media (max-width: 768px) {
  .pagination {
    .pagination-controls {
      flex-direction: column;
      gap: 1rem;
    }
    
    .page-numbers {
      order: -1;
    }
  }
}
</style>