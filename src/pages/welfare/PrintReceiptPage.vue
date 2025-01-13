<template>
  <main class="main-content">
    <BottomHeader>
      <template #actions>
        <q-btn icon="fa-solid fa-print" label="Print Receipt" size="18px" color="primary" text-color="white"
          class="text-bold" no-caps push @click="onPrintPage()" />
      </template>
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
                  <q-item-label class="text-bold text-h6">Member Infomation</q-item-label>
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
        <div class="col-md-9">
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
                          {{ memberInfo.firstName }} {{ memberInfo.middleName }} {{
                            memberInfo.lastName }}
                        </q-item-label>
                        <q-item-label caption lines="1" class="text-bold" style="font-size: 1rem">
                          {{ memberInfo.emailAddress }}, {{ memberInfo.phoneNumber }}
                        </q-item-label>
                      </q-item-section>
                    </div>
                  </q-item>
                  <q-item>
                    <q-btn icon="fa-solid fa-print" label="Print Receipt" size="18px" color="primary" text-color="white"
                      class="text-bold" no-caps push @click="onPrintPage__()" />
                  </q-item>
                </q-card-section>
              </q-card>
              <div class="row q-col-gutter-x-lg" id="form1">
                <div class="col-md-12 q-mb-lg">
                  <q-card class="card-shadow main_container q-pa-xl " flat>
                    <q-card-section class="text-subitle4 ">
                      <div class="sub_container col" id="specific-part">
                        <div class="receipt_top ">
                          <div class="receipt_header row justify-between">
                            <div class="col">
                              <div>
                              </div>
                              <div class="q-mt-xs">
                                <span class="text-h6 text-bold"> Receipt</span>
                              </div>
                            </div>
                            <div class="col">
                              <div class="receipt_id text-right text-bold">
                                <span>Receipt Id: {{ contributionInfo.contribution.receiptId }}</span>
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
                                <div>{{ memberInfo.firstName }} {{ memberInfo.middleName }}
                                  {{ memberInfo.lastName }}</div>
                              </div>
                              <q-separator />
                              <div class="row justify-between">
                                <div>Contributor's Email Address: </div>
                                <div>{{ memberInfo.emailAddress }}</div>
                              </div>
                              <q-separator />
                              <div class="row justify-between">
                                <div>Contributor Phone Number: </div>
                                <div>{{ memberInfo.phoneNumber }}</div>
                              </div>
                              <q-separator />
                              <div class="row justify-between">
                                <div>Contributor Location: </div>
                                <div>{{ memberInfo.location }}</div>
                              </div>
                              <q-separator />
                              <div class="row justify-between">
                                <div>Total Amount (GH<span style="font-size: 18px;">¢</span>) </div>
                                <div>{{ contributionInfo.contribution.amount }}</div>
                              </div>
                              <q-separator />
                              <div class="row justify-between">
                                <div>Contribution Status</div>
                                <div>{{ contributionInfo.contribution.contributionStatus }}</div>
                              </div>
                              <q-separator />
                              <div class="row justify-between">
                                <div>Description</div>
                                <div>{{ contributionInfo.contribution.description }}</div>
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
                                <div class="content">{{ username }}</div>
                              </div>
                              <q-separator vertical size="0.2rem" color="dark" inset class="q-ml-lg q-mr-lg" />
                              <div class="col text-right">
                                <div class="title">Contribution Date</div>
                                <div class="content">{{ formattedContributionDate }}</div>
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
                                <span>Receipt Id: {{ contributionInfo.contribution.receiptId }}</span>
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
                                <div>{{ memberInfo.firstName }} {{ memberInfo.middleName }}
                                  {{ memberInfo.lastName }}</div>
                              </div>
                              <q-separator />
                              <div class="row justify-between">
                                <div>Contributor's Email Address: </div>
                                <div>{{ memberInfo.emailAddress }}</div>
                              </div>
                              <q-separator />
                              <div class="row justify-between">
                                <div>Contributor Phone Number: </div>
                                <div>{{ memberInfo.phoneNumber }}</div>
                              </div>
                              <q-separator />
                              <div class="row justify-between">
                                <div>Contributor Location: </div>
                                <div>{{ memberInfo.location }}</div>
                              </div>
                              <q-separator />
                              <div class="row justify-between">
                                <div>Total Amount (GH<span style="font-size: 18px;">¢</span>) </div>
                                <div>{{ contributionInfo.contribution.amount }}</div>
                              </div>
                              <q-separator />
                              <div class="row justify-between">
                                <div>Contribution Status</div>
                                <div>{{ contributionInfo.contribution.contributionStatus }}</div>
                              </div>
                              <q-separator />
                              <div class="row justify-between">
                                <div>Description</div>
                                <div>{{ contributionInfo.contribution.description }}</div>
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

                                <div class="content">{{ username }}</div>
                              </div>
                              <q-separator vertical size="0.2rem" color="dark" inset class="q-ml-lg q-mr-lg" />
                              <div class="col text-right">
                                <div class="title">Contribution Date</div>
                                <div class="content">{{ formattedContributionDate }}</div>
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
import printJS from 'print-js';


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
const formattedContributionDate = <any>ref('');
const tab = ref('contributions');
const username = <any>ref(null);




const onPrintPage__ = () => {
  const printelement = document.getElementById('specific-part')
  console.log('onPrintPage____', printelement);
  printJS('specific-part', 'html')
  // printJS({
  //   printable: printelement,
  //   type: 'html',
  //   targetStyles: ['*'],
  //   // header: 'PrintJS - Print Form With Customized Header'
  // })
}

const onPrintPage = () => {
  const printelement = document.getElementById('form1')
  console.log('form1', printelement);
  printJS({
    printable: printelement,
    type: 'html',
    targetStyles: ['*'],
    // header: 'PrintJS - Print Form With Customized Header'
  });


  if (LocalStorage.has('username')) {
    username.value = LocalStorage.getItem('username');
  };

}


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

// const selectedMemberPayload = ref(
//   {
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     emailAddress: '',
//     phoneNumber: '',
//   });

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


const memberInfo = <any>computed(() => {
  const result = <any>welfareStore.listOfMembers?.records.filter((record: any) => (record.memberId === route.params['memberId']))[0];
  formatCustomDate(result?.createdAt.toString());
  return result;
});

const contributionInfo = <any>computed(() => {
  const result = <any>welfareStore.listOfContributions?.records.filter((record: any) => (record.contribution.contributionId === route.params['contributionId']))[0];
  formatCustomDate_(result?.contribution.createdAt.toString());
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

function formatCustomDate_(dateString: string): string {
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
  formattedContributionDate.value = formattedDate;
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

