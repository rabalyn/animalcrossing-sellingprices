<template>
  <b-container fluid>
    <FishMain :fish="fish" />
  </b-container>
</template>

<script>
import FishMain from "@/components/FishMain.vue";

import prices from "./prices";

export default {
  name: "Fish",
  components: {
    FishMain
  },
  data: function() {
    return {
      fish: prices.fish
    };
  }
};
</script>
