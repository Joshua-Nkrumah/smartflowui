<template>
  <q-card bordered class="my-card shadow-1 card text-dark" style="height: 20rem;">
    <q-card-section>
      <div class="text-h6 card-title text-bold"> Total Revenue Calculator Per Month</div>
      <div>
        <q-tabs v-model="tab" dense align="left" class="text-grey q-pl-sm" active-color="primary"
          indicator-color="primary" narrow-indicator>
          <q-tab name="contributions" label="Contributions" style="width: 10rem;" />
          <q-tab name="donations" label="Donations" style="width: 10rem;" />
        </q-tabs>
        <q-separator spaced />
      </div>
    </q-card-section>
    <q-card-section>
      <q-tab-panels v-model="tab" animated
        style="max-height: 15rem; background-color: rgba(24, 24, 24, 0.9); margin-top: -3.2rem;">
        <q-tab-panel name="contributions" align="left">
          <div class="text-subtitle2 row items-center ">
            <q-card-section class="row-md-12 items-center">
              <q-card-section class="col-md-12">
                <div class="">
                  <q-select color="dark" label-color="dark" bg-color="white" outlined behavior="dialog" :dense="true"
                    v-model="selectedMonth" label="Select Month in Year" :options="monthOptions" style="width: 250px">
                    <template v-slot:after>
                      <q-btn round dense @click="onProcessMonthYearContributionTotalAmount" ripple color="white" size="md"
                        push flat icon="search" :loading="loading" />
                    </template>
                  </q-select>
                </div>
              </q-card-section>
              <q-card-section class="col-md-12 text-white">
                <div class="text-h4  text-bold">{{ monthYearContributionTotalAmount }}</div>
                <div class="text-caption ">
                  <div class="text-h5 text-semibold">Monthly Contribution for {{ currentMonth_ }}, {{
                    currentYear_ }}</div>
                </div>
              </q-card-section>
            </q-card-section>
          </div>
        </q-tab-panel>

        <q-tab-panel name="donations">
          <div class="text-subtitle2 row items-center ">
            <q-card-section class="row-md-12 items-center">
              <q-card-section class="col-md-12 ">
                <div class="">
                  <q-select color="dark" label-color="dark" bg-color="white" outlined behavior="dialog" :dense="true"
                    v-model="selectedMonth" label="Select Month in Year" :options="monthOptions" style="width: 250px">
                    <template v-slot:after>
                      <q-btn round dense @click="onProcessMonthYearDonationTotalAmount" ripple="true" color="white"
                        size="md" push flat icon="search" :loading="loading" />
                    </template>
                  </q-select>
                </div>
              </q-card-section>
              <q-card-section class="col-md-12 text-white">
                <div class="text-h4  text-bold">{{ monthYearDonationTotalAmount }}</div>
                <div class="text-caption ">
                  <div class="text-h5 text-semibold">Monthly Donation for {{ currentMonth_ }}, {{
                    currentYear_ }}</div>
                </div>
              </q-card-section>
            </q-card-section>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth-store';
import { useQuasar } from 'quasar';
import { useWelfareStore } from 'src/stores/welfare-store';
import AAStatusConstants from 'src/constants/aa-status.constants';

const $q = useQuasar();
const router = useRouter();
const store = useAuthStore();
const welfareStore = useWelfareStore();

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const selectedYear = ref(`${currentYear}`);
const loading = ref(false);
const yearOptions = <any>computed(() => {
  let yearoptions = [];
  const minYear = 2023;
  const maxYear = 2050;
  for (let year = minYear; year <= maxYear; year++) {
    yearoptions.push(String(year));
  }
  return yearoptions;
});
const months = <any>ref(['January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]);
const tab = ref('contributions');

const currentMonth_ = ref('');
const currentYear_ = ref('');

const monthOptions = computed(() => {
  const minYear = 2023;
  const maxYear = 2050;
  const monthYearOptions = [];

  for (let year = minYear; year <= maxYear; year++) {
    for (let month = 0; month < 12; month++) {
      monthYearOptions.push(`${months.value[month]}, ${year}`);
    }
  }

  return monthYearOptions;
});

const currentMonthName = computed(() => {
  const currentDate = new Date();
  // Get the current month as a number (0-11)
  const currentMonthNumber = currentDate.getMonth();
  const currentMonthName = months.value[currentMonthNumber];

  // Create a list of month names starting from the current month
  const result = [];
  result.push([currentMonthName]);

  return result;
});
const selectedMonth = ref(`${currentMonthName.value}, ${currentYear}`);


//Pass getMonthNameBeforeComma value to this method
const monthNameToNumber = ((monthName: string): number => {
  // const months_: string[] = [
  //   'January', 'February', 'March', 'April', 'May', 'June',
  //   'July', 'August', 'September', 'October', 'November', 'December'
  // ];

  // Convert monthName to lowercase for case-insensitive comparison
  const lowerCaseMonthName: string = monthName.toLowerCase();

  // Find the index of the month name in the array (returns -1 if not found)
  const monthIndex: number = months.value.findIndex((month: string) => month.toLowerCase() === lowerCaseMonthName);

  return monthIndex + 1;
})

const getMonthNameBeforeComma = computed(() => {
  const inputString = `${selectedMonth.value}`;
  const trimmedString = inputString.trim(); // Trim leading and trailing whitespace
  const commaIndex = trimmedString.indexOf(',');
  let charactersBeforeComma;
  if (commaIndex !== -1) {
    charactersBeforeComma = inputString.substring(0, commaIndex);
  } else {
    charactersBeforeComma = inputString; // Handle the case when there is no comma in the string
  }
  return charactersBeforeComma;
})

const getYearAfterComma = computed(() => {
  const inputString = `${selectedMonth.value}`;
  const trimmedString = inputString.trim(); // Trim leading and trailing whitespace
  const commaIndex = trimmedString.indexOf(',');
  let charactersBeforeComma;
  if (commaIndex !== -1) {
    charactersBeforeComma = inputString.substring(commaIndex + 1);
  } else {
    charactersBeforeComma = inputString; // Handle the case when there is no comma in the string
  }
  return charactersBeforeComma;
})


const monthYearContributionTotalAmount = computed(() => {
  const result = welfareStore?.listOfContributionYearMonthTotal.total
  return result;
});


const monthYearDonationTotalAmount = computed(() => {
  const result = welfareStore?.listOfDonationYearMonthTotal.total
  return result;
});


const onProcessMonthYearContributionTotalAmount = async () => {
  const monthInNumber = monthNameToNumber(getMonthNameBeforeComma.value);
  currentMonth_.value = getMonthNameBeforeComma.value;
  currentYear_.value = getYearAfterComma.value;
  const result = await welfareStore.getAllContributionMonthYearTotal(
    {
      year: parseFloat(`${getYearAfterComma.value}`),
      month: parseFloat(`${monthInNumber}`),
      totalRecords: 0
    }
  );
  if (result.status == AAStatusConstants.SUCCESS) {
    $q.notify({
      color: 'green-8',
      textColor: 'white',
      icon: 'cloud_done',
      position: 'top-right',
      message: `${result.message}`,
    });
  } else {
    $q.notify({
      color: 'red-8',
      textColor: 'white',
      icon: 'close',
      position: 'top-right',
      message: `${result.message}`,
    });
  }
};


const onProcessMonthYearDonationTotalAmount = async () => {
  currentMonth_.value = getMonthNameBeforeComma.value;
  currentYear_.value = getYearAfterComma.value;
  const monthInNumber = monthNameToNumber(getMonthNameBeforeComma.value);
  const result = await welfareStore.getAllDonationMonthYearTotal(
    {
      year: parseFloat(`${getYearAfterComma.value}`),
      month: parseFloat(`${monthInNumber}`),
      totalRecords: 0
    }
  );
  if (result.status == AAStatusConstants.SUCCESS) {
    $q.notify({
      color: 'green-8',
      textColor: 'white',
      icon: 'cloud_done',
      position: 'top-right',
      message: `${result.message}`,
    });
  } else {
    $q.notify({
      color: 'red-8',
      textColor: 'white',
      icon: 'close',
      position: 'top-right',
      message: `${result.message}`,
    });
  }
};




const loadRecords = async () => {
  onProcessMonthYearContributionTotalAmount(),
    onProcessMonthYearDonationTotalAmount
}

onMounted(() => {
  // loadRecords()
});

</script>

<style scoped>
/* @import '../../css/hope-ui.css';
@import '../../css/custom.min.css';
@import '../../css/hope-ui.min.css';
@import '../../css/core/libs.min.css'; */

.no_border_radius {
  border-radius: 0px !important;
}

.text-white {
  color: #ffffff !important;
  /* background-color: #ffe600; */
}

.q-carousel {
  background-color: transparent;
  /* Set the background color */
  border-radius: 4px;
  /* Optional: Add rounded corners */
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  /* Apply a subtle shadow */
}

.chart_style {
  font: 'Poppins' !important;
  font-size: 80px !important;
}


td:first-child {
  position: sticky top;
  left: 0;
  z-index: 1
}


.absolute-full {
  background-color: rgba(50, 26, 0, 0.9);
  /* background-color: rgba(19, 19, 19, 0.9); */

  /* background-color: rgba(21, 101, 192, 0.9); */
  /* background-color: rgba(20, 91, 162, 0.9); */
  /* Blue color with 50% transparency */
  /* Blue color with 50% transparency */
  /* Yellow color with 50% transparency */
  /* z-index: 1000; */
  /* Adjust the z-index as needed */
}
</style>


