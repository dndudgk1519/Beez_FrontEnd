<template>
  <div id="app">
    <b-form @submit="onSubmit">
      <b-card id="card_qr" title="QR코드 결제">
        <div class="qrbtn">
          <div class="pay_form">
            <b-form-group
              description="오른쪽 버튼을 눌러 QR코드를 인식해주세요."
            >
              <b-form-input id="payForm" v-model="form.scanned" disabled>{{
                this.form.scanned
              }}</b-form-input>

              <b-button v-b-modal.pay_modal>
                <FontAwesomeIcon :icon="faQrcode" style="color:#f8b704" />
              </b-button>
            </b-form-group>
            <!-- </b-form> -->
          </div>

          <b-modal id="pay_modal" ref="qr-modal" hide-header ok-only>
            <p class="qrheader my-2">가게의 QR코드를 인식해주세요.</p>
            <div class="camera">
              <vue-qr-reader
                v-if="show"
                v-on:code-scanned="codeScanned"
                v-on:error-captured="errorCaptured"
                :stop-on-scanned="true"
                :draw-on-found="true"
                :responsive="false"
              />
            </div>

            <p class="qrsuccess my-2">
              {{ qrsuccess }}
            </p>
          </b-modal>
        </div>

        <div class="pay_amount">
          <b-form-group>
            <a>보유금액</a>
            <a id="char_amount">
              <!-- <FontAwesomeIcon :icon="faWonSign" /> -->
              {{ this.$store.state.wonBalace | comma }} 원
            </a>
          </b-form-group>
          <b-form-group>
            <a>결제금액</a>
            <b-form-input
              id="pay_amount"
              v-model="form.price"
              @keyup="payAmountValid"
              type="text"
              required
              style="float:right"
            ></b-form-input>
          </b-form-group>
          <table style="width:100%">
            <tr>
              <th></th>
              <th>
                <div class="div_right">
                  <b-button v-b-toggle.bzForm class="bz_btn">BZ 사용</b-button>
                </div>
              </th>
            </tr>
          </table>

          <div id="bz_amount">
            <b-collapse id="bzForm" class="mt-1">
              <b-card>
                <b-form-group>
                  <ul>
                    <li id="bz_am">
                      <a>보유 BZ</a>
                      <a class="bz_amount">
                        {{ this.$store.state.bzBalace | comma }}
                      </a>
                      <img src="../assets/main/main03.png" />
                    </li>
                    <li>
                      <a>사용 BZ</a>
                      <b-form-input
                        v-model="form.bz"
                        @keyup="bzValid"
                        :state="validation"
                        type="text"
                      ></b-form-input>
                    </li>
                  </ul>
                </b-form-group>

                <!-- <b-button size="sm">사용</b-button> -->
                <a id="font-red" style="float:right">{{ error }}</a>

                <div class="bz_detail">
                  <img src="../assets/main/main03.png" style="float:left" />
                  <a id="ex"> BZ 사용 방법</a>
                  <li>
                    <a
                      >- BZ를 사용하시려면 [사용 BZ]를 입력하시고 [사용]을
                      눌러주세요.</a
                    >
                  </li>
                  <li>
                    <a
                      >- 사용하신 BZ는 [결제내역]에서 사용된 내역을 확인할 수
                      있습니다.</a
                    >
                  </li>
                  <li>
                    <a
                      >- 결제금액에서 BZ 사용금액을 뺀 나머지 금액은 결제시
                      현금잔액으로 결제되며, 충전된 현금잔액만 BZ와 함께 사용할
                      수 있습니다.</a
                    >
                  </li>
                </div>
              </b-card>
            </b-collapse>
          </div>

          <b-modal
            centered
            id="p_modal"
            ref="pay_modal"
            hide-footer
            title="결제 정보"
          >
            <div class="d-block">
              <a class="posit_rel margin138">현금 결제</a>
              <a class="posit_rel" style="float:right">{{ won | comma }} 원</a>
            </div>
            <div class="d-block" v-if="this.form.bz == ''">
              <a class="posit_rel margin138">BZ 결제</a>
              <a class="posit_rel" style="float:right">0 BZ</a>
            </div>
            <div class="d-block" v-else>
              <a class="posit_rel margin138">BZ 결제</a>
              <a class="posit_rel" style="float:right">{{ form.bz | comma }} BZ</a>
            </div>
            <div class="d-block" id="total_pay">
              <a class="posit_rel margin90">총 결제금액</a>
              <a class="posit_rel2" style="float:right">{{ form.price | comma }} 원</a>
            </div>
            <div class="note">
              <h4>
                <FontAwesomeIcon :icon="faExclamation" id="btn_color" />
                결제 유의사항
              </h4>
              <h5>
                - 확인 버튼 클릭 이후 결제한 금액이 바로 적용되지 않습니다.
              </h5>
              <h5>- 결제는 결제 완료 알람창이 떠야 최종 결제 완료입니다.</h5>
              <h5>
                - 확인 버튼 클릭 이후 결제 알림창까지 약 1분정도 소요됩니다.
              </h5>
            </div>
            <b-button class="mt-3" @click="payPost">확인</b-button>
            <b-button class="mt-3" @click="$bvModal.hide('p_modal')"
              >취소</b-button
            >
          </b-modal>
          <!-- 결제 진행 모달 -->
          <b-modal
            centered
            id="ing_modal"
            ref="ing_modal"
            hide-footer
            hide-header
            no-close-on-backdrop
            no-close-on-esc
          >
            <div class="loading">
              <scale-loader
                loading="loading"
                color="#ffbd07b3"
                size="10px"
              ></scale-loader>
            </div>
            <div class="modal_text">
              <h4>
                결제가 진행중입니다. 잠시만 기다려 주세요.
              </h4>
            </div>
          </b-modal>
          <div id="payErr">
            <div>
              보유금액이 부족합니다.
            </div>
            <div>
              다시 한번 확인 해주세요.
            </div>
          </div>
          <div class="form_btn text-center">
            <b-button type="submit" :disabled="error.length > 9">결제</b-button>
            <b-button href="/Main">취소</b-button>
          </div>
        </div>
      </b-card>
    </b-form>
    <div>
      <b-card class="end_Payment">
        <li>
          <h4>
            결제 안내<FontAwesomeIcon
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
import VueQrReader from "../components/VueQrReader.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { faWonSign } from "@fortawesome/free-solid-svg-icons";
import { PAYMENT_ABI } from "@/contract/ContractABI.js";
import { CONTRACT_ADDRESS } from "@/contract/ContractAddress.js";
import { PROVIDER } from "@/contract/Provider.js";
import { Contract, ethers } from "ethers";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    VueQrReader,
    FontAwesomeIcon,
    ScaleLoader,
  },
  data() {
    return {
      errorMessage: "",
      qrsuccess: "",
      show: true,

      //아이콘
      faQrcode,
      faAngleRight,
      faExclamation,
      faWonSign,
      //결제 입력폼
      form: {
        scanned: "",
        price: "",
        bz: "",
      },
      tx: "",
      won: "",
      error: "",
      userpPrivateKey: "",
      userAddress: "",
    };
  },
  async beforeCreate() {
    this.$store.commit("main");

    //솔리디티 이벤트 확인
    const address = localStorage.getItem("address");
    const abi = PAYMENT_ABI;
    const provider = PROVIDER;
    const contract = new Contract(CONTRACT_ADDRESS, abi, provider);
    let filter = contract.filters.paymentResult(address);
    contract.on(filter, () => {
      //console.log(to, recipient, parseInt(wonAmount), parseInt(bzAmount));
      this.$bvModal.hide("ing_modal");
      //this.$refs["finish_modal"].show();
      this.$router.push({
        name: "paymentCompleted",
        params: {
          tx: this.tx,
          won: this.won,
          beez: this.form.bz,
          price: this.form.price,
        },
      });
    });
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  methods: {
    //QR카메라
    codeScanned(code) {
      this.form.scanned = code;
      this.qrsuccess = "QR코드 인식 성공";
    },
    qrModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["qr-modal"].hide();
    },
    errorCaptured(error) {
      switch (error.name) {
        case "NotAllowedError":
          this.errorMessage = "Camera permission denied.";
          break;
        case "NotFoundError":
          this.errorMessage = "There is no connected camera.";
          break;
        case "NotSupportedError":
          this.errorMessage =
            "Seems like this page is served in non-secure context.";
          break;
        case "NotReadableError":
          this.errorMessage =
            "Couldn't access your camera. Is it already in use?";
          break;
        case "OverconstrainedError":
          this.errorMessage = "Constraints don't match any installed camera.";
          break;
        default:
          this.errorMessage = "UNKNOWN ERROR: " + error.message;
      }
      // console.error(this.errorMessage);
    },

    // -----------------------------결제금액폼 유효성 검사----------------------
    payAmountValid() {
      this.form.price = this.form.price.replace(/[^0-9]/g, "");
    },
    bzValid() {
      this.form.bz = this.form.bz.replace(/[^0-9]/g, "");
    },

    //결제 입력폼
    onSubmit(event) {
      if (this.form.scanned.length == 0) {
        event.preventDefault();
        this.$refs["qr-modal"].show();
        return;
      } else if (
        parseInt(this.form.price) - parseInt(this.form.bz * 100) >
        this.$store.state.wonBalace
      ) {
        event.preventDefault();
        document.getElementById("payErr").style.display = "block";
      } else {
        event.preventDefault();
        document.getElementById("payErr").style.display = "none";
        this.$refs["pay_modal"].show();
        this.won = parseInt(this.form.price) - parseInt(this.form.bz * 100);
      }
    },
    //db에서 address, privateAddress받아오기
    async payPost() {
      //이런식으로 header 토큰 삽입 => security 활성화.
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "token"
      );

      //axios전달(/api로 시작 => vue.config.js에서 그렇게 설정, 무조건 spring에서 dto를 이용하여 값 전달 받아야함)
      await axios
        .post("/api/users/priv")
        .then((res) => {
          //여기서 Correct.vue 처리 해주면 됨
          this.userpPrivateKey = "0x" + res.data.data.privateKey;
          this.userAddress = res.data.data.walletAddress;
        })
        .catch(() => {});

      //msg.sender credentials(자격증명) - PRIVATE_ADDRESS를 활용
      const PRIVATE_KEY = this.userpPrivateKey;

      /****************************Solidity 매개변수****************************/
      const to_ADDRESS = this.userAddress; //사용자(db) 원토큰 백만원, 비즈 십만원
      const recipient_ADDRESS = this.form.scanned; //소상공인(qr)
      const cost = this.form.price; //입력값
      const won_mount = this.won; //입력값을 활용해 계산
      const beez_mount = this.form.bz * 100; //입력값
      /***********************************************************************/
      const provider = PROVIDER;
      const signer = await new ethers.Wallet(PRIVATE_KEY, provider);

      const contract = await new ethers.Contract(
        CONTRACT_ADDRESS,
        PAYMENT_ABI,
        signer
      );

      const sendTransaction = contract.payment(
        to_ADDRESS,
        recipient_ADDRESS,
        cost,
        won_mount,
        beez_mount
      );
      this.$bvModal.hide("p_modal");
      this.$refs["ing_modal"].show();
      await sendTransaction
        .then((res) => {
          this.tx = res.hash;
        })
        .catch(() => {});
    },
  },
  computed: {
    validation() {
      const text = this;
      if (this.form.price.length == 0) text.error = "결제금액을 입력해주세요.";
      else if (this.form.bz.length == 0) text.error = "";
      else if (this.form.price < this.form.bz * 100)
        text.error = "BZ 사용금액이 결제금액을 초과하였습니다.";
      else if (this.$store.state.bzBalace < this.form.bz)
        text.error = "사용 가능한 BZ가 부족합니다.";
      else text.error = "사용 가능합니다.";
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

#card_qr {
  font-family: BCcardB;
  border: 10px solid #76512cb1;
  border-radius: 30px;
  margin: 4% 6%;
}

#card_qr .card-body {
  padding: 5%;
}

#card_qr .card-title {
  color: #76512cb8;
  border-bottom: 7px solid #76512c78;
  font-weight: 900;
  margin-bottom: 20px;
}

/*---------------------------QR 코드 입력창------------------------------ */
.qrbtn {
  font-size: 17px;
}

#payForm {
  width: 85%;
}

.pay_form {
  width: 100%;
}

.pay_form .form-control {
  background-color: rgba(164, 162, 158, 0.463);
  border-radius: 10px;
  display: inline-block;
}

.pay_form .form-group {
  width: 100%;
  text-align: center;
}
#char_amount {
  float: right;
  margin-right: 5%;
  font-size: 17px;
}
/*---------------------------QR 버튼/ QR 모달------------------------------ */

#card_qr .btn {
  color: #fff;
  background-color: #76512cb8;
  border-color: 0;
  display: inline-block;
  font-weight: 900;
  font-size: 17px;
}
#pay_modal {
  font-family: BCcardB;
  color: #76512c;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

#pay_modal .btn {
  color: #fff;
  background-color: #76512c93;
  width: 23%;
}

.qrsuccess {
  color: #108a2c;
  font-size: 14px;
}

.qrheader {
  margin: 5%;
  font-size: 14px;
  border-bottom: 2.5px solid #76512c;
}

/*---------------------------결제 폼------------------------------ */
.form_btn .btn {
  margin: 30px 20px 0 20px;
  font-size: 17px;
  border-radius: 15px;
  width: 27%;
}

.pay_amount {
  color: #0c0804;
  font-weight: 600;
  margin-left: 5px;
  margin-top: 30px;
}

.pay_amount .form-control {
  background-color: rgba(255, 194, 82, 0.285);
  border: 2px solid rgba(255, 194, 82, 0.285);
  border-radius: 10px;
  display: inline-block;
}

.pay_amount .form-group {
  margin-bottom: 10px;
}

#pay_amount {
  width: 68%;
}

/*---------------------------BZ 폼------------------------------ */
#card_qr .btn.bz_btn {
  background-color: #f8b704;
  border-color: 0;
  margin-top: 10px;
  width: 100%;
  font-size: 15px;
}
.div_right {
  margin-left: 70%;
  margin-right: 0px;
  float: right;
}

#bzForm img {
  width: 8%;
  float: right;
}

#bzForm .card {
  background-color: rgba(253, 249, 136, 0.211);
  border-radius: 15px;
}

#bzForm .form-control {
  width: 58%;
  float: right;
}

.bz_amount {
  float: right;
  margin-left: 5px;
}

#font-red {
  color: rgb(226, 38, 38);
  font-size: 13px;
  margin-right: 7px;
}

.bz_detail {
  margin-top: 4.8rem;
  color: black;
  font-size: 11px;
}

#ex {
  margin-left: 5px;
}

#bz_am {
  margin-bottom: 8px;
}

/*---------------------------결제 버튼 후 모달------------------------------ */
.modal-header {
  margin: 3%;
}

.modal-title {
  font-weight: 800;
}

#p_modal {
  font-family: BCcardB;
  color: #76512c;
  font-size: 15px;
}

#p_modal .btn {
  color: #76512c;
  background-color: #ffde028c;
  width: 25%;
  margin-left: 18%;
  font-size: 14px;
  font-weight: 700;
  border-radius: 15px;
}

#total_pay {
  border-top: 2px solid #76512c;
  margin: 2% 11% 0 0;
  position: relative;
  right: -5%;
}

.posit_rel.margin90 {
  left: 13.5%;
}

.posit_rel.margin138 {
  left: 17%;
}

.posit_rel {
  position: relative;
  right: 19%;
}

.posit_rel2 {
  position: relative;
  right: 14.5%;
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
  padding-top: 10px;
  left: 10%;
}

.note {
  margin: 10% 5% 0 5%;
  background-color: #fbcb4721;
  border-radius: 15px;
}

#btn_color {
  color: #fbca47;
}

/*--------------------------공지사항/q&a-------------------------- */
.end_Payment {
  font-family: "GmarketSansTTFMedium";
  margin-top: 20%;
}

.end_Payment .card-body {
  font-weight: 600;
  padding: 0;
}

.end_Payment li {
  padding: 6% 6% 4% 4%;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}

.end_Payment h4 {
  padding: 0;
}
/* 로딩 */
#ing_modal {
  font-family: "GmarketSansTTFMedium";
  background-color: #f8b704;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33); */
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
.loading {
  margin: 5%;
}
/* 결제 정보 */
#payErr {
  /* font-family: "GmarketSansTTFMedium"; */
  display: none;
  margin: 10% 5% 0 5%;
  background-color: #fbcb4721;
  border-radius: 10px;
  text-align: center;
  color: red;
  font-size: 12px;
  font-weight: 600;
}
</style>
