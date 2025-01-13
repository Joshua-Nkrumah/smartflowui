<template>
  <q-dialog v-model="isOpen" seamless persistent :maximized="true" transition-show="slide-up"
    transition-hide="slide-down">
    <q-card>
      <div class="column background-color" style="height: 100vh">
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

<script ts>
export default {
  name: 'MyFullDialog',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data(props) {
    return {
      isOpen: props.dialog,
    };
  },
};
</script>
