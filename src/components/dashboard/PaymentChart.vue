<script setup lang="ts">
import { computed, useId } from 'vue'
const props = defineProps<{ items: { month: string; value: number }[] }>()
const gradientId = useId()
const maximum = computed(
  () => Math.max(1, ...props.items.map((item) => item.value)) * 1.3,
)
const points = computed(() =>
  props.items.map((item, index) => {
    const step = 350 / Math.max(1, props.items.length)
    return {
      ...item,
      x: 39 + index * step,
      y: 125 - (item.value / maximum.value) * 112,
      width: step * 0.68,
    }
  }),
)
const line = computed(() =>
  points.value
    .map((point) => `${point.x + point.width / 2},${point.y}`)
    .join(' '),
)
</script>
<template>
  <figure class="payment-chart">
    <svg
      viewBox="0 0 410 153"
      role="img"
      aria-label="Monthly payment trend, sample values"
    >
      <title>Payments per month</title>
      <defs>
        <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#079bdf" />
          <stop offset="1" stop-color="#90b8d8" />
        </linearGradient>
      </defs>
      <path
        d="M22 13 V125 H395"
        fill="none"
        stroke="#1e92d7"
        stroke-width="2"
      />
      <path
        v-for="tick in 5"
        :key="tick"
        :d="`M5 ${13 + (tick - 1) * 28} H22`"
        stroke="#3889bb"
      />
      <g v-for="point in points" :key="point.month">
        <rect
          :x="point.x"
          :y="point.y"
          :width="point.width"
          :height="125 - point.y"
          :fill="`url(#${gradientId})`"
        >
          <title>{{ point.month }}: {{ point.value }}</title>
        </rect>
        <text
          :x="point.x + point.width / 2"
          y="145"
          text-anchor="middle"
          fill="#bfd6ef"
          font-size="10"
        >
          {{ point.month }}
        </text>
        <circle
          :cx="point.x + point.width / 2"
          :cy="point.y"
          r="3"
          fill="#204779"
          stroke="#6acbff"
        />
      </g>
      <polyline :points="line" fill="none" stroke="#75bfea" stroke-width="1" />
    </svg>
    <figcaption>Per Month</figcaption>
  </figure>
</template>
<style scoped>
.payment-chart {
  margin: 0;
  min-width: 0;
}
svg {
  display: block;
  width: 100%;
  max-height: 120px;
}
figcaption {
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  margin-top: 2px;
}
</style>
