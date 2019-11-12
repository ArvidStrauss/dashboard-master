<template>
  <div class="top-nav-bar">
    <div class="search-box">
      <img src="@/assets/img/T_Logo_3c_p.png" alt="Plant-Shop-Logo" class="logo" />

      <h1>Dashboard ML</h1>
      <input type="text" class="form-control" />
      <span class="input-group-text">
        <i class="fa fa-search"></i>
      </span>
    </div>
    <div class="menu-bar">
      <ul>
        <li>
          <router-link to="/">
            <i class="fa fa-home"></i>Services
          </router-link>
        </li>
        <li>
          <router-link to="/dashboards">
            <i class="fa fa-user-plus"></i>Dashboards
          </router-link>
        </li>
        <li>
          <router-link to="/metrics">
            <i class="fa fa-user"></i>Metrics
          </router-link>
        </li>
      </ul>
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
  height: 57px;
  top: 0;
  position: sticky;
  background: var(--white);
  box-shadow: 0px 1px 2px 1px var(--darkgrey);
  z-index: 2;
}

.search-box {
  display: inline-flex;
  width: 60%;
}

.top-nav-bar .search-box img.logo {
  margin: 10px 50px;
  width: 40px;
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

.top-nav-bar .search-box input.form-control {
  margin-top: 9px;
  margin-left: 30px;
  border: 1px solid var(--superlightgrey);
  border-radius: 20px 0 0 20px !important;
  background: var(--superlightgrey);
  box-shadow: none !important;
}

.top-nav-bar .search-box input.form-control:focus {
  border-color: var(--superlightgrey);
  background-color: var(--superlightgrey);
}

.top-nav-bar .search-box span.input-group-text {
  background: var(--superlightgrey) !important;
  border: 1px solid var(--superlightgrey) !important;
  margin: 8.5px 10px 3px 0 !important;
  border-radius: 0 20px 20px 0 !important;
  cursor: pointer;
  height: 38px;
}

.top-nav-bar .search-box span.input-group-text i.fa-search {
  color: var(--lightgrey);
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