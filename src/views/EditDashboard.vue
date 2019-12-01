<template>
  <section  class="mt-4 form--width mx-auto">
    <h2 class="text-center mb-3">{{dashboardName }} bearbeiten</h2>
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
        <p>Titel</p>
        <input type="text" class="form-control text-center" name="" placeholder="Titel" v-model="services[1].dashboards[1].name">
        <p>Beschreibung</p>
        <textarea rows="3" class="form-control text-center" placeholder="Beschreibung" v-model="services[serviceID].dashboards[dashboardID].description"></textarea>
        <hr class="bg-magenta">
        
        <div class="container border rounded">
          <a class="paragraphLink" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            <p>Diagramm 1 ⮟</p>
          </a>
          <div id="collapseExample" class="collapse">
            <label>Model</label>
            <select class="form-control">
              <option>Model_1</option>
            </select>
            <br>
            <label>Zeitparameter</label>
            <select class="form-control">
              <option>5 min</option>
            </select>
            <br>
            <label>Wählen Sie einen Diagrammtypen</label>
            <div class="container">
              <div class="row">
                <div class="col">
                  <div class="col-sm-14 border img--size">
                    <img src="@/assets/img/diagramm.png" class="img-fluid img-thumb">
                  </div>
                </div>
                <div class="col">
                  <div class="col-sm-14 border img--size">
                    <img src="@/assets/img/diagramm.png" class="img-fluid img-thumb">
                  </div>
                </div>
              </div>            
            </div>
            <br>
          </div>
        </div>
        <br>
        <div class="container border rounded">
          <a class="paragraphLink" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            <p>Diagramm 1 ⮟</p>
          </a>
          <div id="collapseExample" class="collapse">
            <label>Model</label>
            <select class="form-control">
              <option>Model_1</option>
            </select>
            <br>
            <label>Zeitparameter</label>
            <select class="form-control">
              <option>5 min</option>
            </select>
            <br>
            <label>Wählen Sie einen Diagrammtypen</label>
            <div class="container">
              <div class="row">
                <div class="col">
                  <div class="col-sm-14 border img--size">
                    <img src="@/assets/img/diagramm.png" class="img-fluid img-thumb">
                  </div>
                </div>
                <div class="col">
                  <div class="col-sm-14 border img--size">
                    <img src="@/assets/img/diagramm.png" class="img-fluid img-thumb">
                  </div>
                </div>
              </div>            
            </div>
            <br>
          </div>
        </div>
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
  mounted(){
      this.serviceID = this.services.map(function(e) { return e.name; }).indexOf(this.$route.params.service);
      this.dashboardID = this.service.dashboards.map(function(e) {return e.name;}).indexOf(this.$route.params.dashboard);
  }
};
</script>

<style scoped>
  hr{
    background-color: #E20074;
  }
  .border--magenta{
    border-left: 1px solid;
    border-right: 1px solid;
    border-bottom: 1px solid;
    border-color: #E20074;
  }
  .img--size{
    width: 200px;
    height: 200px;
  }

  .form--width{
    width: 50%;
  }
  
  .paragraphLink{
    text-decoration: none;
    color: black;
    font-size: 1.1em;
  }
  .paragraphLink:hover{
    color: var(--magenta);
  }

  .breadcrumb__link{
    color: black;
  }
  .breadcrumb__link:hover{
    color: var(--magenta);
    cursor: pointer;
  }

  .breadcrumb__img{
    height: 20px;
    width: 20px;
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
