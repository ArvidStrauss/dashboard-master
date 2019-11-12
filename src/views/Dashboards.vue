<template>
  <div class="dashboards container">
    <div v-for="(dashboard, index) in service.dashboards" :key="index">
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">{{ dashboard.name }}</h5>
          <p class="card-text">{{ dashboard.description }}</p>
          <router-link
            class="btn btn-primary"
            :to="'/metrics/' + serviceName + '/' + dashboard.name"
          >Go</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import json from "@/assets/services.json";

export default {
  name: "Dashboards",
  data: function() {
    return {
      services: json
    };
  },
  computed: {
    serviceName: function() {
      return this.$route.params.service;
    },
    service: function() {
      return this.services.find(element => element.name == this.serviceName);
    }
  }
};
</script>
