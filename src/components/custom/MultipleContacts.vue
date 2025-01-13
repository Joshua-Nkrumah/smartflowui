<template>
  <div>
    <q-input v-model="displayContacts" label="Contacts" readonly @click="openPopupEdit" />

    <q-popup-edit v-model="popupVisible" :validate="validateContacts" content-class="popup-edit-content"
      :style="{ maxHeight: popupHeight }">
      <div v-for="(contact, index) in contacts" :key="index" class="q-mb-sm q-gutter-sm row items-center">
        <div class="col">
          <q-input v-model="contacts[index]" dense :hint="`Contact ${index + 1}`"
            :rules="[contactRules, uniqueContact(index)]" />
        </div>
        <q-btn flat dense color="negative" icon="cancel" @click="removeContact(index)" />
      </div>
      <div class="row justify-between q-mt-sm">
        <q-btn color="green-8" class="text-white" size="0.7rem" dense label="Add Contact" icon="add_circle"
          :disable="!canAddContact" @click="addContact" />
        <q-btn class="primary-color text-white" size="0.7rem" dense label="Save Contact" icon="contacts"
          @click="saveContacts" :disable="!canSaveContacts" v-close-popup />
      </div>
    </q-popup-edit>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps } from 'vue';

// const { initialContacts } = defineProps(['initialContacts']);
const props = defineProps({
  initialContacts: {
    type: Array<string>,
    default: () => []
  },
  isUpdate: Boolean
});

const emit = defineEmits<{
  (e: 'getContacts', contacts: Array<string>): void;
}>();

// const contacts = ref<string[]>(initialContacts || ['']); // Initialize with prop value or an empty array
const contacts = computed(() => {
  if (props.isUpdate == false) {
    return [''];
  }
  else {
    return props.initialContacts;
  }
});
const popupVisible = ref(false);
const popupHeight = ref('auto'); // Default height

const displayContacts = computed(() => contacts.value.join(', '));

const contactRules = (val: string) => {
  if (!val) return 'Contact number is required';
  if (!/^\d+$/.test(val)) return 'Contact number must contain only digits';
  if (val.length < 10) return 'Contact number must be at least 10 digits';
  return true;
};

const uniqueContact = (index: number) => (val: string) => {
  if (contacts.value.slice(0, index).includes(val) || contacts.value.slice(index + 1).includes(val)) {
    return 'Contact number must be unique';
  }
  return true;
};

const validateContacts = (value: any) => {
  for (let i = 0; i < contacts.value.length; i++) {
    if (typeof contactRules(contacts.value[i]) === 'string' || typeof uniqueContact(i)(contacts.value[i]) === 'string') {
      return false;
    }
  }
  return true;
};

const canAddContact = computed(() => {
  const lastContact = contacts.value[contacts.value.length - 1];
  return contactRules(lastContact) === true && uniqueContact(contacts.value.indexOf(lastContact))(lastContact) === true;
});

const addContact = () => {
  if (canAddContact.value) {
    contacts.value.push('');
    updatePopupHeight();
  }
};

const removeContact = (index: number) => {
  if (contacts.value.length > 1) {
    contacts.value.splice(index, 1);
    updatePopupHeight();
  }
};

const openPopupEdit = () => {
  popupVisible.value = true;
  updatePopupHeight();
};

const saveContacts = () => {
  if (canSaveContacts.value) {
    // Save logic here, e.g., store contacts in a variable
    emit('getContacts', contacts.value);
    popupVisible.value = false; // Hide popup edit after saving
  }
};

const canSaveContacts = computed(() => {
  for (let i = 0; i < contacts.value.length; i++) {
    if (typeof contactRules(contacts.value[i]) === 'string' || typeof uniqueContact(i)(contacts.value[i]) === 'string') {
      return false;
    }
  }
  return true;
});

const updatePopupHeight = () => {
  if (contacts.value.length >= 3) {
    popupHeight.value = '400px'; // Set a specific height
  } else {
    popupHeight.value = 'auto'; // Default height
  }
};

// Watch for changes in contacts array length to update popup height dynamically
watch(contacts, () => {
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
