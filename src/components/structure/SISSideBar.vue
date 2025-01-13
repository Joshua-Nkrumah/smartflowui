<template>
  <div>
    <q-list>
      <q-item-label header>
        <q-img src="../../assets/images/cc/logo.png" class="q-ml-xl q-mr-xl" fit="scale-down" width="8rem" />
      </q-item-label>
      <q-separator spaced />
      <br />
      <q-scroll-area style="height: 80vh; max-width: 300px;">
        <q-item clickable tag="a" to="/dashboard">
          <q-item-section avatar>
            <q-icon name="tune" color="primary" />
          </q-item-section>

          <q-item-section color="grey-1">
            <q-item-label color="grey-1" class="text-bold">Choose App</q-item-label>
          </q-item-section>
        </q-item>
        <q-item-label header class="text-bold">Dashboard</q-item-label>

        <q-item clickable tag="a" to="/sis/dashboard">
          <q-item-section avatar>
            <q-icon name="dashboard" color="primary" />
          </q-item-section>
          <q-item-section color="grey-1">
            <q-item-label color="grey-1">SIS Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-item-label header class="text-bold">Student</q-item-label>


        <q-expansion-item expand-separator icon="diversity_1" label="Student Manager" :content-inset-level="0.2"
          group="menu">

          <q-item clickable tag="a" to="/sis/student-manager">
            <q-item-section avatar>
              <q-icon name="o_groups" color="primary" />
            </q-item-section>
            <q-item-section color="grey-1">
              <q-item-label color="grey-1">Profile Overview</q-item-label>
            </q-item-section>
          </q-item>

          <!-- <q-item clickable tag="a" to="/sis/academic-calendar">
            <q-item-section avatar>
              <q-icon name="o_perm_contact_calendar" color="primary" />
            </q-item-section>
            <q-item-section color="grey-1">
              <q-item-label color="grey-1">Academic Calendar</q-item-label>
            </q-item-section>
          </q-item> -->

          <!-- <q-item clickable tag="a" to="/sis/classroom-enrollment">
            <q-item-section avatar>
              <q-icon name="o_airline_seat_legroom_normal" color="primary" />
            </q-item-section>
            <q-item-section color="grey-1">
              <q-item-label color="grey-1">Class Enrollment</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" to="/sis/course-enrollment">
            <q-item-section avatar>
              <q-icon name="o_hub" color="primary" />
            </q-item-section>
            <q-item-section color="grey-1">
              <q-item-label color="grey-1">Course Enrollment</q-item-label>
            </q-item-section>
          </q-item> -->
          <q-item clickable tag="a" to="/uam/apps">
            <q-item-section avatar>
              <q-icon name="o_description" color="primary" />
            </q-item-section>
            <q-item-section color="grey-1">
              <q-item-label color="grey-1">Student Report</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-item-label header class="text-bold">Teachers</q-item-label>

        <q-item clickable tag="a" to="/uam/roles">
          <q-item-section avatar>
            <q-icon name="o_group" color="primary" />
          </q-item-section>
          <q-item-section color="grey-1">
            <q-item-label color="grey-1">Teachers Profile</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" to="/uam/roles">
          <q-item-section avatar>
            <q-icon name="o_assignment_turned_in" color="primary" />
          </q-item-section>
          <q-item-section color="grey-1">
            <q-item-label color="grey-1">Lesson Plans</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" to="/uam/roles">
          <q-item-section avatar>
            <q-icon name="o_query_stats" color="primary" />
          </q-item-section>
          <q-item-section color="grey-1">
            <q-item-label color="grey-1">Student Performance Analytics</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" to="/uam/roles">
          <q-item-section avatar>
            <q-icon name="o_circle_notifications" color="primary" />
          </q-item-section>
          <q-item-section color="grey-1">
            <q-item-label color="grey-1">Communication Center</q-item-label>
          </q-item-section>
        </q-item>

        <q-item-label header class="text-bold">Guardian</q-item-label>
        <q-item clickable tag="a" to="/sis/guardian-portal">
          <q-item-section avatar>
            <q-icon name="o_family_restroom" color="primary" />
          </q-item-section>
          <q-item-section color="grey-1">
            <q-item-label color="grey-1">Guardian Portal</q-item-label>
          </q-item-section>
        </q-item>

        <q-item-label header class="text-bold">Reports</q-item-label>

        <q-item clickable tag="a" to="/uam/apps">
          <q-item-section avatar>
            <q-icon name="o_receipt_long" color="primary" />
          </q-item-section>
          <q-item-section color="grey-1">
            <q-item-label color="grey-1">General Report</q-item-label>
          </q-item-section>
        </q-item>

      </q-scroll-area>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth-store';

const router = useRouter();
const store = useAuthStore();

</script>
