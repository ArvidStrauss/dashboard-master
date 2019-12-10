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
      <h2 class="text-center mb-3">add new Dashboard to {{ serviceName }}</h2>
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
        <li class="breadcrumb-item">
          <router-link
                  class=" breadcrumb__link"
                  :to="'/metrics/' + serviceName +'/' +dashboardName "> {{ dashboardName }}</router-link>
        </li>
      </ol>
    </nav>
    <form>
      <div class="container form-group pb-4">
        <label>Title</label>
        <input type="text" name="" placeholder="Title" class="form-control text-center" v-model="dashboard.metrics[dashboard.metrics.length -1].name">
        <br>
        <label>Description</label>
        <textarea rows="3" class="form-control text-center" placeholder="Description" v-model="dashboard.metrics[dashboard.metrics.length -1].description"></textarea>
		<hr>
		<br>
		<label>Model</label>
		<select class="form-control">
			<option>Model 1</option>
		</select>
		<br>
		<label>Metric</label>
		<select class="form-control">
			<option>Metric 1</option>
		</select>
		<br>
		<label>Prediction Time</label>
		<select class="form-control">
			<option>5 min</option>
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
      return this.dashboards.find(element => element.name == this.dashboardName);
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
    },
  },
  mounted(){
    this.dashboards = json;
    
    this.dashboard.metrics.push({
        name: ""
      });
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
