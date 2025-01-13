<template>
  <div />
</template>

<script lang="ts" setup>
import { LocalStorage } from 'quasar';
import { useAuthStore } from 'src/stores/auth-store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();

onMounted(() => {
  store.logout();
  LocalStorage.set('isAuthenticated', false);
  router.push('/login');
  window.location.reload();
});
</script>
