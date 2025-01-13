<template>
  <main class="main-content">
    <BottomHeader>
      <template #actions>
        <q-btn icon="person_add_alt" label="New User" size="16px" color="white" text-color="primary" class="text-bold"
          no-caps push @click="onshowCreateMemberDialog" v-if="role === 'Admin'" />
      </template>
    </BottomHeader>
    <div style="margin-top: -4rem;" class="q-pa-lg">
      <div class="row q-col-gutter-x-lg">
        <div class="col-md-3 ">
          <q-card class="card-shadow">
            <q-card-section>
              <q-item class="q-mt-md">
                <q-item-section avatar>
                  <my-avatar color="blue-8" text-color="white" :shape="ShapeConstants.ROUNDED" label="Member" size="4rem"
                    font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-bold text-h6">Account Details</q-item-label>
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
                      First Name
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ firstName }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_badge" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Last name
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ lastName }}
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
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">{{ emailAddress }}
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
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">{{ phoneNumber }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_badge" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Role
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">{{ role }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-9 ">
          <my-search-box v-model="searchKey" :on-refresh="loadRecords" />
          <q-table style="margin-top: 2rem;" title="Users List" flat :filter="searchKey" :loading="paginationUtil.loading"
            v-model:pagination="paginationUtil.pagination" :rows="userList" :columns="columns" row-key="memberId" padding>
            <template v-slot:body-cell-ActiveStatus="props">
              <q-td key="ActiveStatus" :props="props">
                <q-badge v-if="props.row.activeStatus === true" class="q-pl-md q-pr-md" label="Enabled" fill
                  color="green-8" style="height: 1.5rem;" />

                <q-badge v-if="props.row.activeStatus === false" class="q-pl-md q-pr-md" label="Disabled" fill
                  color="red-8" style="height: 1.5rem;" />
              </q-td>
            </template>

            <template v-slot:body-cell-DeleteStatus="props">
              <q-td key="DeleteStatus" :props="props">
                <q-badge v-if="props.row.deletedStatus === false" class="q-pl-md q-pr-md" label="NO" fill color="green-8"
                  style="height: 1.5rem;" />
                <q-badge v-if="props.row.deletedStatus === true" class="q-pl-md q-pr-md" label="YES" fill color="red-8"
                  style="height: 1.5rem;" />
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <div class="row wrap justify-between"></div>
                <q-btn-dropdown color="grey-8" dense>
                  <q-list>
                    <q-item clickable @click="onshowUpdateMemberDialog(props.row as UsersRecord)" v-if="role == 'Admin'">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Update User</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable @click="gotoMemberHistory(props.row as UsersRecord)"
                      v-if="role == 'Admin' && props.row.activeStatus == false && props.row.email != emailAddress">
                      <q-item-section side>
                        <q-icon name="o_toggle_on" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Enable User</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="gotoMemberHistory(props.row as UsersRecord)"
                      v-if="role == 'Admin' && props.row.activeStatus == true && props.row.email != emailAddress">
                      <q-item-section side>
                        <q-icon name="o_toggle_off" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Disable User</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="gotoMemberHistory(props.row as UsersRecord)"
                      v-if="role == 'Admin' && props.row.deletedStatus == true && props.row.email != emailAddress">
                      <q-item-section side>
                        <q-icon name="o_block" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Block User</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="gotoMemberHistory(props.row as UsersRecord)"
                      v-if="role == 'Admin' && props.row.deletedStatus == false && props.row.email != emailAddress">
                      <q-item-section side>
                        <q-icon name="o_accessibility" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Unblock User</q-item-label>
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
  <q-dialog v-model="showUserDialog" rounded style="width: 100% !important;">
    <q-card style="width: 900px; max-width: 100vw;">
      <q-toolbar>
        <q-avatar>
          <q-icon name="person_add_alt" color="blue-9" size="30px" v-if="isUpdate == false" />
          <q-icon name="edit" color="blue-9" size="30px" v-if="isUpdate == true" />
        </q-avatar>
        <q-toolbar-title color="blue-9" v-if="isUpdate == false"><span class="text-weight-bold">Register
            User</span></q-toolbar-title>
        <q-toolbar-title color="blue-9" v-if="isUpdate == true"><span class="text-weight-bold">Update
            User</span></q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section>
        <div class="">
          <q-stepper v-model="step" vertical color="primary" animated flat>
            <q-step :name="1" title="Personal Information" icon="settings" :done="step > 1">
              <q-form @submit="onRegisterUser" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">
                  <div class="col-md-6">
                    <q-input v-model="userPayload.firstName" label="First Name *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the member\'s first name']" />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="userPayload.lastName" label="Last Name *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the member\'s last name']" />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="userPayload.email" label="Email Address *" type="email" lazy-rules :rules="[
                      (val) => (val && val.length > 0) || 'Enter the email address of the user',
                      (val) => (val && /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val)) || 'Must be a valid email address'
                    ]" />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="userPayload.phoneNumber" type="number" hint="+233 (XXX) XXX - XXX" autogrow
                      label="Mobile Number" :rules="[
                        (val) => (val && Number(val) && val > 0) || 'Enter the mobile number of the user',
                        (val) => val.length == 10 || 'Must be 10 characters'
                      ]">
                      <q-tooltip anchor="center middle" self="bottom left">Mobile Number
                      </q-tooltip>
                    </q-input>
                  </div>
                </div>
                <q-stepper-navigation>
                  <q-btn color="primary" label="Register User" type="submit" :loading="loading"
                    v-if="isUpdate == false" />
                  <q-btn color="primary" label="Update User" type="submit" v-if="isUpdate == true" />
                  <q-btn color="dark" label="Clear All" @click="onReset()" class="q-ml-md" />
                </q-stepper-navigation>
              </q-form>
            </q-step>
          </q-stepper>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showContributionDialog" rounded style="width: 100% !important;">
    <q-card style="width: 900px; max-width: 100vw;">
      <q-toolbar>
        <q-avatar>
          <q-icon name="fa-solid fa-hand-holding-dollar" color="blue-9" size="30px" v-if="isUpdate == false" />
          <q-icon name="edit" color="blue-9" size="30px" v-if="isUpdate == true" />
        </q-avatar>
        <q-toolbar-title color="blue-9" v-if="isUpdate == false"><span class="text-weight-bold">Add
            Contribution</span></q-toolbar-title>
        <q-toolbar-title color="blue-9" v-if="isUpdate == true"><span class="text-weight-bold">Update
            Contribution</span></q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section>
        <q-card class="card-shadow q-ml-xl q-mr-xl">
          <q-card-section style="margin-top: 0.4rem;">
            <q-item>
              <div class="row flex-center">
                <q-item-section class="col-12">
                  <q-item-label class="text-weight-bold" style="font-size: 1.5rem">
                    {{ selectedMemberPayload.firstName }} {{ selectedMemberPayload.middleName }} {{
                      selectedMemberPayload.lastName }}
                  </q-item-label>
                  <q-item-label caption lines="1" class="text-bold" style="font-size: 1rem">
                    {{ selectedMemberPayload.emailAddress }}, {{ selectedMemberPayload.phoneNumber }}
                  </q-item-label>
                </q-item-section>
              </div>
            </q-item>
          </q-card-section>
        </q-card>
        <div class="">
          <q-stepper v-model="step" vertical color="primary" animated flat>
            <q-step :name="1" title="Add a new contribution for the member above" :done="step > 1">
              <q-form @submit="onProcessNewContribution" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">
                  <div class="col-md-6">
                    <q-input v-model="contributionPayload.amount" label="Amount *" type="number" lazy-rules :rules="[
                      (val: number) => (val && Number(val) && val > 0) || 'Enter the contribution amount',]" />
                  </div>
                  <div class="col-md-6">
                    <q-select v-model="contributionPayload.contributionStatus" :options="contributionStatusOptions"
                      label="Contribution Status" lazy-rules transition-show="scale" transition-hide="scale"
                      behavior="default"
                      :rules="[(val: string | any[]) => (val && val.length > 0) || 'Select Contribution Status']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the contribution status
                      </q-tooltip>
                    </q-select>
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="contributionPayload.remarks" label="Remarks " lazy-rules />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="contributionPayload.description" label="Description " />
                  </div>
                </div>
                <q-stepper-navigation>
                  <q-btn color="primary" label="Add Contribution" type="submit" :loading="loading"
                    v-if="isUpdate == false" class="q-mr-md" />
                  <q-btn color="primary" label="Update Contribution" :loading="loading" type="submit"
                    v-if="isUpdate == true" class="q-mr-md" />
                  <q-btn color="dark" label="Clear All" @click="onReset()" />
                </q-stepper-navigation>
              </q-form>
            </q-step>
          </q-stepper>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showDonationDialog" rounded style="width: 100% !important;">
    <q-card style="width: 900px; max-width: 100vw;">
      <q-toolbar>
        <q-avatar>
          <q-icon name="fa-solid fa-gift" color="blue-9" size="30px" v-if="isUpdate == false" />
          <q-icon name="edit" color="blue-9" size="30px" v-if="isUpdate == true" />
        </q-avatar>
        <q-toolbar-title color="blue-9" v-if="isUpdate == false"><span class="text-weight-bold">Add
            Donation</span></q-toolbar-title>
        <!-- <q-toolbar-title color="blue-9" v-if="isUpdate == true"><span class="text-weight-bold">Update
            Donation</span></q-toolbar-title> -->
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section>
        <q-card class="card-shadow q-ml-xl q-mr-xl">
          <q-card-section style="margin-top: 0.4rem;">
            <q-item>
              <div class="row flex-center">
                <q-item-section class="col-12">
                  <q-item-label class="text-weight-bold" style="font-size: 1.5rem">
                    {{ selectedMemberPayload.firstName }} {{ selectedMemberPayload.middleName }} {{
                      selectedMemberPayload.lastName }}
                  </q-item-label>
                  <q-item-label caption lines="1" class="text-bold" style="font-size: 1rem">
                    {{ selectedMemberPayload.emailAddress }}, {{ selectedMemberPayload.phoneNumber }}
                  </q-item-label>
                </q-item-section>
              </div>
            </q-item>
          </q-card-section>
        </q-card>
        <div class="">
          <q-stepper v-model="step" vertical color="primary" animated flat>
            <q-step :name="1" title="Add a new donation for the member above" :done="step > 1">
              <q-form @submit="onProcessNewDonation" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">
                  <div class="col-md-6">
                    <q-input v-model="donationPayload.amount" label="Amount *" type="number" lazy-rules :rules="[
                      (val: number) => (val && Number(val) && val > 0) || 'Enter the donation amount',]" />
                  </div>
                  <div class="col-md-6">
                    <q-select v-model="donationPayload.donationStatus" :options="donationStatusOptions"
                      label="Donation Status" lazy-rules transition-show="scale" transition-hide="scale"
                      behavior="default"
                      :rules="[(val: string | any[]) => (val && val.length > 0) || 'Select Donation Status']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the donation status
                      </q-tooltip>
                    </q-select>
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="donationPayload.remarks" label="Remarks " lazy-rules />
                  </div>

                  <div class="col-md-6">
                    <q-input v-model="donationPayload.description" label="Description " />
                  </div>
                </div>
                <q-stepper-navigation>
                  <q-btn color="primary" label="Add Donation" type="submit" :loading="loading" v-if="isUpdate == false"
                    class="q-mr-md" />
                  <q-btn color="dark" label="Clear All" @click="onReset()" />
                </q-stepper-navigation>
              </q-form>
            </q-step>
          </q-stepper>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirmMemberDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Do you really want to mark this member as deleted?</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Mark as Delete" color="primary" @click="onProcessSoftDeleteMember()" />
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
import { ref, onMounted, watch, computed } from 'vue';
import { LocalStorage, date, useQuasar } from 'quasar';
import AAStatusConstants from 'src/constants/aa-status.constants';
import PaginationUtil from 'src/utils/pagination.utils';
import FetchDataRequest from 'src/models/FetchDataRequest.model';
import { MemberRecords } from 'src/models/member/AllMembers.model';
import { useRoute } from 'vue-router';
import ShapeConstants from 'src/constants/shape.constants';
import MyAvatar from 'src/components/utils/MyAvatar.vue';
import { UserErrorResponse } from 'src/models/auth/UserErrorResponse.model';
import { UsersRecord } from 'src/models/auth/AllUsers.model';
import { useUserStore } from 'src/stores/user-store';


// ------------------------------- GLOBAL DECLARATIONS --------------------------------- //
const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const welfareStore = useWelfareStore();
const userStore = useUserStore();

const paginationUtil = ref(new PaginationUtil());
const leftDrawerOpen = ref(false);
const store = useAuthStore();
const searchKey = ref('');
const showUserDialog = ref(false);
const confirmMemberDialog = ref(false);
const loading = ref(false);
const step = ref(1);
const maritalStatusOptions = ref(['single', 'married', 'divorced', 'separated', 'widowed', 'remarried']);
const membershipTypeOptions = ref(['member', 'associate member', 'guest', 'member', 'government', 'oraganization', 'prospecitve member', 'life member', 'former member', 'baptized member']);
const membershipStatusOptions = ref(['active', 'inactive', 'resigned']);
const donationStatusOptions = ref(['completed', 'pending']);
const contributionStatusOptions = ref(['completed', 'pending']);
const showContributionDialog = ref(false);
const showDonationDialog = ref(false);
const isUpdate = ref(false);
const filter = ref(null);
const memberId = ref('');
const route = useRoute();
const formattedMemberDate = ref('');
const tab = ref('contributions');

const fullName = <any>ref(LocalStorage.getItem('fullName'));
const lastName = <any>ref(LocalStorage.getItem('lastName'));
const firstName = <any>ref(LocalStorage.getItem('firstName'));
const username = <any>ref(LocalStorage.getItem('username'));
const emailAddress = <any>ref(LocalStorage.getItem('email'));
const phoneNumber = <any>ref(LocalStorage.getItem('phoneNumber'));
const role = <any>ref(LocalStorage.getItem('role'));

// ------------------------------- REQUEST PAYLOAD --------------------------------- //

const contributionPayload = ref(
  {
    memberId: '',
    amount: parseFloat('1.00'),
    description: '',
    contributionStatus: '',
    createdBy: '',
    remarks: ''
  });

const donationPayload = ref({
  amount: parseFloat('1.00'),
  description: '',
  donationStatus: '',
  createdBy: '',
  memberId: '',
  remarks: ''
});

const memberPayload = ref(
  {
    firstName: 'Joshua',
    middleName: 'Kwaku',
    lastName: 'Nkrumah',
    photograph: '',
    age: '23',
    dateOfBirth: '2023-09-06',
    gender: 'male',
    emailAddress: 'joshua@gmail.com',
    phoneNumber: '0548068712',
    emergencyContact: '0548068712',
    dateJoined: '2023-09-06',
    maritalStatus: 'single',
    membershipStatus: 'active',
    children: '1',
    occupation: 'Software Engineer',
    membershipType: 'member',
    additionalInformation: '2023-09-06',
    createdBy: username.value,
    location: 'Santa Maria',
  });

const userPayload = ref(
  {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
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

const memberList = computed(() => {
  return welfareStore.listOfMembers?.records.filter((record: any) => (record.isDeleted != 'deleted'));
});

const userList = computed(() => {
  return userStore.listOfUsers?.records;
});



const contributionList = computed(() => {
  return welfareStore?.listOfContributions?.records.filter((record: any) => (record?.members?.memberId == route.params['memberId']));
});

const donationList = computed(() => {
  return welfareStore?.listOfDonations?.records.filter((record: any) => (record?.members?.memberId == route.params['memberId']));
});


const onRegisterUser = async () => {
  if (isUpdate.value == false) {
    onRegisterUserWithoutPassword();
  }
  else {
    onProcessUpdateMember();
  }
};

const onProcessNewContribution = async () => {
  loading.value = true;
  contributionPayload.value.memberId = memberId.value;
  const result = await welfareStore.createContribution(contributionPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showContributionDialog.value = false;
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

const onProcessNewDonation = async () => {
  loading.value = true;
  donationPayload.value.memberId = memberId.value;
  const result = await welfareStore.createDonation(donationPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showDonationDialog.value = false;
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

const onRegisterUserWithoutPassword = async () => {
  loading.value = true;
  const result = await userStore.registerUserWithoutPassword(userPayload.value);
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
  }
  if (result.status == AAStatusConstants.FAILED) {
    const userErrors = userStore.UserErrorResponse;
    const errors = userErrors.errors;
    if (errors && errors.length > 0) {
      for (const error of errors) {
        $q.notify({
          color: 'red-8',
          textColor: 'white',
          icon: 'close',
          position: 'top-right',
          message: error.description,
        });
      }
    }
  }
  else {
    $q.notify({
      color: 'red-8',
      textColor: 'white',
      icon: 'close',
      position: 'top-right',
      message: `${result.message}`,
    });
  }
};

const onProcessUpdateMember = async () => {
  loading.value = true;
  const result = await welfareStore.editMember(memberPayload.value);
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

const onProcessSoftDeleteMember = async () => {
  loading.value = true;

  const result = await welfareStore.softDeleteMember({
    memberID: memberId.value
  });
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    confirmMemberDialog.value = false;
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

const memberInfo = <any>computed(() => {
  const result = <any>welfareStore.listOfMembers?.records.filter((record: any) => (record.memberId === route.params['memberId']))[0];
  formatCustomDate(result?.createdAt.toString());
  return result;
});


const loadRecords = async () => {
  getAllUsers()
}

const getAllContributions = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, MemberRecords>(
    welfareStore.getAllContributions,
    fetchData,
  );
}

const getAllDonations = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, MemberRecords>(
    welfareStore.getAllDonations,
    fetchData,
  );
}

const getAllMembers = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, MemberRecords>(
    welfareStore.getAllMembers,
    fetchData,
  );
}

const getAllUsers = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, UsersRecord>(
    userStore.getAllUsers,
    fetchData,
  );
}

const onReset = () => {
  memberPayload.value = {
    firstName: '',
    middleName: '',
    lastName: '',
    photograph: '',
    age: '',
    dateOfBirth: '',
    gender: '',
    emailAddress: '',
    phoneNumber: '',
    emergencyContact: '',
    dateJoined: '',
    maritalStatus: '',
    membershipStatus: '',
    children: '',
    occupation: '',
    membershipType: '',
    additionalInformation: '',
    createdBy: username.value,
    location: ''
  },
  {
    memberId: '',
    amount: parseFloat(''),
    description: '',
    contributionStatus: '',
    createdBy: '',
    remarks: ''
  },
    userPayload.value = {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: ''
    }

}

// ------------------------------- HELPER METHODS --------------------------------- //

const onshowCreateMemberDialog = () => {
  isUpdate.value = false;
  showUserDialog.value = true;
};


const onshowUpdateMemberDialog = (member: any) => {
  isUpdate.value = true;
  showUserDialog.value = true;
};

const onshowCreateContributionDialog = (member: any) => {
  isUpdate.value = false;
  showContributionDialog.value = true;
  selectedMemberPayload.value = {
    firstName: member.firstName,
    emailAddress: member.emailAddress,
    lastName: member.lastName,
    middleName: member.middleName,
    phoneNumber: member.phoneNumber
  };
  memberId.value = member.memberId;
};

const onshowCreateDonationDialog = (member: any) => {
  isUpdate.value = false;
  showDonationDialog.value = true;
  selectedMemberPayload.value = {
    firstName: member.firstName,
    emailAddress: member.emailAddress,
    lastName: member.lastName,
    middleName: member.middleName,
    phoneNumber: member.phoneNumber
  };
  memberId.value = member.memberId;
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
  formattedMemberDate.value = formattedDate;
  return formattedDate;
}

const onshowConfirmationDialog = (member: any) => {
  confirmMemberDialog.value = true;
  memberId.value = member.memberId;
};


// ------------------------------- TABLE COLUMNS AND ROWS --------------------------------- //

const columns: any = ([
  { name: 'actions', align: 'center', label: 'Action' },
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: (row: any) => {
      return row?.firstName + ' ' + row?.lastName ?? 0;
    },
  },
  {
    name: 'EmailAddress', align: 'left', label: 'Email Address', field: 'email', required: true,
  },
  { name: 'MobileNumber', align: 'center', label: 'Mobile Number', field: 'phoneNumber' },
  { name: 'Role', align: 'center', label: 'Role', field: 'role' },
  { name: 'ActiveStatus', align: 'center', label: 'Active Status', field: 'activeStatus' },
  { name: 'DeleteStatus', align: 'center', label: 'Is Blocked', field: 'deletedStatus' },
]);



// ------------------------------- ON MOUNTED --------------------------------- //

onMounted(() => {
  loadRecords()
});

</script>

<style scoped></style>

