<template>
  <div id="charge">
    <b-card id="card_charge">
      <img src="../assets/Card3.png" alt="card" />
    </b-card>

    <div class="charge_section">
      <ul class="bank_ac">
        <li>
          <a>{{ bank_na }} 은행</a>
          <a id="align_right">{{ account_no }}</a>
        </li>
      </ul>

      <ul class="charge_am">
        <li class="poss_am">
          <a>충전가능금액</a>
          <a class="posit_rel left"
            >{{
              parseInt(
                this.$store.state.maxWonCharge - this.$store.state.wonOfMon
              ) | comma
            }}
            원</a
          >
        </li>
        <li class="poss_am">
          <a>혜택가능금액</a>
          <a class="posit_rel left">
            {{
              parseInt(
                this.$store.state.maxIncentive - this.$store.state.incOfMon * 10
              ) | comma
            }}
            원</a
          >
        </li>

        <b-form @submit="onSubmit">
          <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
          <b-input-group class="form_charge">
            <b-form-input
              v-model="form.number"
              @keyup="chargeValid"
              type="text"
              :state="ch_state"
            ></b-form-input>

            <b-input-group-append>
              <b-button id="re_btn" type="reset">
                <FontAwesomeIcon :icon="faRedo" id="btn_color" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
          <a id="font-red">{{ error }}</a>
        </b-form>
      </ul>
      <div class="text-center">
        <b-button
          id="ch_btn"
          @click="$bvModal.show('ch_modal')"
          :disabled="error.length > 9"
        >
          충전
        </b-button>
        <b-button id="ch_btn" href="/Main">취소</b-button>
      </div>
    </div>

    <b-modal centered id="ch_modal" hide-footer title="충전 정보">
      <div class="d-block">
        <a class="posit_rel margin138">충전 금액</a>
        <a class="posit_rel" style="float:right"
          >{{ form.number | comma }} 원</a
        >
      </div>
      <!-- v-if="인센티브 금액이 5만원 초과하였을 경우 보이지 않게, 현재 4.5만원 인센티브 받았는데 다음 충전시 인센티브를
        5만원 초과 했을시 5천원만 인센티브 더주기" -->
      <div class="d-block">
        <a class="posit_rel margin138">인센티브</a>
        <a class="posit_rel" style="float:right"
          >{{ incentive_amount | comma }} 원</a
        >
      </div>
      <div class="d-block" id="total_charge">
        <a class="posit_rel margin90">총 충전금액</a>
        <a class="posit_rel2" style="float:right"
          >{{ charge_amount | comma }} 원</a
        >
      </div>
      <div class="note">
        <h4>
          <FontAwesomeIcon :icon="faExclamation" id="btn_color" />
          충전 유의사항
        </h4>
        <h5>- 확인 버튼 클릭 이후 충전한 금액이 바로 적용되지 않습니다.</h5>
        <h5>- 충전한 금액은 충전 완료 알림창이 뜬 이후에 적용됩니다.</h5>
        <h5>- 확인 버튼 클릭 이후 충전 알림창까지 약 1분정도 소요됩니다.</h5>
      </div>
      <b-button class="mt-3" @click="chargePost">확인</b-button>
      <b-button class="mt-3" @click="$bvModal.hide('ch_modal')">취소</b-button>
    </b-modal>

    <div>
      <b-card class="end_Charge">
        <li>
          <h4>
            충전 안내<FontAwesomeIcon
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
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "charge",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      bank_na: "",
      account_no: "",
      error: "",
      incentive_amount: "",
      charge_amount: "",
      //아이콘
      faRedo,
      faAngleRight,
      faExclamation,

      form: {
        number: "",
      },
      // show: true,
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
        .post("/api/charge/account", params)
        .then((res) => {
          this.bank_na = res.data.data.bankName;
          this.account_no = res.data.data.accountNumber;
        })
        .catch(() => {});
    })();
    this.$store.commit("main");
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  methods: {
    //충전 입력 폼
    onSubmit(event) {
      event.preventDefault();
      // alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      this.form.number = "";
      // this.show = false;
      // this.$nextTick(() => {
      //   this.show = true;
      // });
    },
    //충전 버튼 후 모달창
    showModal() {
      this.$refs["charge_modal"].show();
    },
    hideModal() {
      this.$refs["charge_modal"].hide();
    },

    //값 전달 axios
    async chargePost() {
      var params = {
        email: localStorage.getItem("email"),
        address: localStorage.getItem("address"),
        charge: this.form.number,
      };
      (async () => {
        //이런식으로 header 토큰 삽입 => security 활성화.
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
          "token"
        );

        //axios전달(/api로 시작 => vue.config.js에서 그렇게 설정, 무조건 spring에서 dto를 이용하여 값 전달 받아야함)
        await axios
          .post("/api/charge/amount", params)
          .then(() => {
            //toast로 충전 정보 전달
            // this.$toaster.success("충전이 완료되었습니다.");
            // this.$store.commit("main");
          })
          .catch(() => {
            // this.$toaster.error("충전에 실패하였습니다. 다시 시도해 주세요.");
          });
      })();
      //페이지 이동
      this.$router.push("/Main");
    },
    //----------------입력폼에 숫자만----------------------
    chargeValid() {
      this.form.number = this.form.number.replace(/[^0-9]/g, "");
    },
  },
  computed: {
    ch_state() {
      const text = this;
      if (this.form.number.length == 0)
        text.error = "충전할 금액을 입력해주세요.";
      else if (this.form.number < 10000)
        text.error = "10,000원 이상 충전 가능합니다.";
      else if (this.form.number % 1000 !== 0)
        text.error = "1,000원 단위로 충전 가능합니다";
      else if (
        this.form.number >
        this.$store.state.maxWonCharge - this.$store.state.wonOfMon
      )
        text.error = "충전가능금액을 초과하였습니다.";
      else {
        text.error = "충전 가능합니다.";
        if (
          parseInt(this.$store.state.wonOfMon) + parseInt(this.form.number) <=
          this.$store.state.maxIncentive
        ) {
          text.incentive_amount = this.form.number;
        } else if (
          //this.$store.state.wonOfMon < this.$store.state.maxIncentive
          this.$store.state.wonOfMon < this.$store.state.maxWonCharge
        ) {
          text.incentive_amount =
            parseInt(this.$store.state.maxIncentive) -
            parseInt(this.$store.state.incOfMon * 10);
        } else {
          text.incentive_amount = 0;
        }
        text.incentive_amount =
          text.incentive_amount * this.$store.state.incentiveRate * 0.001;
        text.charge_amount =
          parseInt(this.form.number) + parseInt(this.incentive_amount);
      }
      return true;
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
@font-face {
  font-family: "Cafe24Ssurround";
  src: url("../fonts/Cafe24Ssurround.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}

/*--------------------------card--------------------------- */
#card_charge {
  font-family: BCcardB;
  background-color: rgba(177, 175, 175, 0.394);
  border-radius: 50px;
  border: 2.5px solid #9d8d7c6b;
  width: 12rem;
  margin: 30px auto;
}

#card_charge img {
  margin: 1px -30px;
  height: 13rem;
}

/*-------------------------- charge-section -------------------------- */
.charge_section {
  font-family: BCcardB;
  font-weight: 600;
  margin: 30px;
}

.bank_ac {
  font-size: 15px;
  background-color: #faebbb71;
  border-radius: 10px;
  padding: 3% 5% 3% 5%;
  margin-bottom: 30px;
}

.form_charge {
  margin-top: 10px;
}

/*--------------------------poss_am/charge_am------------------------------- */
.charge_am li {
  font-size: 13px;
  color: #000;
  padding: 0px;
}

.charge_am .form-control {
  background-color: rgba(164, 162, 158, 0.612);
  border-radius: 10px;
}

.charge_am {
  font-size: 20px;
  background-color: #f8d97171;
  border-radius: 17px;
  padding: 20px 14px;
  margin-bottom: 5%;
}

#re_btn {
  background-color: rgba(164, 162, 158, 0.612);
  margin: 1px 0 1px 0;
}

#ch_btn {
  color: #76512c;
  background-color: #f8d97171;
  border-color: #f8d97171;
  font-size: 17px;
  font-weight: 900;
  width: 27%;
  border-radius: 17px;
  margin: 5% 7% 17% 7%;
}

#btn_color {
  color: #fbca47;
}

#font-red {
  color: rgb(226, 38, 38);
  font-size: 13px;
  margin-left: 7px;
}

/*-------------------------- 충전 모달창-------------------------- */
.modal-title {
  font-weight: 800;
}

#ch_modal {
  font-family: BCcardB;
  color: #76512c;
  font-size: 15px;
}

.modal-header {
  margin: 3%;
}

#ch_modal .btn {
  color: #76512c;
  background-color: #ffde028c;
  width: 25%;
  margin-left: 18%;
  font-size: 14px;
  font-weight: 700;
  border-radius: 15px;
}

#total_charge {
  border-top: 2px solid #76512c;
  margin: 2% 11% 0 0;
  position: relative;
  right: -5%;
}

.note h5 {
  color: red;
  font-size: 10px;
  left: 5%;
}

.note h4 {
  color: red;
  font-size: 12px;
  font-weight: 600;
  left: 10%;
  padding-top: 10px;
}

.note {
  margin: 10% 5% 0 5%;
  background-color: #fbcb4721;
  border-radius: 15px;
}

#align_right {
  float: right;
}

.posit_rel {
  position: relative;
  right: 19%;
}

.posit_rel2 {
  position: relative;
  right: 14.5%;
}

.posit_rel.left {
  left: 20px;
}

.posit_rel.margin90 {
  left: 13.5%;
}

.posit_rel.margin138 {
  left: 17%;
}
.posit_rel.margin150 {
  left: 25%;
}
.posit_rel.margin100 {
  left: 18%;
}
.posit_rel.margin164 {
  left: 20%;
}
/*--------------------------공지사항/q&a-------------------------- */
.end_Charge {
  font-family: "GmarketSansTTFMedium";
}

.end_Charge .card-body {
  font-weight: 600;
  padding: 0;
}

.end_Charge li {
  padding: 6% 6% 4% 4%;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}

.end_Charge h4 {
  padding: 0;
}
</style>
