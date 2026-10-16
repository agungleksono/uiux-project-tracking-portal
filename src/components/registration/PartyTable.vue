<script setup lang="ts">
import FormSection from './FormSection.vue'
import FilePicker from './FilePicker.vue'
import type { PartyRow } from '@/types/patent'
const props = defineProps<{ title: string }>()
const rows = defineModel<PartyRow[]>({ required: true })
let nextId = Math.max(0, ...rows.value.map((row) => row.id)) + 1
function addRow() {
  rows.value.push({
    id: nextId++,
    name: '',
    address: '',
    country: '',
    document: null,
  })
}
function removeRow(id: number) {
  rows.value = rows.value.filter((row) => row.id !== id)
}
</script>
<template>
  <FormSection :title="props.title">
    <template #action
      ><v-btn
        size="small"
        variant="text"
        color="primary"
        :aria-label="'Add ' + title"
        @click="addRow"
        >+ Add row</v-btn
      ></template
    >
    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Address</th>
            <th>Country</th>
            <th>Document</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="row.id">
            <td>{{ index + 1 }}</td>
            <td>
              <v-text-field
                v-model="row.name"
                :aria-label="title + ' ' + (index + 1) + ' name'"
                placeholder="Enter name"
                variant="outlined"
                density="compact"
                hide-details
              />
            </td>
            <td>
              <v-text-field
                v-model="row.address"
                :aria-label="title + ' ' + (index + 1) + ' address'"
                placeholder="Enter address"
                variant="outlined"
                density="compact"
                hide-details
              />
            </td>
            <td>
              <v-text-field
                v-model="row.country"
                :aria-label="title + ' ' + (index + 1) + ' country'"
                placeholder="Enter country"
                variant="outlined"
                density="compact"
                hide-details
              />
            </td>
            <td>
              <FilePicker
                v-model="row.document"
                :label="title + ' ' + (index + 1) + ' document'"
                compact
              />
            </td>
            <td>
              <v-btn
                icon="mdi-delete-outline"
                color="error"
                variant="text"
                size="small"
                :aria-label="'Remove ' + title + ' ' + (index + 1)"
                @click="removeRow(row.id)"
              />
            </td>
          </tr>
          <tr v-if="!rows.length">
            <td colspan="6" class="empty">
              No {{ title.toLowerCase() }} added. Use Add row to get started.
            </td>
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
  min-width: 760px;
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
th:nth-child(3) {
  width: 28%;
}
th:nth-last-child(-n + 2) {
  width: 100px;
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
.empty {
  padding: 20px;
  text-align: center;
  color: #6b80a2;
}
</style>
