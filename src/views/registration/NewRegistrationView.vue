<script setup lang="ts">
import { computed, ref } from 'vue'
import RegistrationTypeSelect from '@/components/registration/RegistrationTypeSelect.vue'
import AssetIcon from '@/components/common/AssetIcon.vue'
import eyeIcon from '@/assets/icons/eye-solid-full.svg'
import { registrations } from '@/data/registrations'
import type { Registration } from '@/types/registration'

const selectedRegistration = ref<Registration | null>(null)
const page = ref(1)
const pageSize = 10
const pageCount = computed(() =>
  Math.max(1, Math.ceil(registrations.length / pageSize)),
)
const visibleRegistrations = computed(() =>
  registrations.slice((page.value - 1) * pageSize, page.value * pageSize),
)
const firstResult = computed(() =>
  registrations.length ? (page.value - 1) * pageSize + 1 : 0,
)
const lastResult = computed(() =>
  Math.min(page.value * pageSize, registrations.length),
)
</script>

<template>
  <section class="registration-page" aria-labelledby="registration-heading">
    <h1 id="registration-heading">New Registration</h1>
    <RegistrationTypeSelect class="registration-type" />

    <v-card class="registrations-card" aria-label="New registrations">
      <div
        class="table-scroll"
        tabindex="0"
        aria-label="Registration list, scroll horizontally on small screens"
      >
        <table class="registrations-table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Application</th>
              <th scope="col">AFFA Ref</th>
              <th scope="col">Your Ref</th>
              <th scope="col">Instruction Date</th>
              <th scope="col">Title/Trademark</th>
              <th scope="col" class="action-column">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(registration, index) in visibleRegistrations"
              :key="registration.id"
            >
              <td>{{ firstResult + index }}</td>
              <td>{{ registration.application }}</td>
              <td>{{ registration.affaReference }}</td>
              <td>{{ registration.clientReference }}</td>
              <td>{{ registration.instructionDate }}</td>
              <td>{{ registration.title }}</td>
              <td class="action-column">
                <v-btn
                  class="view-registration"
                  variant="flat"
                  :aria-label="'View ' + registration.title"
                  @click="selectedRegistration = registration"
                >
                  <AssetIcon :src="eyeIcon" :size="24" />
                </v-btn>
              </td>
            </tr>
            <tr v-if="!registrations.length">
              <td colspan="7" class="empty-state">No registrations yet.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <footer class="table-footer">
        <p aria-live="polite">
          Showing {{ firstResult }} to {{ lastResult }} of
          {{ registrations.length }} results
        </p>
        <nav class="pagination" aria-label="Registration pages">
          <v-btn
            icon="mdi-chevron-left"
            variant="outlined"
            :disabled="page === 1"
            aria-label="Previous page"
            @click="page--"
          />
          <v-btn
            color="primary"
            variant="flat"
            aria-current="page"
            :aria-label="'Page ' + page"
            >{{ page }}</v-btn
          >
          <v-btn
            icon="mdi-chevron-right"
            variant="outlined"
            :disabled="page === pageCount"
            aria-label="Next page"
            @click="page++"
          />
        </nav>
      </footer>
    </v-card>

    <v-dialog
      :model-value="!!selectedRegistration"
      max-width="560"
      @update:model-value="selectedRegistration = null"
    >
      <v-card v-if="selectedRegistration" title="Registration details">
        <v-card-text>
          <dl class="registration-details">
            <dt>Application</dt>
            <dd>{{ selectedRegistration.application }}</dd>
            <dt>AFFA Ref</dt>
            <dd>{{ selectedRegistration.affaReference }}</dd>
            <dt>Your Ref</dt>
            <dd>{{ selectedRegistration.clientReference }}</dd>
            <dt>Instruction Date</dt>
            <dd>{{ selectedRegistration.instructionDate }}</dd>
            <dt>Title/Trademark</dt>
            <dd>{{ selectedRegistration.title }}</dd>
          </dl>
        </v-card-text>
        <v-card-actions
          ><v-btn @click="selectedRegistration = null"
            >Close</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-dialog>
  </section>
</template>

<style scoped>
.registration-page {
  padding: 12px 4px 30px;
  color: #12366d;
}
h1 {
  margin: 0 0 24px;
  font-size: 34px;
  line-height: 1.25;
  font-weight: 700;
  color: #102e61;
}
.registration-type {
  max-width: 448px;
  margin-bottom: 26px;
}
.registration-type :deep(.v-field) {
  border-radius: 9px;
  box-shadow: 0 2px 8px #143c6c0c;
  font-size: 18px;
}
.registration-type :deep(.v-field__outline) {
  color: #dce6f5;
  --v-field-border-opacity: 1;
}
.registration-type :deep(.v-field__input) {
  min-height: 54px;
  padding-left: 22px;
}
.registration-type :deep(input::placeholder) {
  color: #8799ba;
  opacity: 1;
}
.registrations-card.v-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid #e5edf9;
  border-radius: 11px;
  background: white;
  color: inherit;
  box-shadow:
    0 10px 26px rgba(24, 57, 106, 0.18),
    0 3px 8px rgba(24, 57, 106, 0.12);
}
.table-scroll {
  overflow-x: auto;
}
.registrations-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  white-space: nowrap;
  font-size: 17px;
  text-align: left;
}
.registrations-table th {
  font-size: 16px;
  font-weight: 700;
  background: #edf4ff;
  padding: 14px 18px;
  color: #0e2d65;
}
.registrations-table td {
  padding: 12px 18px;
  height: 65px;
}
.registrations-table tbody tr:nth-child(even) {
  background: #f4f8ff;
}
.registrations-table tr > :first-child {
  border-radius: 5px 0 0 5px;
}
.registrations-table tr > :last-child {
  border-radius: 0 5px 5px 0;
}
.action-column {
  text-align: center;
}
.view-registration.v-btn {
  min-width: 42px;
  width: 42px;
  height: 42px;
  padding: 0;
  border-radius: 8px;
  background: #e8f1ff;
}
.view-registration :deep(img) {
  filter: invert(15%) sepia(46%) saturate(1500%) hue-rotate(185deg);
}
.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-top: 1px solid #e3ebf7;
  padding-top: 16px;
  margin-top: 20px;
}
.table-footer p {
  margin: 0;
  font-size: 17px;
}
.pagination {
  display: flex;
  gap: 9px;
}
.pagination .v-btn {
  min-width: 46px;
  width: 46px;
  height: 46px;
  border-radius: 8px;
  font-size: 18px;
}
.pagination .v-btn--variant-outlined {
  border-color: #dce6f5;
}
.empty-state {
  text-align: center;
  color: #6b80a2;
}
.registration-details {
  display: grid;
  grid-template-columns: 145px minmax(0, 1fr);
  gap: 14px;
  color: #12366d;
}
.registration-details dt {
  font-weight: 700;
}
.registration-details dd {
  margin: 0;
  overflow-wrap: anywhere;
}
@media (max-width: 700px) {
  .registration-page {
    padding: 5px 0 16px;
  }
  h1 {
    font-size: 27px;
    margin-bottom: 20px;
  }
  .registration-type {
    max-width: 100%;
  }
  .registration-type :deep(.v-field) {
    font-size: 16px;
  }
  .registrations-card.v-card {
    padding: 16px;
  }
  .registrations-table {
    font-size: 14px;
  }
  .registrations-table th {
    font-size: 14px;
  }
  .table-footer {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
    padding-top: 16px;
  }
  .table-footer p {
    font-size: 14px;
  }
  .pagination {
    align-self: flex-end;
  }
  .registration-details {
    grid-template-columns: 1fr;
    gap: 6px;
  }
  .registration-details dd {
    margin-bottom: 10px;
  }
}
</style>
