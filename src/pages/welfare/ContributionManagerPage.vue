<template>
  <main class="main-content">
    <BottomHeader>
      <template #actions>
      </template>
    </BottomHeader>
    <div style="margin-top: -4rem;" class="q-pa-lg">
      <div class="row">
        <div class="col-12 ">
          <my-search-box v-model="searchKey" :on-refresh="loadRecords" />
          <q-table style="margin-top: 2rem;" title="Contribution" flat :filter="searchKey"
            :loading="paginationUtil.loading" v-model:pagination="paginationUtil.pagination"
            :rows="welfareStore.listOfContributions?.records" :columns="columns" row-key="id" padding id="form1">
            <template v-slot:body-cell-ContributionStatus="props">
              <q-td key="ContributionStatus" :props="props">
                <q-badge v-if="props.row.contribution.contributionStatus === 'completed'" class="q-pl-md q-pr-md"
                  label="Completed" fill color="green-8" style="height: 1.5rem;" />

                <q-badge v-if="props.row.contribution.contributionStatus === 'pending'" class="q-pl-md q-pr-md"
                  label="Pending" fill color="yellow-8" style="height: 1.5rem;" />

                <q-badge v-if="props.row.contribution.contributionStatus === 'resigned'" class="q-pl-md q-pr-md"
                  label="Resigned" fill color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>
            <template v-slot:body-cell-DeleteStatus="props">
              <q-td key="DeleteStatus" :props="props">
                <q-badge v-if="props.row.isDeleted === 'deleted'" class="q-pl-md q-pr-md" label="Deleted" fill
                  color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>

            <template v-slot:body-cell-Gender="props">
              <q-td key="Gender" :props="props">
                <div v-if="props.row.gender === 'male'" class="q-pl-md q-pr-md">Male</div>
                <div v-if="props.row.gender === 'female'" class="q-pl-md q-pr-md">Female</div>
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <div class="row wrap justify-between"></div>
                <q-btn-dropdown color="grey-8" dense>
                  <q-list>
                    <q-item clickable @click="onshowPrintContributionDialog(props.row as MemberRecords)"
                      v-if="props.row.contribution.contributionStatus === 'completed'">
                      <q-item-section side>
                        <q-icon name="o_receipt_long" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Print Receipt</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowUpdateContributionDialog(props.row as MemberRecords)">
                      <q-item-section side>
                        <q-icon name="o_edit" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Update Contribution</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onShowMailConfirmationDialog(props.row as ContributionRecord)"
                      v-if="props.row.contribution.contributionStatus === 'completed' && props.row.members.emailAddress != null">
                      <q-item-section side>
                        <q-icon name="o_forward_to_inbox" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Send Receipt as Mail</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-td>
            </template>
          </q-table>
        </div>
        <div class="q-pt-lg">
        </div>
      </div>
    </div>
  </main>
  <q-dialog v-model="showContributionDialog" rounded style="width: 100% !important;">
    <q-card style="width: 900px; max-width: 100vw;">
      <q-toolbar>
        <q-avatar>
          <q-icon name="person_add_alt" color="blue-9" size="30px" v-if="isUpdate == false" />
          <q-icon name="edit" color="blue-9" size="30px" v-if="isUpdate == true" />
        </q-avatar>
        <q-toolbar-title color="blue-9" v-if="isUpdate == false"><span class="text-weight-bold">Add
            Contribution</span></q-toolbar-title>
        <q-toolbar-title color="blue-9" v-if="isUpdate == true"><span class="text-weight-bold">Update
            Contribution</span></q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section>
        <q-card class="card-shadow q-ml-xl q-mr-xl">
          <q-card-section style="margin-top: 0.4rem;">
            <q-item>
              <div class="row flex-center">
                <q-item-section class="col-12">
                  <q-item-label class="text-weight-bold" style="font-size: 1.5rem">
                    {{ selectedMemberPayload.firstName }} {{ selectedMemberPayload.middleName }} {{
                      selectedMemberPayload.lastName }}
                  </q-item-label>
                  <q-item-label caption lines="1" class="text-bold" style="font-size: 1rem">
                    {{ selectedMemberPayload.emailAddress }}, {{ selectedMemberPayload.phoneNumber }}
                  </q-item-label>
                </q-item-section>
              </div>
            </q-item>
          </q-card-section>
        </q-card>
        <div class="">
          <q-stepper v-model="step" vertical color="primary" animated flat>
            <q-step :name="1" title="Add a new contribution for the member above" :done="step > 1">
              <q-form @submit="onProcessUpdateContribution" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">
                  <!-- <div class="col-md-6">
                    <q-input v-model="contributionPayload.amount" label="Amount *" type="number" lazy-rules :rules="[
                      (val: number) => (val && Number(val) && val > 0) || 'Enter the contribution amount',]"
                      readonly />
                  </div> -->
                  <div class="col-md-6">
                    <q-input v-model="contributionPayload.amount" label="Amount *" type="number" lazy-rules readonly />
                  </div>
                  <div class="col-md-6">
                    <q-select v-model="contributionPayload.contributionStatus" :options="contributionStatusOptions"
                      label="Contribution Status" lazy-rules transition-show="scale" transition-hide="scale"
                      behavior="default"
                      :rules="[(val: string | any[]) => (val && val.length > 0) || 'Select Contribution Status']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the contribution status
                      </q-tooltip>
                    </q-select>
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="contributionPayload.remarks" label="Remarks " lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the remarks for the contribution']"
                      v-if="contributionPayload.contributionStatus === 'pending'" />
                    <q-input v-model="contributionPayload.remarks" label="Remarks " lazy-rules v-else />
                  </div>
                  <div class="col-md-6">
                    <q-select v-model="contributionPayload.description" :options="descriptionTypeOptions"
                      label="Description" lazy-rules transition-show="scale" transition-hide="scale" behavior="default"
                      :rules="[(val: string | any[]) => (val && val.length > 0) || 'Select contribution description']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the contribution description
                      </q-tooltip>
                    </q-select>
                  </div>

                </div>
                <q-stepper-navigation>
                  <q-btn color="primary" label="Add Contribution" type="submit" :loading="loading"
                    v-if="isUpdate == false" class="q-mr-md" />
                  <q-btn color="primary" label="Update Contribution" :loading="loading" type="submit"
                    v-if="isUpdate == true" class="q-mr-md" />
                  <q-btn color="dark" label="Clear All" @click="onReset()" />
                </q-stepper-navigation>
              </q-form>
            </q-step>
          </q-stepper>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showPrintContributionDialog" rounded style="width: 100% !important;">
    <q-card style="width: 900px; max-width: 100vw;">
      <q-toolbar>
        <q-avatar>
          <q-icon name="fa-solid fa-print" color="blue-9" size="30px" />
        </q-avatar>
        <q-toolbar-title color="blue-9" v-if="isUpdate == false"><span class="text-weight-bold">Print
            Receipt</span></q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section>
        <q-card class="card-shadow q-ml-xl q-mr-xl">
          <q-card-section style="margin-top: 0.4rem;" class="row justify-between">
            <q-item>
              <div class="row ">
                <q-item-section class="col-12">
                  <q-item-label class="text-weight-bold" style="font-size: 1.5rem">
                    {{ selectedMemberPayload.firstName }} {{ selectedMemberPayload.middleName }} {{
                      selectedMemberPayload.lastName }}
                  </q-item-label>
                  <q-item-label caption lines="1" class="text-bold" style="font-size: 1rem">
                    {{ selectedMemberPayload.emailAddress }}, {{ selectedMemberPayload.phoneNumber }}
                  </q-item-label>
                </q-item-section>
              </div>
            </q-item>
            <q-item>
              <q-btn icon="fa-solid fa-print" label="Print Receipt" size="18px" color="primary" text-color="white"
                class="text-bold" no-caps push @click="onPrintPage()" />
            </q-item>
          </q-card-section>
        </q-card>
        <div class="row q-col-gutter-x-lg" id="printReceipt">
          <div class="col-md-12 q-mb-lg">
            <q-card class="card-shadow main_container q-pa-xl " flat>
              <q-card-section class="text-subitle4 ">
                <div class="sub_container col" id="specific-part">
                  <div class="receipt_top ">
                    <div class="receipt_header row justify-between">
                      <div class="col">
                        <div>
                          <!-- <q-img src="../../assets/images/cc/logo.png" fit="scale-down" width="8rem" /> -->
                        </div>
                        <div class="q-mt-xs">
                          <span class="text-h6 text-bold"> Receipt</span>
                        </div>
                      </div>
                      <div class="col">
                        <div class="receipt_id text-right text-bold">
                          <span>Receipt Id: {{ selectedContributionPayload.receiptId }}</span>
                        </div>
                      </div>
                    </div>
                    <q-separator color="dark" size="0.4rem" inset class="q-mt-sm" />
                    <q-card class="receipt_content col card-shadow" flat>
                      <q-card-section>
                        <div class="row justify-between">
                          <div>Service Type: </div>
                          <div>Contribution</div>
                        </div>
                        <q-separator />
                        <div class="row justify-between">
                          <div>Contributor's Name: </div>
                          <div>{{ selectedMemberPayload.firstName }} {{ selectedMemberPayload.middleName }}
                            {{ selectedMemberPayload.lastName }}</div>
                        </div>
                        <q-separator />
                        <div class="row justify-between">
                          <div>Contributor's Email Address: </div>
                          <div>{{ selectedMemberPayload.emailAddress }}</div>
                        </div>
                        <q-separator />
                        <div class="row justify-between">
                          <div>Contributor Phone Number: </div>
                          <div>{{ selectedMemberPayload.phoneNumber }}</div>
                        </div>
                        <q-separator />
                        <div class="row justify-between">
                          <div>Contributor Location: </div>
                          <div>{{ selectedMemberPayload.location }}</div>
                        </div>
                        <q-separator />
                        <div class="row justify-between">
                          <div>Total Amount (GH<span style="font-size: 18px;">¢</span>) </div>
                          <div>{{ selectedContributionPayload.amount }}</div>
                        </div>
                        <q-separator />
                        <div class="row justify-between">
                          <div>Contribution Status</div>
                          <div>{{ selectedContributionPayload.contributionStatus }}</div>
                        </div>
                        <q-separator />
                        <div class="row justify-between">
                          <div>Description</div>
                          <div>{{ selectedContributionPayload.description }}</div>
                        </div>
                        <q-separator />
                        <div class="row justify-between">
                          <div>Contributor's Signature: </div>
                        </div>
                      </q-card-section>
                    </q-card>
                    <q-card class="receipt_footer card-shadow" flat>
                      <q-card-section class="row">
                        <div class="col text-left">
                          <div class="title">Branch</div>
                          <div class="content">OCC North Kaneshie</div>
                        </div>
                        <q-separator vertical size="0.2rem" color="dark" inset class="q-mr-lg" />
                        <div class="col text-center">
                          <div class="title">Served By</div>
                          <!-- <div class="content">{{ authStore.listOfUserInfo.firstName }}
                            {{ authStore.listOfUserInfo.lastName }}</div> -->
                          <div class="content">{{ username }}</div>
                        </div>
                        <q-separator vertical size="0.2rem" color="dark" inset class="q-ml-lg q-mr-lg" />
                        <div class="col text-right">
                          <div class="title">Contribution Date</div>
                          <div class="content">{{ selectedContributionPayload.createdAt }}</div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                  <div class="receipt_middle" style="height: 10.2px;">
                    <div class="divider" style="border: 2px black dashed; margin-top: 5px;">
                    </div>
                  </div>
                  <div class="receipt_bottom">
                    <div class="receipt_header row justify-between">
                      <div class="col">
                        <div>
                          <!-- <q-img src="../../assets/images/cc/logo.png" fit="scale-down" width="8rem" /> -->
                        </div>
                        <div class="q-mt-xs">
                          <span class="text-h6 text-bold"> Receipt</span>
                        </div>
                      </div>
                      <div class="col">
                        <div class="receipt_id text-right text-bold">
                          <span>Receipt Id: {{ selectedContributionPayload.receiptId }}</span>
                        </div>
                      </div>
                    </div>
                    <q-separator color="dark" size="0.4rem" inset class="q-mt-sm" />
                    <q-card class="receipt_content col card-shadow" flat>
                      <q-card-section>
                        <div class="row justify-between">
                          <div>Service Type: </div>
                          <div>Contribution</div>
                        </div>
                        <q-separator />
                        <div class="row justify-between">
                          <div>Contributor's Name: </div>
                          <div>{{ selectedMemberPayload.firstName }} {{ selectedMemberPayload.middleName }}
                            {{ selectedMemberPayload.lastName }}</div>
                        </div>
                        <q-separator />
                        <div class="row justify-between">
                          <div>Contributor's Email Address: </div>
                          <div>{{ selectedMemberPayload.emailAddress }}</div>
                        </div>
                        <q-separator />
                        <div class="row justify-between">
                          <div>Contributor Phone Number: </div>
                          <div>{{ selectedMemberPayload.phoneNumber }}</div>
                        </div>
                        <q-separator />
                        <div class="row justify-between">
                          <div>Contributor Location: </div>
                          <div>{{ selectedMemberPayload.location }}</div>
                        </div>
                        <q-separator />
                        <div class="row justify-between">
                          <div>Total Amount (GH<span style="font-size: 18px;">¢</span>) </div>
                          <div>{{ selectedContributionPayload.amount }}</div>
                        </div>
                        <q-separator />
                        <div class="row justify-between">
                          <div>Contribution Status</div>
                          <div>{{ selectedContributionPayload.contributionStatus }}</div>
                        </div>
                        <q-separator />
                        <div class="row justify-between">
                          <div>Description</div>
                          <div>{{ selectedContributionPayload.description }}</div>
                        </div>
                        <q-separator />
                        <div class="row justify-between">
                          <div>Contributor's Signature: </div>
                        </div>
                      </q-card-section>
                    </q-card>
                    <q-card class="receipt_footer card-shadow" flat>
                      <q-card-section class="row">
                        <div class="col text-left">
                          <div class="title">Branch</div>
                          <div class="content">OCC North Kaneshie</div>
                        </div>
                        <q-separator vertical size="0.2rem" color="dark" inset class="q-mr-lg" />
                        <div class="col text-center">
                          <div class="title">Served By</div>
                          <!-- <div class="content">{{ authStore.listOfUserInfo.firstName }}
                            {{ authStore.listOfUserInfo.lastName }}</div> -->
                          <div class="content">{{ username }}</div>
                        </div>
                        <q-separator vertical size="0.2rem" color="dark" inset class="q-ml-lg q-mr-lg" />
                        <div class="col text-right">
                          <div class="title">Contribution Date</div>
                          <div class="content">{{ selectedContributionPayload.createdAt }}</div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
                <strong></strong>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirmMemberDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Do you really want to mark this member as deleted?</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Mark as Delete" color="primary" @click="onProcessSoftDeleteMember()" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirmMailReceiptDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_forward_to_inbox" color="primary" text-color="white" />
          <span class="q-ml-sm">Do you really want to send this receipt as mail?</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Send Receipt as Mail" color="primary" @click="onProcessSendContributionReceiptAsMail()"
          :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup >
import { useAuthStore } from 'src/stores/auth-store';
import { useWelfareStore } from 'src/stores/welfare-store';
import BottomHeader from 'components/structure/BottomHeader.vue';
import MySearchBox from 'components/utils/MySearchBar.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted, watch, computed } from 'vue';
import { LocalStorage, date, useQuasar } from 'quasar';
import AAStatusConstants from 'src/constants/aa-status.constants';
import PaginationUtil from 'src/utils/pagination.utils';
import FetchDataRequest from 'src/models/FetchDataRequest.model';
import { MemberRecords } from 'src/models/member/AllMembers.model';
import printJS from 'print-js';
import { ContributionData, ContributionRecord } from 'src/models/contribution/AllContribution.model';

// ------------------------------- GLOBAL DECLARATIONS --------------------------------- //
const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const welfareStore = useWelfareStore();
const paginationUtil = ref(new PaginationUtil());
const leftDrawerOpen = ref(false);
const store = useAuthStore();
const searchKey = ref('');
const showMemberDialog = ref(false);
const confirmMemberDialog = ref(false);
const confirmMailReceiptDialog = ref(false);
const loading = ref(false);
const step = ref(1);
const maritalStatusOptions = ref(['single', 'married', 'divorced', 'separated', 'widowed', 'remarried']);
const membershipTypeOptions = ref(['member', 'associate member', 'guest', 'member', 'prospecitve member', 'life member', 'former member', 'baptized member']);
const contributionTypeOptions = ref(['member', 'associate member', 'guest', 'member', 'prospecitve member', 'life member', 'former member', 'baptized member']);
const contributionStatusOptions = ref(['completed', 'pending']);
const membershipStatusOptions = ref(['active', 'inactive', 'resigned']);
const isUpdate = ref(false);
const filter = ref(null);
const memberID = ref('');
const showContributionDialog = ref(false);
const showPrintContributionDialog = ref(false);
const memberId = ref('');
const contributionId = ref('');
const descriptionTypeOptions = ref([
  'Tithes',
  'Offerings',
  'Missionary Support',
  'Building Fund',
  'Special Projects',
  'Charity and Outreach',
  'Benevolence Fund',
  'Youth Ministry Support',
  'Music Ministry',
  'Educational Programs',
  'Technology and Media',
  'Missions Trips',
  'Church Events',
  'Scholarships',
  'Pastoral Support',
  'Prison Ministry',
  'Medical and Emergency Assistance',
  'Environmental Stewardship',
  'Food Pantry and Clothing Closet',
  'Memorial and Tribute Gifts',
  'Community Outreach',
  'Elderly Care Ministry',
  'Crisis Intervention',
  'Community Development',
  'Youth Outreach',
  'Housing Initiatives',
  'Counseling Services',
  'Legal Aid Ministry',
  'Disaster Relief'
]);

const onPrintPage = () => {
  const printelement = document.getElementById('printReceipt')
  console.log('onPrintPage', printelement);
  printJS({
    printable: printelement,
    type: 'html',
    targetStyles: ['*'],
    // header: 'PrintJS - Print Form With Customized Header'
  })
}

const username = <any>ref(null);

if (LocalStorage.has('username')) {
  username.value = LocalStorage.getItem('username');
};

// ------------------------------- REQUEST PAYLOAD --------------------------------- //
const contributionPayload = ref(
  {
    memberId: '',
    contributionId: '',
    amount: parseFloat(''),
    description: '',
    contributionStatus: '',
    createdBy: '',
    remarks: ''
  });

const singleContributionPayload = ref(
  {
    memberId: '',
    contributionId: ''
  });

const selectedContributionPayload = ref({
  memberId: '',
  contributionId: '',
  amount: parseFloat(''),
  description: '',
  contributionStatus: '',
  createdBy: '',
  remarks: '',
  createdAt: '',
  receiptId: ''
})

const selectedMemberPayload = ref(
  {
    firstName: 'Joshua',
    middleName: 'Kwaku',
    lastName: 'Nkrumah',
    emailAddress: 'joshua@gmail.com',
    phoneNumber: '0548068712',
    location: ''
  });

const memberPayload = ref(
  {
    firstName: 'Joshua',
    middleName: 'Kwaku',
    lastName: 'Nkrumah',
    photograph: '',
    age: '23',
    dateOfBirth: '2023-09-06',
    gender: 'male',
    emailAddress: 'joshua@gmail.com',
    phoneNumber: '0548068712',
    emergencyContact: '0548068712',
    dateJoined: '2023-09-06',
    maritalStatus: 'single',
    membershipStatus: 'active',
    children: '1',
    occupation: 'Software Engineer',
    membershipType: 'member',
    additionalInformation: '2023-09-06',
    createdBy: username.value,
    location: 'Santa Maria',
  });

// ------------------------------- MEMBER METHODS --------------------------------- //


const onProcessContribution = async () => {
  if (isUpdate.value == false) {
    onProcessNewMember();
  }
  else {
    onProcessUpdateMember();
  }
};


const onProcessUpdateContribution = async () => {
  loading.value = true;
  contributionPayload.value.memberId = memberId.value;
  // console.log('onProcessNewContribution', contributionPayload.value);
  const result = await welfareStore.editContribution(contributionPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showContributionDialog.value = false;
    step.value = 1;
    loadRecords();
    $q.notify({
      color: 'green-8',
      textColor: 'white',
      icon: 'cloud_done',
      position: 'top-right',
      message: `${result.message}`,
    });
  } else {
    $q.notify({
      color: 'red-8',
      textColor: 'white',
      icon: 'close',
      position: 'top-right',
      message: `${result.message}`,
    });
  }
};

const onProcessNewMember = async () => {
  loading.value = true;
  const result = await welfareStore.createMember(memberPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showMemberDialog.value = false;
    step.value = 1;
    loadRecords();
    $q.notify({
      color: 'green-8',
      textColor: 'white',
      icon: 'cloud_done',
      position: 'top-right',
      message: `${result.message}`,
    });
  } else {
    $q.notify({
      color: 'red-8',
      textColor: 'white',
      icon: 'close',
      position: 'top-right',
      message: `${result.message}`,
    });
  }
};

const onProcessUpdateMember = async () => {
  loading.value = true;
  const result = await welfareStore.editMember(memberPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showMemberDialog.value = false;
    step.value = 1;
    loadRecords();
    $q.notify({
      color: 'green-8',
      textColor: 'white',
      icon: 'cloud_done',
      position: 'top-right',
      message: `${result.message}`,
    });
  } else {
    $q.notify({
      color: 'red-8',
      textColor: 'white',
      icon: 'close',
      position: 'top-right',
      message: `${result.message}`,
    });
  }
};


const onProcessSoftDeleteMember = async () => {
  loading.value = true;

  const result = await welfareStore.softDeleteMember({
    memberID: memberID.value
  });
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    confirmMemberDialog.value = false;
    $q.notify({
      color: 'green-8',
      textColor: 'white',
      icon: 'cloud_done',
      position: 'top-right',
      message: `${result.message}`,
    });
  } else {
    $q.notify({
      color: 'red-8',
      textColor: 'white',
      icon: 'close',
      position: 'top-right',
      message: `${result.message}`,
    });
  }
};

const onProcessSendContributionReceiptAsMail = async () => {
  loading.value = true;
  const result = await welfareStore.sendContributionReceiptAsMail(singleContributionPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    confirmMailReceiptDialog.value = false;
    $q.notify({
      color: 'green-8',
      textColor: 'white',
      icon: 'cloud_done',
      position: 'top-right',
      message: `${result.message}`,
    });
  } else {
    $q.notify({
      color: 'red-8',
      textColor: 'white',
      icon: 'close',
      position: 'top-right',
      message: `${result.message}`,
    });
  }
};

const loadRecords = async () => {
  getAllContributions()
}

const getAllContributions = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, MemberRecords>(
    welfareStore.getAllContributions,
    fetchData,
  );
}

const onReset = () => {
  memberPayload.value = {
    firstName: '',
    middleName: '',
    lastName: '',
    photograph: '',
    age: '',
    dateOfBirth: '',
    gender: '',
    emailAddress: '',
    phoneNumber: '',
    emergencyContact: '',
    dateJoined: '',
    maritalStatus: '',
    membershipStatus: '',
    children: '',
    occupation: '',
    membershipType: '',
    additionalInformation: '',
    createdBy: authStore.listOfUserInfo.username,
    location: ''
  },
    contributionPayload.value = {
      memberId: '',
      amount: parseFloat(''),
      description: '',
      contributionStatus: '',
      createdBy: '',
      remarks: '',
      contributionId: '',
    }
}
const memberList = <any>computed(() => {
  return welfareStore.listOfMembers?.records.filter((record: any) => (record.isDeleted != 'deleted'));
});

const contributionList = <any>computed(() => {
  return welfareStore.listOfContributions?.records
    .map(contribution => contribution.contribution)
    .filter((record: any) => (record.isDeleted != 'deleted'));
});


// ------------------------------- HELPER METHODS --------------------------------- //

const onshowCreateMemberDialog = () => {
  isUpdate.value = false;
  showMemberDialog.value = true;
};

const onshowUpdateContributionDialog = (row: any) => {
  isUpdate.value = true;
  showContributionDialog.value = true;
  selectedMemberPayload.value = {
    firstName: row.members.firstName,
    emailAddress: row.members.emailAddress,
    lastName: row.members.lastName,
    middleName: row.members.middleName,
    phoneNumber: row.members.phoneNumber,
    location: row.members.location,
  };
  contributionPayload.value = {
    memberId: row.contribution.memberId,
    contributionId: row.contribution.contributionId,
    amount: parseFloat(row.contribution.amount),
    description: row.contribution.description,
    contributionStatus: row.contribution.contributionStatus,
    createdBy: row.contribution.createdBy,
    remarks: row.contribution.remarks

  }
  memberId.value = row.members.memberId;
};

const onshowPrintContributionDialog = (row: any) => {
  showPrintContributionDialog.value = true;
  selectedMemberPayload.value = {
    firstName: row.members.firstName,
    emailAddress: row.members.emailAddress,
    lastName: row.members.lastName,
    middleName: row.members.middleName,
    phoneNumber: row.members.phoneNumber,
    location: row.members.location,
  };
  selectedContributionPayload.value = {
    memberId: row.contribution.memberId,
    contributionId: row.contribution.contributionId,
    amount: parseFloat(row.contribution.amount),
    description: row.contribution.description,
    contributionStatus: row.contribution.contributionStatus,
    createdBy: row.contribution.createdBy,
    remarks: row.contribution.remarks,
    createdAt: formatCustomDate(row.contribution.createdAt),
    receiptId: row.contribution.receiptId
  }
  memberId.value = row.members.memberId;
}

const onShowMailConfirmationDialog = (row: any) => {
  confirmMailReceiptDialog.value = true;
  singleContributionPayload.value = {
    contributionId: row.contribution?.contributionId,
    memberId: row.members.memberId
  }
}

const gotoPrintReceipt = (row: any) => {
  memberId.value = row.members.memberId;
  contributionId.value = row.contribution.contributionId;
  router.push(`/welfare/print-contribution-receipt/${memberId.value}/${contributionId.value}`);
};



const onshowConfirmationDialog = (member: any) => {
  confirmMemberDialog.value = true;
  memberID.value = member.memberId;
};

const filterMembers = (input: string, update: (param: () => void) => void) => {
  if (!input || input?.trim() === '') {
    update(() => {
      memberList.value.records = welfareStore.listOfMembers;
    })
    return;
  }
  const needle = input.toLowerCase();
  update(() => {
    memberList.value.records = welfareStore.listOfMembers?.records.filter(((record: any) => {
      return record?.firstName.toLowerCase().includes(needle);
    }));
  })
}

function formatCustomDate(dateString: string): string {
  // Parse the input date string into a Date object
  const inputDate = new Date(dateString);

  // Check if the inputDate is valid
  if (isNaN(inputDate.getTime())) {
    return 'Invalid Date';
  }

  // Get the day, month, year, hours, and minutes
  const day = inputDate.getDate();
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = monthNames[inputDate.getMonth()];
  const year = inputDate.getFullYear();
  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  // Format the date string
  const formattedDate = `${day}th ${month}, ${year}, ${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  return formattedDate;
}

// ------------------------------- TABLE COLUMNS AND ROWS --------------------------------- //

const columns: any = ([
  { name: 'actions', align: 'center', label: 'Action' },
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: (row: any) => {
      return row?.members?.firstName + ' ' + row?.members?.middleName + ' ' + row?.members?.lastName;
    },
  },
  {
    name: 'EmailAddress',
    align: 'left',
    label: 'Email Address',
    field: (row: any) => {
      return row?.members?.emailAddress;
    },
    required: true,
  },
  {
    name: 'Amount',
    align: 'center',
    label: 'Amount (GHS)',
    field: (row: any) => {
      return row?.contribution?.amount;
    },
    sortable: true
  },
  {
    name: 'Description',
    align: 'center',
    label: 'Description',
    field: (row: any) => {
      return row?.contribution?.description;
    },
  },
  {
    name: 'Remarks',
    align: 'center',
    label: 'Remarks',
    field: (row: any) => {
      return row?.contribution?.remarks;
    },
  },
  {
    name: 'ContributionStatus',
    align: 'center',
    label: 'Contribution Status',
    field: (row: any) => {
      return row?.contribution?.contributionStatus;
    },
  },
  {
    name: 'ContributionDate',
    label: 'Contribution Date',
    align: 'center',
    field: (row: any) => {
      return formatCustomDate(row?.contribution.contributionDate);
    },
  },
  // { name: 'CreatedBy', label: 'Created By', field: 'createdBy' },
  // { name: 'DeleteStatus', label: 'Delete Status', field: 'isDeleted' },
  {
    name: 'CreatedAt',
    label: 'Created At',
    align: 'center',
    field: (row: any) => {
      return formatCustomDate(row?.contribution.createdAt);
    },
  },
  {
    name: 'UpdatedAt',
    label: 'Updated At',
    align: 'center',
    field: (row: any) => {
      return formatCustomDate(row?.contribution.updatedAt);
    },
  },

]);


// ------------------------------- ON MOUNTED --------------------------------- //

onMounted(() => {
  loadRecords()
});

</script>

<style scoped></style>

