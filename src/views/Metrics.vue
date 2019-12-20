<template>
  <div v-if="services" class="container mt-4">
    <h3>{{ dashboardName }}</h3>
    <br />
    <div class="w-100 pr-4">
      <router-link
        class="routerLink pull-right"
        :to="'/metrics/' + serviceName + '/' + dashboardName + '/new'"
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
              :to="'/dashboards/' + serviceName"
            >
              {{ serviceName }}</router-link
            >
          </li>
          <li class="breadcrumb-item active">
            {{ dashboardName }}
          </li>
        </ol>
      </nav>
      <div v-for="(metric, index) in dashboard.metrics" :key="index">
        {{ metric.title }}
        <a class="" id="" v-on:click="removeEntry(index)">
          <button class="button--right">
            <i class="fa fa-trash"></i> Delete
          </button>
        </a>
        <router-link
          class=""
          :to="
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
</template>

<script>
import json from "@/assets/dashboards.json";
export default {
  name: "Dashboards",
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
        position: this.dashboard.metrics.length +1
      });
    }
  },
  created() {
    this.services = json;
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

@media only screen and (max-width: 1025px) {
}

@media only screen and (max-width: 700px) {
}
</style>
