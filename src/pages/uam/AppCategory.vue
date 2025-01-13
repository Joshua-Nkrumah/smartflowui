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
            <q-item-label class="text-h6 text-weight-bold"><q-icon name="o_category" size="1.5rem"
                class="q-mr-md" />Application Categories
            </q-item-label>
          </div>
        </div>
      </template>
      <template #sub-title>
        <div class="text-h7 text_weight_light">Manage all application categories</div>
      </template>
    </MainBottomHeader>
    <div style="margin-top: -3rem;" class="q-pa-lg">
      <div class="row">
        <div class="col-12 ">
          <short-search-box label="New App Category" icon="add_circle" v-model="searchKey"
            @toggleDialog="onshowCreateCategoryDialog" :on-refresh="loadRecords" />
          <q-table style="margin-top: 2rem;" flat :filter="searchKey" :loading="paginationUtil.loading"
            v-model:pagination="paginationUtil.pagination" :rows="categoryList" :columns="columns" row-key="id" padding>
            <template v-slot:body-cell-CategoryName="props">
              <q-td key="CategoryName" :props="props">
                <q-card class="card-shadow" flat>
                  <q-card-section>
                    <q-item>
                      <q-item-section avatar>
                        <my-avatar :shape="ShapeConstants.ROUNDED" :label="props?.row?.name" size="2.5rem"
                          font-size="1.5rem" />
                      </q-item-section>
                      <q-item-section>
                        <q-badge class="q-pl-md" :label="props?.row?.name" outline color="green-8"
                          style="height: 2rem; font-size: 14px !important;"> </q-badge>
                      </q-item-section>
                    </q-item>
                  </q-card-section>
                </q-card>
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <div class="row wrap justify-between"></div>
                <q-btn-dropdown color="grey-8" dense>
                  <q-list>
                    <q-item clickable @click="onshowUpdateCategoryDialog(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Update Category</q-item-label>
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

  <my-full-dialog v-model="showCategoryDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-12">
        <q-card class="card-shadow full-width-card">
          <q-card-section class="row q-gutter-x-md align-middle">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="Add Category" size="4rem" font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-if="!isUpdate">
                Add Category
              </div>
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-else>
                User Category
              </div>
              <div class="text-h5 text-weight-light" v-if="!isUpdate">
                Add Category
              </div>
              <div class="text-h5 text-weight-light" v-else>
                Update Category
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-form @submit="onDetermineConfirmationPrompt" @reset="onReset">
      <q-card color="primary" animated flat class="card-shadow">
        <q-card-section>
          <div class="row q-col-gutter-x-lg  ">
            <div class="col-md-6">
              <q-input v-model="categoryPayload.Name" label="Category Name *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the category\'s name']" />
            </div>
            <div class="col-md-6">
              <q-input v-model="categoryPayload.description" label="Description  *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the category\'s description']" />
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="row q-mt-lg justify-evenly q-gutter-x-md">
        <div class="col-5">
          <q-btn color="grey-6" class="full-width" label="Cancel" icon="cancel" :loading="loading" v-close-popup />
        </div>
        <div class="col-5">
          <q-btn color="primary" icon="check" class="full-width" label="Create Category" type="submit"
            :loading="loading" v-if="!isUpdate" />
          <q-btn color="primary" icon="edit" class="full-width" label="Update Category" type="submit" :loading="loading"
            v-else />
        </div>
      </div>
    </q-form>
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
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { LocalStorage, useQuasar } from 'quasar';
import AAStatusConstants from 'src/constants/aa-status.constants';
import PaginationUtil from 'src/utils/pagination.utils';
import FetchDataRequest from 'src/models/FetchDataRequest.model';
import { UAMUserData } from 'src/models/uam/Users.model';
import { useRoute } from 'vue-router';
import { useUAMStore } from 'src/stores/uam-store';
import { DateTime } from 'luxon';
import MainBottomHeader from 'components/structure/MainBottomHeader.vue';
import MyFullDialog from 'src/components/utils/MyFullDialog.vue';
import ShapeConstants from 'src/constants/shape.constants';
import MyAvatar from 'src/components/utils/MyAvatar.vue';
import DateUtil from 'src/utils/date.utils';
import ShortSearchBox from 'components/utils/ShortSearchBar.vue';
import ConfirmationPrompt from 'src/components/custom/ConfirmationPrompt.vue';

// ------------------------------- GLOBAL DECLARATIONS --------------------------------- //
const $q = useQuasar();
const router = useRouter();
const uamStore = useUAMStore();
const paginationUtil = ref(new PaginationUtil());
const searchKey = ref('');
const filter = ref(null);
const showCategoryDialog = ref(false);
const loading = ref(false);
const isUpdate = ref(false);
const route = useRoute();
const username = <any>ref(null);
const roleId = <any>ref(null);

if (LocalStorage.has('email')) {
  username.value = LocalStorage.getItem('email');
};


const now = ref(DateTime.local());

const currentDateTime_ = computed(() => {
  return now.value.toFormat('ccc LLL dd, hh:mm:ss a');
});
// ------------------------------- REQUEST PAYLOAD --------------------------------- //

const actionType = ref('');

const categoryPayload = ref(
  {
    Name: '',
    description: '',
    status: '',
    createdBy: username.value,
    ...(isUpdate.value ? { CategoryId: '' } : {})

  }
);

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
})



const onshowUpdateCategoryDialog = (category: any) => {
  isUpdate.value = true;
  onReset();
  categoryPayload.value = {
    Name: category?.name,
    description: category?.description,
    createdBy: username.value,
    CategoryId: category?.id,
    status: '1'
  };
  console.log('categoryPayload', categoryPayload.value);
  showCategoryDialog.value = true;
};

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


// ------------------------------- MEMBER METHODS --------------------------------- //

const categoryList = computed(() => {
  const search = searchKey.value.toLowerCase();
  return uamStore.listOfCategories.records.filter((category) => {
    return (
      (category.name && category.name.toLowerCase().includes(search)) ||
      (category.description && category.description.toLowerCase().includes(search))
    );
  });
});

const onProcessCategory = async () => {
  loading.value = true;
  let result;
  switch (actionType.value) {
    case 'add':
      result = await uamStore.createCategory(categoryPayload.value);
      break;
    case 'update':
      result = await uamStore.updateCategory(categoryPayload.value);
      break;
    case 'disable':
      result = await uamStore.disableCategory({
        Id: roleId.value,
        status: '6',
        statusLabel: 'Deactivated'
      });
      break;
    case 'enable':
      result = await uamStore.enableCategory({
        Id: roleId.value,
        status: '1',
        statusLabel: 'Active'
      });
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

const gotoMemberHistory = (member: any) => {
  router.push(`/welfare/members-history/${member.memberId}`);
};

const loadRecords = async () => {
  getAllCategory()

}

const getAllCategory = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => uamStore.getAllCategory(filterEntity.value),
    fetchData,
    () => uamStore.listOfCategories
  );
};

const getAllUsers = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, UAMUserData>(
    uamStore.getAllUsers,
    fetchData,
  );
}





const onReset = () => {
  categoryPayload.value = {
    Name: '',
    description: '',
    status: '',
    createdBy: username.value
  }
}

// ------------------------------- HELPER METHODS --------------------------------- //

const onshowCreateCategoryDialog = () => {
  onReset();
  isUpdate.value = false;
  showCategoryDialog.value = true;
};

// ------------------------------- TABLE COLUMNS AND ROWS --------------------------------- //

const columns: any = ([
  { name: 'actions', align: 'center', label: 'Action' },
  {
    name: 'CategoryName',
    required: true,
    label: 'Category Name',
    align: 'left',
    field: (row: any) => {
      return row?.name ?? 0;
    },
  },
  {
    name: 'Description', align: 'left', label: 'Description', field: 'description', required: true,
  },
  { name: 'CreatedBy', align: 'center', label: 'Created By', field: 'createdBy' },
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
