<template>
  <main class="main-content">
    <MainBottomHeader>
      <template #actions>
        <div style=" margin-top: -1.5rem; color: white" class="text-h6 gt-md primary-color-light text-bold ">
          {{ currentDateTime_ }}
          <q-icon color="secondary" @click="$q.fullscreen.toggle()"
            :name="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" size="2.5rem" class="q-ml-md"
            style="cursor: pointer;" />
        </div>
      </template>
      <template #title>
        <div class="row q-col-gutter-x-md">
          <div class="row items-center">
            <q-item-label class="text-h6 text-weight-bold"><q-icon name="fa-solid fa-gift fa-xl" size="1.5rem"
                class="q-mr-md" /> Institution Subscriptions
            </q-item-label>
          </div>
        </div>
      </template>
      <template #sub-title>
        <div class="text-h7 text_weight_light">Manage subscriptions of institutions</div>
      </template>
    </MainBottomHeader>
    <div style="margin-top: -4rem;" class="q-pa-lg">
      <div class="row q-col-gutter-x-lg">
        <div class="col-12 ">
          <short-search-box label="Filter" icon="filter" v-model="searchKey" :on-refresh="loadRecords" />
          <q-table style="margin-top: 2rem;" flat :filter="searchKey" :loading="paginationUtil.loading"
            v-model:pagination="paginationUtil.pagination" :rows="institutionList" :columns="columns" row-key="Id"
            padding>

            <template v-slot:body-cell-InstitutionStatus="props">
              <q-td key="InstitutionStatus" :props="props">
                <q-badge v-if="props.row?.statusLabel === 'Active'" class="q-pl-md q-pr-md" label="Active" fill
                  color="green-8" style="height: 1.5rem;" />
                <q-badge v-if="props.row?.statusLabel === 'Deactivated'" class="q-pl-md q-pr-md" label="Deactivated"
                  fill color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>
            <template v-slot:body-cell-DomainName="props">
              <q-td key="DomainName" :props="props">
                <router-link :to="props.row.domainName"></router-link>
                <q-badge class="q-pl-md q-pr-md" fill color="orange-8" style="height: 1.5rem;">
                  {{ props.row.domainName }}
                </q-badge>
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <div class="row wrap justify-between"></div>
                <q-btn-dropdown color="grey-8" dense>
                  <!-- <q-list>
                    <q-item clickable @click="onshowUpdateInstitutionDialog(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Update Institution</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onDetermineConfirmationPrompt(props.row as InstitutionRecord)"
                      v-if="props?.row?.status == '6' || props?.row?.statusLabel.toLowerCase() == 'deactivated'">
                      <q-item-section side>
                        <q-icon name="o_check_circle" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Enable Institution</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onDetermineConfirmationPrompt(props.row as InstitutionRecord)"
                      v-if="props?.row?.status == '1' || props?.row?.statusLabel.toLowerCase() == 'active'">
                      <q-item-section side>
                        <q-icon name="o_block" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Disable Institution</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowUpdateInstitutionDialog(props.row as InstitutionRecord)">
                      <q-item-section side>
                        <q-icon name="share" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Branches</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowInstitutionSubscriptionDialog(props.row as InstitutionRecord)">
                      <q-item-section side>
                        <q-icon name="fa-solid fa-gift fa-xl" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Subscribe to a Plan</q-item-label>
                      </q-item-section>
                    </q-item>

                  </q-list> -->
                </q-btn-dropdown>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </div>

  </main>
  <q-dialog v-model="showAppDialog" rounded style="width: 100% !important;" persistent>
    <q-card style="width: 900px; max-width: 100vw;">
      <q-toolbar>
        <q-avatar>
          <q-icon name="app_registration" color="blue-9" size="30px" v-if="isUpdate == false" />
          <q-icon name="edit" color="blue-9" size="30px" v-if="isUpdate == true" />
        </q-avatar>
        <q-toolbar-title color="blue-9" v-if="isUpdate == false"><span class="text-weight-bold">Assign App
          </span></q-toolbar-title>
        <q-toolbar-title color="blue-9" v-if="isUpdate == true"><span class="text-weight-bold">Retract App
            App</span></q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section>
        <div class="">
          <q-stepper v-model="step" vertical color="primary" animated flat>
            <q-step :name="1" title="User Information" icon="settings" :done="step > 1">
              <q-form @submit="onProcessApp" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">

                </div>
                <q-stepper-navigation>
                  <q-btn color="primary" label="Assign App" type="submit" :loading="loading" v-if="isUpdate == false" />
                  <q-btn color="primary" label="Retract App" type="submit" v-if="isUpdate == true" :loading="loading" />
                  <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
              </q-form>
            </q-step>
          </q-stepper>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirmAssignAppDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to this app to <strong> {{ userInfo?.first_name }} {{
            userInfo?.last_name }}</strong> </span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessAssignApp()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirmRetractAppDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_delete" color="primary" text-color="white" />
          <span class="q-ml-md">Retract <strong>{{ rolePayload_?.role_name }} in {{
            appPayload?.app_name }}</strong> from
            user?</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessRetractApp()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
import { ref, onMounted, computed, watch } from 'vue';
import { LocalStorage, useQuasar } from 'quasar';
import AAStatusConstants from 'src/constants/aa-status.constants';
import PaginationUtil from 'src/utils/pagination.utils';
import FetchDataRequest from 'src/models/FetchDataRequest.model';
import { UAMUserData } from 'src/models/uam/Users.model';
import { useRoute } from 'vue-router';
import { useUAMStore } from 'src/stores/uam-store';
import ShapeConstants from 'src/constants/shape.constants';
import MyAvatar from 'src/components/utils/MyAvatar.vue';
import { UAMAssignedRecord } from 'src/models/uam/AssignedApps.model';
import { DateTime } from 'luxon';
import MainBottomHeader from 'components/structure/MainBottomHeader.vue';
import MyFullDialog from 'src/components/utils/MyFullDialog.vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import DateUtil from 'src/utils/date.utils';
import ShortSearchBox from 'components/utils/ShortSearchBar.vue';
import ConfirmationPrompt from 'src/components/custom/ConfirmationPrompt.vue';
import { SubscriptionPlanRecord } from 'src/models/uam/SubscriptionPlan.model';
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
const showAppDialog = ref(false);
const confirmAssignAppDialog = ref(false);
const confirmRetractAppDialog = ref(false);
const confirmResetUserDialog = ref(false);
const confirmDisableAppDialog = ref(false);
const confirmEnableAppDialog = ref(false);
const loading = ref(false);
const step = ref(1);
const roleSelectDisabled = ref(true);

const showContributionDialog = ref(false);
const showDonationDialog = ref(false);
const isUpdate = ref(false);

const memberId = ref('');
const route = useRoute();

const username = <any>ref(null);
const app_id = <any>ref(null);
const user_id = <any>ref(null);

if (LocalStorage.has('email')) {
  username.value = LocalStorage.getItem('email');
};


const now = ref(DateTime.local());

const currentDateTime_ = computed(() => {
  return now.value.toFormat('ccc LLL dd, hh:mm:ss a');
});
// ------------------------------- REQUEST PAYLOAD --------------------------------- //


const institutionList = computed(() => {
  const search = searchKey.value.toLowerCase();
  return uamStore.listOfInstitutions.records.filter((institution) => {
    return (
      (institution.name && institution.name.toLowerCase().includes(search)) ||
      (institution.shortName && institution.shortName.toLowerCase().includes(search)) ||
      (institution.domainName && institution.domainName.toLowerCase().includes(search)) ||
      (institution.city && institution.city.toLowerCase().includes(search)) ||
      (institution.state && institution.state.toLowerCase().includes(search)) ||
      (institution.country && institution.country.toLowerCase().includes(search)) ||
      (institution.contacts && institution.contacts.some(contact => contact.toLowerCase().includes(search))) ||
      (institution.emailAddresses && institution.emailAddresses.some(email => email.toLowerCase().includes(search))) ||
      (institution.statusLabel && institution.statusLabel.toLowerCase().includes(search)) ||
      (institution.zipCode && institution.zipCode.toLowerCase().includes(search)) ||
      (institution.address && institution.address.toLowerCase().includes(search)) ||
      (institution.description && institution.description.toLowerCase().includes(search))
    );
  });
});


const appPayload_ = ref(
  {
    app_name: '',
    caption: '',
    app_key: '',
    description: '',
    rank: '',
    created_by: username.value
  }
);

const appPayload = ref({
  id: '',
  app_name: '',
  app_key: '',
  caption: '',
  description: '',
  rank: '',
  status: '',
  created_by: '',
  created_at: '',
  updated_at: ''
});

const rolePayload_ = ref<any>({
  id: '',
  role_name: '',
  normalized_name: '',
  app_id: '',
  status: '',
  created_by: '',
  created_at: '',
  updated_at: ''
});

const rolePayload = ref<any>(null);

const multiple = ref<any>(null);

const options = ref([
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
]);

const expanded = ref([
  'Ice cream sandwich', 'Facebook', 'Twitter', 'Apple', 'Oracle'
]);

const updateAppPayload = ref(
  {
    app_id: '',
    app_name: '',
    caption: '',
    app_key: '',
    description: '',
    rank: '',
    created_by: username.value
  }
);



// ------------------------------- MEMBER METHODS --------------------------------- //

// const appList = computed(() => {
//   const listOfApps = uamStore.listOfApps.records;

//   return listOfApps.map(item => item.app);
// });



// const roleList = computed(() => {
//   const listOfApps = uamStore.listOfApps.records;

//   // Specify the app_id you want to filter by
//   const targetAppId = app_id.value;
//   // Use flatMap to extract roles from all apps and filter by app_id
//   return listOfApps
//     .filter(appData => appData?.app?.id === targetAppId)
//     .flatMap(item => item.roles);
// });

const onProcessApp = async () => {
  if (isUpdate.value == false) {
    confirmAssignAppDialog.value = true
  }
  else {
    confirmRetractAppDialog.value = true
  }
};



const previousAppId = ref('');

watch(() => appPayload.value.id, async (newAppId) => {
  if (newAppId) {
    roleSelectDisabled.value = false;
    app_id.value = newAppId;

    // Compare previous and current app id
    if (previousAppId.value !== newAppId) {
      // console.log('App ID changed from', previousAppId.value, 'to', newAppId);
      rolePayload.value = null;
      // roleSelectDisabled.value = false;
    }
  } else {
    roleSelectDisabled.value = true;
    rolePayload.value = null;

  }

  // Update previousAppId
  previousAppId.value = newAppId;
});


watch(() => showAppDialog.value, async () => {
  if (showAppDialog.value == false) {
    appPayload.value = {
      id: '',
      app_name: '',
      app_key: '',
      caption: '',
      description: '',
      rank: '',
      status: '',
      created_by: '',
      created_at: '',
      updated_at: ''
    };
    rolePayload.value = null;

  }
});

const onProcessAssignApp = async () => {
  loading.value = true;
  const roleIdsOnly: string[] = rolePayload.value.map((role: any) => role.id);
  const data = {
    user_id: route.params['user_id'],
    app_id: appPayload?.value?.id,
    created_by: username.value,
    roles: roleIdsOnly
  }
  // console.log('assign_data', data);
  // return;
  const result = await uamStore.assignAppToUser(data);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showAppDialog.value = false;
    confirmAssignAppDialog.value = false;
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

const onProcessRetractApp = async () => {
  loading.value = true;
  const roleIdsOnly = [rolePayload_.value.role_id];
  const data = {
    user_id: route.params['user_id'],
    app_id: appPayload?.value?.id,
    created_by: username.value,
    roles: roleIdsOnly
  }
  // console.log('assign_data', data);
  // return;
  const result = await uamStore.retractAppFromUser(data);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    confirmRetractAppDialog.value = false;
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
    app_name: appPayload_.value.app_name,
    app_key: appPayload_.value.app_key,
    app_id: app_id.value,
    caption: appPayload_.value.caption,
    description: appPayload_.value.description,
    rank: appPayload_.value.rank,
  }
  const result = await uamStore.updateApp(updateAppPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showAppDialog.value = false;
    step.value = 1;
    confirmRetractAppDialog.value = false;
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

const userInfo = <any>computed(() => {
  const result = <any>uamStore.listOfUsers?.records.filter((record: any) => (record.id === route.params['user_id']))[0];
  formatCustomDate(result?.created_at?.toString());
  return result;
});


const assignedAppList = computed(() => {
  const listOfAssignedApps = uamStore.listOfAssignedApps.records;

  return listOfAssignedApps;
});



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



const gotoMemberHistory = (member: any) => {
  router.push(`/welfare/members-history/${member.memberId}`);
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

// const getAssignedApps = async () => {
//   const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
//   await paginationUtil.value.initiate<unknown, UAMAssignedRecord>(
//     () =>
//       uamStore.getAssignedApps({
//         user_id: route.params['user_id']
//       }),
//     fetchData,
//   );
// }


const onReset = () => {
  appPayload_.value = {
    app_name: '',
    caption: '',
    description: '',
    app_key: '',
    created_by: username.value,
    rank: ''
  };
}




// ------------------------------- HELPER METHODS --------------------------------- //

const onshowCreateUserDialog = () => {
  isUpdate.value = false;
  showAppDialog.value = true;
};


const onshowRetractAppDialog = (app: any) => {
  isUpdate.value = true;
  appPayload.value = {
    id: app?.app?.id,
    app_name: app?.app?.app_name,
    app_key: app?.app?.app_key,
    caption: app?.app?.caption,
    description: app?.app?.description,
    rank: app?.app?.rank,
    status: app?.app?.status,
    created_by: app?.app?.created_by,
    created_at: app?.app?.created_at,
    updated_at: app?.app?.updated_at,
  };
  rolePayload_.value = {
    role_name: app?.role?.role_name,
    role_id: app?.role_id,
  }
  app_id.value = app.id
  user_id.value = app.user_id
  onProcessApp();
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
    name: 'RoleName', align: 'left', label: 'Role Name', required: true,
    field: (row: any) => {
      return row?.role?.role_name ?? 0;
    },
  },
  {
    name: 'NormalizedName', align: 'left', label: 'Normalized Name', required: true,
    field: (row: any) => {
      return row?.role?.normalized_name ?? 0;
    },
  },
  {
    name: 'AppName', align: 'left', label: 'App Name', required: true,
    field: (row: any) => {
      return row?.app?.app_name ?? 0;
    },
  },
  {
    name: 'AppStatus', align: 'center', label: 'App Status',
    field: (row: any) => {
      return row?.app?.status ?? 0;
    },
  },
  // {
  //   name: 'Rank', align: 'center', label: 'Rank',
  //   field: (row: any) => {
  //     return row?.app?.rank ?? 0;
  //   },
  // },
  // {
  //   name: 'CreatedBy', align: 'center', label: 'Created By',
  //   field: (row: any) => {
  //     return row?.app?.created_by ?? 0;
  //   },
  // },
  {
    name: 'CreatedAt',
    label: 'Created At',
    align: 'center',
    field: (row: any) => {
      return formatCustomDate(row?.created_at);
    },
  },
  // {
  //   name: 'Description', align: 'left', label: 'Description', required: true,
  //   field: (row: any) => {
  //     return row?.app?.description ?? 0;
  //   },
  // },

  {
    name: 'UpdatedAt',
    label: 'Updated At',
    align: 'center',
    field: (row: any) => {
      return formatCustomDate(row?.updated_at);
    },
  },
]);

// ------------------------------- ON MOUNTED --------------------------------- //

onMounted(() => {
  setInterval(() => {
    now.value = DateTime.local();
  }, 1000);
  loadRecords()
});

</script>

<style scoped></style>
