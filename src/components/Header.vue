<template>
  <div class="top-nav-bar">
    <div class="search-box">
      <img src="@/assets/img/T_Logo_3c_p.png" alt="Plant-Shop-Logo" class="logo" />
      <router-link class="" :to="'/'">
        <h1 class="text-center">Dashboard ML</h1>
      </router-link> 
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
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
  margin: 10px 50px;
  width: 80px;
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

.menu-bar {
  width: 40%;
  height: 57px;
  float: right;
}

.menu-bar ul {
  display: inline-flex;
  float: right;
}

.menu-bar ul li {
  border-left: 1px solid var(--white);
  list-style-type: none;
  padding: 15px 35px;
  text-align: center;
  background-color: var(--cyan);
  cursor: pointer;
}

.menu-bar ul li:hover {
  background-color: var(--darkgrey);
}

.menu-bar ul li a {
  font: bold 16px;
  text-decoration: none;
  color: var(--white);
}

.menu-bar ul li a .fa-home {
  margin-right: 5px;
}

.menu-bar ul li a .fa-user-plus {
  margin-right: 5px;
}

.menu-bar ul li a .fa-user {
  margin-right: 5px;
}

@media only screen and (max-width: 1030px) {
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
  .menu-bar {
    width: 100%;
  }
  .menu-bar ul {
    margin: 10px 0;
    width: 100%;
  }
  .menu-bar ul li {
    font-size: 18px;
    height: 70px;
    width: 100%;
  }
}
</style>