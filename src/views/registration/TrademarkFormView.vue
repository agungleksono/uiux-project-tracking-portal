<script setup lang="ts">
import { reactive, ref } from 'vue'
import RegistrationTypeSelect from '@/components/registration/RegistrationTypeSelect.vue'
import FormField from '@/components/registration/FormField.vue'
import FormSection from '@/components/registration/FormSection.vue'
import FilePicker from '@/components/registration/FilePicker.vue'
import type { DocumentRow } from '@/types/patent'

interface ApplicantRow {
  id: number
  name: string
  address: string
  country: string
  document: File | null
}

interface ClassRow {
  id: number
  className: string
  goods: string
  country: string
  document: File | null
}

const form = reactive({
  instructionType: '',
  requestDate: '',
  reference: '',
  applicationType: '',
  trademarkType: '',
  applicantType: '',
  trademark: '',
  colorType: '',
  message: '',
})
const specimen = ref<File | null>(null)
const applicants = ref<ApplicantRow[]>([
  { id: 1, name: '', address: '', country: '', document: null },
  { id: 2, name: '', address: '', country: '', document: null },
])
const classes = ref<ClassRow[]>([
  { id: 1, className: '', goods: '', country: '', document: null },
  { id: 2, className: '', goods: '', country: '', document: null },
])
const documents = ref<DocumentRow[]>([
  { id: 1, name: '', file: null, updated: '' },
])
const notice = ref('')
let applicantId = 3
let classId = 3
let documentId = 2

function addApplicant() {
  applicants.value.push({
    id: applicantId++,
    name: '',
    address: '',
    country: '',
    document: null,
  })
}

function addClass() {
  classes.value.push({
    id: classId++,
    className: '',
    goods: '',
    country: '',
    document: null,
  })
}

function addDocument() {
  documents.value.push({ id: documentId++, name: '', file: null, updated: '' })
}

function removeRow<T extends { id: number }>(rows: T[], id: number) {
  return rows.filter((row) => row.id !== id)
}

function updateDocumentDate(row: DocumentRow) {
  row.updated = row.file ? new Date().toISOString().slice(0, 10) : ''
}

function submit() {
  notice.value =
    'This form is a preview. Your trademark registration has not been sent.'
}
</script>

<template>
  <section class="trademark-form-page" aria-labelledby="trademark-form-heading">
    <h1 id="trademark-form-heading">New Registration</h1>
    <RegistrationTypeSelect class="type-select" />
    <p class="form-intro">Please fill out the form below completely..!</p>

    <v-form class="registration-form" @submit.prevent="submit">
      <FormSection title="Instruction">
        <div class="field-grid">
          <FormField
            v-model="form.instructionType"
            label="Instruction Type"
            placeholder="Select instruction type"
            :options="['New Filing', 'Renewal', 'Recordal', 'Other']"
            required
          />
          <FormField
            v-model="form.requestDate"
            label="Request to File Date"
            type="date"
            required
          />
          <FormField
            v-model="form.reference"
            label="Your Reference Number"
            placeholder="Enter reference number"
            required
          />
        </div>
      </FormSection>

      <FormSection title="Trademark">
        <div class="field-grid">
          <FormField
            v-model="form.applicationType"
            label="Application Type"
            placeholder="Select application type"
            :options="['New Application', 'Renewal', 'Assignment']"
            required
          />
          <FormField
            v-model="form.trademarkType"
            label="Trademark type"
            placeholder="Select trademark type"
            :options="['Word Mark', 'Device Mark', 'Combined Mark']"
            required
          />
          <FormField
            v-model="form.applicantType"
            label="Applicant type"
            placeholder="Select applicant type"
            :options="['Individual', 'Company', 'Organization']"
            required
          />
          <FormField
            v-model="form.trademark"
            label="Trademark"
            placeholder="Enter trademark"
            required
          />
          <FormField
            v-model="form.colorType"
            label="Color type"
            placeholder="Enter color type"
          />
          <div class="specimen-field">
            <span>Specimen</span>
            <FilePicker v-model="specimen" label="Trademark specimen" />
          </div>
        </div>
      </FormSection>

      <FormSection title="Applicant">
        <div class="table-scroll">
          <table class="data-table applicant-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Name <b>*</b></th>
                <th>Address <b>*</b></th>
                <th>Country <b>*</b></th>
                <th>Download</th>
                <th>Document</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in applicants" :key="row.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <v-text-field
                    v-model="row.name"
                    :aria-label="`Applicant ${index + 1} name`"
                    placeholder="Enter name"
                    variant="outlined"
                    density="compact"
                    hide-details
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="row.address"
                    :aria-label="`Applicant ${index + 1} address`"
                    placeholder="Enter address"
                    variant="outlined"
                    density="compact"
                    hide-details
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="row.country"
                    :aria-label="`Applicant ${index + 1} country`"
                    placeholder="Enter country"
                    variant="outlined"
                    density="compact"
                    hide-details
                  />
                </td>
                <td><button class="form-link" type="button">Form</button></td>
                <td>
                  <FilePicker
                    v-model="row.document"
                    :label="`Applicant ${index + 1} document`"
                    compact
                  />
                </td>
                <td class="row-actions">
                  <v-btn
                    icon="mdi-delete-outline"
                    color="error"
                    variant="text"
                    size="small"
                    :aria-label="`Remove applicant ${index + 1}`"
                    @click="applicants = removeRow(applicants, row.id)"
                  />
                  <v-btn
                    icon="mdi-plus-circle"
                    color="#111"
                    variant="text"
                    size="small"
                    aria-label="Add applicant"
                    @click="addApplicant"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </FormSection>

      <FormSection title="Class">
        <div class="table-scroll">
          <table class="data-table class-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Class <b>*</b></th>
                <th>Specification of Goods <b>*</b></th>
                <th>Country <b>*</b></th>
                <th>Download</th>
                <th>Document</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in classes" :key="row.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <v-text-field
                    v-model="row.className"
                    :aria-label="`Class ${index + 1}`"
                    placeholder="Enter class"
                    variant="outlined"
                    density="compact"
                    hide-details
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="row.goods"
                    :aria-label="`Class ${index + 1} specification of goods`"
                    placeholder="Enter specification of goods"
                    variant="outlined"
                    density="compact"
                    hide-details
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="row.country"
                    :aria-label="`Class ${index + 1} country`"
                    placeholder="Enter country"
                    variant="outlined"
                    density="compact"
                    hide-details
                  />
                </td>
                <td><button class="form-link" type="button">Form</button></td>
                <td>
                  <FilePicker
                    v-model="row.document"
                    :label="`Class ${index + 1} document`"
                    compact
                  />
                </td>
                <td class="row-actions">
                  <v-btn
                    icon="mdi-delete-outline"
                    color="error"
                    variant="text"
                    size="small"
                    :aria-label="`Remove class ${index + 1}`"
                    @click="classes = removeRow(classes, row.id)"
                  />
                  <v-btn
                    icon="mdi-plus-circle"
                    color="#111"
                    variant="text"
                    size="small"
                    aria-label="Add class"
                    @click="addClass"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </FormSection>

      <FormSection title="Another Document">
        <div class="table-scroll">
          <table class="data-table documents-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Document Name <b>*</b></th>
                <th>Upload</th>
                <th>Last Update <b>*</b></th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in documents" :key="row.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <v-text-field
                    v-model="row.name"
                    :aria-label="`Document ${index + 1} name`"
                    placeholder="Enter document name"
                    variant="outlined"
                    density="compact"
                    hide-details
                  />
                </td>
                <td>
                  <FilePicker
                    v-model="row.file"
                    :label="`Upload document ${index + 1}`"
                    compact
                    @change="updateDocumentDate(row)"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="row.updated"
                    :aria-label="`Document ${index + 1} last update`"
                    type="date"
                    variant="outlined"
                    density="compact"
                    hide-details
                  />
                </td>
                <td class="row-actions">
                  <v-btn
                    icon="mdi-delete-outline"
                    color="error"
                    variant="text"
                    size="small"
                    :aria-label="`Remove document ${index + 1}`"
                    @click="documents = removeRow(documents, row.id)"
                  />
                  <v-btn
                    icon="mdi-plus-circle"
                    color="#111"
                    variant="text"
                    size="small"
                    aria-label="Add document"
                    @click="addDocument"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </FormSection>

      <FormSection title="Message">
        <v-textarea
          v-model="form.message"
          aria-label="Message"
          placeholder="Enter message (optional)"
          variant="outlined"
          rows="3"
          hide-details
        />
      </FormSection>

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
.trademark-form-page {
  padding: 10px 4px 24px;
  color: #102955;
}
h1 {
  margin: 0 0 16px;
  font-size: 34px;
  line-height: 1.2;
}
.type-select {
  max-width: 460px;
  margin-bottom: 27px;
}
.form-intro {
  margin: 0 0 17px 12px;
  font-size: 14px;
  font-weight: 600;
}
.registration-form {
  display: grid;
  gap: 18px;
}
.field-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px 34px;
}
.specimen-field {
  min-width: 0;
}
.specimen-field > span {
  display: block;
  margin-bottom: 8px;
  color: #234d90;
  font-size: 14px;
}
.table-scroll {
  overflow-x: auto;
}
.data-table {
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;
  font-size: 13px;
}
.data-table th {
  padding: 9px 10px;
  color: #102955;
  background: #e8f2fd;
  text-align: left;
  font-weight: 600;
}
.data-table td {
  padding: 5px 10px;
}
.data-table tbody tr:nth-child(even) {
  background: #eef6ff;
}
.data-table th:first-child {
  width: 48px;
}
.data-table th:nth-last-child(-n + 3) {
  width: 90px;
}
.applicant-table th:nth-child(2),
.applicant-table th:nth-child(3) {
  width: 25%;
}
.class-table th:nth-child(3) {
  width: 27%;
}
.documents-table th:nth-child(2) {
  width: 32%;
}
.documents-table th:nth-child(4) {
  width: 27%;
}
.data-table b {
  color: #ff2638;
}
.form-link {
  padding: 0;
  color: #001eff;
  background: none;
  border: 0;
  cursor: pointer;
  text-decoration: underline;
}
.row-actions {
  white-space: nowrap;
}
:deep(.data-table .v-field),
:deep(.v-textarea .v-field) {
  background: white;
  border-radius: 5px;
  font-size: 13px;
}
:deep(.data-table .v-field__input) {
  min-height: 36px;
}
:deep(.data-table .v-field__outline),
:deep(.v-textarea .v-field__outline) {
  color: #a9c0df;
  --v-field-border-opacity: 1;
}
.submit-button.v-btn {
  justify-self: start;
  min-width: 103px;
  height: 42px;
  text-transform: none;
  letter-spacing: 0;
}
@media (max-width: 760px) {
  .trademark-form-page {
    padding-inline: 0;
  }
  h1 {
    font-size: 27px;
  }
  .field-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .form-intro {
    margin-left: 0;
  }
}
</style>
