<template>
  <main class="main-content">
    <MainBottomHeader>
      <template #actions>
        <div class="text-h6 gt-md text-bold" style="margin-top: -1.5rem; color: black;">

        </div>
      </template>
      <template #title>
        <div class="col q-col-gutter-y-sm">
          <div class="row items-center">
            <q-item-label class="text-h5 text-weight-bold">
              Welcome, Prickel Jay!
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
      </template>
      <template #sub-title>
        <div class="row justify-between">

          <div>
            <div class="q-ma-md">
              <EmbeddedSearchBox label="New App Category" icon="add_circle" v-model="searchKey" />
            </div>
          </div>
          <div>
            <q-item-label class="text-h6 q-mt-md text-white text-weight-bold row self-center">
              <div class="justify-end">
                <q-icon name="o_dashboard" class="q-pr-sm text-white" color="black" size="1.8rem" />
                Dashboard
              </div>
            </q-item-label>
            <div class=" text-weight-light text-white text-subtitle1">
              Manage all branch request exceptions on this portal
            </div>
          </div>
        </div>
      </template>
    </MainBottomHeader>

    <div>
      <div class="row " style="margin-top: -2rem;">
        <div class="col-12">

        </div>
        <div class="q-pt-lg">
        </div>
      </div>
    </div>

  </main>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth-store';
import { useWelfareStore } from 'src/stores/welfare-store';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import PaginationUtil from 'src/utils/pagination.utils';
import FetchDataRequest from 'src/models/FetchDataRequest.model';
import { MemberRecords } from 'src/models/member/AllMembers.model';
import { useQuasar } from 'quasar';
import MySearchBox from 'components/utils/MySearchBar.vue';
import ShapeConstants from 'src/constants/shape.constants';
import MyAvatar from 'src/components/utils/MyAvatar.vue';
import HeaderCarouselPanel from 'components/main/HeaderCarouselPanel.vue';
import { useUAMStore } from 'src/stores/uam-store';
import { UAMAssignedAppsData, UAMAssignedRecord } from 'src/models/uam/AssignedApps.model';
import { useRoute } from 'vue-router';
import { LocalStorage } from 'quasar';
import AAStatusConstants from 'src/constants/aa-status.constants';
import { DateTime } from 'luxon';
import MainBottomHeader from 'components/structure/MainBottomHeader.vue';
import ShortSearchBox from 'components/utils/ShortSearchBar.vue';
import EmbeddedSearchBox from 'components/utils/EmbeddedSearchBar.vue';



const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const welfareStore = useWelfareStore();
const route = useRoute();
const uamStore = useUAMStore();



const paginationUtil = ref(new PaginationUtil());
const searchKey = ref('');
const filter = ref(null);

const authenticatedUserId = <any>ref(null);
const currentDateTime = <any>ref(null);
const loadingAssignedApps = <any>ref(true);

if (LocalStorage.has('userId')) {
  authenticatedUserId.value = LocalStorage.getItem('userId');
};

const getAppsPayload = ref({
  userId: authenticatedUserId.value,
})

const assignedAppSearch = computed(() => {
  const result = uamStore.listOfApps.records.filter((record) => {
    return record?.statusLabel == 'Active'
  })
  const activeApps = result.filter((record) => {
    return record?.appName?.toLocaleLowerCase().includes(searchKey.value.toLocaleLowerCase());
  });

  return activeApps;
});

const now = ref(DateTime.local());

const currentDateTime_ = computed(() => {
  return now.value.toFormat('ccc LLL dd, hh:mm:ss a');
});

const assignedApps = computed(() => {
  return uamStore.listOfApps.records.filter((record) => {
    return record?.statusLabel == 'Active'
  })
});

const allApps = computed(() => {
  return uamStore.listOfApps.records
});

const memberList = computed(() => {
  return welfareStore.listOfMembers?.records.filter((record: any) => (record.isDeleted != 'deleted'));
});

const columns: any = ([
  { name: 'actions', align: 'center', label: 'Action' },
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: (row: any) => {
      return row?.fullName;
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


const getAssignedApps = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);

  const result = await paginationUtil.value.initiate<unknown, UAMAssignedRecord>(
    () =>
      uamStore.getAllApps({
        userId: authenticatedUserId.value
      }),
    fetchData,
  );
  if (result.status == AAStatusConstants.SUCCESS) {
    loadingAssignedApps.value = false;
    // $q.notify({
    //   color: 'green-8',
    //   textColor: 'white',
    //   icon: 'cloud_done',
    //   position: 'top-right',
    //   message: `${result.message}`,
    // });
  } else {
    loadingAssignedApps.value = true;
    $q.notify({
      color: 'red-8',
      textColor: 'white',
      icon: 'close',
      position: 'top-right',
      message: `${result.message}`,
    });
  }
}
const getAllUsers = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, MemberRecords>(
    uamStore.getAllUsers,
    fetchData,
  );
}


const getAllApps = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => uamStore.getAllApps(getAppsPayload.value),
    fetchData,
    () => uamStore.listOfApps
  );
};

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
const loadRecords = async () => {
  getAllUsers();
  // getAllApps();
  setTimeout(() => {
    getAssignedApps();
  }, 100);
}


onMounted(() => {
  getFormattedDate()
  // setInterval(() => {
  //   now.value = DateTime.local();
  // }, 1000);
  // loadRecords();
});


</script>

<style scoped>
/* @import '../../css/hope-ui.css';
@import '../../css/custom.min.css';
@import '../../css/hope-ui.min.css';
/* @import '../../css/customizer.min.css'; */
/* @import '../../css/dark.min.css';
@import '../../css/core/libs.min.css';

*/
.absolute-full {
  background-color: rgba(53, 53, 53, 0.9)
    /* background-color: rgba(20, 91, 162, 0.9); */
    /* Blue color with 50% transparency */
    /* Blue color with 50% transparency */
    /* Yellow color with 50% transparency */
    /* z-index: 1000; */
    /* Adjust the z-index as needed */
}
</style>
