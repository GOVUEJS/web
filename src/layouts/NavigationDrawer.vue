<template>
  <v-navigation-drawer
      expand-on-hover
      rail
      permanent
  >
    <v-list>
      <v-list-item
          prepend-avatar=""
          title="Hwisaek"
          subtitle="hwisaek@github.com"
      ></v-list-item>
    </v-list>

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

export default defineComponent({
  setup() {
    const store = useStore();
    return {
      store
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