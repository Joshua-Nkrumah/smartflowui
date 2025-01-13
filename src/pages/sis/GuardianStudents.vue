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
            <q-item-label class="text-h6 text-weight-bold"><q-icon name="account_circle" size="1.5rem"
                class="q-mr-md" />Mapped Students
            </q-item-label>
          </div>
        </div>
      </template>
      <template #sub-title>
        <div class="text-h7 text_weight_light">View students linked to this selected guardian or parent</div>
      </template>
    </MainBottomHeader>
    <div style="margin-top: -4rem;" class="q-pa-lg">
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <!-- Left column with vertical cards -->
        <div class="col-xs-12 col-md-4 col-lg-3">
          <!-- Category Code -->
          <q-card class="card-shadow q-mb-md">
            <q-card-section>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="person" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle2 text-grey-8">Guardian Name</q-item-label>
                  <q-item-label class="text-bold text-primary text-blue-8 text-h7">
                    {{ seletedGuardian?.firstName ?? '' }} {{ seletedGuardian?.surName ?? '' }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="wc" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle2 text-grey-8">Gender</q-item-label>
                  <q-item-label class="text-bold text-pink-7 text-h7">{{ seletedGuardian?.gender }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="badge" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle2 text-grey-8">Guardian ID</q-item-label>
                  <q-item-label class="text-bold text-green-7 text-h7">{{ seletedGuardian?.guardianNumber
                    }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="phone" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle2 text-grey-8">Phone Number</q-item-label>
                  <q-item-label class="text-bold text-teal-7 text-h7">{{ seletedGuardian?.phoneNumber }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="home" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle2 text-grey-8">Residential Address</q-item-label>
                  <q-item-label class="text-bold text-orange-7 text-h7">{{ seletedGuardian?.residentialAddress
                    }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="public" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle2 text-grey-8">Country</q-item-label>
                  <q-item-label class="text-bold text-cyan-7 text-h7">{{ seletedGuardian?.country }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="o_calendar_today" size="3rem"
                    font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Created At</q-item-label>
                  <q-item-label class="text-bold text-purple-7 text-h7">{{
                    seletedGuardian?.createdAt
                      ? DateUtil.formatCustomDate(seletedGuardian.createdAt.toString())
                      : ''
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <!-- Category Description -->
          <q-card class="card-shadow q-mb-md">
            <q-card-section>
              <!-- Assigned Students -->
              <q-item>
                <q-item-section avatar>
                  <!-- Icon for Assigned Students -->
                  <q-icon class="text-grey-7" text-color="white" name="people_alt" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Mapped Students</q-item-label>
                  <q-item-label class="text-bold text-green-8 text-h4">{{ guardianMappingTotal }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>


        </div>

        <!-- Right column -->
        <div class="col-xs-12 col-md-8 col-lg-9">
          <short-search-box label="Map Guardian to Student" icon="add" v-model="searchKey" @toggle-view="onToggleView"
            @toggleDialog="onshowCreateStudentDialog" :on-refresh="loadRecords" :viewType="false" />
          <q-table v-if="isListView === true" style="margin-top: 2rem;" flat :filter="searchKey"
            :loading="paginationUtil.loading" :rows="guardianMappingList" :columns="Listcolumns" row-key="id" padding>
            <template v-slot:loading>
              <q-inner-loading showing class="bg-brand-loading" />
            </template>
            <template v-slot:body-cell-StudentStatus="props">
              <q-td key="StudentStatus" :props="props">
                <q-badge v-if="props.row.status.toLowerCase() === 'active'" class="q-pl-md q-pr-md" label="Active" fill
                  color="green-8" style="height: 1.5rem;" />
                <q-badge v-if="props.row.status.toLowerCase() === 'inactive'" class="q-pl-md q-pr-md" label="Inactive"
                  fill color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>

            <template v-slot:body-cell-StudentNumber="props">
              <q-td key="StudentNumber" :props="props">
                <q-badge v-if="props.row?.student?.studentNumber != null" class="q-pl-md q-pr-md"
                  :label="props.row?.student?.studentNumber" fill color="blue-8" style="height: 1.5rem;" />
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <div class="row wrap justify-between"></div>
                <q-btn-dropdown color="grey-8" dense>
                  <q-list>
                    <q-item clickable @click="onConfirmDeletePrompt(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_delete" color="red" size="2rem" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Remove Student <br class="q-mb-md" /> Mapping</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                  </q-list>
                </q-btn-dropdown>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </main>

  <my-full-dialog v-model="showStudentDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-md-12">
        <q-card class="card-shadow">
          <q-card-section class="row q-gutter-x-md">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="Category Mapping" size="4rem" font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey">
                Guardian to Student Mapping
              </div>
              <div class="text-h6">
                Map Student(s) to <span class="text-bold text-blue-8">{{ seletedGuardian?.firstName ?? '' +
                  seletedGuardian?.surName }}</span>
              </div>
            </div>
            <div class="col-2">
              <div class="q-mt-md">
                <q-btn icon="check" @click="onDetermineConfirmationPrompt" label="Submit" size="14px" text-color="white"
                  class="text-bold primary-color" no-caps push />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-card class="q-pa-md">
      <q-form @submit="onDetermineConfirmationPrompt" @reset="onReset">
        <div class="row q-col-gutter-x-lg  ">
          <div class="col-sm-6" style="min-width: 300px;">
            <q-select outlined v-model="seletedStudents" :options="filteredGuardians" option-label="fullName"
              transition-show="scale" transition-hide="scale" map-options behavior="dialog" use-input
              input-debounce="300" label="Students *" multiple
              :rules="[(val: string | any[]) => (val && val.length > 0) || 'Please select at least one guardian']"
              clearable @filter="filteredStudentGroups">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results found
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-sm-6" style="min-width: 300px;">
            <q-select outlined v-model="applyChangesPayload.relationshipToChild" :options="filteredRelationshipToChild"
              option-value="value" option-label="label" transition-show="scale" transition-hide="scale"
              behavior="dialog" emit-value map-options use-input input-debounce="300" label="Relationship to child *"
              :rules="[(val: string | any[]) => (val && val.length > 0) || 'Please select the relationship to child']"
              clearable @filter="onFilteredRelationshipToChild">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results found
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
        <div class="row q-col-gutter-x-lg  ">
          <div class="col-sm-6" style="min-width: 300px;">
            <!-- <div class="text-h5 text-grey-8 shadow-4 q-pa-md q-mb-md">
              <div>Selected students</div>
            </div> -->
            <q-list>
              <q-item v-for="(item, index) in seletedStudents" :key="index">
                <q-item-section side top>
                  <q-item-label class="text-bold" caption>{{ item.status }}</q-item-label>
                  <q-icon name="signal_wifi_statusbar_null" color="green-8" />
                </q-item-section>

                <q-item-section>
                  <q-item-label style="font-size: 18px;">{{ item.firstName + ' ' + item.surName
                    }}</q-item-label>
                  <q-item-label caption lines="2" class="text-blue-8 text-bold">{{ item.studentNumber }}</q-item-label>
                </q-item-section>

                <q-separator spaced inset v-if="index !== seletedStudents.length - 1" />
              </q-item>

            </q-list>
          </div>

        </div>
        <!-- <q-stepper-navigation>
          <q-btn color="primary" label="Submit" type="submit" :loading="loading" v-if="isUpdate == false" />
          <q-btn color="primary" label="Submit" type="submit" v-if="isUpdate == true" :loading="loading" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" v-close-popup />
        </q-stepper-navigation> -->
      </q-form>
    </q-card>
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
import { useRouter } from 'vue-router';
import { ref, onMounted, computed, watch } from 'vue';
import { LocalStorage, useQuasar, Notify } from 'quasar';
import AAStatusConstants from 'src/constants/aa-status.constants';
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
import DateUtil from 'src/utils/date.utils';
import { GuardianStudentMappingRecord } from 'src/models/sis/GuardianStudentMapping.model';
import GuardianProfiles from './GuardianProfiles.vue';
import { label } from 'jscharting';
import { AllGuardianRecord } from 'src/models/sis/AllGuardian.model';
// ------------------------------- GLOBAL DECLARATIONS --------------------------------- //
const $q = useQuasar();
const router = useRouter();
const sisStore = useSISStore();
const paginationUtil = ref(new PaginationUtil());
const searchKey = ref('');
const filter = ref(null);
const showStudentDialog = ref(false);
const isListView = ref<boolean>(true);
const loading = ref(false);
const step = ref(1);

const isUpdate = ref(false);

const route = useRoute();

const username = <any>ref(null);
const institution_id = <any>ref(null);

if (LocalStorage.has('email')) {
  username.value = LocalStorage.getItem('email');
};
if (LocalStorage.has('institutionId')) {
  institution_id.value = LocalStorage.getItem('institutionId');
};
const now = ref(DateTime.local());

const currentDateTime_ = computed(() => {
  // return now.value.toFormat('ccc LLL dd, hh:mm:ss a');
  return now.value.toFormat('ccc LLL dd, yy');
});



const goToSummaryPage = (student: any) => {
  router.push(`/sis/student-profile/${student.id}`);
};
// ------------------------------- REQUEST PAYLOAD --------------------------------- //


const seletedStudents = ref(<string | any>[]);


const applyChangesPayload = ref({
  guardianId: route.params['guardianId'],
  tenantId: institution_id.value,
  studentIds: [],
  relationshipToChild: '',
  createdBy: username.value
});


watch(() => seletedStudents.value, async () => {
  const data = seletedStudents.value.map((record: AllStudentRecord) => record?.id);
  applyChangesPayload.value.studentIds = data
});


const deleteMappingPayload = ref(
  {
    Id: '',
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


const getStudentCategoryFilter = ref(
  {
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

const studentList = computed(() => sisStore.listofStudents.records);

// Initialize guardianGroupOptions by mapping over studentList to include a fullName property
const guardianGroupOptions = ref(studentList.value.map(student => ({
  ...student,
  fullName: `${student.firstName} ${student.surName} (${student.studentNumber})` // Combine firstName, surName, and studentNumber into fullName
})));

// Watch for changes in studentList and update guardianGroupOptions and filteredGuardians accordingly
watch(studentList, (newList) => {
  // Update guardianGroupOptions by mapping the new list to add the fullName field for each student
  guardianGroupOptions.value = newList.map(student => ({
    ...student,
    fullName: `${student.firstName} ${student.surName} (${student.studentNumber})` // Re-create fullName on update
  }));

  // Reset filteredGuardians to the updated guardianGroupOptions
  filteredGuardians.value = [...guardianGroupOptions.value];
});


const filteredGuardians = ref([...guardianGroupOptions.value]);

const filteredStudentGroups = (val: any, update: any, abort: any) => {
  // Call abort() if data is unavailable
  setTimeout(() => {
    update(() => {
      if (!val) {
        // If no filter value, reset to original list
        filteredGuardians.value = [...guardianGroupOptions.value];
      } else {
        const needle = val.toLowerCase();
        filteredGuardians.value = guardianGroupOptions.value.filter(option =>
          option?.firstName?.toLowerCase().includes(needle) ||
          option?.surName?.toLowerCase().includes(needle) ||
          option?.studentNumber?.toLowerCase().includes(needle)
        );
      }
    });
  }, 500); // Simulating a delay of 0.5 seconds
};

const relationshipToChildGroupOptions = ref([
  { label: 'Father', value: 'Father' },
  { label: 'Mother', value: 'Mother' },
  { label: 'Sister', value: 'Sister' },
  { label: 'Brother', value: 'Brother' },
  { label: 'Uncle', value: 'Uncle' },
  { label: 'Aunt', value: 'Aunt' },
  { label: 'Grandfather', value: 'Grandfather' },
  { label: 'Grandmother', value: 'Grandmother' },
  { label: 'Cousin', value: 'Cousin' },
  { label: 'Stepfather', value: 'Stepfather' },
  { label: 'Stepmother', value: 'Stepmother' },
  { label: 'Guardian', value: 'Guardian' },
  { label: 'Niece', value: 'Niece' },
  { label: 'Nephew', value: 'Nephew' },
  { label: 'Godfather', value: 'Godfather' },
  { label: 'Godmother', value: 'Godmother' },
  { label: 'Caretaker', value: 'Caretaker' },
  { label: 'Sibling', value: 'Sibling' },
  { label: 'Stepbrother', value: 'Stepbrother' },
  { label: 'Stepsister', value: 'Stepsister' },
]);
const filteredRelationshipToChild = ref([...relationshipToChildGroupOptions.value]);

const onFilteredRelationshipToChild = (val: any, update: any, abort: any) => {
  update(() => {
    if (!val) {
      // If no filter value, reset to original list
      filteredRelationshipToChild.value = [...filteredRelationshipToChild.value];
    } else {
      const needle = val.toLowerCase();
      filteredRelationshipToChild.value = filteredRelationshipToChild.value.filter(option =>
        option?.label?.toLowerCase().includes(needle)
      );
    }
  });
};

// ------------------------------- MEMBER METHODS --------------------------------- //


const guardianMappingList = computed(() => {
  return sisStore.listOfGuardianStudentMapping.records;
});
const guardianMappingTotal = computed(() => {
  return sisStore.listOfGuardianStudentMapping.total;
});
const guardianMappingSummary = computed(() => {
  return sisStore.listOfGuardianStudentMapping.summary as any;
});

const seletedGuardian = computed(() => {
  const guardianId = route.params['guardianId'];
  const filteredData = sisStore.listofGuardians.records.filter(
    (guardian) => guardian?.id == guardianId
  );
  return filteredData.length > 0 ? filteredData[0] : null;
});

const actionType = ref('');
const pageLoading = ref(false);

const showConfirmationPrompt = ref({
  data: false,
  message: '',
});

const onShowConfirmationPrompt = (prompt: any) => {
  showConfirmationPrompt.value.data = true;
  showConfirmationPrompt.value.message = prompt;
};

const onDetermineConfirmationPrompt = async () => {
  actionType.value = 'apply-changes';
  const message = 'Do you want to apply changes?';
  onShowConfirmationPrompt(message);
};

const onConfirmDeletePrompt = async (student: any) => {
  actionType.value = 'delete';
  deleteMappingPayload.value = {
    Id: student?.id
  }
  const message = 'Do you want to remove mapping?';
  onShowConfirmationPrompt(message);
};

const onApplyChanges = async () => {
  loading.value = true;
  pageLoading.value = true;
  let result;
  switch (actionType.value) {
    case 'apply-changes':
      result = await sisStore.applyGuardianStudentMapping(applyChangesPayload.value);
      break;
    case 'delete':
      result = await sisStore.removeGuardianStudentMapping(deleteMappingPayload.value);
      break;
    default:
      console.error('Unknown action type:', actionType.value);
      loading.value = false;
      return;
  }
  loading.value = false;
  pageLoading.value = false;
  console.log('result.status', result.status);
  if (result.status === AAStatusConstants.SUCCESS) {
    showStudentDialog.value = false;
    showConfirmationPrompt.value.data = false;
    loadRecords();
    onReset();
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

// const onApplyChanges = async () => {
//   loading.value = true;
//   pageLoading.value = true;
//   const result = await sisStore.applyCategoryStudentMapping(applyChangesPayload.value);
//   loading.value = false;
//   pageLoading.value = false;
//   if (result.status == AAStatusConstants.SUCCESS) {
//     showConfirmationPrompt.value.data = false;
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





const goToAssignedApps = (user: any) => {
  router.push(`/uam/assigned_apps/${user.id}`);
};


const loadRecords = async () => {
  getAllStudents(),
    getAllGuardians(),
    getStudentAllCategory(),
    getGuardianStudentMappings()
}


const getAllGuardians = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => sisStore.getAllGuardians(getGuardianProfileFilter.value),
    fetchData,
    () => sisStore.listofStudents
  );
};
const getAllStudents = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => sisStore.getAllStudents(getStudentProfileFilter.value),
    fetchData,
    () => sisStore.listofStudents
  );
  console.log(sisStore.listofStudents);
};

const getStudentAllCategory = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => sisStore.getAllStudentCategory(getStudentCategoryFilter.value),
    fetchData,
    () => sisStore.listofStudentCategory
  );
};

const getGuardianStudentMappings = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => sisStore.getAllGuardianStudentMapping({
      tenantId: institution_id.value,
      guardianId: route.params['guardianId']
    }),
    fetchData,
    () => sisStore.listOfGuardianStudentMapping
  );
};


const onReset = () => {
  // studentPayload.value = {
  //   first_name: '',
  //   last_name: '',
  //   phone_number: '',
  //   email: '',
  //   created_by: ''
  // }
}

// ------------------------------- HELPER METHODS --------------------------------- //

const onshowCreateStudentDialog = () => {
  isUpdate.value = false;
  showStudentDialog.value = true;
  step.value = 1;
  seletedStudents.value = [];
  applyChangesPayload.value.relationshipToChild = '';
};

const onToggleView = (newView: boolean) => {
  console.log('isListView', newView)
  isListView.value = newView;
};
// ------------------------------- TABLE COLUMNS AND ROWS --------------------------------- //

const columns: any = ([
  // .map((record) => record.student)
  {
    name: 'StudentNumber', align: 'left', label: 'Student ID Number', field: 'studentNumber', required: true,
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
    name: 'StudentStatus', align: 'left', label: 'Student Status', field: 'status', required: true,
  },
  {
    name: 'Gender', align: 'left', label: 'Gender', field: 'gender', required: true,
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


const Listcolumns: any = ([
  { name: 'actions', align: 'center', label: 'Action' },
  {
    name: 'StudentNumber', align: 'left', label: 'Student ID Number', field: (row: GuardianStudentMappingRecord) => {
      return row?.student?.studentNumber;
    }, required: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'center',
    field: (row: GuardianStudentMappingRecord) => {
      return row?.student?.firstName + ' ' + row?.student?.surName;
    },
  },
  {
    name: 'Relationship', align: 'center', label: 'Relationship to Child', field: (row: GuardianStudentMappingRecord) => {
      return row?.relationshipToChild;
    }, required: true,
  },
  {
    name: 'Gender', align: 'left', label: 'Gender', field: (row: GuardianStudentMappingRecord) => {
      return row?.student?.gender;
    }, required: true,
  },
  {
    name: 'StudentStatus', align: 'left', label: 'Student Status', field: (row: GuardianStudentMappingRecord) => {
      return row?.student?.status;
    }, required: true,
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
