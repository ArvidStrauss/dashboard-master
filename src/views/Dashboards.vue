<template>
  <div class="container w-75 mx-auto mt-4">
    <h3> {{ serviceName }} </h3>
    <nav class="mx-auto w-100">
      <ol class="breadcrumb bg-white">
        <li class="breadcrumb-item" @mouseover="imageToggle = false" @mouseleave="imageToggle = true">
          <router-link
                  class="breadcrumb__link"
                  :to="'/'" >
            <img src="@/assets/img/home.png"  class="breadcrumb__img" v-if="imageToggle == true">
            <img src="@/assets/img/home--magenta.png"  class="breadcrumb__img" v-if="imageToggle == false"> 
          </router-link>
        </li>
        <li class="breadcrumb-item active">
          {{ serviceName }}
        </li>
      </ol>
    </nav>
    <div class="">
      <router-link
                  class="btn btn-secondary pull-left"
                  :to="'/dashboards/' +serviceName +'/new/dashboard'">
                New Dashboard
      </router-link> 
    </div>
    <br>
    <br>
    <div v-for="(dashboard, index) in service.dashboards" :key="index">
      <div class="row mb-4">
        <div class="card w-100">
          <div class="card-header">
            <div class="card__header">
              <h6 class="font-weight-bold text-white">{{ dashboard.name }}</h6>
              <ul class="nav nav-tabs card-header-tabs pull-right"  id="">
                <li class="nav-item">
                  <router-link
                  class="nav-link "
                  :to="'/dashboards/' +serviceName +'/edit/' +dashboard.name">Edit</router-link>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="" v-on:click="removeEntry(index)">Delete
                  <!-- Platzhalter-->
                  </a>
                </li>
                <li class="nav-item">
                  <router-link
                  class="nav-link active"
                  :to="'/metrics/' + serviceName + '/' + dashboard.name">Select</router-link> 
                </li>
              </ul>
            </div>
          </div>
          <div class="card-body card__body--height">
            <article class="">
              {{ dashboard.description }}
            </article>
          </div>   
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Dashboards",
  data: function() {
    return {
      services: [],
      imageToggle: true
      
    };
  },
  computed: {
    serviceName: function() {
      return this.$route.params.service;
    },
    service: function() {
      return this.services.find(element => element.name == this.serviceName);
    }
  },
  methods: {
    removeEntry:function(index) {
        this.$delete(this.service.dashboards, index);
    },
  },
  mounted() {
    const baseURI = 'https://api.myjson.com/bins/1cpyp2'
      this.$http.get(baseURI)
      .then((result) => {
        this.services = result.data
      });
  }
};
</script>

<style scoped>
  h6{
    font-size: 14pt;
  }

  /* Nav */
  .nav-link.active{
    color: black !important;
  }
  
  .nav-link.active:hover{
    color: var(--magenta) !important;
  }
  
  .nav .nav-item a{
    color: white;
    font-size: 13pt;
  }
  
  .nav .nav-item a:hover{
    border-bottom: 1px solid var(--white);
    font-weight: bolder;
  }
  
  /* Cards */
  .card__header{
    display: grid;
    grid-template-columns: 75% auto;
  }
  
  .header__buttons{
    height: 100%;
  }
  .card__body--height{
    height: 120px;
  }

  .row .card .card-header {
    background-color: var(--cyan) !important;
  }
  
  @media only screen and (max-width: 1025px){
    .card__header{
      grid-template-columns: 60% auto;
    }
  }
  
  @media only screen and (max-width: 700px){
    .card__header{
      grid-template-columns: 100%;
    }
  }
</style>
