<template>
  <div class="ChargeList_section">
    <div class="ChargeList">
      <a>
        <FontAwesomeIcon :icon="faFileInvoiceDollar" style="color:#ffc045" />
        충전 내역
      </a>
    </div>

    <ul>
      <li id="User_information">
        <a>{{ charge_bank }}은행</a>
        <a style="float:right">예금주: {{ charge_name }} </a>
        <div>
          <a>계좌: {{ charge_account }}</a>
        </div>
      </li>
    </ul>
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
              <b-button @click="chargeLists(date1, date2)">
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
        class="ChargeList_box"
        v-for="(charge, i) in this.chargeList"
        :key="i"
      >
        <ul>
          <li>
            <table style="width:105%">
              <tr>
                <th rowspan="2">{{ timestamp(charge.chargeDate) }}</th>
                <th>
                  <table style="width:100%">
                    <tr>
                      <td>충전금액</td>
                      <td>{{ charge.chargeAmount | comma }}</td>
                      <td rowspan="2">
                        <b-button
                          class="tx_btn"
                          @click="ropsten(charge.txHash)"
                        >
                          TX
                        </b-button>
                      </td>
                    </tr>
                    <tr class="th_icon2">
                      <td>인센티브</td>
                      <td>+{{ charge.chargeInc | comma }}</td>
                    </tr>
                  </table>
                </th>
              </tr>
            </table>
          </li>
        </ul>
      </div>
    </pull-to-refresh>
    <b-button id="ChargeList_btn2" href="/Main">확 인</b-button>

    <div>
      <b-card class="end_Chargelist">
        <li>
          <h4>
            충전내역 안내<FontAwesomeIcon
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
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import PullToRefresh from "v-pull-to-refresh";
import DatePicker from "@/views/components/DatePicker.vue";
import DatePicker2 from "@/views/components/DatePicker2.vue";
import axios from "axios";

export default {
  components: {
    FontAwesomeIcon,
    PullToRefresh,
    DatePicker,
    DatePicker2,
  },
  data() {
    return {
      //고객정보
      charge_account: "",
      charge_bank: "",
      charge_name: "",
      //아이콘
      faFileInvoiceDollar,
      faAngleRight,
      faCreditCard,
      faMoneyBillWave,
      chargeList: [],
      // datePicker
      toggle: false,
      date1: "",
      date2: "",
      propDate1: "",
    };
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  beforeCreate() {
    var params = {
      email: localStorage.getItem("email"),
    };
    (async () => {
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "token"
      );
      await axios
        .post("/api/charge/account", params)
        .then((res) => {
          this.charge_name = res.data.data.name;
          this.charge_bank = res.data.data.bankName;
          this.charge_account = res.data.data.accountNumber;
        })
        .catch(() => {});
      this.chargeLists();
    })();
  },
  methods: {
    timestamp(t) {
      var date = new Date(t);
      var year = date.getFullYear();
      var month = "0" + (date.getMonth() + 1);
      var day = "0" + date.getDate();
      var hour = "0" + date.getHours();
      var minute = "0" + date.getMinutes();
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
      );
    },
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
    chargeLists(start, end) {
      var params;

      if (start && end) {
        params = {
          startDate: start,
          endDate: end,
        };
      } else {
        params = {
          startDate: Math.floor(new Date(new Date()) / 1000) - 31536000,
          endDate: Math.floor(new Date(new Date()) / 1000),
        };
      }

      (async () => {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
          "token"
        );
        await axios
          .post("/api/charge/historylist", params)
          .then((res) => {
            this.chargeList = res.data.data;
          })
          .catch(() => {});
      })();
    },
    searchDate() {
      alert("ww");
      // this.chargeList(this.date1, this.date2);
    },
    //페이지 이동
    ropsten(tx) {
      window.open("https://ropsten.etherscan.io/tx/" + tx);
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
.ChargeList_section {
  font-family: BCcardB;
  font-weight: 600;
}

.ChargeList {
  text-align: center;
  color: #ffc045;
  font-weight: 900;
  /* border-bottom: 1.5px solid #ffc045; */
  margin: 0 10% 0 10%;
  font-size: 25px;
}
/*---------------------------출금가능한 금액-------------------------------*/
#User_information {
  font-size: 14px;
  font-weight: 900;
  color: #0e3c44;
  padding: 2% 4%;
  /* box-shadow: 1px 1px 2px 2px rgb(235, 231, 231); */
  width: 82%;
  margin: 1% auto 3% auto;
  border-radius: 10px;
  border: 2px solid #ffc045;
}
.tx_btn {
  background-color: #fff;
  border: 3px solid #fcc964;
  color: #000000;
  font-size: 13px;
  font-weight: 900;
  font-family: BCcardB;
}
.tx_btn:hover {
  background-color: #ffc045;
  border-color: #fff;
}
/*----------------------------Reviewlsit box-------------------------------*/
.ChargeList_box {
  padding: 1% 2%;
  border-radius: 10px;
  border: #6e6b79;
  width: 82%;
  box-shadow: 1px 1px 2px 2px rgb(235, 231, 231);
  margin: 0 0 15px 9%;
  color: #724c25;
  font-size: 10pt;
  background-color: #fcf5e7;
}
.th_icon {
  color: #fbca47;
}
.th_icon2 {
  color: rgb(1, 65, 160);
}

/*---------------------------페이지 넘김------------------------------*/

#ChargeList_btn2 {
  background-color: #b0aeb8;
  color: white;
  display: block;
  padding: 1.5%;
  width: 25%;
  font-size: 16px;
  font-weight: 900;
  margin: 8% auto 20% auto;
  border-radius: 15px;
}

/*--------------------------공지사항/q&a-------------------------- */
.end_Chargelist {
  font-family: "GmarketSansTTFMedium";
}

.end_Chargelist .card-body {
  font-weight: 600;
  padding: 0;
}

.end_Chargelist li {
  padding: 6% 6% 4% 4%;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}

.end_Chargelist h4 {
  padding: 0;
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
}
.li_btn2 .btn {
  color: #000000;
  background-color: #e0dfdf7d;
  border-color: #fff;
  font-size: 13px;
  font-weight: 900;
  width: 82%;
  margin: 0px 2px 10px 0px;
  font-family: BCcardB;
  margin-bottom: 5%;
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
.v-calendar .input-field input {
  padding-left: 30px;
  padding-right: 0px;
  margin-bottom: 5%;
}
</style>
