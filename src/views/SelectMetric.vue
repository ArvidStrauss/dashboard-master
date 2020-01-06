<template>
  <section v-if="dashboards" class="mt-4 form--width mx-auto px-2">
    <div>
      <router-link
        class="pull-right breadcrumb__link mr-2"
        :to="
          '/' +
            $i18n.locale +
            '/metrics/' +
            serviceName +
            '/' +
            dashboardName +
            '/edit/' +
            dashboards[dashboardID].metrics[metricID].title
        "
      >
        <i class="fa fa-arrow-left" style="font-size: 25pt"></i>
      </router-link>
      <br />
    </div>
    <h2 class="text-center mb-3">Select a metric for {{ metricName }}</h2>
    <br />
    <div v-for="(metri, index) in metrica" :key="index">
      <div class="border rounded border--magenta-hover mb-2" v-on:click="editMetric(metri.name)">
        <p>{{ metri.name }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import json from "@/assets/dashboards.json";

export default {
  name: "EditDashboards",
  data: function() {
    return {
      dashboards: null,
      imageToggle: true,
      dashboardID: -1,
      metricID: -1,
      metrica: [{ name: "hi" }, { name: "bye" }]
    };
  },
  computed: {
    serviceName: function() {
      return this.$route.params.service;
    },
    dashboardName: function() {
      return this.$route.params.dashboard;
    },
    metricName: function() {
      return this.$route.params.metric;
    }
  },
  methods: {
    editMetric: function(m) {
      let url =
        "/" +
        this.$i18n.locale +
        "/metrics/" +
        this.serviceName +
        "/" +
        this.dashboardName +
        "/edit/" +
        this.dashboards[this.dashboardID].metrics[this.metricID].title;
      this.dashboards[this.dashboardID].metrics[this.metricID].metric = m;
      this.$router.push(url);
    }
  },
  mounted() {
    this.dashboards = json;
    this.dashboardID = this.dashboards
      .map(function(e) {
        return e.name;
      })
      .indexOf(this.$route.params.dashboard);
    this.metricID = this.dashboards[this.dashboardID].metrics
      .map(function(e) {
        return e.title;
      })
      .indexOf(this.$route.params.metric);
  }
};
</script>

<style scoped>
input[type="radio"] {
  display: none;
}

hr {
  background-color: var(--magenta);
}

.border--magenta-hover:hover {
  border-color: var(--magenta) !important;
  cursor: pointer;
}

.img--size {
  width: 200px;
  height: 200px;
}

.img--size:hover {
  cursor: pointer;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0), 0 0 5px var(--magenta);
}

.paragraphLink {
  text-decoration: none;
  color: black;
  font-size: 1.1em;
}

.paragraphLink:hover {
  color: var(--magenta);
}

/*Table*/
@media only screen and (max-width: 1200px) {
  .form--width {
    width: 90%;
  }
}

/*Phone*/
@media only screen and (max-width: 500px) {
  .form--width {
    width: 90%;
  }
}
</style>
