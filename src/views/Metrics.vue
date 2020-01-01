<template>
  <div v-if="services" class="container mt-4">
    <h3>{{ dashboardName }}</h3>
    <br />
    <div class="w-100 pr-4">
      <router-link
        class="routerLink pull-right"
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
        <button class="normalButton cursor--add" @click="newMetric()">
          <i class="fa fa-plus"></i> New Diagram
        </button>
      </router-link>
    </div>
    <br />
    <div class="w-75 mx-auto">
      <nav class="">
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
              class=" breadcrumb__link"
              :to="'/' + $i18n.locale + '/dashboards/' + serviceName"
            >
              {{ serviceName }}</router-link
            >
          </li>
          <li class="breadcrumb-item active">
            {{ dashboardName }}
          </li>
        </ol>
      </nav>
      <draggable
        v-model="dashboard.metrics"
        v-if="screenWidthCheck() === true"
        :move="saveJson()"
        class="chart__grid"
      >
        <div v-for="(metric, index) in dashboard.metrics" :key="index">
          <!-- TODO: CHART COMPONENT -->
          <Chart :chart-data="datacollection"></Chart>
          <button @click="fillData()">Fill Data</button>
          {{ metric.title }}
          <a class="" id="" v-on:click="removeEntry(index)">
            <button class="button--right">
              <i class="fa fa-trash"></i> Delete
            </button>
          </a>
          <router-link
            class=""
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
            <button><i class="fa fa-edit"></i> Edit</button>
          </router-link>
        </div>
      </draggable>
      <div v-else>
        <div v-for="(metric, index) in dashboard.metrics" :key="index">
          <!-- TODO: CHART COMPONENT -->
          <Chart :chart-data="datacollection"></Chart>
          <button @click="fillData()">Fill Data</button>
          {{ metric.title }}
          <a class="" id="" v-on:click="removeEntry(index)">
            <button class="button--right">
              <i class="fa fa-trash"></i> Delete
            </button>
          </a>
          <router-link
            class=""
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
            <button><i class="fa fa-edit"></i> Edit</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import json from "@/assets/dashboards.json";
import lookback from "@/assets/lookback.json";
import Chart from "@/components/Chart.vue";

export default {
  name: "Dashboards",
  components: {
    draggable,
    Chart
  },
  data: function() {
    return {
      services: null,
      imageToggle: true
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
      return this.services.find(element => element.name == this.dashboardName);
    }
  },
  methods: {
    removeEntry: function(index) {
      this.$delete(this.dashboard.metrics, index);
    },
    newMetric: function() {
      this.dashboard.metrics.push({
        title: "",
        model: "1",
        metric: "1",
        predtime: "5 min",
        position: this.dashboard.metrics.length + 1
      });
    },
    screenWidthCheck: function() {
      if (window.screen.width > 1000) {
        return true;
      } else {
        return false;
      }
    },
    saveJson: function() {
      //this.$http.post("http://localhost:8000/SaveJson", this.services);
    },
    fillData() {
      this.datacollection = {
        labels: this.chartLabels,
        datasets: [
          {
            label: "Data One",
            backgroundColor: this.chartColor,
            data: this.chartData
          }
        ]
      };
    }
  },
  created() {
    this.services = json;
    this.lookback = lookback;
    this.chartLabels = new Array();
    this.chartData = new Array();
    this.chartColor = new Array();

    lookback.count.lookback.forEach(element => {
      this.chartLabels.push(element[0]);
      this.chartData.push(element[1]);
      this.chartColor.push("rgb(226, 0, 116)");
    });
    lookback.count.prediction.forEach(element => {
      this.chartLabels.push(element[0]);
      this.chartData.push(element[1]);
      this.chartColor.push("#1bada2");
    });

    this.fillData();
  },
  mounted() {
    /*const baseURI = 'http://172.17.0.2:8000/GetServices'
      this.$http.get(baseURI)
      .then((result) => {
        this.services = result.data
      });
    */
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

/* .grid__item {
} */

/*Tablet & Phone*/
@media only screen and (max-width: 1000px) {
  .chart__grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
