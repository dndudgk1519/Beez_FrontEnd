<template>
  <div>
    <b-card id="card_TokenChange">
      <img src="../assets/Card3.png" alt="card" />
    </b-card>

    <div class="exchange_section">
      <ul class="Storebank_ac">
        <li>
          <a>{{ bank_na }} 은행</a>
          <a style="float:right">{{ account_no }}</a>
        </li>
      </ul>

      <b-form>
        <ul class="detail_bz_ceo">
          <li>
            <a>환전가능 BZ</a>
            <a style="position:relative; left:20px"
              >{{ this.$store.state.myBz }} BZ</a
            >
          </li>

          <b-input-group append="BZ">
            <b-form-input
              v-model="form.bzInput"
              type="text"
              @keyup="tokenValid"
              :state="state"
            ></b-form-input>
          </b-input-group>

          <b-input-group append="원">
            <b-form-input v-model="form.bzToWon" disabled>{{
              form.bzToWon
            }}</b-form-input>
          </b-input-group>

          <a id="font-red">{{ error }}</a>
        </ul>

        <div class="exchange_btn text-center">
          <b-button
            @click="$bvModal.show('ex_modal')"
            :disabled="error.length > 9"
          >
            환전
          </b-button>
          <b-button href="/StoreMain">취소</b-button>
        </div>
      </b-form>

      <b-modal centered id="ex_modal" hide-footer title="환전 정보">
        <div class="d-block">
          <a class="posit_rel margin">출금가능 BZ</a>
          <a class="posit_rel" style="float:right"> {{ form.bzAmount }} BZ</a>
        </div>
        <div class="d-block">
          <a class="posit_rel margin">환전 BZ</a>
          <a class="posit_rel" style="float:right"> {{ form.bzInput }} BZ</a>
        </div>
        <div class="d-block">
          <a class="posit_rel margin">환전 금액</a>
          <a class="posit_rel" style="float:right">
            {{ form.bzToWon | comma }} 원</a
          >
        </div>
        <div class="d-block" id="total_charge">
          <a class="posit_rel margin2">잔여 BZ</a>
          <a class="posit_rel2" style="float:right">{{ rest_bz }} BZ</a>
        </div>

        <div class="note">
          <h4>
            <FontAwesomeIcon :icon="faExclamation" />
            환전 유의사항
          </h4>
          <h5>- 확인 버튼 클릭 직후 환전이 바로 적용되지 않습니다.</h5>
          <h5>- 환전한 금액은 환전 완료 알림창이 뜬 이후에 적용됩니다.</h5>
          <h5>- 확인 버튼 클릭 이후 환전 알림창까지 약 1분정도 소요됩니다.</h5>
        </div>

        <b-button class="mt-3" @click="exchangePost">확인</b-button>
        <b-button class="mt-3" @click="$bvModal.hide('ex_modal')"
          >취소</b-button
        >
      </b-modal>
    </div>
    <b-card id="end_StoreExchangeToken">
      <li>
        <h4>
          BZ 환전 안내<FontAwesomeIcon
            :icon="faAngleRight"
            style="float:right"
          />
        </h4>
      </li>
      <li>
        <h4>
          BZ 규정<FontAwesomeIcon :icon="faAngleRight" style="float:right" />
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
  components: { FontAwesomeIcon },
  data() {
    return {
      bank_na: "!!",
      account_no: "!!!",

      error: "",
      rest_bz: "",

      form: {
        bzInput: "", //입력된 환전 bz
        bzToWon: "", // 원 환산
      },
      userpPrivateKey: "",
      userAddress: "",

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
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },

  methods: {
    //----------------입력폼에 숫자만----------------------
    tokenValid() {
      this.form.bzInput = this.form.bzInput.replace(/[^0-9]/g, "");
    },

    exchangePost() {
      var params = {
        email: localStorage.getItem("email"),
        exchange: this.form.bzInput * 100,
        address: localStorage.getItem("address"),
      };
      (async () => {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
          "token"
        );
        await axios
          .post("/api/exchange/amount", params)
          .then(() => {
            //toast로 충전 정보 전달
            // this.$toaster.success("환전이 완료되었습니다.");
            // this.$store.commit("storeMain");
          })
          .catch(() => {
            // this.$toaster.error("환전에 실패하였습니다. 다시 시도해 주세요.");
          });
      })();
      this.$router.push("/StoreMain");
    },
  },
  computed: {
    state() {
      const text = this;
      if (this.form.bzInput.length == 0) {
        text.form.bzToWon = this.form.bzInput * 100;
        text.error = "환전할 BZ를 입력해주세요.";
      } else if (
        parseInt(this.form.bzInput) > parseInt(this.$store.state.myBz)
      ) {
        text.form.bzToWon = this.form.bzInput * 100;
        text.error = "환전가능 BZ가 부족합니다.";
      } else {
        /*parseInt(this.form.bzInput) <= parseInt(this.form.bzAmount);*/
        text.form.bzToWon = this.form.bzInput * 100;
        text.error = "환전 가능합니다.";
        text.rest_bz =
          parseInt(this.$store.state.myBz) - parseInt(this.form.bzInput);
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
/*--------------------------card--------------------------- */
#card_TokenChange {
  background-color: #b9ddf7;
  border: 2px solid rgb(51, 28, 155);
  border-radius: 50px;
  width: 12rem;
  margin: 30px auto;
}

#card_TokenChange img {
  margin: 1px -30px;
  height: 13rem;
}

/*-------------------------- changetoken-section -------------------------- */
.exchange_section {
  font-family: BCcardB;
  font-weight: 600;
  margin: 30px;
}

.Storebank_ac {
  font-size: 15px;
  background-color: #0aa6df23;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 30px;
}

/*--------------------------BEEZ_amount/changetoken_amount------------------------------- */
.detail_bz_ceo .form-control {
  display: inline-block;
  background-color: rgba(125, 174, 224, 0.463);
  border: 2px solid rgba(125, 174, 224, 0.463);
  border-radius: 10px;
  padding: 10px;
  width: 84%;
  margin-bottom: 10px;
}

.detail_bz_ceo .input-group-text {
  background-color: rgba(125, 174, 224, 0.463);
  border-radius: 10px;
  margin-bottom: 10px;
  width: 45px;
  color: #100055;
  font-weight: 600;
}

#font-red {
  color: rgb(226, 38, 38);
  font-size: 13px;
  margin-left: 7px;
}
/*-------------------------- 비즈-------------------------- */
.detail_bz_ceo {
  color: #100055;
  background-color: #0a6adf1a;
  border-radius: 17px;
  padding: 8px 14px;
}

.detail_bz_ceo li {
  padding: 5px 8px 0 8px;
  font-size: 15px;
}

/*-------------------------- 환전 버튼-------------------------- */
.exchange_btn .btn {
  color: #100055;
  background-color: #0a6adf1a;
  border-color: #0a6adf1a;
  font-size: 17px;
  font-weight: 900;
  border-radius: 15px;
  width: 25%;
  margin: 8% 7% 17% 7%;
}

/*-------------------------- 환전 모달창-------------------------- */
.modal-header {
  margin: 3%;
}
.modal-title {
  font-weight: 800;
}

#ex_modal {
  font-family: BCcardB;
  color: #100055;
  font-size: 15px;
}

#ex_modal .btn {
  color: #100055;
  background-color: rgba(125, 174, 224, 0.463);
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

.posit_rel {
  position: relative;
  right: 19%;
}

.posit_rel2 {
  position: relative;
  right: 15%;
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
#end_StoreExchangeToken {
  font-family: "GmarketSansTTFMedium";
}
#end_StoreExchangeToken .card-body {
  font-weight: 600;
  padding: 0;
}
#end_StoreExchangeToken li {
  padding: 6% 6% 4% 4%;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}

#end_StoreExchangeToken h4 {
  padding: 0;
}
</style>
