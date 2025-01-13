<template>
  <div class="pie-chart">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Pie } from 'vue-chart-3';
import { ref } from 'vue';

const props = defineProps({
  data: Object, // Data to be passed from the parent
  options: Object // Chart configuration options
});

const chartData = ref({
  labels: props.data.labels,
  datasets: [
    {
      label: props.data.label,
      backgroundColor: props.data.backgroundColor,
      data: props.data.data
    }
  ]
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    }
  },
  ...props.options
});
</script>

<style scoped>
.pie-chart {
  max-width: 400px;
  margin: 0 auto;
}
</style>

<!-- <template>
  <div>
    <PieChart :data="chartData" title="Market Share" legendPosition="right" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PieChart from './components/PieChart.vue';

export default defineComponent({
  name: 'App',
  components: {
    PieChart,
  },
  setup() {
    // Sample pie chart data (value and name)
    const chartData = ref([
      { value: 1048, name: 'Search Engine' },
      { value: 735, name: 'Direct' },
      { value: 580, name: 'Email' },
      { value: 484, name: 'Affiliate' },
      { value: 300, name: 'Video Ads' },
    ]);

    return {
      chartData,
    };
  },
});
</script> -->
