<template>
  <div id="app">
    <div class="StoreQR_section">
      <div class="StoreQR text-center">
        <a id="Store_QR">
          <FontAwesomeIcon :icon="faStore" style="color:#100055" />
          QR 코드</a
        >
      </div>
      <span class="span-blank">빈</span>

      <div>
        <div class="StoreQR_box">
          <div id="Storename_infor">
            <a>{{ Store_name }}</a>
          </div>
          <div></div>
          <qriously id="store_qr" :value="value" :size="230" />
        </div>
      </div>
      <b-button id="StoreQR_btn2" href="/StoreMain">확 인</b-button>
    </div>
    <b-card id="end_StoreQR">
      <li>
        <h4>
          QR코드 발급안내<FontAwesomeIcon
            :icon="faAngleRight"
            style="float:right"
          />
        </h4>
      </li>
      <li>
        <h4>
          결제/환불 방법<FontAwesomeIcon
            :icon="faAngleRight"
            style="float:right"
          />
        </h4>
      </li>
    </b-card>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      //가게이름
      Store_name: localStorage.getItem("nickName"),
      value: localStorage.getItem("address"),
      //아이콘
      faAngleRight,
      faStore,
    };
  },
};
</script>
<style>
/*-----------------폰트, @media---------------------------- */
@font-face {
  font-family: "BCcardB";
  src: url("../fonts/BCcardL.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "GmarketSansTTFMedium";
  src: url("../fonts/GmarketSansTTFMedium.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}
/*--------------------------card--------------------------- */
#QR {
  font-family: BCcardB;
  background-color: #fff;
  text-align: center;
}

#QR img {
  height: 19rem;
}
/*----------------------------title-------------------------------*/
.StoreQR_section {
  font-family: BCcardB;
  font-weight: 600;
}

.StoreQR {
  color: #100055;
  border-bottom: 1.8px solid #100055;
  width: 80%;
  margin: 0 auto;
}
#Store_QR {
  font-size: 18pt;
}

.Reviewlist {
  font-size: 10pt;
  text-decoration: underline #100055;
}
/*----------------------------QR box-------------------------------*/
.StoreQR_box {
  padding: 6% 4%;
  color: #100055;
  border-radius: 20px;
  background-color: #e0eef7;
  width: 70%;
  margin: 0 auto;
  font-size: 12pt;
  text-align: center;
  margin-bottom: 5%;

  /* box-shadow: 1px 1px 2px 2px rgb(235, 231, 231); */
  /* border: solid 3px #100055; */
}
#Storename_infor {
  border-bottom: 2px solid #100055;
  text-align: center;
  margin-bottom: 10%;
}
#QRbox {
  border-radius: 20px;
  width: 225px;
  margin: 0 auto;
  margin-bottom: 14%;
}
.bar_qr {
  border-bottom: 2px solid #100055;
  margin-bottom: 4%;
}

/*----------------------------QR generator-------------------------------*/
#store_qr {
  text-align: center;
}
#StoreQR_btn2 {
  margin: 0 auto;
  background-color: #bfdefa;
  color: #100055;
  display: block;
  padding: 2%;
  width: 20%;
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 15%;
  border-radius: 15px;
}
/*--------------------------공지사항/q&a-------------------------- */
#end_StoreQR {
  font-family: "GmarketSansTTFMedium";
}
#end_StoreQR .card-body {
  font-weight: 600;
  padding: 0;
}
#end_StoreQR li {
  padding-left: 6%;
  padding-right: 6%;
  padding-top: 4%;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
