<template>
  <main class="main-content">
    <BottomHeader>
      <template #actions>
        <!-- <q-btn icon="person_add_alt" label="New Student" size="16px" color="white" text-color="primary"
          class="text-bold" no-caps push @click="" /> -->
      </template>
      <template #title>
        <div class="row q-col-gutter-x-md">
          <div class="row items-center">
            <q-icon name="o_groups" size="2.3rem" class="q-mr-md text-brand-yellow-deep" />
            <q-item-label class="text-h5 text-weight-bold">Student Dashboard</q-item-label>
          </div>
        </div>
      </template>
      <template #sub-title>
        <div class=" text_weight_light">View dashboard, charts and many others</div>
      </template>
    </BottomHeader>
    <div style="margin-top: -4rem;" class="q-pa-lg">
      <div class="row">
        <div class="col-12 ">
          <my-search-box v-model="searchKey" :on-refresh="loadRecords" />

          <!-- <q-table style="margin-top: 2rem;" title="Users" flat :filter="searchKey" :loading="paginationUtil.loading"
            v-model:pagination="paginationUtil.pagination" :rows="userList" :columns="columns" row-key="memberId" padding>
            <template v-slot:body-cell-UserStatus="props">
              <q-td key="UserStatus" :props="props">
                <q-badge v-if="props.row.status === 'active'" class="q-pl-md q-pr-md" label="Active" fill color="green-8"
                  style="height: 1.5rem;" />
                <q-badge v-if="props.row.status === 'inactive'" class="q-pl-md q-pr-md" label="Inactive" fill
                  color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>


            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <div class="row wrap justify-between"></div>
                <q-btn-dropdown color="grey-8" dense>
                  <q-list>
                    <q-item clickable @click="onshowUpdateUserDialog(props.row as UAMUserData)">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Update User</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowBlockUserDialog(props.row as UAMUserData)"
                      v-if="props.row.status === 'active'">
                      <q-item-section side>
                        <q-icon name="block" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Block User</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowUnblockUserDialog(props.row as UAMUserData)"
                      v-if="props.row.status != 'active'">
                      <q-item-section side>
                        <q-icon name="toggle_on" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Unblock User</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowResetPasswordDialog(props.row as MemberRecords)">
                      <q-item-section side>
                        <q-icon name="restart_alt" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Reset Password</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable @click="goToAssignedApps(props.row as UAMUserData)">
                      <q-item-section side>
                        <q-icon name="view_comfy_alt" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>View Assigned Apps</q-item-label>
                      </q-item-section>
                    </q-item>

                  </q-list>
                </q-btn-dropdown>
              </q-td>
            </template>
          </q-table> -->
        </div>

      </div>
    </div>

  </main>
  <q-dialog v-model="showUserDialog" rounded style="width: 100% !important;" persistent>
    <q-card style="width: 900px; max-width: 100vw;">
      <q-toolbar>
        <q-avatar>
          <q-icon name="person_add_alt" color="blue-9" size="30px" v-if="isUpdate == false" />
          <q-icon name="edit" color="blue-9" size="30px" v-if="isUpdate == true" />
        </q-avatar>
        <q-toolbar-title color="blue-9" v-if="isUpdate == false"><span class="text-weight-bold">Add
            User</span></q-toolbar-title>
        <q-toolbar-title color="blue-9" v-if="isUpdate == true"><span class="text-weight-bold">Update
            User</span></q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section>
        <div class="">
          <q-stepper v-model="step" vertical color="primary" animated flat>
            <q-step :name="1" title="User Information" icon="settings" :done="step > 1">
              <q-form @submit="onProcessUser" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">
                  <div class="col-md-6">
                    <q-input v-model="userPayload.first_name" label="First Name *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the user\'s first name']" />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="userPayload.last_name" label="Last Name *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the user\'s last name']" />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="userPayload.email" label="Email Address " type="email" lazy-rules :rules="[
            (val) => (val && /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val)) || 'Must be a valid email address'
          ]" />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="userPayload.phone_number" type="number" hint="+233 (XXX) XXX - XXX" autogrow
                      label="Mobile Number *" :rules="[
            (val) => (val && Number(val) && val > 0) || 'Enter the mobile number of the user',
            (val) => val.length == 10 || 'Must be 10 digits'
          ]">
                      <q-tooltip anchor="center middle" self="bottom left">Mobile Number
                      </q-tooltip>
                    </q-input>
                  </div>
                </div>
                <q-stepper-navigation>
                  <q-btn color="primary" label="Onboard User" type="submit" :loading="loading"
                    v-if="isUpdate == false" />
                  <q-btn color="primary" label="Update User" type="submit" v-if="isUpdate == true" :loading="loading" />
                  <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
              </q-form>
            </q-step>
          </q-stepper>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirmCreateUserDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to create this user?</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Confirm" color="primary" @click="onProcessNewUser()" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirmUpdateUserDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to update this user?</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Confirm" color="primary" @click="onProcessUpdateUser()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirmResetUserDialog" persistent>
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
  </q-dialog>
  <q-dialog v-model="confirmBlockUserDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="recommend" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to block this user</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessBlockUser()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirmUnblockUserDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="recommend" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to unblock this user</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessUnblockUser()" :loading="loading" />
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
import { MemberRecords } from 'src/models/member/AllMembers.model';
import { useRoute } from 'vue-router';
import { useUAMStore } from 'src/stores/uam-store';
import { UAMUserData } from 'src/models/uam/Users.model';


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
const showUserDialog = ref(false);
const confirmCreateUserDialog = ref(false);
const confirmUpdateUserDialog = ref(false);
const confirmResetUserDialog = ref(false);
const confirmBlockUserDialog = ref(false);
const confirmUnblockUserDialog = ref(false);
const loading = ref(false);
const step = ref(1);

const showContributionDialog = ref(false);
const showDonationDialog = ref(false);
const isUpdate = ref(false);

const memberId = ref('');
const route = useRoute();

const username = <any>ref(null);
const user_id = <any>ref(null);

if (LocalStorage.has('email')) {
  username.value = LocalStorage.getItem('email');
};



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

const userPayload = ref(
  {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    created_by: username.value,
  });

const updateUserPayload = ref(
  {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    user_id: '',
    created_by: username.value,
  });


const selectedMemberPayload = ref(
  {
    firstName: '',
    middleName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
  });

// ------------------------------- MEMBER METHODS --------------------------------- //

const userList = computed(() => {
  return uamStore.listOfUsers.records;
});

const onProcessUser = async () => {
  if (isUpdate.value == false) {
    confirmCreateUserDialog.value = true
    // onProcessNewUser();
  }
  else {
    confirmUpdateUserDialog.value = true
    // onProcessUpdateUser();
  }
};


const onProcessNewUser = async () => {
  loading.value = true;
  const result = await uamStore.createUser(userPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showUserDialog.value = false;
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

const onProcessUpdateUser = async () => {
  loading.value = true;
  updateUserPayload.value = {
    created_by: username.value,
    email: userPayload.value.email,
    phone_number: userPayload.value.phone_number,
    user_id: user_id.value,
    first_name: userPayload.value.first_name,
    last_name: userPayload.value.last_name,
  }
  const result = await uamStore.updateUser(updateUserPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showUserDialog.value = false;
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

const onProcessResetPassword = async () => {
  loading.value = true;
  const result = await uamStore.resetPassword({
    email: userPayload.value.email
  });
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    confirmResetUserDialog.value = false;
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

const onProcessBlockUser = async () => {
  loading.value = true;
  const result = await uamStore.blockUser({
    email: userPayload.value.email
  });
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    confirmBlockUserDialog.value = false;
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

const onProcessUnblockUser = async () => {
  loading.value = true;
  const result = await uamStore.unblockUser({
    email: userPayload.value.email
  });
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    confirmUnblockUserDialog.value = false;
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


const goToAssignedApps = (user: any) => {
  router.push(`/uam/assigned_apps/${user.id}`);
};


const loadRecords = async () => {
  getAllUsers()

}

const getAllUsers = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, MemberRecords>(
    uamStore.getAllUsers,
    fetchData,
  );
}

const onReset = () => {
  userPayload.value = {
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    created_by: ''
  },
    contributionPayload.value = {
      memberId: '',
      amount: '',
      description: '',
      contributionStatus: '',
      createdBy: '',
      remarks: ''
    },
    donationPayload.value = {
      amount: '',
      description: '',
      donationStatus: '',
      createdBy: '',
      memberId: '',
      remarks: ''
    }
}

// ------------------------------- HELPER METHODS --------------------------------- //

const onshowCreateUserDialog = () => {
  isUpdate.value = false;
  showUserDialog.value = true;
};


const onshowUpdateUserDialog = (user: any) => {
  isUpdate.value = true;
  userPayload.value = {
    first_name: user.first_name,
    last_name: user.last_name,
    phone_number: user.phone_number,
    email: user.email,
    created_by: username.value
  };
  user_id.value = user.id
  showUserDialog.value = true;
};

const onshowResetPasswordDialog = (user: any) => {
  userPayload.value = {
    first_name: user.first_name,
    last_name: user.last_name,
    phone_number: user.phone_number,
    email: user.email,
    created_by: username.value
  };
  user_id.value = user.id
  confirmResetUserDialog.value = true;
};

const onshowBlockUserDialog = (user: any) => {
  userPayload.value = {
    first_name: user.first_name,
    last_name: user.last_name,
    phone_number: user.phone_number,
    email: user.email,
    created_by: username.value
  };
  user_id.value = user.id
  confirmBlockUserDialog.value = true;
};

const onshowUnblockUserDialog = (user: any) => {
  userPayload.value = {
    first_name: user.first_name,
    last_name: user.last_name,
    phone_number: user.phone_number,
    email: user.email,
    created_by: username.value
  };
  user_id.value = user.id
  confirmUnblockUserDialog.value = true;
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
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: (row: any) => {
      return row?.first_name + ' ' + row?.last_name ?? 0;
    },
  },
  {
    name: 'EmailAddress', align: 'left', label: 'Email Address', field: 'email', required: true,
  },
  { name: 'UserStatus', align: 'center', label: 'User Status', field: 'status' },
  { name: 'MobileNumber', align: 'center', label: 'Mobile Number', field: 'phone_number' },
  { name: 'CreatedBy', align: 'center', label: 'Created By', field: 'created_by' },
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
