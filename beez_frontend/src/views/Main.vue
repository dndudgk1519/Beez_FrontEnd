<template>
  <div id="main">
    <ul id="user_explain">
      <li>
        <h1>{{ nickName }}</h1>
        <h5>님,</h5>
        <h5>환영합니다.</h5>
      </li>
      <img src="../assets/main/main04.png" />
    </ul>

    <b-card id="card_main">
      <b-card class="to_ac">
        <b-container>
          <b-row>
            <img src="../assets/main/main01.png" />
            <b-col>
              <h3>
                사용 가능금액
                <FontAwesomeIcon :icon="faAngleRight" id="ac_icon" />
              </h3>
              <h1>{{ this.$store.state.wonBalace | comma }} 원</h1>
            </b-col>
          </b-row>
        </b-container>
      </b-card>

      <div>
        <ul class="detail_ac">
          <li>
            <a>이달의 충전금액</a>
            <a style="float:right"
              >{{ this.$store.state.wonOfMon | comma }} 원</a
            >
          </li>
          <li>
            <a>이달의 인센티브</a>
            <a style="float:right"
              >{{ this.$store.state.incOfMon | comma }} 원</a
            >
          </li>
          <div class="text-center">
            <b-button href="Charge">
              <FontAwesomeIcon :icon="faWonSign" style="color:#fbca47" />
              충전
            </b-button>
            <b-button href="Payment">
              <FontAwesomeIcon :icon="faQrcode" style="color:#fbca47" />
              결제
            </b-button>
          </div>
        </ul>
      </div>
    </b-card>

    <b-card id="card_main2">
      <b-card class="title_bz">
        <h2>
          <img src="../assets/main/main03.png" />
          MY BEEZ
        </h2>
      </b-card>

      <div>
        <ul class="detail_bz">
          <li>
            <a>이달의 BEEZ</a>
            <a class="bz_amount">
              {{ this.$store.state.bzOfMon | comma }}
            </a>
            <img src="../assets/main/main03.png" />
          </li>
          <li>
            <a>사용가능 BEEZ</a>
            <a class="bz_amount">
              {{ this.$store.state.bzBalace | comma }}
            </a>
            <img src="../assets/main/main03.png" />
          </li>
        </ul>
      </div>
    </b-card>
    <div class="text-center">
      <FontAwesomeIcon
        :icon="faCaretDown"
        style="color:#755328bf"
        vertical-align="middle"
        size="5x"
      />
    </div>
    <div class="li_btn text-center">
      <b-button href="/ChargeList">
        충전 내역
      </b-button>
      <b-button href="PaymentList">
        결제/리뷰 내역
      </b-button>
    </div>
    <div id="explain_btn">
      <b-card class="storeList1" @click="StoreList">
        <li>
          <a>
            BEEZ 지역화폐
          </a>
          <a id="highlight">
            가맹점 찾기
          </a>
        </li>
        <img src="../assets/start_main/icon01.png" />
      </b-card>

      <b-card class="storeList2" @click="apply">
        <li>
          <a>
            국민지원금
          </a>
          <a id="highlight">
            온라인신청하기
          </a>
        </li>
        <img src="../assets/start_main/icon02.png" />
      </b-card>
    </div>

    <div>
      <b-card class="end_start">
        <li>
          <h4>
            공지사항<FontAwesomeIcon :icon="faAngleRight" style="float:right" />
          </h4>
        </li>
        <li>
          <h4>
            Q & A<FontAwesomeIcon :icon="faAngleRight" style="float:right" />
          </h4>
        </li>
      </b-card>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faWonSign } from "@fortawesome/free-solid-svg-icons";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      nickName: localStorage.getItem("nickName"),
      msg: "This is demo net work",
      //아이콘
      faWonSign,
      faQrcode,
      faCaretDown,
      faAngleRight,
    };
  },
  methods: {
    StoreList() {
      this.$router.push("/StoreList");
    },
    apply() {
      window.open("https://www.mois.go.kr/2021emgnc/main.html");
    },
  },
  beforeCreate() {
    this.$store.commit("main");
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
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
  font-family: "Cafe24Ssurround";
  src: url("../fonts/Cafe24Ssurround.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "Cafe24SsurroundAir";
  src: url("../fonts/Cafe24SsurroundAir.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "GmarketSansTTFMedium";
  src: url("../fonts/GmarketSansTTFMedium.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}
/*--------------------------유저 설명-------------------------- */
#user_explain {
  border-radius: 20px;
  padding: 0;
  border: 2px solid #76512c;
  margin: 5%;
  display: inline-block;
}

#user_explain li {
  margin-top: 7%;
  margin-left: 7%;
  display: inline-block;
}

#user_explain img {
  float: right;
  width: 50%;
  margin-top: -28%;
  margin-right: 4%;
}

@media (min-width: 500px) {
  #user_explain img {
    margin-top: 0;
  }
}

#user_explain h1 {
  font-family: "Cafe24Ssurround";
  display: inline-block;
  margin-left: 5%;
  color: #5a4605fd;
  border-bottom: 2px solid #20160c;
  padding: 0;
}

#user_explain h5 {
  font-family: "GmarketSansTTFMedium";
  display: inline-block;
  margin-left: 4%;
  font-size: 15px;
  margin-top: 15px;
}

/*--------------------------card_ 원화-------------------------- */
#card_main {
  font-family: BCcardB;
  background-color: rgba(252, 203, 111, 0.299);
  border-radius: 30px;
  margin: 4% 4% 0 4%;
}

.card-body {
  padding: 0;
}

.to_ac {
  background-color: #ffbd07b3;
  border-start-start-radius: 30px;
  border-start-end-radius: 30px;
  padding: 3%;
}

.to_ac .col {
  align-self: center;
  text-align: end;
}

.to_ac h1 {
  font-size: 25px;
  font-weight: 900;
  color: #76512c;
  padding-bottom: 0;
}

.to_ac h3 {
  font-weight: 900;
  color: #76512c;
  padding-bottom: 12px;
}

.to_ac img {
  width: 30%;
  margin-right: 10%;
}

#ac_icon {
  margin-left: 10px;
}

.detail_ac .btn {
  color: #fff;
  background-color: #755328bf;
  margin-left: 14px;
  margin-right: 14px;
  font-size: 17px;
  width: 40%;
}

.detail_ac {
  font-weight: 700;
  border-radius: 17px;
  padding: 15px 20px;
}

.detail_ac li {
  padding-bottom: 9px;
  font-size: 15px;
  color: #23180d;
}

/*-------------------------- 비즈-------------------------- */
#card_main2 {
  font-family: BCcardB;
  background-color: #ffe6253d;
  border-radius: 30px;
  margin: 4% 4% 0 4%;
}

.detail_bz {
  color: #23180d;
  font-weight: 700;
  border-radius: 17px;
  padding: 15px 20px;
}

.detail_bz img {
  width: 8%;
  float: right;
}

.detail_bz li {
  padding-bottom: 9px;
  font-size: 16px;
  display: block;
}

.bz_amount {
  float: right;
  margin-left: 5px;
}

.title_bz h2 {
  font-size: 23px;
  font-weight: 900;
  color: #76512c;
  display: inline-block;
  padding: 0;
}

.title_bz {
  background-color: #ffe625d2;
  border-start-start-radius: 30px;
  border-start-end-radius: 30px;
  padding: 4%;
}

.title_bz img {
  width: 10%;
  margin-right: 5px;
}

/*-------------------------- 내역/리뷰 버튼-------------------------- */
.li_btn .btn {
  background-color: #fdef2e7d;
  font-size: 17px;
  font-weight: 900;
  width: 40%;
  margin: 14px 14px;
  padding: 2%;
  font-family: BCcardB;
  margin-bottom: 2px;
}
#map_btn {
  margin-bottom: 10%;
}
/*--------------------------공지사항/q&a-------------------------- */
.end_start {
  font-family: "GmarketSansTTFMedium";
}

.end_start .card-body {
  font-weight: 600;
  padding: 0;
}

.end_start li {
  padding: 6% 6% 4% 4%;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}

.end_start h4 {
  padding: 0;
}

#explain_btn {
  padding-left: 6.5%;
  padding-right: 6.5%;
  color: #fff;
  font-family: "Cafe24SsurroundAir";
  font-size: 17px;
  margin-top: 10%;
  margin-bottom: 6%;
}

#explain_btn img {
  width: 12%;
  float: right;
}

#explain_btn li {
  display: inline-block;
}

.storeList1 .card-body:hover,
.storeList1 .card-body:focus {
  box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
  transform: translateY(-0.25em);
}
.storeList1 .card-body {
  margin-bottom: 3%;
  padding: 0%;
  padding-top: 2%;
  padding-left: 5%;
  padding-right: 5%;
  background-color: #6d36f8;
  border-radius: 8px;
}

.storeList2 .card-body:hover,
.storeList2 .card-body:focus {
  box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
  transform: translateY(-0.25em);
}
.storeList2 .card-body {
  padding: 0%;
  padding-top: 2%;
  padding-left: 5%;
  padding-right: 5%;
  background-color: #f3a600;
  border-radius: 8px;
}

#highlight {
  font-family: "Cafe24Ssurround";
  margin-left: 6px;
  font-size: 19px;
}
</style>
