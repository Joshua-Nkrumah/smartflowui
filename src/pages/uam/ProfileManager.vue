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
            <q-item-label class="text-h6 text-weight-bold"><q-icon name="o_manage_accounts" size="1.5rem"
                class="q-mr-md" />Account Settings</q-item-label>
          </div>
        </div>
      </template>
      <template #sub-title>
        <div class="text-h7 text_weight_light">Manage your user account and accesses from here</div>
      </template>
    </MainBottomHeader>
    <div style="margin-top: -2.5rem;" class="q-pa-lg">
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
                  <q-item-label class="text-bold text-h6">User Information</q-item-label>
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
                      Full Name
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ userInfo?.first_name }} {{ userInfo?.last_name }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_email" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Email Address
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ userInfo?.email }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_phone" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Phone Number
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ userInfo?.phone_number }}
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
                      User Status
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ userInfo?.status }}
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
                      {{ userInfo?.created_at }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-9">
          <q-card class="card-shadow">
            <q-card-section>
              <q-item class="q-mt-md">
                <q-item-section avatar>
                  <my-avatar color="blue-8" text-color="white" :shape="ShapeConstants.ROUNDED" label="Manage Account"
                    size="7rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-bold text-h6 q-mb-md">Manage Account</q-item-label>
                  <q-item-label class=" text-h6 text-weight-light">Manage your account profile.</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-list>
                <div class="row">

                  <div class="col-md-5">
                    <q-item>
                      <q-item-section avatar>
                        <q-item-section>
                          <q-item-label class="text-weight-bold" style="font-size: 1rem">
                            <span> Change Password</span>
                            <!-- <span class="q-ml-md"><q-avatar size="3.5rem" rounded
                                text-color="primary">
                                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                  @click="isPwd = !isPwd" />
                              </q-avatar></span> -->
                          </q-item-label>
                          <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">

                          </q-item-label>
                        </q-item-section>
                        <q-form @submit="onConfirmChangePassword" @reset="onReset" class="q-mt-md">
                          <div class="row q-col-gutter-x-lg  ">
                            <div class="col-md-12">
                              <q-input v-model="passwordPayload.current_password" outlined
                                :type="isPwd ? 'password' : 'text'" label="Current Password" :clearable="true"
                                bg-color="white" :dense="true" label-color="dark" style="max-width: 50rem;" lazy-rules
                                :rules="[(val) => (val && val.length > 0) || 'Please enter your current password']">
                                <template v-slot:append>
                                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                    @click="isPwd = !isPwd" />
                                </template>
                              </q-input>
                            </div>

                            <div class="col-md-12">
                              <q-input v-model="passwordPayload.new_password" outlined
                                :type="isPwd ? 'password' : 'text'" label="New Password" :clearable="true"
                                bg-color="white" :dense="true" label-color="dark" style="max-width: 50rem;" lazy-rules
                                :rules="[(val) => (val && val.length > 0) || 'Please enter your new password']">
                                <template v-slot:append>
                                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                    @click="isPwd = !isPwd" />
                                </template>
                              </q-input>
                            </div>
                          </div>
                          <div>
                            <q-btn color="primary" label="Change Password" type="submit" :loading="loading" />
                            <!-- <q-btn color="primary" label="Update User" type="submit" v-if="isUpdate == true"
                          :loading="loading" /> -->
                          </div>
                        </q-form>
                      </q-item-section>
                    </q-item>
                  </div>

                  <q-separator vertical />

                  <div class="col-md-6">
                    <q-item>
                      <q-item-section avatar>
                        <q-item-section>
                          <q-item-label class="text-weight-bold" style="font-size: 1rem">
                            Update Profile Info
                          </q-item-label>
                          <!-- <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                            ************
                          </q-item-label> -->
                        </q-item-section>
                        <q-form @submit="onConfirmUpdateProfile" @reset="onReset">
                          <div class="row q-col-gutter-x-lg  ">
                            <div class="col-md-12">
                              <q-input v-model="userPayload.first_name" label="First Name *" lazy-rules
                                :rules="[val => val && val.length > 0 || 'Enter the user\'s first name']" />
                            </div>
                            <div class="col-md-12">
                              <q-input v-model="userPayload.last_name" label="Last Name *" lazy-rules
                                :rules="[val => val && val.length > 0 || 'Enter the user\'s last name']" />
                            </div>
                            <!-- <div class="col-md-12">
                              <q-input v-model="userPayload.email" label="Email Address " type="email" lazy-rules :rules="[
                                (val) => (val && /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val)) || 'Must be a valid email address'
                              ]" />
                            </div> -->
                            <div class="col-md-12">
                              <q-input v-model="userPayload.phone_number" type="number" hint="0 (XXX) XXX - XXX"
                                autogrow label="Mobile Number *" :rules="[
            (val) => (val && Number(val) && val > 0) || 'Enter the mobile number of the user',
            (val) => val.length == 10 || 'Must be 10 digits'
          ]">
                                <q-tooltip anchor="center middle" self="bottom left">Mobile Number
                                </q-tooltip>
                              </q-input>
                            </div>
                          </div>
                          <div>
                            <q-btn color="primary" label="Update Profile Details" type="submit" :loading="loading"
                              class="q-mt-md" />
                            <!-- <q-btn color="primary" label="Update User" type="submit" v-if="isUpdate == true"
                          :loading="loading" /> -->
                          </div>
                        </q-form>
                      </q-item-section>
                    </q-item>
                  </div>
                </div>
              </q-list>
            </q-card-section>
            <q-separator />
          </q-card>
        </div>
        <!-- <div class="col-9 ">
          <my-search-box v-model="searchKey" :on-refresh="loadRecords" />
          <q-table style="margin-top: 2rem;" title="Assigned Apps" flat :filter="searchKey"
            :loading="paginationUtil.loading" v-model:pagination="paginationUtil.pagination" :rows="assignedAppList"
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
                    <q-item clickable @click="onshowRetractAppDialog(props.row as UAMUserData)">
                      <q-item-section side>
                        <q-icon name="playlist_remove" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Retract App From User</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-td>
            </template>
          </q-table>



        </div> -->

      </div>
    </div>

  </main>

  <q-dialog v-model="confirmChangePasswordDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_edit" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to change your password? </span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessChangePassword()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirmUpdateProfileDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_edit" color="primary" text-color="white" />
          <span class="q-ml-md">Are you sure you want to update your profile? </span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessUpdateProfile()" :loading="loading" />
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
const confirmChangePasswordDialog = ref(false);
const confirmUpdateProfileDialog = ref(false);

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

const authenticatedUserId = <any>ref(null);

if (LocalStorage.has('user_id')) {
  authenticatedUserId.value = LocalStorage.getItem('user_id');
};

const isPwd = ref(true);

const now = ref(DateTime.local());

const currentDateTime_ = computed(() => {
  return now.value.toFormat('ccc LLL dd, hh:mm:ss a');
});



// ------------------------------- REQUEST PAYLOAD --------------------------------- //


const userPayload = ref(
  {
    user_id: authenticatedUserId.value,
    first_name: `${LocalStorage.getItem('firstName')}`,
    last_name: `${LocalStorage.getItem('lastName')}`,
    email: `${LocalStorage.getItem('email')}`,
    phone_number: `${LocalStorage.getItem('phoneNumber')}`,
    created_by: username.value,
  });



const passwordPayload = ref(
  {
    user_id: authenticatedUserId.value,
    current_password: '',
    new_password: '',
    email: username.value,
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


const onConfirmChangePassword = (user: any) => {
  isUpdate.value = true;
  user_id.value = user.id
  confirmChangePasswordDialog.value = true;
};

const onConfirmUpdateProfile = (user: any) => {
  user_id.value = user.id
  confirmUpdateProfileDialog.value = true;
};
// ------------------------------- MEMBER METHODS --------------------------------- //

const appList = computed(() => {
  const listOfApps = uamStore.listOfApps.records;

  return listOfApps.map(item => item.app);
});



const roleList = computed(() => {
  const listOfApps = uamStore.listOfApps.records;

  // Specify the app_id you want to filter by
  const targetAppId = app_id.value;
  // Use flatMap to extract roles from all apps and filter by app_id
  return listOfApps
    .filter(appData => appData?.app?.id === targetAppId)
    .flatMap(item => item.roles);
});

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

const onProcessChangePassword = async () => {
  loading.value = true;
  console.log('password change', passwordPayload.value);
  // return;
  const result = await uamStore.changePassword(passwordPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    confirmChangePasswordDialog.value = false;
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

const onProcessUpdateProfile = async () => {
  loading.value = true;
  const result = await uamStore.updateUser(userPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    confirmUpdateProfileDialog.value = false;
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

// const onProcessUpdateProfile = async () => {
//   loading.value = true;
//   updateAppPayload.value = {
//     created_by: username.value,
//     app_name: appPayload_.value.app_name,
//     app_key: appPayload_.value.app_key,
//     app_id: app_id.value,
//     caption: appPayload_.value.caption,
//     description: appPayload_.value.description,
//     rank: appPayload_.value.rank,
//   }
//   const result = await uamStore.updateApp(updateAppPayload.value);
//   loading.value = false;
//   if (result.status == AAStatusConstants.SUCCESS) {
//     showAppDialog.value = false;
//     step.value = 1;
//     confirmRetractAppDialog.value = false;
//     loadRecords();
//     $q.notify({
//       color: 'green-8',
//       textColor: 'white',
//       icon: 'cloud_done',
//       position: 'top-right',
//       message: `${result.message}`,
//     });
//   } else {
//     $q.notify({
//       color: 'red-8',
//       textColor: 'white',
//       icon: 'close',
//       position: 'top-right',
//       message: `${result.message}`,
//     });
//   }
// };

const userInfo = <any>computed(() => {
  const result = <any>uamStore.listOfUsers?.records.filter((record: any) => (record.id === authenticatedUserId.value))[0];
  formatCustomDate(result?.created_at.toString());
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
  // getAllUsers(),
  //   getAllApps(),
  //   getAssignedApps()
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

const getAssignedApps = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  // await paginationUtil.value.initiate<unknown, UAMUserData>(
  //   uamStore.getAssignedApps,
  //   fetchData,
  // );

  await paginationUtil.value.initiate<unknown, UAMAssignedRecord>(
    () =>
      uamStore.getAssignedApps({
        user_id: authenticatedUserId.value
      }),
    fetchData,
  );
}


const onReset = () => {
  appPayload_.value = {
    app_name: '',
    caption: '',
    description: '',
    app_key: '',
    created_by: username.value,
    rank: ''
  };
  passwordPayload.value = {
    user_id: authenticatedUserId.value,
    current_password: '',
    new_password: '',
    email: username.value,
  }
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
  // {
  //   name: 'Caption', align: 'left', label: 'Caption', required: true,
  //   field: (row: any) => {
  //     return row?.app?.caption ?? 0;
  //   },
  // },
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
