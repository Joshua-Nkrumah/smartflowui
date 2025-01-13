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
                class="q-mr-md" />Category Students
            </q-item-label>
          </div>
        </div>
      </template>
      <template #sub-title>
        <div class="text-h7 text_weight_light">View students linked to this selected category</div>
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
                  <q-icon class="text-grey-7" text-color="white" name="o_category" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Category Name</q-item-label>
                  <q-item-label class="text-bold text-red-7 text-h7">{{ seletedCategory?.categoryName }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="o_key" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Category Code</q-item-label>
                  <q-item-label class="text-bold text-blue-7 text-h7">{{ seletedCategory?.code }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="o_group" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Category Group</q-item-label>
                  <q-item-label class="text-bold text-green-7 text-h7">{{ seletedCategory?.categoryGroup
                    }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="o_description" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Category Description</q-item-label>
                  <q-item-label class="text-bold text-green-7 text-h7">{{ seletedCategory?.description
                    }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="o_calendar_today" size="3rem"
                    font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Created At</q-item-label>
                  <q-item-label class="text-bold text-green-7 text-h7">{{
            seletedCategory?.createdAt
              ? DateUtil.formatCustomDate(seletedCategory.createdAt.toString())
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
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Assigned Students</q-item-label>
                  <q-item-label class="text-bold text-green-8 text-h4">{{ categoryMappingTotal }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>


        </div>

        <!-- Right column -->
        <div class="col-xs-12 col-md-8 col-lg-9">

          <short-search-box label="Add To Category" icon="add" v-model="searchKey" @toggle-view="onToggleView"
            @toggleDialog="onshowCreateStudentDialog" :on-refresh="loadRecords" :viewType="false" />
          <q-table v-if="isListView === true" style="margin-top: 2rem;" flat :filter="searchKey"
            :loading="paginationUtil.loading" :rows="categoryMappingList" :columns="Listcolumns" row-key="id" padding>
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
                Category Mapping
              </div>
              <div class="text-h6">
                Map Student(s) to <span class="text-bold text-blue-8">{{ seletedCategory?.categoryName }}</span>
              </div>
            </div>
            <div class="col-2">
              <div class="q-mt-md">
                <q-btn icon="check" @click="onDetermineConfirmationPrompt_" label="Apply Changes" size="14px"
                  text-color="white" class="text-bold primary-color" no-caps push />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-card class="q-pa-md">
      <q-table bordered separator="horizontal" style="margin-top: 2rem;" flat :filter="searchKey"
        :loading="paginationUtil.loading" v-model:pagination="paginationUtil.pagination" :rows="studentList"
        :columns="columns" row-key="id" padding selection="multiple" v-model:selected="selected">
        <template v-slot:header-selection="scope">
          <q-toggle v-model="scope.selected" color="green-8" />
        </template>
        <template v-slot:body-selection="scope">
          <q-toggle v-model="scope.selected" color="green-8" />
        </template>
        <template v-slot:loading>
          <q-inner-loading showing class="bg-brand-loading" />
        </template>
        <template v-slot:body-cell-StudentStatus="props">
          <q-td key="StudentStatus" :props="props">
            <q-badge v-if="props.row.status.toLowerCase() === 'active'" class="q-pl-md q-pr-md" label="Active" fill
              color="green-8" style="height: 1.5rem;" />
            <q-badge v-if="props.row.status.toLowerCase() === 'inactive'" class="q-pl-md q-pr-md" label="Inactive" fill
              color="red-7" style="height: 1.5rem;" />
            <q-badge v-if="props.row.status.toLowerCase() === 'dropped-out'" class="q-pl-md q-pr-md" label="Dropped Out"
              fill color="red-7" style="height: 1.5rem;" />
            <q-badge v-if="props.row.status.toLowerCase() === 'deferred'" class="q-pl-md q-pr-md" label="Deferred" fill
              color="red-7" style="height: 1.5rem;" />
          </q-td>
        </template>
      </q-table>
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
import DateUtil from 'src/utils/date.utils';
import { CategoryStudentMappingRecord } from 'src/models/sis/CategoryStudentMapping.model';
// ------------------------------- GLOBAL DECLARATIONS --------------------------------- //
const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const sisStore = useSISStore();
const paginationUtil = ref(new PaginationUtil());
const searchKey = ref('');
const filter = ref(null);
const showStudentDialog = ref(false);
const isListView = ref<boolean>(true);
const confirmCreateStudentDialog = ref(false);
const loading = ref(false);
const step = ref(1);
const selected = ref<AllStudentRecord[]>([]);

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
const now = ref(DateTime.local());

const currentDateTime_ = computed(() => {
  // return now.value.toFormat('ccc LLL dd, hh:mm:ss a');
  return now.value.toFormat('ccc LLL dd, yy');
});



const goToSummaryPage = (student: any) => {
  router.push(`/sis/student-profile/${student.id}`);
};
// ------------------------------- REQUEST PAYLOAD --------------------------------- //

// const seletedStudents = computed(() => {
//   const data = selected.value.map(record => record?.id)
//   return data;
// });

const applyChangesPayload = ref({
  categoryId: route.params['categoryId'],
  tenantId: institution_id.value,
  studentIds: <string | any>[],
  createdBy: username.value
});

watch(() => selected.value, async () => {
  const data = selected.value.map(record => record?.id);
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
// ------------------------------- MEMBER METHODS --------------------------------- //

const studentList = computed(() => {
  return sisStore.listofStudents.records;
});

const categoryMappingList = computed(() => {
  return sisStore.listOfCategoryStudentMapping.records;
});
const categoryMappingTotal = computed(() => {
  return sisStore.listOfCategoryStudentMapping.total;
});
const categoryMappingSummary = computed(() => {
  return sisStore.listOfCategoryStudentMapping.summary as StudentRecordSummary;
});

const seletedCategory = computed(() => {
  const categoryId = route.params['categoryId'];
  const filteredRole = sisStore.listofStudentCategory.records.filter(
    (category) => category?.id == categoryId
  );
  return filteredRole.length > 0 ? filteredRole[0] : null;
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

const onDetermineConfirmationPrompt_ = async () => {
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
      result = await sisStore.applyCategoryStudentMapping(applyChangesPayload.value);
      break;
    case 'delete':
      result = await sisStore.removeCategoryStudentMapping(deleteMappingPayload.value);
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
    getStudentAllCategory(),
    getCategoryStudentMappings()
}

const getAllStudents = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => sisStore.getAllStudents(getStudentProfileFilter.value),
    fetchData,
    () => sisStore.listofStudents
  );
};

const getStudentAllCategory = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => sisStore.getAllStudentCategory(getStudentCategoryFilter.value),
    fetchData,
    () => sisStore.listofStudentCategory
  );
};

const getCategoryStudentMappings = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => sisStore.getAllCategoryStudentMapping({
      tenantId: institution_id.value,
      categoryId: route.params['categoryId']
    }),
    fetchData,
    () => sisStore.listofStudentCategory
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
  step.value = 1
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
    name: 'StudentNumber', align: 'left', label: 'Student ID Number', field: (row: CategoryStudentMappingRecord) => {
      return row?.student?.studentNumber;
    }, required: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: (row: CategoryStudentMappingRecord) => {
      return row?.student?.firstName + ' ' + row?.student?.surName;
    },
  },
  {
    name: 'Gender', align: 'left', label: 'Gender', field: (row: CategoryStudentMappingRecord) => {
      return row?.student?.gender;
    }, required: true,
  },
  {
    name: 'StudentStatus', align: 'left', label: 'Student Status', field: (row: CategoryStudentMappingRecord) => {
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
