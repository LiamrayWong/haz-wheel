<template>
  <router-view />
</template>

<script lang="ts">
import { provide, ref } from "vue";
import { router } from "./router";
export default {
  name: "App",
  setup() {
    const screenWidth = document.documentElement.clientWidth;
    const asideVisible = ref(screenWidth <= 500 ? false : true);
    provide("asideVisible", asideVisible); //set
    router.afterEach(() => {
      if (screenWidth <= 500) {
        asideVisible.value = false;
      }
    });
  },
};
</script>
