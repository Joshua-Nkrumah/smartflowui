<template>
  <main class="main-content">
    <BottomHeader>
      <template #actions>
        <q-btn icon="person_add_alt" label="New Volunteer" size="16px" color="white" text-color="primary"
          class="text-bold" no-caps push @click="onshowCreateVolunteerDialog" />
      </template>
    </BottomHeader>
    <div style="margin-top: -4rem;" class="q-pa-lg">
      <div class="row">
        <div class="col-12 ">
          <my-search-box v-model="searchKey" :on-refresh="loadRecords" />
          <q-table style="margin-top: 2rem;" title="Volunteers" flat :filter="searchKey" :loading="paginationUtil.loading"
            v-model:pagination="paginationUtil.pagination" :rows="volunteerList" :columns="columns" row-key="volunteerId"
            padding>
            <template v-slot:body-cell-VolunteerStatus="props">
              <q-td key="VolunteerStatus" :props="props">
                <q-badge v-if="props.row.volunteerStatus === 'active'" class="q-pl-md q-pr-md" label="Active" fill
                  color="green-8" style="height: 1.5rem;" />

                <q-badge v-if="props.row.volunteerStatus === 'inactive'" class="q-pl-md q-pr-md" label="Inactive" fill
                  color="yellow-8" style="height: 1.5rem;" />

                <q-badge v-if="props.row.volunteerStatus === 'resigned'" class="q-pl-md q-pr-md" label="Resigned" fill
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
                    <q-item clickable @click="onshowUpdateVolunteerDialog(props.row as MemberRecords)">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Update Volunteer</q-item-label>
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
  <q-dialog v-model="showVolunteerDialog" rounded style="width: 100% !important;">
    <q-card style="width: 900px; max-width: 100vw;">
      <q-toolbar>
        <q-avatar>
          <q-icon name="person_add_alt" color="blue-9" size="30px" v-if="isUpdate == false" />
          <q-icon name="edit" color="blue-9" size="30px" v-if="isUpdate == true" />
        </q-avatar>
        <q-toolbar-title color="blue-9" v-if="isUpdate == false"><span class="text-weight-bold">Add
            Volunteer</span></q-toolbar-title>
        <q-toolbar-title color="blue-9" v-if="isUpdate == true"><span class="text-weight-bold">Update
            Volunteer</span></q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section>
        <div class="">
          <q-stepper v-model="step" vertical color="primary" animated flat>
            <q-step :name="1" title="Personal Information" icon="settings" :done="step > 1">
              <q-form @submit="step = 2" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">
                  <div class="col-md-6">
                    <q-input v-model="volunteerPayload.firstName" label="First Name *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the volunteer\'s first name']" />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="volunteerPayload.middleName" label="Middle Name " lazy-rules />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="volunteerPayload.lastName" label="Last Name *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the volunteer\'s last name']" />
                  </div>
                  <!-- <div class="col-md-6">
                    <q-input v-model="volunteerPayload.emailAddress" label="Email Address *" type="email" lazy-rules
                      :rules="[
                        (val) => (val && val.length > 0) || 'Enter the email address of the volunteer',
                        (val) => (val && /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val)) || 'Must be a valid email address'
                      ]" />
                  </div> -->
                  <div class="col-md-6">
                    <q-input v-model="volunteerPayload.emailAddress" label="Email Address " type="email" lazy-rules />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="volunteerPayload.age" label="Age *" type="number" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the Age of the volunteer']" />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="volunteerPayload.location" label="Location *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the location of the volunteer']" />
                  </div>

                  <div class="col-md-6">
                    <q-input v-model="volunteerPayload.phoneNumber" type="number" hint="+233 (XXX) XXX - XXX" autogrow
                      label="Mobile Number *" :rules="[
                        (val) => (val && Number(val) && val > 0) || 'Enter the mobile number of the volunteer',
                        (val) => val.length == 10 || 'Must be 10 characters'
                      ]">
                      <q-tooltip anchor="center middle" self="bottom left">Mobile Number
                      </q-tooltip>
                    </q-input>
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="volunteerPayload.emergencyContact" type="number" hint="+233 (XXX) XXX - XXX"
                      autogrow label="Emergency Contact" :rules="[
                        (val) => (val && Number(val) || val > 0) || 'Enter the emergency contact of the volunteer',
                        (val) => val.length == 10 || 'Must be 10 characters'
                      ]">
                      <q-tooltip anchor="center middle" self="bottom left">Emergency Contact
                      </q-tooltip>
                    </q-input>
                  </div>
                  <div class="col-md-6 q-mt-xl">
                    <q-radio dense v-model="volunteerPayload.gender" val="male" label="Male" class="q-mr-lg" />
                    <q-radio dense v-model="volunteerPayload.gender" val="female" label="Female" />
                  </div>
                </div>

                <q-stepper-navigation>
                  <q-btn type="submit" color="primary" label="Next Step" class="q-mr-md" />
                  <q-btn color="dark" label="Clear All" @click="onReset()" />
                </q-stepper-navigation>

              </q-form>
            </q-step>

            <q-step :name="2" title="Other Information" caption="Optional" icon="create_new_folder" :done="step > 2">
              <q-form @submit="onProcessVolunteer" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">
                  <div class="col-md-6">
                    <q-select v-model="volunteerPayload.maritalStatus" :options="maritalStatusOptions"
                      label="Marital Status" lazy-rules transition-show="scale" transition-hide="scale" behavior="default"
                      :rules="[(val) => (val && val.length > 0) || 'Select Marital Status']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the marital status
                      </q-tooltip>
                    </q-select>
                  </div>
                  <div class="col-md-6">
                    <q-select v-model="volunteerPayload.volunteerStatus" :options="VolunteerStatusOptions"
                      label="Volunteer Status" lazy-rules transition-show="scale" transition-hide="scale"
                      behavior="default" :rules="[(val) => (val && val.length > 0) || 'Select Volunteer Status']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the volunteer status
                      </q-tooltip>
                    </q-select>
                  </div>
                  <div class="col-md-6">
                    <q-select v-model="volunteerPayload.volunteerType" :options="membershipTypeOptions"
                      label="Volunteer Type" lazy-rules transition-show="scale" transition-hide="scale" behavior="default"
                      :rules="[(val) => (val && val.length > 0) || 'Select Volunteer Type']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the volunteer type
                      </q-tooltip>
                    </q-select>
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="volunteerPayload.occupation" label="Occupation " lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the occupation of the member']" />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="volunteerPayload.additionalInformation" label="Additional Information "
                      lazy-rules />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="volunteerPayload.dateOfBirth"
                      :rules="[(val) => (val && val.length > 0) || 'Choose volunteer\'s Date of Birth']"
                      label="Date of Birth">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="volunteerPayload.dateOfBirth" mask="YYYY-MM-DD">
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
                    <q-input v-model="volunteerPayload.dateJoined"
                      :rules="[(val) => (val && val.length > 0) || 'Choose volunteer\'s date joined']"
                      label="Date of Joined">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="volunteerPayload.dateJoined" mask="YYYY-MM-DD">
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
                  <q-btn color="primary" label="Onboard Volunteer" type="submit" :loading="loading"
                    v-if="isUpdate == false" />
                  <q-btn color="primary" label="Update Volunteer" :loading="loading" type="submit"
                    v-if="isUpdate == true" />
                  <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
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
          <span class="q-ml-sm">Do you really want to mark this volunteer as deleted?</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Mark as Delete" color="primary" :loading="loading" @click="onProcessSoftDeleteVolunteer()" />
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


// ------------------------------- GLOBAL DECLARATIONS --------------------------------- //
const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const welfareStore = useWelfareStore();
const paginationUtil = ref(new PaginationUtil());
const leftDrawerOpen = ref(false);
const store = useAuthStore();
const searchKey = ref('');
const showVolunteerDialog = ref(false);
const confirmMemberDialog = ref(false);
const loading = ref(false);
const step = ref(1);
const maritalStatusOptions = ref(['single', 'married', 'divorced', 'separated', 'widowed', 'remarried']);
const membershipTypeOptions = ref(['member', 'associate member', 'guest', 'member', 'prospecitve member', 'life member', 'former member', 'baptized member']);
const VolunteerStatusOptions = ref(['active', 'inactive', 'resigned']);
const contributionStatusOptions = ref(['completed', 'pending']);
const showContributionDialog = ref(false);
const showDonationDialog = ref(false);
const isUpdate = ref(false);
const filter = ref(null);
const memberId = ref('');



const username = <any>ref(null);

if (LocalStorage.has('username')) {
  username.value = LocalStorage.getItem('username');
};


// ------------------------------- REQUEST PAYLOAD --------------------------------- //

const volunteerPayload = ref(
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
    volunteerStatus: '',
    children: '',
    occupation: '',
    volunteerType: '',
    additionalInformation: '',
    createdBy: username.value,
    location: '',
  });

const volunteerPayload_ = ref(
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
    volunteerStatus: 'active',
    children: '1',
    occupation: 'Software Engineer',
    volunteerType: 'member',
    additionalInformation: '2023-09-06',
    createdBy: username.value,
    location: 'Santa Maria',
  });



const selectedvolunteerPayload = ref(
  {
    firstName: '',
    middleName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
  });

// ------------------------------- MEMBER METHODS --------------------------------- //

const volunteerList = computed(() => {
  return welfareStore.listOfVolunteers?.records.filter((record: any) => (record.isDeleted != 'deleted'));
});

const onProcessVolunteer = async () => {
  if (isUpdate.value == false) {
    onProcessNewVolunteer();
  }
  else {
    onProcessUpdateVolunteer();
  }
};


const onProcessNewVolunteer = async () => {
  loading.value = true;
  const result = await welfareStore.createVolunteer(volunteerPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showVolunteerDialog.value = false;
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

const onProcessUpdateVolunteer = async () => {
  loading.value = true;
  const result = await welfareStore.editVolunteer(volunteerPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showVolunteerDialog.value = false;
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


const onProcessSoftDeleteVolunteer = async () => {
  loading.value = true;
  console.log('onProcessSoftDeleteVolunteer', memberId);
  const result = await welfareStore.softDeleteVolunteer({
    memberID: memberId.value
  });
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    confirmMemberDialog.value = false;
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
  getAllVolunteers()
}

const getAllVolunteers = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, MemberRecords>(
    welfareStore.getAllVolunteers,
    fetchData,
  );
}





const onReset = () => {
  volunteerPayload.value = {
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
    volunteerStatus: '',
    children: '',
    occupation: '',
    volunteerType: '',
    additionalInformation: '',
    createdBy: authStore.listOfUserInfo.username,
    location: ''
  },
  {
    memberId: '',
    amount: parseFloat(''),
    description: '',
    contributionStatus: '',
    createdBy: '',
    remarks: ''
  }
}

// ------------------------------- HELPER METHODS --------------------------------- //

const onshowCreateVolunteerDialog = () => {
  isUpdate.value = false;
  showVolunteerDialog.value = true;
};


const onshowUpdateVolunteerDialog = (member: any) => {
  isUpdate.value = true;
  showVolunteerDialog.value = true;
};

const onshowConfirmationDialog = (member: any) => {
  confirmMemberDialog.value = true;
  memberId.value = member.memberId;
};





// const filterMembers = (input: string, update: (param: () => void) => void) => {
//   if (!input || input?.trim() === '') {
//     update(() => {
//       volunteerList.value.records = memberStore.listOfMembers;
//     })
//     return;
//   }
//   const needle = input.toLowerCase();
//   update(() => {
//     volunteerList.value.records = memberStore.listOfMembers?.records.filter(((record: any) => {
//       return record?.firstName.toLowerCase().includes(needle);
//     }));
//   })
// }

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
  { name: 'VolunteerStatus', align: 'center', label: 'Volunteer Status', field: 'volunteerStatus' },
  { name: 'Gender', align: 'center', label: 'Gender', field: 'gender' },
  { name: 'VolunteerType', align: 'center', label: 'Volunteer Type', field: 'volunteerType' },
  { name: 'MaritalStatus', align: 'center', label: 'Marital Status', field: 'maritalStatus' },
  { name: 'Occupation', align: 'center', label: 'Occupation', field: 'occupation' },
  { name: 'Gender', align: 'left', label: 'Gender', field: 'gender' },
  { name: 'DateofBirth', label: 'Date Of Birth', field: 'dateOfBirth' },
  { name: 'CreatedBy', label: 'Created By', field: 'createdBy' },
  // { name: 'DeleteStatus', label: 'Delete Status', field: 'isDeleted' },
  { name: 'DateJoined', align: 'left', label: 'Date Joined', field: 'dateJoined' },
]);


// ------------------------------- ON MOUNTED --------------------------------- //

onMounted(() => {
  loadRecords()
});

</script>

<style scoped></style>

