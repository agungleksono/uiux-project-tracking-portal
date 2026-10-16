<script setup lang="ts">
import { ref } from 'vue'
import AssetIcon from '@/components/common/AssetIcon.vue'
import OverviewCard from '@/components/dashboard/v2/OverviewCard.vue'
import DonutChart from '@/components/dashboard/v2/DonutChart.vue'
import TrendChart from '@/components/dashboard/v2/TrendChart.vue'
import CompactCalendar from '@/components/dashboard/v2/CompactCalendar.vue'
import {
  portfolioOverview,
  portfolioLegend,
  paymentTrend,
  activities,
  type Activity,
} from '@/data/dashboard-v2'
import chartIcon from '@/assets/icons/chart-simple-solid-full.svg'
import moneyIcon from '@/assets/icons/money-check-dollar-solid-full.svg'
import historyIcon from '@/assets/icons/clock-rotate-left-solid-full.svg'
import imageIcon from '@/assets/icons/image-regular-full.svg'
import userIcon from '@/assets/icons/user-solid-full.svg'
import phoneIcon from '@/assets/icons/phone-solid-full.svg'
import envelopeIcon from '@/assets/icons/envelope-solid-full.svg'
import locationIcon from '@/assets/icons/location-dot-solid-full.svg'
const selectedActivity = ref<Activity | null>(null)
const upcoming = [
  { label: 'Tomorrow', count: 2, color: '#1983ff' },
  { label: 'One week', count: 5, color: '#12b980' },
  { label: 'One month', count: 10, color: '#7845ed' },
  { label: 'One year', count: 15, color: '#ff9e1b' },
]
</script>
<template>
  <div class="dashboard-page">
    <div class="page-intro">
      <h1>Dashboard</h1>
      <p>
        Welcome back, user client. Here's an overview of your portfolio and
        activities.
      </p>
    </div>
    <div class="overview-grid">
      <OverviewCard
        title="Portfolio Overview"
        :icon="chartIcon"
        class="portfolio-overview"
      >
        <div class="portfolio-donuts">
          <figure v-for="item in portfolioOverview" :key="item.title">
            <figcaption>{{ item.title }}</figcaption>
            <DonutChart
              :title="item.title + ' portfolio'"
              :values="item.values"
              :colors="portfolioLegend.map((s) => s.color)"
              :labels="portfolioLegend.map((s) => s.label)"
              :total="item.total"
            />
          </figure>
        </div>
        <div class="portfolio-legend">
          <span v-for="item in portfolioLegend" :key="item.label"
            ><i :style="{ background: item.color }" />{{ item.label }}</span
          >
        </div>
      </OverviewCard>
      <OverviewCard title="Client Profile" class="client-profile">
        <div class="client-image">
          <AssetIcon :src="imageIcon" :size="116" />
        </div>
        <h3>PT Maju Terus</h3>
        <ul class="contact-list">
          <li>
            <AssetIcon :src="userIcon" :size="18" /><span
              ><small>PIC</small>Budi Santoso</span
            >
          </li>
          <li>
            <AssetIcon :src="phoneIcon" :size="18" /><a
              href="tel:+6281234567890"
              >+62 812 3456 7890</a
            >
          </li>
          <li>
            <AssetIcon :src="envelopeIcon" :size="18" /><a
              href="mailto:budi@sagaratco.com"
              >budi@sagaratco.com</a
            >
          </li>
          <li>
            <AssetIcon :src="locationIcon" :size="18" /><span
              >Jl. Industri Raya No. 10, Jakarta</span
            >
          </li>
        </ul>
      </OverviewCard>
      <OverviewCard title="Payment" :icon="moneyIcon" class="payment-card">
        <div class="payment-row">
          <section class="payment-section" aria-label="Payment Status">
            <h3>Payment Status</h3>
            <div class="payment-status">
              <DonutChart
                title="Payment Status"
                :values="[72.2, 27.8]"
                :colors="['#3183fc', '#ffad23']"
                :labels="['Paid', 'Unpaid']"
                percentages
              />
              <div class="payment-legend">
                <span><i class="paid" />Paid</span
                ><span><i class="unpaid" />Unpaid</span>
              </div>
            </div>
          </section>
          <section class="payment-section" aria-label="Payment Trend">
            <h3>Payment Trend</h3>
            <TrendChart :items="paymentTrend" />
          </section>
        </div>
      </OverviewCard>
      <div class="events-row">
        <OverviewCard title="Next Event" class="next-event"
          ><template #icon
            ><v-icon icon="mdi-calendar" color="black" size="24"
          /></template>
          <div class="upcoming-events">
            <div
              v-for="event in upcoming"
              :key="event.label"
              class="upcoming-event"
            >
              <v-icon icon="mdi-calendar" :color="event.color" size="22" />
              <div>
                <h3>{{ event.label }}</h3>
                <strong>{{ event.count }}</strong
                ><small>Events</small>
              </div>
            </div>
          </div>
        </OverviewCard>
        <OverviewCard title="Event in Month" class="month-events"
          ><template #icon
            ><v-icon icon="mdi-calendar" color="black" size="24" /></template
          ><CompactCalendar
        /></OverviewCard>
      </div>
      <OverviewCard
        title="Latest Event"
        :icon="historyIcon"
        class="latest-events"
      >
        <div class="activity-table-wrap">
          <table class="activity-table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Application</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="activity in activities" :key="activity.id">
                <td>{{ activity.date }}</td>
                <td>{{ activity.application }}</td>
                <td>{{ activity.description }}</td>
                <td>
                  <span
                    class="status-pill"
                    :class="activity.status.toLowerCase().replace(' ', '-')"
                    >{{ activity.status }}</span
                  >
                </td>
                <td>
                  <button
                    type="button"
                    :aria-label="'View ' + activity.application"
                    @click="selectedActivity = activity"
                  >
                    View <span aria-hidden="true">›</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </OverviewCard>
    </div>
    <v-dialog
      :model-value="!!selectedActivity"
      max-width="480"
      @update:model-value="selectedActivity = null"
    >
      <v-card
        v-if="selectedActivity"
        class="activity-details"
        title="Application details"
      >
        <v-card-text
          ><p>
            <strong>{{ selectedActivity.application }}</strong>
          </p>
          <p>{{ selectedActivity.date }}</p>
          <p>{{ selectedActivity.description }}</p>
          <p>Status: {{ selectedActivity.status }}</p>
          <small>Sample activity for dashboard preview.</small></v-card-text
        >
        <v-card-actions
          ><v-btn @click="selectedActivity = null">Close</v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>
  </div>
</template>
<style scoped>
.page-intro {
  margin-bottom: 10px;
}
.page-intro h1 {
  margin: 0 0 5px;
  font-size: 29px;
  font-weight: 700;
  line-height: 1.25;
}
.page-intro p {
  margin: 0;
  color: #5578ac;
  font-size: 13px;
  line-height: 1.5;
}
.overview-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 20px;
  align-items: start;
}
.portfolio-overview {
  grid-column: 1;
}
.client-profile {
  grid-column: 2;
  grid-row: 1 / span 3;
  min-height: 386px;
}
.client-profile.overview-card.v-card {
  padding: 28px;
}
.portfolio-donuts {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}
.portfolio-donuts figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -4px 0 0;
}
.portfolio-donuts figcaption {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 4px;
}
.portfolio-legend {
  border-top: 1px solid #e1eafa;
  display: flex;
  justify-content: center;
  gap: 54px;
  padding-top: 12px;
  margin-top: 8px;
  font-size: 12px;
  color: #5e7cac;
}
.portfolio-legend span,
.payment-legend span {
  display: flex;
  align-items: center;
  gap: 8px;
}
.portfolio-legend i,
.payment-legend i {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}
.client-image {
  display: flex;
  justify-content: center;
  margin: 22px 0 12px;
}
.client-profile h3 {
  margin: 0 0 24px;
  text-align: center;
  font-size: 25px;
}
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 20px;
  font-size: 16px;
  line-height: 1.6;
}
.contact-list li {
  display: flex;
  align-items: center;
  gap: 12px;
}
.contact-list small {
  display: block;
  font-size: 14px;
  color: #6786b5;
  font-weight: 700;
  margin-bottom: 1px;
}
.contact-list a {
  color: inherit;
  text-decoration: none;
  overflow-wrap: anywhere;
}
.contact-list a:hover {
  text-decoration: underline;
}
.payment-card {
  grid-column: 1;
}
.payment-row {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1fr);
  gap: 24px;
}
.payment-section {
  min-width: 0;
}
.payment-section h3 {
  font-size: 14px;
  margin: 0 0 12px;
  color: #5473a6;
}
.payment-section + .payment-section {
  border-left: 1px solid #e1e9f6;
  padding-left: 24px;
}
.client-profile :deep(h2) {
  font-size: 23px;
}
.contact-list li > span {
  min-width: 0;
  overflow-wrap: anywhere;
}
.payment-status {
  display: flex;
  align-items: center;
  gap: 44px;
  min-height: 159px;
  padding-left: 10px;
}
.payment-status :deep(.donut-chart) {
  width: 162px;
}
.payment-legend {
  display: grid;
  gap: 24px;
  font-size: 12px;
}
.paid {
  background: #3183fc;
}
.unpaid {
  background: #ffad23;
}
.events-row {
  grid-column: 1;
  display: grid;
  grid-template-columns: minmax(0, 2.04fr) minmax(240px, 1fr);
  gap: 12px;
  align-items: stretch;
}
.next-event :deep(h2),
.month-events :deep(h2) {
  margin-bottom: 6px;
}
.upcoming-events {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}
.upcoming-event {
  background: #f3f7ff;
  border-radius: 8px;
  min-height: 120px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  padding: 14px 8px;
  text-align: center;
}
.upcoming-event > .v-icon {
  margin-top: 11px;
}
.upcoming-event h3 {
  margin: 0 0 4px;
  color: #5473a6;
  font-size: 12px;
  white-space: nowrap;
}
.upcoming-event strong {
  font-size: 27px;
  display: block;
}
.upcoming-event small {
  display: block;
  color: #718db6;
  font-size: 11px;
}
.latest-events {
  grid-column: 1 / -1;
}
.latest-events :deep(h2) {
  margin-bottom: 5px;
}
.activity-table-wrap {
  overflow-x: auto;
}
.activity-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
  white-space: nowrap;
}
.activity-table th {
  background: #f0f5fd;
  color: #5473a6;
  font-weight: 700;
  padding: 10px 15px;
}
.activity-table td {
  padding: 10px 15px;
}
.activity-table td:nth-child(4),
.activity-table th:nth-child(4) {
  text-align: center;
}
.activity-table td:last-child,
.activity-table th:last-child {
  text-align: center;
}
.status-pill {
  display: inline-block;
  min-width: 105px;
  border-radius: 16px;
  padding: 5px 12px;
  font-size: 12px;
}
.in-progress {
  color: #1477f4;
  background: #dceaff;
}
.pending {
  color: #b47312;
  background: #fff0da;
}
.completed {
  color: #008b57;
  background: #d8f8e9;
}
.activity-table button {
  color: #1680ff;
  background: none;
  border: 0;
  cursor: pointer;
  font-size: 14px;
}
.activity-table button:hover {
  text-decoration: underline;
}
.activity-table button span {
  margin-left: 5px;
}
.activity-details p {
  margin-bottom: 12px;
}
@media (max-width: 1400px) {
  .overview-grid {
    grid-template-columns: minmax(0, 1fr) 350px;
  }
  .portfolio-legend {
    gap: 22px;
  }
  .payment-status {
    gap: 18px;
    padding-left: 0;
  }
  .payment-status :deep(.donut-chart) {
    width: 140px;
  }
  .events-row {
    grid-template-columns: minmax(0, 1fr);
  }
  .month-events {
    max-width: none;
  }
}
@media (max-width: 1180px) {
  .overview-grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .client-profile {
    grid-row: auto;
    grid-column: 1;
  }
  .events-row {
    grid-template-columns: minmax(0, 2fr) minmax(240px, 1fr);
  }
  .client-profile {
    min-height: 0;
  }
  .contact-list {
    max-width: 420px;
    margin: 0 auto;
  }
}
@media (max-width: 700px) {
  .page-intro h1 {
    font-size: 25px;
  }
  .portfolio-donuts {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 20px;
  }
  .portfolio-legend {
    flex-wrap: wrap;
    gap: 10px 18px;
    font-size: 11px;
  }
  .payment-row,
  .events-row {
    grid-template-columns: minmax(0, 1fr);
  }
  .payment-section + .payment-section {
    border-left: 0;
    border-top: 1px solid #e1e9f6;
    padding: 18px 0 0;
  }
  .payment-status {
    justify-content: center;
    gap: 35px;
  }
  .upcoming-event {
    gap: 3px;
    flex-direction: column;
    align-items: center;
    padding: 10px 4px;
  }
  .upcoming-event > .v-icon {
    margin-top: 0;
  }
  .upcoming-event h3 {
    font-size: 10px;
  }
}
</style>
