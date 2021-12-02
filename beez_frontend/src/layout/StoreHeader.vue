<template>
  <header>
    <div class="header">
      <b-navbar toggleable="lg" type="light">
        <b-navbar-brand href="/StoreMain">
          <img src="../assets/header/logo.png" alt="logo" />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse">
          <a href="/StoreQR" id="storeQR">
            <FontAwesomeIcon :icon="faQrcode" />
          </a>
          <a id="fabars">
            <FontAwesomeIcon :icon="faBars" />
          </a>
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="/StoreMain" class="ml-auto">HOME</b-nav-item>
            <b-nav-item href="/StoreQR" class="ml-auto color"
              >QR코드</b-nav-item
            >
            <b-nav-item href="/" class="ml-auto color" @click="reset"
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
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
const storage = window.sessionStorage;
import {
  CONTRACT_ADDRESS,
  WON_CONTRACT_ADDRESS,
} from "@/contract/ContractAddress.js";
import { PROVIDER } from "@/contract/Provider.js";
import { Contract } from "ethers";
import { PAYMENT_ABI, WONTOKEN_ABI } from "@/contract/ContractABI.js";
export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      itemcount: 0,
      faBars,
      faQrcode,
    };
  },
  beforeCreate() {
    //아이디가 user가 아닐경우, address가 없을 경우, address가 20바이트가 아닐 경우
    //ID가 STORE일 경우, STORE페이지로 이동
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const address = localStorage.getItem("address");

    if (token && address) {
      if (role == "STORE") return true;
      else if (role == "USER") this.$router.push("/Main");
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
    const payload = {
      start: 7,
      end: 0,
      page: 1,
    };
    const address = localStorage.getItem("address");
    const abi = PAYMENT_ABI;
    const provider = PROVIDER;
    const contract = new Contract(CONTRACT_ADDRESS, abi, provider);
    let filter = contract.filters.paymentResult(null, address);
    contract.on(filter, () => {
      // console.log(to + "" + recipient + "" + wonAmount + "" + bzAmount);
      this.$toaster.success("결제가 완료되었습니다.");
      this.$store.commit("paymentList", payload);
      this.$store.commit("storeMain");
    });
    //환전
    const contract2 = new Contract(CONTRACT_ADDRESS, abi, provider);
    let filter2 = contract2.filters.exchangeResult(address);
    contract2.on(filter2, () => {
      this.$toaster.success("환전이 완료되었습니다.");
      this.$store.commit("storeMain");
    });
    //출금
    const won_abi = WONTOKEN_ABI;
    const contract3 = new Contract(WON_CONTRACT_ADDRESS, won_abi, provider);
    let filter3 = contract3.filters.withDrawResult(address);
    contract3.on(filter3, () => {
      this.$toaster.success("출금이 완료되었습니다.");
      this.$store.commit("storeMain");
    });
  },
  methods: {
    reset: () => {
      localStorage.clear();
      storage.clear();
    },
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
#storeQR {
  color: #1158aece;
}

#fabars {
  color: #1158aece;
  margin-left: 30px;
}

.navbar {
  background-color: #ffffff;
}

.navbar-brand {
  display: contents;
}

.navbar-toggler {
  font-size: 1.7rem;
}

.navbar-brand img {
  max-width: 33%;
  height: auto;
}

.header {
  font-family: BCcardL;
}

.nav-link {
  border-bottom: #1158aece solid 3px;
  color: #1158aece;
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
