<template>
  <q-dialog v-model="isOpen" seamless persistent :maximized="false" style="width: 100rem;" transition-show="slide-up"
    transition-hide="slide-down">
    <q-card style="width: 700px; min-width: 50vw; height: 60vh;">
      <div class="column background-color">
        <q-card-section class="col-auto flex justify-end" style="padding-bottom: 0">
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-card-section>

        <q-card-section class="col flex items-start justify-center scroll lt-md">
          <div style="max-width: 80rem; width: 100%">
            <slot />
          </div>
        </q-card-section>
        <q-card-section class="col flex items-center justify-center scroll gt-sm">
          <div style="max-width: 80rem; width: 100%">
            <slot />
          </div>
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  dialog: Boolean,
  data: Object,
});

const isOpen = ref(props.dialog);

watch(() => props.dialog, (newVal) => {
  isOpen.value = newVal;
});
</script>
