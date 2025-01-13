<!-- <template>
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
                    <q-form @submit="onProcessLogin()" flat>
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="form-group q-pl-lg q-pr-lg">
                            <q-input outlined v-model="loginFormData.email" label="Username" :clearable="true"
                              bg-color="white" :dense="true" label-color="dark" style="max-width: 50rem;" lazy-rules
                              :rules="[(val) => (val && val.length > 0) || 'Please enter your username']" />
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="form-group  q-pl-lg q-pr-lg ">
                            <q-input v-model="loginFormData.password" outlined :type="isPwd ? 'password' : 'text'"
                              label="Password" :clearable="true" bg-color="white" :dense="true" label-color="dark"
                              style="max-width: 50rem;" lazy-rules
                              :rules="[(val) => (val && val.length > 0) || 'Please enter your password']">
                              <template v-slot:append>
                                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                  @click="isPwd = !isPwd" />
                              </template>
                            </q-input>
                          </div>
                        </div>
                        <div class="col-lg-12 d-flex justify-content-between">
                          <div class="form-check mb-3">
                          </div>
                          <router-link to="/auth/forgot-password">Forgot Password?</router-link>
                        </div>
                      </div>
                      <!-- <div class="d-flex justify-content-center">
                        <q-btn type="submit" class="btn btn-primary" icon-right="fa-solid fa-right-to-bracket fa-sm"
                          align="left" :push="true" label="Sign In" :rounded="true" size="lg" :loading="loading" />
                      </div> -->
<div class="d-flex justify-content-center text-white">
                        <q-btn type="submit" class="primary-color" icon-right="fa-solid fa-right-to-bracket fa-sm"
                          align="left" :push="true" label="Sign In" :rounded="true" size="lg" :loading="loading" />
                      </div>
<p class="mt-3 text-center">
                        Don’t have an account? <a href="sign-up.html" class="text-underline">Speak to your
                          Administrator</a>
                      </p>
</q-form>
</div>
</div>
</div>
</div>

<div class="sign-bg">
              <svg width="280" height="230" viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg"
                opacity="0.05">
                <defs>
                  <linearGradient id="two-803" x1="350" y1="-350" x2="350" y2="350" spreadMethod="pad"
                    gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="hsl(231, 98%, 45%)" stop-opacity="1"></stop>
                    <stop offset="100%" stop-color="hsl(223, 82%, 26%)" stop-opacity="1"></stop>
                  </linearGradient>
                </defs>
                <g id="two-0" transform="matrix(1 0 0 1 0 0)" opacity="1">
                  <path transform="matrix(1 0 0 1 350 350)" id="two-1197"
                    d="M 316.57751 131.130698 C 305.448301 173.022473 266.969556 207.93674 229.19653 229.19653 C 192.720954 249.726076 142.987222 235.830927 104.46241 252.194567 C 65.449654 268.765463 40.673794 315.002746 0 326.928858 C -42.056011 339.260255 -93.510502 339.96015 -132.638182 320.216896 C -171.906821 300.402517 -198.07926 256.78209 -217.144167 217.144166 C -234.238403 181.603474 -222.906325 134.741292 -242.043922 100.257875 C -265.169559 58.588536 -344.557248 47.635 -345.983982 0 C -347.376907 -46.506219 -269.835793 -61.439547 -250.546992 -103.779962 C -232.375484 -143.667832 -263.233332 -201.610602 -235.780938 -235.780938 C -209.353231 -268.675834 -155.883716 -267.613041 -114.754973 -277.043011 C -77.566325 -285.569598 -38.133576 -289.898811 -0.000001 -291.135193 C 38.91432 -292.396888 81.277042 -297.887603 117.790048 -284.370332 C 154.57098 -270.753874 189.488883 -244.198363 212.27846 -212.278461 C 234.364332 -181.344193 235.708943 -138.731287 248.622146 -102.982666 C 261.01676 -68.669695 278.386562 -34.955604 288.83224 -0.000001 C 301.496353 42.37942 327.934274 88.382377 316.57751 131.130698 Z "
                    fill="url(#two-803)" stroke="undefined" stroke-width="1" stroke-opacity="1" fill-opacity="1"
                    visibility="visible" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4"></path>
                </g>
              </svg>
            </div>
</div>
<div class="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
            <q-img src="../../assets/images/cc/cc-auth.svg" class="img-fluid gradient-main animated-scaleY" alt="images"
              style="height: 100vh;" fit="contain" />
          </div>
</div>
</section>
</div>
</q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from 'src/stores/auth-store';
import { useRouter } from 'vue-router';
import { LocalStorage, useQuasar } from 'quasar';
import AAStatusConstants from 'src/constants/aa-status.constants';

const authStore = useAuthStore();
const router = useRouter();
const loginFormData = ref({
  email: '',
  password: '',
});
const $q = useQuasar();

const isPwd = ref(true);

const loading = ref(false);
// const onProcessLogin = async () => {
//   loading.value = true;
//   const result = await authStore.login(loginFormData.value);
//   loading.value = false;
//   if (result.status == AAStatusConstants.SUCCESS) {
//     if (authStore.isAuthenticated) {
//       router.push('/dashboard');
//     }
//     $q.notify({
//       color: 'green-8',
//       textColor: 'white',
//       icon: 'cloud_done',
//       position: 'top-right',
//       message: `${result.message}`,
//     });
//   } else {
//     $q.notify({
//       color: 'red-8',
//       textColor: 'white',
//       icon: 'close',
//       position: 'top-right',
//       message: `${result.message}`,
//     });
//   }
// };

const onProcessLogin = async () => {
  loading.value = true;
  const result = await authStore.login(loginFormData.value);
  loading.value = false;
  if (result.status == AAStatusConstants.SUCCESS) {
    console.log('login page authStore.isAuthenticated', authStore.isAuthenticated)
    if (authStore.isAuthenticated) {
      // return false;
      // LocalStorage.set('isAuthenticated', true);
      router.push('/dashboard');
      window.location.reload();
    }
    $q.notify({
      color: 'green-8',
      textColor: 'white',
      icon: 'cloud_done',
      position: 'bottom-right',
      message: `${result.message}`,
    });
  } else {
    $q.notify({
      color: 'red-8',
      textColor: 'white',
      icon: 'close',
      position: 'bottom-right',
      message: `${result.message}`,
    });
  }
};

onMounted(async () => {
  // const isAuthenticated = LocalStorage.getItem('isAuthenticated');
  if (
    LocalStorage.has('isAuthenticated') &&
    LocalStorage.getItem('isAuthenticated') == true
  ) {
    await authStore.remainInside();

    router.back();
  } else {
  }
});
</script>

<style scoped>
@import '../../css/hope-ui.css';
@import '../../css/custom.min.css';
@import '../../css/hope-ui.min.css';
/* @import '../../css/customizer.min.css'; */
/* @import '../../css/dark.min.css'; */
/* @import '../../css/core/libs.min.css'; */

.text-white {
  color: #ffffff !important;
}
</style> -->
