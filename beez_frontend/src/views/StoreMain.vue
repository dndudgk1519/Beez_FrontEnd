<template>
  <div>
    <ul id="user_explain2">
      <li>
        <h1>{{ nickName }}</h1>
        <h5>님,</h5>
        <h5>환영합니다.</h5>
      </li>
      <img src="../assets/main/main05.png" />
    </ul>

    <b-card id="card_main_ceo">
      <b-card class="to_ac_ceo">
        <b-container>
          <b-row>
            <img src="../assets/main/main06.png" />
            <b-col>
              <h3>
                {{ month }}월 총 매출
                <FontAwesomeIcon :icon="faAngleRight" id="ac_icon2" />
              </h3>
              <h1>
                {{
                  (parseInt(this.$store.state.cashSales) +
                    parseInt(this.$store.state.tokenSales))
                    | comma
                }} 원
              </h1>
            </b-col>
          </b-row>
        </b-container>
      </b-card>
      <ul class="detail_ac_ceo">
        <li>
          <a>현금 매출</a>
          <a style="float:right"
            >{{ this.$store.state.cashSales | comma }} 원</a
          >
        </li>
        <li>
          <a>토큰 매출</a>
          <a style="float:right"
            >{{ this.$store.state.tokenSales | comma }} 원</a
          >
        </li>
        <div class="text-center"></div>
      </ul>
    </b-card>

    <b-card id="card_main_ceo2">
      <b-card class="title_won">
        <h2>
          <img src="../assets/main/main08.png" />
          현금 매출
          <b-button href="StoreWithdrawal" style="float:right">
            출금
          </b-button>
        </h2>
      </b-card>
      <ul class="detail_won">
        <li>
          <a>이달의 출금 내역</a>
          <a style="float:right"
            >{{ this.$store.state.exchangeOfMon | comma }} 원</a
          >
        </li>
        <li>
          <a>출금가능 현금</a>
          <a style="float:right">{{ this.$store.state.myCash | comma }} 원</a>
        </li>
        <li class="text-center">
          <b-button id="WithdrawalBtn" href="StoreWithdrawalList">
            <FontAwesomeIcon :icon="faFileInvoiceDollar" id="wi_icon" />
            출금 내역</b-button
          >
        </li>
      </ul>
    </b-card>

    <b-card id="card_main_ceo3">
      <b-card class="title_bz_ceo">
        <h2>
          <img src="../assets/main/main03.png" />
          MY BEEZ
          <b-button href="StoreExchangeToken" style="float:right">
            환전
          </b-button>
        </h2>
      </b-card>

      <div>
        <ul class="detail_bz_ceo">
          <li>
            <a>이달의 BEEZ</a>
            <a class="bz_amount">
              {{ this.$store.state.tokenSalesMon | comma }}
            </a>
            <img src="../assets/main/main03.png" />
          </li>
          <li>
            <a>환전가능 BEEZ</a>
            <a class="bz_amount">
              {{ this.$store.state.myBz | comma }}
            </a>
            <img src="../assets/main/main03.png" />
          </li>
        </ul>
      </div>
    </b-card>

    <div class="text-center">
      <FontAwesomeIcon
        :icon="faCaretDown"
        style="color:#03349692"
        vertical-align="middle"
        size="5x"
      />
    </div>

    <div class="li_btn_ceo text-center">
      <b-button href="/StoreReviewList">
        결제 / 리뷰 내역
      </b-button>
    </div>
    <div>
      <b-card class="end_StoreMain">
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
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      nickName: localStorage.getItem("nickName"),
      //아이콘
      faQrcode,
      faCaretDown,
      faAngleRight,
      faFileInvoiceDollar,

      month: 0,
    };
  },
  beforeCreate() {
    this.$store.commit("storeMain");
  },
  created() {
    this.init();
  },
  methods: {
    //()달 매출금액
    init(param) {
      if (param) {
        this.month = param[1];
      } else {
        const date = new Date();
        this.month = date.getMonth() + 1;
      }
    },
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
  font-family: "GmarketSansTTFMedium";
  src: url("../fonts/GmarketSansTTFMedium.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}

/*--------------------------유저 설명-------------------------- */
#user_explain2 {
  border-radius: 20px;
  padding: 0;
  border: 2px solid #76512c;
  margin: 5%;
  display: inline-block;
}

#user_explain2 li {
  margin-top: 7%;
  margin-left: 7%;
  display: inline-block;
}

#user_explain2 img {
  float: right;
  width: 50%;
  margin: -28% 4% 0% 0%;
}

@media (min-width: 500px) {
  #user_explain2 img {
    margin-top: 0;
  }
}

#user_explain2 h1 {
  font-family: "Cafe24Ssurround";
  display: inline-block;
  margin-left: 5%;
  color: #5a4605fd;
  border-bottom: 2px solid #20160c;
  padding: 0;
}

#user_explain2 h5 {
  font-size: 15px;
  font-family: "GmarketSansTTFMedium";
  display: inline-block;
  margin: 15px 0% 0% 4%;
}

/*--------------------------card_ 원화1-------------------------- */
#card_main_ceo {
  font-family: BCcardB;
  background-color: #1158ae23;
  border-radius: 30px;
  margin: 4% 4% 0% 4%;
}

.card-body {
  padding: 0;
}

.to_ac_ceo {
  background-color: #2261aed2;
  border-start-start-radius: 30px;
  border-start-end-radius: 30px;
  padding: 3%;
}

.to_ac_ceo .col {
  align-self: center;
  text-align: end;
}

.to_ac_ceo h1 {
  font-size: 25px;
  font-weight: 900;
  color: #fff;
  padding-bottom: 0;
}

.to_ac_ceo h3 {
  font-weight: 900;
  color: #fff;
  padding-bottom: 12px;
}

.to_ac_ceo img {
  width: 30%;
  margin-right: 10%;
}

#ac_icon2 {
  margin-left: 10px;
}

.detail_ac_ceo {
  font-weight: 700;
  border-radius: 17px;
  padding: 10px 18px;
}

.detail_ac_ceo li {
  padding-bottom: 9px;
  font-size: 15px;
  color: #23180d;
}

/*--------------------------현금매출-------------------------- */
#card_main_ceo2 {
  font-family: BCcardB;
  background-color: #001fb818;
  border-radius: 30px;
  margin: 6% 4% 0% 4%;
}

.title_won h2 {
  font-size: 23px;
  font-weight: 900;
  color: #fff;
  display: inline-block;
  padding: 0;
}

.title_won {
  background-color: #001fb8a7;
  border-start-start-radius: 30px;
  border-start-end-radius: 30px;
  padding: 4% 6% 3% 6%;
}

.title_won .btn {
  color: #fff;
  font-weight: 900;
  font-size: 18px;
  border: 2px solid;
  padding: 2px 10px 2px 10px;
}

.detail_won {
  color: #23180d;
  font-weight: 700;
  border-radius: 17px;
  padding: 10px 18px;
}

.detail_won li {
  padding-bottom: 9px;
  font-size: 15px;
  display: block;
}

#WithdrawalBtn {
  color: #fff;
  font-size: 16px;
  background-color: #001fb8a7;
  font-weight: 600;
  width: 80%;
}

#wi_icon {
  color: #fff;
  margin-right: 5px;
}

.title_won img {
  width: 15%;
  margin-right: 5px;
}

/*-------------------------- 비즈-------------------------- */
#card_main_ceo3 {
  font-family: BCcardB;
  background-color: #001fb818;
  border-radius: 30px;
  margin: 6% 4% 0% 4%;
}

.detail_bz_ceo {
  color: #23180d;
  font-weight: 700;
  border-radius: 17px;
  padding: 10px 18px;
}

.detail_bz_ceo img {
  width: 8%;
  float: right;
}

.detail_bz_ceo li {
  padding-bottom: 9px;
  font-size: 15px;
  display: block;
}

.title_bz_ceo h2 {
  font-size: 23px;
  font-weight: 900;
  color: #fff;
  display: inline-block;
  padding: 0;
}

.title_bz_ceo {
  background-color: #001fb87d;
  border-start-start-radius: 30px;
  border-start-end-radius: 30px;
  padding: 4% 6% 3% 6%;
}

.title_bz_ceo img {
  width: 12%;
  margin-right: 5px;
}

.bz_amount {
  float: right;
  margin-left: 5px;
}

.title_bz_ceo .btn {
  color: #fff;
  font-weight: 900;
  font-size: 18px;
  border: 2px solid;
  padding: 2px 10px 2px 10px;
}

/*-------------------------- 내역/리뷰 버튼-------------------------- */
.li_btn_ceo {
  font-family: BCcardB;
  padding-bottom: 30px;
}

.li_btn_ceo .btn {
  color: #ffffff;
  background-color: #2261aed2;
  font-size: 23px;
  font-weight: 900;
  width: 55%;
  margin: 0 25px 15% 25px;
}
/*--------------------------공지사항/q&a-------------------------- */
.end_StoreMain {
  font-family: "GmarketSansTTFMedium";
}

.end_StoreMain .card-body {
  font-weight: 600;
  padding: 0;
}

.end_StoreMain li {
  padding: 6% 6% 4% 4%;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}

.end_StoreMain h4 {
  padding: 0;
}
</style>
