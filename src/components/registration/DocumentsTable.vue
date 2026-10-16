<script setup lang="ts">
import FormSection from './FormSection.vue'
import FilePicker from './FilePicker.vue'
import type { DocumentRow } from '@/types/patent'
const rows = defineModel<DocumentRow[]>({ required: true })
let nextId = Math.max(0, ...rows.value.map((row) => row.id)) + 1
function addRow() {
  rows.value.push({ id: nextId++, name: '', file: null, updated: '' })
}
function updateDate(row: DocumentRow) {
  row.updated = row.file ? new Date().toLocaleDateString('en-GB') : ''
}
</script>
<template>
  <FormSection title="Another Document">
    <template #action
      ><v-btn
        size="small"
        variant="text"
        color="primary"
        aria-label="Add document"
        @click="addRow"
        >+ Add row</v-btn
      ></template
    >
    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Document Name</th>
            <th>Upload</th>
            <th>Last Update</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="row.id">
            <td>{{ index + 1 }}</td>
            <td>
              <v-text-field
                v-model="row.name"
                placeholder="Enter document name"
                :aria-label="'Document ' + (index + 1) + ' name'"
                variant="outlined"
                density="compact"
                hide-details
              />
            </td>
            <td>
              <FilePicker
                v-model="row.file"
                :label="'Upload document ' + (index + 1)"
                @change="updateDate(row)"
              />
            </td>
            <td>{{ row.updated || '-' }}</td>
            <td>
              <v-btn
                icon="mdi-delete-outline"
                color="error"
                variant="text"
                size="small"
                :aria-label="'Remove document ' + (index + 1)"
                @click="rows = rows.filter((item) => item.id !== row.id)"
              />
            </td>
          </tr>
          <tr v-if="!rows.length">
            <td colspan="5">No additional documents.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </FormSection>
</template>
<style scoped>
.table-scroll {
  overflow-x: auto;
}
table {
  width: 100%;
  min-width: 730px;
  border-collapse: collapse;
  font-size: 14px;
}
th {
  background: #edf4ff;
  color: #285296;
  padding: 10px;
  text-align: left;
  font-weight: 500;
}
td {
  padding: 5px 10px;
}
tbody tr:nth-child(even) {
  background: #f4f8ff;
}
th:first-child {
  width: 45px;
}
th:nth-child(2) {
  width: 34%;
}
:deep(.v-field) {
  background: white;
  border-radius: 5px;
  font-size: 14px;
}
:deep(.v-field__input) {
  min-height: 38px;
}
:deep(.v-field__outline) {
  color: #c8d9f1;
  --v-field-border-opacity: 1;
}
</style>
