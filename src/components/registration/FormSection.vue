<script setup lang="ts">
defineProps<{ title: string }>()
</script>
<template>
  <v-card class="form-section" tag="section" :aria-label="title"
    ><div class="section-heading">
      <h2>{{ title }}</h2>
      <slot name="action" />
    </div>
    <slot
  /></v-card>
</template>
<style scoped>
.form-section.v-card {
  padding: 20px 24px;
  border-radius: 9px;
  background: white;
  color: #102955;
  border: 1px solid #e5ecf7;
  box-shadow:
    0 7px 18px #18396a1c,
    0 2px 5px #18396a14;
}
.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 14px;
}
h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}
@media (max-width: 600px) {
  .form-section.v-card {
    padding: 16px;
  }
}
</style>
