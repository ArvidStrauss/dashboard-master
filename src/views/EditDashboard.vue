<template>
  <section  class="mt-4 form--width mx-auto">
    <h2 class="text-center mb-3">edit {{dashboardName }}</h2>
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
          {{ dashboardName }}
        </li>
      </ol>
    </nav>
    <form>
      <div class="container border--magenta rounded form-group pb-4">
        <label>Title</label>
        <input type="text" class="form-control text-center" name="" placeholder="Titel" v-model="services[serviceID].dashboards[dashboardID].name">
        <br>
        <label>Description</label>
        <textarea rows="3" class="form-control text-center" placeholder="Beschreibung" v-model="services[serviceID].dashboards[dashboardID].description"></textarea>
        <hr class="bg-magenta">
        <button class="btn btn-primary w-50">Add new chart</button>
        <div>
  <b-button v-b-toggle.collapse-1 variant="primary">Toggle Collapse</b-button>
  <b-collapse id="collapse-1" class="mt-2">
    <b-card>
      <p class="card-text">Collapse contents Here</p>
      <b-button v-b-toggle.collapse-1-inner size="sm">Toggle Inner Collapse</b-button>
      <b-collapse id="collapse-1-inner" class="mt-2">
        <b-card>Hello!</b-card>
      </b-collapse>
    </b-card>
  </b-collapse>
</div>
        <div v-for="(metric, index) in service.dashboards[dashboardID].metrics" :key="index">
          <div class="container border rounded">
            
            <b-btn v-b-toggle="'chart' +index" variant="primary">Chart {{ metric.name }} </b-btn>
            <b-collapse :id="'chart' +index" class="collapse">
              <b-card>  
                <label>Model</label>
                <select class="form-control">
                  <option>Model_1</option>
                </select>
                <br>
                <label>Requested Time</label>
                <select class="form-control">
                  <option>5 min</option>
                </select>
                <br>
                <label>Choose a chart type</label>
                <br>
                <input type="radio" name="chart" id="radioBtnPointChart">
                <input type="radio" name="chart" id="radioBtnLineChart">
                
                <div class="container">
                  <div class="row">
                    <div class="col">
                      <div class="col-sm-14 border img--size" v-on:click="radioCheck('Point')">
                        <img src="@/assets/img/diagramm.png" class="img-fluid img-thumb">
                        <label>Point Chart</label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="col-sm-14 border img--size" v-on:click="radioCheck('Line')">
                        <img src="@/assets/img/diagramm.png" class="img-fluid img-thumb">
                        <label>Line Chart</label>
                      </div>
                    </div>
                  </div>
                  <br>            
                </div>
                <br>
            </b-card>
          </b-collapse>
        </div>
        </div>
        <hr>
        <br>
        <button class="btn btn-lg w-50 btn-primary" type="submit">Speichern</button>
      </div>
    </form>
  </section>
</template>

<script>
import json from "@/assets/services.json";

export default {
  name: "EditDashboards",
  data: function() {
    return {
      services: json,
      serviceID: -1,
      dashboardID: -1,
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
      return this.services
        .find(element => element.name == this.serviceName)
        .dashboards.find(element => element.name == this.dashboardName);
    },
    service: function() {
      return this.services.find(element => element.name == this.serviceName);
    }
  },
  methods:{
    radioCheck: function(btn){
      if(btn == 'Point'){
        document.getElementById("radioBtnPointChart").checked=true;
      }
      if(btn == 'Line'){
        document.getElementById("radioBtnLineChart").checked=true;
      }
    }
  },
  mounted(){
      this.serviceID = this.services.map(function(e) { return e.name; }).indexOf(this.$route.params.service);
      this.dashboardID = this.service.dashboards.map(function(e) {return e.name;}).indexOf(this.$route.params.dashboard);
  }
};
</script>

<style scoped>
  
  input[type="radio"]{
    display: none;
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
