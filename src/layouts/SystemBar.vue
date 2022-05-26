<template>
  <v-system-bar app>
    <v-btn variant="plain" @click="clickMain">Hwisaek's web</v-btn>
    <v-spacer></v-spacer>
    <v-icon @click="toggleTheme">
      <template v-if="store.theme==='light'">
        mdi-brightness-5
      </template>
      <template v-else>
        mdi-brightness-2
      </template>
    </v-icon>
    <v-icon v-if="!store.isLogin" @click="clickLogin">mdi-login</v-icon>
    <v-icon v-else @click="clickLogout">mdi-logout</v-icon>
  </v-system-bar>
</template>

<script lang="ts">
import systemAPI from '@/api/system';
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { useUserStore } from '@/store/user';

export default defineComponent({
  setup() {
    const store = useStore();
    const userStore = useUserStore();
    return {
      store,
      userStore,
      toggleTheme: store.toggleTheme,
    };
  },
  methods: {
    clickMain() {
      this.$router.push({path: '/'});
    },
    clickLogin() {
      this.$router.push({name: 'Login'});
    },
    async clickLogout() {
      const res = await systemAPI.logout();
      if (res.status !== 200) {
        return;
      }
      this.userStore.logout();
      this.$router.push({name: 'Login'});
    },
  },
});
</script>