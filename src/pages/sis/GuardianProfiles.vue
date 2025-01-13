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
            <q-item-label class="text-h6 text-weight-bold"><q-icon name="supervisor_account" size="1.5rem"
                class="q-mr-md" />Guardian Profiles
            </q-item-label>
          </div>
        </div>
      </template>
      <template #sub-title>
        <div class="text-h7 text_weight_light">View profiles of all guardians</div>
      </template>
    </MainBottomHeader>
    <div style="margin-top: -4rem;" class="q-pa-lg">
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <!-- Left column with vertical cards -->
        <div class="col-xs-12 col-md-4 col-lg-3">
          <q-card class="card-shadow q-mb-md">
            <q-card-section>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="o_groups" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Total Guardians</q-item-label>
                  <q-item-label class="text-bold text-green-7 text-h4">{{ guardianTotal }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
          <!-- {{ guardianSummary }} -->

          <q-card class="card-shadow q-mb-md">
            <q-card-section>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="family_restroom" size="3rem"
                    font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Total Parents</q-item-label>
                  <q-item-label class="text-bold text-blue-8 text-h4">{{ guardianSummary?.totalParents
                    }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card class="card-shadow q-mb-md">
            <q-card-section>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="supervisor_account" size="3rem"
                    font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Total Guardians</q-item-label>
                  <q-item-label class="text-bold text-orange-8 text-h4">{{ guardianSummary?.totalGuardians
                    }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>


          <!-- <q-card class="card-shadow q-mb-md">
            <q-card-section>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="male" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Male Guardians</q-item-label>
                  <q-item-label class="text-bold text-blue-7 text-h4">{{ guardianSummary?.totalMales }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card class="card-shadow q-mb-md">
            <q-card-section>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="female" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Female Guardians</q-item-label>
                  <q-item-label class="text-bold text-pink-7 text-h4">{{ guardianSummary?.totalFemales }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card> -->

          <q-card class="card-shadow q-mb-md">
            <q-card-section>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="check_circle" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Active Guardians</q-item-label>
                  <q-item-label class="text-bold text-green-7 text-h4">{{ guardianSummary?.activeGuardians
                    }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card class="card-shadow q-mb-md">
            <q-card-section>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="cancel" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Inactive Guardians</q-item-label>
                  <q-item-label class="text-bold text-red-7 text-h4">{{ guardianSummary?.inactiveGuardians
                    }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

        </div>

        <!-- Right column -->
        <div class="col-xs-12 col-md-8 col-lg-9">
          <short-search-box label="New Guaridan" icon="person_add_alt" v-model="searchKey" @toggle-view="onToggleView"
            @toggleDialog="onshowCreateGuardianDialog" :on-refresh="loadRecords" />
          <q-table v-if="isListView === true" style="margin-top: 2rem;" flat :filter="searchKey"
            :loading="paginationUtil.loading" :rows="guardianList" :columns="columns" row-key="memberId" padding>
            <template v-slot:loading>
              <q-inner-loading showing class="bg-brand-loading" />
            </template>

            <template v-slot:body-cell-StudentPhoto="props">
              <q-td key="StudentPhoto" :props="props">
                <q-avatar size="80px">
                  <q-img :src="props.row.photo_path" />
                </q-avatar>
              </q-td>
            </template>
            <template v-slot:body-cell-StudentStatus="props">
              <q-td key="StudentStatus" :props="props">
                <q-badge v-if="props.row.status.toLowerCase() === 'active'" class="q-pl-md q-pr-md" label="Active" fill
                  color="green-8" style="height: 1.5rem;" />
                <q-badge v-if="props.row.status.toLowerCase() === 'inactive'" class="q-pl-md q-pr-md" label="Inactive"
                  fill color="red-7" style="height: 1.5rem;" />
                <q-badge v-if="props.row.status.toLowerCase() === 'dropped-out'" class="q-pl-md q-pr-md"
                  label="Dropped Out" fill color="red-7" style="height: 1.5rem;" />
                <q-badge v-if="props.row.status.toLowerCase() === 'deferred'" class="q-pl-md q-pr-md" label="Deferred"
                  fill color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>

            <template v-slot:body-cell-GuardianNumber="props">
              <q-td key="GuardianNumber" :props="props">
                <q-badge v-if="props.row?.guardianNumber != null" class="q-pl-md q-pr-md"
                  :label="props.row?.guardianNumber" fill color="blue-8" style="height: 1.5rem; font-size: 14px;" />
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <div class="row wrap justify-between"></div>
                <q-btn-dropdown color="grey-8" dense>
                  <q-list>
                    <!-- <q-item clickable @click="goToSummaryPage(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_more" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>More Details</q-item-label>
                      </q-item-section>
                    </q-item> -->

                    <q-item clickable @click="goToGuardianStudents(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_more" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>View Students</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable @click="onshowUpdateProfileDialog(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Edit Profile</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />

                    <q-separator />
                  </q-list>
                </q-btn-dropdown>
              </q-td>
            </template>
          </q-table>

          <!-- <q-card> -->
          <q-table v-if="isListView === false" grid flat bordered :rows="guardianList" :columns="cardColumns"
            row-key="id" :filter="searchKey" hide-header :loading="paginationUtil.loading"
            class="q-mt-md bg-white text-black q-pa-md" card-class="q-mt-md bg-primary text-white">
            <template v-slot:loading>
              <q-inner-loading showing class="bg-brand-loading" />
            </template>
          </q-table>

          <!-- </q-card> -->

        </div>
      </div>
    </div>
  </main>
  <my-full-dialog v-model="showGuardianDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-md-12">
        <q-card class="card-shadow">
          <q-card-section class="row q-gutter-x-md">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="Guardian Onboarding" size="4rem" font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-if="isUpdate == false">
                Guardian Onboarding
              </div>
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-if="isUpdate == true">
                Guardian Update
              </div>
              <div class="text-h5 text-weight-light" v-if="isUpdate == false">
                Add Guardian
              </div>
              <div class="text-h5 text-weight-light" v-if="isUpdate == true">
                Update Guardian Details
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-stepper v-model="step" vertical color="primary" animated flat>
      <q-step :name="1" title="Personal Information" icon="settings" :done="step > 1">
        <q-form @submit="step = 2" @reset="onReset">
          <div class="row q-col-gutter-x-lg  ">
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.firstName" label="First Name*" lazy-rules
                :rules="[(val: string | any[]) => val && val.length > 0 || 'Enter the guardian\'s first name']" />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.surName" label="Last Name  *" lazy-rules
                :rules="[(val: string | any[]) => val && val.length > 0 || 'Enter the guardian\'s last name']" />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.emergencyContact" label="Emergency Contact " lazy-rules />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.phoneNumber" label="Phone Number *" lazy-rules :rules="[
                (val: number) => (val && Number(val) && val > 0) || 'Enter the mobile number',
                (val: string | any[]) => val.length == 10 || 'Must be 10 digits'
              ]" />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.email" label="Email Address  " lazy-rules />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-select outlied v-model="guardianPayload.guardianGroup" :options="filteredGuardians" option-value="name"
                option-label="name" transition-show="scale" transition-hide="scale" emit-value map-options use-input
                input-debounce="300" label="Guardian Group *"
                :rules="[(val: string | any[]) => (val && val.length > 0) || 'Select the guardian group']"
                :clearable="true" @filter="filteredCategoryGroups">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <!-- <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.GuardianNumber" label="Guardian Number (Optional)  " lazy-rules />
            </div> -->

          </div>
          <q-stepper-navigation>
            <q-btn color="primary" label="Continue" type="submit" :loading="loading" v-if="isUpdate == false" />
            <q-btn color="primary" label="Continue" type="submit" v-if="isUpdate == true" :loading="loading" />
            <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" v-close-popup />
          </q-stepper-navigation>
        </q-form>
      </q-step>
      <q-step :name="2" title="Other Details" icon="settings" :done="step > 2">

        <q-form @submit="onDetermineConfirmationPrompt" @reset="onReset">
          <div class="row q-col-gutter-x-lg  ">
            <div class="col-sm-6" style="min-width: 300px;">
              <q-select v-model="guardianPayload.gender" :options="studentGenderOptions" label="Gender *" lazy-rules
                transition-show="scale" transition-hide="scale" behavior="default"
                :rules="[(val: string | any[]) => val && val.length > 0 || 'Select the guardian\'s gender']"></q-select>
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.residentialAddress" label="Residential Address  *" lazy-rules
                :rules="[(val: string | any[]) => val && val.length > 0 || 'Enter the residential address']" />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.homeTownAddress" label="Hometown Address " lazy-rules />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.country" label="Country  *" lazy-rules
                :rules="[(val: string | any[]) => val && val.length > 0 || 'Enter the country']" />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.city" label="City  *" lazy-rules
                :rules="[(val: string | any[]) => val && val.length > 0 || 'Enter the city']" />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.nationality" label="Nationality  *" lazy-rules
                :rules="[(val: string | any[]) => val && val.length > 0 || 'Enter the nationality']" />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.postalCode" label="Postal Code  " lazy-rules />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.state" label="State/Region  *" lazy-rules />
            </div>
          </div>
          <q-stepper-navigation>
            <q-btn color="primary" label="Submit Information" type="submit" :loading="loading"
              v-if="isUpdate == false" />
            <q-btn color="primary" label="Update Guardian" type="submit" v-if="isUpdate == true" :loading="loading" />
            <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-form>
      </q-step>
    </q-stepper>
  </my-full-dialog>

  <confirmation-prompt persistent v-model="showConfirmationPrompt.data" header="Confirm" color="primary" icon="o_send">
    <template #content>
      {{ showConfirmationPrompt?.message }}
    </template>
    <template #buttons>
      <q-btn v-close-popup flat color="primary" label="Cancel" />
      <q-btn class="primary-color text-white" flat color="primary" icon="check" label="Proceed" :loading="loading"
        @click="onProcessGuardian" />
    </template>
  </confirmation-prompt>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth-store';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { LocalStorage, useQuasar, Notify } from 'quasar';
import AAStatusConstants from 'src/constants/aa-status.constants';
import BaseUrlConstants from 'src/constants/url.constants';
import PaginationUtil from 'src/utils/pagination.utils';
import FetchDataRequest from 'src/models/FetchDataRequest.model';
import { useRoute } from 'vue-router';
import MyFullDialog from 'src/components/utils/MyFullDialog.vue';
import ShapeConstants from 'src/constants/shape.constants';
import MyAvatar from 'src/components/utils/MyAvatar.vue';
import { useSISStore } from 'src/stores/sis.store';
import { AllStudentRecord, StudentRecordSummary } from 'src/models/sis/AllStudents.model';
import { DateTime } from 'luxon';
import MainBottomHeader from 'components/structure/MainBottomHeader.vue';
import ShortSearchBox from 'components/utils/ShortSearchBar.vue';
import ConfirmationPrompt from 'src/components/custom/ConfirmationPrompt.vue';
import { AllGuardianRecord, AllGuardianSummary } from 'src/models/sis/AllGuardian.model';
import DateUtil from 'src/utils/date.utils';
// ------------------------------- GLOBAL DECLARATIONS --------------------------------- //
const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const sisStore = useSISStore();
const paginationUtil = ref(new PaginationUtil());
const searchKey = ref('');
const filter = ref(null);
const showGuardianDialog = ref(false);
const isListView = ref<boolean>(true);
const showStudentDetailsDialog = ref(false);
const showStudentPhotographDialog = ref(false);
const showStudentStatusDialog = ref(false);
const displayStudentDetails = <any>ref(null);
const confirmCreateStudentDialog = ref(false);
const confirmUpdateStudentDialog = ref(false);
const confirmStudentStatusDialog = ref(false);
const studentStatus = ref(null);
const loading = ref(false);
const step = ref(1);

const isUpdate = ref(false);

const route = useRoute();

const username = <any>ref(null);
const institution_id = <any>ref(null);
const user_id = <any>ref(null);

if (LocalStorage.has('email')) {
  username.value = LocalStorage.getItem('email');
};
if (LocalStorage.has('institutionId')) {
  institution_id.value = LocalStorage.getItem('institutionId');
};
const studentStatusOptions = ref(['active', 'inactive', 'dropped-out', 'deferred']);
const studentGenderOptions = ref(['Male', 'Female']);

const now = ref(DateTime.local());

const currentDateTime_ = computed(() => {
  // return now.value.toFormat('ccc LLL dd, hh:mm:ss a');
  return now.value.toFormat('ccc LLL dd, yy');
});



const goToSummaryPage = (guardian: any) => {
  router.push(`/sis/guardian-profile/${guardian.id}`);
};

const goToGuardianStudents = (guardian: any) => {
  router.push(`/sis/guardian-students/${guardian.id}`);
};

// ------------------------------- REQUEST PAYLOAD --------------------------------- //

const guardianGroupOptions = ref(['Parent', 'Guardian']);

const filteredGuardians = ref([...guardianGroupOptions.value]);

const filteredCategoryGroups = (val: any, update: any, abort: any) => {
  // Call abort() at any time if you can't retrieve data somehow
  setTimeout(() => {
    update(() => {
      if (val === '') {
        filteredGuardians.value = [...guardianGroupOptions.value]
      } else {
        const needle = val.toLowerCase()
        filteredGuardians.value = guardianGroupOptions.value.filter(option =>
          option?.toLowerCase().includes(needle)
        )
      }
    })
  }, 1) // Simulating a delay of 1500ms (1.5 seconds)
}

const guardianPayload = ref(
  {
    tenantId: institution_id.value,
    guardianGroup: '',
    firstName: '',
    surName: '',
    email: '',
    phoneNumber: '',
    GuardianNumber: '',
    gender: '',
    nationality: '',
    residentialAddress: '',
    homeTownAddress: '',
    dateOfBirth: '',
    status: 'Active',
    photo: '',
    country: '',
    postalCode: '',
    state: '',
    city: '',
    emergencyContact: '',
    createdBy: username.value,
    ...(isUpdate.value ? { Id: '' } : {}),
    ...(isUpdate.value ? { updatedBy: '' } : {})
  }
);

const getStudentProfileFilter = ref(
  {
    tenantId: institution_id.value,
    pageSize: 1000,
    studentId: '',
    status: '',
    firstName: '',
    surName: '',
    country: '',
    city: '',
    gender: '',
    dateCreated: '',
    createdBy: ''
  });


const getGuardianProfileFilter = ref(
  {
    tenantId: institution_id.value,
    pageSize: 1500,
    guardianId: '',
    status: '',
    firstName: '',
    surName: '',
    country: '',
    city: '',
    gender: '',
    dateCreated: '',
    createdBy: ''
  });




// ------------------------------- MEMBER METHODS --------------------------------- //

const guardianList = computed(() => {
  return sisStore.listofGuardians.records as any;
});
const guardianTotal = computed(() => {
  return sisStore.listofGuardians.total;
});
const guardianSummary = computed(() => {
  return sisStore.listofGuardians.summary as AllGuardianSummary;
});


const showConfirmationPrompt = ref(
  {
    data: false,
    message: '',
    actionType: ''
  }
);

const onShowConfirmationPrompt = (prompt: any) => {
  showConfirmationPrompt.value.data = true
  showConfirmationPrompt.value.message = prompt;
};
const onDetermineConfirmationPrompt = async (role: any) => {
  if (isUpdate.value == false) {
    showConfirmationPrompt.value.actionType = 'add';
    const message = 'Are you sure you want to create this guardian?';
    onShowConfirmationPrompt(message);
  }
  if (isUpdate.value == true) {
    showConfirmationPrompt.value.actionType = 'update';
    const message = 'Are you sure you want to update this guardian?';
    onShowConfirmationPrompt(message);
  }
};


const goToAssignedApps = (user: any) => {
  router.push(`/uam/assigned_apps/${user.id}`);
};


const onProcessGuardian = async () => {
  loading.value = true;
  let result;
  switch (showConfirmationPrompt.value.actionType) {
    case 'add':
      result = await sisStore.createGuardian(guardianPayload.value);
      break;
    case 'update':
      result = await sisStore.updateGuardian(guardianPayload.value);
      break;
    default:
      console.error('Unknown action type:', showConfirmationPrompt.value.actionType);
      loading.value = false;
      return;
  }
  loading.value = false;
  console.log('result.status', result.status);
  if (result.status === AAStatusConstants.SUCCESS) {
    showGuardianDialog.value = false;
    showConfirmationPrompt.value.data = false;
    step.value = 1;
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

const loadRecords = async () => {
  getAllStudents(),
    getAllGuardians()

}

const getAllStudents = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => sisStore.getAllStudents(getStudentProfileFilter.value),
    fetchData,
    () => sisStore.listofStudents
  );
};

const getAllGuardians = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => sisStore.getAllGuardians(getGuardianProfileFilter.value),
    fetchData,
    () => sisStore.listofStudents
  );
};



const onReset = () => {
  guardianPayload.value = {
    tenantId: institution_id.value,
    guardianGroup: '',
    firstName: '',
    surName: '',
    email: '',
    phoneNumber: '',
    GuardianNumber: '',
    gender: '',
    nationality: '',
    residentialAddress: '',
    homeTownAddress: '',
    dateOfBirth: '',
    status: 'Active',
    photo: '',
    country: '',
    postalCode: '',
    state: '',
    city: '',
    emergencyContact: '',
    createdBy: username.value,
    ...(isUpdate.value ? { Id: '' } : {}),
    ...(isUpdate.value ? { updatedBy: '' } : {})
  }
}

// ------------------------------- HELPER METHODS --------------------------------- //

const onshowCreateGuardianDialog = () => {
  onReset();
  isUpdate.value = false;
  showGuardianDialog.value = true;
  step.value = 1
};

const onToggleView = (newView: boolean) => {
  console.log('isListView', newView)
  isListView.value = newView;
};



// SFSGH_CC390M203
const onshowUpdateProfileDialog = (student: any) => {
  isUpdate.value = true;
  guardianPayload.value = {
    Id: student.id,
    firstName: student.firstName,
    surName: student.surName,
    guardianGroup: student?.guardianGroup,
    GuardianNumber: student?.GuardianNumber,
    dateOfBirth: student.dateOfBirth,
    gender: student.gender,
    email: student.email,
    phoneNumber: student.phoneNumber,
    emergencyContact: student.emergencyContact,
    residentialAddress: student.residentialAddress,
    homeTownAddress: student.homeTownAddress,
    city: student.city,
    state: student.state,
    postalCode: student.postalCode,
    country: student.country,
    nationality: student.nationality,
    status: student?.status,
    photo: '',
    createdBy: username.value,
    updatedBy: username.value,
    tenantId: institution_id.value
  };
  user_id.value = student.id
  showGuardianDialog.value = true;
};

const goToGuardianPage = (student: any) => {
  router.push(`/sis/student-guardian/${student.id}`);
};


// ------------------------------- TABLE COLUMNS AND ROWS --------------------------------- //

const columns: any = ([
  { name: 'actions', align: 'center', label: 'Action' },
  {
    name: 'GuardianNumber', align: 'left', label: 'Guardian Id', field: 'guardianNumber', required: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: (row: any) => {
      return row?.firstName + ' ' + row?.surName;
    },
  },
  {
    name: 'Gender', align: 'left', label: 'Gender', field: 'gender', required: true,
  },
  {
    name: 'Type', align: 'left', label: 'Group', field: 'guardianGroup', required: true,
  },
  {
    name: 'StudentStatus', align: 'left', label: 'Student Status', field: 'status', required: true,
  },
  {
    name: 'Nationality', align: 'left', label: 'Nationality', field: 'country', required: true,
  },
  { name: 'MobileNumber', align: 'center', label: 'Mobile Number', field: 'phoneNumber' },
  { name: 'ResidentialAddress', align: 'center', label: 'Residential Address', field: 'residentialAddress' },
  {
    name: 'CreatedAt',
    label: 'Created At',
    align: 'center',
    field: (row: any) => {
      return DateUtil.formatCustomDate(row?.createdAt);
    },
  },
]);

const cardColumns: any = ([
  {
    name: 'GuardianNumber', align: 'left', label: 'Student ID Number', field: 'GuardianNumber', required: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: (row: any) => {
      return row?.firstName + ' ' + row?.surName;
    },
  },
  {
    name: 'Gender', align: 'left', label: 'Gender', field: 'gender', required: true,
  },
  {
    name: 'Type', align: 'left', label: 'Group', field: 'guardianGroup', required: true,
  },
  {
    name: 'StudentStatus', align: 'left', label: 'Student Status', field: 'status', required: true,
  },
  {
    name: 'Nationality', align: 'left', label: 'Nationality', field: 'country', required: true,
  },
  { name: 'MobileNumber', align: 'center', label: 'Mobile Number', field: 'phoneNumber' },
  { name: 'ResidentialAddress', align: 'center', label: 'Residential Address', field: 'residentialAddress' },
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
