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
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      links: [
        ['mdi-inbox-arrow-down', 'Home', '/home'],
        ['mdi-send', 'About', '/about'],
        ['mdi-delete', 'Articles', '/articles'],
        ['mdi-alert-octagon', 'Spam', '/spam'],
      ],
    };
  },
});
</script>