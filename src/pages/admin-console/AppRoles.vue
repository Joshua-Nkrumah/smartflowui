<template>
  <main class="main-content">
    <BottomHeader>
      <template #actions>
        <q-btn icon="app_registration" label="New Role" size="16px" color="white" text-color="primary" class="text-bold"
          no-caps push @click="onshowCreateUserDialog" />
      </template>
    </BottomHeader>
    <div style="margin-top: -4rem;" class="q-pa-lg">
      <div class="row q-col-gutter-x-lg">
        <div class="col-md-3 ">
          <q-card class="card-shadow">
            <q-card-section>
              <q-item class="q-mt-md">
                <q-item-section avatar>
                  <my-avatar color="blue-8" text-color="white" :shape="ShapeConstants.ROUNDED" label="User Information"
                    size="4rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-bold text-h6">App Information</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-list>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_badge" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      App Name
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ appInfo?.app?.app_name }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_email" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      App Key
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ appInfo?.app?.app_key }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_phone" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      App Caption
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ appInfo?.app?.caption }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-list>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="fa-solid fa-signal" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Description
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ appInfo?.app?.description }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_event" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Created At
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ appInfo?.app?.created_at }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-9 ">
          <my-search-box v-model="searchKey" :on-refresh="loadRecords" />
          <q-table style="margin-top: 2rem;" title="App Roles" flat :filter="searchKey" :loading="paginationUtil.loading"
            v-model:pagination="paginationUtil.pagination" :rows="roleList" :columns="columns" row-key="id" padding>
            <template v-slot:body-cell-RoleStatus="props">
              <q-td key="RoleStatus" :props="props">
                <q-badge v-if="props.row?.status === 'active'" class="q-pl-md q-pr-md" label="Active" fill color="green-8"
                  style="height: 1.5rem;" />
                <q-badge v-if="props.row?.status === 'inactive'" class="q-pl-md q-pr-md" label="Inactive" fill
                  color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <div class="row wrap justify-between"></div>
                <q-btn-dropdown color="grey-8" dense>
                  <q-list>
                    <q-item clickable @click="onshowUpdateRoleDialog(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Update Role</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowDisableRoleDialog(props.row as UAMUserData)"
                      v-if="props.row.status === 'active'">
                      <q-item-section side>
                        <q-icon name="block" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Disable Role</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowEnableRoleDialog(props.row as UAMUserData)"
                      v-if="props.row.status != 'active'">
                      <q-item-section side>
                        <q-icon name="toggle_on" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Enable Role</q-item-label>
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
  <q-dialog v-model="showAppDialog" rounded style="width: 100% !important;" persistent>
    <q-card style="width: 900px; max-width: 100vw;">
      <q-toolbar>
        <q-avatar>
          <q-icon name="person_add_alt" color="blue-9" size="30px" v-if="isUpdate == false" />
          <q-icon name="edit" color="blue-9" size="30px" v-if="isUpdate == true" />
        </q-avatar>
        <q-toolbar-title color="blue-9" v-if="isUpdate == false"><span class="text-weight-bold">Add App Role
          </span></q-toolbar-title>
        <q-toolbar-title color="blue-9" v-if="isUpdate == true"><span class="text-weight-bold">Update App
            Role</span></q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section>
        <div class="">
          <q-stepper v-model="step" vertical color="primary" animated flat>
            <q-step :name="1" title="User Information" icon="settings" :done="step > 1">
              <q-form @submit="onProcessApp" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">
                  <div class="col-md-12">
                    <q-input v-model="rolePayload.role_name" label="Role Name *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the app\'s role name']" />
                  </div>


                  <!-- <div class="col-md-6">
                    <q-select v-model="assignAppPayload.app_id" :options="roleList" label="Available Apps *" lazy-rules
                      transition-show="scale" transition-hide="scale" behavior="default" option-value="id"
                      option-label="app_name" :rules="[val => val != null || 'Please select the app you wish to assign']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the membership status
                      </q-tooltip>
                    </q-select>
                  </div>
                  <div class="col-md-6">
                    <q-select v-model="assignAppPayload.role_id" :options="roleList" label="App Role *" lazy-rules
                      transition-show="scale" option-value="id" option-label="app_name" transition-hide="scale"
                      behavior="default" :rules="[val => val != null || 'Please select the role you wish to assign']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the role on the app chosen above
                      </q-tooltip>
                    </q-select>
                  </div> -->
                </div>
                <q-stepper-navigation>
                  <q-btn color="primary" label="Create Role" type="submit" :loading="loading" v-if="isUpdate == false" />
                  <q-btn color="primary" label="Update Role" type="submit" v-if="isUpdate == true" :loading="loading" />
                  <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
              </q-form>
            </q-step>
          </q-stepper>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirmCreateRoleDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to create this role</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessNewRole()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirmUpdateRoleDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to update this app</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessUpdateRole()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirmDisableRoleDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="recommend" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to disable this app</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessDisableRole()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirmEnableRoleDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="recommend" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to enable this app</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessEnableRole()" :loading="loading" />
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
import ShapeConstants from 'src/constants/shape.constants';
import MyAvatar from 'src/components/utils/MyAvatar.vue';

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
const confirmCreateRoleDialog = ref(false);
const confirmUpdateRoleDialog = ref(false);
const confirmResetUserDialog = ref(false);
const confirmDisableRoleDialog = ref(false);
const confirmEnableRoleDialog = ref(false);
const loading = ref(false);
const step = ref(1);

const showContributionDialog = ref(false);
const showDonationDialog = ref(false);
const isUpdate = ref(false);

const memberId = ref('');
const route = useRoute();

const username = <any>ref(null);
const app_id = <any>ref(null);
const role_id = <any>ref(null);


if (LocalStorage.has('email')) {
  username.value = LocalStorage.getItem('email');
};



// ------------------------------- REQUEST PAYLOAD --------------------------------- //

const rolePayload = ref(
  {
    role_name: '',
    app_id: ref(route.params['app_id']),
    created_by: username.value
  }
);

const assignAppPayload = ref(
  {
    app_id: '',
    user_id: route.params['user_id'],
    role_id: '',
    created_by: username.value
  }
);

const updateAppPayload = ref(
  {
    role_name: '',
    role_id: '',
    created_by: username.value
  }
);



// ------------------------------- MEMBER METHODS --------------------------------- //

const roleList_ = computed(() => {
  return uamStore.listOfApps.records;
});


const roleList = <any>computed(() => {
  const result = appInfo.value.roles
  return result;
});



const onProcessApp = async () => {
  if (isUpdate.value == false) {
    confirmCreateRoleDialog.value = true
    // onProcessNewRole();
  }
  else {
    confirmUpdateRoleDialog.value = true
    // onProcessUpdateRole();
  }
};


// const merchantId = ref(route.params['id']);





const onProcessNewRole = async () => {
  loading.value = true;
  const result = await uamStore.createRole(rolePayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showAppDialog.value = false;
    confirmCreateRoleDialog.value = false;
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

const onProcessUpdateRole = async () => {
  loading.value = true;
  updateAppPayload.value = {
    created_by: username.value,
    role_name: rolePayload.value.role_name,
    role_id: role_id.value
  }
  const result = await uamStore.updateRole(updateAppPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showAppDialog.value = false;
    step.value = 1;
    confirmUpdateRoleDialog.value = false;
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

const appInfo = <any>computed(() => {
  const result = <any>uamStore.listOfApps?.records.filter((record: any) => (record?.app?.id === route.params['app_id']))[0];
  formatCustomDate(result?.app?.created_at.toString());
  return result;
});

const onProcessDisableRole = async () => {
  loading.value = true;
  const result = await uamStore.disableRole({
    role_id: role_id.value,
    created_by: username.value,
  });
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    confirmDisableRoleDialog.value = false;
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

const onProcessEnableRole = async () => {
  loading.value = true;
  const result = await uamStore.enableRole({
    role_id: role_id.value,
    created_by: username.value,
  });
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    confirmEnableRoleDialog.value = false;
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
  rolePayload.value = {
    role_name: '',
    app_id: '',
    created_by: username.value
  };
}

// ------------------------------- HELPER METHODS --------------------------------- //

const onshowCreateUserDialog = () => {
  isUpdate.value = false;
  showAppDialog.value = true;
};


const onshowUpdateRoleDialog = (app: any) => {
  isUpdate.value = true;
  rolePayload.value = {
    role_name: app?.role_name,
    app_id: route.params['app_id'],
    created_by: username.value
  };
  role_id.value = app?.id,
    // app_id.value = app.id
    showAppDialog.value = true;
};


const onshowDisableRoleDialog = (app: any) => {
  rolePayload.value = {
    role_name: app?.role_name,
    app_id: route.params['app_id'],
    created_by: username.value
  };
  role_id.value = app?.id,
    // app_id.value = app.id
    confirmDisableRoleDialog.value = true;
};

const onshowEnableRoleDialog = (app: any) => {
  rolePayload.value = {
    role_name: app?.role_name,
    app_id: route.params['app_id'],
    created_by: username.value
  };
  role_id.value = app?.id,
    // app_id.value = app.id
    confirmEnableRoleDialog.value = true;
};



function formatCustomDate(dateString: string): string {
  // Parse the input date string into a Date object
  const inputDate = new Date(dateString);

  // Check if the inputDate is valid
  if (isNaN(inputDate.getTime())) {
    return 'Invalid Date';
  }

  // Get the day, month, year, hours, and minutes in UTC
  const day = inputDate.getUTCDate();
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = monthNames[inputDate.getUTCMonth()];
  const year = inputDate.getUTCFullYear();
  const hours = inputDate.getUTCHours();
  const minutes = inputDate.getUTCMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  // Format the date string
  const formattedDate = `${day}th ${month}, ${year}, ${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  return formattedDate;
}
// ------------------------------- TABLE COLUMNS AND ROWS --------------------------------- //



const columns: any = ([
  { name: 'actions', align: 'center', label: 'Action' },
  {
    name: 'RoleName',
    required: true,
    label: 'Role Name',
    align: 'left',
    field: (row: any) => {
      return row?.role_name ?? 0;
    },
  },
  {
    name: 'NormalizedRole', align: 'left', label: 'Normalized Role', required: true,
    field: (row: any) => {
      return row?.normalized_name ?? 0;
    },
  },
  {
    name: 'AppId', align: 'left', label: 'App Id', required: true,
    field: (row: any) => {
      return row?.app_id ?? 0;
    },
  },
  {
    name: 'RoleStatus', align: 'center', label: 'Role Status',
    field: (row: any) => {
      return row?.status ?? 0;
    },
  },
  {
    name: 'CreatedBy', align: 'center', label: 'Created By',
    field: (row: any) => {
      return row?.created_by ?? 0;
    },
  },
  {
    name: 'CreatedAt',
    label: 'Created At',
    align: 'center',
    field: (row: any) => {
      return formatCustomDate(row?.created_at);
    },
  },
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
  loadRecords()
});

</script>

<style scoped></style>

