<template>
  <section v-if="services" class="mt-4 form--width mx-auto">
    <h3 class="text-center mb-3">add new Service</h3>
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
      </ol>
    </nav>
    <form>
      <div class="container border--magenta rounded form-group pb-4">
        <label>Title</label>
        <input type="text" name="name" class="form-control text-center"  placeholder="write a service name" v-model="services[services.length -1].name">
        <br>
        <label>Description</label>
        <textarea rows="3" name="desc"  class="form-control text-center" placeholder="describe the service" v-model="services[services.length -1].desc">
          
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
  created(){
    this.services = json;
    this.services.push({
        name: "",
        image: "",
        desc: "",
        dashboards: []
      });
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
