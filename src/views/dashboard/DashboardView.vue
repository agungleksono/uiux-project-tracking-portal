<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DashboardCard from '@/components/dashboard/DashboardCard.vue'
import PieChart from '@/components/dashboard/PieChart.vue'
import PaymentChart from '@/components/dashboard/PaymentChart.vue'
import EventCalendar from '@/components/dashboard/EventCalendar.vue'
import {
  portfolios,
  paymentSegments,
  monthlyPayments,
  upcomingEvents,
  latestEvents,
  profile,
} from '@/data/dashboard'
</script>
<template>
  <DashboardLayout>
    <div class="dashboard">
      <div class="page-heading">
        <h1>Dashboard</h1>
        <span>Sample data</span>
      </div>
      <div class="dashboard-grid">
        <DashboardCard title="Portfolio" class="portfolio-card">
          <div class="portfolio-grid">
            <figure v-for="portfolio in portfolios" :key="portfolio.id">
              <PieChart
                :segments="portfolio.segments"
                :label="portfolio.title + ' portfolio'"
              />
              <figcaption>{{ portfolio.title }}</figcaption>
            </figure>
          </div>
        </DashboardCard>
        <DashboardCard title="Payment" class="payment-card">
          <div class="payment-grid">
            <div class="payment-summary">
              <PieChart :segments="paymentSegments" label="Payment status" />
              <ul>
                <li v-for="segment in paymentSegments" :key="segment.label">
                  <span :style="{ background: segment.color }" />{{
                    segment.label
                  }}
                </li>
              </ul>
            </div>
            <PaymentChart :items="monthlyPayments" />
          </div>
        </DashboardCard>
        <DashboardCard title="Next Event" class="upcoming-card">
          <div class="upcoming-grid">
            <div v-for="event in upcomingEvents" :key="event.label">
              <h3>{{ event.label }}</h3>
              <span class="event-count">{{ event.count }}</span>
            </div>
          </div>
        </DashboardCard>
        <DashboardCard title="Latest Event" class="latest-card">
          <ul class="latest-events">
            <li v-for="event in latestEvents" :key="event.id">
              Your application status ({{ event.application }}),
              {{ event.status }}
            </li>
          </ul>
        </DashboardCard>
        <DashboardCard title="Profile" class="profile-card">
          <div
            class="profile-image"
            role="img"
            aria-label="Company image placeholder"
          >
            <v-icon icon="mdi-image" size="154" />
          </div>
          <dl class="profile-details">
            <div v-for="field in profile" :key="field.label">
              <dt>{{ field.label }}</dt>
              <dd>{{ field.value }}</dd>
            </div>
          </dl>
        </DashboardCard>
        <DashboardCard title="Event in Month" class="calendar-card">
          <div class="calendar-content">
            <EventCalendar :events="latestEvents" />
          </div>
        </DashboardCard>
      </div>
    </div>
  </DashboardLayout>
</template>
<style scoped>
.dashboard {
  background: #002454;
  padding: 32px;
  border-radius: 11px;
  min-height: calc(100dvh - 126px);
}
.page-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 0 12px 27px;
}
h1 {
  font-size: 16px;
  line-height: 1.4;
  margin: 0;
  font-weight: 700;
}
.page-heading > span {
  font-size: 11px;
  color: #a4bddf;
  border: 1px solid #ffffff22;
  border-radius: 4px;
  padding: 3px 7px;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: minmax(0, 2.28fr) minmax(300px, 1fr);
  grid-template-areas: 'portfolio profile' 'payment profile' 'upcoming calendar' 'latest calendar';
  gap: 28px 30px;
}
.portfolio-card {
  grid-area: portfolio;
}
.payment-card {
  grid-area: payment;
}
.upcoming-card {
  grid-area: upcoming;
}
.latest-card {
  grid-area: latest;
}
.profile-card {
  grid-area: profile;
}
.calendar-card {
  grid-area: calendar;
}
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.portfolio-grid figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -3px 0 -14px;
}
figcaption {
  font-weight: 700;
  font-size: 16px;
}
.payment-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 22px;
  margin-top: -25px;
  align-items: center;
  min-height: 140px;
}
.payment-summary {
  display: flex;
  gap: 25px;
  justify-content: center;
  align-items: center;
  padding-top: 16px;
}
.payment-summary ul {
  list-style: none;
  padding: 0;
  font-weight: 700;
  font-size: 16px;
}
.payment-summary li {
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.6;
}
.payment-summary li span {
  width: 11px;
  height: 11px;
}
.upcoming-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  text-align: center;
  padding: 2px 12px 5px;
}
.upcoming-grid h3 {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 14px;
}
.event-count {
  display: grid;
  place-items: center;
  width: 82px;
  height: 82px;
  margin: auto;
  background: #0b2649;
  border: 1px solid #4c6382;
  font-size: 42px;
  font-weight: 700;
}
.latest-events {
  list-style: none;
  padding: 0;
  margin: -9px 0 0;
  font-size: 16px;
  line-height: 1.85;
}
.latest-events li {
  padding-left: 13px;
  position: relative;
  overflow-wrap: anywhere;
}
.latest-events li::before {
  content: '-';
  position: absolute;
  left: 0;
}
.profile-image {
  display: flex;
  justify-content: center;
  margin: 14px 0 22px;
}
.profile-details {
  margin: 0 10px 18px;
  font-size: 16px;
}
.profile-details > div {
  display: grid;
  grid-template-columns: 140px minmax(0, 1fr);
  margin-bottom: 14px;
  line-height: 1.5;
}
.profile-details dd {
  position: relative;
  padding-left: 16px;
  margin: 0;
  overflow-wrap: anywhere;
}
.profile-details dd::before {
  content: ':';
  position: absolute;
  left: 0;
}
.calendar-content {
  max-width: 275px;
  margin: 50px auto 28px;
}
@media (min-width: 1600px) {
  .dashboard-grid {
    grid-template-rows: 198px 198px 198px minmax(208px, auto);
  }
}
@media (max-width: 1450px) {
  .dashboard {
    padding: 24px;
  }
  .dashboard-grid {
    grid-template-columns: minmax(0, 1.8fr) minmax(280px, 1fr);
    gap: 20px;
  }
  .payment-summary {
    gap: 10px;
  }
  .payment-summary :deep(.pie-chart) {
    width: 115px;
  }
  .profile-details {
    margin-inline: 0;
    font-size: 14px;
  }
  .profile-details > div {
    grid-template-columns: 100px minmax(0, 1fr);
  }
  .latest-events {
    font-size: 14px;
  }
}
@media (max-width: 1200px) and (min-width: 1001px) {
  .dashboard-grid {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'portfolio' 'payment' 'upcoming' 'latest' 'profile' 'calendar';
  }
  .calendar-content {
    margin-top: 20px;
  }
}
@media (max-width: 760px) {
  .dashboard {
    padding: 20px 14px;
  }
  .dashboard-grid {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'portfolio' 'payment' 'upcoming' 'latest' 'profile' 'calendar';
    gap: 18px;
  }
  .page-heading {
    margin-inline: 4px;
  }
  .calendar-content {
    margin-top: 20px;
  }
}
@media (max-width: 480px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 24px;
    padding-bottom: 12px;
  }
  .payment-grid {
    grid-template-columns: 1fr;
    margin-top: 0;
  }
  .payment-summary {
    padding-top: 0;
  }
  .upcoming-grid {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 22px;
    padding-inline: 0;
  }
  .profile-details > div {
    grid-template-columns: 95px minmax(0, 1fr);
  }
}
</style>
