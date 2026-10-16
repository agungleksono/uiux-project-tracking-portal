<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ items: { month: string; value: number }[] }>()
const bars = computed(() =>
  props.items.map((item, index) => ({
    ...item,
    x: 12 + index * (438 / props.items.length),
    y:
      142 -
      (item.value / Math.max(1, ...props.items.map((i) => i.value))) * 110,
  })),
)
const line = computed(() =>
  bars.value.map((bar) => `${bar.x + 11},${bar.y}`).join(' '),
)
</script>
<template>
  <svg
    class="trend-chart"
    viewBox="0 0 465 170"
    role="img"
    aria-label="Payment trend from January to December, sample data"
  >
    <title>Payment Trend</title>
    <path
      v-for="tick in 5"
      :key="tick"
      :d="`M10 ${16 + (tick - 1) * 31.5} H455`"
      stroke="#e1e9f6"
    />
    <g v-for="bar in bars" :key="bar.month">
      <rect
        :x="bar.x"
        :y="bar.y"
        width="23"
        :height="142 - bar.y"
        rx="2"
        fill="#3183fc"
      >
        <title>{{ bar.month }}: {{ bar.value }}</title>
      </rect>
      <text
        :x="bar.x + 11"
        y="160"
        text-anchor="middle"
        fill="#6680ad"
        font-size="10"
      >
        {{ bar.month }}
      </text>
    </g>
    <polyline :points="line" fill="none" stroke="#0872ff" stroke-width="2.5" />
  </svg>
</template>
<style scoped>
.trend-chart {
  display: block;
  width: 100%;
  height: 162px;
}
</style>
