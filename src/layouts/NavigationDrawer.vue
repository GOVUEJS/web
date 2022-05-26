<template>
  <v-navigation-drawer
      expand-on-hover
      rail
      permanent
  >
    <template v-slot:prepend>
      <v-list>
        <v-list-item
            v-if="userStore.isLogin"
            prepend-avatar=""
            :title="userStore.email"
            subtitle=""
        ></v-list-item>
        <v-list-item v-else>
          <v-btn block @click="$router.push({name:'Login'})">
            로그인
          </v-btn>
        </v-list-item>
      </v-list>
    </template>

    <v-divider></v-divider>

    <v-list nav>
      <v-list-item
          v-for="[icon, title, link] in links"
          :key="link"
          :prepend-icon="icon"
          :title="title"
          :to="link"
          @click="store.changePageTitle(title)"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
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
    };
  },
  data() {
    return {
      links: [
        ['mdi-home', 'Home', '/home'],
        ['mdi-card-text', 'Articles', '/articles'],
        ['mdi-information', 'About', '/about'],
        ['mdi-delete', 'Spam', '/spam'],
      ],
    };
  },
});
</script>