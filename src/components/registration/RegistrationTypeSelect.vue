<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { registrationTypes } from '@/data/registrations'
import type { RegistrationType } from '@/types/registration'
const route = useRoute()
const router = useRouter()
const notice = ref('')
const selectedType = computed(() =>
  route.name === 'patent-registration'
    ? 'Patent'
    : route.name === 'trademark-registration' ||
        route.name === 'trademark-search' ||
        route.name === 'trademark-form'
      ? 'Trademark'
      : null,
)
function selectType(value: RegistrationType | null) {
  if (!value) return
  if (value === 'Patent') void router.push({ name: 'patent-registration' })
  else if (value === 'Trademark')
    void router.push({ name: 'trademark-registration' })
  else notice.value = value + ' registration is not available yet.'
}
</script>
<template>
  <div class="type-selector">
    <v-select
      :model-value="selectedType"
      :items="registrationTypes"
      aria-label="New Registration For"
      placeholder="New registration for ..."
      variant="outlined"
      bg-color="white"
      color="primary"
      hide-details
      menu-icon="mdi-chevron-right"
      @update:model-value="selectType"
    />
    <v-snackbar
      :model-value="!!notice"
      :timeout="4000"
      @update:model-value="notice = ''"
      >{{ notice }}</v-snackbar
    >
  </div>
</template>
<style scoped>
.type-selector {
  width: 100%;
  max-width: 448px;
}
:deep(.v-field) {
  border-radius: 8px;
  font-size: 16px;
}
:deep(.v-field__outline) {
  color: #cbdaf0;
  --v-field-border-opacity: 1;
}
:deep(.v-field__input) {
  min-height: 48px;
}
</style>
