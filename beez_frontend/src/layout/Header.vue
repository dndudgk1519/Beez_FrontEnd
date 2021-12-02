<template>
  <header>
    <div class="header">
      <b-navbar toggleable="lg" type="light">
        <b-navbar-brand href="/Main">
          <img src="../assets/header/logo.png" alt="logo" />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"
          ><FontAwesomeIcon :icon="faBars" style="color:#fbca47"
        /></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="/Main" class="ml-auto">HOME</b-nav-item>
            <b-nav-item href="/" class="ml-auto" @click="reset"
              >로그아웃</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { WON_CONTRACT_ADDRESS } from "@/contract/ContractAddress.js";
import { PROVIDER } from "@/contract/Provider.js";
import { Contract } from "ethers";
import { WONTOKEN_ABI } from "@/contract/ContractABI.js";
const storage = window.sessionStorage;

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      itemcount: 0,
      faBars,
    };
  },
  methods: {
    reset: () => {
      localStorage.clear();
      storage.clear();
    },
  },
  beforeCreate() {
    //아이디가 user가 아닐경우, address가 없을 경우, address가 20바이트가 아닐 경우
    //ID가 business일 경우, business페이지로 이동
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const address = localStorage.getItem("address");

    if (
      token &&
      token.split(" ")[0] === "Bearer" &&
      address &&
      address.length === 42
    ) {
      if (role == "USER") return true;
      else if (role == "STORE") this.$router.push("/StoreMain");
      else {
        localStorage.clear();
        this.$router.push("/");
      }
    } else {
      localStorage.clear();
      this.$router.push("/");
    }
  },
  mounted() {
    //유저 충전 toast 모든페이지에서 확인 가능
    const address = localStorage.getItem("address");
    const abi = WONTOKEN_ABI;
    const provider = PROVIDER;
    const contract = new Contract(WON_CONTRACT_ADDRESS, abi, provider);
    let filter = contract.filters.chargeResult(address);
    contract.on(filter, () => {
      this.$toaster.success("충전이 완료되었습니다.");
      this.$store.commit("main");
    });
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

.navbar-toggler {
  font-size: 1.7rem;
}

.header {
  font-family: BCcardL;
}

.nav-link {
  border-bottom: #fbca47 solid 3px;
  color: #fbca47;
}

.navbar-nav {
  margin: 0 25px;
  font-size: 25px;
  line-height: 20px;
  font-weight: 600;
  text-transform: uppercase;
  position: relative;
}

li {
  margin: 1px;
  padding: 4px;
  list-style: none;
}
/*---------------------------------------nav 끝--------------------------------------- */
</style>
