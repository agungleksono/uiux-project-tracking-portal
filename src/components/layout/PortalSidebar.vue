<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import AssetIcon from '@/components/common/AssetIcon.vue'
import { portalMenu } from '@/config/navigation'
import type { NavigationLink } from '@/types/navigation'
import house from '@/assets/icons/house-regular-full.svg'
import logout from '@/assets/icons/right-from-bracket-solid-full.svg'
import right from '@/assets/icons/chevron-right-solid-full.svg'
import up from '@/assets/icons/chevron-up-solid-full.svg'

const emit = defineEmits<{
  navigate: []
  close: []
  notify: [message: string]
}>()
const route = useRoute()
const router = useRouter()
const expanded = ref<string[]>([])
function isActive(link: NavigationLink) {
  if (!link.to) return false
  const path = router.resolve(link.to).path
  return route.path === path || route.path.startsWith(path + '/')
}
function toggleMenu(id: string) {
  expanded.value = expanded.value.includes(id)
    ? expanded.value.filter((item) => item !== id)
    : [...expanded.value, id]
}
watch(
  () => route.path,
  () => {
    for (const group of portalMenu) {
      if (
        group.kind === 'group' &&
        group.children.some(isActive) &&
        !expanded.value.includes(group.id)
      )
        expanded.value.push(group.id)
    }
  },
  { immediate: true },
)
</script>
<template>
  <aside
    id="dashboard-navigation"
    class="portal-sidebar"
    aria-label="Main navigation"
    @keydown.esc="emit('close')"
  >
    <RouterLink
      :to="{ name: 'dashboard' }"
      class="portal-brand"
      @click="emit('navigate')"
    >
      <span class="brand-circle">AFFA</span
      ><span
        ><strong>AFFA WMS</strong><small>Project Tracking Portal</small></span
      >
    </RouterLink>
    <nav class="portal-nav">
      <RouterLink
        :to="{ name: 'dashboard' }"
        class="nav-row"
        exact-active-class="dashboard-link"
        @click="emit('navigate')"
      >
        <AssetIcon :src="house" :size="26" /><span>Dashboard</span>
      </RouterLink>
      <div v-for="item in portalMenu" :key="item.id" class="nav-group">
        <RouterLink
          v-if="item.kind === 'link'"
          :to="item.to"
          class="nav-row"
          :class="{ 'dashboard-link': isActive(item) }"
          @click="emit('navigate')"
        >
          <AssetIcon :src="item.icon" :size="25" /><span>{{ item.title }}</span>
        </RouterLink>
        <template v-else>
          <button
            class="nav-row"
            :class="{ 'group-active': item.children.some(isActive) }"
            type="button"
            :aria-expanded="expanded.includes(item.id)"
            :aria-controls="'submenu-' + item.id"
            @click="toggleMenu(item.id)"
          >
            <AssetIcon :src="item.icon" :size="25" /><span>{{
              item.title
            }}</span>
            <AssetIcon
              class="chevron"
              :src="expanded.includes(item.id) ? up : right"
              :size="13"
            />
          </button>
          <ul
            v-if="expanded.includes(item.id)"
            :id="'submenu-' + item.id"
            class="submenu"
          >
            <li v-for="child in item.children" :key="child.id">
              <RouterLink
                v-if="child.to"
                :to="child.to"
                :class="{ 'submenu-active': isActive(child) }"
                @click="emit('navigate')"
                >{{ child.title }}</RouterLink
              >
              <button
                v-else
                type="button"
                @click="
                  emit('notify', child.title + ' — this page is coming soon.')
                "
              >
                {{ child.title }}
              </button>
            </li>
          </ul>
        </template>
      </div>
      <RouterLink
        :to="{ name: 'login' }"
        class="nav-row"
        @click="emit('navigate')"
        ><AssetIcon :src="logout" :size="25" /><span>Logout</span></RouterLink
      >
    </nav>
    <footer>© 2026 AFFA. All rights reserved.</footer>
  </aside>
</template>

<style scoped>
.portal-sidebar {
  position: sticky;
  top: 0;
  width: 260px;
  flex: 0 0 260px;
  height: 100dvh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  color: white;
  background: linear-gradient(155deg, #10376f, #2b82f9);
}
.portal-brand {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 17px 28px;
  color: white;
  text-decoration: none;
}
.brand-circle {
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #1676ed;
  font-size: 14px;
  font-weight: 700;
}
.portal-brand strong {
  display: block;
  font-size: 22px;
  white-space: nowrap;
  line-height: 1.3;
}
.portal-brand small {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #d9e7ff;
  white-space: nowrap;
  margin-top: 2px;
}
.portal-nav {
  padding: 14px 13px;
  display: grid;
  gap: 8px;
}
.nav-row {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 46px;
  padding: 10px 18px;
  color: white;
  background: transparent;
  border: 0;
  border-radius: 7px;
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
}
.nav-row :deep(img) {
  filter: brightness(0) invert(1);
}
.nav-row > span {
  flex: 1;
}
.nav-row .chevron {
  margin-left: auto;
}
.nav-row:hover {
  background: #ffffff19;
}
.dashboard-link {
  background: #2c85ff;
  font-weight: 700;
}
.submenu {
  list-style: none;
  margin: 4px 0 7px 30px;
  padding: 0 0 0 18px;
  border-left: 1px solid #ffffff40;
}
.submenu button,
.submenu a {
  display: block;
  width: 100%;
  padding: 9px 6px;
  text-align: left;
  font-size: 12px;
  color: #e6f0ff;
  cursor: pointer;
  border: 0;
  background: transparent;
  border-radius: 4px;
}
.submenu button:hover,
.submenu a:hover {
  background: #ffffff15;
  color: white;
}
.portal-sidebar footer {
  margin-top: auto;
  padding: 30px 20px 25px;
  text-align: center;
  color: #d5e6ff;
  font-size: 11px;
}
.submenu a {
  text-decoration: none;
}
.group-active,
.submenu .submenu-active {
  background: #ffffff19;
  font-weight: 700;
}
</style>
