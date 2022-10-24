<template>
  <div class="menu">
    <ul>
      <li v-for="route in routes" :key="route.name">
        <router-link
          :style="`--clr: ${route.meta!.hoverColor}`"
          :to="route.path"
          :data-text="`&nbsp;${route.meta?.showName?.toString()}`"
          >&nbsp;{{ route.meta?.showName }}&nbsp;</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Route } from "/#/vue-router";
import { withDefaults } from "vue";

interface Props {
  routes: Route[];
}

const props = withDefaults(defineProps<Props>(), {
  routes: () => []
});
const routes = $ref(props.routes.filter(i => i.name !== "menu"));
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap");
.menu {
  font-family: "Poppins", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #252839;
}

ul {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
ul li {
  position: relative;
  list-style: none;
}
ul li a {
  position: relative;
  font-size: 4.5em;
  text-decoration: none;
  line-height: 1em;
  letter-spacing: 2px;
  /* text-transform: uppercase; */
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
}
ul li a::before {
  content: attr(data-text);
  position: absolute;
  color: var(--clr);
  width: 0;
  overflow: hidden;
  transition: 1s;
  border-right: 8px solid var(--clr);
  -webkit-text-stroke: 1px var(--clr);
}
ul li a:hover::before {
  width: 100%;
  /* -webkit-text-stroke: 1px #fff; */
  filter: drop-shadow(0 0 25px var(--clr));
}
</style>
