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
                <q-btn icon="o_add_link" label="Add Attachment" class="bg-white text-weight-bold" text-color="primary"
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
                <q-icon name="attachment" class="q-pr-sm text-white" color="black" size="1.8rem" />
                Attachments
              </div>
            </q-item-label>
            <div class=" text-weight-light text-white text-subtitle1">
              Manage and download all attachment file linked to this request
            </div>
          </div>
        </div>
      </template>
    </MainBottomHeader>
    <div style="margin-top: -1rem;" class="q-ma-md">
      <div class="row">
        <div class="col-12 ">
          <q-table style="margin-top: 2rem;" flat :filter="searchKey" :loading="paginationUtil.loading"
            v-model:pagination="paginationUtil.pagination" :rows="attachmentList ?? []" :columns="columns" row-key="id"
            padding>
            <template v-slot:body-cell-AttachmentStatus="props">
              <q-td key="AttachmentStatus" :props="props">
                <q-badge v-if="props.row.status === 'Uploaded'" class="q-pl-md q-pr-md" label="Active" fill
                  color="green-8" style="height: 1.5rem;" />
                <q-badge v-else class="q-pl-md q-pr-md" label="Inactive" fill color="red-7" style="height: 1.5rem;" />
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
                    <!-- <q-item clickable @click="openPreviewDialog(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_preview" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Preview File</q-item-label>
                      </q-item-section>
                    </q-item> -->
                    <q-item clickable @click="onDownloadAttachment(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_download" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Download File</q-item-label>
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

  <my-full-dialog v-model="showAttachmentDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-12">
        <q-card class="card-shadow full-width-card">
          <q-card-section class="row q-gutter-x-md align-middle">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="Preview Attachment" size="4rem" font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey">
                Preview
              </div>
              <div class="text-h5 text-weight-light">
                Preview Attachment
              </div>

            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-card color="primary" animated flat class="card-shadow">
      <q-card-section>
        <div class="row q-col-gutter-x-lg  ">
          <div class="col-md-12">
            <q-img src="Y"></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
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
const route = useRoute();

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
const selectedRequest = ref(route.params['requestId']);



const uploadAttachmentUrl = ref(`${process.env.WEBFREST_IDENTITY_SERVICE_BASE_URL}Attachments/upload`);

const mapErrors: Record<string, string> = {
  'accept': 'Only images please!',
  'max-file-size': 'Image size is too large.',
  'max-total-size': 'Exceeded max file size',
};


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




const onDownloadAttachment = async (request: any) => {
  const filePath = request.filePath;
  const updatedFilePath = filePath.replace(/^\//, ''); // Removes the first slash
  try {
    const response = await fetch(`${process.env.WEBFREST_IDENTITY_SERVICE_BASE_URL}Attachments/DownloadFile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestId: updatedFilePath,
      }),
    });

    if (!response.ok) {
      throw new Error('File not found or server error.');
    }

    // Convert response to a blob
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = updatedFilePath.split('/').pop() || 'downloaded_file'; // Extract filename or default to "downloaded_file"
    anchor.click();

    // Cleanup
    URL.revokeObjectURL(url);
  } catch (error: any) {
    console.error(error.message);
    Notify.create({
      type: 'negative',
      message: 'Failed to download the file.',
    });
  }
};

// const response = await uamStore.downloadAttachment({
//   requestId: updatedFilePath
// });
// const apiBaseUrl = "http://localhost:3000/files"; // Replace with your actual API URL

// const downloadFile = async (fileName: string) => {
//   try {
//     const response = await fetch(`${apiBaseUrl}/${fileName}`);
//     if (!response.ok) {
//       throw new Error("File not found or server error.");
//     }

//     // Convert response to a blob
//     const blob = await response.blob();
//     const url = URL.createObjectURL(blob);

//     // Create a temporary anchor element to trigger the download
//     const anchor = document.createElement("a");
//     anchor.href = url;
//     anchor.download = fileName; // Specify the filename
//     anchor.click();

//     // Cleanup
//     URL.revokeObjectURL(url);
//   } catch (error: any) {
//     console.error(error.message);
//     Notify.create({
//       type: "negative",
//       message: "Failed to download the file.",
//     });
//   }
// };


const loading = ref(false);
const isUpdate = ref(false);
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
  showAttachmentDialog.value = true;
}

const selectedAttachment = ref({
  filePath: '',
});

const openPreviewDialog = async (request: any) => {
  showAttachmentDialog.value = true;
  selectedAttachment.value.filePath = request?.filePath
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

const attachmentList = computed(() => {
  const search = searchKey.value.toLowerCase();
  return uamStore.listOfAttachment.records.filter((app) => {
    return (
      (app.fileType && app.fileType.toLowerCase().includes(search))
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
  getAllAttachments();
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

const getAllAttachments = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => uamStore.getAllAttachment({
      requestId: parseInt(`${selectedRequest.value}`)
    }),
    fetchData,
    () => uamStore.listOfAttachment
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
    name: 'AttachmentId',
    required: true,
    label: 'Attachment Id',
    align: 'left',
    field: (row: any) => {
      return row?.attachmentId ?? 0;
    },
  },
  {
    name: 'FilePath', align: 'center', label: 'File Path', field: (row: any) => {
      return row?.filePath ?? 0;
    },
  },
  {
    name: 'FileType', align: 'center', label: 'File Type', field: (row: any) => {
      return row?.fileType ?? 0;
    },
  },

  { name: 'AttachmentStatus', align: 'center', label: 'Status', field: 'status' },
  {
    name: 'CreatedBy', align: 'center', label: 'Created By', field: (row: any) => {
      return row?.uploadedBy ?? 0;
    },
  },
  {
    name: 'CreatedAt',
    label: 'Uploaded At',
    align: 'center',
    field: (row: any) => {
      return DateUtil.formatCustomDate(row?.uploadedAt);
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
