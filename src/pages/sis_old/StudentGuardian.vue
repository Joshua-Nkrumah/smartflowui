<template>
  <main class="main-content">
    <BottomHeader>
      <template #actions>
        <q-btn icon="person_add_alt" label="New Parent/Guardian" size="16px" color="white" text-color="primary"
          class="text-bold" no-caps push @click="onshowGuardianDialog" />
      </template>
      <template #title>
        <div class="row q-col-gutter-x-md">
          <div class="row items-center">
            <q-icon name="o_escalator_warning" size="2.3rem" class="q-mr-md text-brand-yellow-deep" />
            <q-item-label class="text-h5 text-weight-bold">Manage Parent/Guardian</q-item-label>
          </div>
        </div>
      </template>
      <template #sub-title>
        <div class=" text_weight_light">View and manage parents or guardian of the student</div>
      </template>
    </BottomHeader>
    <div style="margin-top: -4rem;" class="q-pa-lg">
      <div class="row q-col-gutter-x-lg">
        <div class="col-md-3 ">
          <q-card class="card-shadow">
            <q-card-section>
              <q-item class="q-mt-md">
                <q-item-section avatar>
                  <my-avatar color="blue-8" text-color="white" :shape="ShapeConstants.ROUNDED" label="User Information"
                    size="4rem" font-size="1.5rem" v-if="studentInfo?.photo_path == null" />
                  <q-avatar size="4rem" font-size="1.2rem" v-if="studentInfo?.photo_path != null">
                    <q-img :src="studentInfo?.photo_path" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-bold text-h6">Student Information</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-list>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_badge" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Student Name
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ studentInfo.first_name }} {{ studentInfo.middle_name }} {{ studentInfo.last_name }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_branding_watermark" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Student Number
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ studentInfo.student_id_number }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_flag" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Nationality
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ studentInfo.nationality }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_wc" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Gender
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ studentInfo.gender }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-list>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_location_on" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Address
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ studentInfo.address_line1 }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_phone" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Mobile Number
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ studentInfo.phone_number }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_event" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Created At
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ studentInfo.created_at }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-9 ">
          <my-search-box v-model="searchKey" :on-refresh="loadRecords" />
          <q-table style="margin-top: 2rem;" title="Parents/Guardians" flat :filter="searchKey"
            :loading="paginationUtil.loading" v-model:pagination="paginationUtil.pagination" :rows="studentGuardians"
            :columns="columns" row-key="id" padding>
            <template v-slot:loading>
              <q-inner-loading showing class="bg-brand-loading" />
            </template>
            <template v-slot:body-cell-GuardianStatus="props">
              <q-td key="GuardianStatus" :props="props">
                <q-badge v-if="props.row?.guardian_status === 'active'" class="q-pl-md q-pr-md" label="Active" fill
                  color="green-8" style="height: 1.5rem;" />
                <q-badge v-if="props.row?.guardian_status === 'inactive'" class="q-pl-md q-pr-md" label="Inactive" fill
                  color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>

            <template v-slot:body-cell-RelationshipToChild="props">
              <q-td key="RelationshipToChild" :props="props">
                <q-badge v-if="props.row?.relationship_to_child != null" class="q-pl-md q-pr-md"
                  :label="props.row?.relationship_to_child" fill color="blue-8" style="height: 1.5rem;" />
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <div class="row wrap justify-between"></div>
                <q-btn-dropdown color="grey-8" dense>
                  <q-list>
                    <q-item clickable @click="onshowUpdateGuardianDialog(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Update Parent/Guardian</q-item-label>
                      </q-item-section>
                    </q-item>
                    <!-- <q-item clickable @click="onshowDisableRoleDialog(props.row as UAMUserData)"
                      v-if="props.row.status === 'active'">
                      <q-item-section side>
                        <q-icon name="block" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Disable Role</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowEnableRoleDialog(props.row as UAMUserData)"
                      v-if="props.row.status != 'active'">
                      <q-item-section side>
                        <q-icon name="toggle_on" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Enable Role</q-item-label>
                      </q-item-section>
                    </q-item> -->
                  </q-list>
                </q-btn-dropdown>
              </q-td>
            </template>
          </q-table>


        </div>
        <my-full-dialog v-model="showGuardianDialog">
          <div class="row q-col-gutter-x-md q-mb-md">
            <div class="col-md-12">
              <q-card class="card-shadow">
                <q-card-section class="row q-gutter-x-md">
                  <div class="col-auto">
                    <my-avatar :shape="ShapeConstants.ROUNDED" label="Guardian Onboarding" size="4rem"
                      font-size="1.2rem" />
                  </div>
                  <div class="col">
                    <div class="text-subtitle2 text-weight-medium text-blue-grey" v-if="isUpdate == false">
                      Guardian Onboarding
                    </div>
                    <div class="text-subtitle2 text-weight-medium text-blue-grey" v-if="isUpdate == true">
                      Guardian Update
                    </div>
                    <div class="text-h5 text-weight-light" v-if="isUpdate == false">
                      Add Guardian
                    </div>
                    <div class="text-h5 text-weight-light" v-if="isUpdate == true">
                      Update Guardian Details
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <q-stepper v-model="step" vertical color="primary" animated flat>
            <q-step :name="1" title="Personal Information" icon="settings" :done="step > 1">
              <q-form @submit="step = 2" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">
                  <div class="col-sm-6" style="min-width: 300px;">
                    <q-input v-model="guardianPayload.first_name" label="First Name*" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the student\'s first name']" />
                  </div>
                  <div class="col-sm-6" style="min-width: 300px;">
                    <q-input v-model="guardianPayload.middle_name" label="Middle Name*" lazy-rules />
                  </div>
                  <div class="col-sm-6" style="min-width: 300px;">
                    <q-input v-model="guardianPayload.last_name" label="Last Name  *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the student\'s last name']" />
                  </div>
                  <div class="col-sm-6" style="min-width: 300px;">
                    <q-input v-model="guardianPayload.email" label="Email Address  " lazy-rules />
                  </div>
                  <div class="col-sm-6" style="min-width: 300px;">
                    <q-input v-model="guardianPayload.phone_number1" label="Phone Number  " lazy-rules />
                  </div>
                  <div class="col-sm-6" style="min-width: 300px;">
                    <div class="col-md-6 q-mt-md">
                      Gender:
                      <q-radio dense v-model="guardianPayload.gender" val="Male" label="Male" class="q-mr-lg"
                        required />
                      <q-radio dense v-model="guardianPayload.gender" val="Female" label="Female" required />
                    </div>
                  </div>
                </div>
                <q-stepper-navigation>
                  <q-btn color="primary" label="Continue" type="submit" :loading="loading" v-if="isUpdate == false" />
                  <q-btn color="primary" label="Continue" type="submit" v-if="isUpdate == true" :loading="loading" />
                  <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" v-close-popup />
                </q-stepper-navigation>
              </q-form>
            </q-step>
            <q-step :name="2" title="Other Details" icon="settings" :done="step > 2">

              <q-form @submit="onProcessGuardian" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">
                  <div class="col-sm-6" style="min-width: 300px;">
                    <!-- <q-input v-model="guardianPayload.relationship_to_child" label="Relationship To Child  *"
                      lazy-rules /> -->
                    <q-select v-model="guardianPayload.relationship_to_child" :options="relationshipToChildOptions"
                      label="Select Relationship to Child " lazy-rules transition-show="scale" transition-hide="scale"
                      behavior="menu" style="max-width: 100rem;" :dense="false"
                      :rules="[(val) => (val && val.length > 0) || 'select the type of job']">
                    </q-select>
                  </div>
                  <div class="col-sm-6" style="min-width: 300px;">
                    <q-input v-model="guardianPayload.address_line1" label="Address Line 1  *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the primary address']" />
                  </div>
                  <div class="col-sm-6" style="min-width: 300px;">
                    <q-input v-model="guardianPayload.address_line2" label="Address Line 2 " lazy-rules />
                  </div>
                  <div class="col-sm-6" style="min-width: 300px;">
                    <q-input v-model="guardianPayload.country" label="Country  *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the country']" />
                  </div>
                  <div class="col-sm-6" style="min-width: 300px;">
                    <q-input v-model="guardianPayload.city" label="City  *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the city']" />
                  </div>
                  <div class="col-sm-6" style="min-width: 300px;">
                    <q-input v-model="guardianPayload.nationality" label="Nationality  *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the nationality']" />
                  </div>
                  <div class="col-sm-6" style="min-width: 300px;">
                    <q-input v-model="guardianPayload.postal_code" label="Postal Code  " lazy-rules />
                  </div>
                  <div class="col-sm-6" style="min-width: 300px;">
                    <q-input v-model="guardianPayload.state" label="State  *" lazy-rules />
                  </div>
                </div>
                <q-stepper-navigation>
                  <q-btn color="primary" label="Add Parent/Guardian" type="submit" :loading="loading"
                    v-if="isUpdate == false" />
                  <q-btn color="primary" label="Update Parent/Guardian" type="submit" v-if="isUpdate == true"
                    :loading="loading" />
                  <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
              </q-form>
            </q-step>
          </q-stepper>
        </my-full-dialog>
      </div>
    </div>

  </main>


  <q-dialog v-model="confirmCreateGuardianDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_add" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to add this Guardian</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Confirm" color="primary" @click="onProcessNewGuardian()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirmUpdateGuardianDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_edit" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to update this Guardian</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessUpdateGuardian()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!--  <q-dialog v-model="confirmDisableRoleDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="recommend" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to disable this app</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessDisableRole()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirmEnableRoleDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="recommend" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to enable this app</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessEnableRole()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog> -->
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
import ShapeConstants from 'src/constants/shape.constants';
import MyAvatar from 'src/components/utils/MyAvatar.vue';
import { useSISStore } from 'src/stores/sis.store';
import MyFullDialog from 'src/components/utils/MyFullDialog.vue';
import { userInfo } from 'os';

// ------------------------------- GLOBAL DECLARATIONS --------------------------------- //
const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const welfareStore = useWelfareStore();
const uamStore = useUAMStore();
const sisStore = useSISStore();
const paginationUtil = ref(new PaginationUtil());
const leftDrawerOpen = ref(false);
const store = useAuthStore();
const searchKey = ref('');
const filter = ref(null);
const showGuardianDialog = ref(false);
const confirmCreateGuardianDialog = ref(false);
const confirmUpdateGuardianDialog = ref(false);
const confirmDisableRoleDialog = ref(false);
const confirmEnableRoleDialog = ref(false);
const loading = ref(false);
const step = ref(1);
const isUpdate = ref(false);

const route = useRoute();

const username = <any>ref(null);
const role_id = <any>ref(null);

const relationshipToChildOptions = ref(['Father', 'Mother', 'Guardian']);



if (LocalStorage.has('email')) {
  username.value = LocalStorage.getItem('email');
};



// ------------------------------- REQUEST PAYLOAD --------------------------------- //

const rolePayload = ref(
  {
    role_name: '',
    app_id: ref(route.params['app_id']),
    created_by: username.value
  }
);

const studentInfo = <any>computed(() => {
  const result = <any>sisStore.listofStudents?.records.filter((record: any) => (record?.id === route.params['student_id']))[0];
  formatCustomDate(result?.created_at.toString());
  return result;
});

const studentGuardians = <any>computed(() => {
  const result = <any>sisStore.listOfStudentGuardians?.records
  return result;
});


const guardianPayload = ref(
  {
    student_id: studentInfo.value.id,
    guardian_id: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    guardian_id_number: '',
    date_of_birth: '',
    gender: '',
    email: '',
    phone_number1: '',
    phone_number2: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    nationality: '',
    relationship_to_child: '',
    guardian_status: '',
    photo_path: '',
    created_by: username.value,
    updated_by: '',
  });

const guardianPayload_ = ref(
  {
    student_id: studentInfo.value.id,
    guardian_id: '',
    first_name: 'da',
    last_name: 'ad',
    middle_name: 'da',
    guardian_id_number: '',
    // password: '',
    date_of_birth: 'da',
    gender: 'da',
    email: 'ddaa',
    phone_number1: '0548068712',
    phone_number2: '0548068712',
    address_line1: 'da',
    address_line2: 'da',
    city: 'daa',
    state: 'da',
    postal_code: 'da',
    country: 'da',
    nationality: 'daa',
    relationship_to_child: '',
    guardian_status: '',
    photo_path: '',
    created_by: username.value,
    updated_by: 'daa',
  });


// ------------------------------- MEMBER METHODS --------------------------------- //

const onshowGuardianDialog = () => {
  isUpdate.value = false;
  showGuardianDialog.value = true;
  step.value = 1
};

const onshowUpdateGuardianDialog = (guardian: any) => {
  isUpdate.value = true;
  showGuardianDialog.value = true;
  step.value = 1;
  guardianPayload.value = {
    student_id: studentInfo.value.id,
    guardian_id: guardian?.id,
    first_name: guardian?.first_name,
    middle_name: guardian?.middle_name_name,
    last_name: guardian?.last_name,
    guardian_id_number: guardian?.guardian_id_number,
    // password: '',
    date_of_birth: guardian?.date_of_birth,
    gender: guardian?.gender,
    email: guardian?.email,
    phone_number1: guardian?.phone_number1,
    phone_number2: guardian?.phone_number2,
    address_line1: guardian?.address_line1,
    address_line2: guardian?.address_line2,
    city: guardian?.city,
    state: guardian?.state,
    postal_code: guardian?.postal_code,
    country: guardian?.country,
    nationality: guardian?.nationality,
    relationship_to_child: guardian?.relationship_to_child,
    guardian_status: guardian?.guardian_status,
    photo_path: guardian?.photo_path,
    created_by: username.value,
    updated_by: username.value,
  };
};


const onProcessGuardian = async () => {
  if (isUpdate.value == false) {
    confirmCreateGuardianDialog.value = true
    // onProcessNewGuardian();
  }
  else {
    confirmUpdateGuardianDialog.value = true
    // onProcessUpdateRole();
  }
};


const onProcessNewGuardian = async () => {
  loading.value = true;
  const result = await sisStore.createAndLinkGuardian(guardianPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showGuardianDialog.value = false;
    confirmCreateGuardianDialog.value = false;
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


const onProcessUpdateGuardian = async () => {
  loading.value = true;
  const result = await sisStore.updateGuardian(guardianPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showGuardianDialog.value = false;
    confirmUpdateGuardianDialog.value = false;
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



const loadRecords = async () => {
  getAllUsers(),
    getAllStudentGuardians()

}

const getAllUsers = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, UAMUserData>(
    uamStore.getAllUsers,
    fetchData,
  );
}

// const getAllStudentGuardians = async () => {
//   const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
//   await paginationUtil.value.initiate<unknown, UAMUserData>(
//     sisStore.getAllStudentGuardians,
//     fetchData,
//   );
// }


const getAllStudentGuardians = async () => {
  console.log('studentInfo?.value.id', studentInfo?.value.id);
  const payload = {
    student_id: studentInfo?.value.id
  }

  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  const result = await paginationUtil.value.initiate<unknown, any>(
    () =>
      sisStore.getAllStudentGuardians(payload),
    fetchData,
  );
};


const onReset = () => {
  rolePayload.value = {
    role_name: '',
    app_id: '',
    created_by: username.value
  };
}

// ------------------------------- HELPER METHODS --------------------------------- //




function formatCustomDate(dateString: string): string {
  // Parse the input date string into a Date object
  const inputDate = new Date(dateString);

  // Check if the inputDate is valid
  if (isNaN(inputDate.getTime())) {
    return 'Invalid Date';
  }

  // Get the day, month, year, hours, and minutes in UTC
  const day = inputDate.getUTCDate();
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = monthNames[inputDate.getUTCMonth()];
  const year = inputDate.getUTCFullYear();
  const hours = inputDate.getUTCHours();
  const minutes = inputDate.getUTCMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  // Format the date string
  const formattedDate = `${day}th ${month}, ${year}, ${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  return formattedDate;
}
// ------------------------------- TABLE COLUMNS AND ROWS --------------------------------- //



const columns: any = ([
  { name: 'actions', align: 'center', label: 'Action' },
  // {
  //   name: 'StudentPhoto', align: 'left', label: 'Student Photo', field: 'photo_path', required: true,
  // },
  // {
  //   name: 'StudentNumber', align: 'left', label: 'Student Index Number', field: 'student_id_number', required: true,
  // },
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: (row: any) => {
      return row?.first_name + ' ' + row?.last_name ?? 0;
    },
  },
  {
    name: 'Gender', align: 'left', label: 'Gender', field: 'gender', required: true,
  },
  {
    name: 'DateOfBirth', align: 'left', label: 'Date Of Birth', field: 'date_of_birth', required: true,
  },
  {
    name: 'RelationshipToChild', align: 'left', label: 'Relationship To Child', field: 'relationship_to_child', required: true,
  },
  {
    name: 'GuardianStatus', align: 'left', label: 'Guardian Status', field: 'guardian_status', required: true,
  },
  {
    name: 'Nationality', align: 'left', label: 'Nationality', field: 'nationality', required: true,
  },
  { name: 'MobileNumber', align: 'center', label: 'Mobile Number', field: 'phone_number1' },
  { name: 'Address', align: 'center', label: 'Address', field: 'address_line1' },
  {
    name: 'CreatedAt',
    label: 'Created At',
    align: 'center',
    field: (row: any) => {
      return formatCustomDate(row?.created_at);
    },
  },
]);

// ------------------------------- ON MOUNTED --------------------------------- //

onMounted(() => {
  loadRecords()
});

</script>

<style scoped></style>
