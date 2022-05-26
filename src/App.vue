<template>
  <!-- App.vue -->

  <v-app :theme="store.theme">
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
import axios from 'axios';

export default defineComponent({
  components: {SystemFooter, AppBar, NavigationDrawer, SystemBar},
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  created() {
    this.getIp();
  },
  methods: {
    async getIp() {
      const res = await axios.get('https://api.ipify.org?format=json');
      if (res.status === 200) {
        this.store.setIp(res.data.ip);
      }
    }
  },
});
</script>