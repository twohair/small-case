<template>
  <div>
    <Menu ref="menu" :routes="routes" />
  </div>
</template>

<script setup lang="ts">
import Menu from "/@/components/SCmenu/index.vue";
import { useRouter } from "vue-router";
import { Route } from "/#/vue-route";
const routes = useRouter().options.routes as Route[];
</script>

<style scoped></style>
