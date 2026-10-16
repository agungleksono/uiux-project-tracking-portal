<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useDisplay } from 'vuetify'
const { width } = useDisplay()
const isMobile = computed(() => width.value <= 1000)
const collapsed = ref(false)
const mobileOpen = ref(false)
const notice = ref('')
const navigation = [
  'New Registration',
  'Portfolio',
  'Payment',
  'AFFA Assistant',
  'Setting',
]
function toggleNavigation() {
  if (isMobile.value) mobileOpen.value = !mobileOpen.value
  else collapsed.value = !collapsed.value
}
</script>
<template>
  <v-theme-provider theme="portal" with-background>
    <div
      class="dashboard-shell"
      :class="{ collapsed, 'mobile-open': mobileOpen }"
    >
      <button
        v-if="mobileOpen"
        class="nav-overlay"
        type="button"
        aria-label="Close navigation"
        @click="mobileOpen = false"
      />
      <aside
        id="portal-navigation"
        class="sidebar"
        aria-label="Main navigation"
        @keydown.esc="mobileOpen = false"
      >
        <RouterLink
          to="/dashboard-old"
          class="sidebar-brand"
          @click="mobileOpen = false"
        >
          <span class="brand-symbol">AFFA</span>
          <span
            ><strong>AFFA WMS</strong
            ><small>Project Tracking Portal</small></span
          >
        </RouterLink>
        <nav class="navigation">
          <RouterLink
            class="nav-link active"
            to="/dashboard-old"
            aria-current="page"
            @click="mobileOpen = false"
            >Dashboard</RouterLink
          >
          <button
            v-for="item in navigation"
            :key="item"
            type="button"
            class="nav-link"
            @click="notice = item + ' is not available yet.'"
          >
            {{ item }}<v-icon icon="mdi-chevron-right" size="20" />
          </button>
          <RouterLink class="nav-link" to="/login">Logout</RouterLink>
        </nav>
      </aside>
      <div class="workspace">
        <header class="topbar">
          <v-btn
            icon="mdi-menu"
            variant="text"
            aria-label="Toggle navigation"
            aria-controls="portal-navigation"
            :aria-expanded="isMobile ? mobileOpen : !collapsed"
            @click="toggleNavigation"
          />
          <div class="portal-title">
            <strong>AFFA Work Management System</strong
            ><span>Project Tracking Portal</span>
          </div>
          <div class="account-actions">
            <v-btn
              icon="mdi-bell"
              variant="text"
              aria-label="Notifications"
              @click="notice = 'You have no new notifications.'"
            />
            <v-icon
              class="account-avatar"
              icon="mdi-account-circle"
              size="49"
            />
            <span class="account-name">user<br />client</span>
            <span class="online-status" role="img" aria-label="Online" />
          </div>
        </header>
        <main class="dashboard-main"><slot /></main>
      </div>
      <v-snackbar
        :model-value="!!notice"
        :timeout="4000"
        @update:model-value="notice = ''"
        >{{ notice }}</v-snackbar
      >
    </div>
  </v-theme-provider>
</template>
<style scoped>
.dashboard-shell {
  --sidebar-width: 300px;
  display: flex;
  min-height: 100dvh;
  background: #44688e;
  color: white;
}
.sidebar {
  width: var(--sidebar-width);
  flex: 0 0 var(--sidebar-width);
  background: linear-gradient(115deg, #101e31, #173657 60%, #0b2442);
}
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 28px 30px 0 40px;
  text-decoration: none;
  color: white;
}
.brand-symbol {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: linear-gradient(#122d50, #285ba5);
  border: 1px solid #ffffff22;
  font-size: 17px;
  font-weight: 700;
}
.sidebar-brand strong {
  display: block;
  font-size: 25px;
  white-space: nowrap;
  line-height: 1.3;
}
.sidebar-brand small {
  display: block;
  font-size: 12px;
  color: #0099ef;
  font-weight: 700;
  white-space: nowrap;
}
.navigation {
  display: grid;
  gap: 5px;
  margin-top: 117px;
}
.nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 46px;
  padding: 10px 20px 10px 32px;
  border: 0;
  color: white;
  font-size: 16px;
  text-align: left;
  text-decoration: none;
  background: transparent;
  cursor: pointer;
}
.nav-link:hover,
.nav-link.active {
  background: #234b7f88;
}
.nav-link.active {
  font-weight: 700;
  border-radius: 4px 0 0 4px;
}
.workspace {
  flex: 1;
  min-width: 0;
}
.topbar {
  display: flex;
  align-items: center;
  gap: 36px;
  min-height: 106px;
  padding: 18px 48px 18px 40px;
  background: #00162f;
}
.portal-title {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex: 1;
  flex-wrap: wrap;
}
.portal-title strong {
  font-size: clamp(21px, 1.7vw, 30px);
  line-height: 1.25;
}
.portal-title span {
  color: #0084d5;
  font-size: 20px;
}
.account-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}
.account-name {
  font-size: 20px;
  line-height: 1.25;
}
.online-status {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background: linear-gradient(#00e832, #008e0a);
  margin-left: 12px;
}
.dashboard-main {
  padding: 10px;
}
.collapsed .sidebar {
  display: none;
}
.nav-overlay {
  display: none;
}
@media (max-width: 1450px) {
  .dashboard-shell {
    --sidebar-width: 245px;
  }
  .sidebar-brand {
    padding-left: 20px;
  }
  .sidebar-brand strong {
    font-size: 21px;
  }
  .brand-symbol {
    width: 52px;
    height: 52px;
    font-size: 14px;
  }
  .topbar {
    gap: 16px;
    padding: 18px 24px;
  }
  .account-actions {
    gap: 12px;
  }
  .portal-title span {
    font-size: 16px;
  }
  .account-name {
    font-size: 16px;
  }
}
@media (max-width: 1000px) {
  .sidebar,
  .collapsed .sidebar {
    display: none;
  }
  .mobile-open .sidebar {
    display: block;
    position: fixed;
    inset: 0 auto 0 0;
    z-index: 21;
    overflow-y: auto;
  }
  .nav-overlay {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 20;
    background: #0008;
  }
  .topbar {
    min-height: 84px;
  }
  .navigation {
    margin-top: 65px;
  }
}
@media (max-width: 600px) {
  .topbar {
    padding: 12px;
    gap: 8px;
  }
  .portal-title strong {
    font-size: 17px;
  }
  .portal-title span {
    font-size: 12px;
  }
  .account-avatar,
  .account-name,
  .online-status {
    display: none;
  }
  .account-actions {
    gap: 0;
  }
  .dashboard-main {
    padding: 8px;
  }
}
</style>
