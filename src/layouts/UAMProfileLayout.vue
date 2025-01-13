<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="q-py-sm header-shadow primary-color">
      <q-toolbar>
        <q-btn flat dense round icon="fa-solid  fa-angles-right fa-2xl" @click="toggleLeftDrawer"
          v-if="leftDrawerOpen == false" />
        <q-btn flat dense round icon="fa-solid fa-angles-left fa-2xl" @click="toggleLeftDrawer" v-else />
        <!-- <q-toolbar-title>CleverChap </q-toolbar-title> -->
        <q-toolbar-title>Cleverchap</q-toolbar-title>

        <div class="q-pr-lg">
          {{ fullName }}
        </div>
        <q-btn icon="o_person_2" round color="white" text-color="secondary">
          <q-popup-proxy>
            <div class="row no-wrap q-pa-md q-mt-xs">
              <div class="column items-center">
                <q-avatar size="5.5rem" color="secondary" text-color="white" round icon="o_person_2" />
              </div>
              <q-separator vertical inset class="q-mx-lg" />
              <div class="column">
                <div class="text-h6"> {{ firstName }}</div>
                <q-btn color="secondary" label="Logout" push size="sm" v-close-popup @click="onLogout" />
              </div>
            </div>
          </q-popup-proxy>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer class="left-sidebar-shadow" side="left" bordered v-model="leftDrawerOpen" :width="280" show-if-above
      style="background-color: #ffffff">
      <SideBarContent />
    </q-drawer>
    <q-page-container>
      <q-page>
        <ProfileManager />
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[30, 30]">
          <q-btn fab icon="keyboard_arrow_up" color="blue-9" />
        </q-page-scroller>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth-store';
import SideBarContent from 'components/structure/SideBarContent.vue';
import { useRouter } from 'vue-router';
import AppCenter from 'src/pages/uam/AppCenter.vue';
import { LocalStorage } from 'quasar';
import { ref, onMounted } from 'vue';
import PaginationUtil from 'src/utils/pagination.utils';
import FetchDataRequest from 'src/models/FetchDataRequest.model';
import { MemberRecords } from 'src/models/member/AllMembers.model';
import { useUAMStore } from 'src/stores/uam-store';
import ProfileManager from 'src/pages/uam/ProfileManager.vue';



const router = useRouter();
const uamStore = useUAMStore();
const authStore = useAuthStore();
const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const onLogout = () => {
  authStore.logout();
  router.replace({ name: 'login' });
  window.location.reload();
};
const username = <any>ref(null);
const paginationUtil = ref(new PaginationUtil());
const searchKey = ref('');
const filter = ref(null);



if (LocalStorage.has('username')) {
  username.value = LocalStorage.getItem('username');
};

const fullName = <any>ref(null);
const firstName = <any>ref(null);


if (LocalStorage.has('fullName')) {
  fullName.value = LocalStorage.getItem('fullName');
};

if (LocalStorage.has('firstName')) {
  firstName.value = LocalStorage.getItem('firstName');
};
const getAllUsers = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, MemberRecords>(
    uamStore.getAllUsers,
    fetchData,
  );
}

onMounted(() => {
  getAllUsers()
});


</script>
