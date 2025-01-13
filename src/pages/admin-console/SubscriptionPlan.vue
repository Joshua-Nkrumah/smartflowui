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
            <q-item-label class="text-h6 text-weight-bold"><q-icon name="app_registration" size="1.5rem"
                class="q-mr-md" />Subscription Plans
            </q-item-label>
          </div>
        </div>
      </template>
      <template #sub-title>
        <div class="text-h7 text_weight_light">Manage all subscription plans and features</div>
      </template>
    </MainBottomHeader>
    <div style="margin-top: -3rem;" class="q-pa-lg">
      <div class="row">
        <div class="col-12 ">
          <short-search-box label="New Plan" icon="add_circle" v-model="searchKey" @toggleDialog="onshowAppDialog"
            :on-refresh="loadRecords" />
          <q-table style="margin-top: 2rem;" flat :filter="searchKey" :loading="paginationUtil.loading"
            v-model:pagination="paginationUtil.pagination" :rows="subscriptionPlanList" :columns="columns" row-key="id"
            padding>
            <template v-slot:body-cell-PlanStatus="props">
              <q-td key="PlanStatus" :props="props">
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
                    <q-item clickable @click="onshowUpdatePlanDialog(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Update Plan</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowPlanAppRoleDialog(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_apps" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Plan Apps and Roles</q-item-label>
                      </q-item-section>
                    </q-item>

                    <!-- <q-item clickable @click="onshowUpdatePlanDialog(props.row as any)">
                      <q-item-section side>
                        <q-icon name="fa-solid fa-gift fa-xl" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Plan Features</q-item-label>
                      </q-item-section>
                    </q-item> -->
                    <q-separator />
                    <q-item clickable @click="onDetermineConfirmationPrompt(props.row as any)"
                      v-if="props?.row?.status == '6' || props?.row?.statusLabel.toLowerCase() == 'deactivated'">
                      <q-item-section side>
                        <q-icon name="o_check_circle" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Enable Plan</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onDetermineConfirmationPrompt(props.row as any)"
                      v-if="props?.row?.status == '1' || props?.row?.statusLabel.toLowerCase() == 'active'">
                      <q-item-section side>
                        <q-icon name="o_block" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Disable Plan</q-item-label>
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

  <my-full-dialog v-model="showPlanDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-12">
        <q-card class="card-shadow full-width-card">
          <q-card-section class="row q-gutter-x-md align-middle">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="Subscription Plan" size="4rem" font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-if="!isUpdate">
                Add Plan
              </div>
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-else>
                User Plan
              </div>
              <div class="text-h5 text-weight-light" v-if="!isUpdate">
                Add Plan
              </div>
              <div class="text-h5 text-weight-light" v-else>
                Update Plan
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
            <div class="col-md-12">
              <!-- {{ subscriptionTypePayload }} -->
              <q-select v-model="subscriptionTypePayload.roleIds" :options="roleList" label="Role(s) *" lazy-rules
                transition-show="scale" transition-hide="scale" behavior="default" option-value="id"
                option-label="roleName" emit-value map-options
                :rules="[val => val.length > 0 || 'Please select the role(s)']" multiple></q-select>
            </div>

            <div class="col-md-12">
              <!-- {{ subscriptionTypePayload.roleIds }} -->
              <q-select v-model="subscriptionTypePayload.appIds" :options="appList" label="App(s) *" lazy-rules
                transition-show="scale" transition-hide="scale" behavior="default" option-value="id"
                option-label="appName" emit-value map-options
                :rules="[val => val.length > 0 || 'Please select the app(s)']" multiple></q-select>
            </div>
            <div class="col-md-12">
              <q-select v-model="subscriptionTypePayload.currency" :options="currencyList" label="Currency *" lazy-rules
                transition-show="scale" transition-hide="scale" behavior="default" option-value="value"
                option-label="name" emit-value map-options
                :rules="[val => val.length > 0 || 'Please select the currency']"></q-select>
            </div>
            <div class="col-md-6">
              <q-input v-model="subscriptionTypePayload.name" label="Plan Name *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the plan\'s name']" />
            </div>
            <div class="col-md-6">
              <q-input v-model="subscriptionTypePayload.brandName" label="Brand Name *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the plan\'s brand name']" />
            </div>
            <div class="col-md-6">
              <q-input v-model="subscriptionTypePayload.monthlyAmount" label="Monthly Amount  *" lazy-rules :rules="[
            (val) => (val && Number(val) && val > 0) || 'Enter plan\'s monthly amount'
          ]" />
            </div>
            <div class="col-md-6">
              <q-input v-model="subscriptionTypePayload.description" label="Description *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the application\'s description']" />
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="row q-mt-lg justify-evenly q-gutter-x-md">
        <div class="col-5">
          <q-btn color="grey-6" class="full-width" label="Cancel" icon="cancel" :loading="loading" v-close-popup />
        </div>
        <div class="col-5">
          <q-btn color="primary" icon="check" class="full-width" label="Create Plan" type="submit" :loading="loading"
            v-if="!isUpdate" />
          <q-btn color="primary" icon="edit" class="full-width" label="Update Plan" type="submit" :loading="loading"
            v-else />
        </div>
      </div>
    </q-form>
  </my-full-dialog>


  <my-full-dialog v-model="showPlanAppRoleDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-12">
        <q-card class="card-shadow full-width-card">
          <q-card-section class="row q-gutter-x-md align-middle">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="Subscription Plan" size="4rem" font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey">
                Subscription Plan
              </div>
              <div class="text-h5 text-weight-light">
                Subscription Apps and Roles
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-card class="card-shadow full-width-card">
      <q-card-section class="row q-gutter-x-md">
        <div class="col-6 ">
          <div class="text-h6">Applications</div>
          <!-- {{ subscriptionPlanAppList }} -->
          <q-list bordered padding>
            <q-item v-for="app in subscriptionPlanAppList" :key="app?.id">
              <q-item-section top avatar>
                <my-avatar :shape="ShapeConstants.ROUNDED" label="Subscription Apps" size="4rem" font-size="1.2rem" />
              </q-item-section>

              <q-item-section>
                <q-item-label overline class="text-bold text-subtitle2">{{ app?.statusLabel }}</q-item-label>
                <q-item-label class="text-bold text-h6">{{ app?.appName }}</q-item-label>
                <q-item-label caption class="text-bold text-subtitle1">{{ app?.description }}</q-item-label>
                <q-item-label></q-item-label>
                <q-item-label caption>{{ }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-5">
          <div class="text-h6">Roles</div>
          <q-list bordered padding>
            <q-item v-for="app in subscriptionPlanRoleList" :key="app?.id">
              <q-item-section top avatar>
                <my-avatar :shape="ShapeConstants.ROUNDED" label="Subscription Roles" size="4rem" font-size="1.2rem" />
              </q-item-section>

              <q-item-section>
                <q-item-label overline class="text-bold text-subtitle2">{{ app?.statusLabel }}</q-item-label>
                <q-item-label class="text-bold text-h6">{{ app?.roleName }}</q-item-label>
                <q-item-label caption class="text-bold text-subtitle1">{{ app?.description }}</q-item-label>
                <q-item-label></q-item-label>
                <q-item-label caption>{{ }}</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-item-label caption>Date: {{ DateUtil.formatCustomDate(app?.createdAt as any)
                  }}</q-item-label>
                <q-item-label caption>Role Code: {{ app?.normalizedName }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

        </div>


      </q-card-section>
    </q-card>

  </my-full-dialog>

  <confirmation-prompt persistent v-model="showConfirmationPrompt.data" header="Confirm" color="primary" icon="o_send">
    <template #content>
      {{ showConfirmationPrompt?.message }}
    </template>
    <template #buttons>
      <q-btn v-close-popup flat color="primary" label="Cancel" />
      <q-btn class="primary-color text-white" flat color="primary" icon="check" label="Proceed" :loading="loading"
        @click="onProcessPlans" />
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
import { SubscriptionPlanRecord } from 'src/models/uam/SubscriptionPlan.model';

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
const showPlanDialog = ref(false);
const showPlanAppRoleDialog = ref(false);
const loading = ref(false);
const isUpdate = ref(false);
const selectedPlan = ref(false);
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


const subscriptionTypePayload = <any>ref(
  {
    brandName: '',
    name: '',
    appIds: [],
    roleIds: [],
    description: '',
    currency: '',
    monthlyAmount: '',
    createdBy: username.value,
    ...(isUpdate.value ? { SubscriptionTypeId: '' } : {})

  }
);


const currencyList = ref([
  {
    name: 'Ghana Cedis',
    value: 'GHS',
  },
  {
    name: 'United State Dollar',
    value: 'USD',
  }
])

const appList = computed(() => {
  const search = searchKey.value.toLowerCase();
  return uamStore.listOfApps.records.filter((app) => {
    return (
      (app.appName && app.appName.toLowerCase().includes(search)) ||
      (app.appOwner && app.appOwner.toLowerCase().includes(search)) ||
      (app.brandName && app.brandName.toLowerCase().includes(search)) ||
      (app.caption && app.caption.toLowerCase().includes(search)) ||
      (app.description && app.description.toLowerCase().includes(search))
    );
  });
});

const subscriptionPlanList = computed(() => {
  const search = searchKey.value.toLowerCase();
  return uamStore.listOfSubcriptionPlans.records.filter((plan) => {
    return (
      (plan.name && plan.name.toLowerCase().includes(search)) ||
      (plan.brandName && plan.brandName.toLowerCase().includes(search))
    );
  });
});

const subscriptionPlanAppList = computed(() => {
  // Flatten the list of apps from each subscription plan
  const selectPlan = uamStore.listOfSubcriptionPlans.records.filter((plan) => plan.id?.toString() === selectedPlan.value.toString());
  return selectPlan.flatMap(plan => plan.apps);
});

const subscriptionPlanRoleList = computed(() => {
  // Flatten the list of apps from each subscription plan
  const selectPlan = uamStore.listOfSubcriptionPlans.records.filter((plan) => plan.id?.toString() === selectedPlan.value.toString());
  return selectPlan.flatMap(plan => plan.roles);
});


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

const filterEntity = ref(
  {
    paginationParameters: {
      pageNumber: 1,
      pageSize: 10
    },
    subscriptionTypeId: '',
    name: ''
  }
)

const filterEntity_ = ref({
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

const onshowUpdatePlanDialog = (plan: any) => {
  isUpdate.value = true;
  onReset();
  console.log('plan', plan)
  subscriptionTypePayload.value = {
    brandName: plan.brandName,
    name: plan.name,
    appIds: plan.apps,
    currency: plan.currency,
    roleIds: plan.roles,
    description: plan.description,
    monthlyAmount: plan.monthlyAmount,
    createdBy: username.value,
    SubscriptionTypeId: plan.id
  }
  showPlanDialog.value = true;
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
    const message = 'Are you sure you want to create this plan?';
    onShowConfirmationPrompt(message);
  }
  if (isUpdate.value == true) {
    actionType.value = 'update';
    const message = 'Are you sure you want to update this plan?';
    onShowConfirmationPrompt(message);
  }
  if (role != null && role?.statusLabel?.toLowerCase() == 'active') { // peform disable
    actionType.value = 'disable';
    roleId.value = role?.id;
    const message = 'Are you sure you want to disable this plan?';
    onShowConfirmationPrompt(message);
  }
  if (role != null && role?.statusLabel?.toLowerCase() == 'deactivated') { // peform enable
    actionType.value = 'enable';
    roleId.value = role?.id;
    const message = 'Are you sure you want to enable this plan?';
    onShowConfirmationPrompt(message);
  }
};


// ------------------------------- MEMBER METHODS --------------------------------- //



const onProcessPlans = async () => {
  loading.value = true;
  let result;
  switch (actionType.value) {
    case 'add':
      result = await uamStore.createSubscriptionPlan(subscriptionTypePayload.value);
      break;
    case 'update':
      subscriptionTypePayload.value.appIds = subscriptionTypePayload.value.appIds.map((app: any) => app.id);
      subscriptionTypePayload.value.roleIds = subscriptionTypePayload.value.roleIds.map((role: any) => role.id);
      console.log('update apps', subscriptionTypePayload.value.appIds);
      result = await uamStore.updateSubscriptionPlan(subscriptionTypePayload.value);
      break;
    case 'disable':
      result = await uamStore.disableSubscriptionPlan({
        AppId: roleId.value,
        status: '6',
        statusLabel: 'Deactivated'
      });
      break;
    case 'enable':
      result = await uamStore.enableSubscriptionPlan({
        AppId: roleId.value,
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
    showPlanDialog.value = false;
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

const gotoMemberHistory = (member: any) => {
  router.push(`/welfare/members-history/${member.memberId}`);
};

const loadRecords = async () => {
  getAllSubscriptionPlans()
  getAllApps()
  getAllCategory()
  getAllRoles()
}

const getAllRoles = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => uamStore.getAllRoles(filterEntity_.value),
    fetchData,
    () => uamStore.listOfInstitutions
  );
};

const getAllSubscriptionPlans = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => uamStore.getAllSubscriptionTypes(filterEntity.value),
    fetchData,
    () => uamStore.listOfSubcriptionPlans
  );
};

const getAllCategory = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => uamStore.getAllCategory(filterEntity_.value),
    fetchData,
    () => uamStore.listOfCategories
  );
};


const getAllApps = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => uamStore.getAllApps(filterEntity_.value),
    fetchData,
    () => uamStore.listOfApps
  );
};


const onReset = () => {
  subscriptionTypePayload.value = {
    brandName: '',
    name: '',
    appIds: [],
    roleIds: [],
    description: '',
    monthlyAmount: '',
    currency: '',
    createdBy: '',
    SubscriptionTypeId: ''
  }
}

// ------------------------------- HELPER METHODS --------------------------------- //

const onshowAppDialog = () => {
  onReset();
  isUpdate.value = false;
  showPlanDialog.value = true;
};


const onshowPlanAppRoleDialog = (plan: any) => {
  selectedPlan.value = plan?.id;
  showPlanAppRoleDialog.value = true;
};




// ------------------------------- TABLE COLUMNS AND ROWS --------------------------------- //

const columns: any = ([
  { name: 'actions', align: 'center', label: 'Action' },
  {
    name: 'PlanName',
    required: true,
    label: 'Plan Name',
    align: 'left',
    field: (row: SubscriptionPlanRecord) => {
      return row?.name ?? 0;
    },
  },
  {
    name: 'BrandName',
    required: true,
    label: 'Brand Name',
    align: 'left',
    field: (row: SubscriptionPlanRecord) => {
      return row?.brandName ?? 0;
    },
  },
  {
    name: 'PlanStatus', align: 'center', label: 'Status', field: (row: SubscriptionPlanRecord) => {
      return row?.statusLabel ?? 0;
    },
  },
  {
    name: 'Currency', align: 'center', label: 'Currency', field: (row: SubscriptionPlanRecord) => {
      return row?.currency ?? 0;
    },
  },
  {
    name: 'MonthlyAmount',
    required: true,
    label: 'Monthly Amount',
    align: 'center',
    field: (row: SubscriptionPlanRecord) => {
      const amount = row?.monthlyAmount ?? 0;
      return `${amount} .00`;
    },
  },
  {
    name: 'MidYearAmount',
    required: true,
    label: 'Mid Year Amount',
    align: 'center',
    field: (row: SubscriptionPlanRecord) => {
      const amount = row?.midYearAmount ?? 0;
      return `${amount} .00`;
    },
  },
  {
    name: 'QuarterlyAmount',
    required: true,
    label: 'Quarterly Amount',
    align: 'center',
    field: (row: SubscriptionPlanRecord) => {
      const amount = row?.quartelyAmount ?? 0;
      return `${amount} .00`;
    },
  },
  {
    name: 'TerminalAmount',
    required: true,
    label: 'Quarterly Amount',
    align: 'center',
    field: (row: SubscriptionPlanRecord) => {
      const amount = row?.terminalAmount ?? 0;
      return `${amount} .00`;
    },
  },
  {
    name: 'AnnualAmount',
    required: true,
    label: 'Annual Amount',
    align: 'left',
    field: (row: SubscriptionPlanRecord) => {
      const amount = row?.annualAmount ?? 0;
      return `${amount} .00`;
    },
  },
  {
    name: 'Description', align: 'left', label: 'Description', field: 'description', required: true,
  },
  // { name: 'CreatedBy', align: 'center', label: 'Created By', field: 'createdBy' },,
  {
    name: 'CreatedAt',
    label: 'Created At',
    align: 'center',
    field: (row: any) => {
      return DateUtil.formatCustomDate(row?.createdAt?.toString());
    },
  },
]);

// ------------------------------- ON MOUNTED --------------------------------- //

onMounted(() => {
  setInterval(() => {
    now.value = DateTime.local();
  }, 1000);
  loadRecords()
});

</script>

<style scoped></style>
