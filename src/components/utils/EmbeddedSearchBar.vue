<template>
  <div class="row q-gutter-x-md">
    <div class="col-9 q-pr-sm">
      <div>
        <q-input placeholder="Search" color="white" type="search" outlined dense v-model.trim="searchKey"
          @keydown.enter.prevent="search" class="white-border-input" style="min-width: 20rem;">
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
      </div>
    </div>

    <div class="col-2 q-pr-sm">
      <div v-if="reload" clickable @click="reloadData">
        <q-btn icon="o_refresh" size="17px" class="text-weight-bold" unelevated :loading="reloading" />
        <q-tooltip> Reload </q-tooltip>
      </div>
    </div>
  </div>
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

<style>
.q-field {
  color: white;
}

.q-field__inner {
  color: white;
}

.white-border-input {
  --q-input-border-color: white;
}
</style>
