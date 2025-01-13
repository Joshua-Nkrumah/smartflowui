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



            <!-- <q-item-label header class="text-bold">User</q-item-label>

            <q-item clickable tag="a" to="/uam/user-manager">
              <q-item-section avatar>
                <q-icon name="fa-solid fa-users" color="primary" />
              </q-item-section>
              <q-item-section color="grey-1">
                <q-item-label color="grey-1">User Manager</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable tag="a" to="/uam/user_activity">
              <q-item-section avatar>
                <q-icon name="account_circle" color="primary" />
              </q-item-section>
              <q-item-section color="grey-1">
                <q-item-label color="grey-1">User Activity</q-item-label>
              </q-item-section>
            </q-item>

            <q-item-label header class="text-bold">Role and Permissions</q-item-label>


            <div style="display: flex; flex-direction: column;">
              <q-expansion-item expand-icon-toggle expand-separator class="text-primary-color" icon="subscriptions"
                label="Access Control">
                <q-separator />
                <q-card style="margin-top: -1rem;">
                  <q-card-section>
                    <q-item clickable tag="a" to="/uam/roles">
                      <q-item-section avatar>
                        <q-icon name="attribution" color="primary" />
                      </q-item-section>
                      <q-item-section color="grey-1">
                        <q-item-label color="grey-1">Roles</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable tag="a" to="/uam/apps">
                      <q-item-section avatar>
                        <q-icon name="apps " color="primary" />
                      </q-item-section>
                      <q-item-section color="grey-1">
                        <q-item-label color="grey-1">Apps </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable tag="a" to="/uam/category">
                      <q-item-section avatar>
                        <q-icon name="o_category" color="primary" />
                      </q-item-section>
                      <q-item-section color="grey-1">
                        <q-item-label color="grey-1">App Categories</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable tag="a" to="/uam/permissions">
                      <q-item-section avatar>
                        <q-icon name="o_circle" color="primary" />
                      </q-item-section>
                      <q-item-section color="grey-1">
                        <q-item-label color="grey-1">Permissions</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>


            <q-item-label header class="text-bold">Institution</q-item-label>

            <q-item clickable tag="a" to="/uam/institutions">
              <q-item-section avatar>
                <q-icon name="o_diversity_1" color="primary" />
              </q-item-section>
              <q-item-section color="grey-1">
                <q-item-label color="grey-1">Institutions</q-item-label>
              </q-item-section>
            </q-item>

            <div style="display: flex; flex-direction: column;">
              <q-expansion-item expand-icon-toggle expand-separator class="text-primary-color"
                icon="fa-solid fa-layer-group" label="Subscriptions">
                <q-separator />
                <q-card style="margin-top: -1rem;">
                  <q-card-section>
                    <q-item clickable tag="a" to="/uam/subscription-plans">
                      <q-item-section avatar>
                        <q-icon name="fa-solid fa-gift fa-xl" color="primary" />
                      </q-item-section>
                      <q-item-section color="grey-1">
                        <q-item-label color="grey-1">Plans and Features</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable tag="a" to="/uam/institution-subscriptions">
                      <q-item-section avatar>
                        <q-icon name="apps " color="primary" />
                      </q-item-section>
                      <q-item-section color="grey-1">
                        <q-item-label color="grey-1">Institution Subscriptions</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div> -->


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
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth-store';
import { LocalStorage, useQuasar } from 'quasar';
import { ref, computed } from 'vue';
import uamMenu from '../../json/uam.json';
import { useUAMStore } from 'src/stores/uam-store';

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
const selectedLanguage = ref('');

const languageOptions = ref([
  { label: 'English', value: 'en', description: 'English', icon: 'mail' },
  { label: 'Deutsch', value: 'de', description: 'German', icon: 'mail' }
]);

const selectLanguage = (language: string) => {
  selectedLanguage.value = language;
  LocalStorage.set('language', selectedLanguage.value);
};

const fullPath = router.currentRoute.value.path;
const brandName = fullPath.split('/')[1];
const currentApplication = computed(() => {
  console.log('appName', brandName);
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

// Convert the JSON data into a typed array
const UAMMenus: Menu[] = uamMenu as Menu[];

// Create a computed property to group menus by `MenuGroup`
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

console.log('Menu', UAMMenus)
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
