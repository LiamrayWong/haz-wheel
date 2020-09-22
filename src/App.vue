<template>
  <router-view />
</template>

<script lang="ts">
import { provide, ref } from "vue";
export default {
  name: "App",
  setup() {
    const screenWidth = document.documentElement.clientWidth;
    const asideVisible = ref(screenWidth <= 500 ? false : true);
    provide("asideVisible", asideVisible); //set
  },
};
</script>
