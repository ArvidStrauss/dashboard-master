<template>
  <section
    v-if="dashboards"
    class="mt-4 form--width mx-auto border--magenta px-2"
  >
    <div>
      <router-link
        class="pull-right breadcrumb__link mr-2"
        :to="'/' + $i18n.locale + '/dashboards/' + serviceName"
        ><i class="fa fa-times" style="font-size: 25pt"></i>
      </router-link>
      <br />
    </div>
    <br />
    <div>
      <h2 class="dashboards mb-3">
        {{ $t("newDashboard.add") }} {{ serviceName }}
      </h2>
    </div>
    <nav class="">
      <ol class="breadcrumb bg-white">
        <li
          class="breadcrumb-item"
          @mouseover="imageToggle = false"
          @mouseleave="imageToggle = true"
        >
          <router-link class="breadcrumb__link" :to="'/'">
            <img
              src="@/assets/img/home.png"
              class="breadcrumb__img"
              v-if="imageToggle == true"
            />
            <img
              src="@/assets/img/home--magenta.png"
              class="breadcrumb__img"
              v-if="imageToggle == false"
            />
          </router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link
            class=" breadcrumb__link"
            :to="'/' + $i18n.locale + '/dashboards/' + serviceName"
          >
            {{ serviceName }}</router-link
          >
        </li>
      </ol>
    </nav>
    <form>
      <div class="container form-group pb-4">
        <p class="text-left">{{ $t("newDashboard.title") }}</p>
        <input
          type="text"
          required
          class="form-control dashboards"
          name=""
          placeholder="Title"
          v-model="dashboards[dashboards.length - 1].name"
          v-bind:style="
            validateTitle()
              ? 'border-color:  #ced4da'
              : 'border-color: var(--red)'
          "
        />
        <br />
        <p class="text-left">{{ $t("newDashboard.desc") }}</p>
        <textarea
          rows="3"
          required
          class="form-control dashboards"
          placeholder="Description"
          v-model="dashboards[dashboards.length - 1].description"
          v-bind:style="
            validateDesc()
              ? 'border-color:  #ced4da'
              : 'border-color: var(--red)'
          "
        ></textarea>
        <br />
        <router-link
          v-if="validateForm() == true"
          class="saveButton saveButton--cyan mx-auto w-50"
          :to="'/' + $i18n.locale + '/dashboards/' + serviceName"
          @click.native="saveJson"
        >
          {{ $t("newDashboard.save") }}
        </router-link>
        <div v-else>
          <p>{{ $t("newDashboard.please") }}</p>
          <span class="saveButton saveButton--red w-50 mx-auto">Save</span>
        </div>
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
    }
  },
  methods: {
    saveJson: function() {
      //this.$http.post("http://localhost:8080/SaveJson", this.services);
    },
    //FORM VALIDATIONS
    validateTitle: function() {
      let validated = true;
      let title = this.dashboards[this.dashboards.length - 1].name;

      if (title == null || title == "") {
        validated = false;
      }
      return validated;
    },
    validateDesc: function() {
      let validated = true;
      let desc = this.dashboards[this.dashboards.length - 1].description;

      if (desc == null || desc == "") {
        validated = false;
      }

      return validated;
    },
    validateForm: function() {
      let validated = true;
      let title = this.dashboards[this.dashboards.length - 1].name;
      let desc = this.dashboards[this.dashboards.length - 1].description;

      if (title == null || title == "") {
        validated = false;
      }
      if (desc == null || desc == "") {
        validated = false;
      }

      return validated;
    }
  },
  mounted() {
    this.dashboards = json;

    /*this.$http.get('http://localhost:8080/LoadJson')
    .then(response => (this.dashboards=response.data))
    .catch(error => console.log(error))
    */

    this.dashboards.push({
      name: "",
      description: "",
      service: this.serviceName,
      metrics: [
        {
          name: ""
        }
      ]
    });
  }
};
</script>

<style scoped>
input[type="radio"] {
  display: none;
}

hr {
  background-color: var(--magenta);
}

.img--size {
  width: 200px;
  height: 200px;
}

.img--size:hover {
  cursor: pointer;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0), 0 0 5px var(--magenta);
}

.paragraphLink {
  text-decoration: none;
  color: black;
  font-size: 1.1em;
}

.paragraphLink:hover {
  color: var(--magenta);
}

/*Table*/
@media only screen and (max-width: 1200px) {
  .form--width {
    width: 90%;
  }
}

/*Phone*/
@media only screen and (max-width: 500px) {
  .form--width {
    width: 90%;
  }
}
</style>
