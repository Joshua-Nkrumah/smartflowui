<template>
  <main class="main-content">
    <BottomHeader />
    <MainContainer />
  </main>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth-store';
import { useWelfareStore } from 'src/stores/welfare-store';
import BottomHeader from 'components/structure/BottomHeader.vue';
import MainContainer from 'components/main/MainContainer.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted, } from 'vue';
import PaginationUtil from 'src/utils/pagination.utils';
import FetchDataRequest from 'src/models/FetchDataRequest.model';
import { MemberRecords } from 'src/models/member/AllMembers.model';
import AAStatusConstants from 'src/constants/aa-status.constants';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const welfareStore = useWelfareStore();


const leftDrawerOpen = ref(false);
const paginationUtil = ref(new PaginationUtil());
const searchKey = ref('');
const filter = ref(null);



const getAllMembers = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, MemberRecords>(
    welfareStore.getAllMembers,
    fetchData,
  );
}


const getAllContributions = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, MemberRecords>(
    welfareStore.getAllContributions,
    fetchData,
  );
}

const getAllDonations = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, MemberRecords>(
    welfareStore.getAllDonations,
    fetchData,
  );
}

const getAllVolunteers = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, MemberRecords>(
    welfareStore.getAllVolunteers,
    fetchData,
  );
}

const onProcessMemberSummary = async () => {
  const result = await welfareStore.getAllMembersSummary(
    {
      year: 2023,
      month: 0,
      totalRecords: 0
    }
  );
  // if (result.status == AAStatusConstants.SUCCESS) {
  //   $q.notify({
  //     color: 'green-8',
  //     textColor: 'white',
  //     icon: 'cloud_done',
  //     position: 'top-right',
  //     message: `${result.message}`,
  //   });
  // } else {
  //   $q.notify({
  //     color: 'red-8',
  //     textColor: 'white',
  //     icon: 'close',
  //     position: 'top-right',
  //     message: `${result.message}`,
  //   });
  // }
};

const loadRecords = async () => {
  getAllContributions(),
    getAllDonations(),
    getAllMembers(),
    getAllVolunteers(),
    onProcessMemberSummary()
}


onMounted(() => {
  // loadRecords()
});

</script>

<style scoped>
@import '../../css/hope-ui.css';
@import '../../css/custom.min.css';
@import '../../css/hope-ui.min.css';
/* @import '../../css/customizer.min.css'; */
/* @import '../../css/dark.min.css'; */
@import '../../css/core/libs.min.css';
</style>

