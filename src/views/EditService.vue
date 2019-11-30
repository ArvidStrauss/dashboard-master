<template>
  <section class="mt-4">
    <form>
      <div class="container border--magenta form--width rounded mx-auto form-group pb-4">
        <h3 class="text-center mb-3">{{ serviceName }} bearbeiten</h3>
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
        <button class="btn btn-lg w-50 btn-primary" type="submit">Speichern</button>
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
      services: json,
      serviceID: -1
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
      this.serviceID = this.services.map(function(e) { return e.name; }).indexOf(this.$route.params.service);
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
