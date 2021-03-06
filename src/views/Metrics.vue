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
          <i class="fa fa-plus"></i> {{ $t("metrics.new") }}
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
      <h3 v-if="chartsLoaded === false">
        {{ $t("metrics.loading") }}....
        <br />
        <br />
        <br />
        {{ $t("metrics.please") }}
      </h3>

      <div class="border rounded" v-if="chartsLoaded === true">
        <div class="w-25 mx-auto">
          <span class="">
            <ul>
              <li class="color--red">{{ $t("metrics.lookbackData") }}</li>
              <li class="color--cyan">{{ $t("metrics.predictionData") }}</li>
            </ul>
          </span>
        </div>
      </div>
      <br />
      <!-- DESKTOP VERSION -->
      <!-- drag & drop is only activated at desktop version, because buttons aren't accessable in mobile version due to draggable component -> screenWidthCheck() -->
      <draggable
        v-model="dashboard.metrics"
        v-if="screenWidthCheck() === true && chartsLoaded === true"
        class="chart__grid"
      >
        <!-- :move="saveJson()" -> draggable compontent -->
        <div v-for="(metric, index) in dashboard.metrics" :key="index">
          <!-- CHART -->
          <div class="border pr-2">
            <br />
            <p>
              <b>{{ metric.title }}</b>
            </p>
            <p>
              {{ $t("metrics.pred") }} {{ metric.predtime }}
              {{ $t("metrics.min") }}
            </p>
            <div class="chartButtons__grid">
              <div>
                <Chart :chart-data="datacollection[index]"></Chart>
              </div>
              <div class="chart__flex">
                <div v-if="dashboardsLength > 1">
                  <a class id v-on:click="deleteWindow = index">
                    <button class="normalChartButton button--right">
                      <i class="fa fa-trash"></i>
                      {{ $t("menu.delete") }}
                    </button>
                  </a>
                </div>
                <span
                  v-else
                  class="normalChartButton button--right bg-lightgrey"
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
            </div>
            <hr />
            <div>{{ metric.desc }}</div>
            <br />
          </div>
          <br v-if="deleteWindow === index" />
          <div
            class="row w-100 border--magenta--full py-2 rounded"
            v-if="deleteWindow === index"
          >
            <div class="col-6">{{ $t("notification.msg") }}</div>
            <a
              class="normalChartButton col-2 text-white"
              id
              v-on:click="removeEntry(index)"
            >
              <i class="fa fa-trash"></i>
              {{ $t("notification.yes") }}
            </a>
            <a
              class="normalChartButton col-2 ml-2"
              v-on:click="deleteWindow = false"
              href="#"
            >
              {{ $t("notification.no") }}
            </a>
          </div>
        </div>
      </draggable>
      <!-- MOBILE VERSION without draggable component -->
      <div v-else>
        <div v-if="chartsLoaded === true">
          <div v-for="(metric, index) in dashboard.metrics" :key="index">
            <!-- CHART -->
            <div class="border">
              <br />
              <p>
                <b>{{ metric.title }}</b>
              </p>
              <p>Predicted time: {{ metric.predtime }} minutes</p>
              <Chart :chart-data="datacollection[index]"></Chart>
              <div class="chart__flex mx-auto">
                <div v-if="dashboardsLength > 1">
                  <a class id v-on:click="deleteWindow = index">
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
        <br v-if="deleteWindow === index" />
        <div
          class="row w-100 border--magenta--full py-2 rounded"
          v-if="deleteWindow === index"
        >
          <div class="col-6">{{ $t("notification.msg") }}</div>
          <a
            class="normalChartButton col-2 text-white"
            id
            v-on:click="removeEntry(index)"
          >
            <i class="fa fa-trash"></i>
            {{ $t("notification.yes") }}
          </a>
          <a
            class="normalChartButton col-2 ml-2"
            v-on:click="deleteWindow = false"
            href="#"
          >
            {{ $t("notification.no") }}
          </a>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  </div>
</template>

<script>
/*eslint no-console: ["error", { allow: ["warn", "log"] }] */
import draggable from "vuedraggable";
//import json from "@/assets/dashboards.json";
//import lookback from "@/assets/lookback.json";
import Chart from "@/components/Chart.vue";
import _ from "lodash";
import urlConfig from "@/assets/urlConfig.json";

export default {
  name: "Dashboards",
  components: {
    draggable,
    Chart
  },
  data: function() {
    return {
      dashboards: null,
      urlConfig,
      imageToggle: true,
      jsonData: [],
      datacollection: [],
      chartsLoaded: false,
      deleteWindow: false
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
      this.deleteWindow = false;
    },
    screenWidthCheck: function() {
      if (window.screen.width > 1000) {
        return true;
      } else {
        return false;
      }
    },
    saveJson: function() {
      let jsonFile = { settings: [] };
      this.dashboards.forEach(element => {
        jsonFile.settings.push(element);
      });
      this.$http
        .post(this.urlConfig[0].MLServer + "SaveJson", this.jsonFile)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error.response);
        });
    },
    //processes the json Data from the get request to build nested datacollection object
    fillData(chart, index) {
      let chartMetric = this.dashboard.metrics[index].metric;

      let chartLabels = [];
      let chartData = [];
      let chartColor = [];
      let cLabel = [];
      let cData = [];
      let cColor = [];

      let dateFormat = date => {
        let string = date.slice(5, 16);
        let day = string[3] + string[4];
        let month = string[0] + string[1];
        return day + "." + month + string.slice(5, 11);
      };

      //pushes lookback data into temporary arrays
      chart[chartMetric].lookback.forEach(lkbk => {
        cLabel.push(dateFormat(lkbk[0]));
        cData.push(lkbk[1]);
        cColor.push("rgb(226,0,116)");
      });

      //pushes prediction data into temporary arrays
      chart[chartMetric].prediction.forEach(lkbk => {
        cLabel.push(dateFormat(lkbk[0]));
        cData.push(lkbk[1]);
        cColor.push("#1bada2");
      });

      //pushes temporary arrays into collecting arrays
      chartLabels.push(cLabel);
      chartData.push(cData);
      chartColor.push(cColor);

      //formating data
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
      if (
        this.datacollection.length ===
        this.dashboard.metrics[index].metric.length
      ) {
        this.datacollection = [];
      }
      //pushes temp to datacollection for chart component

      this.datacollection.push(temp);

      //signals view - data is loaded to render charts
      if (index === this.dashboard.metrics.length - 1) {
        this.chartsLoaded = true;
      }
      return true;
    },
    //loads lookback and prediction data for charts
    loadChartData: function(element) {
      let t = this;
      const baseURI =
        this.urlConfig[0].MLServer +
        "ml_req?service=" +
        t.serviceName +
        "&model=" +
        t.dashboard.metrics[element].model +
        "&lookback=5";
      t.$http.get(baseURI).then(result => {
        t.jsonData.push(result.data);
        let finished = t.fillData(t.jsonData[0], element);
        if (finished === true) {
          t.jsonData = [];
          if (element != t.dashboard.metrics.length) {
            t.loadChartData(++element);
          }
        }
      });
    },
    //load Dashboards json
    loadDashboardData: function() {
      let t = this;
      return fetch(this.urlConfig[0].MLServer + "LoadJson")
        .then(response => {
          return response.json();
        })
        .then(data => {
          t.dashboards = JSON.parse(JSON.stringify(data.settings));

          t.loadChartData(0);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.loadDashboardData();
  },
  watch: {
    //update chartdata every minute
    dashboards: _.debounce(function() {
      this.loadDashboardData();
    }, 60000)
  }
};
</script>

<style scoped>
.cursor--add {
  cursor: copy;
}

.bg-lightgrey {
  background-color: var(--superlightgrey);
}

.color--cyan {
  color: #1bada2;
}

.color--red {
  color: rgb(226, 0, 116);
}

/*--------------------------------
      CSS GRID Charts
  ---------------------------------*/
.chart__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /*grid width*/
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
