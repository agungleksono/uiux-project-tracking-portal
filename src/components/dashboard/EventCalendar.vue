<script setup lang="ts">
import { computed, ref } from 'vue'
import type { DashboardEvent } from '@/types/dashboard'
const props = defineProps<{ events: DashboardEvent[] }>()
const today = new Date()
const month = ref(new Date(today.getFullYear(), today.getMonth(), 1))
const selectedDay = ref<number | null>(null)
const heading = computed(() =>
  month.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
)
const isDemoMonth = computed(
  () =>
    month.value.getMonth() === today.getMonth() &&
    month.value.getFullYear() === today.getFullYear(),
)
const days = computed(() => {
  const leading = (month.value.getDay() + 6) % 7
  const count = new Date(
    month.value.getFullYear(),
    month.value.getMonth() + 1,
    0,
  ).getDate()
  return Array.from({ length: Math.ceil((leading + count) / 7) * 7 }, (_, i) =>
    i >= leading && i < leading + count ? i - leading + 1 : null,
  )
})
const selectedEvents = computed(() =>
  isDemoMonth.value
    ? props.events.filter((event) => event.day === selectedDay.value)
    : [],
)
function changeMonth(offset: number) {
  month.value = new Date(
    month.value.getFullYear(),
    month.value.getMonth() + offset,
    1,
  )
  selectedDay.value = null
}
function hasEvent(day: number) {
  return isDemoMonth.value && props.events.some((event) => event.day === day)
}
</script>
<template>
  <div class="calendar">
    <div class="calendar-heading">
      <v-btn
        icon="mdi-chevron-left"
        size="small"
        variant="text"
        aria-label="Previous month"
        @click="changeMonth(-1)"
      />
      <span aria-live="polite">{{ heading }}</span>
      <v-btn
        icon="mdi-chevron-right"
        size="small"
        variant="text"
        aria-label="Next month"
        @click="changeMonth(1)"
      />
    </div>
    <div class="calendar-grid">
      <span
        v-for="day in ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']"
        :key="day"
        class="weekday"
        >{{ day }}</span
      >
      <template v-for="(day, index) in days" :key="index">
        <button
          v-if="day"
          type="button"
          class="calendar-day"
          :class="{
            'has-event': hasEvent(day),
            selected: selectedDay === day,
            today: isDemoMonth && today.getDate() === day,
          }"
          :aria-label="`${heading}, ${day}${hasEvent(day) ? ', event scheduled' : ''}`"
          :aria-pressed="selectedDay === day"
          @click="selectedDay = day"
        >
          {{ day }}
        </button>
        <span v-else />
      </template>
    </div>
  </div>
  <p class="calendar-caption"><span /> Scheduled event · sample data</p>
  <div v-if="selectedDay !== null" class="day-details" aria-live="polite">
    <p v-if="!selectedEvents.length">
      No events on {{ heading }} {{ selectedDay }}.
    </p>
    <p v-for="event in selectedEvents" :key="event.id">
      <strong>{{ event.application }}</strong
      ><br />{{ event.status }}
    </p>
  </div>
</template>
<style scoped>
.calendar {
  background: #f2f6fc;
  border-radius: 12px;
  overflow: hidden;
  color: #16365b;
  box-shadow:
    0 8px 0 #b8c8db,
    0 14px 20px #061d4433;
}
.calendar-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;
  background: linear-gradient(#077ac3, #07549b);
  color: white;
  padding: 8px 3px;
  font-size: 16px;
  font-weight: 700;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 3px;
  padding: 12px 10px 16px;
}
.weekday {
  font-size: 11px;
  color: #69809b;
  text-align: center;
  padding: 4px 0;
}
.calendar-day {
  position: relative;
  border-radius: 6px;
  min-height: 32px;
  font-size: 13px;
  background: transparent;
  border: 1px solid transparent;
  color: inherit;
  cursor: pointer;
}
.calendar-day:hover {
  background: #dce9fa;
}
.calendar-day.today {
  border-color: #1966fa;
}
.calendar-day.selected {
  background: #1966fa;
  color: white;
}
.calendar-day.has-event::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #12aa97;
  bottom: 2px;
  left: calc(50% - 2px);
}
.calendar-caption {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin-top: 23px;
  color: #c5d7ed;
  font-size: 11px;
}
.calendar-caption span {
  width: 6px;
  height: 6px;
  background: #21ceb4;
  border-radius: 50%;
}
.day-details {
  margin-top: 16px;
  font-size: 12px;
  line-height: 1.6;
}
</style>
