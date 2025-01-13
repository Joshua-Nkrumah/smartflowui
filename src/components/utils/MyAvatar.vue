<template>
  <q-avatar :square="shape === ShapeConstants.SQUARE" :round="shape === ShapeConstants.ROUND"
    :rounded="shape === ShapeConstants.ROUNDED" v-if="icon" :key="label + 'i'" :size="currentSize" :icon="icon"
    :style="colorStyle">
    <q-badge v-if="status" floating :color="status" rounded />
  </q-avatar>
  <q-avatar :square="shape === ShapeConstants.SQUARE" :round="shape === ShapeConstants.ROUND"
    :rounded="shape === ShapeConstants.ROUNDED" v-else :key="label" :size="currentSize" :style="colorStyle">
    <span :style="`font-size: ${currentFontSize};`">{{ initials }}</span>
    <q-badge v-if="status" floating :color="status" rounded />
  </q-avatar>
</template>

<script setup lang="ts">
import ShapeConstants from 'src/constants/shape.constants';
import StringUtil from 'src/utils/string.util.js';
import { computed } from 'vue';


const props = defineProps<{
  label?: string,
  icon?: string,
  size?: string,
  fontSize?: string,
  shape?: string,
  status?: string,
}>()


const initials = computed(() => StringUtil.getInitials(props.label || ''))
const color = StringUtil.getColorsFromString(props.label || '');
const colorStyle = computed(() => `color:${color.text}; backgroundColor:${color.background};`)

const currentSize = computed(() => props.size || '2rem')
const currentFontSize = computed(() => props.fontSize || '1rem')
const shape = computed(() => props.shape || ShapeConstants.ROUNDED)
</script>
