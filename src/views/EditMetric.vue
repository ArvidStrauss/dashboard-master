<template>
  <section  v-if="dashboards" class="mt-4 form--width mx-auto border--magenta px-2">
    <div>
      <router-link
                  class="pull-right breadcrumb__link mr-2"
                  :to="'/metrics/' + serviceName +'/' +dashboardName "><i class="fa fa-times" style="font-size: 25pt"></i> </router-link>
      <br>
    </div>
    <br>
    <div>
      <h2 class="dashboards mb-3">add new Dashboard to {{ serviceName }}</h2>
    </div>
    <nav class="">
      <ol class="breadcrumb bg-white">
        <li class="breadcrumb-item" @mouseover="imageToggle = false" @mouseleave="imageToggle = true">
          <router-link
                  class="breadcrumb__link"
                  :to="'/'" >
            <img src="@/assets/img/home.png"  class="breadcrumb__img" v-if="imageToggle == true">
            <img src="@/assets/img/home--magenta.png"  class="breadcrumb__img" v-if="imageToggle == false"> 
          </router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link
                  class=" breadcrumb__link"
                  :to="'/dashboards/' + serviceName "> {{ serviceName }}</router-link>
        </li>
        <li class="breadcrumb-item active">
          {{ metricName }}
        </li>
      </ol>
    </nav>
    <form>
      <div class="container form-group pb-4">
        <p class="text-left">Title</p>
        <input type="text" required name="" placeholder="Title" class="form-control dashboards" v-model="dashboards[dashboardID].metrics[metricID].title">
        <br>
        <p class="text-left">Description</p>
        <textarea rows="3" required class="form-control dashboards" placeholder="Description" v-model="dashboards[dashboardID].metrics[metricID].description"></textarea>
        <hr>
        <br>
        <router-link
                  class="card routerLink breadcrumb__link pt-2 pl-4"
                  :to="'/metrics/' +serviceName +'/' +dashboardName +'/selectMo/' +dashboards[dashboardID].metrics[metricID].title">
          <p class="text-left">choose Model</p>        
        </router-link>
        <br>
        <router-link
                  class="card routerLink breadcrumb__link pt-2 pl-4"
                  :to="'/metrics/' +serviceName +'/' +dashboardName +'/selectMe/' +dashboards[dashboardID].metrics[metricID].title">
          <p class="text-left">choose Metric</p>        
        </router-link>
        <br>
        <hr>
        <p class="text-left">Prediction Time</p>
        <select class="form-control" required v-model="dashboards[dashboardID].metrics[metricID].predtime">
          <option selected>5 min</option>
        </select>
        <br>
        <button class="btn btn-lg w-50 btn-primary" type="submit">Speichern</button>
      </div>
    </form>
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
      metricID: -1
    };
  },
  computed: {
    serviceName: function() {
      return this.$route.params.service;
    },
    dashboardName: function() {
      return this.$route.params.dashboard;
    },
    metricName: function(){
      return this.$route.params.metric;
    }
  },
  methods:{
    radioCheck: function(btn){
      if(btn == 'Point'){
        document.getElementById("radioBtnPointChart").checked=true;
      }
      if(btn == 'Line'){
        document.getElementById("radioBtnLineChart").checked=true;
      }    },
  },
  mounted(){
    this.dashboards = json;

    this.dashboardID = this.dashboards.map(function(e) {return e.name;}).indexOf(this.$route.params.dashboard);
    this.metricID = this.dashboards[this.dashboardID].metrics.map(function(e) {return e.title;}).indexOf(this.$route.params.metric);
  }
};
</script>

<style scoped>
  
  input[type="radio"]{
    display: none;
  }

  hr{
    background-color: var(--magenta);
  }

  .img--size{
    width: 200px;
    height: 200px;
  }

  .img--size:hover{
    cursor: pointer;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0), 0 0 5px var(--magenta);
  }
  
  .paragraphLink{
    text-decoration: none;
    color: black;
    font-size: 1.1em;
  }
  
  .paragraphLink:hover{
    color: var(--magenta);
  }

  /*Table*/
  @media only screen and (max-width: 1200px){
    .form--width{
      width: 90%;
    }
  }
  
  /*Phone*/
  @media only screen and (max-width: 500px){
    .form--width{
      width: 90%;
    }
  }
</style>
