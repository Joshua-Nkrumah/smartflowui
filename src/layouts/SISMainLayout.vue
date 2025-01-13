<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="q-py-sm header-shadow primary-color">
      <q-toolbar>
        <q-btn flat dense round icon="fa-solid  fa-angles-right fa-2xl" @click="toggleLeftDrawer"
          v-if="leftDrawerOpen == false" />
        <q-btn flat dense round icon="fa-solid fa-angles-left fa-2xl" @click="toggleLeftDrawer" v-else />
        <q-toolbar-title>Student Information Management</q-toolbar-title>
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
      <UAMSideBar />
    </q-drawer>
    <q-page-container>
      <q-page>
        <router-view />
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[30, 30]">
          <q-btn fab icon="keyboard_arrow_up" color="blue-9" />
        </q-page-scroller>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth-store';
import UAMSideBar from 'components/structure/SISSideBar.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import AppCenter from 'src/pages/uam/AppCenter.vue';
import { LocalStorage } from 'quasar';

const router = useRouter();
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

</script>
