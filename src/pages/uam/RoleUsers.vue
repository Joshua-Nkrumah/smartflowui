<template>
  <main class="main-content">
    <MainBottomHeader>
      <template #actions>
        <div style="margin-top: -1.5rem; color: white" class="text-h6 gt-md primary-color-light text-bold">
          {{ currentDateTime_ }}

          <q-icon color="secondary" @click="$q.fullscreen.toggle()"
            :name="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" size="2.5rem" class="q-ml-md"
            style="cursor: pointer" />
        </div>
      </template>
      <template #title>
        <div class="row q-col-gutter-x-md">
          <div class="row items-center">
            <q-item-label class="text-h6 text-weight-bold"><q-icon name="o_groups" size="1.5rem" class="q-mr-md" />
              <!-- <span class="text-bold"> {{ `${ ? selectedRole?.roleName : 'User'}'s ` }}</span>
              Users -->
              Role Users ({{ selectedRole?.roleName }})
            </q-item-label>
          </div>
        </div>
      </template>
      <template #sub-title>
        <div class="text-h7 text_weight_light">
          Manage Users in {{ selectedRole?.roleName }} Role
        </div>
      </template>
    </MainBottomHeader>
    <div style="margin-top: -3rem" class="q-pa-lg">
      <div class="row q-col-gutter-x-xl wrap">
        <div class="col-12 col-md-12 col-lg-12">
          <short-search-box label="Apply Changes" icon="published_with_changes" v-model="searchKey"
            @toggleDialog="onDetermineConfirmationPrompt_" :on-refresh="loadRecords" />
          <q-table bordered separator="horizontal" style="margin-top: 2rem;" flat :filter="searchKey"
            :loading="paginationUtil.loading" v-model:pagination="paginationUtil.pagination" :rows="userList"
            :columns="userColumns" row-key="userId" padding selection="multiple" v-model:selected="selected">
            <!-- {{ selected }} -->
            <template v-slot:header-selection="scope">
              <q-toggle v-model="scope.selected" color="green-8" />
            </template>
            <template v-slot:body-selection="scope">
              <q-toggle v-model="scope.selected" color="green-8" />
            </template>
            <template v-slot:loading>
              <q-inner-loading showing class="bg-brand-loading" />
            </template>
            <template v-slot:body-cell-UserStatus="props">
              <q-td key="UserStatus" :props="props">
                <q-badge v-if="props.row.statusLabel === 'Active'" class="q-pl-md q-pr-md" label="Active" fill
                  color="green-8" style="height: 1.5rem;" />
                <q-badge v-if="props.row.statusLabel === 'Deactivated'" class="q-pl-md q-pr-md" label="Deactivated" fill
                  color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </main>
  <my-full-dialog v-model="showUserToRoleDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-12">
        <q-card class="card-shadow full-width-card">
          <q-card-section class="row q-gutter-x-md align-middle">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="Role User" size="4rem" font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-if="!isUpdate">
                {{ selectedRole?.roleName }} Role
              </div>
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-else>
                Update Role User
              </div>
              <div class="text-h5 text-weight-light" v-if="!isUpdate">
                Add User(s) to <span class="text-bold">{{ selectedRole?.roleName }}</span> Role
              </div>
              <div class="text-h5 text-weight-light" v-else>
                Update Role User
              </div>
            </div>
            <!-- {{ selectedUserId }} -->
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- <q-form @submit="onDetermineConfirmationPrompt">
      <div class="row q-mt-lg justify-evenly q-gutter-x-md">
        <div class="col-5">
          <q-btn color="grey-6" class="full-width" label="Cancel" icon="cancel" :loading="loading" v-close-popup />
        </div>
        <div class="col-5">
          <q-btn color="primary" class="full-width" icon="check" label="Add To Role" type="submit" :loading="loading"
            v-if="!isUpdate" />
          <q-btn color="primary" class="full-width" icon="cancel" label="Update" type="submit" :loading="loading"
            v-else />
        </div>
      </div>
    </q-form> -->
  </my-full-dialog>

  <my-full-dialog v-model="showGenerateLinkDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-12">
        <q-card class="card-shadow full-width-card">
          <q-card-section class="row q-gutter-x-md align-middle">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="Generate Invitation Link" size="4rem"
                font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey">
                User Onboarding
              </div>
              <div class="text-h5 text-weight-light">
                Generate Invitation Link
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-form @submit="onDetermineConfirmationPrompt_" @reset="onReset">
      <q-card color="primary" animated flat class="card-shadow">
        <q-card-section>
          <div class="row q-col-gutter-x-lg q-col-gutter-y-lg">
            <div class="col-12">
              <q-input label="Start Date and Time" outlined v-model="generateLinkPayload.startDate">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="generateLinkPayload.startDate" mask="YYYY-MM-DD HH:mm">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-time v-model="generateLinkPayload.startDate" mask="YYYY-MM-DD HH:mm" format24h>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-12">
              <q-input label="Expiry Date and Time" outlined v-model="generateLinkPayload.endDate">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="generateLinkPayload.endDate" mask="YYYY-MM-DD HH:mm">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>

                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-time v-model="generateLinkPayload.endDate" mask="YYYY-MM-DD HH:mm" format24h>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="row q-mt-lg justify-evenly q-gutter-x-md">
        <div class="col-5">
          <q-btn color="grey-6" class="full-width" label="Cancel" icon="cancel" :loading="loading" v-close-popup />
        </div>
        <div class="col-5">
          <q-btn color="primary" class="full-width" icon="attachment" label="Generate Link" type="submit"
            :loading="loading" />
        </div>
      </div>
    </q-form>
  </my-full-dialog>

  <confirmation-prompt persistent v-model="showConfirmationPrompt.data" header="Confirm" color="primary"
    icon="published_with_changes">
    <template #content>
      {{ showConfirmationPrompt?.message }}
    </template>
    <template #buttons>
      <q-btn v-close-popup flat color="primary" label="Cancel" />
      <q-btn class="primary-color text-white" flat color="primary" icon="check" @click="onApplyChanges" label="Proceed"
        :loading="loading" />
    </template>
  </confirmation-prompt>
  <q-inner-loading :showing="pageLoading" label="Applying Changes...." label-class="text-primary-color"
    label-style="font-size: 1.1em" />
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth-store';
import { useWelfareStore } from 'src/stores/welfare-store';
import BottomHeader from 'components/structure/BottomHeader.vue';
import ShortSearchBox from 'components/utils/ShortSearchBar.vue';
import ConfirmationPrompt from 'src/components/custom/ConfirmationPrompt.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { LocalStorage, useQuasar } from 'quasar';
import AAStatusConstants from 'src/constants/aa-status.constants';
import PaginationUtil from 'src/utils/pagination.utils';
import FetchDataRequest from 'src/models/FetchDataRequest.model';
import { MemberRecords } from 'src/models/member/AllMembers.model';
import { useRoute } from 'vue-router';
import { useUAMStore } from 'src/stores/uam-store';
import { UAMUserData, UAMUserRecord } from 'src/models/uam/Users.model';
import { DateTime } from 'luxon';
import MainBottomHeader from 'components/structure/MainBottomHeader.vue';
import MyFullDialog from 'src/components/utils/MyFullDialog.vue';
import ShapeConstants from 'src/constants/shape.constants';
import MyAvatar from 'src/components/utils/MyAvatar.vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import DateUtil from 'src/utils/date.utils';

// ------------------------------- GLOBAL DECLARATIONS --------------------------------- //
const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const welfareStore = useWelfareStore();
const uamStore = useUAMStore();
const paginationUtil = ref(new PaginationUtil());
const store = useAuthStore();
const searchKey = ref('');
const filter = ref(null);
const showUserToRoleDialog = ref(false);
const isChecked = ref(false);
const selected = ref([]);

const pageLoading = ref(false);
const showGenerateLinkDialog = ref(false);
const confirmCreateUserDialog = ref(false);
const confirmUpdateUserDialog = ref(false);
const confirmResetUserDialog = ref(false);
const confirmBlockUserDialog = ref(false);
const confirmUnblockUserDialog = ref(false);
const loading = ref(false);
const currentURL = ref(window.location.href.split('#')[0] + '#/');
// const qr_code_value = ref('Joshua Buadu');

const actionType = ref('');

const isUpdate = ref(false);

const memberId = ref('');
const route = useRoute();

const username = <any>ref(null);
const institutionId = <any>ref(null);
const userId = <any>ref(null);
const user_id = <any>ref(null);

if (LocalStorage.has('email')) {
  username.value = LocalStorage.getItem('email');
}
if (LocalStorage.has('institutionId')) {
  institutionId.value = LocalStorage.getItem('institutionId');
}

if (LocalStorage.has('userId')) {
  user_id.value = LocalStorage.getItem('userId');
}

const now = ref(DateTime.local());

const currentDateTime_ = computed(() => {
  return now.value.toFormat('ccc LLL dd, hh:mm:ss a');
});

// ------------------------------- REQUEST PAYLOAD --------------------------------- //

const generateLinkPayload = ref({
  institutionId: institutionId.value,
  startDate: '',
  endDate: '',
  createdBy: username.value,
  userId: user_id.value,
});
const userPayload = ref({
  firstName: '',
  lastName: '',
  emailAddress: '',
  contact: '',
  createdBy: username.value,
  institutionId: institutionId.value,
  ...(isUpdate.value ? { userId: '' } : {}),
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
});

const onshowAddUserToRoleDialog = () => {
  isUpdate.value = false;
  showUserToRoleDialog.value = true;
};

const onApplyChanges = () => {
  showConfirmationPrompt.value.data = false;
  pageLoading.value = true; // Set to true
  // Set to false after 3 seconds
  setTimeout(() => {
    pageLoading.value = false;
  }, 3000); // 3000 milliseconds = 3 seconds
};


const selectedRole = computed(() => {
  const roleId = route.params['roleId'];
  const filteredRole = uamStore.listOfRoles.records.filter(
    (user) => user?.id == roleId
  );
  return filteredRole.length > 0 ? filteredRole[0] : null;
});

const showConfirmationPrompt = ref({
  data: false,
  message: '',
});

const onShowConfirmationPrompt = (prompt: any) => {
  showConfirmationPrompt.value.data = true;
  showConfirmationPrompt.value.message = prompt;
};

const onDetermineConfirmationPrompt_ = async () => {
  actionType.value = 'apply-changes';
  const message = 'Do you want to apply changes?';
  onShowConfirmationPrompt(message);
};

const onDetermineConfirmationPrompt = async (user: any) => {
  if (isUpdate.value == false) {
    actionType.value = 'add';
    const message = 'Are you sure you want to onboard this user?';
    onShowConfirmationPrompt(message);
  }
  if (isUpdate.value == true) {
    actionType.value = 'update';
    const message = 'Are you sure you want to update this user?';
    onShowConfirmationPrompt(message);
  }
  if (user != null && user?.statusLabel?.toLowerCase() == 'active') {
    // peform disable
    actionType.value = 'disable';
    userId.value = user?.userId;
    const message = 'Are you sure you want to deactivate this user?';
    onShowConfirmationPrompt(message);
  }
  if (user != null && user?.statusLabel?.toLowerCase() == 'deactivated') {
    // peform enable
    actionType.value = 'enable';
    userId.value = user?.userId;
    const message = 'Are you sure you want to activate this user?';
    onShowConfirmationPrompt(message);
  }
};

// ------------------------------- MEMBER METHODS --------------------------------- //

const selectedUserId = computed(() => {
  return selected.value.map((row: any) => row.userId);
});

const userList = computed(() => {
  const search = searchKey.value.toLowerCase();
  return uamStore.listOfUsers.records.filter((user) => {
    return (
      (user.firstName && user.firstName.toLowerCase().includes(search)) ||
      (user.lastName && user.lastName.toLowerCase().includes(search)) ||
      (user.email && user.email.toLowerCase().includes(search)) ||
      (user.phoneNumber && user.phoneNumber.toLowerCase().includes(search)) ||
      (user.username && user.username.toLowerCase().includes(search)) ||
      (user.statusLabel && user.statusLabel.toLowerCase().includes(search))
    );
  });
});

const institutionInvitation = computed(() => {
  return uamStore.institutionInvitationCode;
});

const onProcessUser = async () => {
  loading.value = true;
  let result;
  switch (actionType.value) {
    case 'add':
      result = await uamStore.createUser(userPayload.value);
      break;
    case 'update':
      result = await uamStore.updateUser(userPayload.value);
      break;
    case 'disable':
      result = await uamStore.blockUser({
        userId: userId.value,
        status: '6',
      });
      break;
    case 'enable':
      result = await uamStore.unblockUser({
        userId: userId.value,
        status: '1',
      });
      break;
    case 'generate':
      generateLinkPayload.value.startDate = DateUtil.convertToIso8601Format(
        generateLinkPayload.value.startDate
      );
      generateLinkPayload.value.endDate = DateUtil.convertToIso8601Format(
        generateLinkPayload.value.endDate
      );
      result = await uamStore.generateInvitationCode(generateLinkPayload.value);
      break;
    default:
      console.error('Unknown action type:', actionType.value);
      loading.value = false;
      return;
  }
  loading.value = false;
  if (result.status === AAStatusConstants.SUCCESS) {
    showUserToRoleDialog.value = false;
    showGenerateLinkDialog.value = false;
    showConfirmationPrompt.value.data = false;
    onReset();
    loadRecords();
    Qnotify('green-8', 'white', 'cloud_done', result.message);
  } else {
    Qnotify('red-8', 'white', 'close', result.message);
  }
};

const Qnotify = async (
  color: string,
  textColor: string,
  icon: string,
  message: string
) => {
  $q.notify({
    color: color,
    textColor: textColor,
    icon: icon,
    position: 'top-right',
    message: message,
  });
};

const goToAssignedApps = (user: any) => {
  router.push(`/uam/assigned_apps/${user.id}`);
};

const loadRecords = async () => {
  getAllUsers(), getInvitationCode(), getAllRoles()
};

const getAllRoles = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => uamStore.getAllRoles(filterEntity.value),
    fetchData,
    () => uamStore.listOfInstitutions
  );
};

const getAllUsers = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => uamStore.getAllUsers(filterEntity.value),
    fetchData,
    () => uamStore.listOfUsers
  );
};

const getInvitationCode = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () =>
      uamStore.getInvitationCode({
        institutionId: institutionId.value,
      }),
    fetchData
  );
};

const onReset = () => {
  (userPayload.value = {
    firstName: '',
    lastName: '',
    contact: '',
    emailAddress: '',
    createdBy: '',
    institutionId: '',
    userId: '',
  }),
    (generateLinkPayload.value = {
      institutionId: institutionId.value,
      startDate: '',
      endDate: '',
      createdBy: username.value,
      userId: user_id.value,
    });
};

// ------------------------------- HELPER METHODS --------------------------------- //

const onshowCreateUserDialog = (isOpen: boolean) => {
  onReset();
  isUpdate.value = false;
  showUserToRoleDialog.value = isOpen;
};

const onshowGenerateLinkDialog = () => {
  onReset();
  showGenerateLinkDialog.value = true;
};

const onshowUpdateUserDialog = (user: any) => {
  isUpdate.value = true;
  onReset();
  userPayload.value = {
    firstName: user.firstName,
    lastName: user.lastName,
    contact: user.phoneNumber,
    emailAddress: user.email,
    createdBy: username.value,
    institutionId: institutionId.value,
    userId: user?.userId,
  };
  userId.value = user.userId;
  showUserToRoleDialog.value = true;
};

const onshowResetPasswordDialog = (user: any) => {
  userPayload.value = {
    firstName: user.first_name,
    lastName: user.last_name,
    contact: user.phone_number,
    emailAddress: user.email,
    createdBy: username.value,
    institutionId: '',
  };
  user_id.value = user.id;
  confirmResetUserDialog.value = true;
};

const onshowBlockUserDialog = (user: any) => {
  userPayload.value = {
    firstName: user.first_name,
    lastName: user.last_name,
    contact: user.phone_number,
    emailAddress: user.email,
    createdBy: username.value,
    institutionId: '',
  };
  user_id.value = user.id;
  confirmBlockUserDialog.value = true;
};

const onshowUnblockUserDialog = (user: any) => {
  userPayload.value = {
    firstName: user.first_name,
    lastName: user.last_name,
    contact: user.phone_number,
    emailAddress: user.email,
    createdBy: username.value,
    institutionId: '',
  };
  user_id.value = user.id;
  confirmUnblockUserDialog.value = true;
};



// ------------------------------- TABLE COLUMNS AND ROWS --------------------------------- //


const userColumns: any = ([
  {
    name: 'FullName',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: (row: any) => {
      return row.fullName;
    },
  },
  { name: 'UserStatus', align: 'center', label: 'User Status', field: 'statusLabel' },
  { name: 'MobileNumber', align: 'center', label: 'Mobile Number', field: 'phoneNumber' },
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
  selectedRole;
  loadRecords();
});
</script>

<style scoped></style>
