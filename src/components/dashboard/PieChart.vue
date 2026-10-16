<script setup lang="ts">
import { computed } from 'vue'
import type { ChartSegment } from '@/types/dashboard'

const props = defineProps<{ segments: ChartSegment[]; label: string }>()
const slices = computed(() => {
  const total = props.segments.reduce((sum, segment) => sum + segment.value, 0)
  if (total <= 0) return []
  let angle = -Math.PI / 2
  return props.segments
    .filter((segment) => segment.value > 0)
    .map((segment) => {
      const start = angle
      angle += (segment.value / total) * Math.PI * 2
      // Keep a single-segment circle drawable as an arc.
      const end = Math.min(angle, start + Math.PI * 2 - 0.00001)
      const point = (a: number) => [
        100 + 83 * Math.cos(a),
        67 + 49 * Math.sin(a),
      ]
      const [x1, y1] = point(start)
      const [x2, y2] = point(end)
      return {
        ...segment,
        path: `M100 67 L${x1} ${y1} A83 49 0 ${end - start > Math.PI ? 1 : 0} 1 ${x2} ${y2} Z`,
      }
    })
})
const description = computed(() =>
  props.segments
    .map((segment) => `${segment.label}: ${segment.value}`)
    .join(', '),
)
</script>
<template>
  <svg
    class="pie-chart"
    viewBox="0 0 200 145"
    role="img"
    :aria-label="label + '. ' + description"
  >
    <title>{{ label }}</title>
    <desc>{{ description }}</desc>
    <g transform="translate(0 13)" class="pie-depth">
      <path
        v-for="slice in slices"
        :key="slice.label"
        :d="slice.path"
        :fill="slice.color"
      />
    </g>
    <path
      v-for="slice in slices"
      :key="slice.label"
      :d="slice.path"
      :fill="slice.color"
      stroke="#173864"
      stroke-width="1"
    >
      <title>{{ slice.label }}: {{ slice.value }}</title>
    </path>
  </svg>
</template>
<style scoped>
.pie-chart {
  display: block;
  width: 155px;
  max-width: 100%;
  filter: drop-shadow(0 7px 3px #071c4533);
}
.pie-depth {
  filter: brightness(0.68);
}
</style>
