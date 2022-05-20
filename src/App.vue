<template>
  <!-- App.vue -->

  <v-app :theme="systemStore.theme">
    <SystemBar/>

    <NavigationDrawer/>

    <AppBar/>

    <v-main>
      <v-container fluid>

        <router-view></router-view>
      </v-container>
    </v-main>

    <SystemFooter/>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SystemBar from '@/layouts/SystemBar.vue';
import NavigationDrawer from '@/layouts/NavigationDrawer.vue';
import AppBar from '@/layouts/AppBar.vue';
import SystemFooter from '@/layouts/SystemFooter.vue';
import { useStore } from '@/store';

export default defineComponent({
  components: {SystemFooter, AppBar, NavigationDrawer, SystemBar},
  setup() {
    const systemStore = useStore();
    return {
      systemStore,
    };
  },
});
</script>