<template>
  <section v-if="services" class="mt-4 form--width mx-auto">
    <h3 class="text-center mb-3">edit {{ serviceName }}</h3>
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
        <li class="breadcrumb-item active">
          {{ serviceName }}
        </li>
      </ol>
    </nav>
    <form>
      <div class="container border--magenta rounded form-group pb-4">
        <label>Title</label>
        <input type="text" name="name" class="form-control text-center" v-model="services[serviceID].name" value="serviceName">
        <br>
        <label>Description</label>
        <textarea rows="3" name="desc" v-model="services[serviceID].desc" class="form-control text-center">
          
        </textarea>
        <br>
        <label>Thumbnail</label>
        <div class=" mx-auto form--width">
          <input type="file" class="form-control-file">  
        </div>      
        <button class="btn btn-lg w-50 btn-primary" type="" >Save</button>
      </div>
    </form>
  </section>
</template>

<script>
import json from "@/assets/services.json";
export default {
  name: "EditServices",
  data: function() {
    return {
      services: null,
      serviceID: -1,
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
  mounted(){
    this.services = json;
    this.serviceID = this.services.map(function(e) { return e.name; }).indexOf(this.$route.params.service);
  }
};
</script>

<style scoped>
  hr{
    background-color: var(--magenta);
  }
  
  .img--size{
    width: 200px;
    height: 200px;
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
