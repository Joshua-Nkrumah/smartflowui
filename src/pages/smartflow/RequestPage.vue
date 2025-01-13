<template>
  <main class="main-content">
    <MainBottomHeader>
      <template #actions>
        <div class="text-h6 gt-md text-bold" style="margin-top: -1.5rem; color: black;">
        </div>
      </template>
      <template #title>
        <div class="row justify-between">
          <div class="col q-col-gutter-y-sm">
            <div class="row items-center">
              <q-item-label class="text-h5 text-weight-bold">
                Welcome, {{ firstName }}
              </q-item-label>
            </div>
            <div>
              <q-item-label class="text-h6 text-primary-color-deep text-weight-bold row self-center">
                <div>
                  <q-icon name="o_calendar_month" class="q-pr-sm" color="black" size="1.8rem" />
                  {{ currentDateTime }}
                </div>
              </q-item-label>
            </div>
          </div>
          <div>
            <q-item-label class="text-h6 q-mt-md text-white text-weight-bold row self-center">
              <div class="justify-end">
                <q-btn icon="o_note_add" label="New Request" class="bg-white text-weight-bold" text-color="primary"
                  @click="openCreateDialog()" />
              </div>
            </q-item-label>
          </div>
        </div>
      </template>

      <template #sub-title>
        <div class="row justify-between">
          <div>
            <div class="q-ma-md">
              <EmbeddedSearchBox label="Request" icon="add_circle" v-model="searchKey" :on-refresh="loadRecords" />
            </div>
          </div>
          <div>
            <q-item-label class="text-h6 q-mt-md text-white text-weight-bold row self-center">
              <div class="justify-end">
                <q-icon name="o_pending_actions" class="q-pr-sm text-white" color="black" size="1.8rem" />
                Requests
              </div>
            </q-item-label>
            <div class=" text-weight-light text-white text-subtitle1">
              Manage all branch exception requests portal
              <!-- {{ loadRecords() }} -->
            </div>
          </div>
        </div>
      </template>
    </MainBottomHeader>
    <div style="margin-top: -1rem;" class="q-ma-md">
      <div class="row">
        <div class="col-12 ">
          <q-table style="margin-top: 2rem;" flat :filter="searchKey" :loading="paginationUtil.loading"
            v-model:pagination="paginationUtil.pagination" :rows="requestList ?? []" :columns="columns" row-key="id"
            padding>
            <template v-slot:body-cell-RequestStatus="props">
              <q-td key="RequestStatus" :props="props">
                <q-badge v-if="props.row.status === 'ACTIVE'" class="q-pl-md q-pr-md" label="Active" fill
                  color="green-8" style="height: 1.5rem;" />
                <q-badge v-if="props.row.status === 'INACTIVE'" class="q-pl-md q-pr-md" label="Inactive" fill
                  color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>
            <template v-slot:body-cell-ApprovalStatus="props">
              <q-td key="ApprovalStatus" :props="props">
                <q-badge v-if="props.row.approvalStatus === 'PENDING'" class="q-pl-md q-pr-md" label="Pending" fill
                  color="orange-8" style="height: 1.5rem;" />
                <q-badge v-if="props.row.approvalStatus === 'APPROVED'" class="q-pl-md q-pr-md" label="Approved" fill
                  color="green-8" style="height: 1.5rem;" />
                <q-badge
                  v-if="props.row.approvalStatus === 'REJECTED' || props.row.approvalStatus === null || props.row.approvalStatus === ''"
                  class="q-pl-md q-pr-md" label="Rejected" fill color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <q-btn-dropdown color="grey-8" dense>
                  <q-list>
                    <q-item clickable @click="onshowUpdateRequestDialog(props.row as any)"
                      v-if="props?.row?.approvalStatus == 'PENDING'">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Update Request</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="goToAttachmentPage(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_open_in_new" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>View Attachments</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowAttachmentDialog(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Add Attachment</q-item-label>
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

  <my-full-dialog v-model="showRequestDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-12">
        <q-card class="card-shadow full-width-card">
          <q-card-section class="row q-gutter-x-md align-middle">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="New Request" size="4rem" font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-if="!isUpdate">
                New Request
              </div>
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-else>
                Customer Request
              </div>
              <div class="text-h5 text-weight-light" v-if="!isUpdate">
                New Request
              </div>
              <div class="text-h5 text-weight-light" v-else>
                Update Request
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
            <div class="col-md-12">
              <!-- {{ requestPayload }} -->
              <q-input v-model="requestPayload.customerName" label="Customer Name *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the customer name']" />
            </div>
            <div class="col-md-6">
              <q-select v-model="requestPayload.unit" :options="uamStore.unit" label="Unit/Department *" lazy-rules
                transition-show="scale" transition-hide="scale" behavior="default" option-value="value"
                option-label="label" emit-value map-options
                :rules="[val => val != null || 'Please select the unit  or department']"></q-select>
            </div>
            <div class="col-md-6">
              <q-input v-model="requestPayload.exceptionTitle" label="Exception Title *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the exception title']" />
            </div>
            <div class="col-md-12">
              <q-input v-model="requestPayload.description" label="Description *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the description']" autogrow />
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="row q-mt-lg justify-evenly q-gutter-x-md">
        <div class="col-5">
          <q-btn color="grey-6" class="full-width" label="Cancel" icon="cancel" :loading="loading" v-close-popup />
        </div>
        <div class="col-5">
          <q-btn color="primary" icon="check" class="full-width" label="Log Request" type="submit" :loading="loading"
            v-if="!isUpdate" />
          <q-btn color="primary" icon="edit" class="full-width" label="Update Request" type="submit" :loading="loading"
            v-else />
        </div>
      </div>
    </q-form>
  </my-full-dialog>

  <my-full-dialog v-model="showAttachmentDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-12">
        <q-card class="card-shadow full-width-card">
          <q-card-section class="row q-gutter-x-md align-middle">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="Add Attachment" size="4rem" font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey">
                New Attachment
              </div>

              <div class="text-h5 text-weight-light">
                Add Attachment to this request
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
            <div class="col-md-12">
              <!-- <q-uploader :url="uploadAttachmentUrl" label="Batch upload" multiple batch style="min-width: 800px" />  :form-fields="[
                  { name: 'student_id', value: newStudentDetails.id || '' }
                ]"-->
              <q-uploader :url="uploadAttachmentUrl" field-name="file" style="min-width: 800px;" accept="image/*"
                max-file-size="2048000" @rejected="onRejectedPhoto" @uploaded="onSuccessfulUpload" :form-fields="[
                  { name: 'UploadedBy', value: requestPayload.createdBy || '' },
                  { name: 'RequestId', value: requestPayload.requestId || '' }
                ]" />
            </div>

          </div>
        </q-card-section>
      </q-card>
      <!-- <div class="row q-mt-lg justify-evenly q-gutter-x-md">
        <div class="col-5">
          <q-btn color="grey-6" class="full-width" label="Cancel" icon="cancel" :loading="loading" v-close-popup />
        </div>
        <div class="col-5">
          <q-btn color="primary" icon="check" class="full-width" label="Log Request" type="submit" :loading="loading"
            v-if="!isUpdate" />
          <q-btn color="primary" icon="edit" class="full-width" label="Update Request" type="submit" :loading="loading"
            v-else />
        </div>
      </div> -->
    </q-form>
  </my-full-dialog>

  <confirmation-prompt persistent v-model="showConfirmationPrompt.data" header="Confirm" color="primary" icon="o_send">
    <template #content>
      {{ showConfirmationPrompt?.message }}
    </template>
    <template #buttons>
      <q-btn v-close-popup flat color="primary" label="Cancel" />
      <q-btn class="primary-color text-white" flat color="primary" icon="check" label="Proceed" :loading="loading"
        @click="onProcessRequest" />
    </template>
  </confirmation-prompt>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth-store';
import { useWelfareStore } from 'src/stores/welfare-store';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { LocalStorage, useQuasar, Notify } from 'quasar';
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
import VueQrcode from '@chenfengyuan/vue-qrcode';
import DateUtil from 'src/utils/date.utils';
import ShortSearchBox from 'components/utils/ShortSearchBar.vue';
import ConfirmationPrompt from 'src/components/custom/ConfirmationPrompt.vue';
import EmbeddedSearchBox from 'components/utils/EmbeddedSearchBar.vue';
import { AllRequestData } from 'src/models/smartflow/Requests.model';

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
const showRequestDialog = ref(false);
const showAttachmentDialog = ref(false);


const uploadAttachmentUrl = ref(`${process.env.WEBFREST_IDENTITY_SERVICE_BASE_URL}Attachments/upload`);

const mapErrors: Record<string, string> = {
  'accept': 'Only images please!',
  'max-file-size': 'Image size is too large.',
  'max-total-size': 'Exceeded max file size',
};



// {
//     "status": true,
//     "message": "File uploaded successfully.",
//     "data": {
//         "attachmentId": 2,
//         "requestId": 1,
//         "filePath": "Attachments/465b9d22-4fa1-4f02-bc4a-2a775b514d43_ivy_int.png",
//         "fileType": "image/png",
//         "status": "Uploaded",
//         "uploadedAt": "2024-12-12T02:39:12.615073Z",
//         "uploadedBy": "joshuankrumahbuadu@gmail.com"
//     }
// }

const onRejectedPhoto = async (rejectEntries: { failedPropValidation: string }[]) => {
  rejectEntries.forEach((entry) => {
    Notify.create({
      message: mapErrors[entry.failedPropValidation],
      type: 'negative',
      position: 'top-right',
      icon: 'close',
    });
  });
};

const onSuccessfulUpload = (response: any) => {
  // Do something when the upload is successful
  Notify.create({
    message: 'Attachment added successfully',
    type: 'positive',
    position: 'top-right',
    color: 'green-8',
    textColor: 'white',
    icon: 'cloud_done',
  });
  showAttachmentDialog.value = false;
};

const loading = ref(false);
const isUpdate = ref(false);
const route = useRoute();
const username = <any>ref(null);
const firstName = <any>ref(null);
const roleId = <any>ref(null);
const userId = <any>ref(null);
const approvalStatus = <any>ref(null);
if (LocalStorage.has('email')) {
  username.value = LocalStorage.getItem('email');
};
if (LocalStorage.has('firstName')) {
  firstName.value = LocalStorage.getItem('firstName');
};

if (LocalStorage.has('userId')) {
  userId.value = LocalStorage.getItem('userId');
};
if (LocalStorage.has('approvalStatus')) {
  approvalStatus.value = LocalStorage.getItem('approvalStatus');
};



const now = ref(DateTime.local());

const currentDateTime_ = computed(() => {
  return now.value.toFormat('ccc LLL dd, hh:mm:ss a');
});
const currentDateTime = <any>ref(null);

const getFormattedDate = () => {
  const now = new Date();

  // Get the day, month, and year
  const dayOfWeek = now.toLocaleString('en-US', { weekday: 'long' });
  const day = now.getDate();
  const month = now.toLocaleString('en-US', { month: 'long' });
  const year = now.getFullYear();

  // Get the suffix for the day (st, nd, rd, th)
  const suffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th'; // Special case for 11th-20th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  currentDateTime.value = `${dayOfWeek}, ${day}${suffix(day)} ${year}`;
  // Format the final string
  // return `${dayOfWeek}, ${day}${suffix(day)} ${year}`;
};
// ------------------------------- REQUEST PAYLOAD --------------------------------- //

const actionType = ref('');

const openCreateDialog = async () => {
  onReset();
  actionType.value = 'create';
  showRequestDialog.value = true;
}

const requestPayload = ref(
  {
    requestType: '',
    paymentType: '',
    amount: '',
    customerName: '',
    sourceAccount: '',
    destinationAccount: '',
    requestedBy: username.value,
    approvedBy: '',
    branchCode: '001',
    approvalStatus: '',
    comments: '',
    exceptionTitle: '',
    description: '',
    unit: '',
    createdBy: username.value,
    ...(isUpdate.value ? { requestId: '' } : {}),
    ...(isUpdate.value ? { updatedBy: '' } : {}),
    ...(isUpdate.value ? { status: '' } : {})
  }
);

const requestList = computed(() => {
  const search = searchKey.value.toLowerCase();
  return uamStore.listOfRequests.records.filter((app) => {
    return (
      (app.customerName && app.customerName.toLowerCase().includes(search))
    );
  });
});

const categoryList = computed(() => {
  const search = searchKey.value.toLowerCase();
  return uamStore.listOfCategories.records.filter((category) => {
    return (
      (category.name && category.name.toLowerCase().includes(search)) ||
      (category.description && category.description.toLowerCase().includes(search))
    );
  });
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
})

const updatedRequest = <any>ref({});
const onshowUpdateRequestDialog = (request: any) => {
  isUpdate.value = true;
  onReset();

  requestPayload.value = {
    requestId: request.requestId,
    requestType: request.requestType,
    paymentType: request.paymentType,
    amount: request.amount,
    exceptionTitle: request.exceptionTitle,
    description: request.description,
    unit: request.unit,
    customerName: request.customerName,
    sourceAccount: request.sourceAccount,
    destinationAccount: request.destinationAccount,
    requestedBy: request.requestedBy,
    approvedBy: request.approvedBy,
    branchCode: request.branchCode,
    approvalStatus: request.approvalStatus,
    comments: request.comments,
    createdBy: username.value,
    updatedBy: request.updatedBy,
    status: request.status,
  };
  updatedRequest.value = {
    Id: request.requestId,
    UpdatedRequest: requestPayload.value
  }

  showRequestDialog.value = true;
};

const goToAttachmentPage = (request: any) => {
  router.push(`/attachments/${request.requestId}`);

};

const onshowAttachmentDialog = (request: any) => {
  isUpdate.value = true;
  onReset();

  requestPayload.value = {
    requestId: request.requestId,
    requestType: request.requestType,
    paymentType: request.paymentType,
    amount: request.amount,
    exceptionTitle: request.exceptionTitle,
    description: request.description,
    unit: request.unit,
    customerName: request.customerName,
    sourceAccount: request.sourceAccount,
    destinationAccount: request.destinationAccount,
    requestedBy: request.requestedBy,
    approvedBy: request.approvedBy,
    branchCode: request.branchCode,
    approvalStatus: request.approvalStatus,
    comments: request.comments,
    createdBy: username.value,
    updatedBy: request.updatedBy,
    status: request.status,
  };

  updatedRequest.value = {
    Id: request.requestId,
    UpdatedRequest: requestPayload.value
  }

  showAttachmentDialog.value = true;
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


const onDetermineApprovalPrompt = async (request: any, action: any) => {
  requestPayload.value = {
    requestId: request.requestId,
    requestType: request.requestType,
    paymentType: request.paymentType,
    amount: request.amount,
    customerName: request.customerName,
    sourceAccount: request.sourceAccount,
    exceptionTitle: request.exceptionTitle,
    description: request.description,
    unit: request.unit,
    destinationAccount: request.destinationAccount,
    requestedBy: request.requestedBy,
    approvedBy: request.approvedBy,
    branchCode: request.branchCode,
    approvalStatus: '',
    comments: request.comments,
    createdBy: username.value,
    updatedBy: request.updatedBy,
    status: request.status,
  };
  updatedRequest.value = {
    Id: request.requestId,
    UpdatedRequest: requestPayload.value
  }
  if (action == 'approve') { // peform disable
    actionType.value = 'approve';
    const message = 'Are you sure you want to approve this request?';
    requestPayload.value.approvalStatus = 'APPROVED'
    onShowConfirmationPrompt(message);
  }
  else {
    actionType.value = 'reject';
    const message = 'Are you sure you want to reject this request?';
    requestPayload.value.approvalStatus = 'REJECTED'
    onShowConfirmationPrompt(message);
  }

};

const onDetermineConfirmationPrompt = async (role: any) => {
  if (isUpdate.value == false) {
    actionType.value = 'add';
    const message = 'Are you sure you want to create this request?';
    onShowConfirmationPrompt(message);
  }
  if (isUpdate.value == true) {
    actionType.value = 'update';
    const message = 'Are you sure you want to update this request?';
    onShowConfirmationPrompt(message);
  }
};


// ------------------------------- MEMBER METHODS --------------------------------- //



const onProcessRequest = async () => {
  loading.value = true;
  let result;
  switch (actionType.value) {
    case 'add':
      result = await uamStore.createRequest(requestPayload.value);
      break;
    case 'update':
      result = await uamStore.updateRequest(updatedRequest.value);
      break;
    case 'approve':
      result = await uamStore.updateRequest(updatedRequest.value);
      break;
    case 'reject':
      result = await uamStore.updateRequest(updatedRequest.value);
      break;
    default:
      console.error('Unknown action type:', actionType.value);
      loading.value = false;
      return;
  }
  loading.value = false;
  console.log('result.status', result.status);
  if (result.status === AAStatusConstants.SUCCESS || <boolean><unknown>result.status == true) {
    showRequestDialog.value = false;
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
  getAllApps();
  // getAllCategory()
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

const getAllApps = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => uamStore.getAllRequests(),
    fetchData,
    () => uamStore.listOfRequests
  );
};


const onReset = () => {
  requestPayload.value = {
    requestId: '',
    requestType: '',
    paymentType: '',
    amount: '',
    customerName: '',
    sourceAccount: '',
    destinationAccount: '',
    requestedBy: '',
    approvedBy: '',
    exceptionTitle: '',
    description: '',
    unit: '',
    branchCode: '',
    approvalStatus: '',
    comments: '',
    createdBy: username.value,
    updatedBy: '',
    status: '',
  }
}

// ------------------------------- HELPER METHODS --------------------------------- //

const onshowAppDialog = () => {
  isUpdate.value = false;
  showRequestDialog.value = true;
};

// ------------------------------- TABLE COLUMNS AND ROWS --------------------------------- //

const columns: any = ([
  { name: 'actions', align: 'center', label: 'Action' },
  {
    name: 'AppName',
    required: true,
    label: 'Customer Name',
    align: 'left',
    field: (row: AllRequestData) => {
      return row?.customerName ?? 0;
    },
  },
  {
    name: 'ExceptionTitle', align: 'center', label: 'Exception Title', field: (row: AllRequestData) => {
      return row?.exceptionTitle ?? 0;
    },
  },
  {
    name: 'Description', align: 'center', label: 'Description', field: (row: AllRequestData) => {
      return row?.description ?? 0;
    },
  },

  { name: 'RequestStatus', align: 'center', label: 'Request Status', field: 'status' },
  { name: 'ApprovalStatus', align: 'center', label: 'Approval Status', field: 'approvalStatus' },

  {
    name: 'CreatedBy', align: 'center', label: 'Created By', field: (row: AllRequestData) => {
      return row?.createdBy ?? 0;
    },
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
  getFormattedDate();
  // setInterval(() => {
  //   now.value = DateTime.local();
  // }, 1000);
  loadRecords()
});

</script>

<style scoped></style>
