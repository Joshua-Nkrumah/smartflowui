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
            <q-item-label class="text-h6 text-weight-bold"><q-icon name="o_groups" size="1.5rem"
                class="q-mr-md" />CleverChap Panel</q-item-label>
          </div>
        </div>
      </template>
      <template #sub-title>
        <div class="text-h7 text_weight_light">Choose from the different app flavours you've subscribed to</div>
      </template>
    </MainBottomHeader>
    <div>
      <div class="row " style="margin-top: -2rem;">
        <div class="col-12">
          <div class="q-ma-md">
            <my-search-box v-model="searchKey" :on-refresh="loadRecords" />
          </div>
          <div v-if="loadingAssignedApps === false && assignedApps.length === 0" align="center" class="q-mt-lg">
            <q-img class="q-my-lg" width="20rem" src="../../assets/core-img/empty.svg" />
            <div class="text-h5 text-weight-light text-blue-grey">
              You have no apps assigned to you. <br> Kindly contact your administrator
            </div>
          </div>
          <q-scroll-area style="height: 70vh; " class="q-mt-md" v-if="loadingAssignedApps === false">
            <div v-if="assignedAppSearch.length > 0" class="q-ma-sm row q-col-gutter-lg q-mt-lg">
              <div v-for="record in assignedAppSearch" :key="record?.id" class="col-md-3">
                <div class="card-shadow" style="min-height: 8.5rem; max-width: 40rem;">
                  <q-item>
                    <q-card-section class="row q-gutter-x-md">
                      <div class="col-auto gt-md">
                        <my-avatar :shape="ShapeConstants.ROUNDED" :label="record?.appName" size="6rem"
                          font-size="2.5rem" />
                      </div>
                      <div class="col">
                        <div class="text-subtitle2 text-weight-bold text-blue-9">
                          {{ record?.statusLabel }}
                        </div>
                        <div class="text-subtitle1 text-weight-bold">
                          {{ record?.appName }}
                        </div>
                        <div style="color: white !important;" class="q-mt-sm">
                          <q-btn size="0.8rem" :to="record?.appUrl" class="text-white primary-color-light" rounded flat
                            color="white" icon="open_in_new" label="Open App" />
                        </div>
                      </div>
                    </q-card-section>
                  </q-item>
                </div>
              </div>
            </div>
          </q-scroll-area>
          <q-scroll-area v-if="loadingAssignedApps === true && assignedAppSearch.length <= 0" style="height: 70vh;"
            class="q-ma-lg">
            <div class="row q-col-gutter-lg q-mt-lg">
              <div v-for="n in 9" :key="n" class="col-xl-4">
                <q-card class="card-shadow" style="height: 8.5rem">
                  <q-item clickable v-ripple tag="a">
                    <q-card-section class="row q-gutter-x-md">
                      <div class="col-auto">
                        <q-skeleton type="QAvatar" animation="wave" size="70px" />
                      </div>
                      <div class="col">
                        <div class="text-subtitle2 text-weight-medium text-blue-grey">
                          <q-skeleton type="text" animation="wave" />
                        </div>
                        <div class="text-h5 text-weight-light">
                          <q-skeleton type="text" animation="wave" />
                        </div>
                        <div class="text-subtitle2 text-weight-bold text-blue-9">
                          <q-skeleton type="text" animation="wave" />
                        </div>
                      </div>
                    </q-card-section>
                  </q-item>
                </q-card>
              </div>
            </div>
          </q-scroll-area>
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


const loadRecords = async () => {
  getAllUsers();
  // getAllApps();
  setTimeout(() => {
    getAssignedApps();
  }, 100);
}


onMounted(() => {
  setInterval(() => {
    now.value = DateTime.local();
  }, 1000);
  loadRecords();
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
