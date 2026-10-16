<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AppBrand from '@/components/common/AppBrand.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
const notice = ref('')
const router = useRouter()
function handleLogin() {
  // Preview navigation only; authentication will be connected to the API later.
  return router.push({ name: 'dashboard' })
}
</script>
<template>
  <AuthLayout>
    <section class="login-view" aria-labelledby="login-heading">
      <div class="login-card">
        <AppBrand />
        <div class="login-heading">
          <h2 id="login-heading">Login</h2>
          <p>Please enter your credentials to access the system.</p>
        </div>
        <LoginForm
          @submit="handleLogin"
          @forgot-password="
            notice = 'Please contact your administrator to reset your password.'
          "
          @google-login="
            notice =
              'Google sign-in is not available yet. Please contact your administrator.'
          "
        />
        <p class="contact-copy">
          Don't have an account yet?
          <button
            class="text-link"
            type="button"
            @click="
              notice =
                'Please contact your AFFA administrator to request an account.'
            "
          >
            Please contact us
          </button>
        </p>
        <footer>© 2026 AFFA. All rights reserved.</footer>
      </div>
    </section>
  </AuthLayout>
  <v-snackbar
    :model-value="!!notice"
    :timeout="6000"
    role="status"
    @update:model-value="notice = ''"
    >{{ notice }}</v-snackbar
  >
</template>

<style scoped>
.login-view {
  width: 505px;
  max-width: 100%;
}
.login-card {
  position: relative;
  width: 505px;
  max-width: 100%;
  padding: 49px 44px 54px;
  border-radius: 21px;
  background: white;
  box-shadow: var(--shadow-card);
}
.login-heading {
  margin-top: 38px;
}
.login-heading h2 {
  font-size: 32px;
  line-height: 1.25;
  margin: 0 0 6px;
}
.login-heading p {
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  color: #627ba7;
}
.contact-copy {
  margin: 16px 0 0;
  text-align: center;
  color: #657da8;
  font-size: 14px;
  line-height: 1.5;
}
.contact-copy .text-link {
  font-weight: 700;
}
.login-card footer {
  margin-top: 45px;
  text-align: center;
  color: #7087b0;
  font-size: 12px;
  line-height: 18px;
}
@media (min-width: 1500px) {
  .login-card {
    min-height: 860px;
  }
}
@media (max-width: 1250px) {
  .login-card {
    padding: 40px 28px;
  }
}
@media (max-width: 480px) {
  .login-card {
    padding: 32px 22px;
    border-radius: 18px;
  }
  .login-heading {
    margin-top: 30px;
  }
  .login-card footer {
    margin-top: 32px;
  }
}
</style>
