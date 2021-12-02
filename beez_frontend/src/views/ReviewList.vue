<template>
  <div class="UserReview_section">
    <div class="UserReview text-center">
      <a id="User_Review">
        <FontAwesomeIcon :icon="faList" style="color:#ffde02s" />
        {{ this.$route.params.storeNickName }}
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
            <div class="li_btn text-center">
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
        ><div v-for="(review, i) in this.$store.state.reviewContents" :key="i">
          <div class="Reviewlist_box" v-if="review.value1 !== ''">
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
                <li class="keyword_Review_box">
                  <a>{{ review.value1 }} </a>
                  <a>{{ review.value2 }}</a>
                  <a>{{ review.value3 }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </pull-to-refresh>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faWonSign } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "@/views/components/DatePicker.vue";
import DatePicker2 from "@/views/components/DatePicker2.vue";
import PullToRefresh from "v-pull-to-refresh";

export default {
  name: "paymentList",

  components: {
    FontAwesomeIcon,
    DatePicker,
    DatePicker2,
    PullToRefresh,
  },
  props: {
    storeAddress: {
      type: String,
      default: "0",
    },
    storeNickName: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      timestamp: Math.floor(new Date().getTime() / 1000),
      //아이콘
      faList,
      faWonSign,
      faCreditCard,

      toggle: false,
      date1: "",
      date2: "",

      userPrivateKey: "",
      userAddress: "",
      checkedValues: [],
      json: "",
      propDate1: "",
    };
  },
  async beforeCreate() {
    const payload = await {
      start: 7,
      end: 0,
      page: 1,
      // storeName: this.$route.params.storeNickName,
      address: this.$route.params.storeAddress, //여기에 영하님 어드레스를 주면됨 라우터로 넘긴값. 소상공인 address
    };

    await this.$store.commit("paymentList", payload);
  },

  methods: {
    //기간별 리뷰 검색 함수
    async reviewList(start, end) {
      const payload = await {
        start: start,
        end: end,
        page: 1,
        // storeName: this.$route.params.storeNickName,
        address: this.$route.params.storeAddress, //여기에 영하님 어드레스를 주면됨 라우터로 넘긴값. 소상공인 address
      };
      this.$store.commit("paymentList", payload);
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
      const payload = await {
        start: this.date1,
        end: this.date2,
        page: 1,
        // storeName: this.$route.params.storeNickName,
        address: this.$route.params.storeAddress, //여기에 영하님 어드레스를 주면됨 라우터로 넘긴값. 소상공인 address
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
  font-size: 24px;
}
/*----------------------------기간별 버튼-------------------------------*/
.li_btn .btn {
  background-color: #fdef2e7d;
  color: #000000;
  border-color: #fff;
  font-size: 13px;
  font-weight: 900;
  width: 20%;
  margin: 0px 2px 10px 0px;
  font-family: BCcardB;
}
.li_btn2 .btn {
  background-color: #fdef2e7d;
  color: #000000;
  border-color: #fff;
  font-size: 13px;
  font-weight: 900;
  width: 80%;
  margin: 0px 2px 10px 0px;
  font-family: BCcardB;
}
/*----------------------------Reviewlsit box-------------------------------*/
.User_history {
  font-size: 13px;
}
.Reviewlist_box {
  padding: 2% 2%;
  border-radius: 20px;
  background-color: #fdfded;
  width: 86%;
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
  color: #696663;
  background-color: white;
  border: 1px solid #76512c;
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
  --v-calendar-day-width: 80%;
}
.tb_center {
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}
</style>
