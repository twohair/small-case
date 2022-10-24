<template>
  <div>
    <SCmenu ref="menu" :routes="routes" />
  </div>
</template>

<script setup lang="ts">
import type { Route } from "/#/vue-router";
const routes = useRouter().options.routes as Route[];
</script>

<style scoped></style>
