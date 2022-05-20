<template>
  <v-app-bar app>
    <h1>{{ store.pageTitle }}</h1>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  setup() {
    const store = useStore();
    return {
      store
    };
  },
});
</script>