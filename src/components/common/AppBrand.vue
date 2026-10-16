<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'light' | 'card' }>(), { variant: 'card' })
</script>
<template>
  <header class="brand" :class="'brand--' + variant">
    <span class="brand-mark" aria-hidden="true">AFFA</span>
    <div>
      <p class="brand-name">AFFA Work Management System</p>
      <p class="brand-subtitle">Project Tracking Portal</p>
    </div>
  </header>
</template>

<style scoped>
.brand--light {
  display: flex;
  align-items: center;
  gap: 23px;
}
.brand-mark {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 74px;
  height: 74px;
  border-radius: 50%;
  background: #1263df;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
}
.brand-name,
.brand-subtitle {
  margin: 0;
  font-weight: 700;
}
.brand--light .brand-name {
  font-size: clamp(19px, 1.57vw, 26px);
  line-height: 1.3;
}
.brand--light .brand-subtitle {
  color: #d5e3ff;
  font-size: 21px;
  margin-top: 5px;
}
.brand--card {
  text-align: center;
}
.brand--card .brand-mark {
  width: 84px;
  height: 84px;
  margin: 0 auto 12px;
}
.brand--card .brand-name {
  font-size: 20px;
  line-height: 1.3;
}
.brand--card .brand-subtitle {
  margin-top: 5px;
  color: #6076a0;
  font-size: 20px;
  line-height: 1.3;
}
@media (max-width: 1250px) {
  .brand--light {
    gap: 15px;
  }
  .brand--light .brand-subtitle {
    font-size: 18px;
  }
  .brand--light .brand-mark {
    width: 62px;
    height: 62px;
  }
}
@media (max-width: 480px) {
  .brand--light .brand-name {
    font-size: 17px;
  }
  .brand--light .brand-subtitle {
    font-size: 15px;
  }
  .brand--light .brand-mark {
    width: 54px;
    height: 54px;
    font-size: 16px;
  }
  .brand--card .brand-name,
  .brand--card .brand-subtitle {
    font-size: 17px;
  }
}
</style>
