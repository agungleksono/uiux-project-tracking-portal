<script setup lang="ts">
import { computed, ref } from 'vue'
const month = ref(new Date(2026, 8, 1))
const selectedDay = ref(15)
const heading = computed(() =>
  month.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
)
const days = computed(() => {
  const start = month.value.getDay()
  const count = new Date(
    month.value.getFullYear(),
    month.value.getMonth() + 1,
    0,
  ).getDate()
  return Array.from(
    { length: Math.ceil((start + count) / 7) * 7 },
    (_, index) =>
      index >= start && index < start + count ? index - start + 1 : null,
  )
})
function changeMonth(offset: number) {
  month.value = new Date(
    month.value.getFullYear(),
    month.value.getMonth() + offset,
    1,
  )
  selectedDay.value = 0
}
</script>
<template>
  <div class="compact-calendar">
    <div class="calendar-toolbar">
      <button
        type="button"
        aria-label="Previous month"
        @click="changeMonth(-1)"
      >
        ‹
      </button>
      <span aria-live="polite">{{ heading }}</span>
      <button type="button" aria-label="Next month" @click="changeMonth(1)">
        ›
      </button>
    </div>
    <div class="calendar-days">
      <span
        v-for="name in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
        :key="name"
        class="day-name"
        >{{ name }}</span
      >
      <template v-for="(day, index) in days" :key="index">
        <button
          v-if="day"
          type="button"
          :class="{ selected: selectedDay === day }"
          :aria-label="heading + ' ' + day"
          :aria-pressed="selectedDay === day"
          @click="selectedDay = day"
        >
          {{ day }}
        </button>
        <span v-else />
      </template>
    </div>
  </div>
</template>
<style scoped>
.calendar-toolbar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: #335689;
  font-size: 12px;
  margin-top: -8px;
}
.calendar-toolbar button {
  width: 24px;
  height: 25px;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;
}
.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  text-align: center;
  gap: 1px;
  font-size: 10px;
}
.day-name {
  color: #708ab1;
  padding: 3px 0;
}
.calendar-days button {
  min-height: 17px;
  border-radius: 4px;
  border: 0;
  color: #15396d;
  background: none;
  cursor: pointer;
}
.calendar-days button:hover {
  background: #eaf2ff;
}
.calendar-days button.selected {
  color: #1680ff;
  font-weight: 700;
  background: #edf5ff;
}
@media (max-width: 700px) {
  .calendar-days button {
    min-height: 30px;
  }
}
</style>
