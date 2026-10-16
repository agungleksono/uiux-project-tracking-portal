<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import PortalHeader from '@/components/layout/PortalHeader.vue'
import PortalSidebar from '@/components/layout/PortalSidebar.vue'

const route = useRoute()
const { width } = useDisplay()
const isMobile = computed(() => width.value <= 1000)
const collapsed = ref(false)
const mobileOpen = ref(false)
const notice = ref('')
const header = ref<InstanceType<typeof PortalHeader> | null>(null)
function toggleSidebar() {
  if (isMobile.value) mobileOpen.value = !mobileOpen.value
  else collapsed.value = !collapsed.value
}
function closeSidebar() {
  mobileOpen.value = false
  header.value?.focusNavigationToggle()
}
watch([isMobile, () => route.path], () => {
  mobileOpen.value = false
})
</script>
<template>
  <v-theme-provider theme="light">
    <div
      class="portal-shell"
      :class="{ 'sidebar-collapsed': collapsed, 'sidebar-open': mobileOpen }"
    >
      <button
        v-if="isMobile && mobileOpen"
        class="sidebar-overlay"
        type="button"
        aria-label="Close navigation"
        @click="closeSidebar"
      />
      <PortalSidebar
        @close="closeSidebar"
        @navigate="mobileOpen = false"
        @notify="notice = $event"
      />
      <div class="portal-workspace">
        <PortalHeader
          ref="header"
          :navigation-open="isMobile ? mobileOpen : !collapsed"
          @toggle-navigation="toggleSidebar"
          @notifications="notice = 'You have no new notifications.'"
        />
        <main class="portal-main"><RouterView /></main>
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
.portal-shell {
  display: flex;
  min-height: 100dvh;
  background: #f4f7fd;
  color: #102955;
}
.portal-workspace {
  min-width: 0;
  flex: 1;
}
.portal-main {
  padding: 18px 24px 18px 26px;
}
.sidebar-collapsed .portal-sidebar {
  display: none;
}
@media (max-width: 1000px) {
  .portal-sidebar,
  .sidebar-collapsed .portal-sidebar {
    display: none;
  }
}
@media (max-width: 1000px) {
  .sidebar-open .portal-sidebar {
    display: flex;
    position: fixed;
    inset: 0 auto 0 0;
    z-index: 30;
  }
}
@media (max-width: 1000px) {
  .sidebar-overlay {
    position: fixed;
    inset: 0;
    border: 0;
    background: #0c204e66;
    z-index: 29;
  }
}
@media (max-width: 600px) {
  .portal-main {
    padding: 18px 14px;
  }
}
</style>
