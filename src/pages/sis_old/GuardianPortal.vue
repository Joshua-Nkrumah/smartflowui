<template>
  <main class="main-content">
    <BottomHeader>
      <template #actions>
        <!-- <q-btn icon="person_add_alt" label="New Parent/Guardian" size="16px" color="white" text-color="primary"
          class="text-bold" no-caps push  /> -->
      </template>
      <template #title>
        <div class="row q-col-gutter-x-md">
          <div class="row items-center">
            <q-icon name="o_diversity_1" size="2.3rem" class="q-mr-md text-brand-yellow-deep" />
            <q-item-label class="text-h5 text-weight-bold">Parents and Guardians</q-item-label>
          </div>
        </div>
      </template>
      <template #sub-title>
        <div class=" text_weight_light">Have an overview of all parents and guardians linked to your school</div>
      </template>
    </BottomHeader>
    <div style="margin-top: -4rem;" class="q-pa-lg">
      <div class="row">
        <div class="col-12 ">
          <my-search-box v-model="searchKey" :on-refresh="loadRecords" />
          <q-table style="margin-top: 2rem;" title="Guardians" flat :filter="searchKey"
            :loading="paginationUtil.loading" v-model:pagination="paginationUtil.pagination" :rows="guardianList"
            :columns="columns" row-key="memberId" padding>
            <template v-slot:body-cell-StudentPhoto="props">
              <q-td key="StudentPhoto" :props="props">
                <q-avatar size="80px">
                  <q-img :src="props.row.photo_path" />
                </q-avatar>
              </q-td>
            </template>
            <template v-slot:body-cell-GuardianStatus="props">
              <q-td key="GuardianStatus" :props="props">
                <q-badge v-if="props.row?.guardian_status === 'active'" class="q-pl-md q-pr-md" label="Active" fill
                  color="green-8" style="height: 1.5rem;" />
                <q-badge v-if="props.row?.guardian_status === 'inactive'" class="q-pl-md q-pr-md" label="Inactive" fill
                  color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>

            <template v-slot:body-cell-GuardianNumber="props">
              <q-td key="GuardianNumber" :props="props">
                <q-badge v-if="props.row?.guardian_id_number != null" class="q-pl-md q-pr-md"
                  :label="props.row?.guardian_id_number" fill color="blue-8" style="height: 1.5rem;" />
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <div class="row wrap justify-between"></div>
                <q-btn-dropdown color="grey-8" dense>
                  <q-list>
                    <q-item clickable @click="onShowMoreStudentDetailsDialog(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_more" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>View More</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable @click="onshowUpdateStudentDialog(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Update Guardian</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable @click="onshowStudentPhotographDialog(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_link" color="green-8" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Map Guardian to Student</q-item-label>
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
  <my-full-dialog v-model="showGuardianDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-md-12">
        <q-card class="card-shadow">
          <q-card-section class="row q-gutter-x-md">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="Guardian Onboarding" size="4rem" font-size="1.2rem" />
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
      <q-step :name="13" title="Personal Information" icon="settings" :done="step > 1">
        <q-form @submit="step = 2" @reset="onReset">
          <div class="row q-col-gutter-x-lg  ">
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.first_name" label="First Name*" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the guardian\'s first name']" />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.middle_name" label="Middle Name*" lazy-rules />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.last_name" label="Last Name  *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the guardian\'s last name']" />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.email" label="Email Address  " lazy-rules />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.phone_number1" label="Primary Mobile Number *" lazy-rules />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="guardianPayload.phone_number2" label="Secondary Mobile Number " lazy-rules />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-select v-model="guardianPayload.relationship_to_child" :options="relationshipToChild"
                label="Relationship to Child *" lazy-rules transition-show="scale" transition-hide="scale"
                behavior="default"
                :rules="[val => val != null || 'Please select the relationship to child']"></q-select>
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <div class="col-md-6 q-mt-lg">
                Gender:
                <q-radio dense v-model="guardianPayload.gender" val="Male" label="Male" class="q-mr-lg" required />
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
            <q-btn color="primary" label="Onboard Guardian" type="submit" :loading="loading" v-if="isUpdate == false" />
            <q-btn color="primary" label="Update Guardian" type="submit" v-if="isUpdate == true" :loading="loading" />
            <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-form>
      </q-step>
      <q-step :name="1" title="Other Details" icon="settings" :done="step > 3">
        <q-form @submit="onProcessGuardian" @reset="onReset">
          <div class="row q-col-gutter-x-lg  ">
            <div class="col-sm-6" style="min-width: 300px;">
              <q-select v-model="linkGuardianStudentPayload.student_id" :options="studentList"
                label="Select Ward/Student *" lazy-rules transition-show="scale" transition-hide="scale"
                behavior="default" option-value="id"
                :rules="[val => val != null || 'Please select student you wish to link to this Guardian']"
                :option-label="(student: any) => `${student.first_name} ${student.last_name} (${student.student_id_number})`">
                <q-tooltip anchor="center middle" self="bottom left">Please select student you wish to link to this
                  Guardian
                </q-tooltip>
              </q-select>r


            </div>

          </div>
          <q-stepper-navigation>
            <q-btn color="primary" label="Onboard Guardian" type="submit" :loading="loading" v-if="isUpdate == false" />
            <q-btn color="primary" label="Update Guardian" type="submit" v-if="isUpdate == true" :loading="loading" />
            <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-form>
      </q-step>
    </q-stepper>
  </my-full-dialog>

  <my-full-dialog v-model="showGuardianDetailsDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-md-12">
        <q-card class="card-shadow">
          <q-card-section class="row q-gutter-x-md">
            <!-- {{ displayStudentDetails }} -->
            <div class="col-auto">
              <q-avatar size="4rem" font-size="1.2rem" v-if="displayStudentDetails?.photo_path != null">
                <q-img :src="displayStudentDetails?.photo_path" />
              </q-avatar>
              <my-avatar :shape="ShapeConstants.ROUNDED" v-if="displayStudentDetails?.photo_path === null"
                :label="displayStudentDetails?.first_name + displayStudentDetails?.last_name" size="4rem"
                font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-if="isUpdate == false">
                <q-badge class="q-pl-md q-pr-md q-mb-md" :label="displayStudentDetails?.student_id_number" fill
                  color="blue-8" style="height: 1.5rem;" />
              </div>
              <div class="text-h5 text-weight-light" v-if="isUpdate == false">
                {{ displayStudentDetails?.first_name }} {{ displayStudentDetails?.middle_name }}
                {{ displayStudentDetails?.last_name }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-card color="primary" animated flat>
      <q-card class="card-shadow main_container q-pa-sm " flat>
        <q-card-section class="text-subitle4 ">
          <div class="sub_container col" id="specific-part">
            <div class="">
              <div class="row justify-between">
                <div class="col">
                  <div>
                    <!-- <q-img src="../../assets/images/cc/logo.png" fit="scale-down" width="8rem" /> -->
                  </div>
                  <div class="q-mt-xs q-ml-md">
                    <span class="text-h6 text-bold"> Student Details</span>
                  </div>
                </div>
                <div class="col">
                  <div class="text-right text-bold q-mr-md">
                    <span>Student Number: {{ displayStudentDetails?.student_id_number }} </span>
                  </div>
                </div>
              </div>
              <q-separator color="dark" size="0.4rem" inset class="q-mt-sm" />
              <q-card class="col card-shadow text-h6" flat>
                <q-card-section>
                  <div class="row justify-between">
                    <div>First Name: </div>
                    <div>{{ displayStudentDetails?.first_name }}</div>
                  </div>
                  <q-separator />
                  <div class="row justify-between">
                    <div>Middle Name:</div>
                    <div>
                      {{ displayStudentDetails?.middle_name }}
                    </div>
                  </div>
                  <q-separator />
                  <div class="row justify-between">
                    <div>Last Name: </div>
                    <div> {{ displayStudentDetails?.last_name }}</div>
                  </div>
                  <q-separator />
                  <div class="row justify-between">
                    <div>Gender: </div>
                    <div> {{ displayStudentDetails?.gender }}</div>
                  </div>
                  <q-separator />
                  <div class="row justify-between">
                    <div>Date of Birth: </div>
                    <div> {{ displayStudentDetails?.date_of_birth }}</div>
                  </div>
                  <q-separator />
                  <div class="row justify-between">
                    <div>Phone Number: </div>
                    <div> {{ displayStudentDetails?.phone_number }}</div>
                  </div>
                  <q-separator />
                  <div class="row justify-between">
                    <div>Emergency Phone Number: </div>
                    <div> {{ displayStudentDetails?.emergency_contact }}</div>
                  </div>
                  <q-separator />
                  <div class="row justify-between">
                    <div>Email Address: </div>
                    <div> {{ displayStudentDetails?.email }}</div>
                  </div>
                  <q-separator />
                  <div class="row justify-between">
                    <div>Country/Nationality: </div>
                    <div> {{ displayStudentDetails?.country }}, {{ displayStudentDetails?.nationality }} </div>
                  </div>
                  <q-separator />
                  <div class="row justify-between">
                    <div>Location/Address: </div>
                    <div> {{ displayStudentDetails?.address_line1 }}, {{ displayStudentDetails?.address_line2 }} </div>
                  </div>
                  <q-separator />
                  <div class="row justify-between">
                    <div>Student Role/Position: </div>
                    <div> {{ displayStudentDetails?.student_role }}</div>
                  </div>
                  <q-separator />
                  <div class="row justify-between">
                    <div>Student Status</div>
                    <div>{{ displayStudentDetails?.student_status }}</div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <strong></strong>
        </q-card-section>
      </q-card>

    </q-card>
  </my-full-dialog>


  <my-full-dialog v-model="showStudentStatusDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-md-12">
        <q-card class="card-shadow">
          <q-card-section class="row q-gutter-x-md">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="Upload Student Status" size="4rem" font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey">
                Upload Status
              </div>
              <div class="text-h5 text-weight-light">
                Upload Status for {{ displayStudentDetails.first_name }} {{ displayStudentDetails.last_name }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-stepper v-model="step" vertical color="primary" animated flat>
      <q-step :name="1" title="Upload Student Status" icon="person" :done="step > 1">
        <q-form @submit="onProcessNewGuardianPhoto" @reset="onReset">
          <div class="row q-col-gutter-x-lg  ">
            <div class="col-sm-12">
              <q-select v-model="studentStatus" :options="studentStatusOptions" label="Student Status *" lazy-rules
                transition-show="scale" transition-hide="scale" behavior="default"
                :rules="[val => val != null || 'Please select the student status']"></q-select>
            </div>
          </div>
          <q-stepper-navigation>
            <q-btn color="primary" label="Update Student Status" type="submit" :loading="loading" />
            <q-btn flat color="primary" label="Back" class="q-ml-sm" v-close-popup />
          </q-stepper-navigation>
        </q-form>
      </q-step>
    </q-stepper>
  </my-full-dialog>


  <q-dialog v-model="confirmCreateGuardianDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_add" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to create this guardian?</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Confirm" color="primary" @click="onProcessNewGuardian()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirmUpdateStudentDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_add" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to update this student?</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Confirm" color="primary" @click="onProcessUpdateStudent()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirmStudentStatusDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_add" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to update this student status?</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Confirm" color="primary" @click="onProcessUpdateStudentStatus()" />
      </q-card-actions>
    </q-card>
  </q-dialog>


  <!--
  <q-dialog v-model="confirmUpdateStudentDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to update this user?</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Confirm" color="primary" @click="onProcessUpdateUser()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirmResetUserDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="recommend" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to reset this user's password?</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessResetPassword()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirmBlockUserDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="recommend" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to block this user</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessBlockUser()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirmUnblockUserDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="recommend" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to unblock this user</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup :loading="loading" />
        <q-btn flat label="Confirm" color="primary" @click="onProcessUnblockUser()" :loading="loading" />
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
import { LocalStorage, useQuasar, Notify } from 'quasar';
import AAStatusConstants from 'src/constants/aa-status.constants';
import BaseUrlConstants from 'src/constants/url.constants';
import PaginationUtil from 'src/utils/pagination.utils';
import FetchDataRequest from 'src/models/FetchDataRequest.model';
import { MemberRecords } from 'src/models/member/AllMembers.model';
import { useRoute } from 'vue-router';
import { UAMUserData } from 'src/models/uam/Users.model';
import MyFullDialog from 'src/components/utils/MyFullDialog.vue';
import ShapeConstants from 'src/constants/shape.constants';
import MyAvatar from 'src/components/utils/MyAvatar.vue';
import { useSISStore } from 'src/stores/sis.store';
import { AllStudentRecord } from 'src/models/sis/AllStudents.model';
import { cleverchapApi, cleverchapUAMApi } from 'src/boot/axios';


// ------------------------------- GLOBAL DECLARATIONS --------------------------------- //
const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const sisStore = useSISStore();
const paginationUtil = ref(new PaginationUtil());
const searchKey = ref('');
const filter = ref(null);
const showGuardianDialog = ref(false);
const showGuardianDetailsDialog = ref(false);
const showStudentPhotographDialog = ref(false);
const showStudentStatusDialog = ref(false);
const displayStudentDetails = <any>ref(null);
const confirmCreateGuardianDialog = ref(false);
const confirmUpdateStudentDialog = ref(false);
const confirmStudentStatusDialog = ref(false);
const studentStatus = ref(null);
const confirmResetUserDialog = ref(false);
const confirmBlockUserDialog = ref(false);
const confirmUnblockUserDialog = ref(false);
const loading = ref(false);
const step = ref(1);

const isUpdate = ref(false);

const route = useRoute();

const username = <any>ref(null);
const institution_id = <any>ref(null);
const user_id = <any>ref(null);

if (LocalStorage.has('email')) {
  username.value = LocalStorage.getItem('email');
};
if (LocalStorage.has('institution_id')) {
  institution_id.value = LocalStorage.getItem('institution_id');
};
const studentStatusOptions = ref(['active', 'inactive', 'dropped-out', 'deferred']);
const relationshipToChild = ref(['Father', 'Mother', 'Sister', 'Brother', 'Auntie', 'Uncle', 'Other']);


// ------------------------------- REQUEST PAYLOAD --------------------------------- //

const linkGuardianStudentPayload = ref(
  {
    student_id: '' || null,
    guardian_id: ''
  });

const guardianPayload = ref(
  {
    guardian_id: '',
    first_name: 'da',
    last_name: 'ad',
    middle_name: 'da',
    class_id: 'da',
    // guardian_id_number: '',
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
    relationship_to_child: 'dada',
    // guardian_status: '',
    // progress_status: '',
    photo_path: 'ddaa',
    created_by: username.value,
    updated_by: 'daa',
  });

// ------------------------------- MEMBER METHODS --------------------------------- //

const studentList = computed(() => {
  return sisStore.listofStudents.records;
});


// const roleList = <any>computed(() => {
//   const result = appInfo.value.roles
//   return result;
// });

const guardianList = computed(() => {
  return sisStore.listofGuardians.records;
});


const newStudentDetails = computed(() => {
  return sisStore.newStudentDetails ?? '';
});


const onProcessGuardian = async () => {
  if (isUpdate.value == false) {
    confirmCreateGuardianDialog.value = true
    // onProcessNewGuardian();
  }
  else {
    confirmUpdateStudentDialog.value = true
    // onProcessUpdateUser();
  }
};

const getStudentPhotoUploadUrl = () => {
  const uploadUrl = BaseUrlConstants.UploadStudentPhoto;
  return uploadUrl;
};

const onSuccessfulUpload = (response: any) => {
  // Do something when the upload is successful
  Notify.create({
    message: 'Photograph uploaded successfully',
    type: 'positive',
    position: 'top-right',
    color: 'green-8',
    textColor: 'white',
    icon: 'cloud_done',
  });
  showGuardianDialog.value = false;
  showStudentPhotographDialog.value = false;
  step.value = 1;
  // loadRecords();
};

const onRejectedPhoto = async (rejectEntries: { failedPropValidation: string }[]) => {
  rejectEntries.forEach((entry) => {
    Notify.create({
      message: mapErrors[entry.failedPropValidation],
      type: 'negative',
      position: 'top-right',
      icon: 'close',
    });
  });
};

const mapErrors: Record<string, string> = {
  'accept': 'Only images please!',
  'max-file-size': 'Image size is too large.',
  'max-total-size': 'Exceeded max file size',
};


const onProcessNewGuardian = async () => {
  loading.value = true;
  console.log('g payload', guardianPayload.value)
  loading.value = false;
  // return false;
  const result = await sisStore.createGuardian(guardianPayload.value);

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

const onProcessUpdateStudent = async () => {
  loading.value = true;
  const result = await sisStore.updateStudent(guardianPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showGuardianDialog.value = false;
    confirmUpdateStudentDialog.value = false;
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

const onProcessUpdateStudentStatus = async () => {
  loading.value = true;
  const result = await sisStore.updateStudentStatus({
    student_id: displayStudentDetails.id,
    student_status: studentStatus.value
  });
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showStudentStatusDialog.value = false;
    confirmStudentStatusDialog.value = false;
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






const onProcessNewGuardianPhoto = async () => {
  loading.value = true;
  const result = await sisStore.uploadStudentPhoto(guardianPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showGuardianDialog.value = false;
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
    step.value = 3;
    $q.notify({
      color: 'red-8',
      textColor: 'white',
      icon: 'close',
      position: 'top-right',
      message: `${result.message}`,
    });
  }
};


const goToAssignedApps = (user: any) => {
  router.push(`/uam/assigned_apps/${user.id}`);
};


const loadRecords = async () => {
  getAllStudents(),
    getAllGuardians()
}

const getAllStudents = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, AllStudentRecord>(
    sisStore.getAllStudents.bind(sisStore, institution_id.value),
    fetchData,
  );
};

const getAllGuardians = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, AllStudentRecord>(
    sisStore.getAllGuardians.bind(sisStore, institution_id.value),
    fetchData,
  );
};






const onReset = () => {
  // guardianPayload.value = {
  //   first_name: '',
  //   last_name: '',
  //   phone_number: '',
  //   email: '',
  //   created_by: ''
  // }
}

// ------------------------------- HELPER METHODS --------------------------------- //

const onshowCreateGuardianDialog = () => {
  isUpdate.value = false;
  showGuardianDialog.value = true;
  step.value = 1
};

const onShowMoreStudentDetailsDialog = (student: any) => {
  displayStudentDetails.value = student;
  showGuardianDetailsDialog.value = true;
};

const onshowStudentPhotographDialog = (student: any) => {
  displayStudentDetails.value = student;
  showStudentPhotographDialog.value = true;
};

const onshowStudentStatusDialog = (student: any) => {
  displayStudentDetails.value = student;
  showStudentStatusDialog.value = true;
};




const onshowUpdateStudentDialog = (guardian: any) => {
  isUpdate.value = true;
  guardianPayload.value = {
    guardian_id: guardian.id,
    first_name: guardian.first_name,
    last_name: guardian.last_name,
    middle_name: guardian.middle_name,
    class_id: guardian?.class_id,
    // student_id_number: '',
    // password: '',
    date_of_birth: guardian.date_of_birth,
    gender: guardian.gender,
    email: guardian.email,
    phone_number1: guardian.phone_number1,
    relationship_to_child: guardian.relationship_to_child,
    phone_number2: guardian.phone_number2,
    address_line1: guardian.address_line1,
    address_line2: guardian.address_line2,
    city: guardian.city,
    state: guardian.state,
    postal_code: guardian.postal_code,
    country: guardian.country,
    nationality: guardian.nationality,
    // graduation_date: '',
    // current_semester: '',
    // student_status: '',
    // progress_status: '',
    photo_path: '',
    created_by: '',
    updated_by: username.value,
  };
  user_id.value = guardian.id
  showGuardianDialog.value = true;
};

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
  // {
  //   name: 'StudentPhoto', align: 'left', label: 'Student Photo', field: 'photo_path', required: true,
  // },
  {
    name: 'GuardianNumber', align: 'left', label: 'Guardian ID Number', field: 'guardian_id_number', required: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: (row: any) => {
      return row?.first_name + ' ' + row?.middle_name + ' ' + row?.last_name ?? 0;
    },
  },
  {
    name: 'Gender', align: 'left', label: 'Gender', field: 'gender', required: true,
  },
  {
    name: 'DateOfBirth', align: 'left', label: 'Date Of Birth', field: 'date_of_birth', required: true,
  },
  {
    name: 'GuardianStatus', align: 'left', label: 'Guardian Status', field: 'guardian_status', required: true,
  },
  {
    name: 'Nationality', align: 'left', label: 'Nationality', field: 'nationality', required: true,
  },
  { name: 'PrimaryMobileNumber', align: 'center', label: 'Primary Mobile Number', field: 'phone_number1' },
  { name: 'SecondaryMobileNumber', align: 'center', label: 'Seconday Mobile Number', field: 'phone_number2' },
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
