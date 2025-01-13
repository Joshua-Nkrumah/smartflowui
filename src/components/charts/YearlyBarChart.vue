<template>
  <q-card bordered class="my-card shadow-1 card text-dark" style="height: 30rem;">
    <q-card-section>
      <div class="text-h6 card-title text-bold">Yearly Analysis</div>
      <div>
        <q-tabs v-model="tab" dense align="left" class="text-grey q-pl-sm" active-color="primary"
          indicator-color="primary" narrow-indicator>
          <q-tab name="members" label="Members" style="width: 10rem;" />
          <q-tab name="contributions" label="Contributions" style="width: 10rem;" />
          <q-tab name="donations" label="Donations" style="width: 10rem;" />
          <q-tab name="volunteers" label="Volunteers" style="width: 10rem;" />
        </q-tabs>
        <q-separator spaced />
      </div>
    </q-card-section>
    <q-card-section>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="members">
          <q-card class="card-shadow" style="margin-top: -1rem;">
            <q-item>
              <div class="row flex-center">
                <q-item-section class="col-12">
                  <q-item-label class="text-weight-bold" style="font-size: 1.2rem">
                    Members
                  </q-item-label>
                  <q-item-label caption lines="1" class="text-bold row" style="font-size: 1rem;">
                    <div class="q-mt-md q-mr-md">
                      Yearly analysis of onboarded members
                    </div>
                    <div class="q-pb-sm">
                      <q-select outlined behavior="dialog" :dense="true" v-model="selectedYear" label="Select Year"
                        :options="yearOptions" style="width: 190px">
                        <template v-slot:after>
                          <q-btn round dense ripple size="md" push flat icon="search" :loading="loading"
                            @click="onProcessMemberSummary" />
                        </template>
                      </q-select>
                    </div>
                  </q-item-label>
                  <q-item-label>
                  </q-item-label>
                </q-item-section>
              </div>
            </q-item>
          </q-card>
          <vue-apex-charts type="bar" height="240" :options="BarChartOptions" :series="membersSeries"></vue-apex-charts>
        </q-tab-panel>

        <q-tab-panel name="contributions">
          <q-card class="card-shadow" style="margin-top: -1rem;">
            <q-item>
              <div class="row flex-center">
                <q-item-section class="col-12">
                  <q-item-label class="text-weight-bold" style="font-size: 1.2rem">
                    Contributions
                  </q-item-label>
                  <q-item-label caption lines="1" class="text-bold row" style="font-size: 1rem;">
                    <div class="q-mt-md q-mr-md">
                      Yearly analysis of received contributions
                    </div>
                    <div class="q-pb-sm">
                      <q-select outlined behavior="dialog" :dense="true" v-model="selectedYear" label="Select Year"
                        :options="yearOptions" style="width: 190px">
                        <template v-slot:after>
                          <q-btn round dense ripple size="md" push flat icon="search" :loading="loading"
                            @click="onProcessContributionSummary" />
                        </template>
                      </q-select>
                    </div>
                  </q-item-label>
                  <q-item-label>
                  </q-item-label>
                </q-item-section>
              </div>
            </q-item>
          </q-card>

          <vue-apex-charts type="bar" height="240" :options="BarChartOptions"
            :series="contributionSeries"></vue-apex-charts>
        </q-tab-panel>

        <q-tab-panel name="donations">
          <q-card class="card-shadow" style="margin-top: -1rem;">
            <q-item>
              <div class="row flex-center">
                <q-item-section class="col-12">
                  <q-item-label class="text-weight-bold" style="font-size: 1.2rem">
                    Donations
                  </q-item-label>
                  <q-item-label caption lines="1" class="text-bold row" style="font-size: 1rem;">
                    <div class="q-mt-md q-mr-md">
                      Yearly analysis of received donations
                    </div>
                    <div class="q-pb-sm">
                      <q-select outlined behavior="dialog" :dense="true" v-model="selectedYear" label="Select Year"
                        :options="yearOptions" style="width: 190px">
                        <template v-slot:after>
                          <q-btn round dense ripple size="md" push flat icon="search" :loading="loading"
                            @click="onProcessDonationSummary" />
                        </template>
                      </q-select>
                    </div>
                  </q-item-label>
                  <q-item-label>
                  </q-item-label>
                </q-item-section>
              </div>
            </q-item>
          </q-card>

          <vue-apex-charts type="bar" height="240" :options="BarChartOptions" :series="donationSeries"></vue-apex-charts>
        </q-tab-panel>
        <q-tab-panel name="volunteers">
          <q-card class="card-shadow" style="margin-top: -1rem;">
            <q-item>
              <div class="row flex-center">
                <q-item-section class="col-12">
                  <q-item-label class="text-weight-bold" style="font-size: 1.2rem">
                    Volunteers
                  </q-item-label>
                  <q-item-label caption lines="1" class="text-bold row" style="font-size: 1rem;">
                    <div class="q-mt-md q-mr-md">
                      Yearly analysis of onboarded volunteers
                    </div>
                    <div class="q-pb-sm">
                      <q-select outlined behavior="dialog" :dense="true" v-model="selectedYear" label="Select Year"
                        :options="yearOptions" style="width: 190px">
                        <template v-slot:after>
                          <q-btn round dense ripple size="md" push flat icon="search" :loading="loading"
                            @click="onProcessVolunteerSummary" />
                        </template>
                      </q-select>
                    </div>
                  </q-item-label>
                  <q-item-label>
                  </q-item-label>
                </q-item-section>
              </div>
            </q-item>
          </q-card>

          <vue-apex-charts type="bar" height="240" :options="BarChartOptions" :series="volunteerSeries"></vue-apex-charts>
        </q-tab-panel>
      </q-tab-panels> </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth-store';
import { useQuasar } from 'quasar';
import VueApexCharts from 'vue3-apexcharts';
import { useWelfareStore } from 'src/stores/welfare-store';


// ------------------------------- GLOBAL DECLARATIONS --------------------------------- //


const $q = useQuasar();
const router = useRouter();
const store = useAuthStore();
const welfareStore = useWelfareStore();
const currentYear = new Date().getFullYear();
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

const tab = ref('members');

// ------------------------------- MEMBER METHODS --------------------------------- //

const onProcessMemberSummary = async () => {
  loading.value = true;
  const result = await welfareStore.getAllMembersSummary(
    {
      year: parseFloat(selectedYear.value),
      month: 0,
      totalRecords: 0
    }
  );
  loading.value = false;
};

const onProcessContributionSummary = async () => {
  loading.value = true;
  const result = await welfareStore.getAllContributionSummary(
    {
      year: parseFloat(selectedYear.value),
      month: 0,
      totalRecords: 0
    }
  );
  loading.value = false;

};

const onProcessDonationSummary = async () => {
  loading.value = true;
  const result = await welfareStore.getAllDonationSummary(
    {
      year: parseFloat(selectedYear.value),
      month: 0,
      totalRecords: 0
    }
  );
  loading.value = false;
};


const onProcessVolunteerSummary = async () => {
  loading.value = true;
  const result = await welfareStore.getAllVolunteerSummary(
    {
      year: parseFloat(selectedYear.value),
      month: 0,
      totalRecords: 0
    }
  );
  loading.value = false;
};



// ------------------------------- HELPER METHODS --------------------------------- //

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

const createArrayFromObject = (monthData: { [month: string]: number }): number[] => {
  const monthsInWords = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const result: number[] = Array(12).fill(0); // Initialize the result array with zeros

  for (const month in monthData) {
    if (monthData.hasOwnProperty(month)) {
      const monthIndex = monthsInWords.indexOf(month);
      if (monthIndex !== -1) {
        result[monthIndex] = monthData[month];
      }
    }
  }
  return result;
}

// Match the Month in Words with Months in Figures
function getMonthName_(month: number): string {
  const monthsInWords = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // Subtract 1 from the month number to match the array index
  return monthsInWords[month - 1] || 'Invalid Month';
}

// Get the appropriate list of object for month and total
const membersMonthObjectTotal = computed(() => {
  const result = welfareStore.listOfMembersSummary.records.map((item: any) => ({
    [getMonthName_(item.month)]: item.totalRecords,
  }));
  return result
});

// Get the appropriate list of object for month and total
const contributionMonthObjectTotal = computed(() => {
  const result = welfareStore.listOfContributionSummary.records.map((item: any) => ({
    [getMonthName_(item.month)]: item.totalRecords,
  }));
  return result
});


// Get the appropriate list of object for month and total
const donationMonthObjectTotal = computed(() => {
  const result = welfareStore.listOfDonationSummary.records.map((item: any) => ({
    [getMonthName_(item.month)]: item.totalRecords,
  }));
  return result
});


// Get the appropriate list of object for month and total
const volunteerMonthObjectTotal = computed(() => {
  const result = welfareStore.listOfVolunteerSummary.records.map((item: any) => ({
    [getMonthName_(item.month)]: item.totalRecords,
  }));
  return result
});

//Final Series for members
const membersSeries = computed(() => {
  const monthDataObject: Record<string, number> = {};
  membersMonthObjectTotal.value.forEach((item) => {
    for (const month in item) {
      if (item.hasOwnProperty(month)) {
        monthDataObject[month] = item[month];
      }
    }
  });
  const dataArray = createArrayFromObject(monthDataObject);
  const object = [{
    data: dataArray,
  }]
  return object
});


//Final Series for contribution
const contributionSeries = computed(() => {
  const monthDataObject: Record<string, number> = {};
  contributionMonthObjectTotal.value.forEach((item) => {
    for (const month in item) {
      if (item.hasOwnProperty(month)) {
        monthDataObject[month] = item[month];
      }
    }
  });
  const dataArray = createArrayFromObject(monthDataObject);
  const object = [{
    data: dataArray,
  }]
  return object
});


//Final Series for donation
const donationSeries = computed(() => {
  const monthDataObject: Record<string, number> = {};
  donationMonthObjectTotal.value.forEach((item) => {
    for (const month in item) {
      if (item.hasOwnProperty(month)) {
        monthDataObject[month] = item[month];
      }
    }
  });
  const dataArray = createArrayFromObject(monthDataObject);
  const object = [{
    data: dataArray,
  }]
  return object
});

//Final Series for volunteer
const volunteerSeries = computed(() => {
  const monthDataObject: Record<string, number> = {};
  volunteerMonthObjectTotal.value.forEach((item) => {
    for (const month in item) {
      if (item.hasOwnProperty(month)) {
        monthDataObject[month] = item[month];
      }
    }
  });
  const dataArray = createArrayFromObject(monthDataObject);
  const object = [{
    data: dataArray,
  }]
  return object
});



const BarChartOptions = ref({
  chart: {
    type: 'bar',
    height: 300,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    },
  },
  fill: {
    colors: ['#ffe600'],
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: months.value,
  },
  noData: {
    text: undefined,
    align: 'center',
    verticalAlign: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      color: 'red',
      fontSize: '14px',
      fontFamily: 'Poppins'
    }
  }
});



const loadRecords = async () => {
  onProcessMemberSummary(),
    onProcessContributionSummary(),
    onProcessDonationSummary(),
    onProcessVolunteerSummary()
}

onMounted(() => {
  // loadRecords()
  // assignTotal()
  // getMonthName()
});

</script>

<style scoped>
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
  /* background-color: rgba(21, 101, 192, 0.9); */
  background-color: rgba(20, 91, 162, 0.9);
  /* Blue color with 50% transparency */
  /* Blue color with 50% transparency */
  /* Yellow color with 50% transparency */
  /* z-index: 1000; */
  /* Adjust the z-index as needed */
}
</style>


