<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  values: number[]
  colors: string[]
  labels: string[]
  title: string
  total?: number
  percentages?: boolean
}>()
const segments = computed(() => {
  const sum = props.values.reduce((a, b) => a + b, 0)
  let position = 0
  return props.values.map((value, index) => {
    const percent = sum > 0 ? (value / sum) * 100 : 0
    const middle = ((position + percent / 2) / 100) * Math.PI * 2 - Math.PI / 2
    const segment = {
      percent,
      offset: -position,
      color: props.colors[index],
      label: props.labels[index],
      value,
      x: 80 + 60 * Math.cos(middle),
      y: 80 + 60 * Math.sin(middle),
    }
    position += percent
    return segment
  })
})
</script>
<template>
  <svg viewBox="0 0 160 160" class="donut-chart" role="img" :aria-label="title">
    <title>{{ title }}</title>
    <desc>
      {{
        segments
          .map((segment) => segment.label + ': ' + segment.value)
          .join(', ')
      }}
    </desc>
    <circle
      cx="80"
      cy="80"
      r="60"
      fill="none"
      stroke="#e9edf4"
      stroke-width="25"
    />
    <g transform="rotate(-90 80 80)">
      <circle
        v-for="segment in segments"
        :key="segment.label"
        cx="80"
        cy="80"
        r="60"
        fill="none"
        :stroke="segment.color"
        :stroke-width="percentages ? 34 : 25"
        pathLength="100"
        :stroke-dasharray="segment.percent + ' ' + (100 - segment.percent)"
        :stroke-dashoffset="segment.offset"
      >
        <title>{{ segment.label }}: {{ segment.value }}</title>
      </circle>
    </g>
    <template v-if="total !== undefined">
      <text x="80" y="83" class="total" text-anchor="middle">{{ total }}</text>
      <text x="80" y="108" class="total-label" text-anchor="middle">Total</text>
    </template>
    <template v-if="percentages">
      <text
        v-for="segment in segments"
        :key="segment.label"
        :x="segment.x"
        :y="segment.y + 4"
        text-anchor="middle"
        class="percentage"
      >
        {{ segment.percent.toFixed(1) }}%
      </text>
    </template>
  </svg>
</template>
<style scoped>
.donut-chart {
  display: block;
  width: 126px;
  max-width: 100%;
}
.total {
  font-family: inherit;
  font-size: 32px;
  font-weight: 700;
  fill: #102955;
}
.total-label {
  font-family: inherit;
  font-size: 15px;
  fill: #6a85b1;
}
.percentage {
  font-family: inherit;
  font-size: 11px;
  font-weight: 700;
  fill: white;
}
</style>
