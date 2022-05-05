<template>
  <!-- App.vue -->

  <v-app>
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

<script>

import SystemBar from '@/SystemBar';
import NavigationDrawer from '@/NavigationDrawer';
import AppBar from '@/AppBar';
import SystemFooter from '@/SystemFooter';

export default {
  name: 'App',
  components: {SystemFooter, AppBar, NavigationDrawer, SystemBar},
};
</script>
