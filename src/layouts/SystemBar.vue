<template>
  <v-system-bar app>
    <v-spacer></v-spacer>
    <v-btn @click="toggleTheme">toggle theme</v-btn>
    <v-icon>mdi-square</v-icon>
    <v-icon>mdi-circle</v-icon>
    <v-icon>mdi-triangle</v-icon>
  </v-system-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSystemStore } from '@/store';

export default defineComponent({
  setup() {
    const system = useSystemStore();
    return {
      toggleTheme: system.toggleTheme
    };
  }
});
</script>