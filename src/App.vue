<template>
  <div id="app">
    <Header></Header>
    <div class="router-view">
      <router-view />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style>
@font-face {
  font-family: TeleGroteskNextRegular;
  src: url(./assets/fonts/telegrotesknext-regular.woff);
}

:root {
  /* Colour Variables Telekom Brand Design */
  --magenta: rgb(226, 0, 116);
  --white: rgb(255, 255, 255);
  --black: rgb(75, 75, 75);
  --superlightgrey: rgb(238, 238, 238);
  --lightgrey: #a4a4a4;
  --darkgrey: #6c6c6c;
  --darkblue: rgb(16, 99, 173);
  --lightblue: rgb(83, 186, 242);
  --cyan: #1bada2;
  --green: #bfcb44;
  --yellow: #ffd329;
  --orange: #ff9a1e;
}

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: TeleGroteskNextRegular !important;
  background-color: var(--white);
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.router-view {
  margin-top: 70px;
  min-height: 80vh;
}
.btn.btn-primary {
  background-color: var(--cyan);
  border: none;
  margin: 20px 0;
}
</style>
