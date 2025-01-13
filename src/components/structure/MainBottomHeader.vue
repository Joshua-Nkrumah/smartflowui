<template>
  <div class="q-pa-md">
    <q-card class="q-pr-lg q-pt-lg q-pl-lg  card-shadow card_container primary-color-gradient text-brand-dark" square>
      <q-card-section class="q-pt-none">
        <!-- Title Section -->
        <div class="q-pt-none text-h5 text-weight-bold">
          <slot name="title" />
        </div>
      </q-card-section>

      <!-- Subtitle Section -->
      <q-card-section class="q-pt-none text-weight-light">
        <slot name="sub-title" />
        <!-- <div v-if="$route.name !== 'dashboard'" class="q-mt-md">
          <q-btn round flat icon="arrow_back" @click="goToBack"
            style="margin-right: 1rem; color: white; border: 1px solid #333;" />
          <q-btn round flat icon="arrow_forward" color="white" @click="goToForward"
            style="margin-left: 1.5rem; border: 1px solid #333;" />
        </div> -->

      </q-card-section>

      <!-- Action Section -->
      <!-- <div class="create_button q-mt-md">
        <slot name="actions" />
      </div> -->
    </q-card>
  </div>

</template>


<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth-store';
import { useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { DateTime } from 'luxon';

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

// const now = ref(DateTime.local());

// const currentDateTime_ = computed(() => {
//   return now.value.toFormat('ccc LLL dd, hh:mm:ss a');
// });

// onMounted(() => {
//   setInterval(() => {
//     now.value = DateTime.local();
//   }, 1000);
//   // loadRecords()
// });
</script>


<style scoped>
.no_border_radius {
  border-radius: 0px !important;
}

.text-white {
  color: #ffffff !important;
}

/* .create_button {
  background-color: #ffffff;
  position: absolute;
  left: 80% !important;
  top: 5rem;
  color: #1976D2;
} */
</style>
