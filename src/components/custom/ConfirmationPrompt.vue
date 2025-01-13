<template>
  <q-dialog v-model="isOpen">
    <q-card class="my-card">
      <!-- <q-img src="../../assets/images/cc/verified1.png" style="width: 30em; max-height: 20rem;" /> -->
      <q-card-section align="center" style="width: 30em; max-height: 20rem;">
        <q-icon :name="icon" size="10rem" :color="color" rounded />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-subtitle1 text-bold row justify-center q-mt-md" v-if="$slots.content">
          <slot name="content" />
        </div>
        <div class="text-subtitle1 text-bold row justify-center q-mt-md" v-else>
          <slot name="content" />
        </div>
        <div class="text-caption text-grey">

        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <slot name="buttons" />
        <!--  -->
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>


<script ts>
export default {
  name: 'ConfirmationPrompt',
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'o_lock'
    },
    header: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'primary'
    },
    content: {
      type: String,
      required: false,
    }

  },
  data(props) {
    return {
      isOpen: props.dialog,
    }
  }
}
</script>


<!-- <template>
  <q-dialog v-model="isOpen">
    <q-card class="q-pa-lg" style="min-width: 30rem;">
      <q-card-section align="center">
        <q-icon :name="icon" size="5rem" :color="color" rounded />
      </q-card-section>

      <q-card-section align="center">
        <div class="text-h6">{{ header }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none" align="center" v-if="$slots.content">
        <slot name="content" />
      </q-card-section>

      <q-card-section class="q-pt-none" align="center" v-else>
        {{ content }}
      </q-card-section>

      <q-card-actions align="center">
        <slot name="buttons" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template> -->
