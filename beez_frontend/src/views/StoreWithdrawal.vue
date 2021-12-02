<template>
  <div>
    <b-card id="card_img">
      <img src="../assets/Card3.png" />
    </b-card>

    <!-- 출금가능원화보다 초과되면 에러메세지(:state),출금 모달창 수정하기  -->
    <div class="withdrawal_section">
      <ul class="Storebank_ac">
        <li>
          <a>{{ bank_na }} 은행</a>
          <a style="float:right">{{ account_no }}</a>
        </li>
      </ul>

      <ul class="withdrawal_amount">
        <li>
          <a>출금가능 원화</a>
          <a style="position:relative; left:20px"
            >{{ this.$store.state.myCash | comma }} 원</a
          >
        </li>

        <b-form>
          <b-input-group>
            <b-form-input
              v-model="withdrawal_won"
              type="text"
              :state="wi_state"
              @keyup="wonValid"
            ></b-form-input>

            <b-input-group-append>
              <b-button id="re_btn" type="reset">
                <FontAwesomeIcon :icon="faRedo" id="btn_color2" />
              </b-button>
            </b-input-group-append>
          </b-input-group>

          <a id="font-red">{{ error }}</a>
        </b-form>
      </ul>

      <div class="text-center">
        <b-button
          id="wi_btn"
          @click="$bvModal.show('wi_modal')"
          :disabled="error.length > 9"
        >
          출금
        </b-button>
        <b-button id="wi_btn" href="/StoreMain">취소</b-button>
      </div>
    </div>

    <b-modal centered id="wi_modal" hide-footer title="출금 정보">
      <div class="d-block">
        <a class="posit_rel margin">출금가능 금액</a>
        <a class="posit_rel" style="float:right">
          {{ this.$store.state.myCash | comma }} 원</a
        >
      </div>
      <div class="d-block">
        <a class="posit_rel margin">출금 금액</a>
        <a class="posit_rel" style="float:right">
          {{ withdrawal_won | comma }} 원</a
        >
      </div>
      <div class="d-block" id="total_excharge">
        <a class="posit_rel margin2">잔여 금액</a>
        <a class="posit_rel2" style="float:right">{{ rest_won | comma }} 원</a>
      </div>

      <div class="note">
        <h4>
          <FontAwesomeIcon :icon="faExclamation" />
          출금 유의사항
        </h4>
        <h5>- 확인 버튼 클릭 직후 계좌 송금이 바로 진행되지 않습니다.</h5>
        <h5>- 출금한 금액은 출금 완료 알림창이 뜬 이후에 송금됩니다.</h5>
        <h5>- 확인 버튼 클릭 이후 출금 알림창까지 약 1분정도 소요됩니다.</h5>
      </div>

      <b-button class="mt-3" @click="withdrawalPost">확인</b-button>
      <b-button class="mt-3" @click="$bvModal.hide('wi_modal')">취소</b-button>
    </b-modal>

    <b-card id="end_StoreWithdrawal">
      <li>
        <h4>
          출금 규정/안내<FontAwesomeIcon
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
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      bank_na: "!!",
      account_no: "!!",
      error: "",

      withdrawal_won: "",
      withdrawal_error: "",
      rest_won: "",

      //아이콘
      faRedo,
      faAngleRight,
      faExclamation,
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
        })
        .catch(() => {});
    })();
    this.$store.commit("storeMain");
  },
  methods: {
    wonValid() {
      this.withdrawal_won = this.withdrawal_won.replace(/[^0-9]/g, "");
    },
    withdrawalPost() {
      var params = {
        email: localStorage.getItem("email"),
        withdrawal: this.withdrawal_won,
        address: localStorage.getItem("address"),
      };
      (async () => {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
          "token"
        );
        await axios
          .post("/api/withdrawal/amount", params)
          .then(() => {
            //toast로 충전 정보 전달
            // this.$toaster.success("출금이 완료되었습니다.");
            // this.$store.commit("storeMain");
          })
          .catch(() => {
            // this.$toaster.error("출금에 실패하였습니다. 다시 시도해 주세요.");
          });
      })();
      this.$router.push("/StoreMain");
    },
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  computed: {
    wi_state() {
      const text = this;
      if (text.withdrawal_won.length == 0)
        text.error = "출금할 금액을 입력해주세요.";
      else if (text.withdrawal_won < 10000)
        text.error = "10,000원 이상 출금 가능합니다.";
      else if (text.withdrawal_won % 1000 != 0)
        text.error = "1,000원 단위로 출금 가능합니다.";
      else if (
        parseInt(text.withdrawal_won) > parseInt(text.$store.state.myCash)
      )
        text.error = "출금가능 원화가 부족합니다.";
      //(parseInt(text.withdrawal_won) > parseInt(text.my_won))
      else {
        text.error = "출금 가능합니다.";
        text.rest_won =
          parseInt(text.$store.state.myCash) - parseInt(text.withdrawal_won);
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
/*--------------------------card img--------------------------- */
#card_img {
  background-color: #c6e4fa;
  border-radius: 50px;
  border: 2px solid rgb(51, 28, 155);
  width: 12rem;
  margin: 30px auto;
}

#card_img img {
  margin: 1px -30px;
  height: 13rem;
}

/*-------------------------- withdrawal-section -------------------------- */
.withdrawal_section {
  font-family: BCcardB;
  color: #100055;
  font-weight: 600;
  margin: 30px;
}

.Storebank_ac {
  font-size: 15px;
  background-color: #0069fd44;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 30px;
}

/*--------------------------withdrawal_amount------------------------------- */
.withdrawal_amount li {
  font-size: 15px;
  padding: 0px;
}

.withdrawal_amount {
  font-size: 20px;
  background-color: #e0ecf7;
  border-radius: 17px;
  padding: 20px 14px;
}

.withdrawal_amount .form-control {
  background-color: rgba(164, 162, 158, 0.49);
  border-radius: 10px;
  margin: -0.3% 0 -0.3% 0;
}

@media (min-width: 454px) {
  .input-group-append {
    margin: -0.2% 0 -0.2% 0;
  }
}

#re_btn {
  background-color: rgba(164, 162, 158, 0.49);
}

#btn_color2 {
  color: #100055;
}
#font-red {
  color: rgb(226, 38, 38);
  font-size: 13px;
  margin-left: 7px;
}

/*-------------------------- 출금 버튼-------------------------- */
#wi_btn {
  color: #100055;
  background-color: #e0f5f7;
  border-color: #e0ecf7;
  font-size: 17px;
  font-weight: 900;
  width: 25%;
  margin: 8% 7% 17% 7%;
  border-radius: 15px;
}

/*-------------------------- 출금 모달창-------------------------- */
.modal-header {
  margin: 3%;
}

.modal-title {
  font-weight: 800;
}

#wi_modal {
  font-family: BCcardB;
  color: #100055;
  font-size: 15px;
}

#wi_modal .btn {
  color: #100055;
  background-color: rgba(125, 174, 224, 0.463);
  width: 25%;
  margin-left: 18%;
  font-size: 14px;
  font-weight: 700;
  border-radius: 15px;
}

#total_excharge {
  border-top: 2px solid #100055;
  margin: 2% 11% 0 0;
  position: relative;
  right: -5%;
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

.posit_rel.margin {
  left: 20%;
}
.posit_rel.margin2 {
  left: 17%;
}

.note h5 {
  color: red;
  font-size: 10px;
  left: 3%;
}

.note h4 {
  color: red;
  font-size: 12px;
  font-weight: 600;
  left: 8%;
  padding-top: 10px;
}

.note {
  margin: 10% 5% 0 5%;
  background-color: #bad5fa36;
  border-radius: 15px;
}

/*--------------------------------안내----------------------------------------*/
#end_StoreWithdrawal {
  font-family: "GmarketSansTTFMedium";
}
#end_StoreWithdrawal .card-body {
  font-weight: 600;
  padding: 0;
}
#end_StoreWithdrawal li {
  padding: 6% 6% 4% 4%;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}
#end_StoreWithdrawal h4 {
  padding: 0;
}
</style>
