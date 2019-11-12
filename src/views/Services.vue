<template>
  <div class="services">
    <div v-for="(service, index) in services" :key="index">
      <img :src="service.image" />
      <router-link class="btn btn-primary" :to="'/dashboards/' + service.name">
        zum {{
        service.name
        }} Dashboard
      </router-link>
    </div>
  </div>
</template>

<script>
import json from "@/assets/services.json";

export default {
  name: "Services",
  data: function() {
    return {
      services: json
    };
  }
};
</script>

<style scoped>
.services img {
  width: 200px;
  margin-right: 10px;
}
</style>
