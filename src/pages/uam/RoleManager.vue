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
            <q-item-label class="text-h6 text-weight-bold"><q-icon name="o_groups" size="1.5rem" class="q-mr-md" />Role
              Manager
            </q-item-label>
          </div>
        </div>
      </template>
      <template #sub-title>
        <div class="text-h7 text_weight_light">Manage all user roles</div>
      </template>
    </MainBottomHeader>
    <div style="margin-top: -3rem;" class="q-pa-lg">
      <div class="row">
        <div class="col-12 ">
          <short-search-box label="New Role" icon="add_circle" v-model="searchKey"
            @toggleDialog="onshowCreateRoleDialog" :on-refresh="loadRecords" />
          <q-table style="margin-top: 2rem;" flat :filter="searchKey" :loading="paginationUtil.loading"
            v-model:pagination="paginationUtil.pagination" :rows="roleList" :columns="columns" row-key="id" padding>
            <template v-slot:body-cell-RoleStatus="props">
              <q-td key="RoleStatus" :props="props">
                <q-badge v-if="props.row.statusLabel === 'Active'" class="q-pl-md q-pr-md" label="Active" fill
                  color="green-8" style="height: 1.5rem;" />
                <q-badge v-if="props.row.statusLabel === 'Deactivated'" class="q-pl-md q-pr-md" label="Deactivated" fill
                  color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <div class="row wrap justify-between"></div>
                <q-btn-dropdown color="grey-8" dense>
                  <q-list>
                    <q-item clickable @click="onshowUpdateRoleDialog(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Update Role</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onDetermineConfirmationPrompt(props.row as any)"
                      v-if="props?.row?.status == '6' || props?.row?.statusLabel.toLowerCase() == 'deactivated'">
                      <q-item-section side>
                        <q-icon name="o_check_circle" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Enable Role</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onDetermineConfirmationPrompt(props.row as any)"
                      v-if="props?.row?.status == '1' || props?.row?.statusLabel.toLowerCase() == 'active'">
                      <q-item-section side>
                        <q-icon name="o_block" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Disable Role</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable @click="onShowRoleUsers(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_person" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Role Users
                          <q-tooltip class="bg-blue-8" :offset="[10, 10]">
                            Users belonging to this role
                          </q-tooltip>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onShowRolePermissions(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_circle" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Role Permissions
                          <q-tooltip class="bg-blue-8" :offset="[10, 10]">
                            Permissions belonging to this role
                          </q-tooltip>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onShowRoleApps(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_apps" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Role Apps
                          <q-tooltip class="bg-blue-8" :offset="[10, 10]">
                            Apps belonging to this role
                          </q-tooltip>
                        </q-item-label>
                      </q-item-section>
                    </q-item>

                  </q-list>
                </q-btn-dropdown>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </main>

  <my-full-dialog v-model="showRoleDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-12">
        <q-card class="card-shadow full-width-card">
          <q-card-section class="row q-gutter-x-md align-middle">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="User Onboarding" size="4rem" font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-if="!isUpdate">
                User Onboarding
              </div>
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-else>
                User Update
              </div>
              <div class="text-h5 text-weight-light" v-if="!isUpdate">
                Onboard User
              </div>
              <div class="text-h5 text-weight-light" v-else>
                Update User Details
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-form @submit="onDetermineConfirmationPrompt" @reset="onReset">
      <q-card color="primary" animated flat class="card-shadow">
        <q-card-section>
          <div class="row q-col-gutter-x-lg  ">
            <div class="col-md-6">
              <q-input v-model="rolePayload.roleName" label="Role Name *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the role name']" />
            </div>
            <div class="col-md-6">
              <q-input v-model="rolePayload.description" label="Description  *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the role description']" />
            </div>

          </div>
        </q-card-section>
      </q-card>
      <div class="row q-mt-lg justify-evenly q-gutter-x-md">
        <div class="col-5">
          <q-btn color="grey-6" class="full-width" label="Cancel" icon="cancel" :loading="loading" v-close-popup />
        </div>
        <div class="col-5">
          <q-btn color="primary" icon="check" class="full-width" label="Create Role" type="submit" :loading="loading"
            v-if="!isUpdate" />
          <q-btn color="primary" icon="edit" class="full-width" label="Update Role" type="submit" :loading="loading"
            v-else />
        </div>
      </div>
    </q-form>

  </my-full-dialog>

  <confirmation-prompt persistent v-model="showConfirmationPrompt.data" header="Confirm" color="primary" icon="o_send">
    <template #content>
      {{ showConfirmationPrompt?.message }}
    </template>
    <template #buttons>
      <q-btn v-close-popup flat color="primary" label="Cancel" />
      <q-btn class="primary-color text-white" flat color="primary" icon="check" label="Proceed" :loading="loading"
        @click="onProcessRole" />
    </template>
  </confirmation-prompt>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth-store';
import { useWelfareStore } from 'src/stores/welfare-store';
import BottomHeader from 'components/structure/BottomHeader.vue';
import MySearchBox from 'components/utils/MySearchBar.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { LocalStorage, useQuasar } from 'quasar';
import AAStatusConstants from 'src/constants/aa-status.constants';
import PaginationUtil from 'src/utils/pagination.utils';
import FetchDataRequest from 'src/models/FetchDataRequest.model';
import { UAMUserData } from 'src/models/uam/Users.model';
import { useRoute } from 'vue-router';
import { useUAMStore } from 'src/stores/uam-store';
import { UAMRoleData } from 'src/models/uam/Roles.model';
import { UAMAppData } from 'src/models/uam/Apps.model';
import { DateTime } from 'luxon';
import MainBottomHeader from 'components/structure/MainBottomHeader.vue';
import MyFullDialog from 'src/components/utils/MyFullDialog.vue';
import ShapeConstants from 'src/constants/shape.constants';
import MyAvatar from 'src/components/utils/MyAvatar.vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import DateUtil from 'src/utils/date.utils';
import ShortSearchBox from 'components/utils/ShortSearchBar.vue';
import ConfirmationPrompt from 'src/components/custom/ConfirmationPrompt.vue';

// ------------------------------- GLOBAL DECLARATIONS --------------------------------- //
const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const welfareStore = useWelfareStore();
const uamStore = useUAMStore();
const paginationUtil = ref(new PaginationUtil());
const leftDrawerOpen = ref(false);
const store = useAuthStore();
const searchKey = ref('');
const filter = ref(null);
const showRoleDialog = ref(false);
const confirmCreateAppDialog = ref(false);
const confirmUpdateAppDialog = ref(false);
const confirmResetUserDialog = ref(false);
const confirmDisableAppDialog = ref(false);
const confirmEnableAppDialog = ref(false);
const loading = ref(false);
const isUpdate = ref(false);
const route = useRoute();
const username = <any>ref(null);
const roleId = <any>ref(null);

if (LocalStorage.has('email')) {
  username.value = LocalStorage.getItem('email');
};


const now = ref(DateTime.local());

const currentDateTime_ = computed(() => {
  return now.value.toFormat('ccc LLL dd, hh:mm:ss a');
});
// ------------------------------- REQUEST PAYLOAD --------------------------------- //

const actionType = ref('');

const rolePayload = ref(
  {
    roleName: '',
    description: '',
    status: '',
    createdBy: username.value,
    ...(isUpdate.value ? { roleId: '' } : {})

  }
);

const filterEntity = ref({
  pageSize: 1000,
  userId: '',
  userName: '',
  status: '',
  shortName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  createdBy: '',
})



const onshowUpdateRoleDialog = (role: any) => {
  isUpdate.value = true;
  onReset();
  rolePayload.value = {
    roleName: role?.roleName,
    description: role?.description,
    createdBy: username.value,
    roleId: role?.id,
    status: '1'
  };
  showRoleDialog.value = true;
};

const onShowRoleUsers = (role: any) => {
  router.push(`/uam/role-users/${role.id}`);
};


const onShowRolePermissions = (role: any) => {
  router.push(`/uam/role-permissions/${role.id}`);
};

const onShowRoleApps = (role: any) => {
  router.push(`/uam/role-apps/${role.id}`);
};

const showConfirmationPrompt = ref(
  {
    data: false,
    message: ''
  }
);


const onShowConfirmationPrompt = (prompt: any) => {
  showConfirmationPrompt.value.data = true
  showConfirmationPrompt.value.message = prompt;
};
const onDetermineConfirmationPrompt = async (role: any) => {
  if (isUpdate.value == false) {
    actionType.value = 'add';
    const message = 'Are you sure you want to create this role?';
    onShowConfirmationPrompt(message);
  }
  if (isUpdate.value == true) {
    actionType.value = 'update';
    const message = 'Are you sure you want to update this role?';
    onShowConfirmationPrompt(message);
  }
  if (role != null && role?.statusLabel?.toLowerCase() == 'active') { // peform disable
    actionType.value = 'disable';
    roleId.value = role?.id;
    const message = 'Are you sure you want to disable this role?';
    onShowConfirmationPrompt(message);
  }
  if (role != null && role?.statusLabel?.toLowerCase() == 'deactivated') { // peform enable
    actionType.value = 'enable';
    roleId.value = role?.id;
    const message = 'Are you sure you want to enable this role?';
    onShowConfirmationPrompt(message);
  }
};


// ------------------------------- MEMBER METHODS --------------------------------- //

const roleList = computed(() => {
  const search = searchKey.value.toLowerCase();
  return uamStore.listOfRoles.records.filter((user) => {
    return (
      (user.roleName && user.roleName.toLowerCase().includes(search)) ||
      (user.normalizedName && user.normalizedName.toLowerCase().includes(search)) ||
      (user.statusLabel && user.statusLabel.toLowerCase().includes(search))
    );
  });
});

const onProcessRole = async () => {
  loading.value = true;
  let result;
  switch (actionType.value) {
    case 'add':
      result = await uamStore.createRole(rolePayload.value);
      break;
    case 'update':
      result = await uamStore.updateRole(rolePayload.value);
      break;
    case 'disable':
      result = await uamStore.disableRole({
        roleId: roleId.value,
        status: '6',
        statusLabel: 'Deactivated'
      });
      break;
    case 'enable':
      result = await uamStore.enableRole({
        roleId: roleId.value,
        status: '1',
        statusLabel: 'Active'
      });
      break;
    default:
      console.error('Unknown action type:', actionType.value);
      loading.value = false;
      return;
  }
  loading.value = false;
  console.log('result.status', result.status);
  if (result.status === AAStatusConstants.SUCCESS) {
    showRoleDialog.value = false;
    showConfirmationPrompt.value.data = false;
    onReset();
    loadRecords();
    Qnotify('green-8', 'white', 'cloud_done', result.message)
  } else {
    Qnotify('red-8', 'white', 'close', result.message);
  }
};

const Qnotify = async (color: string, textColor: string, icon: string, message: string) => {
  $q.notify({
    color: color,
    textColor: textColor,
    icon: icon,
    position: 'top-right',
    message: message,
  });
};



const loadRecords = async () => {
  getAllRoles()

}
const getAllRoles = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => uamStore.getAllRoles(filterEntity.value),
    fetchData,
    () => uamStore.listOfInstitutions
  );
};

const getAllUsers = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, UAMUserData>(
    uamStore.getAllUsers,
    fetchData,
  );
}




const onReset = () => {
  rolePayload.value = {
    roleName: '',
    description: '',
    status: '',
    createdBy: username.value
  }
}

// ------------------------------- HELPER METHODS --------------------------------- //

const onshowCreateRoleDialog = () => {
  isUpdate.value = false;
  showRoleDialog.value = true;
};


// ------------------------------- TABLE COLUMNS AND ROWS --------------------------------- //

const columns: any = ([
  { name: 'actions', align: 'center', label: 'Action' },
  {
    name: 'RoleName',
    required: true,
    label: 'Role Name',
    align: 'left',
    field: (row: any) => {
      return row?.roleName ?? 0;
    },
  },
  {
    name: 'NormalizedRoleName', align: 'left', label: 'Role Code', field: 'normalizedName', required: true,
  },
  {
    name: 'Description', align: 'left', label: 'Role Code', field: 'description', required: true,
  },
  { name: 'RoleStatus', align: 'center', label: 'Role Status', field: 'status' },
  { name: 'CreatedBy', align: 'center', label: 'Created By', field: 'createdBy' },
  {
    name: 'CreatedAt',
    label: 'Created At',
    align: 'center',
    field: (row: any) => {
      return DateUtil.formatCustomDate(row?.createdAt);
    },
  },
]);

// ------------------------------- ON MOUNTED --------------------------------- //

onMounted(() => {
  loadRecords()
});

</script>

<style scoped></style>
