<template>
  <header>
    <div class="header">
      <b-navbar toggleable="lg" type="light">
        <!-- <b-navbar toggleable="lg" type="light" class="fixed-top"> -->
        <b-navbar-brand href="/">
          <img src="../assets/header/logo.png" alt="logo" />
        </b-navbar-brand>

        <!-- <b-navbar-toggle target="nav-collapse"
          ><FontAwesomeIcon :icon="faBars" style="color:#ffbd07"
        /></b-navbar-toggle> -->

        <!-- <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="/" class="ml-auto">HOME</b-nav-item>
            <b-nav-item href="/" class="ml-auto">로그인</b-nav-item>
          </b-navbar-nav>
        </b-collapse> -->
      </b-navbar>
    </div>
  </header>
</template>

<script>
import { faBars } from "@fortawesome/free-solid-svg-icons";
//const storage = window.sessionStorage;

export default {
  components: {},
  data() {
    return {
      itemcount: 0,
      faBars,
    };
  },
  beforeCreate() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const address = localStorage.getItem("address");

    if (token && address) {
      if (role == "USER") this.$router.push("/Main");
      else if (role == "STORE") this.$router.push("/StoreMain");
      else {
        localStorage.clear();
      }
    } else {
      localStorage.clear();
    }
  },
};
</script>

<style>
@font-face {
  font-family: "BCcardL";
  src: url("../fonts/BCcardL.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}

@media (max-width: 840px) {
  .navbar-brand {
    width: 75%;
  }
}

@media (min-width: 370) {
  /* header {
    padding-bottom: 50px;
  } */
}

@media (max-width: 840px) {
  .nav-link {
    font-size: 17px;
  }
  .navbar a img {
    max-width: 46%;
  }
}

/*------------------------------ navigation---------------------------------*/

.navbar {
  background-color: #ffffff;
}

.navbar-brand img {
  max-width: 33%;
  height: auto;
}

.header {
  font-family: BCcardL;
}

.nav-link {
  border-bottom: #ffbd07 solid 3px;
  color: #ffbd07;
}

.navbar-nav {
  margin: 0 25px;
  font-size: 25px;
  line-height: 20px;
  font-weight: 600;
  text-transform: uppercase;
  /* padding: 0 0 3px 0; */
  position: relative;
}

li {
  margin: 1px;
  padding: 4px;
  list-style: none;
}
/*---------------------------------------nav 끝--------------------------------------- */
</style>
