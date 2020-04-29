<template>
  <b-container fluid>
    <ShellsMain :shells="shells" />
  </b-container>
</template>

<script>
import ShellsMain from "@/components/ShellsMain.vue";

import prices from "./prices";

export default {
  name: "Shells",
  components: {
    ShellsMain
  },
  data: function() {
    return {
      shells: prices.shells
    };
  }
};
</script>
