<template>
  <div class="UserReview_section">
    <div class="UserReview text-center">
      <a id="User_Review">
        <FontAwesomeIcon :icon="faList" style="color:#ffde02s" />
        MY 리뷰
      </a>
    </div>
    <span class="span-blank">빈</span>

    <!-- ------------------------------------------------------ -->
    <!--리뷰 리스트-->
    <div class="li_btn text-center">
      <b-button @click="reviewList(7, 0)">
        1주일
      </b-button>
      <b-button @click="reviewList(30, 0)">
        1개월
      </b-button>
      <b-button @click="reviewList(90, 0)">
        3개월
      </b-button>
      <b-button @click="reviewList(180, 0)">
        6개월
      </b-button>
    </div>
    <div class="li_btn2 text-center">
      <b-button @click="toggle = !toggle">
        기간별 검색
      </b-button>
    </div>
    <div v-show="toggle">
      <table class="tb_center">
        <tr>
          <td class="td_width">
            <DatePicker @date1="printDate1" />
          </td>
          <td class="td_width">
            <DatePicker2 @date2="printDate2" :propsDate1="propDate1" />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <div class="li_btn3 text-center">
              <b-button @click="searchDate()">
                검색
              </b-button>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <pull-to-refresh
        className="forTest"
        :refreshing="false"
        :indicator="{ deactivate: 'pull down' }"
      >
        <div
          class="Reviewlist_box"
          v-for="(review, i) in this.$store.state.reviewContents"
          :key="i"
        >
          <div class="User_history">
            <ul>
              <table class="pay_table">
                <tr>
                  <td>{{ unix_timestamp(review.visitTime) }}</td>
                  <td rowspan="2" class="pay_row">
                    <table>
                      <tr>
                        <td class="pay_td">
                          <FontAwesomeIcon
                            :icon="faWonSign"
                            class="faWon_style"
                          />
                        </td>
                        <td>{{ review.wonTokenCount }}원</td>
                      </tr>
                      <tr>
                        <td class="pay_row">
                          <img src="../assets/main/main03.png" />
                        </td>
                        <td>
                          {{
                            review.bzTokenCount / $store.state.incentiveRate
                          }}개
                        </td>
                      </tr>
                      <tr>
                        <td class="pay_row">
                          <!-- <FontAwesomeIcon
                          :icon="faCreditCard"
                          class="faWon_style"
                        /> -->
                          총
                        </td>
                        <td>{{ review.cost }}원</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>{{ $store.state.storeList[i] }}</td>
                </tr>
              </table>

              <li class="bar"></li>

              <div class="text-center">
                <!-- 7일 계산 -->
                <li
                  class="keyword_Review_box"
                  v-if="timestamp - review.visitTime >= 604800"
                >
                  <!-- <b-button id="Review_btn3" disabled
                >키워드 리뷰 (BEEZ토큰지급)</b-button
              > -->

                  <a>리뷰 작성 기간이 지났습니다. </a>
                </li>
                <!-- 7일체크 -->
                <li v-else-if="review.value1 == ''">
                  <a class="keyword_Review_box">
                    <b-button
                      id="Review_btn2"
                      @click="KeywordModal(review.visitTime)"
                      >키워드 리뷰 (BEEZ토큰지급)</b-button
                    >
                  </a>
                </li>

                <li class="keyword_Review_box" v-else>
                  <a>{{ review.value1 }} </a>
                  <a>{{ review.value2 }}</a>
                  <a>{{ review.value3 }}</a>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <b-button id="ChargeList_btn2" href="/Main">확 인</b-button>
      </pull-to-refresh>
      <div class="review_modal">
        <b-modal
          id="Review_mo dal"
          ref="review_modal"
          hide-footer
          title="키워드 리뷰"
        >
          <div class="Keyword_box">
            <!--첫 번째 -->
            <div class="keybox">
              <div class="keybox_title">
                분위기
              </div>
              <b-form-checkbox-group
                v-model="checked1"
                @change="clickFunc"
                buttons
                :options="keyword1"
                class="Keyword_column"
              ></b-form-checkbox-group>
            </div>

            <!--두 번째 -->
            <div class="keybox">
              <div class="keybox_title">
                음식
              </div>
              <b-form-checkbox-group
                v-model="checked2"
                @change="clickFunc"
                buttons
                :options="keyword2"
                class="Keyword_column"
              ></b-form-checkbox-group>
            </div>

            <!--세 번째 -->
            <div class="keybox">
              <div class="keybox_title">
                교통/편의시설
              </div>

              <b-form-checkbox-group
                v-model="checked3"
                @change="clickFunc"
                buttons
                :options="keyword3"
                class="Keyword_column"
              ></b-form-checkbox-group>
            </div>
          </div>

          <div>
            <b-button class="keyword_check" inline-block @click="writeReview()"
              >확인</b-button
            >

            <b-button class="keyword_check" inline-block @click="hideModal2"
              >취소</b-button
            >
          </div>
        </b-modal>
        <!-- 결제 진행 모달 -->
        <b-modal
          centered
          id="p_modal"
          ref="ing_modal"
          hide-footer
          hide-header
          no-close-on-backdrop
          no-close-on-esc
        >
          <scale-loader
            loading="loading"
            color="#ffbd07b3"
            size="10px"
          ></scale-loader>
          <div class="modal_text">
            <h4>
              리뷰가 작성중 입니다. 잠시만 기다려 주세요
            </h4>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faWonSign } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { PAYMENT_ABI } from "@/contract/ContractABI.js";
import { CONTRACT_ADDRESS } from "@/contract/ContractAddress.js";
import { PROVIDER } from "@/contract/Provider.js";
import DatePicker from "@/views/components/DatePicker.vue";
import DatePicker2 from "@/views/components/DatePicker2.vue";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";
import PullToRefresh from "v-pull-to-refresh";
import { Contract, ethers } from "ethers";
import axios from "axios";

export default {
  name: "paymentList",

  components: {
    FontAwesomeIcon,
    DatePicker,
    DatePicker2,
    ScaleLoader,
    PullToRefresh,
  },

  data() {
    return {
      timestamp: Math.floor(new Date().getTime() / 1000),
      //아이콘
      faList,
      faWonSign,
      faCreditCard,
      //모달 체크박스
      checked1: [],
      checked2: [],
      checked3: [],
      toggle: false,
      date1: "",
      date2: "",
      keyword1: [
        { text: "분위기가 좋아요.", value: "0" },
        { text: "대화하기 좋아요.", value: "1" },
        { text: "뷰가 좋아요.", value: "2" },
        { text: "가족이랑 가기 좋아요.", value: "3" },
        { text: "데이트하기 좋아요.", value: "4" },
        { text: "혼밥하기 좋아요.", value: "5" },
      ],
      keyword2: [
        { text: "특별한 메뉴가 있어요.", value: "0" },
        { text: "가성비가 좋아요.", value: "1" },
        { text: "함께 먹기 좋아요.", value: "2" },
        { text: "맛이 기깔나요!", value: "3" },
        { text: "재방문 의사가 있어요.", value: "4" },
        { text: "포장하기 좋아요.", value: "5" },
      ],
      keyword3: [
        { text: "대중교통이 편해요.", value: "0" },
        { text: "차가 없으면 힘들어요.", value: "1" },
        { text: "주차하기 편해요.", value: "2" },
        { text: "주차 공간이 협소해요.", value: "3" },
        { text: "매장이 깨끗해요.", value: "4" },
        { text: "화장실이 깨끗해요.", value: "5" },
      ],
      userPrivateKey: "",
      userAddress: "",
      checkedValues: [],
      json: "",
      propDate1: "",
    };
  },
  async mounted() {
    const payload = await {
      start: 7,
      end: 0,
      page: 2,
    };
    await this.$store.commit("paymentList", payload);

    //솔리디티 이벤트 확인
    const address = localStorage.getItem("address");
    const abi = PAYMENT_ABI;
    const provider = PROVIDER;
    const contract = new Contract(CONTRACT_ADDRESS, abi, provider);
    let filter = contract.filters.reviewResult(address);
    contract.on(filter, () => {
      this.$refs["ing_modal"].hide();
      this.$store.commit("paymentList", payload);
    });
  },
  props: ["removeValue"],
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
    //키워드 리뷰
    clickFunc(event) {
      if (this.checked1.length > 1) {
        this.checked1.reverse().pop();
      }
      if (this.checked2.length > 1) {
        this.checked2.reverse().pop();
      }
      if (this.checked3.length > 1) {
        this.checked3.reverse().pop();
      }

      for (let i = 0; i < this.checkedValues.length; i++) {
        if (this.checkedValues[i] !== event.target.value) {
          // console.log(this.checkedValues[i]);
          this.checkedValues.splice(i, 1);
        }
      }
    },
    //기간별 리뷰 검색 함수
    async reviewList(start, end) {
      const payload = await {
        start: start,
        end: end,
        page: 2,
      };
      this.$store.commit("paymentList", payload);
    },
    //리뷰 작성 트랜젝션
    async writeReview() {
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "token"
      );

      await axios
        .post("/api/users/priv")
        .then((res) => {
          // console.log(res);
          this.userPrivateKey = "0x" + res.data.data.privateKey;
          this.userAddress = res.data.data.walletAddress;
        })
        .catch(() => {
          // console.log(err);
        });

      const CONTRACT_ABI = PAYMENT_ABI;
      const PRIVATE_KEY = this.userPrivateKey;

      /****************************Solidity 매개변수****************************/
      const visitor = this.userAddress; //DB
      const visitTime = this.visitTime;
      const value1 = this.keyword1[this.checked1[0]].text;
      const value2 = this.keyword2[this.checked2[0]].text;
      const value3 = this.keyword3[this.checked3[0]].text;
      const provider = PROVIDER;

      const signer = await new ethers.Wallet(PRIVATE_KEY, provider);

      const contract = await new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const sendTransaction = contract.writeReview(
        visitor,
        visitTime,
        value1,
        value2,
        value3
      );
      this.$refs["review_modal"].hide();
      this.$refs["ing_modal"].show();
      await sendTransaction
        .then(() => {
          // console.log(res);
        })
        .catch(() => {
          // console.log(err);
        });
      this.checked1.reverse().pop();
      this.checked2.reverse().pop();
      this.checked3.reverse().pop();
    },
    //unix -> 현재시간
    unix_timestamp(t) {
      var date = new Date(t * 1000);
      var year = date.getFullYear();
      var month = "0" + (date.getMonth() + 1);
      var day = "0" + date.getDate();
      var hour = "0" + date.getHours();
      var minute = "0" + date.getMinutes();
      //var second = "0" + date.getSeconds();
      return (
        year +
        "/" +
        month.substr(-2) +
        "/" +
        day.substr(-2) +
        " " +
        hour.substr(-2) +
        ":" +
        minute.substr(-2)
        // +
        // ":" +
        // second.substr(-2)
      );
    },
    //모달 취소 버튼
    KeywordModal(time) {
      this.$refs["review_modal"].show();
      this.visitTime = time;
    },
    hideModal2() {
      this.$refs["review_modal"].hide();
      this.checked1.reverse().pop();
      this.checked2.reverse().pop();
      this.checked3.reverse().pop();
    },
    //datePicker에서 선택한 날짜(Unix시간)
    printDate1(date) {
      this.date1 = date;
      var propDate = new Date(date * 1000);
      var year = propDate.getFullYear();
      var month = propDate.getMonth() + 1;
      var day = propDate.getDate();
      this.propDate1 = month + "." + day + "." + year;
    },
    //datePicker2에서 선택한 날짜(Unix시간)
    printDate2(date) {
      this.date2 = date;
    },
    //검색결과
    async searchDate() {
      // console.log(this.date1 + "/" + this.date2);
      // if (!this.date1) alert("시작 날짜를 입력해주세여");
      // else if (!this.date2) alert("마지막 날짜를 입력해주세여");
      // else if (this.date1 > this.date2) alert("다시입력해주세요");
      // else if (this.date2 > Math.floor(new Date() / 1000) + 86400)
      //   alert("오늘날짜 이후는 입력이 불가합니다");
      // else {
      const payload = await {
        start: this.date1,
        end: this.date2,
        page: 2,
      };
      await this.$store.commit("paymentList", payload);
    },
  },

  computed: {},
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
/*----------------------------title-------------------------------*/
.UserReview_section {
  font-family: BCcardB;
  font-weight: 600;
  min-height: calc(30vh);
}

.UserReview {
  font-family: BCcardB;
  text-align: center;
  color: #f8b704;
  font-weight: 900;
  border-bottom: 1.5px solid #f8b704;
  margin: 0 10% 0 10%;
}
#User_Review {
  font-size: 25px;
}
/*----------------------------기간별 버튼-------------------------------*/
.li_btn .btn {
  background-color: #e0dfc57d;
  color: #000000;
  border-color: #fff;
  font-size: 13px;
  font-weight: 900;
  width: 20%;
  margin: 0px 2px 10px 0px;
  font-family: BCcardB;
}
.li_btn2 .btn {
  background-color: #e0dfdf7d;
  color: #000000;
  border-color: #fff;
  font-size: 13px;
  font-weight: 900;
  width: 82%;
  margin: 0px 2px 10px 0px;
  font-family: BCcardB;
}
.li_btn3 .btn {
  background-color: #e0dfdf7d;
}
/*----------------------------Reviewlsit box-------------------------------*/
.User_history {
  font-size: 13px;
}
.Reviewlist_box {
  padding: 2% 2%;
  border-radius: 20px;
  background-color: #fdfded;
  width: 82%;
  box-shadow: 1px 1px 2px 2px rgb(235, 231, 231);
  margin: 0 auto;
  margin-bottom: 15px;
  color: #76512c;
  font-size: 8pt;
  min-height: 100px;
}

.keyword_Review_box {
  margin: auto;
  display: block;
}
.keyword_Review_box a {
  padding: 1% 2%;
  border-radius: 20px;
  background-color: #fff;
  margin: 0 auto;
}
.bar {
  border-bottom: 2px solid #ffde02;
  margin-bottom: 4%;
}

#Review_btn2 {
  color: #76512c;
  background-color: #ffde02;
  margin: auto;
  padding: 1% 16%;
  display: block;
  font-weight: 700;
}
#Review_btn3 {
  color: #76512c;
  background-color: #e0dfd8;
  margin: auto;
  padding: 1% 16%;
  display: block;
  font-weight: 700;
}
.pay_table {
  width: 100%;
  padding: 10px;
}
.pay_table img {
  width: 13%;
}
.pay_row {
  width: 65%;
  text-align: right;
}
.pay_td {
  width: 70%;
  text-align: right;
}
.faWon_style {
  color: #fbca47;
}

/*-------------------------- 키워드 리뷰 모달창-------------------------- */
#p_modal {
  font-family: "GmarketSansTTFMedium";
  background-color: #4b4a4846;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33); */
}

.modal-header {
  margin: 3%;
}

.keybox {
  font-family: "BCcardB";
  margin-bottom: 20px;
  background-color: #fdfded;
  padding: 3% 1%;
  border-radius: 20px;
  border-bottom: 2px solid #c2bfaa;
}

.keybox_title {
  border-bottom: 2px solid #ffde02;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 17px;
  width: 89%;
  font-weight: 600;
  font-size: 15px;
  color: #76512c;
}

.review_modal .btn {
  border-radius: 5px;
  margin-bottom: 3%;
  font-weight: 600;
  color: #696663;
  background-color: white;
  border: 1px solid #c5c5c5;
  width: 130px;
}
.btn-secondary:not(:disabled):not(.disabled).active {
  background-color: #c5c5c5;
  border-color: #c5c5c5;
}

.keyword_check {
  background-color: #feffae;
  font-weight: 600;
  margin-left: 18%;
  padding: 2% 7%;
  font-family: BCcardB;
  margin-bottom: 8%;
  color: #76512c;
}

.Keyword_column {
  display: grid;
  grid: ". .";
  justify-content: space-evenly;
  font-size: 12px;
}

.Keyword_column .btn {
  margin-bottom: 3%;
  font-weight: 600;
  color: #5e5c4a;
  background-color: white;
  border: 1px solid #ffc107;
}

.btn-group > .btn:not(:last-child):not(.dropdown-toggle) {
  border-radius: 10px;
}

.btn-group > .btn:not(:first-child) {
  border-radius: 10px;
}

#Review_modal .modal-title {
  font-family: "BCcardB";
  font-weight: 600;
  color: #76512c;
}
.modal_text h4 {
  color: red;
  font-size: 12px;
  font-weight: 600;
  padding-top: 10px;
  text-align: center;
}
.modal_text {
  background-color: #fbcb4721;
  border-radius: 15px;
}
/*---------------------------페이지 넘김------------------------------*/

#ChargeList_btn2 {
  background-color: #e0dfdf7d;
  /* color: rgb(90, 88, 88); */
  display: block;
  padding: 1.5%;
  width: 25%;
  font-size: 16px;
  font-weight: 900;
  margin: 8% auto 20% auto;
  border-radius: 15px;
  color: #636c74;
}
/* DatePicker */
.date {
  --v-calendar-action-color: #ffde02;
  --v-calendar-active-bg-color: #ffde02;
  --v-calendar-border-color: #fff;
  --v-calendar-input-font-weight: 800;
  --v-calendar-input-border: none;
  --v-calendar-input-width: 10px;
  --v-calendar-view-button-font-weight: 00;
  --v-calendar-view-button-font-size: 1.1rem;
  --v-calendar-datepicker-icon-color: #ffde02;
  --v-calendar-view-button-font-size: 1.1rem;
  --v-calendar-day-name-font-weight: 1500;
  --v-calendar-day-font-weight: 500;
  --v-calendar-day-name-color: #323b43;
  --v-calendar-range-radius: 100%;
  --v-calendar-day-width: 60%;
}
.tb_center {
  margin: 0 auto;
  width: 60%;
}
.v-calendar .input-field input {
  padding-left: 30px;
  padding-right: 0px;
  margin-bottom: 5%;
}
</style>
