<script setup lang="ts">
import { useId } from 'vue'
const file = defineModel<File | null>({ default: null })
defineProps<{ label: string; compact?: boolean }>()
const emit = defineEmits<{ change: [] }>()
const id = useId()
function select(event: Event) {
  file.value = (event.target as HTMLInputElement).files?.[0] ?? null
  emit('change')
}
</script>
<template>
  <div class="file-picker">
    <label :for="id" :class="{ compact }">
      <span v-if="compact" class="attach-icon" aria-hidden="true">+</span>
      <span v-else>Browse</span>
      <input :id="id" type="file" :aria-label="label" @change="select" />
    </label>
    <span class="file-name" :title="file?.name">{{
      file?.name ?? (compact ? '' : 'No file selected')
    }}</span>
  </div>
</template>
<style scoped>
.file-picker {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}
label {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #3e6597;
  border-radius: 4px;
  min-height: 38px;
  padding: 0 22px;
  color: white;
  font-size: 13px;
  cursor: pointer;
  flex-shrink: 0;
}
label:focus-within {
  outline: 3px solid #66bcff;
  outline-offset: 3px;
}
input {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}
.compact {
  background: transparent;
  padding: 0;
  min-width: 32px;
}
.attach-icon {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #081c46;
  font-size: 18px;
}
.file-name {
  font-size: 13px;
  color: #1671e4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 180px;
}
</style>
