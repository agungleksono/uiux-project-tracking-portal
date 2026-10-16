<script setup lang="ts">
withDefaults(defineProps<{ src: string; size?: number | string }>(), {
  size: 22,
})
</script>
<template>
  <img
    :src="src"
    alt=""
    aria-hidden="true"
    :style="{ width: size + 'px', height: size + 'px' }"
    class="asset-icon"
  />
</template>
<style scoped>
.asset-icon {
  display: inline-block;
  object-fit: contain;
  flex-shrink: 0;
  vertical-align: middle;
}
</style>
