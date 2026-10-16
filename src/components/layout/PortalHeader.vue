<script setup lang="ts">
import { ref } from 'vue'
import AssetIcon from '@/components/common/AssetIcon.vue'
import bars from '@/assets/icons/bars-solid-full.svg'
import bell from '@/assets/icons/bell-solid-full.svg'
import user from '@/assets/icons/user-solid-full.svg'
withDefaults(
  defineProps<{
    navigationOpen: boolean
    userName?: string
    userRole?: string
  }>(),
  { userName: 'user client', userRole: 'Client' },
)
const emit = defineEmits<{ 'toggle-navigation': []; notifications: [] }>()
const toggleButton = ref<HTMLButtonElement | null>(null)
function focusNavigationToggle() {
  toggleButton.value?.focus()
}
defineExpose({ focusNavigationToggle })
</script>
<template>
  <header class="portal-header">
    <button
      ref="toggleButton"
      class="header-icon"
      type="button"
      aria-label="Toggle navigation"
      :aria-expanded="navigationOpen"
      aria-controls="dashboard-navigation"
      @click="emit('toggle-navigation')"
    >
      <AssetIcon :src="bars" :size="24" />
    </button>
    <div class="header-title">
      <strong>AFFA Work Management System</strong
      ><span>Project Tracking Portal</span>
    </div>
    <button
      class="header-icon notification"
      type="button"
      aria-label="Notifications"
      @click="emit('notifications')"
    >
      <AssetIcon :src="bell" :size="29" /><i />
    </button>
    <div class="header-account">
      <span class="avatar"><AssetIcon :src="user" :size="30" /></span
      ><span
        ><strong>{{ userName }}</strong
        ><small>{{ userRole }}</small></span
      >
    </div>
  </header>
</template>

<style scoped>
.portal-header {
  min-height: 88px;
  padding: 12px 28px 12px 20px;
  display: flex;
  align-items: center;
  gap: 26px;
  background: white;
}
.header-icon {
  width: 36px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 0;
  background: none;
  cursor: pointer;
  border-radius: 6px;
  position: relative;
  flex-shrink: 0;
}
.header-icon:hover {
  background: #edf3ff;
}
.header-title {
  display: flex;
  align-items: baseline;
  gap: 16px;
  flex: 1;
  flex-wrap: wrap;
}
.header-title strong {
  font-size: 22px;
  line-height: 1.3;
}
.header-title > span {
  font-size: 17px;
  font-weight: 700;
  color: #087cff;
}
.notification i {
  position: absolute;
  width: 7px;
  height: 7px;
  background: #e74b55;
  border-radius: 50%;
  top: 1px;
  right: 4px;
}
.header-account {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 158px;
}
.avatar {
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #d9e7ff;
}
.header-account strong {
  display: block;
  font-size: 15px;
}
.header-account small {
  display: block;
  font-size: 12px;
  color: #748cb5;
  margin-top: 3px;
}
@media (max-width: 1250px) {
  .header-title {
    gap: 2px 12px;
  }
}
@media (max-width: 1250px) {
  .header-title strong {
    font-size: 19px;
  }
}
@media (max-width: 1250px) {
  .header-title > span {
    font-size: 14px;
  }
}
@media (max-width: 1250px) {
  .portal-header {
    gap: 18px;
  }
}
@media (max-width: 1250px) {
  .header-account {
    min-width: 100px;
  }
}
@media (max-width: 600px) {
  .portal-header {
    padding: 12px;
    gap: 10px;
  }
}
@media (max-width: 600px) {
  .header-title strong {
    font-size: 15px;
  }
}
@media (max-width: 600px) {
  .header-title > span {
    font-size: 12px;
  }
}
@media (max-width: 600px) {
  .header-account {
    min-width: 0;
  }
}
@media (max-width: 600px) {
  .header-account > span:last-child {
    display: none;
  }
}
@media (max-width: 600px) {
  .avatar {
    width: 38px;
    height: 38px;
  }
}
@media (max-width: 600px) {
  .notification {
    display: none;
  }
}
</style>
