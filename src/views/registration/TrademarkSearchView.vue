<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import RegistrationTypeSelect from '@/components/registration/RegistrationTypeSelect.vue'

const router = useRouter()
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const searched = ref(false)
const paymentNotice = ref(false)

function openFilePicker() {
  fileInput.value?.click()
}

function setFile(file: File | undefined) {
  if (!file || !['image/jpeg', 'image/png'].includes(file.type)) return
  selectedFile.value = file
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  setFile(target.files?.[0])
}

function onDrop(event: DragEvent) {
  setFile(event.dataTransfer?.files[0])
}

function search() {
  searched.value = true
}
</script>

<template>
  <section class="trademark-search-page" aria-labelledby="search-page-heading">
    <h1 id="search-page-heading">New Registration</h1>
    <RegistrationTypeSelect class="type-select" />

    <v-card class="search-card">
      <header class="card-heading">
        <h2>Trademark Search</h2>
        <p v-if="searched">
          Search trademark using image to find similar results with semantic
          search.
        </p>
      </header>

      <div class="search-form">
        <div class="lens-logo" aria-label="AFFA Lens Semantic Images">
          <strong><span>AFFA</span> Lens</strong>
          <small>Semantic Images</small>
        </div>

        <button
          class="dropzone"
          type="button"
          aria-label="Choose trademark image"
          @click="openFilePicker"
          @dragover.prevent
          @drop.prevent="onDrop"
        >
          <span v-if="searched || selectedFile" class="file-label">
            {{
              selectedFile?.name || 'Upload an image file or drag and drop here'
            }}
          </span>
          <span v-else aria-hidden="true" />
          <v-icon icon="mdi-camera-outline" aria-hidden="true" />
        </button>
        <input
          ref="fileInput"
          class="visually-hidden"
          type="file"
          accept="image/jpeg,image/png"
          @change="onFileChange"
        />
        <p v-if="searched" class="file-help">
          Supported format: JPG, PNG (Max 5MB)
        </p>

        <div class="form-actions">
          <v-btn color="primary" @click="openFilePicker">Upload File</v-btn>
          <v-btn variant="outlined" color="primary" @click="search"
            >Search</v-btn
          >
        </div>
      </div>

      <template v-if="searched">
        <div class="section-divider" />
        <section class="results" aria-labelledby="results-heading">
          <h3 id="results-heading">Search results</h3>
          <div class="payment-panel">
            <span class="result-icon"
              ><v-icon icon="mdi-file-search-outline"
            /></span>
            <strong>Complete your payment to view the search results.</strong>
            <p>
              Please
              <button
                type="button"
                class="payment-link"
                @click="paymentNotice = true"
              >
                click
              </button>
              to complete payment
            </p>
          </div>
          <v-btn
            class="continue-button"
            color="#3f70ac"
            @click="router.push({ name: 'trademark-form' })"
          >
            Continue to register
          </v-btn>
        </section>
      </template>
    </v-card>

    <v-snackbar v-model="paymentNotice" :timeout="4000">
      Payment flow is not available in this preview.
    </v-snackbar>
  </section>
</template>

<style scoped>
.trademark-search-page {
  padding: 12px 4px 24px;
  color: #102955;
}
h1 {
  margin: 0 0 26px;
  font-size: 34px;
  font-weight: 700;
  line-height: 1.25;
}
.type-select {
  max-width: 500px;
  margin-bottom: 32px;
}
.search-card.v-card {
  min-height: 372px;
  padding: 16px;
  overflow: visible;
  color: inherit;
  border: 1px solid #d9e4f4;
  border-radius: 11px;
  box-shadow: 0 7px 20px #18396a17;
}
.card-heading {
  min-height: 54px;
  padding: 14px 22px 10px;
  background: linear-gradient(100deg, #f0f6fd 0%, #fff 52%, #edf5fd 100%);
  border-radius: 6px;
}
.card-heading h2,
.card-heading p {
  margin: 0;
}
.card-heading h2 {
  font-size: 21px;
  line-height: 1.15;
}
.card-heading p {
  margin-top: 3px;
  color: #354c73;
  font-size: 14px;
}
.search-form {
  width: min(690px, 100%);
  margin: 48px auto 36px;
  text-align: center;
}
.lens-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 27px;
}
.lens-logo strong {
  color: #ff8235;
  font-size: 40px;
  line-height: 1;
}
.lens-logo strong span {
  color: #1680ef;
}
.lens-logo small {
  margin-top: 9px;
  color: #152a60;
  font-size: 17px;
  font-weight: 600;
}
.dropzone {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 44px;
  padding: 7px 12px 7px 17px;
  color: #5877a5;
  background: #fff;
  border: 1px solid #8fb0dd;
  border-radius: 6px;
  cursor: pointer;
}
.dropzone .v-icon {
  color: #113f8e;
  font-size: 29px;
}
.file-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.file-help {
  margin: 8px 0 0;
  color: #6885ad;
  font-size: 12px;
}
.form-actions {
  display: flex;
  justify-content: center;
  gap: 22px;
  margin-top: 22px;
}
.form-actions .v-btn {
  width: 178px;
  height: 51px;
  border-radius: 7px;
  text-transform: none;
  letter-spacing: 0;
  font-size: 16px;
}
.form-actions .v-btn--variant-outlined {
  background: #f6faff;
  border-color: #c5d7ee;
  color: #102b67 !important;
}
.section-divider {
  height: 1px;
  margin: -1px 12px 16px;
  background: #d4e1f2;
}
.results {
  padding: 0 12px;
}
.results h3 {
  margin: 0 0 10px;
  font-size: 17px;
}
.payment-panel {
  display: flex;
  min-height: 195px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(105deg, #f2f7fd, #fbfdff 55%, #eef5fc);
  border-radius: 6px;
  text-align: center;
}
.result-icon {
  display: grid;
  width: 76px;
  height: 76px;
  margin-bottom: 8px;
  place-items: center;
  color: #0d347d;
  background: #e3edf9;
  border-radius: 50%;
}
.result-icon .v-icon {
  font-size: 47px;
}
.payment-panel strong {
  font-size: 15px;
}
.payment-panel p {
  margin: 17px 0 0;
  font-size: 15px;
}
.payment-link {
  padding: 0;
  color: #0872f4;
  background: transparent;
  border: 0;
  cursor: pointer;
  text-decoration: underline;
}
.continue-button.v-btn {
  display: flex;
  min-width: 206px;
  height: 41px;
  margin: 22px auto 4px;
  text-transform: none;
  letter-spacing: 0;
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (max-width: 600px) {
  h1 {
    margin-bottom: 22px;
    font-size: 27px;
  }
  .type-select {
    margin-bottom: 22px;
  }
  .search-card.v-card {
    padding: 10px;
  }
  .card-heading {
    padding-inline: 14px;
  }
  .card-heading h2 {
    font-size: 19px;
  }
  .search-form {
    margin: 36px auto 28px;
  }
  .lens-logo strong {
    font-size: 34px;
  }
  .form-actions {
    gap: 10px;
  }
  .form-actions .v-btn {
    width: auto;
    flex: 1;
  }
  .payment-panel {
    min-height: 225px;
    padding: 20px;
  }
}
</style>
