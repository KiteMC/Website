---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'KiteMC'
  text: '文档'
  tagline: 'KiteMC 团队的所有项目文档'
  image:
    src: https://kite.cn-nb1.rains3.com/logo.svg
    alt: SurviveX
  actions:
    - theme: alt
      text: GitHub
      link: https://github.com/KiteMC/

features:
  - icon: S
    title: SurviveX
    details: SurviveX | 新一代 生存兼生电端
    link: ./docs/survivex/
    linkText: '开始阅读'
  - icon: V
    title: VerifyMC
    details: VerifyMC | 支持 Web 管理的实名邮箱验证插件
    link: ./docs/verifymc/
    linkText: '开始阅读'
  - icon: R
    title: Rainyun
    details: Rainyun | 新一代云服务提供商
    link: https://cloud.kitemc.com/
    linkText: '访问官网'
---

<script setup>
import Contributors from '../../.vitepress/theme/components/Contributors.vue'
</script>