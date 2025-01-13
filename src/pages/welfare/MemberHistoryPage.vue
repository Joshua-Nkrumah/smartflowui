<template>
  <main class="main-content">
    <BottomHeader>
      <!-- <template #actions>
        <q-btn icon="person_add_alt" label="New Member" size="16px" color="white" text-color="primary" class="text-bold"
          no-caps push @click="onshowCreateMemberDialog" />
      </template> -->
    </BottomHeader>
    <div style="margin-top: -4rem;" class="q-pa-lg">
      <div class="row q-col-gutter-x-lg">
        <div class="col-md-3 ">
          <q-card class="card-shadow">
            <q-card-section>
              <q-item class="q-mt-md">
                <q-item-section avatar>
                  <my-avatar color="blue-8" text-color="white" :shape="ShapeConstants.ROUNDED" label="Member" size="4rem"
                    font-size="1.5rem" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-bold text-h6">Member History</q-item-label>
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
                      Name
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">
                      {{ memberInfo?.firstName }} {{ memberInfo?.middleName }} {{ memberInfo?.lastName }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_email" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Email Address
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">{{
                      memberInfo?.emailAddress }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_phone" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Phone Number
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">{{ memberInfo?.phoneNumber
                    }}
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
                    <q-avatar size="3rem" icon="o_badge" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Emergency Contact
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">{{
                      memberInfo?.emergencyContact }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="fa-solid fa-signal" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Membership Status
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">{{
                      memberInfo?.membershipStatus }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="fa-solid fa-person-dress" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Membership Type
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">{{
                      memberInfo?.membershipType }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="fa-solid fa-people-carry-box" rounded color="yellow-5"
                      text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Occupation
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">{{
                      memberInfo?.occupation }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="3rem" icon="o_event" rounded color="yellow-5" text-color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-light" style="font-size: 1rem">
                      Date Joined
                    </q-item-label>
                    <q-item-label caption lines="1" class="text-bold" style="font-size: 0.7rem">{{
                      formattedMemberDate }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-9 ">
          <my-search-box v-model="searchKey" :on-refresh="loadRecords" />
          <q-card flat class="card-shadow q-mt-lg">
            <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
              narrow-indicator>
              <q-tab name="contributions" label="Contributions" active />
              <q-tab name="donations" label="Donations" active />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab" animated>
              {{ contributionList }}
              <q-tab-panel name="contributions">
                <q-table style="margin-top: 2rem;" title="Contribution" flat :filter="searchKey"
                  :loading="paginationUtil.loading" v-model:pagination="paginationUtil.pagination"
                  :rows="(contributionList as any)" :columns="contributionColumns" row-key="id" padding>
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
                          <!-- <q-item clickable @click="onshowUpdateContributionDialog(props.row as MemberRecords)">
                      <q-item-section side>
                        <q-icon name="o_receipt_long" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Print Receipt</q-item-label>
                      </q-item-section>
                    </q-item> -->
                        </q-list>
                      </q-btn-dropdown>
                    </q-td>
                  </template>
                </q-table>
              </q-tab-panel>
              <q-tab-panel name="donations">
                <q-table style="margin-top: 2rem;" title="Donations" flat :filter="searchKey"
                  :loading="paginationUtil.loading" v-model:pagination="paginationUtil.pagination" :rows="donationList"
                  :columns="donationColumns" row-key="id" padding>
                  <template v-slot:body-cell-DonationStatus="props">
                    <q-td key="DonationStatus" :props="props">
                      <q-badge v-if="props.row.donation.donationStatus === 'completed'" class="q-pl-md q-pr-md"
                        label="Completed" fill color="green-8" style="height: 1.5rem;" />
                      <q-badge v-if="props.row.donation.donationStatus === 'pending'" class="q-pl-md q-pr-md"
                        label="Pending" fill color="yellow-8" style="height: 1.5rem;" />
                      <q-badge v-if="props.row.donation.donationStatus === 'resigned'" class="q-pl-md q-pr-md"
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
                          <!-- <q-item clickable @click="onshowUpdateContributionDialog(props.row as MemberRecords)">
                      <q-item-section side>
                        <q-icon name="o_edit_note" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Update Contribution</q-item-label>
                      </q-item-section>
                    </q-item> -->

                          <!-- <q-item clickable @click="onshowConfirmationDialog(props.row as MemberRecords)">
                      <q-item-section side>
                        <q-icon name="o_delete" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Mark as Deleted</q-item-label>
                      </q-item-section>
                    </q-item> -->
                        </q-list>
                      </q-btn-dropdown>
                    </q-td>
                  </template>
                </q-table>
              </q-tab-panel>
            </q-tab-panels>
            <q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </main>
  <q-dialog v-model="showMemberDialog" rounded style="width: 100% !important;">
    <q-card style="width: 900px; max-width: 100vw;">
      <q-toolbar>
        <q-avatar>
          <q-icon name="person_add_alt" color="blue-9" size="30px" v-if="isUpdate == false" />
          <q-icon name="edit" color="blue-9" size="30px" v-if="isUpdate == true" />
        </q-avatar>
        <q-toolbar-title color="blue-9" v-if="isUpdate == false"><span class="text-weight-bold">Add
            Member</span></q-toolbar-title>
        <q-toolbar-title color="blue-9" v-if="isUpdate == true"><span class="text-weight-bold">Update
            Member</span></q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section>
        <div class="">
          <q-stepper v-model="step" vertical color="primary" animated flat>
            <q-step :name="1" title="Personal Information" icon="settings" :done="step > 1">
              <q-form @submit="step = 2" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.firstName" label="First Name *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the member\'s first name']" />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.middleName" label="Middle Name " lazy-rules />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.lastName" label="Last Name *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the member\'s last name']" />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.emailAddress" label="Email Address *" type="email" lazy-rules :rules="[
                      (val) => (val && val.length > 0) || 'Enter the email address of the member',
                      (val) => (val && /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val)) || 'Must be a valid email address'
                    ]" />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.age" label="Age *" type="number" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the Age of the member']" />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.location" label="Location *" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the location of the member']" />
                  </div>

                  <div class="col-md-6">
                    <q-input v-model="memberPayload.phoneNumber" type="number" hint="+233 (XXX) XXX - XXX" autogrow
                      label="Mobile Number" :rules="[
                        (val) => (val && Number(val) && val > 0) || 'Enter the mobile number of the member',
                        (val) => val.length == 10 || 'Must be 10 characters'
                      ]">
                      <q-tooltip anchor="center middle" self="bottom left">Mobile Number
                      </q-tooltip>
                    </q-input>
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.emergencyContact" type="number" hint="+233 (XXX) XXX - XXX" autogrow
                      label="Emergency Contact" :rules="[
                        (val) => (val && Number(val) && val > 0) || 'Enter the emergency contact of the member',
                        (val) => val.length == 10 || 'Must be 10 characters'
                      ]">
                      <q-tooltip anchor="center middle" self="bottom left">Emergency Contact
                      </q-tooltip>
                    </q-input>
                  </div>
                  <div class="col-md-6 q-mt-xl">
                    <q-radio dense v-model="memberPayload.gender" val="male" label="Male" class="q-mr-lg" />
                    <q-radio dense v-model="memberPayload.gender" val="female" label="Female" />
                  </div>
                </div>

                <q-stepper-navigation>
                  <q-btn type="submit" color="primary" label="Next Step" class="q-mr-md" />
                  <q-btn color="dark" label="Clear All" @click="onReset()" />
                </q-stepper-navigation>

              </q-form>
            </q-step>

            <q-step :name="2" title="Other Information" caption="Optional" icon="create_new_folder" :done="step > 2">
              <q-form @submit="onProcessMember" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">
                  <div class="col-md-6">
                    <q-select v-model="memberPayload.maritalStatus" :options="maritalStatusOptions" label="Marital Status"
                      lazy-rules transition-show="scale" transition-hide="scale" behavior="default"
                      :rules="[(val) => (val && val.length > 0) || 'Select Marital Status']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the marital status
                      </q-tooltip>
                    </q-select>
                  </div>
                  <div class="col-md-6">
                    <q-select v-model="memberPayload.membershipStatus" :options="membershipStatusOptions"
                      label="Membership Status" lazy-rules transition-show="scale" transition-hide="scale"
                      behavior="default" :rules="[(val) => (val && val.length > 0) || 'Select Membership Status']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the membership status
                      </q-tooltip>
                    </q-select>
                  </div>
                  <div class="col-md-6">
                    <q-select v-model="memberPayload.membershipType" :options="membershipTypeOptions"
                      label="Membership Type" lazy-rules transition-show="scale" transition-hide="scale"
                      behavior="default" :rules="[(val) => (val && val.length > 0) || 'Select Membership Type']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the membership type
                      </q-tooltip>
                    </q-select>
                  </div>
                  <!-- <div class="col-md-6">
                    <q-input v-model="memberPayload.children" type="number" label="Children Count*" lazy-rules :rules="[
                      (val) => (val && Number(val)) || 'Enter the children\'s count',
                    ]" />
                  </div> -->
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.occupation" label="Occupation " lazy-rules
                      :rules="[val => val && val.length > 0 || 'Enter the occupation of the member']" />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.additionalInformation" label="Additional Information " lazy-rules />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.dateOfBirth"
                      :rules="[(val) => (val && val.length > 0) || 'Choose Member\'s Date of Birth']"
                      label="Date of Birth">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="memberPayload.dateOfBirth" mask="YYYY-MM-DD">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="memberPayload.dateJoined"
                      :rules="[(val) => (val && val.length > 0) || 'Choose Member\'s Date Joined']"
                      label="Date of Joined">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="memberPayload.dateJoined" mask="YYYY-MM-DD">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
                <q-stepper-navigation>
                  <q-btn color="primary" label="Onboard Member" type="submit" :loading="loading"
                    v-if="isUpdate == false" />
                  <q-btn color="primary" label="Update Member" type="submit" v-if="isUpdate == true" />
                  <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
              </q-form>
            </q-step>
          </q-stepper>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showContributionDialog" rounded style="width: 100% !important;">
    <q-card style="width: 900px; max-width: 100vw;">
      <q-toolbar>
        <q-avatar>
          <q-icon name="fa-solid fa-hand-holding-dollar" color="blue-9" size="30px" v-if="isUpdate == false" />
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
              <q-form @submit="onProcessNewContribution" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">
                  <div class="col-md-6">
                    <q-input v-model="contributionPayload.amount" label="Amount *" type="number" lazy-rules :rules="[
                      (val: number) => (val && Number(val) && val > 0) || 'Enter the contribution amount',]" />
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
                    <q-input v-model="contributionPayload.remarks" label="Remarks " lazy-rules />
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="contributionPayload.description" label="Description " />
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
  <q-dialog v-model="showDonationDialog" rounded style="width: 100% !important;">
    <q-card style="width: 900px; max-width: 100vw;">
      <q-toolbar>
        <q-avatar>
          <q-icon name="fa-solid fa-gift" color="blue-9" size="30px" v-if="isUpdate == false" />
          <q-icon name="edit" color="blue-9" size="30px" v-if="isUpdate == true" />
        </q-avatar>
        <q-toolbar-title color="blue-9" v-if="isUpdate == false"><span class="text-weight-bold">Add
            Donation</span></q-toolbar-title>
        <!-- <q-toolbar-title color="blue-9" v-if="isUpdate == true"><span class="text-weight-bold">Update
            Donation</span></q-toolbar-title> -->
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
            <q-step :name="1" title="Add a new donation for the member above" :done="step > 1">
              <q-form @submit="onProcessNewDonation" @reset="onReset">
                <div class="row q-col-gutter-x-lg  ">
                  <div class="col-md-6">
                    <q-input v-model="donationPayload.amount" label="Amount *" type="number" lazy-rules :rules="[
                      (val: number) => (val && Number(val) && val > 0) || 'Enter the donation amount',]" />
                  </div>
                  <div class="col-md-6">
                    <q-select v-model="donationPayload.donationStatus" :options="donationStatusOptions"
                      label="Donation Status" lazy-rules transition-show="scale" transition-hide="scale"
                      behavior="default"
                      :rules="[(val: string | any[]) => (val && val.length > 0) || 'Select Donation Status']">
                      <q-tooltip anchor="center middle" self="bottom left">Select the donation status
                      </q-tooltip>
                    </q-select>
                  </div>
                  <div class="col-md-6">
                    <q-input v-model="donationPayload.remarks" label="Remarks " lazy-rules />
                  </div>

                  <div class="col-md-6">
                    <q-input v-model="donationPayload.description" label="Description " />
                  </div>
                </div>
                <q-stepper-navigation>
                  <q-btn color="primary" label="Add Donation" type="submit" :loading="loading" v-if="isUpdate == false"
                    class="q-mr-md" />
                  <q-btn color="dark" label="Clear All" @click="onReset()" />
                </q-stepper-navigation>
              </q-form>
            </q-step>
          </q-stepper>
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
</template>

<script lang="ts" setup>
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
import { useRoute } from 'vue-router';
import ShapeConstants from 'src/constants/shape.constants';
import MyAvatar from 'src/components/utils/MyAvatar.vue';


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
const loading = ref(false);
const step = ref(1);
const maritalStatusOptions = ref(['single', 'married', 'divorced', 'separated', 'widowed', 'remarried']);
const membershipTypeOptions = ref(['member', 'associate member', 'guest', 'member', 'government', 'oraganization', 'prospecitve member', 'life member', 'former member', 'baptized member']);
const membershipStatusOptions = ref(['active', 'inactive', 'resigned']);
const donationStatusOptions = ref(['completed', 'pending']);
const contributionStatusOptions = ref(['completed', 'pending']);
const showContributionDialog = ref(false);
const showDonationDialog = ref(false);
const isUpdate = ref(false);
const filter = ref(null);
const memberId = ref('');
const route = useRoute();
const formattedMemberDate = ref('');
const tab = ref('contributions');


const username = <any>ref(null);

if (LocalStorage.has('username')) {
  username.value = LocalStorage.getItem('username');
};



// ------------------------------- REQUEST PAYLOAD --------------------------------- //

const contributionPayload = ref(
  {
    memberId: '',
    amount: parseFloat('1.00'),
    description: '',
    contributionStatus: '',
    createdBy: '',
    remarks: ''
  });


const donationPayload = ref({
  amount: parseFloat('1.00'),
  description: '',
  donationStatus: '',
  createdBy: '',
  memberId: '',
  remarks: ''
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


const selectedMemberPayload = ref(
  {
    firstName: '',
    middleName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
  });

// ------------------------------- MEMBER METHODS --------------------------------- //

const memberList = computed(() => {
  return welfareStore.listOfMembers?.records.filter((record: any) => (record.isDeleted != 'deleted'));
});


const contributionList = computed(() => {
  return welfareStore?.listOfContributions?.records.filter((record: any) => (record?.members?.memberId == route.params['memberId']));
});

const donationList = computed(() => {
  return welfareStore?.listOfDonations?.records.filter((record: any) => (record?.members?.memberId == route.params['memberId']));
});


const onProcessMember = async () => {
  if (isUpdate.value == false) {
    onProcessNewMember();
  }
  else {
    onProcessUpdateMember();
  }
};

const onProcessNewContribution = async () => {
  loading.value = true;
  contributionPayload.value.memberId = memberId.value;
  const result = await welfareStore.createContribution(contributionPayload.value);
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

const onProcessNewDonation = async () => {
  loading.value = true;
  donationPayload.value.memberId = memberId.value;
  const result = await welfareStore.createDonation(donationPayload.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    showDonationDialog.value = false;
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
    memberID: memberId.value
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

const gotoMemberHistory = (member: any) => {
  router.push(`/welfare/members-history/${member.memberId}`);
};

const memberInfo = <any>computed(() => {
  const result = <any>welfareStore.listOfMembers?.records.filter((record: any) => (record.memberId === route.params['memberId']))[0];
  formatCustomDate(result?.createdAt.toString());
  return result;
});


const loadRecords = async () => {
  getAllMembers(),
    getAllContributions(),
    getAllDonations()
}

const getAllContributions = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, MemberRecords>(
    welfareStore.getAllContributions,
    fetchData,
  );
}

const getAllDonations = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, MemberRecords>(
    welfareStore.getAllDonations,
    fetchData,
  );
}

const getAllMembers = async () => {
  const fetchData = new FetchDataRequest<unknown>(searchKey.value, filter.value);
  await paginationUtil.value.initiate<unknown, MemberRecords>(
    welfareStore.getAllMembers,
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
  {
    memberId: '',
    amount: parseFloat(''),
    description: '',
    contributionStatus: '',
    createdBy: '',
    remarks: ''
  }
}

// ------------------------------- HELPER METHODS --------------------------------- //

const onshowCreateMemberDialog = () => {
  isUpdate.value = false;
  showMemberDialog.value = true;
};


const onshowUpdateMemberDialog = (member: any) => {
  isUpdate.value = true;
  showMemberDialog.value = true;
};

const onshowCreateContributionDialog = (member: any) => {
  isUpdate.value = false;
  showContributionDialog.value = true;
  selectedMemberPayload.value = {
    firstName: member.firstName,
    emailAddress: member.emailAddress,
    lastName: member.lastName,
    middleName: member.middleName,
    phoneNumber: member.phoneNumber
  };
  memberId.value = member.memberId;
};

const onshowCreateDonationDialog = (member: any) => {
  isUpdate.value = false;
  showDonationDialog.value = true;
  selectedMemberPayload.value = {
    firstName: member.firstName,
    emailAddress: member.emailAddress,
    lastName: member.lastName,
    middleName: member.middleName,
    phoneNumber: member.phoneNumber
  };
  memberId.value = member.memberId;
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
  formattedMemberDate.value = formattedDate;
  return formattedDate;
}


// const onshowUpdateContributionDialog = (member: any) => {
//   isUpdate.value = true;
//   showContributionDialog.value = true;
// };


const onshowConfirmationDialog = (member: any) => {
  confirmMemberDialog.value = true;
  memberId.value = member.memberId;
};


// ------------------------------- TABLE COLUMNS AND ROWS --------------------------------- //

const columns: any = ([
  { name: 'actions', align: 'center', label: 'Action' },
  {
    name: 'name',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: (row: any) => {
      return row?.firstName + ' ' + row?.middleName + ' ' + row?.lastName ?? 0;
    },
  },
  {
    name: 'EmailAddress', align: 'left', label: 'Email Address', field: 'emailAddress', required: true,
  },
  { name: 'Age', align: 'center', label: 'Age (yrs)', field: 'age', sortable: true },
  { name: 'MobileNumber', align: 'center', label: 'Mobile Number', field: 'phoneNumber' },
  { name: 'EmergencyContact', align: 'center', label: 'Emergency Contact', field: 'emergencyContact' },
  { name: 'MembershipStatus', align: 'center', label: 'Membership Status', field: 'membershipStatus' },
  { name: 'Gender', align: 'center', label: 'Gender', field: 'gender' },
  { name: 'MembershipType', align: 'center', label: 'Membership Type', field: 'membershipType' },
  { name: 'MaritalStatus', align: 'center', label: 'Marital Status', field: 'maritalStatus' },
  { name: 'Occupation', align: 'center', label: 'Occupation', field: 'occupation' },
  { name: 'Gender', align: 'left', label: 'Gender', field: 'gender' },
  { name: 'Date of Birth', label: 'Date Of Birth', field: 'dateOfBirth' },
  { name: 'CreatedBy', label: 'Created By', field: 'createdBy' },
  { name: 'DeleteStatus', label: 'Delete Status', field: 'isDeleted' },
  { name: 'DateJoined', align: 'left', label: 'Date Joined', field: 'dateJoined' },
]);


const donationColumns: any = ([
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
      return row?.donation?.amount;
    },
    sortable: true
  },
  {
    name: 'Description',
    align: 'center',
    label: 'Description',
    field: (row: any) => {
      return row?.donation?.description;
    },
  },
  {
    name: 'DonationStatus',
    align: 'center',
    label: 'Donation Status',
    field: (row: any) => {
      return row?.donation?.DonationStatus;
    },
  },
  {
    name: 'DonationDate',
    label: 'Donation Date',
    align: 'center',
    field: (row: any) => {
      return formatCustomDate(row?.donation?.donationDate);
    },
  },
  // { name: 'CreatedBy', label: 'Created By', field: 'createdBy' },
  // { name: 'DeleteStatus', label: 'Delete Status', field: 'isDeleted' },
  {
    name: 'CreatedAt',
    label: 'Created At',
    align: 'center',
    field: (row: any) => {
      return formatCustomDate(row?.donation?.createdAt);
    },
  },
  {
    name: 'UpdatedAt',
    label: 'Updated At',
    align: 'center',
    field: (row: any) => {
      return formatCustomDate(row?.donation?.updatedAt);
    },
  },

]);

const contributionColumns: any = ([
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

