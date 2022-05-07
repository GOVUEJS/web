<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
  </v-app-bar>
</template>
<script>

export default {
  name: 'AppBar',
  methods: {
    toggleDrawer() {
      this.$store.commit('toggleDrawer');
    },
  },
};
</script>