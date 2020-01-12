<template>
  <div v-if="dashboards" class="container mt-4">
    <h3>{{ dashboardName }}</h3>
    <br />
    <div class="w-100 pr-4">
      <router-link
        class="routerLink pull-right float-right"
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
        <button class="normalButton pull-right cursor--add">
          <i class="fa fa-plus"></i> New Diagram
        </button>
      </router-link>
    </div>
    <br />
    <div class="w-75 mx-auto">
      <nav class>
        <ol class="breadcrumb bg-white">
          <li
            class="breadcrumb-item"
            @mouseover="imageToggle = false"
            @mouseleave="imageToggle = true"
          >
            <router-link class="breadcrumb__link" :to="'/'">
              <img
                src="@/assets/img/home.png"
                class="breadcrumb__img"
                v-if="imageToggle == true"
              />
              <img
                src="@/assets/img/home--magenta.png"
                class="breadcrumb__img"
                v-if="imageToggle == false"
              />
            </router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link
              class="breadcrumb__link"
              :to="'/' + $i18n.locale + '/dashboards/' + serviceName"
              >{{ serviceName }}</router-link
            >
          </li>
          <li class="breadcrumb-item active">{{ dashboardName }}</li>
        </ol>
      </nav>
      <h3 v-if="bigbrainloaded === false">
        loading Charts....
        <br />
        <br />
        <br />
        Please wait
      </h3>
      <draggable
        v-model="dashboard.metrics"
        v-if="screenWidthCheck() === true && bigbrainloaded === true"
        :move="saveJson()"
        class="chart__grid"
      >
        <div v-for="(metric, index) in dashboard.metrics" :key="index">
          <div class="border pr-2">
            <br />
            <p>
              <b>{{ metric.title }}</b>
            </p>
            <p>Predicted time: {{ metric.predtime }} minutes</p>
            <div class="chartButtons__grid">
              <div>
                <Chart :chart-data="datacollection[index]"></Chart>
              </div>
              <div class="chart__flex">
                <div v-if="dashboardsLength > 1">
                  <a class id v-on:click="removeEntry(index)">
                    <button class="normalChartButton button--right">
                      <i class="fa fa-trash"></i>
                      {{ $t("menu.delete") }}
                    </button>
                  </a>
                </div>
                <span v-else class="normalChartButton button--right bg-danger">
                  <i class="fa fa-trash"></i>
                  {{ $t("menu.delete") }}
                </span>
                <router-link
                  class="normalChartButton"
                  :to="
                    '/' +
                      $i18n.locale +
                      '/metrics/' +
                      serviceName +
                      '/' +
                      dashboardName +
                      '/edit/' +
                      metric.title
                  "
                >
                  <i class="fa fa-edit"></i>
                  {{ $t("menu.edit") }}
                </router-link>
              </div>
            </div>
            <hr />
            <div>{{ metric.desc }}</div>
            <br />
          </div>
        </div>
      </draggable>
      <div v-else>
        <div v-if="bigbrainloaded === true">
          <div v-for="(metric, index) in dashboard.metrics" :key="index">
            <!-- TODO: CHART COMPONENT -->
            <div class="border">
              <br />
              <p>
                <b>{{ metric.title }}</b>
              </p>
              <p>Predicted time: {{ metric.predtime }} minutes</p>
              <Chart :chart-data="datacollection[index]"></Chart>
              <div class="chart__flex mx-auto">
                <div v-if="dashboardsLength > 1">
                  <a
                    class
                    id
                    v-on:click="
                      removeEntry(index);
                      saveJson();
                    "
                  >
                    <button class="normalChartButton button--right">
                      <i class="fa fa-trash"></i>
                      {{ $t("menu.delete") }}
                    </button>
                  </a>
                </div>
                <span
                  v-else
                  href="#"
                  class="normalChartButton button--right bg-danger"
                >
                  <i class="fa fa-trash"></i>
                  {{ $t("menu.delete") }}
                </span>
                <router-link
                  class="normalChartButton"
                  :to="
                    '/' +
                      $i18n.locale +
                      '/metrics/' +
                      serviceName +
                      '/' +
                      dashboardName +
                      '/edit/' +
                      metric.title
                  "
                >
                  <i class="fa fa-edit"></i>
                  {{ $t("menu.edit") }}
                </router-link>
              </div>
              <hr />
              <div>{{ metric.desc }}</div>
              <br />
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint no-console: ["error", { allow: ["warn", "log"] }] */
import draggable from "vuedraggable";
//import json from "@/assets/dashboards.json";
//import lookback from "@/assets/lookback.json";
import Chart from "@/components/Chart.vue";

export default {
  name: "Dashboards",
  components: {
    draggable,
    Chart
  },
  data: function() {
    return {
      dashboards: null,
      imageToggle: true,
      jsonData: [],
      datacollection: [],
      bigbrainloaded: false,
      timer: ""
    };
  },
  computed: {
    serviceName: function() {
      return this.$route.params.service;
    },
    dashboardName: function() {
      return this.$route.params.dashboard;
    },
    dashboard: function() {
      return this.dashboards.find(
        element => element.name == this.dashboardName
      );
    },
    dashboardsLength: function() {
      return this.dashboard.metrics.length;
    }
  },
  methods: {
    removeEntry: function(index) {
      this.$delete(this.dashboard.metrics, index);
      this.saveJson();
    },
    screenWidthCheck: function() {
      if (window.screen.width > 1000) {
        return true;
      } else {
        return false;
      }
    },
    saveJson: function() {
      let jsonFile = { dashboards: [] };
      this.dashboards.forEach(element => {
        jsonFile.dashboards.push(element);
      });
      this.$http
        .post("http://localhost:8080/SaveJson", this.jsonFile)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error.response);
        });
    },
    fillData(chart, index) {
      //processes the json Data from the get request to chart arrays
      let chartMetric = this.dashboard.metrics[index].metric;

      let chartLabels = [];
      let chartData = [];
      let chartColor = [];
      let cLabel = [];
      let cData = [];
      let cColor = [];

      chart[chartMetric].lookback.forEach(lkbk => {
        cLabel.push(lkbk[0]);
        cData.push(lkbk[1]);
        cColor.push("rgb(226,0,116)");
      });

      chart[chartMetric].prediction.forEach(lkbk => {
        cLabel.push(lkbk[0]);
        cData.push(lkbk[1]);
        cColor.push("#1bada2");
      });

      chartLabels.push(cLabel);
      chartData.push(cData);
      chartColor.push(cColor);

      //throw everything into temp array
      let temp = [];

      chartData.forEach((elem, i) => {
        temp = {
          labels: chartLabels[i],
          datasets: [
            {
              label: this.dashboard.metrics[index].metric,
              pointBackgroundColor: chartColor[i],
              pointRadius: 5,
              pointHoverRadius: 20,
              data: elem
            }
          ]
        };
      });

      //pushes temp to datacollection for chart component
      this.datacollection.push(temp);
      this.bigbrainloaded = true;
    },
    loadChartData: function() {
      //loads lookback and prediction data for charts
      this.dashboard.metrics.forEach((element, index) => {
        const baseURI =
          "http://localhost:8080/ml_req?service=Testservice&model=" +
          element.model +
          "&lookback=5";
        this.$http.get(baseURI).then(result => {
          this.jsonData.push(result.data);
          this.fillData(this.jsonData[0], index);
          this.jsonData = [];
        });
      });
    },
    loadDashboardData: function() {
      //load Dashboards json
      const t = this;
      return fetch("http://localhost:8080/LoadJson")
        .then(response => {
          return response.json();
        })
        .then(data => {
          t.dashboards = JSON.parse(JSON.stringify(data.dashboards));

          t.loadChartData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearAutoUpdate: function() {
      clearInterval(this.timer);
    }
  },
  mounted() {
    this.loadDashboardData();
    //this.timer = setInterval(this.loadDashboardData(), 10000);
  },
  beforeDestroy() {
    this.clearAutoUpdate();
  }
};
</script>

<style scoped>
.cursor--add {
  cursor: copy;
}

/*--------------------------------
      CSS GRID für die Charts
  ---------------------------------*/
.chart__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 1em;
  grid-column-gap: 1em;
}

.chartButtons__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 1em;
}
.chart__flex {
  display: flex;
  flex-direction: column;
}
/* .grid__item {
} */

/*Tablet & Phone*/
@media only screen and (max-width: 1000px) {
  .chart__grid {
    grid-template-columns: repeat(1, 1fr);
  }
  .chartButtons__grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
  .chart__flex {
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
