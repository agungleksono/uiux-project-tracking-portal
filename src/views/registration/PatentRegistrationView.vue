<script setup lang="ts">
import { reactive, ref } from 'vue'
import RegistrationTypeSelect from '@/components/registration/RegistrationTypeSelect.vue'
import FormSection from '@/components/registration/FormSection.vue'
import FormField from '@/components/registration/FormField.vue'
import FilePicker from '@/components/registration/FilePicker.vue'
import PartyTable from '@/components/registration/PartyTable.vue'
import DocumentsTable from '@/components/registration/DocumentsTable.vue'
import type { PartyRow, DocumentRow } from '@/types/patent'

const form = reactive({
  instructionType: '',
  requestDate: '',
  reference: '',
  applicationType: '',
  applicationField: '',
  priority: '',
  title: '',
  abstract: '',
  claimAmount: '',
  pctNumber: '',
  internationalFilingDate: '',
  substantiveDeadline: '',
  priorityNumber: '',
  priorityDate: '',
  country: '',
  applicationDeadline: '',
  note: '',
})
const pctDocument = ref<File | null>(null)
const priorityDocument = ref<File | null>(null)
const makeParties = (): PartyRow[] =>
  [1, 2].map((id) => ({
    id,
    name: '',
    address: '',
    country: '',
    document: null,
  }))
const applicants = ref(makeParties())
const inventors = ref(makeParties())
const documents = ref<DocumentRow[]>(
  [1, 2].map((id) => ({ id, name: '', file: null, updated: '' })),
)
const notice = ref('')
function submit() {
  notice.value =
    'This form is a preview. Your registration and documents have not been sent.'
}
</script>
<template>
  <section class="patent-page" aria-labelledby="patent-heading">
    <h1 id="patent-heading">New Registration</h1>
    <RegistrationTypeSelect class="type-select" />
    <v-form class="patent-form" @submit.prevent="submit">
      <FormSection title="Instruction">
        <div class="field-grid">
          <FormField
            v-model="form.instructionType"
            label="Instruction Type"
            placeholder="Select instruction type"
            :options="['New Filing', 'Amendment', 'Other']"
          />
          <FormField
            v-model="form.requestDate"
            label="Request to File Date"
            type="date"
          />
          <FormField
            v-model="form.reference"
            label="Your Reference Number"
            placeholder="Enter reference number"
          />
        </div>
      </FormSection>
      <FormSection title="Patent">
        <div class="field-grid">
          <FormField
            v-model="form.applicationType"
            label="Application Type"
            placeholder="Select application type"
            :options="['National', 'PCT', 'Other']"
          />
          <FormField
            v-model="form.applicationField"
            label="Application Field"
            placeholder="Select application field"
            :options="['Mechanical', 'Electrical', 'Chemical', 'Other']"
          />
          <FormField
            v-model="form.priority"
            label="With Priority"
            placeholder="Select priority"
            :options="['Yes', 'No']"
          />
          <FormField
            v-model="form.title"
            label="Title (EN)"
            placeholder="Enter title"
          />
          <FormField
            v-model="form.abstract"
            label="Abstract (EN)"
            placeholder="Enter abstract"
          />
          <FormField
            v-model="form.claimAmount"
            label="Claim Amount"
            placeholder="Enter claim amount"
            type="number"
          />
        </div>
        <hr />
        <div class="field-grid">
          <FormField
            v-model="form.pctNumber"
            label="PCT Number"
            placeholder="Enter PCT number"
          />
          <FormField
            v-model="form.internationalFilingDate"
            label="International Filing Date"
            type="date"
          />
          <FormField
            v-model="form.substantiveDeadline"
            label="Deadline Filing Substantive"
            type="date"
            deadline
          />
          <FormField
            v-model="form.priorityNumber"
            label="Priority Number"
            placeholder="Enter priority number"
          />
          <FormField
            v-model="form.priorityDate"
            label="Priority Date"
            type="date"
          />
          <FormField
            v-model="form.country"
            label="Country"
            placeholder="Enter country"
          />
          <div class="document-field">
            <p>PCT Document</p>
            <FilePicker v-model="pctDocument" label="PCT Document" />
          </div>
          <div class="document-field">
            <p>Priority Document</p>
            <FilePicker v-model="priorityDocument" label="Priority Document" />
          </div>
          <FormField
            v-model="form.applicationDeadline"
            label="Deadline Filing New Patent Application"
            type="date"
            deadline
          />
        </div>
      </FormSection>
      <PartyTable v-model="applicants" title="Applicant" />
      <PartyTable v-model="inventors" title="Inventor" />
      <DocumentsTable v-model="documents" />
      <FormSection title="Note"
        ><v-textarea
          v-model="form.note"
          aria-label="Note"
          placeholder="Enter note"
          variant="outlined"
          rows="2"
          auto-grow
          hide-details
      /></FormSection>
      <v-btn class="submit-button" type="submit" color="primary" elevation="0"
        >Submit</v-btn
      >
    </v-form>
    <v-snackbar
      :model-value="!!notice"
      :timeout="6000"
      @update:model-value="notice = ''"
      >{{ notice }}</v-snackbar
    >
  </section>
</template>
<style scoped>
.patent-page {
  color: #102955;
  padding: 10px 4px 20px;
}
h1 {
  margin: 0 0 12px;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.25;
}
.type-select {
  margin-bottom: 24px;
  max-width: 380px;
}
.patent-form {
  display: grid;
  gap: 22px;
}
.field-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px 34px;
}
hr {
  border: 0;
  border-top: 1px solid #c9daf3;
  margin: 26px 0;
}
.document-field {
  min-width: 0;
}
.document-field p {
  margin: 0 0 8px;
  font-size: 14px;
}
.submit-button {
  justify-self: start;
  text-transform: none;
  letter-spacing: 0;
  min-width: 105px;
  height: 42px;
  margin-top: -6px;
}
:deep(.v-textarea .v-field) {
  font-size: 14px;
  border-radius: 5px;
}
:deep(.v-textarea .v-field__outline) {
  color: #c8d9f1;
  --v-field-border-opacity: 1;
}
@media (max-width: 1100px) {
  .field-grid {
    gap: 18px;
  }
}
@media (max-width: 760px) {
  .field-grid {
    grid-template-columns: 1fr;
  }
  h1 {
    font-size: 27px;
  }
  .patent-page {
    padding-inline: 0;
  }
}
</style>
