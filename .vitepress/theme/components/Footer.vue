<script setup>
// Footer component for VitePress
</script>

<style scoped>
.vp-footer {
  border-top: 1px solid var(--vp-c-divider);
  padding: 24px 24px;
  background-color: var(--vp-c-bg);
}

.vp-footer-content {
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
  text-align: center;
}

.vp-footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.vp-footer-links a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.vp-footer-links a:hover {
  color: var(--vp-c-brand);
}

@media (max-width: 640px) {
  .vp-footer {
    padding: 16px 16px;
  }
  
  .vp-footer-links {
    flex-direction: column;
    gap: 8px;
  }
}
</style> 