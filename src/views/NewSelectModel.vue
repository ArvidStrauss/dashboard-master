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
            '/new'
        "
      >
        <i class="fa fa-arrow-left" style="font-size: 25pt"></i>
      </router-link>
      <br />
    </div>
    <h2 class="text-center mb-3">Select a model for {{ metricName }}</h2>
    <br />
    <div v-for="(metri, index) in viableModels" :key="index">
      <div
        class="border rounded border--magenta-hover mb-2"
        v-on:click="editMetric(metri)"
      >
        <p>{{ metri }}</p>
      </div>
    </div>
  </section>
</template>

<script>
/*eslint no-console: ["error", { allow: ["warn", "log"] }] */
//import json from "@/assets/dashboards.json";

export default {
  name: "EditDashboards",
  data: function() {
    return {
      dashboards: null,
      imageToggle: true,
      dashboardID: -1,
      metricID: -1,
      viableModels: []
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
      let jsonFile = { dashboards: [] };
      this.dashboards.forEach(element => {
        jsonFile.dashboards.push(element);
      });
      this.$http.post("http://localhost:8080/SaveJson", jsonFile);

      let url =
        "/" +
        this.$i18n.locale +
        "/metrics/" +
        this.serviceName +
        "/" +
        this.dashboardName +
        "/new";
      this.dashboards[this.dashboardID].metrics[
        this.dashboards[this.dashboardID].metrics.length - 1
      ].model = m;
      this.$router.push(url);
    }
  },
  created() {
    const t = this;
    fetch("http://localhost:8080/LoadJson")
      .then(response => {
        return response.json();
      })
      .then(data => {
        t.dashboards = JSON.parse(JSON.stringify(data.dashboards));
        t.dashboardID = t.dashboards
          .map(function(e) {
            return e.name;
          })
          .indexOf(t.$route.params.dashboard);
      })
      .catch(err => {
        console.log(err);
      });
    this.$http
      .get(
        "http://localhost:8000/GetModels?service=Testservice" /*+ this.serviceName*/
      )
      .then(response => (t.viableModels = response.data.models))
      .catch(error => console.log(error));
  },
  mounted() {
    //this.dashboards = json;
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
