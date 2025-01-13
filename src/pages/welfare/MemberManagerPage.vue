<template>
  <main class="main-content">
    <BottomHeader>
      <template #actions>
        <q-btn icon="person_add_alt" label="New Member" size="16px" color="white" text-color="primary" class="text-bold"
          no-caps push @click="onshowCreateMemberDialog" />
      </template>
    </BottomHeader>
    <div style="margin-top: -4rem;" class="q-pa-lg">
      <div class="row">
        <div class="col-12 ">
          <my-search-box v-model="searchKey" :on-refresh="loadRecords" />
          <q-table style="margin-top: 2rem;" title="Membership" flat :filter="searchKey" :loading="paginationUtil.loading"
            v-model:pagination="paginationUtil.pagination" :rows="memberList" :columns="columns" row-key="memberId"
            padding>
            <template v-slot:body-cell-MembershipStatus="props">
              <q-td key="MembershipStatus" :props="props">
                <q-badge v-if="props.row.membershipStatus === 'active'" class="q-pl-md q-pr-md" label="Active" fill
                  color="green-8" style="height: 1.5rem;" />

                <q-badge v-if="props.row.membershipStatus === 'inactive'" class="q-pl-md q-pr-md" label="Inactive" fill
                  color="yellow-8" style="height: 1.5rem;" />

                <q-badge v-if="props.row.membershipStatus === 'resigned'" class="q-pl-md q-pr-md" label="Resigned" fill
                  color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>

            <template v-slot:body-cell-DeleteStatus="props">
              <q-td key="DeleteStatus" :props="props">
                <q-badge v-if="props.row.isDeleted === 'deleted'" class="q-pl-md q-pr-md" label="Deleted" fill
                  color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>

            <template v-slot:body-cell-Gender="props">
              <q-td key="Gender" :props="props">
                <div v-if="props.row.gender === 'male'" class="q-pl-md q-pr-md">Male</div>
                <div v-if="props.row.gender === 'female'" class="q-pl-md q-pr-md">Female</div>
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <div class="row wrap justify-between"></div>
                <q-btn-dropdown color="grey-8" dense>
                  <q-list>
                    <q-item clickable @click="onshowUpdateMemberDialog(props.row as MemberRecords)">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Update Member</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="gotoMemberHistory(props.row as MemberRecords)">
                      <q-item-section side>
                        <q-icon name="o_history" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Member History</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable @click="onshowCreateContributionDialog(props.row as MemberRecords)">
                      <q-item-section side>
                        <q-icon name="fa-solid fa-hand-holding-dollar" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Add Contribution</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowCreateDonationDialog(props.row as MemberRecords)">
                      <q-item-section side>
                        <q-icon name="fa-solid fa-gift" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Add Donation</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowConfirmationDialog(props.row as MemberRecords)">
                      <q-item-section side>
                        <q-icon name="o_delete" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Mark as Deleted</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-td>
            </template>
          </q-table>
        </div>
        <div class="q-pt-lg">
        </div>
      </div>
    </div>

  </main>
  <q-dialog v-model="showMemberDialog" rounded style="width: 100% !important;">
    <q-card style="width: 900px; max-width: 100vw;">
      <q-toolbar>
        <q-avatar>
          <q-icon name="person_add_alt" color="blue-9" size="30px" v-if="isUpdate == false" />
          <q-icon name="edit" color="blue-9" size="30px" v-if="isUpdate == true" />
        </q-avatar>
        <q-toolbar-title color="blue-9" v-if="isUpdate == false"><span class="text-weight-bold">Add
            Member</span></q-toolbar-title>
        <q-toolbar-title color="blue-9" v-if="isUpdate == true"><span class="text-weight-bold">Update
            Member</span></q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section>
        <div class="">
          <q-stepper v-model="step" vertical color="primary" animated flat>
            <q-step :name="1" title="Personal Information" icon="settings" :done="step > 1">
              <q-form @submit="step = 2" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.firstName" label="First Name *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the member\'s first name']" />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.middleName" label="Middle Name " lazy-rules />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.lastName" label="Last Name *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the member\'s last name']" />
                  </div>
                  <!-- <div class="col-md-6">
                    <q-input v-model="memberPayload.emailAddress" label="Email Address " type="email" lazy-rules :rules="[
                      (val) => (val && /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val)) || 'Must be a valid email address'
                    ]" /> -->
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.emailAddress" label="Email Address " type="email" lazy-rules />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.age" label="Age *" type="number" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the Age of the member']" />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.location" label="Location *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the location of the member']" />
                  </div>

                  <div class="col-md-6">
                    <q-input v-model="memberPayload.phoneNumber" type="number" hint="+233 (XXX) XXX - XXX" autogrow
                      label="Mobile Number *" :rules="[
                        (val) => (val && Number(val) && val > 0) || 'Enter the mobile number of the member',
                        (val) => val.length == 10 || 'Must be 10 characters'
                      ]">
                      <q-tooltip anchor="center middle" self="bottom left">Mobile Number
                      </q-tooltip>
                    </q-input>
                  </div>
                  <div class="col-md-6">
                    <!-- <q-input v-model="memberPayload.emergencyContact" type="number" hint="+233 (XXX) XXX - XXX" autogrow
                      label="Emergency Contact" :rules="[
                        (val) => (val && Number(val)) || 'Enter the emergency contact of the member',
                        (val) => val.length == 10 || 'Must be 10 characters'
                      ]">
                      <q-tooltip anchor="center middle" self="bottom left">Emergency Contact
                      </q-tooltip>
                    </q-input> -->
                    <q-input v-model="memberPayload.emergencyContact" type="number" hint="+233 (XXX) XXX - XXX" autogrow
                      label="Emergency Contact *" :rules="[
                        (val) => (val && Number(val)) || 'Enter the emergency contact of the member',
                        (val) => val.length == 10 || 'Must be 10 characters'
                      ]">
                      <q-tooltip anchor="center middle" self="bottom left">Emergency Contact
                      </q-tooltip>
                    </q-input>
                  </div>
                  <div class="col-md-6 q-mt-xl">
                    <q-radio dense v-model="memberPayload.gender" val="male" label="Male" class="q-mr-lg" />
                    <q-radio dense v-model="memberPayload.gender" val="female" label="Female" />
                  </div>
                </div>

                <q-stepper-navigation>
                  <q-btn type="submit" color="primary" label="Next Step" class="q-mr-md" />
                  <q-btn color="dark" label="Clear All" @click="onReset()" />
                </q-stepper-navigation>

              </q-form>
            </q-step>

            <q-step :name="2" title="Other Information" caption="Optional" icon="create_new_folder" :done="step > 2">
              <q-form @submit="onProcessMember" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">
                  <div class="col-md-6">
                    <q-select v-model="memberPayload.maritalStatus" :options="maritalStatusOptions" label="Marital Status"
                      lazy-rules transition-show="scale" transition-hide="scale" behavior="default"
                      :rules="[(val) => (val && val.length > 0) || 'Select Marital Status']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the marital status
                      </q-tooltip>
                    </q-select>
                  </div>
                  <div class="col-md-6">
                    <q-select v-model="memberPayload.membershipStatus" :options="membershipStatusOptions"
                      label="Membership Status" lazy-rules transition-show="scale" transition-hide="scale"
                      behavior="default" :rules="[(val) => (val && val.length > 0) || 'Select Membership Status']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the membership status
                      </q-tooltip>
                    </q-select>
                  </div>
                  <div class="col-md-6">
                    <q-select v-model="memberPayload.membershipType" :options="membershipTypeOptions"
                      label="Membership Type" lazy-rules transition-show="scale" transition-hide="scale"
                      behavior="default" :rules="[(val) => (val && val.length > 0) || 'Select Membership Type']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the membership type
                      </q-tooltip>
                    </q-select>
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.occupation" label="Occupation " lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the occupation of the member']" />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.additionalInformation" label="Additional Information " lazy-rules />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.dateOfBirth"
                      :rules="[(val) => (val && val.length > 0) || 'Choose Member\'s Date of Birth']"
                      label="Date of Birth">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="memberPayload.dateOfBirth" mask="YYYY-MM-DD">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.dateJoined"
                      :rules="[(val) => (val && val.length > 0) || 'Choose Member\'s Date Joined']"
                      label="Date of Joined">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="memberPayload.dateJoined" mask="YYYY-MM-DD">
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
                  <q-btn color="primary" label="Onboard Member" type="submit" :loading="loading"
                    v-if="isUpdate == false" />
                  <q-btn color="primary" label="Update Member" type="submit" v-if="isUpdate == true" :loading="loading" />
                  <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
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
                    <q-select v-model="contributionPayload.description" :options="descriptionTypeOptions"
                      label="Description" lazy-rules transition-show="scale" transition-hide="scale" behavior="default"
                      :rules="[(val: string | any[]) => (val && val.length > 0) || 'Select contribution description']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the contribution description
                      </q-tooltip>
                    </q-select>
                    <!-- <q-input v-model="contributionPayload.description" label="Description " /> -->
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
                    <q-select v-model="donationPayload.description" :options="descriptionTypeOptions" label="Description"
                      lazy-rules transition-show="scale" transition-hide="scale" behavior="default"
                      :rules="[(val: string | any[]) => (val && val.length > 0) || 'Select donation description']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the donation description
                      </q-tooltip>
                    </q-select>
                    <!-- <q-input v-model="donationPayload.description" label="Description " /> -->
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
import { ref, onMounted, computed } from 'vue';
import { LocalStorage, useQuasar } from 'quasar';
import AAStatusConstants from 'src/constants/aa-status.constants';
import PaginationUtil from 'src/utils/pagination.utils';
import FetchDataRequest from 'src/models/FetchDataRequest.model';
import { MemberRecords } from 'src/models/member/AllMembers.model';
import { useRoute } from 'vue-router';


// ------------------------------- GLOBAL DECLARATIONS --------------------------------- //
const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const welfareStore = useWelfareStore();
const paginationUtil = ref(new PaginationUtil());
const leftDrawerOpen = ref(false);
const store = useAuthStore();
const searchKey = ref('');
const filter = ref(null);
const showMemberDialog = ref(false);
const confirmMemberDialog = ref(false);
const loading = ref(false);
const step = ref(1);
const maritalStatusOptions = ref(['single', 'married', 'divorced', 'separated', 'widowed', 'remarried']);
const membershipTypeOptions = ref(['member', 'associate member', 'guest', 'member', 'government', 'oraganization', 'prospecitve member', 'life member', 'former member', 'baptized member']);
const membershipStatusOptions = ref(['active', 'inactive', 'resigned']);
const descriptionTypeOptions = ref([
  'Tithes',
  'Offerings',
  'Missionary Support',
  'Building Fund',
  'Special Projects',
  'Charity and Outreach',
  'Benevolence Fund',
  'Youth Ministry Support',
  'Music Ministry',
  'Educational Programs',
  'Technology and Media',
  'Missions Trips',
  'Church Events',
  'Scholarships',
  'Pastoral Support',
  'Prison Ministry',
  'Medical and Emergency Assistance',
  'Environmental Stewardship',
  'Food Pantry and Clothing Closet',
  'Memorial and Tribute Gifts',
  'Community Outreach',
  'Elderly Care Ministry',
  'Crisis Intervention',
  'Community Development',
  'Youth Outreach',
  'Housing Initiatives',
  'Counseling Services',
  'Legal Aid Ministry',
  'Disaster Relief'
]);

const donationStatusOptions = ref(['completed', 'pending']);
const contributionStatusOptions = ref(['completed', 'pending']);
const showContributionDialog = ref(false);
const showDonationDialog = ref(false);
const isUpdate = ref(false);

const memberId = ref('');
const route = useRoute();

const username = <any>ref(null);

if (LocalStorage.has('username')) {
  username.value = LocalStorage.getItem('username');
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

const memberPayload = ref(
  {
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
    location: '',
  });

const memberPayload_ = ref(
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

const onProcessMember = async () => {
  if (isUpdate.value == false) {
    onProcessNewMember();
  }
  else {
    console.log("onProcessUpdateMember");
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

const onProcessNewMember = async () => {
  loading.value = true;
  const result = await welfareStore.createMember(memberPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showMemberDialog.value = false;
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

const onProcessUpdateMember = async () => {
  loading.value = true;
  const result = await welfareStore.editMember(memberPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showMemberDialog.value = false;
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


const memberInfo = computed(() => {
  return welfareStore.listOfMembers?.records.filter((record: any) => (record.memberId === route.params['']))[0];
  // return welfareStore?.listOfMembers.records?.filter((record) => (record.records === route.params['']))[0];
});



const loadRecords = async () => {
  getAllMembers()

}

const getAllMembers = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, MemberRecords>(
    welfareStore.getAllMembers,
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
    createdBy: authStore.listOfUserInfo.username,
    location: ''
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

const onshowCreateMemberDialog = () => {
  isUpdate.value = false;
  showMemberDialog.value = true;
};


const onshowUpdateMemberDialog = (member: any) => {
  isUpdate.value = true;
  memberPayload.value = {
    firstName: member.firstName,
    middleName: member.middleName,
    lastName: member.lastName,
    photograph: '',
    age: member.age,
    dateOfBirth: member.dateOfBirth,
    gender: member.gender,
    emailAddress: member.emailAddress,
    phoneNumber: member.phoneNumber,
    emergencyContact: member.emergencyContact,
    dateJoined: member.dateJoined,
    maritalStatus: member.maritalStatus,
    membershipStatus: member.membershipStatus,
    children: member.children,
    occupation: member.occupation,
    membershipType: member.membershipType,
    additionalInformation: member.additionalInformation,
    createdBy: username.value,
    location: member.location,
  };
  showMemberDialog.value = true;
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


// const onshowUpdateContributionDialog = (member: any) => {
//   isUpdate.value = true;
//   showContributionDialog.value = true;
// };


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
      return row?.firstName + ' ' + row?.middleName + ' ' + row?.lastName ?? 0;
    },
  },
  {
    name: 'EmailAddress', align: 'left', label: 'Email Address', field: 'emailAddress', required: true,
  },
  { name: 'Age', align: 'center', label: 'Age (yrs)', field: 'age', sortable: true },
  { name: 'MobileNumber', align: 'center', label: 'Mobile Number', field: 'phoneNumber' },
  { name: 'EmergencyContact', align: 'center', label: 'Emergency Contact', field: 'emergencyContact' },
  { name: 'MembershipStatus', align: 'center', label: 'Membership Status', field: 'membershipStatus' },
  { name: 'Gender', align: 'center', label: 'Gender', field: 'gender' },
  { name: 'MembershipType', align: 'center', label: 'Membership Type', field: 'membershipType' },
  { name: 'MaritalStatus', align: 'center', label: 'Marital Status', field: 'maritalStatus' },
  { name: 'Occupation', align: 'center', label: 'Occupation', field: 'occupation' },
  { name: 'Gender', align: 'left', label: 'Gender', field: 'gender' },
  { name: 'Date of Birth', label: 'Date Of Birth', field: 'dateOfBirth' },
  { name: 'CreatedBy', label: 'Created By', field: 'createdBy' },
  { name: 'DeleteStatus', label: 'Delete Status', field: 'isDeleted' },
  { name: 'DateJoined', align: 'left', label: 'Date Joined', field: 'dateJoined' },
]);

// ------------------------------- ON MOUNTED --------------------------------- //

onMounted(() => {
  loadRecords()
});

</script>

<style scoped></style>

