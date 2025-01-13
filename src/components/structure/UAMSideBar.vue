<template>
  <div>
    <div class="column justify-between" style="height: 50vh; width:17.5rem;">
      <div class="col-2 q-mr-xl" style="margin-left: 3.5rem;">
        <q-item-label header>
          <q-img src="../../assets/images/cc/logo.png" fit="scale-down" />
        </q-item-label>
      </div>
      <q-separator spaced />
      <div class="col-8">
        <q-list style="height: 60vh; margin-top: -3rem;">
          <br />
          <div style="height: 80vh; max-width: 300px;">
            <div style="display: flex; flex-direction: column;">
              <q-item clickable tag="a" to="/dashboard">
                <q-item-section avatar>
                  <q-icon name="tune" color="primary" />
                </q-item-section>
                <q-item-section color="grey-1">
                  <q-item-label color="grey-1" class="text-bold">Choose App</q-item-label>
                </q-item-section>
              </q-item>
            </div>

            <template v-if="currentApplication">
              <template v-for="(menus, group) in groupedMenus" :key="group">
                <q-item-label header class="text-bold">{{ group }}</q-item-label>

                <template v-for="menu in menus" :key="menu.Url || menu.Rank">
                  <!-- Regular menu item -->
                  <q-item v-if="menu.Url && menu.Url !== '#'" clickable tag="a" :to="menu.Url" :class="menu.MenuClass">
                    <q-item-section side>
                      <q-icon :name="menu.Icon || 'o_circle'" color="grey-9" />
                    </q-item-section>
                    <q-item-section color="grey-1">
                      <q-item-label color="grey-1">{{ menu.Name }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <!-- Expandable menu item -->
                  <q-expansion-item v-else-if="menu.SubMenus && menu.SubMenus.length > 0" group="menu" expand-separator
                    :icon="menu.Icon || 'o_circle'" :label="menu.Name" :class="menu.MenuClass" :key="menu.Rank"
                    color="grey-1">
                    <template #header>
                      <q-item style="padding-left:0; padding-right:0; margin-right:0; width:100%;">
                        <q-item-section side>
                          <q-icon :name="menu.Icon || 'o_circle'" color="grey-9" />
                        </q-item-section>
                        <q-item-section color="grey-1">
                          <q-item-label color="grey-1">{{ menu.Name }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>

                    <q-item v-for="item in menu.SubMenus" :key="item.Rank" clickable tag="a" :to="item.Url"
                      :class="item.SubMenuClass">
                      <q-item-section side>
                        <q-icon :name="item.Icon || 'hdr_weak'" color="grey-9" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ item.Name }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-expansion-item>
                </template>
              </template>
            </template>

            <q-inner-loading :showing="loaderVisible" size="80px" label="Getting Application Menus"
              label-class="text-primary-color text-bold" label-style="font-size: 1.0em">
            </q-inner-loading>

          </div>
        </q-list>
      </div>
    </div>
  </div>
  <q-dialog v-model="confirmLogout">
    <q-card class="my-card">
      <q-img src="../../assets/images/cc/logout.svg" style="width: 40em;" />
      <q-card-section class="q-pt-none">
        <div class="text-subtitle1 text-bold row justify-center q-mt-md">
          Are you sure you want to sign out?
        </div>
        <div class="text-caption text-grey">

        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn v-close-popup flat color="primary" label="Cancel" />
        <q-btn @click="onLogout" class="primary-color text-white" flat color="primary" icon="logout" label="Proceed" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em" />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth-store';
import { LocalStorage, useQuasar } from 'quasar';
import { ref, computed, onMounted } from 'vue';
import { useUAMStore } from 'src/stores/uam-store';
import PaginationUtil from 'src/utils/pagination.utils';
import AAStatusConstants from 'src/constants/aa-status.constants';
import uamMenu from '../../json/uam.json';
import adminConsoleMenu from '../../json/adminConsole.json';
import sisMenu from '../../json/sis.json';

const visible = ref(false)
const router = useRouter();
const $q = useQuasar();
const authStore = useAuthStore();
const uamStore = useUAMStore();

const confirmLogout = ref(false)
const onLogout = () => {
  authStore.logout();
  router.replace({ name: 'login' });
  window.location.reload();
};

const fullPath = router.currentRoute.value.path;
const brandName = fullPath.split('/')[1];
const currentApplication = computed(() => {
  return uamStore.listOfApps.records.find(
    (record) =>
      record.brandName?.toLocaleLowerCase() === brandName?.toLocaleLowerCase()
  );
});



// Define TypeScript interfaces to describe the structure of the data
interface SubMenu {
  Url: string | null;
  Icon: string;
  Name: string;
  SubMenuClass?: string | null;
  Caption: string;
  Rank?: string;
}

interface Menu {
  MenuGroup: string;
  MenuClass?: string | null;
  Rank?: string;
  Url: string | null;
  Icon: string;
  Name: string;
  Caption: string;
  IsExpandable: boolean;
  SubMenus?: SubMenu[];
}


// Define a mapping of path segments to menus
const menuMap: { [key: string]: Menu[] } = {
  'admin-console': adminConsoleMenu as Menu[],
  'uam': uamMenu as Menu[],
  'sis': sisMenu as Menu[],
};

// Find the menu that matches the current path, default to a fallback menu
const UAMMenus: Menu[] = Object.keys(menuMap).find(key => brandName.includes(key))
  ? menuMap[Object.keys(menuMap).find(key => brandName.includes(key)) as string]
  : uamMenu as Menu[]; // Fallback if no match is found


// Convert the JSON data into a typed array
// const UAMMenus: Menu[] = uamMenu as Menu[];

const groupedMenus = computed(() => {
  return UAMMenus.reduce((groups, menu) => {
    const group = menu.MenuGroup;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(menu);
    return groups;
  }, {} as Record<string, Menu[]>);
});

const getAppsPayload = ref({
  userId: LocalStorage.getItem('userId'),
})

const loaderVisible = ref(true);

const loadMenus = async () => {
  const result = await uamStore.getAllApps(getAppsPayload.value);
  if (result.status == AAStatusConstants.SUCCESS) {
    loaderVisible.value = false;
  } else {
    loaderVisible.value = true;
  }
};


onMounted(() => {
  loadMenus();
});

</script>


<style scoped>
.bottom-fixed {
  position: absolute;
  bottom: 0;
  width: 280px;
  /* Optional, to make it span the full width of the container */
  background-color: #122e49;
  color: #FFFFFF !important;
}
</style>
