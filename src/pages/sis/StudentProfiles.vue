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
            <q-item-label class="text-h6 text-weight-bold"><q-icon name="account_circle" size="1.5rem"
                class="q-mr-md" />Student Profiles
            </q-item-label>
          </div>
        </div>
      </template>
      <template #sub-title>
        <div class="text-h7 text_weight_light">View profiles of all students in your school</div>
      </template>
    </MainBottomHeader>
    <div style="margin-top: -4rem;" class="q-pa-lg">
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <!-- Left column with vertical cards -->
        <div class="col-xs-12 col-md-4 col-lg-3">
          <q-card class="card-shadow q-mb-md">
            <q-card-section>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="o_groups" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Total Students</q-item-label>
                  <q-item-label class="text-bold text-green-7 text-h4">{{ studentTotal }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card class="card-shadow q-mb-md">
            <q-card-section>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="male" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Male Students</q-item-label>
                  <q-item-label class="text-bold text-blue-7 text-h4">{{ studentSummary?.totalMales }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card class="card-shadow q-mb-md">
            <q-card-section>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="female" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Female Students</q-item-label>
                  <q-item-label class="text-bold text-pink-7 text-h4">{{ studentSummary?.totalFemales }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card class="card-shadow q-mb-md">
            <q-card-section>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="check_circle" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Active Students</q-item-label>
                  <q-item-label class="text-bold text-green-7 text-h4">{{ studentSummary?.activeStudents
                    }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

          <q-card class="card-shadow q-mb-md">
            <q-card-section>
              <q-item>
                <q-item-section avatar>
                  <q-icon class="text-grey-7" text-color="white" name="cancel" size="3rem" font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle text-h7 text-grey-8">Inactive Students</q-item-label>
                  <q-item-label class="text-bold text-red-7 text-h4">{{ studentSummary?.inactiveStudents
                    }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>

        </div>

        <!-- Right column -->
        <div class="col-xs-12 col-md-8 col-lg-9">
          <!-- <short-search-box label="Add Student Profile" icon="person_add_alt" v-model="searchKey"
            @toggleDialog="onshowCreateStudentDialog" @toggle-view="onToggleView()"
            :on-refresh="loadRecords" /> -->
          <short-search-box label="Add Student Profile" icon="person_add_alt" v-model="searchKey"
            @toggle-view="onToggleView" @toggleDialog="onshowCreateStudentDialog" :on-refresh="loadRecords" />
          <q-table v-if="isListView === true" style="margin-top: 2rem;" flat :filter="searchKey"
            :loading="paginationUtil.loading" :rows="studentList" :columns="columns" row-key="memberId" padding>
            <template v-slot:loading>
              <q-inner-loading showing class="bg-brand-loading" />
            </template>

            <template v-slot:body-cell-StudentPhoto="props">
              <q-td key="StudentPhoto" :props="props">
                <q-avatar size="80px">
                  <q-img :src="props.row.photo_path" />
                </q-avatar>
              </q-td>
            </template>
            <template v-slot:body-cell-StudentStatus="props">
              <q-td key="StudentStatus" :props="props">
                <q-badge v-if="props.row.status.toLowerCase() === 'active'" class="q-pl-md q-pr-md" label="Active" fill
                  color="green-8" style="height: 1.5rem;" />
                <q-badge v-if="props.row.status.toLowerCase() === 'inactive'" class="q-pl-md q-pr-md" label="Inactive"
                  fill color="red-7" style="height: 1.5rem;" />
                <q-badge v-if="props.row.status.toLowerCase() === 'dropped-out'" class="q-pl-md q-pr-md"
                  label="Dropped Out" fill color="red-7" style="height: 1.5rem;" />
                <q-badge v-if="props.row.status.toLowerCase() === 'deferred'" class="q-pl-md q-pr-md" label="Deferred"
                  fill color="red-7" style="height: 1.5rem;" />
              </q-td>
            </template>

            <template v-slot:body-cell-StudentNumber="props">
              <q-td key="StudentNumber" :props="props">
                <q-badge v-if="props.row?.studentNumber != null" class="q-pl-md q-pr-md"
                  :label="props.row?.studentNumber" fill color="blue-8" style="height: 1.5rem;" />
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td key="actions" :props="props" auto-width>
                <div class="row wrap justify-between"></div>
                <q-btn-dropdown color="grey-8" dense>
                  <q-list>
                    <q-item clickable @click="goToSummaryPage(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_more" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>View Full Profile</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable @click="onshowUpdateStudentDialog(props.row as any)">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Edit Profile</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />

                    <q-separator />
                  </q-list>
                </q-btn-dropdown>
              </q-td>
            </template>
          </q-table>

          <!-- <q-card> -->
          <q-table v-if="isListView === false" grid flat bordered :rows="studentList" :columns="cardColumns"
            row-key="id" :filter="searchKey" hide-header :loading="paginationUtil.loading"
            class="q-mt-md bg-white text-black q-pa-md" card-class="q-mt-md bg-primary text-white">
            <template v-slot:loading>
              <q-inner-loading showing class="bg-brand-loading" />
            </template>
          </q-table>

          <!-- </q-card> -->

        </div>
      </div>
    </div>
  </main>
  <my-full-dialog v-model="showStudentDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-md-12">
        <q-card class="card-shadow">
          <q-card-section class="row q-gutter-x-md">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="Student Onboarding" size="4rem" font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-if="isUpdate == false">
                Student Onboarding
              </div>
              <div class="text-subtitle2 text-weight-medium text-blue-grey" v-if="isUpdate == true">
                Student Update
              </div>
              <div class="text-h5 text-weight-light" v-if="isUpdate == false">
                Add Student
              </div>
              <div class="text-h5 text-weight-light" v-if="isUpdate == true">
                Update Student Details
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
              <q-input v-model="studentPayload.firstName" label="First Name*" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the student\'s first name']" />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="studentPayload.surName" label="Last Name  *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the student\'s last name']" />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="studentPayload.emergencyContact" label="Emergency Contact  *" lazy-rules :rules="[
            (val) => (val && Number(val) && val > 0) || 'Enter the emergency contact',
            (val) => val.length == 10 || 'Must be 10 digits'
          ]" />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="studentPayload.phoneNumber" label="Phone Number  " lazy-rules />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="studentPayload.email" label="Email Address  " lazy-rules />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="studentPayload.studentNumber" label="Student Number (Optional)  " lazy-rules />
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

        <q-form @submit="onProcessUser" @reset="onReset">
          <div class="row q-col-gutter-x-lg  ">
            <div class="col-sm-6" style="min-width: 300px;">
              <q-select v-model="studentPayload.gender" :options="studentGenderOptions" label="Gender *" lazy-rules
                transition-show="scale" transition-hide="scale" behavior="default"
                :rules="[val => val && val.length > 0 || 'Select the student\'s gender']"></q-select>
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="studentPayload.residentialAddress" label="Residential Address  *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the residential address']" />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="studentPayload.homeTownAddress" label="Hometown Address " lazy-rules />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="studentPayload.country" label="Country  *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the country']" />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="studentPayload.city" label="City  *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the city']" />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="studentPayload.nationality" label="Nationality  *" lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter the nationality']" />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="studentPayload.postalCode" label="Postal Code  " lazy-rules />
            </div>
            <div class="col-sm-6" style="min-width: 300px;">
              <q-input v-model="studentPayload.state" label="State/Region  *" lazy-rules />
            </div>
          </div>
          <q-stepper-navigation>
            <q-btn color="primary" label="Onboard Student" type="submit" :loading="loading" v-if="isUpdate == false" />
            <q-btn color="primary" label="Update Student" type="submit" v-if="isUpdate == true" :loading="loading" />
            <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-form>
      </q-step>
      <!-- <q-step :name="3" title="Upload Student Photograph (Optional)" icon="person" :done="step > 3"
        v-if="isUpdate == false">
        <q-form @submit="onProcessNewStudentPhoto" @reset="onReset">
          <div class="row q-col-gutter-x-lg  ">
            <div class="col-sm-6" style="min-width: 500px;">
              <q-uploader :url="getStudentPhotoUploadUrl()" field-name="photo_path" style="min-width: 500px;" :headers="[
            { name: 'TenantId', value: institution_id }
          ]" :form-fields="[
            { name: 'student_id', value: newStudentDetails.id || '' }
          ]" accept="image/*" max-file-size="2048000" @rejected="onRejectedPhoto" @uploaded="onSuccessfulUpload" />
            </div>
          </div>
        </q-form>
      </q-step> -->
    </q-stepper>
  </my-full-dialog>

  <my-full-dialog v-model="showStudentDetailsDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-md-12">
        <q-card class="card-shadow">
          <q-card-section class="row q-gutter-x-md">
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

  <my-full-dialog v-model="showStudentPhotographDialog">
    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col-md-12">
        <q-card class="card-shadow">
          <q-card-section class="row q-gutter-x-md">
            <div class="col-auto">
              <my-avatar :shape="ShapeConstants.ROUNDED" label="Upload Student Photograph" size="4rem"
                font-size="1.2rem" />
            </div>
            <div class="col">
              <div class="text-subtitle2 text-weight-medium text-blue-grey">
                Upload Student Photograph
              </div>
              <div class="text-h5 text-weight-light">
                Update Photograph for {{ displayStudentDetails.first_name }} {{ displayStudentDetails.last_name }}
              </div>

            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-stepper v-model="step" vertical color="primary" animated flat>
      <q-step :name="1" title="Upload Student Photograph" icon="person" :done="step > 1">
        <q-form @submit="onProcessNewStudentPhoto" @reset="onReset">
          <div class="row q-col-gutter-x-lg  ">
            <div class="col-sm-12">
              <q-uploader :url="getStudentPhotoUploadUrl()" field-name="photo_path" style="min-width: 1000px;" :headers="[
            { name: 'TenantId', value: institution_id }
          ]" :form-fields="[
            { name: 'student_id', value: displayStudentDetails.id || '' }
          ]" accept="image/*" max-file-size="2048000" @rejected="onRejectedPhoto" @uploaded="onSuccessfulUpload" />
            </div>
          </div>
        </q-form>
      </q-step>
    </q-stepper>
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
    <!-- {{ displayStudentDetails }} -->
    <q-stepper v-model="step" vertical color="primary" animated flat>
      <q-step :name="1" title="Upload Student Status" icon="person" :done="step > 1">
        <q-form @submit="onProcessUpdateStudentStatus" @reset="onReset">
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


  <q-dialog v-model="confirmCreateStudentDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_add" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to create this student?</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Confirm" color="primary" @click="onProcessNewStudent()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirmUpdateStudentDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div class="col">
          <q-avatar icon="o_edit" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to update this student?</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Confirm" color="primary" @click="onProcessUpdateStudent()" :loading="loading" />
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
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { LocalStorage, useQuasar, Notify } from 'quasar';
import AAStatusConstants from 'src/constants/aa-status.constants';
import BaseUrlConstants from 'src/constants/url.constants';
import PaginationUtil from 'src/utils/pagination.utils';
import FetchDataRequest from 'src/models/FetchDataRequest.model';
import { useRoute } from 'vue-router';
import MyFullDialog from 'src/components/utils/MyFullDialog.vue';
import ShapeConstants from 'src/constants/shape.constants';
import MyAvatar from 'src/components/utils/MyAvatar.vue';
import { useSISStore } from 'src/stores/sis.store';
import { AllStudentRecord, StudentRecordSummary } from 'src/models/sis/AllStudents.model';
import { DateTime } from 'luxon';
import MainBottomHeader from 'components/structure/MainBottomHeader.vue';
import ShortSearchBox from 'components/utils/ShortSearchBar.vue';

// ------------------------------- GLOBAL DECLARATIONS --------------------------------- //
const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const sisStore = useSISStore();
const paginationUtil = ref(new PaginationUtil());
const searchKey = ref('');
const filter = ref(null);
const showStudentDialog = ref(false);
const isListView = ref<boolean>(true);
const showStudentDetailsDialog = ref(false);
const showStudentPhotographDialog = ref(false);
const showStudentStatusDialog = ref(false);
const displayStudentDetails = <any>ref(null);
const confirmCreateStudentDialog = ref(false);
const confirmUpdateStudentDialog = ref(false);
const confirmStudentStatusDialog = ref(false);
const studentStatus = ref(null);
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
if (LocalStorage.has('institutionId')) {
  institution_id.value = LocalStorage.getItem('institutionId');
};
const studentStatusOptions = ref(['active', 'inactive', 'dropped-out', 'deferred']);
const studentGenderOptions = ref(['Male', 'Female']);

const now = ref(DateTime.local());

const currentDateTime_ = computed(() => {
  // return now.value.toFormat('ccc LLL dd, hh:mm:ss a');
  return now.value.toFormat('ccc LLL dd, yy');
});



const goToSummaryPage = (student: any) => {
  router.push(`/sis/student-profile/${student.id}`);
};
// ------------------------------- REQUEST PAYLOAD --------------------------------- //


const studentPayload = ref(
  {
    tenantId: institution_id.value,
    classId: '',
    firstName: '',
    surName: '',
    email: '',
    phoneNumber: '',
    studentNumber: '',
    gender: '',
    nationality: '',
    residentialAddress: '',
    homeTownAddress: '',
    dateOfBirth: '',
    status: 'Active',
    photo: '',
    country: '',
    postalCode: '',
    state: '',
    city: '',
    emergencyContact: '',
    createdBy: username.value,
    ...(isUpdate.value ? { Id: '' } : {}),
    ...(isUpdate.value ? { updatedBy: '' } : {})
  }
);

const getStudentProfileFilter = ref(
  {
    tenantId: institution_id.value,
    pageSize: 1000,
    studentId: '',
    status: '',
    firstName: '',
    surName: '',
    country: '',
    city: '',
    gender: '',
    dateCreated: '',
    createdBy: ''
  });


// ------------------------------- MEMBER METHODS --------------------------------- //

const studentList = computed(() => {
  return sisStore.listofStudents.records;
});
const studentTotal = computed(() => {
  return sisStore.listofStudents.total;
});
const studentSummary = computed(() => {
  return sisStore.listofStudents.summary as StudentRecordSummary;
});



const newStudentDetails = computed(() => {
  return sisStore.newStudentDetails ?? '';
});


const onProcessUser = async () => {
  if (isUpdate.value == false) {
    confirmCreateStudentDialog.value = true
    // onProcessNewStudent();
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
  showStudentDialog.value = false;
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


const onProcessNewStudent = async () => {
  loading.value = true;
  const result = await sisStore.createStudent(studentPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showStudentDialog.value = false;
    confirmCreateStudentDialog.value = false;
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
  const result = await sisStore.updateStudent(studentPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showStudentDialog.value = false;
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
    student_id: displayStudentDetails.value?.id,
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






const onProcessNewStudentPhoto = async () => {
  loading.value = true;
  const result = await sisStore.uploadStudentPhoto(studentPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showStudentDialog.value = false;
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
  getAllStudents()

}

// const getAllStudents = async () => {
//   const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
//   await paginationUtil.value.initiate<unknown, AllStudentRecord>(
//     sisStore.getAllStudents.bind(sisStore, institution_id.value),
//     fetchData,
//   );
// };

const getAllStudents = async () => {
  const fetchData = new FetchDataRequest(searchKey.value, filter.value);
  paginationUtil.value.initiate(
    () => sisStore.getAllStudents(getStudentProfileFilter.value),
    fetchData,
    () => sisStore.listofStudents
  );
};





const onReset = () => {
  // studentPayload.value = {
  //   first_name: '',
  //   last_name: '',
  //   phone_number: '',
  //   email: '',
  //   created_by: ''
  // }
}

// ------------------------------- HELPER METHODS --------------------------------- //

const onshowCreateStudentDialog = () => {
  isUpdate.value = false;
  showStudentDialog.value = true;
  step.value = 1
};

const onToggleView = (newView: boolean) => {
  console.log('isListView', newView)
  isListView.value = newView;
};

const onShowMoreStudentDetailsDialog = (student: any) => {
  displayStudentDetails.value = student;
  showStudentDetailsDialog.value = true;
};

const onshowStudentPhotographDialog = (student: any) => {
  displayStudentDetails.value = student;
  showStudentPhotographDialog.value = true;
};

const onshowStudentStatusDialog = (student: any) => {
  displayStudentDetails.value = student;
  showStudentStatusDialog.value = true;
};

// SFSGH_CC390M203
const onshowUpdateStudentDialog = (student: any) => {
  isUpdate.value = true;
  studentPayload.value = {
    Id: student.id,
    firstName: student.firstName,
    surName: student.surName,
    classId: student?.classId,
    studentNumber: student?.studentNumber,
    dateOfBirth: student.dateOfBirth,
    gender: student.gender,
    email: student.email,
    phoneNumber: student.phoneNumber,
    emergencyContact: student.emergencyContact,
    residentialAddress: student.residentialAddress,
    homeTownAddress: student.homeTownAddress,
    city: student.city,
    state: student.state,
    postalCode: student.postalCode,
    country: student.country,
    nationality: student.nationality,
    status: student?.status,
    photo: '',
    createdBy: username.value,
    updatedBy: username.value,
    tenantId: institution_id.value
  };
  user_id.value = student.id
  showStudentDialog.value = true;
};

const goToGuardianPage = (student: any) => {
  router.push(`/sis/student-guardian/${student.id}`);
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
  {
    name: 'StudentNumber', align: 'left', label: 'Student ID Number', field: 'studentNumber', required: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: (row: any) => {
      return row?.firstName + ' ' + row?.surName;
    },
  },
  {
    name: 'Gender', align: 'left', label: 'Gender', field: 'gender', required: true,
  },
  {
    name: 'StudentStatus', align: 'left', label: 'Student Status', field: 'status', required: true,
  },
  {
    name: 'Nationality', align: 'left', label: 'Nationality', field: 'country', required: true,
  },
  { name: 'MobileNumber', align: 'center', label: 'Mobile Number', field: 'phoneNumber' },
  { name: 'ResidentialAddress', align: 'center', label: 'Residential Address', field: 'residentialAddress' },
  {
    name: 'CreatedAt',
    label: 'Created At',
    align: 'center',
    field: (row: any) => {
      return formatCustomDate(row?.createdAt);
    },
  },
]);

const cardColumns: any = ([
  {
    name: 'StudentNumber', align: 'left', label: 'Student ID Number', field: 'studentNumber', required: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: (row: any) => {
      return row?.firstName + ' ' + row?.surName;
    },
  },
  {
    name: 'Gender', align: 'left', label: 'Gender', field: 'gender', required: true,
  },
  {
    name: 'StudentStatus', align: 'left', label: 'Student Status', field: 'status', required: true,
  },
  {
    name: 'Nationality', align: 'left', label: 'Nationality', field: 'country', required: true,
  },
  { name: 'MobileNumber', align: 'center', label: 'Mobile Number', field: 'phoneNumber' },
  { name: 'ResidentialAddress', align: 'center', label: 'Residential Address', field: 'residentialAddress' },
  {
    name: 'CreatedAt',
    label: 'Created At',
    align: 'center',
    field: (row: any) => {
      return formatCustomDate(row?.createdAt);
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
