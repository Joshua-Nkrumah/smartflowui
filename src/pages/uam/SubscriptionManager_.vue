<template>
  <main class="main-content">
    <BottomHeader>
      <template #actions>
        <q-btn icon="app_registration" label="New Subscription" size="16px" color="white" text-color="primary"
          class="text-bold" no-caps push @click="onshowCreateUserDialog" />
      </template>
    </BottomHeader>
    <div style="margin-top: -4rem;" class="q-pa-lg">
      <div class="row">
        <div class="col-12 ">
          <my-search-box v-model="searchKey" :on-refresh="loadRecords" />

          <q-table style="margin-top: 2rem;" title="Subscription" flat :filter="searchKey"
            :loading="paginationUtil.loading" v-model:pagination="paginationUtil.pagination" :rows="appList"
            :columns="columns" row-key="memberId" padding>
            <template v-slot:body-cell-AppStatus="props">
              <q-td key="AppStatus" :props="props">
                <q-badge v-if="props.row?.app?.status === 'active'" class="q-pl-md q-pr-md" label="Active" fill
                  color="green-8" style="height: 1.5rem;" />
                <q-badge v-if="props.row?.app?.status === 'inactive'" class="q-pl-md q-pr-md" label="Inactive" fill
                  color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <div class="row wrap justify-between"></div>
                <q-btn-dropdown color="grey-8" dense>
                  <q-list>
                    <q-item clickable @click="onshowUpdateAppDialog(props.row as UAMUserData)">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Update School</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowDisableAppDialog(props.row as UAMUserData)"
                      v-if="props.row?.app?.status === 'active'">
                      <q-item-section side>
                        <q-icon name="block" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Disable School</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowEnableAppDialog(props.row as UAMUserData)"
                      v-if="props.row?.app?.status === 'inactive'">
                      <q-item-section side>
                        <q-icon name="toggle_on" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Enable School</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable @click="goToAssignedApps(props.row as UAMUserData)">
                      <q-item-section side>
                        <q-icon name="restart_alt" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>View Subscription</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-td>
            </template>
          </q-table>
        </div>

      </div>
    </div>

  </main>
  <q-dialog v-model="showSubscriptionDialog" rounded style="width: 100% !important;" persistent>
    <q-card style="width: 900px; max-width: 100vw;">
      <q-toolbar>
        <q-avatar>
          <q-icon name="person_add_alt" color="blue-9" size="30px" v-if="isUpdate == false" />
          <q-icon name="edit" color="blue-9" size="30px" v-if="isUpdate == true" />
        </q-avatar>
        <q-toolbar-title color="blue-9" v-if="isUpdate == false"><span class="text-weight-bold">Add
            Subscription</span></q-toolbar-title>
        <q-toolbar-title color="blue-9" v-if="isUpdate == true"><span class="text-weight-bold">Update
            Subscription</span></q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section>
        <div class="">
          <q-stepper v-model="step" vertical color="primary" animated flat>
            <q-step :name="1" title="Subscription Details" icon="settings" :done="step > 1">
              <q-form @submit="onProcessApp" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">
                  <div class="col-md-6">
                    <q-select v-model="appPayload.app_name" :options="institutionOptions" label="Institution *" lazy-rules
                      transition-show="scale" option-value="id" option-label="app_name" transition-hide="scale"
                      behavior="default" :rules="[val => val != null || 'Please select the school']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the role on the app chosen above
                      </q-tooltip>
                    </q-select>
                  </div>
                  <div class="col-md-6">
                    <q-select v-model="appPayload.app_name" :options="subscriptionOptions" label="Subscription Type *"
                      lazy-rules transition-show="scale" option-value="id" option-label="app_name" transition-hide="scale"
                      behavior="default" :rules="[val => val != null || 'Please select the subscription type']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the role on the app chosen above
                      </q-tooltip>
                    </q-select>
                  </div>
                  <div class="col-md-6">
                    <q-select v-model="appPayload.app_name" :options="subscriptionDurationOptions"
                      label="Subscription Duration *" lazy-rules transition-show="scale" option-value="id"
                      option-label="app_name" transition-hide="scale" behavior="default"
                      :rules="[val => val != null || 'Please select the subscription duration']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the role on the app chosen above
                      </q-tooltip>
                    </q-select>
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="appPayload.app_name"
                      :rules="[(val) => (val && val.length > 0) || 'Choose Subscription\'s Start Date']"
                      label="Start Date">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="appPayload.app_name" mask="YYYY-MM-DD">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>

                </div>
                <q-stepper-navigation>
                  <q-btn color="primary" label="Add Subscription" type="submit" :loading="loading"
                    v-if="isUpdate == false" />
                  <q-btn color="primary" label="Update Subscription" type="submit" v-if="isUpdate == true"
                    :loading="loading" />
                  <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
              </q-form>
            </q-step>
          </q-stepper>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirmCreateAppDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to create this app</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessNewApp()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirmUpdateAppDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to update this app</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessUpdateApp()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- <q-dialog v-model="confirmResetUserDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="recommend" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to reset this user's password?</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessResetPassword()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog> -->

  <q-dialog v-model="confirmDisableAppDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="recommend" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to disable this app</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessDisableApp()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirmEnableAppDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="recommend" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to enable this app</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessEnableApp()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth-store';
import { useWelfareStore } from 'src/stores/welfare-store';
import BottomHeader from 'components/structure/BottomHeader.vue';
import MySearchBox from 'components/utils/MySearchBar.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { LocalStorage, useQuasar } from 'quasar';
import AAStatusConstants from 'src/constants/aa-status.constants';
import PaginationUtil from 'src/utils/pagination.utils';
import FetchDataRequest from 'src/models/FetchDataRequest.model';
import { UAMUserData } from 'src/models/uam/Users.model';
import { useRoute } from 'vue-router';
import { useUAMStore } from 'src/stores/uam-store';


// ------------------------------- GLOBAL DECLARATIONS --------------------------------- //
const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const welfareStore = useWelfareStore();
const uamStore = useUAMStore();
const paginationUtil = ref(new PaginationUtil());
const leftDrawerOpen = ref(false);
const store = useAuthStore();
const searchKey = ref('');
const filter = ref(null);
const showSubscriptionDialog = ref(false);
const confirmCreateAppDialog = ref(false);
const confirmUpdateAppDialog = ref(false);
const confirmDisableAppDialog = ref(false);
const confirmEnableAppDialog = ref(false);
const loading = ref(false);
const step = ref(1);

const showContributionDialog = ref(false);
const showDonationDialog = ref(false);
const isUpdate = ref(false);

const memberId = ref('');
const route = useRoute();

const username = <any>ref(null);
const app_id = <any>ref(null);

if (LocalStorage.has('email')) {
  username.value = LocalStorage.getItem('email');
};
const institutionOptions = ref(['Standard Foundation School', 'Dimona School', 'Rect Academy', 'Top Ridge Academy']);
const subscriptionOptions = ref(['Trial', 'Standard', 'Basic', 'School Pro']);
const subscriptionDurationOptions = ref(['A Term', '2 Terms', 'Academic Year']);



// ------------------------------- REQUEST PAYLOAD --------------------------------- //

const contributionPayload = ref(
  {
    memberId: '',
    amount: '',
    description: '',
    contributionStatus: '',
    createdBy: '',
    remarks: ''
  });


const donationPayload = ref({
  amount: '',
  description: '',
  donationStatus: '',
  createdBy: '',
  memberId: '',
  remarks: ''
});

const appPayload = ref(
  {
    app_name: '',
    caption: '',
    app_key: '',
    description: '',
    rank: '',
    created_by: username.value,
    endpoint: ''
  }
);

const updateAppPayload = ref(
  {
    app_id: '',
    app_name: '',
    caption: '',
    app_key: '',
    description: '',
    rank: '',
    created_by: username.value,
    endpoint: ''

  }
);



// ------------------------------- MEMBER METHODS --------------------------------- //

const appList = computed(() => {
  return uamStore.listOfApps.records;
});

const onProcessApp = async () => {
  if (isUpdate.value == false) {
    confirmCreateAppDialog.value = true
    // onProcessNewApp();
  }
  else {
    confirmUpdateAppDialog.value = true
    // onProcessUpdateApp();
  }
};





const onProcessNewApp = async () => {
  loading.value = true;
  const result = await uamStore.createApp(appPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showSubscriptionDialog.value = false;
    confirmCreateAppDialog.value = false;
    step.value = 1;
    loadRecords();
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

const onProcessUpdateApp = async () => {
  loading.value = true;
  updateAppPayload.value = {
    created_by: username.value,
    app_name: appPayload.value.app_name,
    app_key: appPayload.value.app_key,
    app_id: app_id.value,
    caption: appPayload.value.caption,
    description: appPayload.value.description,
    rank: appPayload.value.rank,
    endpoint: appPayload.value.endpoint,
  }
  const result = await uamStore.updateApp(updateAppPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showSubscriptionDialog.value = false;
    step.value = 1;
    confirmUpdateAppDialog.value = false;
    loadRecords();
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


const onProcessDisableApp = async () => {
  loading.value = true;
  const result = await uamStore.disableApp({
    app_id: app_id.value,
    created_by: username.value,
  });
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    confirmDisableAppDialog.value = false;
    loadRecords();
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

const onProcessEnableApp = async () => {
  loading.value = true;
  const result = await uamStore.enableApp({
    app_id: app_id.value,
    created_by: username.value,
  });
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    confirmEnableAppDialog.value = false;
    loadRecords();
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


const goToAssignedApps = (app: any) => {
  router.push(`/uam/app_roles/${app.app.id}`);
};

const loadRecords = async () => {
  getAllUsers(),
    getAllApps()

}

const getAllUsers = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, UAMUserData>(
    uamStore.getAllUsers,
    fetchData,
  );
}

const getAllApps = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, UAMUserData>(
    uamStore.getAllApps,
    fetchData,
  );
}
const onReset = () => {
  appPayload.value = {
    app_name: '',
    caption: '',
    description: '',
    app_key: '',
    created_by: username.value,
    rank: '',
    endpoint: ''
  };
}

// ------------------------------- HELPER METHODS --------------------------------- //

const onshowCreateUserDialog = () => {
  isUpdate.value = false;
  showSubscriptionDialog.value = true;
};


const onshowUpdateAppDialog = (app: any) => {
  isUpdate.value = true;
  appPayload.value = {
    app_name: app?.app?.app_name,
    caption: app?.app?.caption,
    description: app?.app?.description,
    app_key: app?.app?.app_key,
    created_by: username.value,
    rank: app?.app?.rank,
    endpoint: app?.app?.endpoint
  };
  app_id.value = app?.app?.id
  showSubscriptionDialog.value = true;
};


const onshowDisableAppDialog = (app: any) => {
  appPayload.value = {
    app_name: app?.app?.app_name,
    caption: app?.app?.caption,
    description: app?.app?.description,
    app_key: app?.app?.app_key,
    created_by: username.value,
    rank: app?.app?.rank,
    endpoint: app?.app?.endpoint
  };
  app_id.value = app?.app?.id
  confirmDisableAppDialog.value = true;
};

const onshowEnableAppDialog = (app: any) => {
  appPayload.value = {
    app_name: app?.app?.app_name,
    caption: app?.app?.caption,
    description: app?.app?.description,
    app_key: app?.app?.app_key,
    created_by: username.value,
    rank: app?.app?.rank,
    endpoint: app?.app?.endpoint
  };
  app_id.value = app?.app?.id
  confirmEnableAppDialog.value = true;
};



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
// ------------------------------- TABLE COLUMNS AND ROWS --------------------------------- //

const columns: any = ([
  { name: 'actions', align: 'center', label: 'Action' },
  {
    name: 'AppName',
    required: true,
    label: 'App Name',
    align: 'left',
    field: (row: any) => {
      return row?.app?.app_name ?? 0;
    },
  },
  {
    name: 'AppKey', align: 'left', label: 'App Key', required: true,
    field: (row: any) => {
      return row?.app?.app_key ?? 0;
    },
  },
  {
    name: 'Caption', align: 'left', label: 'Caption', required: true,
    field: (row: any) => {
      return row?.app?.caption ?? 0;
    },
  },
  {
    name: 'Endpoint', align: 'left', label: 'Endpoint', required: true,
    field: (row: any) => {
      return row?.app?.endpoint ?? 'NA';
    },
  },
  {
    name: 'AppStatus', align: 'center', label: 'App Status',
    field: (row: any) => {
      return row?.app?.status ?? 0;
    },
  },
  {
    name: 'Rank', align: 'center', label: 'Rank',
    field: (row: any) => {
      return row?.app?.rank ?? 0;
    },
  },
  {
    name: 'CreatedBy', align: 'center', label: 'Created By',
    field: (row: any) => {
      return row?.app?.created_by ?? 0;
    },
  },
  {
    name: 'CreatedAt',
    label: 'Created At',
    align: 'center',
    field: (row: any) => {
      return formatCustomDate(row?.app?.created_at);
    },
  },
  {
    name: 'Description', align: 'left', label: 'Description', required: true,
    field: (row: any) => {
      return row?.app?.description ?? 0;
    },
  },

  {
    name: 'UpdatedAt',
    label: 'Updated At',
    align: 'center',
    field: (row: any) => {
      return formatCustomDate(row?.app?.updated_at);
    },
  },
]);



// ------------------------------- ON MOUNTED --------------------------------- //

onMounted(() => {
  loadRecords()
});

</script>

<style scoped></style>

