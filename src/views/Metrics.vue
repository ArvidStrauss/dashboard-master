<template>
  <div v-if="services" class="container mt-4">
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
        <button
          class="normalButton pull-right cursor--add"
          @click="newMetric()"
        >
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
      <div class="w-50 mx-auto border">
        <span class="color--red">Historic Data</span>
        <span class="color--cyan ml-4">Prediction Data</span>
      </div>
      <br>
      <draggable
        v-model="dashboard.metrics"
        v-if="screenWidthCheck() === true"
        :move="saveJson()"
        class="chart__grid"
      >
         <div class="border pr-2 pt-2 rounded">
            <!-- <Chart :chart-data="chartdata[index]"></Chart> -->
          <h4>Response Time</h4>
          <p>Predicted time: <b> 15 minutes </b></p>
          <div class="chartButtons__grid">
            <div>
              <Chart :chart-data="datacollection"></Chart>
            </div>
            <div class="chart__flex">
              <a class id >
                <button class="normalChartButton button--right">
                  <i class="fa fa-trash"></i> Delete
                </button>
              </a>
              <a class="normalChartButton" href="#"
              >
                <i class="fa fa-edit"></i> Edit
              </a>
              <button class="normalChartButton" @click="fillData()">
                Fill Data
              </button>
            </div>
          </div>
          <hr>
          Prediction of reponse time for the next 15 minutes
         <br><br>
         </div>
         <div class="pr-2 border pt-2 rounded">
            <!-- <Chart :chart-data="chartdata[index]"></Chart> -->
          <h4>500er Errors</h4>
          <p>Predicted time: <b> 15 minutes </b></p>
          <div class="chartButtons__grid">
            <div>
              <Chart :chart-data="secondDa"></Chart>
            </div>
            <div class="chart__flex">
              <a class id >
                <button class="normalChartButton button--right">
                  <i class="fa fa-trash"></i> Delete
                </button>
              </a>
              <a
                class="normalChartButton"
                href="#"
                
              >
                <i class="fa fa-edit"></i> Edit
              </a>
              <button class="normalChartButton" @click="fillData()">
                Fill Data
              </button>
            </div>
          </div>
          <hr>
          Prediction of 500 errors for the next 15 minutes
         <br><br>
         </div>
         <div class="border pr-2 pt-2 rounded">
            <!-- <Chart :chart-data="chartdata[index]"></Chart> -->
          <h4>200 codes</h4>
          <p>Predicted time: <b> 15 minutes </b></p>
          <div class="chartButtons__grid">
            <div>
              <Chart :chart-data="thirdDa"></Chart>
            </div>
            <div class="chart__flex">
              <a class id >
                <button class="normalChartButton button--right">
                  <i class="fa fa-trash"></i> Delete
                </button>
              </a>
              <a class="normalChartButton" href="#"
              >
                <i class="fa fa-edit"></i> Edit
              </a>
              <button class="normalChartButton" @click="fillData()">
                Fill Data
              </button>
            </div>
          </div>
          <hr>
          Prediction of 200 codes for the next 15 minutes
         <br><br>
         </div>
      </draggable>
      <div v-else>
        <div v-for="(metric, index) in dashboard.metrics" :key="index">
          <!-- TODO: CHART COMPONENT -->
          <Chart :chart-data="datacollection"></Chart>
          <div class="chart__flex mx-auto">
            <a class id v-on:click="removeEntry(index)">
              <button class="normalChartButton button--right">
                <i class="fa fa-trash"></i> Delete
              </button>
            </a>
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
              <i class="fa fa-edit"></i> Edit
            </router-link>
            <button class="normalChartButton" @click="fillData()">
              Fill Data
            </button>
          </div>
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
      imageToggle: true,
      chartdata: [],
      secondDa: [],
      thirdDa: [],
      next: 1
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
      this.$http.post("http://localhost:8080/SaveJson", this.services);
    },
    fillData() {
      this.datacollection = {
        labels: this.chartLabels,
        datasets: [
          {
            label: "Response Time",
            pointBackgroundColor: this.chartColor,
            pointRadius: 5,
            pointHoverRadius: 20,
            data: this.chartData
          }
        ]
      };
      this.next ++;
      this.secondData();
    },
    secondData(){
      this.chartLabels = [];
      this.chartData = [];
      this.chartColor = [];

      this.services = json;
      this.lookback = lookback; // muss durch chartData[index] ersetzt werden
      this.chartLabels = new Array();
      this.chartData = new Array();
      this.chartColor = new Array();

      lookback["500"].lookback.forEach(element => {
        this.chartLabels.push(element[0]);
        this.chartData.push(element[1]);
        this.chartColor.push("rgb(226, 0, 116)");
      });
      lookback["500"].prediction.forEach(element => {
        this.chartLabels.push(element[0]);
        this.chartData.push(element[1]);
        this.chartColor.push("#1bada2");
      });

      this.secondDa = {
        labels: this.chartLabels,
        datasets: [
          {
            label: "500",
            pointBackgroundColor: this.chartColor,
            pointRadius: 5,
            pointHoverRadius: 20,
            data: this.chartData
          }
        ]
      };
      this.thirdData();
    },
    thirdData(){
      this.chartLabels = [];
      this.chartData = [];
      this.chartColor = [];

      this.services = json;
      this.lookback = lookback; // muss durch chartData[index] ersetzt werden
      this.chartLabels = new Array();
      this.chartData = new Array();
      this.chartColor = new Array();

      lookback["200"].lookback.forEach(element => {
        this.chartLabels.push(element[0]);
        this.chartData.push(element[1]);
        this.chartColor.push("rgb(226, 0, 116)");
      });
      lookback["200"].prediction.forEach(element => {
        this.chartLabels.push(element[0]);
        this.chartData.push(element[1]);
        this.chartColor.push("#1bada2");
      });

      this.thirdDa = {
        labels: this.chartLabels,
        datasets: [
          {
            label: "200",
            pointBackgroundColor: this.chartColor,
            pointRadius: 5,
            pointHoverRadius: 20,
            data: this.chartData
          }
        ]
      };
    }
  },
  created() {
    this.services = json;
    this.lookback = lookback; // muss durch chartData[index] ersetzt werden
    this.chartLabels = new Array();
    this.chartData = new Array();
    this.chartColor = new Array();

    lookback["sum_result.response_time_micsec"].lookback.forEach(element => {
      this.chartLabels.push(element[0]);
      this.chartData.push(element[1]);
      this.chartColor.push("rgb(226, 0, 116)");
    });
    lookback["sum_result.response_time_micsec"].prediction.forEach(element => {
      this.chartLabels.push(element[0]);
      this.chartData.push(element[1]);
      this.chartColor.push("#1bada2");
    });

    this.fillData();
  },
  mounted() {
    /*this.$http.get('http://localhost:8080/LoadJson')
    .then(response => (this.dashboards=response.data))
    .catch(error => console.log(error))
    
      this.dashboard.metrics.forEach(element => {
        const baseURI = 'http://localhost:8000/ml_req?service=' +this.serviceName +'&model=' +element.model +'&lookbkack=5'
        this.$http.get(baseURI)
        .then((result) => {
          this.chartdata.push(result.data);
      })
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
