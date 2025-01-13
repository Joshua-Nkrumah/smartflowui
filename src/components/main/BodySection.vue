<template>
  <div class="col-md-12 col-lg-8">
    <div class="row">
      <div class="col-md-12">
        <q-card dark bordered class="my-card shadow-1 card text-dark" style="height: 20rem;">
          <q-card-section>
            <div class="text-h6 card-title">Card One</div>
            <div class="text-subtitle2">by Joshua</div>
          </q-card-section>
          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-12 col-xl-6">
        <q-card dark bordered class="my-card shadow-1 card text-dark" style="height: 20rem;">
          <q-card-section>
            <div class="text-h6 card-title">Card Two</div>
            <div class="text-subtitle2">by Joshua</div>
          </q-card-section>
          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-12 col-xl-6">
        <q-card dark bordered class="my-card shadow-1 card text-dark" style="height: 20rem;">
          <q-card-section>
            <div class="text-h6 card-title">Card Three</div>
            <div class="text-subtitle2">by Joshua</div>
          </q-card-section>
          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-12 col-lg-12">
        <q-card dark bordered class="my-card shadow-1 card text-dark" style="height: 35rem;">
          <q-card-section>
            <div class="text-h6 card-title">Card Four</div>
            <div class="text-subtitle2">by Joshua</div>
          </q-card-section>
          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
  <div class="col-md-12 col-lg-4">
    <div class="row">
      <div class="col-md-12 col-lg-12">
        <q-card dark bordered class="my-card shadow-1 card text-dark" style="height: 30rem;">
          <q-card-section>
            <div class="text-h6 card-title">Card Four</div>
            <div class="text-subtitle2">by Joshua</div>
          </q-card-section>
          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </q-card>
        <q-card dark bordered class="my-card shadow-1 card text-dark" style="height: 10rem;">
          <q-card-section>
            <div class="text-center card-body d-flex justify-content-around">
              <div>
                <h2 class="mb-2">750<small>K</small></h2>
                <p class="mb-0 text-gray">Website Visitors</p>
              </div>
              <hr class="hr-vertial" />
              <div>
                <h2 class="mb-2">7,500</h2>
                <p class="mb-0 text-gray">New Customers</p>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-12 col-lg-12">
        <q-card dark bordered class="my-card shadow-1 card text-dark" style="height: 35rem;">
          <q-card-section>
            <q-card-section>
              <div class="text-h6 card-title">Card Five</div>
              <div class="text-subtitle2">by Joshua</div>
            </q-card-section>
            <q-card-section>
              {{ lorem }}
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth-store';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();
const store = useAuthStore();

const lorem = ref('Lorem ipsum dolor, sit amet consectetur adipisicing elit. .');
const slide = ref('carouselpanel');
const autoplay = ref(true);
const isMobile = computed(() => {
  return $q.screen.lt.sm;
});

const isTablet = computed(() => {
  return $q.screen.lt.lg;
});

const isDesktop = computed(() => {
  return $q.screen.gt.md;
});

</script>

<style scoped>
@import '../../css/hope-ui.css';
@import '../../css/custom.min.css';
@import '../../css/hope-ui.min.css';
/* @import '../../css/customizer.min.css'; */
/* @import '../../css/dark.min.css'; */
@import '../../css/core/libs.min.css';

.no_border_radius {
  border-radius: 0px !important;
}

.text-white {
  color: #ffffff !important;
}

.q-carousel {
  background-color: transparent;
  /* Set the background color */
  border-radius: 4px;
  /* Optional: Add rounded corners */
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  /* Apply a subtle shadow */
}
</style>
