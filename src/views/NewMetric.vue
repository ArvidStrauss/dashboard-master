<template>
  <section v-if="dashboards" class="mt-4 form--width mx-auto border--magenta px-2">
    <div>
      <router-link
        class="pull-right breadcrumb__link mr-2"
        :to="`/${$i18n.locale}/metrics/` + serviceName + '/' + dashboardName"
      >
        <i class="fa fa-times" style="font-size: 25pt"></i>
      </router-link>
      <br />
    </div>
    <br />
    <div>
      <h2 class="dashboards mb-3">add new Dashboard to {{ serviceName }}</h2>
    </div>
    <nav class>
      <ol class="breadcrumb bg-white">
        <li
          class="breadcrumb-item"
          @mouseover="imageToggle = false"
          @mouseleave="imageToggle = true"
        >
          <router-link class="breadcrumb__link" :to="'/'">
            <img src="@/assets/img/home.png" class="breadcrumb__img" v-if="imageToggle == true" />
            <img
              src="@/assets/img/home--magenta.png"
              class="breadcrumb__img"
              v-if="imageToggle == false"
            />
          </router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link class="breadcrumb__link" :to="'/dashboards/' + serviceName">{{ serviceName }}</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link
            class="breadcrumb__link"
            :to="'/metrics/' + serviceName + '/' + dashboardName"
          >{{ dashboardName }}</router-link>
        </li>
      </ol>
    </nav>
    <form>
      <div class="container form-group pb-4">
        <p class="text-left">Title</p>
        <input
          type="text"
          required
          name
          placeholder="Title"
          class="form-control dashboards"
          v-model="dashboard.metrics[dashboard.metrics.length - 1].title"
          v-bind:style="
            validateTitle()
              ? 'border-color:  #ced4da'
              : 'border-color: var(--red)'
          "
        />
        <br />
        <p class="text-left">Description</p>
        <textarea
          rows="3"
          required
          class="form-control dashboards"
          placeholder="Description"
          v-model="dashboard.metrics[dashboard.metrics.length - 1].description"
          v-bind:style="
            validateDesc()
              ? 'border-color:  #ced4da'
              : 'border-color: var(--red)'
          "
        ></textarea>
        <hr />
        <br />
        <router-link
          v-if="validateForm() == true"
          class="card routerLink breadcrumb__link pt-2 pl-4"
          :to="'/metrics/' + serviceName + '/' + dashboardName + '/selectMoNew'"
        >
          <p class="text-left">choose Model</p>
        </router-link>
        <div v-else>
          <p class="card pt-2 pl-4 pb-2 text-left">Fill in form to choose Model</p>
        </div>
        <br />
        <router-link
          v-if="validateForm() == true"
          class="card routerLink breadcrumb__link pt-2 pl-4"
          :to="'/metrics/' + serviceName + '/' + dashboardName + '/selectMeNew'"
        >
          <p class="text-left">choose Metric</p>
        </router-link>
        <div v-else>
          <p class="card pt-2 pl-4 pb-2 text-left">Fill in form to choose Metric</p>
        </div>
        <br />
        <hr />
        <p class="text-left">Prediction Time</p>
        <select
          class="form-control"
          v-model="dashboard.metrics[dashboard.metrics.length - 1].predtime"
          requiered
        >
          <option selected>5 min</option>
        </select>
        <br />
        <router-link
          v-if="validateForm() == true"
          class="saveButton saveButton--cyan mx-auto w-50"
          :to="'/metrics/' + serviceName + '/' + dashboardName"
          @click.native="saveJson"
        >Save</router-link>
        <div v-else>
          <p>Please fill in the form</p>
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
    },
    dashboard: function() {
      return this.dashboards.find(
        element => element.name == this.dashboardName
      );
    }
  },
  methods: {
    saveJson: function() {
      //this.$http.post("http://localhost:8000/SaveJson", this.services);
    },

    //FORM VALIDATIONS
    validateTitle: function() {
      let validated = true;
      let title = this.dashboard.metrics[this.dashboard.metrics.length - 1]
        .title;

      if (title == null || title == "") {
        validated = false;
      }
      return validated;
    },
    validateDesc: function() {
      let validated = true;
      let desc = this.dashboard.metrics[this.dashboard.metrics.length - 1]
        .description;

      if (desc == null || desc == "") {
        validated = false;
      }

      return validated;
    },
    validateForm: function() {
      let validated = true;
      let title = this.dashboard.metrics[this.dashboard.metrics.length - 1]
        .title;
      let desc = this.dashboard.metrics[this.dashboard.metrics.length - 1]
        .description;

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
