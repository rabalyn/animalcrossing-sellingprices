<template>
  <b-table hover :fields="fields" :items="shells">
    <template v-slot:cell(price)="data">
      {{ `${new Intl.NumberFormat().format(data.value)}⭐` }}
    </template>
  </b-table>
</template>

<script>
import debug from "debug";

const log = debug("ShellsMain:info");
localStorage.debug += " ShellsMain:* ";

export default {
  name: "ShellsMain",
  props: {
    shells: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data: function() {
    return {
      fields: [
        { key: "name", label: "Name", sortable: true, sortDirection: "asc" },
        {
          key: "price",
          label: "Sternis",
          sortable: true,
          sortDirection: "asc"
        }
      ]
    };
  },
  mounted: function() {
    log(this.shells);
  }
};
</script>

<style scoped></style>
