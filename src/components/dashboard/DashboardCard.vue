<script setup lang="ts">
defineProps<{ title: string }>()
</script>
<template>
  <v-card
    tag="section"
    class="dashboard-card"
    elevation="0"
    :aria-label="title"
  >
    <h2>{{ title }}</h2>
    <slot />
  </v-card>
</template>
<style scoped>
.dashboard-card {
  padding: 18px 24px;
  border-radius: 11px;
  background: rgb(var(--v-theme-surface));
  color: white;
  height: 100%;
}
h2 {
  margin: 0 0 20px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
}
@media (max-width: 600px) {
  .dashboard-card {
    padding: 18px;
  }
}
</style>
