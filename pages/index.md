---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'KiteMC'
  text: 'Documentation'
  tagline: 'Documentation for all KiteMC team projects'
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
    details: SurviveX | Next-generation survival and technical server
    link: ./docs/survivex/
    linkText: 'Start Reading'
  - icon: V
    title: VerifyMC
    details: VerifyMC | Real-name Email Verification Plugin with Web-based Management
    link: ./docs/verifymc/
    linkText: 'Start Reading'
  - icon: R
    title: Rainyun
    details: Rainyun | Next-generation cloud service provider
    link: https://cloud.kitemc.com/
    linkText: 'Visit Website'
---

<script setup>
import Contributors from '../.vitepress/theme/components/Contributors.vue'
</script>