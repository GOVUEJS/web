<template>
  <v-app-bar
      :title="store.pageTitle"
      app>
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