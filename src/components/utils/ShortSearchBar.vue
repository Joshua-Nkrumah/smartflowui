<template>
  <div class="row q-gutter-x-md ">
    <div class="col-12 q-pr-sm">
      <q-card :class="bordered ? '' : 'card-shadow row justify-between'" :flat="bordered" :bordered="bordered">
        <div class="row">
          <q-card-section class="self-center" style="min-width: 20rem;">
            <q-input placeholder="Search" type="search" outlined dense v-model.trim="searchKey"
              @keydown.enter.prevent="search">

              <template v-slot:before>
                <q-icon name="search" />
              </template>
              <template v-slot:append v-if="searchKey">
                <q-btn flat size="md" round icon="cancel" @click="clearSearch" />
              </template>

              <template v-if="onSearch" v-slot:after>
                <q-btn color="primary" unelevated label="Search" @click="search" :loading="searching" />
              </template>
            </q-input>
          </q-card-section>
          <!-- <q-card-section class="self-center" v-if="$slots.filter">
            <div clickable>
              <q-btn icon="filter_list" label="Filter" size="14px" text-color="primary-color" class="text-bold" no-caps
                push />
            </div>
          </q-card-section> -->
          <!-- <q-card-section>
            <div class="col-auto" style="margin-left: -1rem;" v-if="reload" clickable @click="reloadData">
              <q-btn icon="o_refresh" size="16px" push :loading="reloading" />
              <q-tooltip> Reload </q-tooltip>
            </div>
          </q-card-section> -->
        </div>
        <!-- <div>
          <q-card-section class="self-center ">
            <div class="" clickable>
              <q-btn v-if="isListView === false && $props.viewType == true" clickable @click="handleView()"
                icon="o_list" label="Table View" size="14px" color="white" text-color="primary"
                class="text-bold q-mr-lg" no-caps push />
              <q-btn v-if="isListView === true && $props.viewType == true" clickable @click="handleView()"
                icon="o_dashboard" label="Cards View" size="14px" color="white" text-color="primary"
                class="text-bold q-mr-lg" no-caps push />
              <q-btn :icon="icon" @click="handleDialog" :label="label" size="14px" text-color="white"
                class="text-bold primary-color" no-caps push />
            </div>
          </q-card-section>
        </div> -->
      </q-card>
    </div>
  </div>
  <!-- <q-slide-transition v-if="$slots.filter">
    <div v-show="visible">
      <q-card class="card-shadow q-mt-lg q-pa-xl">
        <q-card-section class="row q-col-gutter-md">
          <slot name="filter" />
        </q-card-section>
        <q-card-section class="">
          <q-btn label="Submit" type="Filter" color="primary" @click="filter" :loading="filtering" unelevated />
          <q-btn flat label="Reset" type="submit" color="primary" @click="reset" :loading="resetting" />
        </q-card-section>
      </q-card>
    </div>
  </q-slide-transition> -->
  <!--  -->
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'toggleDialog', isOpen: boolean): void;
  (e: 'toggleView', isListView: boolean): void;
}>();

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  viewType: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: String,
    required: false,
  },
  dialog: {
    type: Boolean,
    default: false,
  },
  reload: {
    type: Boolean,
    default: true,
  },
  onRefresh: {
    type: Function,
    required: false,
  },
  onSearch: {
    type: Function,
    required: false,
  },
  onFilter: {
    type: Function,
    required: false,
  },
  onReset: {
    type: Function,
    required: false,
  },
  onExport: {
    type: Function,
    required: false,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  autoSearch: {
    type: Boolean,
    default: false,
  },
});

const searchKey = ref('');
const searching = ref(false);
const filtering = ref(false);
const reloading = ref(false);
const resetting = ref(false);
const exporting = ref(false);
const visible = ref(false);


// eslint-disable-next-line @typescript-eslint/ban-types
let currentDataOperator: Function;

watchEffect(() => {
  emit('update:modelValue', searchKey.value);
});

const isOpen = ref(false);
const isListView = ref(true);


const handleDialog = () => {
  isOpen.value = true;
  emit('toggleDialog', isOpen.value);
};

const handleView = () => {
  isListView.value = !isListView.value;
  emit('toggleView', isListView.value);
};

// search for records
const search = async () => {
  if (searching.value) {
    return;
  }

  if (props.onSearch) {
    // save for date reload or refresh
    currentDataOperator = props.onSearch;

    searching.value = true;
    await currentDataOperator();
    searching.value = false;
  }
};

// filter for records
const filter = async () => {
  if (filtering.value) {
    return;
  }

  if (props.onFilter) {
    // save for date reload or refresh
    currentDataOperator = props.onFilter;

    filtering.value = true;
    await currentDataOperator();
    filtering.value = false;
  }
};

// reload records
const reloadData = async () => {
  if (reloading.value) {
    return;
  }

  if (props.onRefresh) {
    currentDataOperator = props.onRefresh;
  }

  if (currentDataOperator) {
    reloading.value = true;
    await currentDataOperator();
    reloading.value = false;
  }
};

const clearSearch = () => {
  searchKey.value = '';
  search();
};

// resetting records
const reset = async () => {
  if (resetting.value) {
    return;
  }

  if (props.onReset) {
    // save for date reload or refresh
    currentDataOperator = props.onReset;

    resetting.value = true;
    await currentDataOperator();
    resetting.value = false;
  }
};

// set the default event handler for data refresh
currentDataOperator = reset;

// export records
const exportData = async () => {
  if (exporting.value) {
    return;
  }

  if (props.onExport) {
    exporting.value = true;
    await props.onExport();
    exporting.value = false;
  }
};

// const menAtWork = computed(() => reloading.value || exporting || searching || filtering || resetting)
</script>
