<script setup lang="ts">
import { useRouter } from 'vue-router'
import RegistrationTypeSelect from '@/components/registration/RegistrationTypeSelect.vue'

const router = useRouter()

function selectSearch(value: boolean) {
  if (value) void router.push({ name: 'trademark-search' })
  else void router.push({ name: 'trademark-form' })
}
</script>
<template>
  <section class="trademark-page" aria-labelledby="trademark-heading">
    <h1 id="trademark-heading">New Registration</h1>
    <v-card class="trademark-card">
      <RegistrationTypeSelect class="type-select" />
      <fieldset>
        <legend>
          Would you like to conduct a search before register the application?
        </legend>
        <div class="search-actions">
          <v-btn variant="flat" color="primary" @click="selectSearch(true)"
            >Yes</v-btn
          >
          <v-btn variant="outlined" color="primary" @click="selectSearch(false)"
            >No</v-btn
          >
        </div>
      </fieldset>
    </v-card>
  </section>
</template>
<style scoped>
.trademark-page {
  padding: 12px 4px 24px;
  color: #102955;
}
h1 {
  margin: 0 0 34px;
  font-size: 34px;
  font-weight: 700;
  line-height: 1.25;
}
.trademark-card.v-card {
  padding: 34px;
  min-height: 280px;
  background: white;
  color: inherit;
  border-radius: 11px;
  border: 1px solid #e5ecf7;
  box-shadow: 0 6px 20px #18396a0d;
}
.type-select {
  max-width: 580px;
  margin-bottom: 34px;
}
fieldset {
  border: 0;
  padding: 0;
  min-width: 0;
}
legend {
  font-size: 17px;
  margin-bottom: 28px;
  line-height: 1.5;
}
.search-actions {
  display: flex;
  gap: 16px;
}
.search-actions .v-btn {
  min-width: 142px;
  height: 50px;
  text-transform: none;
  font-size: 16px;
  letter-spacing: 0;
  border-radius: 6px;
}
@media (max-width: 600px) {
  h1 {
    font-size: 27px;
    margin-bottom: 24px;
  }
  .trademark-card.v-card {
    padding: 22px;
  }
  .search-actions .v-btn {
    min-width: 0;
    flex: 1;
  }
  .trademark-page {
    padding-inline: 0;
  }
}
</style>
