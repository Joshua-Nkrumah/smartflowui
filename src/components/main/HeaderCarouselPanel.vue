<template>
  <div class="col-md-12 col-lg-12">
    <div>
      <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
        <div class="col-md-3">
          <q-card class="card-shadow ">
            <q-item>
              <div class="row flex-center">
                <q-item-section avatar class="col-4">
                  <q-avatar size="5rem" icon="fa-solid fa-people-group" rounded text-color="yellow-9" />
                </q-item-section>
                <q-item-section class="col-8">
                  <q-item-label class="text-weight-bold" style="font-size: 1rem">
                    Total Members
                  </q-item-label>
                  <q-item-label caption lines="1" class="text-bold" style="font-size: 2rem">
                    <span class="text-h5">{{ memberCount }}</span>
                  </q-item-label>
                </q-item-section>
              </div>
            </q-item>
          </q-card>
        </div>
        <div class="col-md-3 ">
          <q-card class="card-shadow">
            <q-item>
              <div class="row flex-center">
                <q-item-section avatar class="col-4">
                  <q-avatar size="5rem" icon="fa-solid fa-hand-holding-dollar" rounded text-color="green-8" />
                </q-item-section>
                <q-item-section class="col-8">
                  <q-item-label class="text-weight-bold" style="font-size: 0.9rem">
                    Total Contributions
                  </q-item-label>
                  <q-item-label caption lines="1" class="text-bold" style="font-size: 2rem">
                    <span class="text-h5">{{ contributionCount }}</span>
                  </q-item-label>
                </q-item-section>
              </div>
            </q-item>
          </q-card>
        </div>
        <div class="col-md-3 ">
          <q-card class="card-shadow">
            <q-item>
              <div class="row flex-center">
                <q-item-section avatar class="col-4">
                  <q-avatar size="5rem" icon="fa-solid fa-gifts" rounded text-color="red-6" />
                </q-item-section>
                <q-item-section class="col-8">
                  <q-item-label class="text-weight-bold" style="font-size: 1rem">
                    Total Donations
                  </q-item-label>
                  <q-item-label caption lines="1" class="text-bold" style="font-size: 2rem"> <span class="text-h5">{{
                    donationCount }}</span>
                  </q-item-label>
                </q-item-section>
              </div>
            </q-item>
          </q-card>
        </div>
        <div class="col-md-3 ">
          <q-card class="card-shadow">
            <q-item>
              <div class="row flex-center">
                <q-item-section avatar class="col-4">
                  <q-avatar size="5rem" icon="fa-solid fa-handshake-angle" rounded text-color="blue-8" />
                </q-item-section>
                <q-item-section class="col-8">
                  <q-item-label class="text-weight-bold" style="font-size: 1rem">
                    Total Volunteers
                  </q-item-label>
                  <q-item-label caption lines="1" class="text-bold" style="font-size: 2rem"> <span class="text-h5"> {{
                    volunteerCount }}</span>
                  </q-item-label>
                </q-item-section>
              </div>
            </q-item>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWelfareStore } from 'src/stores/welfare-store';



const welfareStore = useWelfareStore();

const memberCount = computed(() => {
  const result = welfareStore?.listOfMembers?.total;
  console.log('memberCount_____', result);
  return result;
});


const volunteerCount = computed(() => {
  return welfareStore?.listOfVolunteers?.total;
});


const contributionCount = computed(() => {
  var allContributions = welfareStore?.listOfContributions?.total;
  return allContributions;
});

const contributionTotalAmount = computed(() => {
  var allContributions = welfareStore?.listOfContributions?.records.map(contribution => contribution.contribution);
  const totalAmount = allContributions.reduce((accumulator, currentItem: any) => {
    return accumulator + currentItem?.amount;
  }, 0); // 0 is the initial value for the accumulator

  return totalAmount;
});


const donationCount = computed(() => {
  var allDonations = welfareStore?.listOfDonations?.total;
  return allDonations;
});

const donationTotalAmount = computed(() => {
  var allDonations = welfareStore?.listOfDonations?.records.map(donation => donation.donation);
  const totalAmount = allDonations.reduce((accumulator, currentItem: any) => {
    return accumulator + currentItem?.amount;
  }, 0); // 0 is the initial value for the accumulator

  return totalAmount;
});

</script>

<style scoped>
@import '../../css/hope-ui.css';
@import '../../css/custom.min.css';
@import '../../css/hope-ui.min.css';
@import '../../css/core/libs.min.css';

.no_border_radius {
  border-radius: 0px !important;
}

.text-white {
  color: #ffffff !important;
}

.q-carousel {
  background-color: transparent;
  /* Set the background color */
  border-radius: 4px;
  /* Optional: Add rounded corners */
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  /* Apply a subtle shadow */
}
</style>
