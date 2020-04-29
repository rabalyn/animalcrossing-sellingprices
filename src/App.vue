<template>
  <b-container fluid id="app">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item
          v-bind:active="menuActive === '/fish'"
          @click="menuActive = '/fish'"
          to="/fish"
          >Fisch</b-nav-item
        >
        <b-nav-item
          v-bind:active="menuActive === '/insects'"
          @click="menuActive = '/insects'"
          to="/insects"
          >Insekten</b-nav-item
        >
        <b-nav-item
          v-bind:active="menuActive === '/shells'"
          @click="menuActive = '/shells'"
          to="/shells"
          >Muscheln</b-nav-item
        >
      </b-navbar-nav>
    </b-navbar>

    <router-view />
  </b-container>
</template>

<script>
export default {
  name: "App",
  props: {},
  data: function() {
    return {
      menuActive: window.location.pathname
    };
  },
  mounted: function() {
    console.log(this.$route);
  }
};
</script>

<style scoped></style>
