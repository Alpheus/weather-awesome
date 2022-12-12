<script lang="ts" setup>
import { ref } from 'vue';
import MazSwitch from 'maz-ui/components/MazSwitch';

const switchValue = ref(false);
</script>

<template>
  <MazSwitch v-model="switchValue" :color="info" :name="info" :key="info" />
</template>
