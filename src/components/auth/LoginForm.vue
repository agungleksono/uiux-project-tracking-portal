<script setup lang="ts">
import { ref } from 'vue'
import { VForm } from 'vuetify/components'
import type { LoginCredentials } from '@/types/auth'
import envelopeIcon from '@/assets/icons/envelope-solid-full.svg'
import lockIcon from '@/assets/icons/lock-solid-full.svg'
import eyeIcon from '@/assets/icons/eye-solid-full.svg'
import eyeSlashIcon from '@/assets/icons/eye-slash-solid-full.svg'
import googleIcon from '@/assets/icons/google-icon-logo.svg'

const emit = defineEmits<{
  submit: [credentials: LoginCredentials]
  'forgot-password': []
  'google-login': []
}>()
const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const form = ref<InstanceType<typeof VForm> | null>(null)
const usernameRules = [
  (value: string | null) => !!value?.trim() || 'Enter your email or username.',
]
const passwordRules = [
  (value: string | null) => !!value || 'Enter your password.',
]
async function submitLogin() {
  if (!form.value) return
  const { valid } = await form.value.validate()
  if (valid)
    emit('submit', {
      username: username.value.trim(),
      password: password.value,
      rememberMe: rememberMe.value,
    })
}
</script>
<template>
  <v-form ref="form" class="login-form" @submit.prevent="submitLogin">
    <div class="form-field">
      <label for="username">Email or Username</label>
      <v-text-field
        id="username"
        v-model="username"
        placeholder="Enter your email or username"
        autocomplete="username"
        :rules="usernameRules"
        variant="outlined"
        density="comfortable"
        hide-details="auto"
      >
        <template #prepend-inner
          ><img class="input-icon" :src="envelopeIcon" alt=""
        /></template>
      </v-text-field>
    </div>
    <div class="form-field">
      <label for="password">Password</label>
      <v-text-field
        id="password"
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Enter your password"
        autocomplete="current-password"
        :rules="passwordRules"
        variant="outlined"
        density="comfortable"
        hide-details="auto"
      >
        <template #prepend-inner
          ><img class="input-icon" :src="lockIcon" alt=""
        /></template>
        <template #append-inner>
          <button
            class="password-toggle"
            type="button"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            :aria-pressed="showPassword"
            @click="showPassword = !showPassword"
          >
            <img
              class="input-icon"
              :src="showPassword ? eyeIcon : eyeSlashIcon"
              alt=""
            />
          </button>
        </template>
      </v-text-field>
    </div>
    <div class="form-options">
      <v-checkbox
        v-model="rememberMe"
        label="Remember me"
        density="compact"
        hide-details
        color="primary"
      />
      <button type="button" class="text-link" @click="emit('forgot-password')">
        Forgot password?
      </button>
    </div>
    <v-btn
      type="submit"
      class="login-button"
      color="primary"
      block
      elevation="0"
      >Login</v-btn
    >
    <p class="divider">OR</p>
    <v-btn
      class="google-button"
      type="button"
      block
      variant="outlined"
      @click="emit('google-login')"
    >
      <img :src="googleIcon" alt="" />Login with Google
    </v-btn>
  </v-form>
</template>

<style scoped>
.login-form {
  margin-top: 23px;
}
.form-field + .form-field {
  margin-top: 22px;
}
.form-field > label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
}
.login-form :deep(.v-field) {
  border-radius: 8px;
  font-size: 14px;
  --v-field-padding-start: 15px;
  --v-field-padding-end: 13px;
}
.login-form :deep(.v-field__outline) {
  color: #cedcf6;
  --v-field-border-opacity: 1;
}
.login-form :deep(.v-field--focused .v-field__outline) {
  color: #1966fa;
}
.login-form :deep(.v-field__input) {
  min-height: 49px;
  padding-top: 12px;
  padding-bottom: 12px;
}
.login-form :deep(.v-field__input::placeholder) {
  color: #8da0bd;
  opacity: 1;
}
.input-icon {
  display: block;
  width: 25px;
  height: 25px;
  filter: invert(48%) sepia(15%) saturate(800%) hue-rotate(180deg);
}
.login-form :deep(.v-field__prepend-inner) {
  padding-right: 9px;
}
.password-toggle {
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  width: 32px;
  height: 32px;
  margin-top: -4px;
}
.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 3px 0 14px;
  min-height: 42px;
}
.form-options :deep(.v-checkbox) {
  flex: 0 1 auto;
}
.form-options :deep(.v-selection-control) {
  min-height: 42px;
}
.form-options :deep(.v-selection-control__wrapper) {
  margin-left: -9px;
}
.form-options :deep(.v-label) {
  font-size: 14px;
  opacity: 1;
  color: #4a6188;
}
.form-options :deep(.v-icon) {
  font-size: 23px;
  color: #93afe0;
}
.login-button.v-btn {
  height: 52px;
  border-radius: 9px;
  font-size: 17px;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0;
}
.divider {
  margin: 14px 0 16px;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  color: #7087b0;
}
.google-button.v-btn {
  height: 49px;
  border-radius: 8px;
  border-color: #cedcf6;
  font-size: 15px;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0;
}
.google-button img {
  width: 24px;
  height: 24px;
  margin-right: 11px;
}
@media (max-width: 480px) {
  .form-options :deep(.v-label),
  .form-options .text-link {
    font-size: 12px;
  }
}
</style>
