<template>
  <div>
    <q-list>
      <q-item-label header class="text-bold text-h6">
        Fidelity Bank Ghana Limited
      </q-item-label>

      <!-- Menu Items -->
      <q-item clickable tag="a" to="/dashboard">
        <q-item-section avatar>
          <q-icon name="dashboard" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Dashboard</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label class="menu-sub-title text-subtitle2 text-weight-medium" center>
            Branch Exceptions
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable tag="a" to="/requests">
        <q-item-section avatar>
          <q-icon name="pending_actions" color="secondary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Requests</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable tag="a" to="/approvals">
        <q-item-section avatar>
          <q-icon name="approval" color="secondary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Approvals</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable tag="a" to="/users">
        <q-item-section avatar>
          <q-icon name="manage_accounts" color="secondary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Users</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable tag="a" to="/branches">
        <q-item-section avatar>
          <q-icon name="domain" color="secondary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Branches</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

  </div>
</template>

<style scoped>
/*.q-item__label {
  color: #ffffff;
  font-size: 1rem;
}
.q-icon {
  color: #ffffff;
}
.menu_sub_title {
  font-size: 20px;
  color: #f9dcc4 !important;
}
.q-seperator--horizontal {
  color: #f9dcc4 !important;
}*/
</style>



<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth-store';
import { LocalStorage, useQuasar } from 'quasar';
import { ref } from 'vue';
import GoogleTranslate from '../GoogleTranslate.vue';

const visible = ref(false)
const router = useRouter();
const $q = useQuasar();
const authStore = useAuthStore();
const confirmLogout = ref(false)
const onLogout = () => {
  // visible.value = true;
  authStore.logout();
  router.replace({ name: 'login' });
  window.location.reload();
};
const selectedLanguage = ref('');
const languageOptions = ref([
  { label: 'English', value: 'en', description: 'English', icon: 'mail' },
  { label: 'Deutsch', value: 'de', description: 'German', icon: 'mail' }

]);
const selectLanguage = (language: string) => {
  selectedLanguage.value = language;
  LocalStorage.set('language', selectedLanguage.value);
};
// $q.loadingBar.increment(value)

</script>


<style scoped>
.bottom-fixed {
  position: absolute;
  bottom: 0;
  width: 280px;
  /* Optional, to make it span the full width of the container */
  background-color: #122e49;
  color: #FFFFFF !important;
  /* Optional, for better visibility */
}

/* .q-field__control-container {
  color: #FFFFFF !important;

} */
</style>
