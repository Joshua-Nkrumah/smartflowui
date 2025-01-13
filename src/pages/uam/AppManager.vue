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
            <q-item-label class="text-h6 text-weight-bold"><q-icon name="app_registration" size="1.5rem"
                class="q-mr-md" />App Manager
            </q-item-label>
          </div>
        </div>
      </template>
      <template #sub-title>
        <div class="text-h7 text_weight_light">Manage all apps</div>
      </template>
    </MainBottomHeader>
    <div style="margin-top: -3rem;" class="q-pa-lg">
      <div class="row">
        <div class="col-12 ">
          <short-search-box label="New App" icon="app_registration" v-model="searchKey" @toggleDialog="onshowAppDialog"
            :on-refresh="loadRecords" />
          <q-table style="margin-top: 2rem;" flat :filter="searchKey" :loading="paginationUtil.loading"
            v-model:pagination="paginationUtil.pagination" :rows="appList" :columns="columns" row-key="id" padding>
            <template v-slot:body-cell-AppStatus="props">
              <q-td key="AppStatus" :props="props">
                <q-badge v-if="props.row.statusLabel === 'Active'" class="q-pl-md q-pr-md" label="Active" fill
                  color="green-8" style="height: 1.5rem;" />
                <q-badge v-if="props.row.statusLabel === 'Deactivated'" class="q-pl-md q-pr-md" label="Deactivated" fill
                  color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <div class="row wrap justify-between"></div>
                <q-btn-dropdown color="grey-8" dense>
                  <q-list>
                    <q-item clickable @click="onshowUpdateAppDialog(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Update App</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable @click="onDetermineConfirmationPrompt(props.row as any)"
                      v-if="props?.row?.status == '6' || props?.row?.statusLabel.toLowerCase() == 'deactivated'">
                      <q-item-section side>
                        <q-icon name="o_check_circle" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Enable App</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onDetermineConfirmationPrompt(props.row as any)"
                      v-if="props?.row?.status == '1' || props?.row?.statusLabel.toLowerCase() == 'active'">
                      <q-item-section side>
                        <q-icon name="o_block" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Disable App</q-item-label>
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

  <my-full-dialog v-model="showPermissionDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-12">
        <q-card class="card-shadow full-width-card">
          <q-card-section class="row q-gutter-x-md align-middle">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="Add Application" size="4rem" font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-if="!isUpdate">
                Add Application
              </div>
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-else>
                User Application
              </div>
              <div class="text-h5 text-weight-light" v-if="!isUpdate">
                Add Application
              </div>
              <div class="text-h5 text-weight-light" v-else>
                Update Application
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-form @submit="onDetermineConfirmationPrompt" @reset="onReset">
      <q-card color="primary" animated flat class="card-shadow">
        <q-card-section>
          <div class="row q-col-gutter-x-lg  ">
            <div class="col-md-12">
              <!-- {{ appPayload.categoryId }} -->
              <q-select v-if="isUpdate == false" v-model="appPayload.categoryId" :options="categoryList"
                label="Application Category *" lazy-rules transition-show="scale" transition-hide="scale"
                behavior="default" option-value="id" option-label="name" emit-value map-options
                :rules="[val => val != null || 'Please select the application category']"></q-select>
            </div>
            <div class="col-md-6">
              <q-input v-model="appPayload.appName" label="Application Name *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the application\'s name']" />
            </div>
            <div class="col-md-6">
              <q-input v-model="appPayload.brandName" label="Brand Name *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the application\'s brand name']" />
            </div>
            <div class="col-md-6">
              <q-input v-model="appPayload.appOwner" label="Application Owner *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the application\'s owner']" />
            </div>
            <div class="col-md-6">
              <q-input v-model="appPayload.caption" label="Application Caption *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the application\'s caption']" />
            </div>
            <div class="col-md-6">
              <q-input v-model="appPayload.description" label="Description *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the application\'s description']" />
            </div>
            <div class="col-md-6">
              <q-input v-model="appPayload.appUrl" label="Application URL *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the application\'s url or endpoint']" />
            </div>
            <div class="col-md-6">
              <q-input v-model="appPayload.version" label="Version *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the application\'s version']" />
            </div>
            <div class="col-md-6">
              <q-input v-model="appPayload.rank" label="Rank  *" lazy-rules :rules="[
            (val) => (val && Number(val) && val > 0) || 'Enter application\'s rank'
          ]" />
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="row q-mt-lg justify-evenly q-gutter-x-md">
        <div class="col-5">
          <q-btn color="grey-6" class="full-width" label="Cancel" icon="cancel" :loading="loading" v-close-popup />
        </div>
        <div class="col-5">
          <q-btn color="primary" icon="check" class="full-width" label="Create App" type="submit" :loading="loading"
            v-if="!isUpdate" />
          <q-btn color="primary" icon="edit" class="full-width" label="Update App" type="submit" :loading="loading"
            v-else />
        </div>
      </div>
    </q-form>
  </my-full-dialog>

  <confirmation-prompt persistent v-model="showConfirmationPrompt.data" header="Confirm" color="primary" icon="o_send">
    <template #content>
      {{ showConfirmationPrompt?.message }}
    </template>
    <template #buttons>
      <q-btn v-close-popup flat color="primary" label="Cancel" />
      <q-btn class="primary-color text-white" flat color="primary" icon="check" label="Proceed" :loading="loading"
        @click="onProcessApp" />
    </template>
  </confirmation-prompt>
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
import { UAMRoleData } from 'src/models/uam/Roles.model';
import { UAMAppData } from 'src/models/uam/Apps.model';
import { DateTime } from 'luxon';
import MainBottomHeader from 'components/structure/MainBottomHeader.vue';
import MyFullDialog from 'src/components/utils/MyFullDialog.vue';
import ShapeConstants from 'src/constants/shape.constants';
import MyAvatar from 'src/components/utils/MyAvatar.vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import DateUtil from 'src/utils/date.utils';
import ShortSearchBox from 'components/utils/ShortSearchBar.vue';
import ConfirmationPrompt from 'src/components/custom/ConfirmationPrompt.vue';

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
const showPermissionDialog = ref(false);
const loading = ref(false);
const isUpdate = ref(false);
const route = useRoute();
const username = <any>ref(null);
const roleId = <any>ref(null);
const userId = <any>ref(null);
if (LocalStorage.has('email')) {
  username.value = LocalStorage.getItem('email');
};

if (LocalStorage.has('userId')) {
  userId.value = LocalStorage.getItem('userId');
};



const now = ref(DateTime.local());

const currentDateTime_ = computed(() => {
  return now.value.toFormat('ccc LLL dd, hh:mm:ss a');
});
// ------------------------------- REQUEST PAYLOAD --------------------------------- //

const actionType = ref('');

const appPayload = ref(
  {
    categoryId: '',
    appName: '',
    brandName: '',
    caption: '',
    description: '',
    rank: '',
    appUrl: '',
    version: '',
    appOwner: '',
    status: '1',
    createdBy: username.value,
    // subscriptionTypeId: '',
    // settingId: '',
    // isActive: 'true',
    // logoUrl: '',
    // appIcon: 'NA',
    // createdAt: '2024-07-18T17:21:43.222Z',
    // releaseDate: '2024-07-18T17:21:43.222Z',
    ...(isUpdate.value ? { AppId: '' } : {})
  }
);

const appList = computed(() => {
  const search = searchKey.value.toLowerCase();
  return uamStore.listOfApps.records.filter((app) => {
    return (
      (app.appName && app.appName.toLowerCase().includes(search)) ||
      (app.appOwner && app.appOwner.toLowerCase().includes(search)) ||
      (app.brandName && app.brandName.toLowerCase().includes(search)) ||
      (app.caption && app.caption.toLowerCase().includes(search)) ||
      (app.description && app.description.toLowerCase().includes(search))
    );
  });
});

const categoryList = computed(() => {
  const search = searchKey.value.toLowerCase();
  return uamStore.listOfCategories.records.filter((category) => {
    return (
      (category.name && category.name.toLowerCase().includes(search)) ||
      (category.description && category.description.toLowerCase().includes(search))
    );
  });
});

const filterEntity = ref({
  pageSize: 1000,
  userId: '',
  userName: '',
  status: '',
  shortName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  createdBy: '',
})


const onshowUpdateAppDialog = (app: any) => {
  isUpdate.value = true;
  onReset();
  appPayload.value = {
    categoryId: app.CategoryId,
    appName: app.appName,
    brandName: app.brandName,
    caption: app.caption,
    description: app.description,
    rank: app.rank,
    appUrl: app.appUrl,
    version: app.version,
    appOwner: app.appOwner,
    status: '1',
    createdBy: username.value,
    AppId: app?.id
    // subscriptionTypeId: '',
    // settingId: '',
    // isActive: 'true',
    // logoUrl: '',
    // appIcon: 'NA',
    // createdAt: '2024-07-18T17:21:43.222Z',
    // releaseDate: '2024-07-18T17:21:43.222Z',
  };
  showPermissionDialog.value = true;
};


const showConfirmationPrompt = ref(
  {
    data: false,
    message: ''
  }
);


const onShowConfirmationPrompt = (prompt: any) => {
  showConfirmationPrompt.value.data = true
  showConfirmationPrompt.value.message = prompt;
};
const onDetermineConfirmationPrompt = async (role: any) => {
  if (isUpdate.value == false) {
    actionType.value = 'add';
    const message = 'Are you sure you want to create this app?';
    onShowConfirmationPrompt(message);
  }
  if (isUpdate.value == true) {
    actionType.value = 'update';
    const message = 'Are you sure you want to update this app?';
    onShowConfirmationPrompt(message);
  }
  if (role != null && role?.statusLabel?.toLowerCase() == 'active') { // peform disable
    actionType.value = 'disable';
    roleId.value = role?.id;
    const message = 'Are you sure you want to disable this app?';
    onShowConfirmationPrompt(message);
  }
  if (role != null && role?.statusLabel?.toLowerCase() == 'deactivated') { // peform enable
    actionType.value = 'enable';
    roleId.value = role?.id;
    const message = 'Are you sure you want to enable this app?';
    onShowConfirmationPrompt(message);
  }
};


// ------------------------------- MEMBER METHODS --------------------------------- //



const onProcessApp = async () => {
  loading.value = true;
  let result;
  switch (actionType.value) {
    case 'add':
      result = await uamStore.createApp(appPayload.value);
      break;
    case 'update':
      result = await uamStore.updateApp(appPayload.value);
      break;
    case 'disable':
      result = await uamStore.disableApp({
        AppId: roleId.value,
        status: '6',
        statusLabel: 'Deactivated'
      });
      break;
    case 'enable':
      result = await uamStore.enableApp({
        AppId: roleId.value,
        status: '1',
        statusLabel: 'Active'
      });
      break;
    default:
      console.error('Unknown action type:', actionType.value);
      loading.value = false;
      return;
  }
  loading.value = false;
  console.log('result.status', result.status);
  if (result.status === AAStatusConstants.SUCCESS) {
    showPermissionDialog.value = false;
    showConfirmationPrompt.value.data = false;
    onReset();
    loadRecords();
    Qnotify('green-8', 'white', 'cloud_done', result.message)
  } else {
    Qnotify('red-8', 'white', 'close', result.message);
  }
};

const Qnotify = async (color: string, textColor: string, icon: string, message: string) => {
  $q.notify({
    color: color,
    textColor: textColor,
    icon: icon,
    position: 'top-right',
    message: message,
  });
};

const gotoMemberHistory = (member: any) => {
  router.push(`/welfare/members-history/${member.memberId}`);
};

const loadRecords = async () => {
  getAllApps()
  getAllCategory()
}

const getAllCategory = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => uamStore.getAllCategory(filterEntity.value),
    fetchData,
    () => uamStore.listOfCategories
  );
};
const getAllUsers = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, UAMUserData>(
    uamStore.getAllUsers,
    fetchData,
  );
}

const getAllApps = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => uamStore.getAllApps({
      userId: userId.value
    }),
    fetchData,
    () => uamStore.listOfApps
  );
};


const onReset = () => {
  appPayload.value = {
    appName: '',
    categoryId: '',
    brandName: '',
    caption: '',
    description: '',
    rank: '',
    appUrl: '',
    version: '',
    appOwner: '',
    status: '1',
    createdBy: username.value,
    // subscriptionTypeId: '',
    // settingId: '',
    // categoryId: '',
    // isActive: 'true',
    // logoUrl: '',
    // appIcon: 'NA',
    // createdAt: '2024-07-18T17:21:43.222Z',
    // releaseDate: '2024-07-18T17:21:43.222Z',
    AppId: ''
  }
}

// ------------------------------- HELPER METHODS --------------------------------- //

const onshowAppDialog = () => {
  isUpdate.value = false;
  showPermissionDialog.value = true;
};

// ------------------------------- TABLE COLUMNS AND ROWS --------------------------------- //

const columns: any = ([
  { name: 'actions', align: 'center', label: 'Action' },
  {
    name: 'AppName',
    required: true,
    label: 'Application Name',
    align: 'left',
    field: (row: any) => {
      return row?.appName ?? 0;
    },
  },
  {
    name: 'Description', align: 'left', label: 'Description', field: 'description', required: true,
  },
  { name: 'AppStatus', align: 'center', label: 'Application Status', field: 'status' },
  { name: 'AppUrl', align: 'center', label: 'Application Endpoint', field: 'appUrl' },
  { name: 'BrandName', align: 'center', label: 'App Code', field: 'brandName' },
  { name: 'CreatedBy', align: 'center', label: 'Created By', field: 'createdBy' },
  {
    name: 'CreatedAt',
    label: 'Created At',
    align: 'center',
    field: (row: any) => {
      return DateUtil.formatCustomDate(row?.createdAt);
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
