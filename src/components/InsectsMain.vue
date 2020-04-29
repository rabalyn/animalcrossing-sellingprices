<template>
  <div>
    <b-row>
      <b-col cols="12">
        <p>
          Die Daten wurden von mir aufbereitet. Die
          <a
            href="https://www.gamepro.de/artikel/animal-crossing-new-horizons-alle-insekten-preis-fundort,3355973.html"
            >Rohdaten</a
          >
          stammen von GamePro.
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="5">
        <b-form-checkbox
          id="checkbox-1"
          v-model="filter"
          name="checkbox-1"
          value="all"
          unchecked-value="filtered"
        >
          <span v-if="filter === 'all'">Alle anzeigen</span>
          <span v-else>Aktive anzeigen</span>
        </b-form-checkbox>
      </b-col>
    </b-row>

    <b-table
      hover
      :tbody-tr-class="rowClass"
      :fields="fields"
      :items="insects"
      :filter="filter"
      :filter-function="myFilter"
    >
      <template v-slot:cell(price)="data">
        {{ `${new Intl.NumberFormat().format(data.value)}⭐` }}
      </template>

      <template v-slot:cell(place)="data">
        {{ data.value.map(x => $t(`places.${x}`)).join(", ") }}
      </template>

      <template v-slot:cell(times)="data">
        {{ data.value.map(x => `${x} ${$t("defaults.time")}`).join(", ") }}
      </template>

      <template v-slot:cell(months)="data">
        <span v-for="(month, idx) in data.value" v-bind:key="idx">
          <b-badge
            class="mr-1"
            v-if="month"
            :variant="idx === currentMonth ? 'warning' : 'success '"
          >
            {{ $t(`defaults.months.${idx}`) }}
          </b-badge>
          <b-badge class="mr-1" v-else variant="danger">
            {{ $t(`defaults.months.${idx}`) }}
          </b-badge>
        </span>
      </template>
    </b-table>
  </div>
</template>

<script>
import debug from "debug";
import moment from "moment";

const log = debug("InsectsMain:info");
localStorage.debug += " InsectsMain:* ";

export default {
  name: "InsectsMain",
  props: {
    insects: {
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
        },
        {
          key: "place",
          label: "Fundort",
          sortable: true,
          sortDirection: "asc"
        },
        {
          key: "times",
          label: "aktive Uhrzeit",
          sortable: true,
          sortDirection: "asc"
        },
        {
          key: "months",
          label: "aktive Monate",
          sortable: false,
          sortDirection: "asc"
        }
      ],
      currentMonth: new Date().getMonth(),
      filter: "all"
    };
  },
  computed: {},
  mounted: function() {
    log(this.insects);
    this.filter = "all";
  },
  methods: {
    myFilter(originalItem, content) {
      if (content === true || content === "all") {
        return true;
      }

      if (content === "filtered" && originalItem.months[this.currentMonth]) {
        return true;
      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    rowClass(item) {
      const times = item.times;

      for (let i = 0; i < times.length; i++) {
        const time = times[i];
        const splittedInterval = time.split(" - ");

        const intervalStart = splittedInterval[0];
        const intervalEnd = splittedInterval[1];

        const startMoment = moment(intervalStart, "HH:mm");
        const endMoment = moment(intervalEnd, "HH:mm");

        if (startMoment > endMoment || startMoment.isSame(endMoment)) {
          endMoment.add(1, "d");
        }

        const nowMoment = moment();

        if (
          startMoment < nowMoment &&
          nowMoment < endMoment &&
          item.months[this.currentMonth]
        ) {
          return "table-success";
        }
      }
    }
  }
};
</script>

<style scoped></style>
