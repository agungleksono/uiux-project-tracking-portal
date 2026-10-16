<script setup lang="ts">
import { useId } from 'vue'
const model = defineModel<string>({ default: '' })
withDefaults(
  defineProps<{
    label: string
    placeholder?: string
    options?: string[]
    type?: 'text' | 'date' | 'number'
    deadline?: boolean
    required?: boolean
  }>(),
  { type: 'text', placeholder: undefined, options: undefined },
)
const id = useId()
</script>
<template>
  <div class="form-field" :class="{ deadline }">
    <label :for="id"
      >{{ label }} <span v-if="required" class="required">*</span></label
    >
    <v-select
      v-if="options"
      :id="id"
      v-model="model"
      :items="options"
      :placeholder="placeholder"
      :aria-label="label"
      variant="outlined"
      density="compact"
      hide-details
    />
    <v-text-field
      v-else
      :id="id"
      v-model="model"
      :type="type"
      :min="type === 'number' ? 0 : undefined"
      :placeholder="placeholder"
      :aria-label="label"
      variant="outlined"
      density="compact"
      hide-details
    />
  </div>
</template>
<style scoped>
.form-field {
  min-width: 0;
}
label {
  display: block;
  color: #234d90;
  font-size: 14px;
  margin-bottom: 8px;
}
.required {
  color: #ff2638;
}
:deep(.v-field) {
  border-radius: 5px;
  font-size: 14px;
}
:deep(.v-field__outline) {
  color: #c8d9f1;
  --v-field-border-opacity: 1;
}
:deep(.v-field__input) {
  min-height: 42px;
}
:deep(input::placeholder) {
  color: #7d93b6;
  opacity: 1;
}
.deadline :deep(.v-field__outline) {
  color: #ff717b;
}
</style>
