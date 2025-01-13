<template>
  <div>
    <q-input v-model="displayEmails" label="Email Addresses" readonly @click="openPopupEdit" />
    <q-popup-edit v-model="popupVisible" :validate="validateEmails" content-class="popup-edit-content"
      :style="{ maxHeight: popupHeight }">
      <!-- {{ emails }} ---- {{ displayEmails }} -->
      <div v-for="(email, index) in emails" :key="index" class="q-mb-sm q-gutter-sm row items-center">
        <div class="col">
          <q-input v-model="emails[index]" dense :hint="`Email ${index + 1}`"
            :rules="[emailRules, uniqueEmail(index)]" />
        </div>
        <q-btn flat dense color="negative" icon="cancel" @click="removeEmail(index)" />
      </div>
      <div class="row justify-between q-mt-sm">
        <q-btn color="green-8" class="text-white" size="0.7rem" dense label="Add Email" icon="add_circle"
          :disable="!canAddEmail" @click="addEmail" />
        <q-btn class="primary-color text-white" size="0.7rem" dense label="Save Email" icon="mark_email_read"
          @click="saveEmails" :disable="!canSaveEmails" v-close-popup />
      </div>
    </q-popup-edit>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps } from 'vue';

// const { initialEmails, isUpdate } = defineProps(['initialEmails', 'isUpdate']);
const props = defineProps({
  initialEmails: {
    type: Array<string>,
    default: () => []
  },
  isUpdate: Boolean
});


const emit = defineEmits<{
  (e: 'getEmailAddresses', emails: Array<string>): void;
}>();

// const emails = ref<string[]>(props.initialEmails || ['']); // Initialize with prop value or an empty array

const emails = computed(() => {
  if (props.isUpdate == false) {
    return [''];
  }
  else {
    return props.initialEmails;
  }
});

const popupVisible = ref(false);
const popupHeight = ref('auto'); // Default height

const displayEmails = computed(() => emails.value.join(', '));

const emailRules = (val: string) => {
  if (!val) return 'Email address is required';
  if (!/^\S+@\S+\.\S+$/.test(val)) return 'Invalid email format';
  return true;
};

const uniqueEmail = (index: number) => (val: string) => {
  if (emails.value.slice(0, index).includes(val) || emails.value.slice(index + 1).includes(val)) {
    return 'Email address must be unique';
  }
  return true;
};

const validateEmails = (value: any) => {
  for (let i = 0; i < emails.value.length; i++) {
    if (typeof emailRules(emails.value[i]) === 'string' || typeof uniqueEmail(i)(emails.value[i]) === 'string') {
      return false;
    }
  }
  return true;
};

const canAddEmail = computed(() => {
  const lastEmail = emails.value[emails.value.length - 1];
  return emailRules(lastEmail) === true && uniqueEmail(emails.value.indexOf(lastEmail))(lastEmail) === true;
});

const addEmail = () => {
  if (canAddEmail.value) {
    emails.value.push('');
    updatePopupHeight();
  }
};

const removeEmail = (index: number) => {
  if (emails.value.length > 1) {
    emails.value.splice(index, 1);
    updatePopupHeight();
  }
};

const openPopupEdit = () => {
  popupVisible.value = true;
  updatePopupHeight();
};

const saveEmails = () => {
  if (canSaveEmails.value) {
    // Save logic here, e.g., store emails in a variable
    emit('getEmailAddresses', emails.value);
    popupVisible.value = false; // Hide popup edit after saving
  }
};

const canSaveEmails = computed(() => {
  for (let i = 0; i < emails.value.length; i++) {
    if (typeof emailRules(emails.value[i]) === 'string' || typeof uniqueEmail(i)(emails.value[i]) === 'string') {
      return false;
    }
  }
  return true;
});

const updatePopupHeight = () => {
  if (emails.value.length >= 3) {
    popupHeight.value = '400px'; // Set a specific height
  } else {
    popupHeight.value = 'auto'; // Default height
  }
};

// Watch for changes in emails array length to update popup height dynamically
watch(emails, () => {
  updatePopupHeight();
});
</script>

<style scoped>
.popup-edit-content {
  overflow-y: auto;
  /* Enable vertical scrolling if content exceeds max height */
}

.q-input__control {
  display: flex;
  align-items: center;
}
</style>
