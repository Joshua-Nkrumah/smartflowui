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
                class="q-mr-md" />Student Category
            </q-item-label>
          </div>
        </div>
      </template>
      <template #sub-title>
        <div class="text-h7 text_weight_light">Manage categories and grouping of all students in your school</div>
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
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Total Categories</q-item-label>
                  <q-item-label class="text-bold text-green-7 text-h4">{{ studentCategoryTotal }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card class="card-shadow q-mb-md">
            <q-card-section>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="check_circle" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Active Categories</q-item-label>
                  <q-item-label class="text-bold text-green-7 text-h4">{{
            studentCategorySummary?.activeCategory }}</q-item-label>
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
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Inactive Categories</q-item-label>
                  <q-item-label class="text-bold text-red-7 text-h4">{{
            studentCategorySummary?.inactiveCategory }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

        </div>

        <!-- Right column -->
        <div class="col-xs-12 col-md-8 col-lg-9">
          <!-- <short-search-box label="Add Student Profile" icon="person_add_alt" v-model="searchKey"
            @toggleDialog="onshowCreateStudentDialog" @toggle-view="onToggleView()"
            :on-refresh="loadRecords" /> -->
          <short-search-box label="Add Student Category" icon="category" v-model="searchKey" @toggle-view="onToggleView"
            @toggleDialog="onshowCreateStudentDialog" :on-refresh="loadRecords" :hasFilter="true" :onFilter="onFilter">

          </short-search-box>
          <q-table v-if="isListView === true" style="margin-top: 2rem;" flat :filter="searchKey"
            :loading="paginationUtil.loading" :rows="studentCategoryList" :columns="columns" row-key="memberId" padding>
            <template v-slot:loading>
              <q-inner-loading showing class="bg-brand-loading" />
            </template>
            <template v-slot:body-cell-Status="props">
              <q-td key="Status" :props="props">
                <q-badge v-if="props.row.status.toLowerCase() === 'active'" class="q-pl-md q-pr-md" label="Active" fill
                  color="green-8" style="height: 1.5rem;" />
                <q-badge v-if="props.row.status.toLowerCase() === 'inactive'" class="q-pl-md q-pr-md" label="Inactive"
                  fill color="red-7" style="height: 1.5rem;" />

              </q-td>
            </template>

            <template v-slot:body-cell-CategoryCode="props">
              <q-td key="CategoryCode" :props="props">
                <q-badge v-if="props.row?.code != null" class="q-pl-md q-pr-md" :label="props.row?.code" fill
                  color="blue-8" style="height: 1.5rem;" />
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <div class="row wrap justify-between"></div>
                <q-btn-dropdown color="grey-8" dense>
                  <q-list>
                    <q-item clickable @click="goToLinkedCategoryStudentPage(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_link" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Linked Students</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable @click="onshowUpdateStudentDialog(props.row as any)">
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
          <q-table v-if="isListView === false" grid flat bordered :rows="studentCategoryList" :columns="cardColumns"
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
  <my-full-dialog v-model="showCategoryDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-md-12">
        <q-card class="card-shadow">
          <q-card-section class="row q-gutter-x-md">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="Student Category" size="4rem" font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-if="isUpdate == false">
                Student Category
              </div>
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-if="isUpdate == true">
                Student Category
              </div>
              <div class="text-h5 text-weight-light" v-if="isUpdate == false">
                Add Category
              </div>
              <div class="text-h5 text-weight-light" v-if="isUpdate == true">
                Update Student Category
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-card elevated class="q-pa-md card-shadow">
      <q-form @submit="onDetermineConfirmationPrompt" @reset="onReset">
        <div class="row q-col-gutter-x-lg  ">
          <div class="col-sm-6" style="min-width: 300px;">
            <q-input v-model="studentCategoryPayload.categoryName" label="Category Name *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Enter the category name']" />
          </div>
          <div class="col-sm-6" style="min-width: 300px;">
            <q-input v-model="studentCategoryPayload.description" label="Description *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Enter the description']" />
          </div>
          <div class="col-sm-6" style="min-width: 300px;">
            <q-input v-model="studentCategoryPayload.code" label="Category Code *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Enter the category code']" />
          </div>
          <div class="col-sm-6" style="min-width: 300px;">
            <q-select outlied v-model="studentCategoryPayload.categoryGroup" :options="filteredCategories"
              option-value="name" option-label="name" transition-show="scale" transition-hide="scale" emit-value
              map-options use-input input-debounce="300" label="Category Group *"
              :rules="[(val) => (val && val.length > 0) || 'Select the category group']" :clearable="true"
              @filter="filteredCategoryGroups">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <div class="col-sm-6" style="min-width: 300px;">
            <q-toggle v-model="studentCategoryPayload.status" true-value="Active" false-value="Inactive" size="xl"
              checked-icon="check" color="green" unchecked-icon="clear"
              label="Category Status (Enable to set to Active, Disable to set to Inactive)" />
          </div>
        </div>
        <q-stepper-navigation>
          <q-btn color="primary" label="Submit" type="submit" :loading="loading" v-if="isUpdate == false" />
          <q-btn color="primary" label="Submit" type="submit" v-if="isUpdate == true" :loading="loading" />
          <q-btn flat color="primary" label="Back" class="q-ml-sm" v-close-popup />
        </q-stepper-navigation>
      </q-form>

    </q-card>
  </my-full-dialog>

  <confirmation-prompt persistent v-model="showConfirmationPrompt.data" header="Confirm" color="primary" icon="o_send">
    <template #content>
      {{ showConfirmationPrompt?.message }}
    </template>
    <template #buttons>
      <q-btn v-close-popup flat color="primary" label="Cancel" />
      <q-btn class="primary-color text-white" flat color="primary" icon="check" label="Proceed" :loading="loading"
        @click="onProcessCategory" />
    </template>
  </confirmation-prompt>

</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth-store';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { LocalStorage, useQuasar, Notify } from 'quasar';
import AAStatusConstants from 'src/constants/aa-status.constants';
import PaginationUtil from 'src/utils/pagination.utils';
import FetchDataRequest from 'src/models/FetchDataRequest.model';
import { useRoute } from 'vue-router';
import MyFullDialog from 'src/components/utils/MyFullDialog.vue';
import ShapeConstants from 'src/constants/shape.constants';
import MyAvatar from 'src/components/utils/MyAvatar.vue';
import { useSISStore } from 'src/stores/sis.store';
import { DateTime } from 'luxon';
import MainBottomHeader from 'components/structure/MainBottomHeader.vue';
import ShortSearchBox from 'components/utils/ShortSearchBar.vue';
import ConfirmationPrompt from 'src/components/custom/ConfirmationPrompt.vue';
import DateUtil from 'src/utils/date.utils';
import {
  StudentCategorySummary,
} from 'src/models/sis/StudentCategory.model';

// ------------------------------- GLOBAL DECLARATIONS --------------------------------- //
const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const sisStore = useSISStore();
const paginationUtil = ref(new PaginationUtil());
const searchKey = ref('');
const filter = ref(null);
const showCategoryDialog = ref(false);
const isListView = ref<boolean>(true);
const showStudentDetailsDialog = ref(false);
const showStudentPhotographDialog = ref(false);
const showStudentStatusDialog = ref(false);
const displayStudentDetails = <any>ref(null);
const loading = ref(false);
const step = ref(1);

const isUpdate = ref(false);

const route = useRoute();

const username = <any>ref(null);
const institution_id = <any>ref(null);
const user_id = <any>ref(null);
const actionType = ref('');

if (LocalStorage.has('email')) {
  username.value = LocalStorage.getItem('email');
};
if (LocalStorage.has('institutionId')) {
  institution_id.value = LocalStorage.getItem('institutionId');
};
const studentCategoryGroup = ref(['Enrollment Status', 'Study Level', 'Location', 'Scholarship and Financial Status', 'Special Programs', 'Alumni', 'Attendance and Performance', 'Residential Status', 'Extracurricular Involvement', 'Career Pathways', 'Health & Wellness', 'Family and Social Background']);


const filteredCategories = ref([...studentCategoryGroup.value]);

const filteredCategoryGroups = (val: any, update: any, abort: any) => {
  // Call abort() at any time if you can't retrieve data somehow
  setTimeout(() => {
    update(() => {
      if (val === '') {
        filteredCategories.value = [...studentCategoryGroup.value]
      } else {
        const needle = val.toLowerCase()
        filteredCategories.value = studentCategoryGroup.value.filter(option =>
          option?.toLowerCase().includes(needle)
        )
      }
    })
  }, 1) // Simulating a delay of 1500ms (1.5 seconds)
}



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
    const message = 'Are you sure you want to create this category?';
    onShowConfirmationPrompt(message);
  }
  if (isUpdate.value == true) {
    actionType.value = 'update';
    const message = 'Are you sure you want to update this category?';
    onShowConfirmationPrompt(message);
  }
};
const now = ref(DateTime.local());

const currentDateTime_ = computed(() => {
  // return now.value.toFormat('ccc LLL dd, hh:mm:ss a');
  return now.value.toFormat('ccc LLL dd, yy');
});



const goToLinkedCategoryStudentPage = (student: any) => {
  router.push(`/sis/linked-category-students/${student.id}`);
};
// ------------------------------- REQUEST PAYLOAD --------------------------------- //


const studentCategoryPayload = ref(
  {
    tenantId: institution_id.value,
    categoryName: '',
    code: '',
    description: '',
    categoryGroup: '',
    status: 'Active',
    createdBy: username.value,
    ...(isUpdate.value ? { Id: '' } : {}),
    ...(isUpdate.value ? { updatedBy: '' } : {})
  }
);

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


// ------------------------------- MEMBER METHODS --------------------------------- //

const studentCategoryList = computed(() => {
  return sisStore.listofStudentCategory.records;
});

const studentCategoryTotal = computed(() => {
  return sisStore.listofStudentCategory.total;
});

const studentCategorySummary = computed(() => {
  return sisStore.listofStudentCategory.summary as StudentCategorySummary;
});

const onProcessCategory = async () => {
  loading.value = true;
  let result;
  switch (actionType.value) {
    case 'add':
      result = await sisStore.createStudentCategory(studentCategoryPayload.value);
      break;
    case 'update':
      result = await sisStore.updateStudentCategory(studentCategoryPayload.value);
      break;
    default:
      console.error('Unknown action type:', actionType.value);
      loading.value = false;
      return;
  }
  loading.value = false;
  console.log('result.status', result.status);
  if (result.status === AAStatusConstants.SUCCESS) {
    showCategoryDialog.value = false;
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


const goToAssignedApps = (user: any) => {
  router.push(`/uam/assigned_apps/${user.id}`);
};


const loadRecords = async () => {
  getStudentAllCategory()
  // getAllStudents()

}

const onFilter = async () => {

  await getStudentAllCategory();

}


const getStudentAllCategory = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => sisStore.getAllStudentCategory(getStudentCategoryFilter.value),
    fetchData,
    () => sisStore.listofStudentCategory
  );
};


const getAllStudents = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => sisStore.getAllStudents(getStudentProfileFilter.value),
    fetchData,
    () => sisStore.listofStudents
  );
};





const onReset = () => {
  // studentCategoryPayload.value = {
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
  showCategoryDialog.value = true;
  step.value = 1
};

const onToggleView = (newView: boolean) => {
  console.log('isListView', newView)
  isListView.value = newView;
};

// SFSGH_CC390M203
const onshowUpdateStudentDialog = (student: any) => {
  isUpdate.value = true;
  studentCategoryPayload.value = {
    Id: student.id,
    categoryName: student?.categoryName,
    code: student?.code,
    description: student.description,
    categoryGroup: student.categoryGroup,
    status: student.status,
    createdBy: username.value,
    updatedBy: username.value,
    tenantId: institution_id.value
  };
  user_id.value = student.id
  showCategoryDialog.value = true;
};

const goToGuardianPage = (student: any) => {
  router.push(`/sis/student-guardian/${student.id}`);
};

// ------------------------------- TABLE COLUMNS AND ROWS --------------------------------- //

const columns: any = ([
  { name: 'actions', align: 'center', label: 'Action' },
  {
    name: 'CategoryCode', align: 'left', label: 'Category Code', field: 'code', required: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Category Name',
    align: 'left',
    field: (row: any) => {
      return row?.categoryName;
    },
  },
  {
    name: 'Description', align: 'left', label: 'Description', field: 'description', required: true,
  },
  {
    name: 'Status', align: 'left', label: 'Category Status', field: 'status', required: true,
  },
  {
    name: 'CategoryGroup', align: 'left', label: 'Category Group', field: 'categoryGroup', required: true,
  },
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
    name: 'CategoryCode', align: 'left', label: 'Category Code', field: 'code', required: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Category Name',
    align: 'left',
    field: (row: any) => {
      return row?.categoryName;
    },
  },
  {
    name: 'Description', align: 'left', label: 'Description', field: 'description', required: true,
  },
  {
    name: 'Status', align: 'left', label: 'Category Status', field: 'status', required: true,
  },
  {
    name: 'CategoryGroup', align: 'left', label: 'Category Group', field: 'categoryGroup', required: true,
  },
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
