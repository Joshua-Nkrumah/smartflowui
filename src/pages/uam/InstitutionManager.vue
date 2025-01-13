<template>
  <main class="main-content">
    <MainBottomHeader>
      <template #actions>
        <div style=" margin-top: -1.5rem; color: white" class="text-h6 gt-md primary-color-light text-bold ">
          {{ currentDateTime }}
          <q-icon color="secondary" @click="$q.fullscreen.toggle()"
            :name="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" size="2.5rem" style="cursor: pointer;" />
        </div>
      </template>
      <template #title>
        <div class="row q-col-gutter-x-md">
          <div class="row items-center">
            <q-item-label class="text-h6 text-weight-bold"><q-icon name="o_corporate_fare" size="1.5rem"
                class="q-mr-md" />Institutions
              Manager</q-item-label>
          </div>
        </div>
      </template>
      <template #sub-title>
        <div class="text-h7 text_weight_light">Manage all institutions</div>
      </template>
    </MainBottomHeader>
    <div style="margin-top: -3rem;" class="q-pa-lg">
      <div class="row">
        <div class="col-12 ">
          <short-search-box label="New Institution" icon="add_business" v-model="searchKey"
            @toggleDialog="onShowInstitutionDialog" :on-refresh="loadRecords" />
          <q-table style="margin-top: 2rem;" flat :filter="searchKey" :loading="paginationUtil.loading"
            v-model:pagination="paginationUtil.pagination" :rows="institutionList" :columns="columns" row-key="Id"
            padding>

            <template v-slot:body-cell-InstitutionStatus="props">
              <q-td key="InstitutionStatus" :props="props">
                <q-badge v-if="props.row?.statusLabel === 'Active'" class="q-pl-md q-pr-md" label="Active" fill
                  color="green-8" style="height: 1.5rem;" />
                <q-badge v-if="props.row?.statusLabel === 'Deactivated'" class="q-pl-md q-pr-md" label="Deactivated"
                  fill color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>
            <template v-slot:body-cell-DomainName="props">
              <q-td key="DomainName" :props="props">
                <router-link :to="props.row.domainName"></router-link>
                <q-badge class="q-pl-md q-pr-md" fill color="orange-8" style="height: 1.5rem;">
                  {{ props.row.domainName }}
                </q-badge>
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <div class="row wrap justify-between"></div>
                <q-btn-dropdown color="grey-8" dense>
                  <q-list>
                    <q-item clickable @click="onshowUpdateInstitutionDialog(props.row as InstitutionRecord)">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Update Institution</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onDetermineConfirmationPrompt(props.row as InstitutionRecord)"
                      v-if="props?.row?.status == '6' || props?.row?.statusLabel.toLowerCase() == 'deactivated'">
                      <q-item-section side>
                        <q-icon name="o_check_circle" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Enable Institution</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onDetermineConfirmationPrompt(props.row as InstitutionRecord)"
                      v-if="props?.row?.status == '1' || props?.row?.statusLabel.toLowerCase() == 'active'">
                      <q-item-section side>
                        <q-icon name="o_block" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Disable Institution</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowUpdateInstitutionDialog(props.row as InstitutionRecord)">
                      <q-item-section side>
                        <q-icon name="share" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Branches</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowInstitutionSubscriptionDialog(props.row as InstitutionRecord)">
                      <q-item-section side>
                        <q-icon name="fa-solid fa-gift fa-xl" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Subscribe to a Plan</q-item-label>
                      </q-item-section>
                    </q-item>
                    <!-- <q-item clickable @click="onShowSubscriptionDetails(props.row as InstitutionRecord)">
                      <q-item-section side>
                        <q-icon name="fa-solid fa-box-open" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>View Subscription</q-item-label>
                      </q-item-section>
                    </q-item> -->
                  </q-list>
                </q-btn-dropdown>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </main>

  <my-full-dialog v-model="showInstitutionDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-12">
        <q-card class="card-shadow full-width-card">
          <q-card-section class="row q-gutter-x-md align-middle">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="Institution Onboarding" size="4rem"
                font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-if="!isUpdate">
                Institution Onboarding
              </div>
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-else>
                Institution Update
              </div>
              <div class="text-h5 text-weight-light" v-if="!isUpdate">
                Onboard Institution
              </div>
              <div class="text-h5 text-weight-light" v-else>
                Update Institution Details
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
            <div class="col-md-6 col-12">
              <q-input v-model="institutionPayload.name" label="Institution Name *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the institutions\'s name']" />
            </div>
            <div class="col-md-6 col-12">
              <q-input v-model="institutionPayload.shortName" label="Short Name *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the short name ']" />
            </div>
            <div class="col-md-6 col-12">
              <multiple-contacts :isUpdate="isUpdate" :initialContacts="institutionPayload.contacts"
                @getContacts="handleContactsChanged"></multiple-contacts>
            </div>
            <div class="col-md-6 col-12">
              <multiple-emails :isUpdate="isUpdate" :initialEmails="institutionPayload.emailAddresses"
                @getEmailAddresses="handleEmailsChanged"></multiple-emails>
            </div>
            <div class="col-md-6 col-12">
              <q-input v-model="institutionPayload.description" label="Description *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the description']" />
            </div>
            <div class="col-md-6 col-12">
              <q-input v-model="institutionPayload.rank" label="Institution Rank *" lazy-rules :rules="[
            (val) => (val && Number(val) && val > 0) || 'Enter the institution rank'
          ]" />
            </div>
            <div class="col-md-6 col-12">
              <q-input v-model="institutionPayload.domainName" label="Domain Name *" lazy-rules />
            </div>
            <div class="col-md-6">
              <q-input v-model="institutionPayload.websiteUrl" label="Website  *" lazy-rules />
            </div>
            <div class="col-md-6 col-12">
              <q-input v-model="institutionPayload.country" label="Country  *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the country']" />
            </div>
            <div class="col-md-6 col-12">
              <q-input v-model="institutionPayload.address" label="Address  *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the address']" />
            </div>
            <div class="col-md-6 col-12">
              <q-input v-model="institutionPayload.city" label="City  *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the city']" />
            </div>
            <div class="col-md-6 col-12">
              <q-input v-model="institutionPayload.zipCode" label="Zip Code  *" lazy-rules />
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="row q-mt-lg justify-evenly q-gutter-x-md">
        <div class="col-5">
          <q-btn color="grey-6" class="full-width" label="Cancel" icon="cancel" :loading="loading" v-close-popup />
        </div>
        <div class="col-5">
          <q-btn color="primary" class="full-width" label="Onboard Institution" icon="check" type="submit"
            :loading="loading" v-if="!isUpdate" />
          <q-btn color="primary" class="full-width" label="Update Institution" icon="check" type="submit"
            :loading="loading" v-else />
        </div>

      </div>
    </q-form>
  </my-full-dialog>


  <my-full-dialog v-model="showInstitutionSubscriptionDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-12">
        <q-card class="card-shadow full-width-card">
          <q-card-section class="row q-gutter-x-md align-middle">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="Institution Subscription" size="4rem"
                font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-if="!isUpdate">
                Institution Subscription
              </div>
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-else>
                Institution Subscription Update
              </div>
              <div class="text-h5 text-weight-light" v-if="!isUpdate">
                Institution Subscription
              </div>
              <div class="text-h5 text-weight-light" v-else>
                Update Institution Subscription Details
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-form @submit="onSubscriptionConfirmationPrompt" @reset="onReset">
      <q-card color="primary" animated flat class="card-shadow">
        <q-card-section>
          <div class="row q-col-gutter-x-lg  ">
            <div class="col-md-12">
              {{ subscriptionPayload.subscriptionTypeId }}
              <q-select v-if="isUpdate == false" v-model="subscriptionPayload.subscriptionTypeId"
                :options="subscriptionPlanList" label="Subscription Plan *" lazy-rules transition-show="scale"
                transition-hide="scale" behavior="default" option-value="id" option-label="name" emit-value map-options
                :rules="[val => val != null || 'Please select the subscription plan']"></q-select>
            </div>
            <div class="col-md-12">
              {{ subscriptionPayload.duration }}
              <q-select v-if="isUpdate == false" v-model="subscriptionPayload.duration" :options="SubscriptionDuration"
                label="Subscription Duration *" lazy-rules transition-show="scale" transition-hide="scale"
                behavior="default" option-value="value" option-label="name" emit-value map-options
                :rules="[val => val != null || 'Please select the subscription duration']"></q-select>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="row q-mt-lg justify-evenly q-gutter-x-md">
        <div class="col-5">
          <q-btn color="grey-6" class="full-width" label="Cancel" icon="cancel" :loading="loading" v-close-popup />
        </div>
        <div class="col-5">
          <q-btn color="primary" class="full-width" label="Subscribe" icon="check" type="submit" :loading="loading"
            v-if="!isUpdate" />
          <q-btn color="primary" class="full-width" label="Resubscribe" icon="check" type="submit" :loading="loading"
            v-else />
        </div>

      </div>
    </q-form>
  </my-full-dialog>


  <confirmation-prompt v-model="showConfirmationPrompt.data" header="Confirm" color="primary" icon="o_send">
    <template #content>
      {{ showConfirmationPrompt?.message }}
    </template>
    <template #buttons>
      <q-btn v-close-popup flat color="primary" label="Cancel" />
      <q-btn class="primary-color text-white" flat color="primary" icon="check" @click="onProcessInstitution"
        label="Proceed" :loading="loading" />
    </template>
  </confirmation-prompt>



</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth-store';
import { useWelfareStore } from 'src/stores/welfare-store';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { LocalStorage, useQuasar } from 'quasar';
import AAStatusConstants from 'src/constants/aa-status.constants';
import PaginationUtil from 'src/utils/pagination.utils';
import FetchDataRequest from 'src/models/FetchDataRequest.model';
import { UAMUserData } from 'src/models/uam/Users.model';
import { useRoute } from 'vue-router';
import { useUAMStore } from 'src/stores/uam-store';
import { InstitutionRecord } from 'src/models/uam/Institutions.model';
import { DateTime } from 'luxon';
import MainBottomHeader from 'components/structure/MainBottomHeader.vue';
import MyFullDialog from 'src/components/utils/MyFullDialog.vue';
import ConfirmationPrompt from 'src/components/custom/ConfirmationPrompt.vue';
import ShapeConstants from 'src/constants/shape.constants';
import MyAvatar from 'src/components/utils/MyAvatar.vue';
import ShortSearchBox from 'components/utils/ShortSearchBar.vue';
import MultipleContacts from 'components/custom/MultipleContacts.vue';
import MultipleEmails from 'components/custom/MultipleEmails.vue';
import DateUtil from 'src/utils/date.utils';




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
const showInstitutionDialog = ref(false);
const showInstitutionSubscriptionDialog = ref(false);
const actionType = ref('');
const loading = ref(false);
const step = ref(1);

const showContributionDialog = ref(false);
const showDonationDialog = ref(false);
const isUpdate = ref(false);


const memberId = ref('');
const route = useRoute();

const username = <any>ref(null);
const institution_id = <any>ref(null);
const short_name = <any>ref('');


const getDomainName = computed(() => {
  return `https://${short_name.value}.cleverchap.com`
});

if (LocalStorage.has('email')) {
  username.value = LocalStorage.getItem('email');
};

const label = ref('Click me');

const now = ref(DateTime.local());

const currentDateTime = computed(() => {
  return now.value.toFormat('ccc LLL dd, hh:mm:ss a');
});

const handleEmailsChanged = (emails: Array<string>) => {
  institutionPayload.value.emailAddresses = emails;
};

const handleContactsChanged = (contacts: Array<string>) => {
  institutionPayload.value.contacts = contacts;
};

// ------------------------------- REQUEST PAYLOAD --------------------------------- //
const institutionPayload = ref({
  name: '',
  description: '',
  shortName: '',
  domainName: '',
  websiteUrl: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  status: '1',
  rank: '',
  contacts: [] as string[],
  emailAddresses: [] as string[],
  address: '',
  createdBy: username.value,
  ...(isUpdate.value ? { institutionId: '' } : {})
});


const subscriptionPayload = ref({
  subscriptionTypeId: '',
  institutionId: institution_id.value,
  duration: '',
  createdBy: username.value,
});

const filterEntity = ref({
  pageSize: 1000,
  userId: '',
  insCode: '',
  status: '',
  shortName: '',
  lastName: '',
  domainName: '',
  phoneNumber: 'string',
  createdBy: 'string',
})

const showConfirmationPrompt = ref(
  {
    data: false,
    message: ''
  }
);


// ------------------------------- MEMBER METHODS --------------------------------- //



const SubscriptionDuration = ref([
  {
    name: 'Monthly - 1',
    value: 'monthly'
  },
  {
    name: 'Termly - 3',
    value: 'termly'
  },
  {
    name: 'Mid-Yearly - 6',
    value: 'mid-yearly'
  },
  {
    name: 'Annualy - 12',
    value: 'annualy'
  },
  {
    name: 'Quarterly - 4',
    value: 'quarterly'
  }
])

const subscriptionPlanList = computed(() => {
  const search = searchKey.value.toLowerCase();
  return uamStore.listOfSubcriptionPlans.records.filter((plan) => {
    return (
      (plan.name && plan.name.toLowerCase().includes(search)) ||
      (plan.brandName && plan.brandName.toLowerCase().includes(search))
    );
  });
});

const institutionList = computed(() => {
  const search = searchKey.value.toLowerCase();
  return uamStore.listOfInstitutions.records.filter((institution) => {
    return (
      (institution.name && institution.name.toLowerCase().includes(search)) ||
      (institution.shortName && institution.shortName.toLowerCase().includes(search)) ||
      (institution.domainName && institution.domainName.toLowerCase().includes(search)) ||
      (institution.city && institution.city.toLowerCase().includes(search)) ||
      (institution.state && institution.state.toLowerCase().includes(search)) ||
      (institution.country && institution.country.toLowerCase().includes(search)) ||
      (institution.contacts && institution.contacts.some(contact => contact.toLowerCase().includes(search))) ||
      (institution.emailAddresses && institution.emailAddresses.some(email => email.toLowerCase().includes(search))) ||
      (institution.statusLabel && institution.statusLabel.toLowerCase().includes(search)) ||
      (institution.zipCode && institution.zipCode.toLowerCase().includes(search)) ||
      (institution.address && institution.address.toLowerCase().includes(search)) ||
      (institution.description && institution.description.toLowerCase().includes(search))
    );
  });
});


const onDetermineConfirmationPrompt = async (institution: any) => {
  if (isUpdate.value == false) {
    actionType.value = 'add';
    const message = 'Are you sure you want to onboard this institution?';
    onShowConfirmationPrompt(message);
  }
  if (isUpdate.value == true) {
    actionType.value = 'update';
    const message = 'Are you sure you want to update this institution?';
    onShowConfirmationPrompt(message);
  }
  if (institution != null && institution?.statusLabel.toLowerCase() == 'active') { // peform disable
    actionType.value = 'disable';
    institution_id.value = institution?.id;
    const message = 'Are you sure you want to disable this institution?';
    onShowConfirmationPrompt(message);
  }
  if (institution != null && institution?.statusLabel.toLowerCase() == 'deactivated') { // peform enable
    actionType.value = 'enable';
    institution_id.value = institution?.id;
    const message = 'Are you sure you want to enable this institution?';
    onShowConfirmationPrompt(message);
  }
};

const onSubscriptionConfirmationPrompt = async () => {

  actionType.value = 'add-subscription';
  const message = 'Do you want to subscribe this institution to this plan?';
  onShowConfirmationPrompt(message);

};

actionType


const onProcessInstitution = async () => {
  loading.value = true;
  let result;
  switch (actionType.value) {
    case 'add':
      result = await uamStore.createInstitution(institutionPayload.value);
      break;
    case 'update':
      result = await uamStore.updateInstitution(institutionPayload.value);
      break;
    case 'add-subscription':
      result = await uamStore.createInstitutionSubscription(subscriptionPayload.value);
      break;
    case 'disable':
      result = await uamStore.disableInstitution({
        institutionId: institution_id.value,
        status: '6'
      });
      break;
    case 'enable':
      result = await uamStore.enableInstitution({
        institutionId: institution_id.value,
        status: '1'
      });
      break;
    default:
      console.error('Unknown action type:', actionType.value);
      loading.value = false;
      return;
  }
  loading.value = false;
  if (result.status === AAStatusConstants.SUCCESS) {
    showInstitutionDialog.value = false;
    showConfirmationPrompt.value.data = false;
    showInstitutionSubscriptionDialog.value = false;
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
  await getAllInstitution();
  await getAllSubscriptionPlans();
};

const getAllInstitution = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => uamStore.getAllInstitution(filterEntity.value),
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

const onReset = () => {
  institutionPayload.value = {
    name: '',
    description: '',
    shortName: '',
    domainName: '',
    websiteUrl: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    status: '1',
    rank: '',
    contacts: [],
    emailAddresses: [],
    address: '',
    createdBy: username.value,
    ...(isUpdate.value ? { institutionId: '' } : {})
  };
};

// ------------------------------- HELPER METHODS --------------------------------- //

const onShowInstitutionDialog = (isOpen: boolean) => {
  isUpdate.value = false;
  onReset();
  showInstitutionDialog.value = isOpen;
};

const onShowConfirmationPrompt = (prompt: any) => {
  showConfirmationPrompt.value.data = true
  showConfirmationPrompt.value.message = prompt;
};

const onshowUpdateInstitutionDialog = (institution: any) => {
  isUpdate.value = true;
  onReset();
  institutionPayload.value = {
    name: institution?.name,
    description: institution?.description,
    shortName: institution?.shortName,
    domainName: institution?.domainName,
    websiteUrl: institution?.websiteUrl,
    city: institution?.city,
    state: institution?.state,
    country: institution?.country,
    zipCode: institution?.zipCode,
    status: institution?.status,
    rank: institution?.rank,
    contacts: institution?.contacts,
    emailAddresses: institution?.emailAddresses,
    address: institution?.address,
    createdBy: username.value,
    institutionId: institution?.id,
  };
  institution_id.value = institution.id
  short_name.value = institution.short_name
  showInstitutionDialog.value = true;
};

const onshowInstitutionSubscriptionDialog = (institution: any) => {
  onReset();
  subscriptionPayload.value = {
    duration: '',
    subscriptionTypeId: '',
    createdBy: username.value,
    institutionId: institution?.id,
  };
  institution_id.value = institution.id
  console.log('institution_id', institution_id.value);
  showInstitutionSubscriptionDialog.value = true;
};

// ------------------------------- TABLE COLUMNS AND ROWS --------------------------------- //

const columns: any = ([
  { name: 'actions', align: 'center', label: 'Action' },
  // { name: 'MoreItems', align: 'center', label: 'More Items' },
  {
    name: 'InstitutionName',
    required: true,
    label: 'Institution Name',
    align: 'left',
    field: (row: any) => {
      return row?.name ?? 0;
    },
  },
  {
    name: 'InstitutionCode', align: 'center', label: 'Insitution Code', required: true,
    field: (row: any) => {
      return row?.insCode ?? 0;
    },
  },
  {
    name: 'ShortName', align: 'center', label: 'Short Name', required: true,
    field: (row: any) => {
      return row?.shortName ?? 0;
    },
  },
  {
    name: 'InstitutionStatus', align: 'center', label: 'Institution Status',
    field: (row: any) => {
      return row?.status ?? 0;
    },
  },
  // {
  //   name: 'DomainName', align: 'center', label: 'Domain Name', required: true,
  //   field: (row: any) => {
  //     if (row?.domainName === '' || row?.domainName === null) {
  //       return 'NA';
  //     }
  //     else {
  //       return row?.domainName
  //     }
  //   },
  // },
  {
    name: 'Address', align: 'center', label: 'Address', required: true,
    field: (row: any) => {
      return row?.address ?? 0;
    },
  },

  {
    name: 'Contacts', align: 'center', label: 'Contacts', required: true,
    field: (row: any) => {
      if (Array.isArray(row?.contacts)) {
        return row.contacts.join(', ');
      } else {
        return '';
      }
    },
  },
  {
    name: 'EmailAddress', align: 'center', label: 'Email Address', required: true,
    field: (row: any) => {
      if (Array.isArray(row?.emailAddresses)) {
        return row.emailAddresses.join(', ');
      } else {
        return '';
      }
    },
  },
  {
    name: 'City', align: 'left', label: 'City', required: true,
    field: (row: any) => {
      return row?.city ?? 0;
    },
  },
  {
    name: 'Country', align: 'left', label: 'Country', required: true,
    field: (row: any) => {
      return row?.country ?? 0;
    },
  },
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
  setInterval(() => {
    now.value = DateTime.local();
  }, 1000);
  loadRecords()
});

</script>

<style scoped></style>
