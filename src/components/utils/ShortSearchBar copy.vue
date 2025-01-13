<template>
  <div class="row q-gutter-x-md ">
    <div class="col-12 q-pr-sm">
      <q-card :class="bordered ? '' : 'card-shadow row justify-between'" :flat="bordered" :bordered="bordered">
        <div class="row">
          <q-card-section class="self-center" style="min-width: 30rem;">
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
          <q-card-section class="self-center">
            <div clickable @click="toggleDialog">
              <q-btn icon="filter_list" label="Filter" size="14px" text-color="primary-color" class="text-bold" no-caps
                push />
            </div>
          </q-card-section>
          <q-card-section>
            <div class="col-auto" style="margin-left: -1rem;" v-if="reload" clickable @click="reloadData">
              <q-btn icon="o_refresh" size="16px" push :loading="reloading" />
              <q-tooltip> Reload </q-tooltip>
            </div>
          </q-card-section>
        </div>
        <div>
          <q-card-section class="self-center ">
            <div class="" clickable @click="toggleDialog">
              <q-btn icon="person_add_alt" label="New User" size="14px" text-color="white"
                class="text-bold primary-color" no-caps push />
            </div>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </div>
  <my-full-dialog v-model="showDialog">

  </my-full-dialog>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import MyFullDialog from 'src/components/utils/MyFullDialog.vue';

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const showDialog = ref(false);
const props = defineProps({
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

const isOpen = ref(false);

const toggleDialog = () => {
  showDialog.value = !showDialog.value;
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
