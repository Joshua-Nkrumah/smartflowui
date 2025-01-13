<template>
  <q-page>
    <div class="wrapper">
      <section class="login-content">
        <div class="row m-0 align-items-center bg-white vh-100">
          <div class="col-md-6">
            <div class="row justify-content-center">
              <div class="col-md-10">
                <div class="card card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                  <div class="card-body">
                    <router-link to="/" class="navbar-brand d-flex align-items-center mb-3">
                      <div class="logo-main">
                        <div class="logo-normal">
                        </div>
                        <div class="logo-mini">
                          <q-img src="../../assets/images/cc/logo.png" />
                        </div>
                      </div>
                      <q-img src="../../assets/images/cc/logo.png" fit="scale-down" height="5rem" width="14rem" />
                    </router-link>
                    <h2 class="mb-2 text-center">Sign In</h2>
                    <p class="text-center">Login to stay connected.</p>
                    <form>
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="form-group  q-pl-lg q-pr-lg ">
                            <q-input v-model="loginFormData.currentPassword" outlined :type="isPwd ? 'password' : 'text'"
                              label="Current Password" :clearable="true" bg-color="white" :dense="true" label-color="dark"
                              style="max-width: 50rem;" lazy-rules
                              :rules="[(val) => (val && val.length > 0) || 'Enter your current password']">
                              <template v-slot:append>
                                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                  @click="isPwd = !isPwd" />
                              </template>
                            </q-input>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="form-group  q-pl-lg q-pr-lg q-pt-sm">
                            <q-input v-model="loginFormData.newPassword" outlined :type="isPwd ? 'password' : 'text'"
                              label="New Password" :clearable="true" bg-color="white" :dense="true" label-color="dark"
                              style="max-width: 50rem;" lazy-rules
                              :rules="[(val) => (val && val.length > 0) || 'Enter your new password']">
                              <template v-slot:append>
                                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                  @click="isPwd = !isPwd" />
                              </template>
                            </q-input>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="form-group  q-pl-lg q-pr-lg q-pt-sm">
                            <q-input v-model="loginFormData.confirmPassword" outlined :type="isPwd ? 'password' : 'text'"
                              label="Confirm Password" :clearable="true" bg-color="white" :dense="true" label-color="dark"
                              style="max-width: 50rem;" lazy-rules
                              :rules="[(val) => (val && val.length > 0) || 'Confirm your new password']">
                              <template v-slot:append>
                                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                  @click="isPwd = !isPwd" />
                              </template>
                            </q-input>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary">Change Password</button>
                      </div>
                      <p class="mt-3 text-center">
                        Don’t have an account? <a href="sign-up.html" class="text-underline">Click here to sign up.</a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="sign-bg">
              <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.05">
                  <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857"
                    transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF" />
                  <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857"
                    transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF" />
                  <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857"
                    transform="rotate(45 61.9355 138.545)" fill="#3B8AFF" />
                  <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857"
                    transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF" />
                </g>
              </svg>
            </div>
          </div>
          <div class="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">

            <img src="../../assets/images/auth/01.png" class="img-fluid gradient-main animated-scaleX" alt="images">
          </div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const loginFormData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const isPwd = ref(true);

</script>

<style scoped>
@import '../../css/hope-ui.css';
@import '../../css/custom.min.css';
@import '../../css/hope-ui.min.css';
/* @import '../../css/customizer.min.css'; */
/* @import '../../css/dark.min.css'; */
/* @import '../../css/core/libs.min.css'; */
</style>

