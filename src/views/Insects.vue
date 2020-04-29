<template>
  <b-container fluid>
    <InsectsMain :insects="insects" />
  </b-container>
</template>

<script>
import InsectsMain from "@/components/InsectsMain.vue";

import prices from "./prices";

export default {
  name: "Insects",
  components: {
    InsectsMain
  },
  data: function() {
    return {
      insects: prices.insects
    };
  }
};
</script>
