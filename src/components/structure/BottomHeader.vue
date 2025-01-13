<template>
  <div class="">
    <q-card class="q-pa-lg card-shadow card_container text-brand-white primary-color-light" square
      style="height: 255px">
      <q-card-section>
        <div class="text-h5 text-weight-bold">
          <slot name="title" />
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none text-weight-light">
        <slot name="sub-title" />
        <div class="gt-xs" v-if="$route.name != 'dashboard'">
          <q-btn round flat icon="arrow_back" @click="goToBack" style="margin-right: -1rem;" />
          <q-btn round style="margin-left: 1rem;" flat icon="arrow_forward" color="white" @click="goToForward" />
        </div>
        <div class="q-mt-sm lt-lg">
          <slot name="actions" />
        </div>
      </q-card-section>
      <div class="create_button gt-md">
        <slot name="actions" />
      </div>
    </q-card>
  </div>
</template>


<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth-store';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const authStore = useAuthStore();
const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const onLogout = () => {
  authStore.logout();
  router.push({ name: 'login' });
};
const store = useAuthStore();
const searchKey = ref('');
const goToBack = () => {
  router.back();
};
const goToForward = () => {
  router.forward();
};
</script>


<style scoped>
.no_border_radius {
  border-radius: 0px !important;
}

.text-white {
  color: #ffffff !important;
}

.create_button {
  background-color: #ffffff;
  position: absolute;
  left: 80% !important;
  top: 5rem;
  color: #1976D2;
}
</style>
