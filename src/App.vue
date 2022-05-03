<template>
  <v-app id="inspire">
    <AppSystemBar/>

    <AppDrawer/>

    <v-main>
      <AppContents/>
    </v-main>
  </v-app>
</template>

<script>
import AppDrawer from "@/layouts/AppDrawer";
import AppContents from "@/layouts/AppContents";
import AppSystemBar from "@/layouts/AppSystemBar";

export default {
  name: 'App',
  components: {AppSystemBar, AppContents, AppDrawer},
};
</script>
