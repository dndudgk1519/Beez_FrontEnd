<template>
  <div class="StoreWithdrawalList_section">
    <div class="StoreWithdrawalList">
      <a>
        <FontAwesomeIcon :icon="faFileInvoiceDollar" style="color:#100055" />
        출금 내역
      </a>
    </div>
    <ul class="Store_TotalSales">
      <li>
        <a>{{ bank_na }}은행</a>
        <a style="float:right">예금주: {{ store_na }} </a>
        <div>
          <a>계좌 번호: {{ account_no }} </a>
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
              <b-button @click="withdrawLists(date1, date2)">
                검색
              </b-button>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <div
        class="WithdrawalList_box"
        v-for="(withdraw, i) in this.withdrawList"
        :key="i"
      >
        <ul>
          <!-- <div>{{ withdraw.txHash }}</div> -->
          <li>
            <table style="width:100%">
              <tr>
                <td>{{ timestamp(withdraw.withdrawDate) }}</td>
                <td>{{ withdraw.amount | comma }}원</td>
                <td>
                  <b-button
                    class="tx_btn"
                    style="float:right"
                    @click="ropsten(withdraw.txHash)"
                  >
                    TX
                  </b-button>
                </td>
              </tr>
            </table>
          </li>
        </ul>
      </div>
    </div>

    <b-button id="StoreWithdrawalList_check" href="/StoreMain">확 인</b-button>

    <b-card id="end_StoreWithdrawalList">
      <li>
        <h4>
          현금 출금 안내<FontAwesomeIcon
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
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "@/views/components/DatePicker.vue";
import DatePicker2 from "@/views/components/DatePicker2.vue";
import axios from "axios";

export default {
  components: {
    FontAwesomeIcon,
    DatePicker,
    DatePicker2,
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  data() {
    return {
      withdrawList: [],
      //고객정보
      bank_na: "",
      account_no: "",
      store_na: "",
      //아이콘
      faFileInvoiceDollar,
      faAngleRight,
      // datePicker
      toggle: false,
      date1: "",
      date2: "",
      propDate1: "",
    };
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
        .post("/api/withdrawal/account", params)
        .then((res) => {
          this.bank_na = res.data.data.bankName;
          this.account_no = res.data.data.accountNumber;
          this.store_na = res.data.data.name;
        })
        .catch(() => {});
      this.withdrawLists();
    })();
  },
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
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
    withdrawLists(start, end) {
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
          .post("/api/withdrawal/historylist", params)
          .then((res) => {
            this.withdrawList = res.data.data;
          })
          .catch(() => {});
      })();
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
.StoreWithdrawalList_section {
  font-family: BCcardB;
  font-weight: 600;
}

.StoreWithdrawalList {
  text-align: center;
  color: #100055;
  /* border-bottom: 1.8px solid #100055; */
  margin: 0 10% 0% 10%;
  font-size: 25px;
}

/*---------------------------계좌 정보-------------------------------*/
.Store_TotalSales {
  font-size: 14px;
  color: #100055;
  border: 3px solid #a198c9;
  padding: 2% 3%;
  /* background-color: #e0f1f7b2; */
  width: 82%;
  margin: 3% auto 5% 8%;
  border-radius: 10px;
}
/*----------------------------기간별 버튼-------------------------------*/
.li_btn .btn {
  /* background-color: #b9d3f844; */
  color: #000000;
  border-color: #fff;
  font-size: 13px;
  font-weight: 900;
  width: 20%;
  margin: 0px 2px 10px 0px;
  font-family: BCcardB;
}
.li_btn2 .btn {
  /* background-color: #b9d3f844; */
  color: #000000;
  border-color: #fff;
  font-size: 13px;
  font-weight: 900;
  width: 82%;
  margin: 0px 2px 10px 0px;
  font-family: BCcardB;
  margin-bottom: 4%;
}
.tb_center {
  margin: 0 auto;
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
.v-calendar .input-field input {
  padding-left: 30px;
  padding-right: 0px;
  margin-bottom: 5%;
}
/*----------------------------Reviewlsit box-------------------------------*/
.WithdrawalList_box {
  padding: 0% 2%;
  border-radius: 20px;
  border: #6e6b79;
  background-color: #99c1f849;
  width: 82%;
  box-shadow: 1px 1px 2px 2px rgb(235, 231, 231);
  margin: 0 0 15px 7.5%;
  font-size: 10pt;
}

.bar {
  border-bottom: 1.5px solid #100055;
  margin-bottom: 4%;
}

/*---------------------------페이지 넘김------------------------------*/
#StoreWithdrawalList_check {
  background-color: #efefef;
  display: block;
  width: 25%;
  font-size: 17px;
  font-weight: 900;
  margin: 8% auto 20% auto;
  color: rgb(88, 86, 86);
  border-radius: 15px;
}
/*--------------------------공지사항/q&a-------------------------- */
#end_StoreWithdrawalList {
  font-family: "GmarketSansTTFMedium";
}

#end_StoreWithdrawalList .card-body {
  font-weight: 600;
  padding: 0;
}

#end_StoreWithdrawalList li {
  padding: 6% 6% 4% 4%;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}

#end_StoreWithdrawalList h4 {
  padding: 0;
}
/* tx버튼 */
.tx_btn {
  background-color: white;
  border: 3px solid #6e78a575;
  color: #000000;
  font-size: 13px;
  font-weight: 900;
  font-family: BCcardB;
}
.tx_btn:hover {
  background-color: rgba(0, 0, 0, 0.125);
  border-color: #fff;
}
</style>
