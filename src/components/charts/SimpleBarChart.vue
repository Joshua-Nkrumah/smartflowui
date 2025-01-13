<template>
  <div class="bar-chart">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chart-3';
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
  scales: {
    x: {
      beginAtZero: true
    },
    y: {
      beginAtZero: true
    }
  },
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
.bar-chart {
  max-width: 600px;
  margin: 0 auto;
}
</style>



<!--
<template>
  <div class="bar-chart">
    <v-chart :option="chartOptions" style="width: 100%; height: 400px;" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { EChartsOption } from 'echarts';

// Import vue-echarts and necessary components
import VChart from 'vue-echarts';

// Register necessary ECharts components
use([BarChart, GridComponent, TooltipComponent, TitleComponent, CanvasRenderer]);

export default defineComponent({
  name: 'BarChart',
  components: {
    VChart,
  },
  props: {
    // Data for the bar chart (array of values)
    data: {
      type: Array as () => number[],
      required: true,
    },
    // Labels for the x-axis
    labels: {
      type: Array as () => string[],
      required: true,
    },
    // Optional custom title for the chart
    title: {
      type: String,
      default: 'Bar Chart',
    },
  },
  setup(props) {
    // Chart options ref
    const chartOptions = ref<EChartsOption>({
      title: {
        text: props.title,
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: props.labels,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'bar',
          data: props.data,
          barWidth: '50%',
        },
      ],
    });

    // Watch for changes in props to update the chart options dynamically
    watch(
      () => [props.data, props.labels],
      ([newData, newLabels]) => {
        chartOptions.value = {
          ...chartOptions.value,
          xAxis: {
            ...chartOptions.value.xAxis,
            data: newLabels,
          },
          series: [
            {
              type: 'bar',
              data: newData,
              barWidth: '50%',
            },
          ],
        };
      }
    );

    return {
      chartOptions,
    };
  },
});
</script>

<style scoped>
.bar-chart {
  width: 100%;
  height: 400px;
}
</style> -->
