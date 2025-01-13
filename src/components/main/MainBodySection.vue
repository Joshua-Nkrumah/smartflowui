<template>
  <!-- Left Side -->
  <div class="col-md-12 col-lg-6">
    <div class="row">
      <div class="col-md-6">
        <q-card bordered class="my-card shadow-1 card text-dark" style="height: 11rem; color: #333;">
          <q-img src="../../assets//images/occ/brand-shape1.svg">
            <div class="absolute-full text-subtitle2 flex flex-center">
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs col-10">
                  <div class="text-h4 q-mt-sm text-bold">{{ yearlyContributionTotalAmount }}</div>
                  <div class="text-caption text-dark ">
                    <div class="text-h6 text-semibold">Yearly Contribution</div>
                    <div class="text-h6 text-semi-bold q-mt-md">
                      {{ currentYear }}
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="col-2  flex-center">
                  <div class="text-h6 text-semi-bold" style="margin-left: -1rem; margin-top: 4rem;">
                    <span></span>
                    <q-icon class="rounded-borders q-mt-md" name="fa-solid fa-hand-holding-dollar" size="2.8rem" />
                  </div>
                </q-card-section>
              </q-card-section>
            </div>
          </q-img>
        </q-card>
      </div>
      <div class="col-md-6">
        <q-card bordered class="my-card shadow-1 card text-dark" style="height: 11rem; color: #333;">
          <q-img src="../../assets//images/occ/brand-shape1.svg">
            <div class="absolute-full text-subtitle2 flex flex-center">
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs col-10">
                  <div class="text-h4 q-mt-sm text-bold">{{ contributionTotalAmount }}</div>
                  <div class="text-caption text-dark ">
                    <div class="text-h6 text-semibold">Lifetime Contributions</div>
                    <div class="text-h6 text-semi-bold q-mt-md">
                      <!-- {{ currentYear }} -->
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="col-2  flex-center">
                  <div class="text-h6 text-semi-bold" style="margin-left: -1rem; margin-top: 4rem;">
                    <span></span>
                    <!-- <q-icon class="rounded-borders q-mt-md" name="fa-solid fa-hand-holding-dollar" size="2.8rem" /> -->
                    <div class="text-h6">
                      GHS
                    </div>
                    <!-- <q-icon class="rounded-borders q-mt-md" size="2.8rem">
                      GHS
                    </q-icon>
 -->

                  </div>
                </q-card-section>
              </q-card-section>
            </div>
          </q-img>
        </q-card>
      </div>
      <div class="col-md-6">
        <q-card bordered class="my-card shadow-1 card text-dark" style="height: 11rem; color: #333;">
          <q-img src="../../assets//images/occ/brand-shape1.svg">
            <div class="absolute-full text-subtitle2 flex flex-center">
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs col-10">
                  <div class="text-h4 q-mt-sm text-bold">{{ yearlyDonationTotalAmount }}</div>
                  <div class="text-caption text-dark ">
                    <div class="text-h6 text-semibold">Yearly Donations</div>
                    <div class="text-h6 text-semi-bold q-mt-md">
                      {{ currentYear }}
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="col-2  flex-center">
                  <div class="text-h6 text-semi-bold" style="margin-left: -1rem; margin-top: 4rem;">
                    <span></span>
                    <q-icon class="rounded-borders q-mt-md" name="fa-solid fa-gifts" size="2.8rem" />
                  </div>
                </q-card-section>
              </q-card-section>
            </div>
          </q-img>
        </q-card>
      </div>
      <div class="col-md-6">
        <q-card bordered class="my-card shadow-1 card text-dark" style="height: 11rem; color: #333;">
          <q-img src="../../assets//images/occ/brand-shape1.svg">
            <div class="absolute-full text-subtitle2 flex flex-center">
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs col-10" style="margin-left: -1rem;">
                  <div class="text-h4 q-mt-sm text-bold">{{ donationTotalAmount }}</div>
                  <div class="text-caption text-dark ">
                    <div class="text-h6 text-semibold">Lifetime Donations</div>
                    <div class="text-h6 text-semi-bold q-mt-md">
                      <!-- {{ currentYear }} -->
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="col-2  flex-center">
                  <div class="text-h6 text-semi-bold" style="margin-left: -1rem; margin-top: 4rem;">
                    <span></span>
                    <q-icon class="rounded-borders q-mt-md" name="fa-solid fa-gifts" size="2.8rem" />
                  </div>
                </q-card-section>
              </q-card-section>
            </div>
          </q-img>
        </q-card>
      </div>
      <div class="col-md-12 col-xl-12">
        <q-card bordered class="my-card shadow-1 card text-dark" style="height: 50rem;">
          <q-card-section>
            <div class="text-h6 card-title text-bold">Recently Added</div>
            <div>
              <q-tabs v-model="tableTab" dense align="left" class="text-grey q-pl-sm" active-color="primary"
                indicator-color="primary" narrow-indicator>
                <q-tab name="recentMembers" label="Members" style="width: 10rem;" />
                <q-tab name="recentContributions" label="Contributions" style="width: 10rem;" />
                <q-tab name="recentDonations" label="Donations" style="width: 10rem;" />
                <q-tab name="recentVolunteers" label="Volunteers" style="width: 10rem;" />
              </q-tabs>
              <q-separator spaced />
            </div>
          </q-card-section>
          <q-card-section>
            <q-tab-panels v-model="tableTab" animated>
              <q-tab-panel name="recentMembers">
                <q-card class="card-shadow" style="margin-top: -1rem;">
                  <q-item>
                    <div class="row flex-center">
                      <q-item-section class="col-12">
                        <q-item-label class="text-weight-bold" style="font-size: 1.2rem">
                          Members
                        </q-item-label>
                      </q-item-section>
                    </div>
                  </q-item>
                </q-card>
                <q-table flat title="" :rows="membersList" :columns="(memberColumns as any)" row-key="memberId">

                  <template v-slot:body-cell-MembershipStatus="props">
                    <q-td key="MembershipStatus" :props="props">
                      <q-badge v-if="props.row.membershipStatus === 'active'" class="q-pl-md q-pr-md" label="Active" fill
                        color="green-8" style="height: 1.5rem;" />

                      <q-badge v-if="props.row.membershipStatus === 'inactive'" class="q-pl-md q-pr-md" label="Inactive"
                        fill color="yellow-8" style="height: 1.5rem;" />

                      <q-badge v-if="props.row.membershipStatus === 'resigned'" class="q-pl-md q-pr-md" label="Resigned"
                        fill color="red-7" style="height: 1.5rem;" />
                    </q-td>
                  </template>
                </q-table>
              </q-tab-panel>

              <q-tab-panel name="recentContributions">
                <q-card class="card-shadow" style="margin-top: -1rem;">
                  <q-item>
                    <div class="row flex-center">
                      <q-item-section class="col-12">
                        <q-item-label class="text-weight-bold" style="font-size: 1.2rem">
                          Contributions
                        </q-item-label>
                      </q-item-section>
                    </div>
                  </q-item>
                </q-card>
                <q-table flat title="" :rows="welfareStore.listOfContributions?.records"
                  :columns="(contributionColumns as any)" row-key="name">
                  <template v-slot:body-cell-ContributionStatus="props">
                    <q-td key="ContributionStatus" :props="props">
                      <q-badge v-if="props.row.contribution.contributionStatus === 'completed'" class="q-pl-md q-pr-md"
                        label="Completed" fill color="green-8" style="height: 1.5rem;" />

                      <q-badge v-if="props.row.contribution.contributionStatus === 'Pending'" class="q-pl-md q-pr-md"
                        label="Pending" fill color="yellow-8" style="height: 1.5rem;" />

                      <q-badge v-if="props.row.contribution.contributionStatus === 'resigned'" class="q-pl-md q-pr-md"
                        label="Resigned" fill color="red-7" style="height: 1.5rem;" />
                    </q-td>
                  </template>

                </q-table>
              </q-tab-panel>

              <q-tab-panel name="recentDonations">
                <q-card class="card-shadow" style="margin-top: -1rem;">
                  <q-item>
                    <div class="row flex-center">
                      <q-item-section class="col-12">
                        <q-item-label class="text-weight-bold" style="font-size: 1.2rem">
                          Donations
                        </q-item-label>
                      </q-item-section>
                    </div>
                  </q-item>
                </q-card>

                <q-table flat title="" :rows="welfareStore.listOfDonations?.records" :columns="(donationColumns as any)"
                  row-key="name">

                  <template v-slot:body-cell-DonationStatus="props">
                    <q-td key="DonationStatus" :props="props">
                      <q-badge v-if="props.row.donation.donationStatus === 'completed'" class="q-pl-md q-pr-md"
                        label="Completed" fill color="green-8" style="height: 1.5rem;" />
                      <q-badge v-if="props.row.donation.donationStatus === 'Pending'" class="q-pl-md q-pr-md"
                        label="Pending" fill color="yellow-8" style="height: 1.5rem;" />
                      <q-badge v-if="props.row.donation.donationStatus === 'resigned'" class="q-pl-md q-pr-md"
                        label="Resigned" fill color="red-7" style="height: 1.5rem;" />
                    </q-td>
                  </template>

                </q-table>

              </q-tab-panel>

              <q-tab-panel name="recentVolunteers">
                <q-card class="card-shadow" style="margin-top: -1rem;">
                  <q-item>
                    <div class="row flex-center">
                      <q-item-section class="col-12">
                        <q-item-label class="text-weight-bold" style="font-size: 1.2rem">
                          Volunteers
                        </q-item-label>
                      </q-item-section>
                    </div>
                  </q-item>
                </q-card>
                <q-table flat title="" :rows="volunteerList" :columns="(volunteerColumns as any)" row-key="name">

                  <template v-slot:body-cell-VolunteerStatus="props">
                    <q-td key="VolunteerStatus" :props="props">
                      <q-badge v-if="props.row.volunteerStatus === 'active'" class="q-pl-md q-pr-md" label="Active" fill
                        color="green-8" style="height: 1.5rem;" />

                      <q-badge v-if="props.row.volunteerStatus === 'inactive'" class="q-pl-md q-pr-md" label="Inactive"
                        fill color="yellow-8" style="height: 1.5rem;" />

                      <q-badge v-if="props.row.volunteerStatus === 'resigned'" class="q-pl-md q-pr-md" label="Resigned"
                        fill color="red-7" style="height: 1.5rem;" />
                    </q-td>
                  </template>

                </q-table>

              </q-tab-panel>
            </q-tab-panels> </q-card-section>
        </q-card>
      </div>
    </div>
  </div>

  <!-- Right Side -->
  <div class="col-md-12 col-lg-6">
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <yearly-bar-chart style="height: 32rem;" />
        <total-pie-chart style="height: 20rem;" />
      </div>
      <div class="col-md-12 col-lg-12">
        <total-amount-panel />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth-store';
import { useQuasar } from 'quasar';
import VueApexCharts from 'vue3-apexcharts';
import ShapeConstants from 'src/constants/shape.constants';
import MyAvatar from 'src/components/MyAvatar.vue';
import { Doughnut } from 'vue-chartjs';
import { Bar } from 'vue-chartjs'
import Chart from 'chart.js'
import { useWelfareStore } from 'src/stores/welfare-store';
import YearlyBarChart from '../charts/YearlyBarChart.vue';
import TotalPieChart from '../charts/TotalPieChart.vue';
import TotalAmountPanel from '../tabs/TotalAmountPanel.vue';


const welfareStore = useWelfareStore();

const currentYear = new Date().getFullYear();


const tableTab = ref('recentMembers');


const membersList = computed(() => {
  return welfareStore?.listOfMembers?.records;
});

const volunteerList = computed(() => {
  return welfareStore.listOfVolunteers?.records.filter((record: any) => (record.isDeleted != 'deleted'));
});


const contributionTotalAmount = computed(() => {
  var allContributions = welfareStore?.listOfContributions?.records.map(contribution => contribution.contribution);
  const totalAmount = allContributions.reduce((accumulator, currentItem: any) => {
    return accumulator + currentItem?.amount;
  }, 0); // 0 is the initial value for the accumulator

  return totalAmount;
});

const yearlyContributionTotalAmount = computed(() => {
  const records = welfareStore?.listOfContributions?.records.map(contribution => contribution.contribution);
  const currentYear = new Date().getFullYear();
  const totalAmountForCurrentYear = records
    .filter(record => {
      const contributionYear = new Date(`${record?.contributionDate}`).getFullYear();
      return contributionYear === currentYear;
    })
    .reduce((accumulator, record: any) => {
      return accumulator + record?.amount;
    }, 0);
  return totalAmountForCurrentYear;
});

const yearlyDonationTotalAmount = computed(() => {
  const records = welfareStore?.listOfDonations?.records.map(donation => donation.donation);
  const currentYear = new Date().getFullYear();
  const totalAmountForCurrentYear = records
    .filter(record => {
      const donationYear = new Date(`${record?.donationDate}`).getFullYear();
      return donationYear === currentYear;
    })
    .reduce((accumulator, record: any) => {
      return accumulator + record?.amount;
    }, 0);
  return totalAmountForCurrentYear;
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

const getMonthName = (month: number): string => {
  const monthsInWords = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  if (month >= 1 && month <= 12) {
    return monthsInWords[month - 1]; // Adjust for zero-based index
  } else {
    return 'Invalid Month'; // Handle invalid input
  }
}

const assignTotalRecordsToMonths = (data: { total: number, records: any[] }): { [month: string]: number } => {
  const result: { [month: string]: number } = {};

  data.records.forEach(record => {
    const monthName = getMonthName(record.month);
    if (!result[monthName]) {
      result[monthName] = 0;
    }
    result[monthName] += record.totalRecords;
  });

  return result;
}



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

// Example usage:
const monthData = {
  'September': 2,
  'October': 1
};

const newMemberSeries = <any>ref([{}]);
const series = ref([
  {
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
  },
]);

const assignTotal = () => {
  const dataArray = createArrayFromObject(monthData);
  const object = [{
    data: dataArray,
  }]
  newMemberSeries.value = object
  console.log(dataArray);
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

// Get the appropriate list of obejct for month and total
const result_ = computed(() => {
  const result = welfareStore.listOfMembersSummary.records.map((item: any) => ({
    [getMonthName_(item.month)]: item.totalRecords,
  }));
  console.log('result', result)
  return result
});

const assignTotal_ = computed(() => {
  const dataArray = createArrayFromObject(monthData);
  const object = [{
    data: dataArray,
  }]
  console.log(object);
  return object
});



// function getMonthName_(month: number): string {
//   return new Date(2023, month - 1, 1).toLocaleDateString('en-US', { month: 'long' });
// }

// const memberSummaries: MemberYearSummaryRecords[] = [
//   { year: 2023, month: 9, totalRecords: 2 },
//   { year: 2023, month: 10, totalRecords: 1 },
// ];

// const monthData_: Record<string, number> = {};

// memberSummaries.forEach((summary) => {
//   const monthName = getMonthName_(summary.month as any);
//   <any>monthData_[monthName] == summary.totalRecords;
// });

// for (const month in monthData_) {
//   console.log(`kjhgh${month}: ${monthData_[month]}`);
// }



































const onProcessMemberSummary = async () => {
  const result = await welfareStore.getAllMembersSummary(
    {
      year: parseFloat(`${currentYear}`),
      month: 0,
      totalRecords: 0
    }
  );
  // if (result.status == AAStatusConstants.SUCCESS) {
  //   $q.notify({
  //     color: 'green-8',
  //     textColor: 'white',
  //     icon: 'cloud_done',
  //     position: 'top-right',
  //     message: `${result.message}`,
  //   });
  // } else {
  //   $q.notify({
  //     color: 'red-8',
  //     textColor: 'white',
  //     icon: 'close',
  //     position: 'top-right',
  //     message: `${result.message}`,
  //   });
  // }
};

const onProcessContributionSummary = async () => {
  const result = await welfareStore.getAllContributionSummary(
    {
      year: parseFloat(`${currentYear}`),
      month: 0,
      totalRecords: 0
    }
  );
  // if (result.status == AAStatusConstants.SUCCESS) {
  //   $q.notify({
  //     color: 'green-8',
  //     textColor: 'white',
  //     icon: 'cloud_done',
  //     position: 'top-right',
  //     message: `${result.message}`,
  //   });
  // } else {
  //   $q.notify({
  //     color: 'red-8',
  //     textColor: 'white',
  //     icon: 'close',
  //     position: 'top-right',
  //     message: `${result.message}`,
  //   });
  // }
};

const membersChartOptions = ref({
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


const doughnutChartDCSeries = ref([44, 55]);
const doughnutChartDCOptions = ref({
  chart: {
    type: 'donut',
  },
  labels: ['Contributions', 'Donations'],
});



const revenueChartSeries = ref([
  {
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100],
  },
  {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52, 41],
  },
]);
const revenueChartOptions = ref({
  chart: {
    height: 350,
    type: 'area',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '2018-09-19T00:00:00.000Z',
      '2018-09-19T01:30:00.000Z',
      '2018-09-19T02:30:00.000Z',
      '2018-09-19T03:30:00.000Z',
      '2018-09-19T04:30:00.000Z',
      '2018-09-19T05:30:00.000Z',
      '2018-09-19T06:30:00.000Z',
    ],
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm',
    },
  },
});

function formatCustomDate(dateString: string): string {
  // Parse the input date string into a Date object
  const inputDate = new Date(dateString);

  // Check if the inputDate is valid
  if (isNaN(inputDate.getTime())) {
    return 'Invalid Date';
  }

  // Get the day, month, year, hours, and minutes
  const day = inputDate.getDate();
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = monthNames[inputDate.getMonth()];
  const year = inputDate.getFullYear();
  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  // Format the date string
  const formattedDate = `${day}th ${month}, ${year}, ${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  return formattedDate;
}

const columns = ([
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: (row: { name: any; }) => row.name,
    format: (val: any) => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10) }
]);

// ------------------------------- TABLE COLUMNS AND ROWS --------------------------------- //

const memberColumns: any = ([
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: (row: any) => {
      return row?.firstName + ' ' + row?.middleName + ' ' + row?.lastName ?? 0;
    },
  },
  {
    name: 'CreatedAt',
    align: 'center',
    label: 'Date Joined',
    field: (row: any) => {
      return formatCustomDate(row?.createdAt);
    },
  },
  {
    name: 'EmailAddress', align: 'left', label: 'Email Address', field: 'emailAddress', required: true,
  },
  { name: 'Age', align: 'center', label: 'Age (yrs)', field: 'age', sortable: true },
  { name: 'MobileNumber', align: 'center', label: 'Mobile Number', field: 'phoneNumber' },
  // { name: 'EmergencyContact', align: 'center', label: 'Emergency Contact', field: 'emergencyContact' },
  { name: 'Gender', align: 'center', label: 'Gender', field: 'gender' },
  { name: 'MembershipStatus', align: 'center', label: 'Membership Status', field: 'membershipStatus' },

  // { name: 'MembershipType', align: 'center', label: 'Membership Type', field: 'membershipType' },
  // { name: 'MaritalStatus', align: 'center', label: 'Marital Status', field: 'maritalStatus' },
  // { name: 'Occupation', align: 'center', label: 'Occupation', field: 'occupation' },
  // { name: 'DateofBirth', label: 'Date Of Birth', field: 'dateOfBirth' },
  // { name: 'CreatedBy', label: 'Created By', field: 'createdBy' },
  // { name: 'DeleteStatus', label: 'Delete Status', field: 'isDeleted' },

]);

const contributionColumns: any = ([
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: (row: any) => {
      return row?.members?.firstName + ' ' + row?.members?.middleName + ' ' + row?.members?.lastName;
    },
  },
  {
    name: 'ContributionDate',
    label: 'Contribution Date',
    align: 'center',
    field: (row: any) => {
      return formatCustomDate(row?.contribution?.contributionDate);
    },
  },
  // {
  //   name: 'CreatedAt',
  //   label: 'Created At',
  //   align: 'center',
  //   field: (row: any) => {
  //     return formatCustomDate(row?.contribution?.createdAt);
  //   },
  // },
  {
    name: 'EmailAddress',
    align: 'left',
    label: 'Email Address',
    field: (row: any) => {
      return row?.members?.emailAddress;
    },
    required: true,
  },
  {
    name: 'Amount',
    align: 'center',
    label: 'Amount (GHS)',
    field: (row: any) => {
      return row?.contribution?.amount;
    },
    sortable: true
  },
  {
    name: 'Description',
    align: 'center',
    label: 'Description',
    field: (row: any) => {
      return row?.contribution?.description;
    },
  },
  {
    name: 'ContributionStatus',
    align: 'center',
    label: 'Contribution Status',
    field: (row: any) => {
      return row?.contribution?.contributionStatus;
    },
  },

]);


const donationColumns: any = ([
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: (row: any) => {
      return row?.members?.firstName + ' ' + row?.members?.middleName + ' ' + row?.members?.lastName;
    },
  },
  {
    name: 'DonationDate',
    label: 'Donation Date',
    align: 'center',
    field: (row: any) => {
      return formatCustomDate(row?.donation?.donationDate);
    },
  },
  {
    name: 'EmailAddress',
    align: 'left',
    label: 'Email Address',
    field: (row: any) => {
      return row?.members?.emailAddress;
    },
    required: true,
  },
  {
    name: 'Amount',
    align: 'center',
    label: 'Amount (GHS)',
    field: (row: any) => {
      return row?.donation?.amount;
    },
    sortable: true
  },
  {
    name: 'Description',
    align: 'center',
    label: 'Description',
    field: (row: any) => {
      return row?.donation?.description;
    },
  },
  {
    name: 'DonationStatus',
    align: 'center',
    label: 'Donation Status',
    field: (row: any) => {
      return row?.donation?.DonationStatus;
    },
  },
]);

const volunteerColumns: any = ([
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: (row: any) => {
      return row?.firstName + ' ' + row?.middleName + ' ' + row?.lastName ?? 0;
    },
  },
  {
    name: 'EmailAddress', align: 'left', label: 'Email Address', field: 'emailAddress', required: true,
  },
  { name: 'Age', align: 'center', label: 'Age (yrs)', field: 'age', sortable: true },
  { name: 'MobileNumber', align: 'center', label: 'Mobile Number', field: 'phoneNumber' },
  { name: 'Gender', align: 'center', label: 'Gender', field: 'gender' },
  { name: 'VolunteerStatus', align: 'center', label: 'Volunteer Status', field: 'volunteerStatus' },
])


const rows = ref([
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
]);



const loadRecords = async () => {
  onProcessMemberSummary(),
    onProcessContributionSummary
}

onMounted(() => {
  // loadRecords(),
  // assignTotal()
  // getMonthName()
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


