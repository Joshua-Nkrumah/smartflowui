<template>
  <div style="margin-top: -4rem;" class="q-pa-lg">
    <div class="row">
      <HeaderCarouselPanel />
      <div class="q-pt-lg">
      </div>
      <MainBodySection />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth-store';
import HeaderCarouselPanel from 'components/main/HeaderCarouselPanel.vue';
import MainBodySection from 'components/main/MainBodySection.vue';
// import BodySection from 'components/main/BodySection.vue';

const router = useRouter();
const store = useAuthStore();

</script>


<style scoped>
/* @import '../../css/hope-ui.css'; */
@import '../../css/custom.min.css';
@import '../../css/hope-ui.min.css';
/* @import '../../css/customizer.min.css'; */
/* @import '../../css/dark.min.css'; */
@import '../../css/core/libs.min.css';
</style>
