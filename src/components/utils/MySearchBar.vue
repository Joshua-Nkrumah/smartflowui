<template>
  <div class="row q-gutter-x-md">
    <div class="col">
      <q-card :class="bordered ? '' : 'card-shadow'" :flat="bordered" :bordered="bordered">
        <q-card-section>
          <q-input placeholder="Search" type="search" borderless dense v-model.trim="searchKey"
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
      </q-card>
    </div>
    <div class="col-auto" clickable @click="visible = !visible" v-if="$slots.filter">
      <q-card :class="bordered ? '' : 'card-shadow'" :flat="bordered" :bordered="bordered">
        <q-card-section>
          <q-btn round flat icon="filter_alt" />
        </q-card-section>
        <q-tooltip> Filter </q-tooltip>
      </q-card>
    </div>
    <div class="col-auto" v-if="reload" clickable @click="reloadData">
      <q-card :class="bordered ? '' : 'card-shadow'" :flat="bordered" :bordered="bordered">
        <q-card-section>
          <q-btn round flat icon="o_refresh" :loading="reloading" />
        </q-card-section>
        <q-tooltip> Reload </q-tooltip>
      </q-card>
    </div>
    <div class="col-auto" v-if="onExport" clickable @click="exportData">
      <q-card :class="bordered ? '' : 'card-shadow'" :flat="bordered" :bordered="bordered">
        <q-card-section>
          <q-btn round flat icon="ios_share" :loading="exporting" />
        </q-card-section>
        <q-tooltip> Export </q-tooltip>
      </q-card>
    </div>
  </div>
  <q-slide-transition v-if="$slots.filter">
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
  </q-slide-transition>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

// const emits = defineEmits(['update:modelValue'])
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

// name: 'MySearchBox'
const props = defineProps({
  modelValue: {
    type: String,
    required: false,
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
const visible = ref(false);
const searching = ref(false);
const filtering = ref(false);
const reloading = ref(false);
const resetting = ref(false);
const exporting = ref(false);

// eslint-disable-next-line @typescript-eslint/ban-types
let currentDataOperator: Function;

watchEffect(() => {
  emit('update:modelValue', searchKey.value);
});

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
