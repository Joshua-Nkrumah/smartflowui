
<script setup lang="ts">
import { computed, ref, onMounted, onUpdated } from 'vue';
import { useWelfareStore } from 'src/stores/welfare-store';
import Chart, { ChartItem } from 'chart.js/auto';


const welfareStore = useWelfareStore();
const loadingFinished = ref(false);


const volunteerCount = computed(() => {
  return welfareStore?.listOfVolunteers?.total;
});


const memberCount = computed(() => {
  welfareStore?.listOfMembers?.total
  return welfareStore?.listOfMembers?.total;
});

const contributionCount = computed(() => {
  var allContributions = welfareStore?.listOfContributions?.total;
  return allContributions;
});

const donationCount = computed(() => {
  var allDonations = welfareStore?.listOfDonations?.total;
  return allDonations;
});

// ------------------------------- CHARTS --------------------------------- //

// Create and update the chart when the component is mounted or when chartData changes
const createVMChart = () => {
  if (volunteerCount.value > 0 || memberCount.value > 0) {
    const dChartVMdata = ref({
      labels: [
        'Volunteers',
        'Members',
      ],
      datasets: [{
        label: 'Volunteers against Members',
        data: [volunteerCount.value, memberCount.value],
        backgroundColor: [
          'rgb(255, 255, 0)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4
      }]
    });
    const dChartVMconfig = ref({
      type: 'doughnut',
      data: dChartVMdata.value,
    });
    const chartVMTag = <ChartItem>document.getElementById('myVMChart');
    new Chart(chartVMTag, dChartVMconfig.value as any);
  }
  return true;
};


const createDCChart = () => {
  if (contributionCount.value > 0 || volunteerCount.value > 0) {
    const dChartDCdata = ref({
      labels: [
        'Contributions',
        'Volunteers',
      ],
      datasets: [{
        label: 'Contributions against Donations',
        data: [contributionCount.value, donationCount.value],
        backgroundColor: [
          'rgb(255, 255, 0)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4
      }]
    });
    const dChartDCconfig = ref({
      type: 'doughnut',
      data: dChartDCdata.value,
    });

    const chartDCTag = <ChartItem>document.getElementById('myDCChart');
    new Chart(chartDCTag, dChartDCconfig.value as any);
  }
  return true;
};


onMounted(() => {
  //   setTimeout(() => {
  //     setTimeout(() => {
  //       createVMChart();
  //       createDCChart();
  //     }, 3000); // Runs second
  //     loadingFinished.value = true;
  //   }, 1000); // Runs firsts
  // }); // Create the chart when the component is mounted
  // onUpdated(() => { createVMChart(), createDCChart()
});

</script>


<template>
  <q-card dark bordered class="my-card shadow-1 card text-dark" style="height: 20rem;">
    <q-card-section>
      <div class="text-center card-body d-flex justify-content-around" style="margin-top: -2rem; margin-left: -3rem;">
        <!-- <vue-apex-charts type="donut" height="300" :options="doughnutChartVMOptions" :series="doughnutChartVMSeries"
          v-if="loadingFinished" /> -->
        <div id="doughnutChartContainer">
          <canvas id="myVMChart" height="600px" v-if="loadingFinished === true"></canvas>
        </div>
        <div>

          <div id="doughnutChartContainer">
            <canvas id="myDCChart" height="600px" v-if="loadingFinished === true"></canvas>
          </div>
          <!-- {{ donationCount }} -->
          <!-- <vue-apex-charts type="donut" height="300" :options="doughnutChartDCOptions" :series="doughnutChartDCSeries"
            v-if="loadingFinished" /> -->
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>


<style scoped>
@import '../../css/hope-ui.css';
@import '../../css/custom.min.css';
@import '../../css/hope-ui.min.css';
@import '../../css/core/libs.min.css';



#doughnutChartContainer {
  width: 300px;
  /* Adjust the width as needed */
  height: 300px;
  /* Adjust the height as needed */
  margin: 0 auto;
  /* Center the chart horizontally */
}

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


