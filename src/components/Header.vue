<template>
  <div class="top-nav-bar">
    <div class="search-box">
      <img
        src="@/assets/img/T_Logo_3c_p.png"
        alt="Plant-Shop-Logo"
        class="logo"
      />
      <router-link class="" :to="'/'">
        <h1 class="text-center">Dashboard ML</h1>
      </router-link>
      <Switcher></Switcher>
    </div>
  </div>
</template>

<script>
import Switcher from '@assets/components/LanguageSwitcher.vue';
export default {
  name: "Header",
  components: {},
  data: {
    Switcher
  }
};
</script>

<style scoped>
.top-nav-bar {
  max-height: 57px;
  top: 0;
  position: sticky;
  background: var(--white);
  box-shadow: 0px 1px 2px 1px var(--darkgrey);
  z-index: 2;
}

.search-box {
  display: inline-flex;
}

.top-nav-bar .search-box img.logo {
  margin: 10px 20px;
  width: 70px;
}

.top-nav-bar .search-box a {
  text-decoration: none;
  cursor: pointer;
  width: 100%;
}

.top-nav-bar .search-box h1 {
  color: var(--darkgrey);
  margin-top: 5px;
  font-size: 38px;
}

@media only screen and (max-width: 1030px) {
  .top-nav-bar .search-box img.logo {
    width: 80px;
  }
  .top-nav-bar {
    height: 118px;
    border-bottom: 0;
  }
  .search-box {
    width: 100%;
  }
  .top-nav-bar .search-box h1 {
    font-size: 32px;
  }
}
</style>
