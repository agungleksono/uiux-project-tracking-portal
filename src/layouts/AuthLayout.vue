<script setup lang="ts">
import AppBrand from '@/components/common/AppBrand.vue'
import projectIcon from '@/assets/icons/file-lines-regular-full.svg'
import shieldIcon from '@/assets/icons/shield-solid-full.svg'
import teamIcon from '@/assets/icons/user-group-solid-full.svg'
const features = [
  {
    title: 'Project Update',
    description: 'Real-time progress and status tracking.',
    icon: projectIcon,
    color: 'blue',
  },
  {
    title: 'Secure Access',
    description: 'Reliable and protected data access.',
    icon: shieldIcon,
    color: 'teal',
  },
  {
    title: 'Collaboration with Team',
    description: 'More effective and organized teamwork.',
    icon: teamIcon,
    color: 'amber',
  },
]
</script>
<template>
  <main class="login-page">
    <section class="showcase" aria-labelledby="portal-heading">
      <AppBrand variant="light" />
      <div class="showcase-content">
        <h1 id="portal-heading">
          Monitor your projects<br /><span
            >Faster, Easily, and Transparent</span
          >
        </h1>
        <p class="showcase-description">
          AFFA Work Management System helps you track, manage,<br
            class="wide-break"
          />
          and monitor your projects in one integrated platform.
        </p>
        <ul class="feature-list">
          <li v-for="feature in features" :key="feature.title" class="feature">
            <span class="feature-icon" :class="feature.color"
              ><img :src="feature.icon" alt=""
            /></span>
            <div>
              <h2>{{ feature.title }}</h2>
              <p>{{ feature.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="login-panel"><slot /></section>
  </main>
</template>

<style scoped>
.login-page {
  display: grid;
  grid-template-columns: 53.125% 46.875%;
  min-height: 100vh;
  min-height: 100dvh;
}
.showcase {
  position: relative;
  overflow: hidden;
  padding: 68px clamp(40px, 6.25vw, 110px);
  color: #fff;
  background: linear-gradient(72deg, #071c40 15%, #144aa9 68%, #368ff0 100%);
}
.showcase-content {
  position: relative;
  z-index: 1;
  margin: 88px 0 0 10px;
}
.showcase h1 {
  margin: 0;
  font-size: clamp(30px, 2.86vw, 48px);
  line-height: 1.32;
  letter-spacing: -0.6px;
  font-weight: 700;
  white-space: nowrap;
}
.showcase h1 span {
  color: #65c5fa;
  font-size: 0.96em;
}
.showcase-description {
  margin: 48px 0 0;
  font-size: 18px;
  line-height: 1.28;
  letter-spacing: 0.2px;
  color: #e4edff;
}
.feature-list {
  display: grid;
  gap: 25px;
  padding: 0;
  margin: 74px 0 0;
  list-style: none;
}
.feature {
  display: flex;
  gap: 28px;
  align-items: center;
}
.feature-icon {
  display: grid;
  place-items: center;
  width: 66px;
  height: 66px;
  border-radius: 13px;
  flex-shrink: 0;
}
.feature-icon.blue {
  background: #246fc9;
}
.feature-icon.teal {
  background: #139c96;
}
.feature-icon.amber {
  background: #ffae25;
}
.feature-icon img {
  width: 32px;
  height: 32px;
  filter: brightness(0) invert(1);
}
.feature h2 {
  margin: 0 0 6px;
  font-size: 20px;
  line-height: 1.25;
}
.feature p {
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  color: #e0eaff;
}
.login-panel {
  display: flex;
  position: relative;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  padding: 64px 32px;
  background: #f3f7fe;
}
@media (max-width: 1250px) {
  .showcase {
    padding: 48px 36px;
  }
  .showcase-content {
    margin-left: 0;
  }
  .showcase h1 {
    white-space: normal;
  }
  .login-panel {
    padding: 40px 24px;
  }
  .wide-break {
    display: none;
  }
}
@media (max-width: 900px) {
  .login-page {
    grid-template-columns: 1fr;
  }
  .showcase {
    padding: 30px 28px 38px;
  }
  .showcase-content {
    margin-top: 30px;
  }
  .showcase h1 {
    font-size: 32px;
  }
  .showcase-description {
    margin-top: 20px;
  }
  .feature-list {
    display: none;
  }
  .login-panel {
    padding: 32px 24px 48px;
  }
}
@media (max-width: 480px) {
  .showcase {
    padding: 24px;
  }
  .showcase h1 {
    font-size: 27px;
  }
  .showcase-description {
    font-size: 15px;
  }
  .login-panel {
    padding: 24px 16px;
  }
}
</style>
