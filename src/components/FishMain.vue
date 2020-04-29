<template>
  <div>
    <b-row>
      <b-col cols="12">
        <p>
          Die Daten wurden von mir aufbereitet. Die
          <a
            href="https://www.gamepro.de/artikel/animal-crossing-new-horizons-alle-fische-wann-fangen,3355964.html"
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
      :items="fish"
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

      <template v-slot:cell(months_north)="data">
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

      <template v-slot:cell(months_south)="data">
        <span v-for="(month, idx) in data.value" v-bind:key="idx">
          <span v-if="month">
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
        </span>
      </template>
    </b-table>
  </div>
</template>

<script>
import debug from "debug";
import moment from "moment";

const log = debug("FishMain:info");
localStorage.debug += " FishMain:* ";

export default {
  name: "FishMain",
  props: {
    fish: {
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
          key: "months_north",
          label: "aktive Monate (Norden)",
          sortable: false,
          sortDirection: "asc"
        },
        {
          key: "months_south",
          label: "aktive Monate (Süden)",
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
    log("fish");
    this.filter = "all";
  },
  methods: {
    myFilter(originalItem, content) {
      if (content === true || content === "all") {
        return true;
      }

      if (
        content === "filtered" &&
        originalItem.months_north[this.currentMonth]
      ) {
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
          item.months_north &&
          item.months_north[this.currentMonth]
        ) {
          return "table-success";
        }
      }
    }
  }
};
</script>

<style scoped></style>
