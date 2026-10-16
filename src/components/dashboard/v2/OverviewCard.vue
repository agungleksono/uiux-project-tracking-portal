<script setup lang="ts">
import AssetIcon from '@/components/common/AssetIcon.vue'
defineProps<{ title: string; icon?: string }>()
</script>
<template>
  <v-card tag="section" class="overview-card" :aria-label="title">
    <h2>
      <AssetIcon v-if="icon" :src="icon" :size="24" /><slot name="icon" />{{
        title
      }}
    </h2>
    <slot />
  </v-card>
</template>
<style scoped>
.overview-card.v-card {
  background: white;
  color: #102955;
  border-radius: 11px;
  padding: 14px 18px;
  min-width: 0;
  border: 1px solid #e5ecf7;
  box-shadow:
    0 10px 26px rgba(24, 57, 106, 0.18),
    0 3px 8px rgba(24, 57, 106, 0.12);
}
h2 {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 10px;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 700;
}
</style>
