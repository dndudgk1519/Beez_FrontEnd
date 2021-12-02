<template>
  <div class="StoreReview_section">
    <div class="StoreReview">
      <a>
        <FontAwesomeIcon :icon="faThumbsUp" style="color:#100055" />
        우리가게 리뷰
      </a>
    </div>
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
        <ul>
          <!-- 여기부터임 -->
          <table class="pay_table">
            <tr>
              <td>{{ unix_timestamp(review.visitTime) }}</td>
              <td rowspan="2" class="pay_row">
                <table>
                  <tr>
                    <td class="pay_td">
                      <FontAwesomeIcon :icon="faWonSign" class="faWon_style" />
                    </td>
                    <td>{{ review.wonTokenCount }}원</td>
                  </tr>
                  <tr>
                    <td class="pay_row">
                      <img src="../assets/main/main03.png" />
                    </td>
                    <td>
                      {{ review.bzTokenCount / $store.state.incentiveRate }}개
                    </td>
                  </tr>
                  <!-- <tr>
                    <td class="pay_row">
                      총
                    </td>
                    <td>{{ review.cost }}원</td>
                  </tr> -->
                </table>
              </td>
            </tr>
            <tr>
              <td>ID : {{ $store.state.storeList[i] }}</td>
            </tr>
          </table>

          <div v-if="review.value1 !== ''">
            <li class="bar"></li>
            <li class="keyword_Review_box">
              <a>{{ review.value1 }} </a>
              <a>{{ review.value2 }}</a>
              <a>{{ review.value3 }}</a>
            </li>
          </div>
        </ul>
      </div>
    </pull-to-refresh>

    <b-button id="StoreReviewList_check" href="/StoreMain">확 인</b-button>

    <b-card class="end_StoreReviewLsit">
      <li>
        <h4>
          키워드 리뷰 안내<FontAwesomeIcon
            :icon="faAngleRight"
            style="float:right"
          />
        </h4>
      </li>
      <li>
        <h4>
          Q & A<FontAwesomeIcon :icon="faAngleRight" style="float:right" />
        </h4>
      </li>
    </b-card>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faWonSign } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "@/views/components/DatePicker.vue";
import DatePicker2 from "@/views/components/DatePicker2.vue";
import PullToRefresh from "v-pull-to-refresh";
export default {
  components: {
    FontAwesomeIcon,
    DatePicker,
    DatePicker2,
    PullToRefresh,
  },
  data() {
    return {
      //아이콘
      faThumbsUp,
      faAngleRight,
      faWonSign,

      toggle: false,
      date1: "",
      date2: "",
      propDate1: "",
    };
  },
  async beforeCreate() {
    const payload = await {
      start: 7,
      end: 0,
      page: 1,
    };
    await this.$store.commit("paymentList", payload);
  },
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
    async reviewList(start, end) {
      const payload = await {
        start: start,
        end: end,
        page: 1,
      };
      this.$store.commit("paymentList", payload);
    },
    unix_timestamp(t) {
      var date = new Date(t * 1000);
      var year = date.getFullYear();
      var month = "0" + (date.getMonth() + 1);
      var day = "0" + date.getDate();
      return year + "/" + month.substr(-2) + "/" + day.substr(-2);
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
      };
      await this.$store.commit("paymentList", payload);
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
  font-family: "GmarketSansTTFMedium";
  src: url("../fonts/GmarketSansTTFMedium.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}
/*----------------------------title-------------------------------*/
.StoreReview_section {
  font-family: BCcardB;
  font-weight: 600;
}

.StoreReview {
  text-align: center;
  color: #100055;
  border-bottom: 1.8px solid #100055;
  margin: 0 10% 4% 10%;
  font-size: 25px;
}
/*----------------------------기간별 버튼-------------------------------*/
.li_btn .btn {
  color: #000000;
  border-color: #fff;
  font-size: 13px;
  font-weight: 900;
  width: 20%;
  margin: 0px 2px 10px 0px;
  font-family: BCcardB;
  background-color: #99c1f860;
}

.li_btn2 .btn {
  background-color: #e0dfdf7d;

  color: #000000;
  border-color: #fff;
  font-size: 13px;
  width: 82%;
  font-weight: 900;
  margin: 0px 2px 10px 0px;
  font-family: BCcardB;
}
.li_btn3 .btn {
  color: #000000;
  border-color: #fff;
  font-size: 13px;
  font-weight: 900;
  width: 20%;
  margin: 0px 2px 10px 0px;
  font-family: BCcardB;
  background-color: #e0dfdf7d;
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
/* DatePicker */
.date {
  --v-calendar-action-color: #0069fd44;
  --v-calendar-active-bg-color: #0069fd44;
  --v-calendar-border-color: #fff;
  --v-calendar-input-font-weight: 800;
  --v-calendar-input-border: none;
  --v-calendar-input-width: 10px;
  --v-calendar-view-button-font-weight: 00;
  --v-calendar-view-button-font-size: 1.1rem;
  --v-calendar-datepicker-icon-color: #0069fd44;
  --v-calendar-view-button-font-size: 1.1rem;
  --v-calendar-day-name-font-weight: 1500;
  --v-calendar-day-font-weight: 500;
  --v-calendar-day-name-color: #323b43;
  --v-calendar-range-radius: 100%;
  --v-calendar-day-width: 80%;
}
/*----------------------------Reviewlsit box-------------------------------*/
.Reviewlist_box {
  padding: 2% 2%;
  border-radius: 20px;
  border: #6e6b79;
  background-color: #99c1f818;
  width: 82%;
  box-shadow: 1px 1px 2px 2px rgb(235, 231, 231);
  margin: 0 0 15px 7.5%;
  font-size: 13px;
}

.keyword_Review_box a {
  font-size: 9pt;
  padding: 1% 2%;
  border-radius: 5px;
  background-color: #fff;
  margin: 0 3px 0 3px;
  box-shadow: 1px 1px 2px 2px rgb(235, 231, 231);
}

.bar {
  border-bottom: 1.5px solid #100055;
  margin-bottom: 2%;
}

/*---------------------------페이지 넘김------------------------------*/
#StoreReviewList_check {
  color: #100055;
  background-color: #e0f5f7;
  display: block;
  width: 25%;
  font-size: 17px;
  font-weight: 900;
  margin: 8% auto 20% auto;
  border-radius: 15px;
}
/*--------------------------공지사항/q&a-------------------------- */
.end_StoreReviewLsit {
  font-family: "GmarketSansTTFMedium";
}

.end_StoreReviewLsit .card-body {
  font-weight: 600;
  padding: 0;
}

.end_StoreReviewLsit li {
  padding: 6% 6% 4% 4%;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}

.end_StoreReviewLsit h4 {
  padding: 0;
}
</style>
