<template>
  <div id="signUp">
    <ul id="explain">
      <li>
        <h1>Let's</h1>
        <h1 style="color:#f89604">
          Start!
        </h1>
      </li>
      <img src="../assets/start_main/join01.png" />
    </ul>
    <b-card header="회원 가입" class="signUp_form">
      <b-form @submit.prevent="submitForm">
        <!-- 이름 -->
        <b-input-group>
          <b-input-group-append>
            <FontAwesomeIcon
              :icon="faUserCheck"
              size="lg"
              style="color:#f89604"
            />
          </b-input-group-append>
          <b-form-input
            v-model="user_name"
            @keyup="nameValid"
            placeholder="NAME"
            type="text"
            maxlength="13"
            required
          ></b-form-input>
        </b-input-group>

        <!-- 이메일 -->
        <b-input-group>
          <b-input-group-append>
            <FontAwesomeIcon
              :icon="faEnvelope"
              size="lg"
              style="color:#f89604"
            />
          </b-input-group-append>
          <b-form-input
            v-model="email"
            @keyup="emailValid"
            placeholder="EMAIL"
            type="text"
            required
          ></b-form-input>
          <b-button @click="emailCheck">
            중복확인
          </b-button>
          <!-- 중복검사 완료시 체크 표시로 변함 -->
          <img style="display: none;" />
        </b-input-group>
        <div v-if="!emailValidError" id="error1">
          잘못된 이메일 형식입니다.
        </div>
        <div v-if="!emailCheckError" id="error1">
          중복확인을 완료해주세요.
        </div>
        <div v-if="!emailCheckError2" id="error1">
          이메일을 입력해주세요.
        </div>

        <b-modal centered id="emailModalOk" size="sm" hide-header hide-footer>
          <h5>사용가능한 이메일 입니다.</h5>
          <b-card>
            <b-button @click="$bvModal.hide('emailModalOk')">확인</b-button>
          </b-card>
        </b-modal>

        <b-modal centered id="emailModalFail" size="sm" hide-header hide-footer>
          <h6>이미 등록된 이메일입니다.</h6>
          <b-card>
            <b-button @click="$bvModal.hide('emailModalFail')">확인</b-button>
          </b-card>
        </b-modal>

        <!-- 닉네임 -->
        <b-input-group>
          <b-input-group-append>
            <FontAwesomeIcon
              :icon="faUserTag"
              size="lg"
              style="color:#f89604"
            />
          </b-input-group-append>
          <b-form-input
            v-model="nickName"
            placeholder="NICKNAME"
            type="text"
            maxlength="10"
            required
          ></b-form-input>
        </b-input-group>

        <!-- 비밀번호 -->
        <b-input-group>
          <b-input-group-append>
            <FontAwesomeIcon :icon="faLock" size="lg" style="color:#f89604" />
          </b-input-group-append>
          <b-form-input
            type="password"
            v-model="password"
            placeholder="PASSWORD"
            maxlength="16"
            @blur="passwordValid"
            required
          ></b-form-input>
        </b-input-group>
        <div v-if="!passwordValidError" id="error1">
          8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
        </div>

        <!-- 비밀번호 재확인 -->
        <b-input-group>
          <b-form-input
            id="again"
            type="password"
            v-model="password2"
            placeholder="PASSWORD AGAIN"
            maxlength="16"
            @blur="passwordCheckValid"
            required
          ></b-form-input>
        </b-input-group>
        <div v-if="!passwordCheckValidError" id="error1">
          비밀번호가 일치하지 않습니다.
        </div>

        <!-- 전화 번호 -->
        <b-input-group>
          <b-input-group-append>
            <FontAwesomeIcon
              :icon="faPhoneAlt"
              size="lg"
              style="color:#f89604"
            />
          </b-input-group-append>
          <b-form-input
            v-model="phone"
            type="text"
            placeholder="PHONE"
            maxlength="13"
            @keyup="getPhoneMask(phone)"
            required
          ></b-form-input>
          <b-button @click="phoneCheck">
            번호인증
          </b-button>
        </b-input-group>
        <div v-if="!phoneCheckError" id="error1">
          번호인증이 완료되었습니다.
        </div>
        <div v-if="!phoneCheckError2" id="error1">
          번호인증을 완료해주세요.
        </div>
        <div v-if="!phoneCheckError3" id="error1">
          휴대폰 번호를 입력해주세요.
        </div>

        <b-modal
          centered
          id="phoneModal"
          hide-footer
          hide-header
          @show="resetModal"
          @hidden="resetModal"
        >
          <h6>인증번호가 발송되었습니다.</h6>
          <h6>제한시간 내에 인증번호를 입력해주세요.</h6>
          <b-form-input v-model="phone2"></b-form-input>

          <b-card>
            <b-button @click="phoneCheck2">확인</b-button>
          </b-card>
        </b-modal>

        <b-modal centered id="phoneModalOk" size="sm" hide-header hide-footer>
          <h6>번호인증 성공!</h6>
          <b-card>
            <b-button @click="phoneModalOk">확인</b-button>
          </b-card>
        </b-modal>

        <b-modal centered id="phoneModalFail" size="sm" hide-header hide-footer>
          <h6>번호인증 실패!</h6>
          <h6>번호인증을 다시 시도해주세요.</h6>
          <b-card>
            <b-button @click="phoneModalFail">확인</b-button>
          </b-card>
        </b-modal>

        <!-- 은행 -->
        <b-input-group>
          <b-input-group-append>
            <FontAwesomeIcon
              :icon="faPiggyBank"
              size="lg"
              style="color:#f89604"
            />
          </b-input-group-append>
          <b-form-select
            class="select"
            v-model="bank_name"
            :options="banks"
            required
          ></b-form-select>
        </b-input-group>

        <!-- 계좌번호 -->
        <b-input-group>
          <b-form-input
            id="again2"
            type="text"
            v-model="account_number"
            @keyup="accountValid"
            placeholder="계좌번호 입력"
            maxlength="25"
            required
          ></b-form-input>
        </b-input-group>

        <!-- 회원가입 동의-->
        <div class="checkbox">
          <b-form-checkbox v-model="checkbox1">
            <a>BEEZ 서비스 이용약관 동의</a>
            <a id="point">(필수)</a>
            <b-button id="Store_modal_btn" v-b-modal.modal1
              >자세히 보기</b-button
            >
          </b-form-checkbox>
          <b-form-checkbox v-model="checkbox2">
            <a>개인정보 취급 위탁 동의</a>
            <a id="point">(필수)</a>
            <b-button id="Store_modal_btn2" v-b-modal.modal2
              >자세히 보기</b-button
            >
          </b-form-checkbox>
        </div>
        <!-- footer에서 불러 오기 때문에 modal창 필요없음 -->
        <div id="signUp_btn">
          <b-button type="submit">가입하기</b-button>
          <b-button href="/" id="signUp_btn2">취소</b-button>
        </div>

        <b-modal centered id="joinModalOk" hide-header hide-footer>
          <h5>회원가입이 완료되었습니다.</h5>
          <b-card>
            <b-button @click="gotoMain">확인</b-button>
          </b-card>
        </b-modal>
        <b-modal centered id="joinModalFail" hide-header hide-footer>
          <h5>{{ this.failText }}</h5>
          <b-card>
            <b-button @click="modalFail">확인</b-button>
          </b-card>
        </b-modal>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUserTag } from "@fortawesome/free-solid-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default {
  components: {
    FontAwesomeIcon,
  },

  data() {
    return {
      //아이콘
      faUserCheck,
      faEnvelope,
      faLock,
      faUserTag,
      faPhoneAlt,
      faPiggyBank,

      passwordValidError: true,
      passwordCheckValidError: true,
      emailValidError: true,
      emailCheckError: true,
      emailCheckError2: true,
      phoneCheckError: true,
      phoneCheckError2: true,
      phoneCheckError3: true,

      user_name: "",
      email: "",
      nickName: "",
      password: "",
      phone: "",
      phone2: "",
      password2: "",
      bank_name: null,
      account_number: "",
      displayTime: "",
      failText: "",

      checkbox1: "",
      checkbox2: "",
      phoneNumber: "",
      banks: [
        { text: "은행선택", value: null },
        "국민",
        "농협",
        "신한",
        "IBK기업",
        "하나",
        "우리",
        "카카오뱅크",
        "SC제일",
        "대구",
        "부산",
        "광주",
        "새마을금고",
        "경남",
        "전북",
        "제주",
        "산업",
        "수협",
      ],
    };
  },

  methods: {
    // -----------------------------PHONE 하이픈 관련 시작----------------------
    getPhoneMask(val) {
      let res = this.getMask(val);
      this.phone = res;
    },
    getMask(phoneNumber) {
      if (!phoneNumber) return phoneNumber;
      phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

      let res = "";
      if (phoneNumber.length < 3) {
        res = phoneNumber;
        this.phoneCheckError3 = true;
        this.phoneCheckError2 = false;
        this.phoneCheckError = true;
      } else {
        if (phoneNumber.substr(0, 2) == "02") {
          if (phoneNumber.length <= 5) {
            res = phoneNumber.substr(0, 2) + "-" + phoneNumber.substr(2, 3);
            this.phoneCheckError3 = true;
            this.phoneCheckError2 = false;
            this.phoneCheckError = true;
          } else if (phoneNumber.length > 5 && phoneNumber.length <= 9) {
            res =
              phoneNumber.substr(0, 2) +
              "-" +
              phoneNumber.substr(2, 3) +
              "-" +
              phoneNumber.substr(5);
            this.phoneCheckError3 = true;
            this.phoneCheckError2 = false;
            this.phoneCheckError = true;
          } else if (phoneNumber.length > 9) {
            res =
              phoneNumber.substr(0, 2) +
              "-" +
              phoneNumber.substr(2, 4) +
              "-" +
              phoneNumber.substr(6);
            this.phoneCheckError3 = true;
            this.phoneCheckError2 = false;
            this.phoneCheckError = true;
          }
        } else {
          if (phoneNumber.length < 8) {
            res = phoneNumber;
            this.phoneCheckError3 = true;
            this.phoneCheckError2 = false;
            this.phoneCheckError = true;
          } else if (phoneNumber.length == 8) {
            res = phoneNumber.substr(0, 3) + "-" + phoneNumber.substr(3);
            this.phoneCheckError3 = true;
            this.phoneCheckError2 = false;
            this.phoneCheckError = true;
          } else if (phoneNumber.length == 9) {
            res =
              phoneNumber.substr(0, 3) +
              "-" +
              phoneNumber.substr(3, 3) +
              "-" +
              phoneNumber.substr(6);
            this.phoneCheckError3 = true;
            this.phoneCheckError2 = false;
            this.phoneCheckError = true;
          } else if (phoneNumber.length == 10) {
            res =
              phoneNumber.substr(0, 3) +
              "-" +
              phoneNumber.substr(3, 3) +
              "-" +
              phoneNumber.substr(6);
            this.phoneCheckError3 = true;
            this.phoneCheckError2 = false;
            this.phoneCheckError = true;
          } else if (phoneNumber.length > 10) {
            res =
              phoneNumber.substr(0, 3) +
              "-" +
              phoneNumber.substr(3, 4) +
              "-" +
              phoneNumber.substr(7);
            this.phoneCheckError3 = true;
            this.phoneCheckError2 = false;
            this.phoneCheckError = true;
          }
        }
      }
      return res;
    },
    // -----------------------------PHONE 하이픈 관련 끝----------------------

    // -----------------------------이름 유효성 검사----------------------
    // <!-- onKeyup="this.value=this.value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z]/g,'');" -->
    nameValid() {
      this.user_name = this.user_name.replace(/[^ㄱ-ㅎ가-힣a-zA-Z]/g, "");
    },

    // -----------------------------계좌번호 유효성 검사----------------------
    accountValid() {
      this.account_number = this.account_number.replace(/[^-0-9]/g, "");
    },

    // -----------------------------이메일 유효성 검사----------------------
    emailValid() {
      if (this.email.length == 0) {
        this.emailValidError = true;
        this.emailCheckError = true;
        this.emailCheckError2 = false;
      } else if (
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/.test(
          this.email
        )
      ) {
        this.emailValidError = true;
        this.emailCheckError = false;
        this.emailCheckError2 = true;
      } else {
        this.emailValidError = false;
        this.emailCheckError = true;
        this.emailCheckError2 = true;
      }
    },

    // -----------------------------비밀번호 유효성 검사----------------------
    passwordValid() {
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+|<>?:{}]).{8,16}$/.test(
          this.password
        )
      ) {
        this.passwordValidError = true;
      } else {
        this.passwordValidError = false;
      }
    },
    //-------------------비밀번호 재확인--------------------------------------
    passwordCheckValid() {
      if (this.password === this.password2) {
        this.passwordCheckValidError = true;
      } else {
        this.passwordCheckValidError = false;
      }
    },
    //-------------------이메일 중복확인 버튼--------------------------------------
    async emailCheck() {
      if (this.email.length == 0) {
        this.emailCheckError2 = false;
      } else {
        this.emailCheckError2 = true;
        var param = {
          email: this.email,
        };
        (async () => {
          await axios.post("/api/join/check", param).then((res) => {
            if (res.data == 1) {
              this.$bvModal.show("emailModalFail");
            } else {
              this.$bvModal.show("emailModalOk");
              this.emailCheckError = true;
            }
          });
        })();
      }
    },
    //-------------------번호 인증번호 보내기--------------------------------------
    async phoneCheck() {
      var onlyPhone = this.phone.replace(/[^0-9]/g, "");

      if (this.phone.length == 0) {
        this.phoneCheckError3 = false;
        this.phoneCheckError2 = true;
      } else {
        this.phoneCheckError3 = true;
        this.phoneCheckError2 = false;
        this.$bvModal.show("phoneModal");
        var param = {
          phone: onlyPhone,
        };
        (async () => {
          await axios.post("/api/join/phoneCheck", param).then((res) => {
            // console.log(res.data);
            this.phoneNumber = res.data;
          });
        })();
      }

      // var timer = null;
      // var isRunning = false;

      // timer = setInterval(() => {
      //   var minutes;
      //   var seconds;

      //   // console.log(count);
      //   minutes = parseInt(count / 60, 10);
      //   seconds = parseInt(count % 60, 10);
      //   console.log(minutes);
      //   console.log(seconds);

      //   minutes = minutes < 10 ? "0" + minutes : minutes;
      //   seconds = seconds < 10 ? "0" + seconds : seconds;

      //   this.displayTime = minutes + ":" + seconds;

      //   //타이머 끝
      //   if (--count < 0) {
      //     clearInterval(timer);
      //     alert("인증번호 유호 시간이 초과되었습니다.");
      //     isRunning = false;
      //   }
      // }, 1000);
      // isRunning = true;
    },
    //-------------------번호 인증번호 확인--------------------------------------
    phoneCheck2() {
      // var param = {
      //   phone: this.phone2,
      // };

      // (async () => {
      //   await axios.post("/api/join/phoneCheck2", param).then((res) => {
      //     console.log(res.data);
      //     if (res.data == 1) {
      //       this.$bvModal.show("phoneModalOk");
      //       this.phoneCheckError = false;
      //       this.phoneCheckError2 = true;
      //     } else {
      //       this.$bvModal.show("phoneModalFail");
      //       this.phoneCheckError = true;
      //       this.phoneCheckError2 = false;
      //     }
      //   });
      // })();
      if (this.phoneNumber == this.phone2) {
        this.$bvModal.show("phoneModalOk");
        this.$bvModal.hide("phoneModal");
        this.phoneCheckError = false;
        this.phoneCheckError2 = true;
      } else {
        this.$bvModal.show("phoneModalFail");
        this.$bvModal.hide("phoneModal");
        this.phoneCheckError = true;
        this.phoneCheckError2 = false;
      }
    },
    phoneModalOk() {
      this.$bvModal.hide("phoneModal");
      this.$bvModal.hide("phoneModalOk");
    },
    phoneModalFail() {
      this.$bvModal.hide("phoneModal");
      this.$bvModal.hide("phoneModalFail");
    },
    modalFail() {
      this.$bvModal.hide("joinModalFail");
    },
    resetModal() {
      this.phone2 = "";
    },

    //-------------------회원가입 최종 버튼--------------------------------------
    async submitForm() {
      var onlyPhone = this.phone.replace(/[^0-9]/g, "");

      var params = {
        name: this.user_name,
        email: this.email,
        nickName: this.nickName,
        password: this.password,
        phone: onlyPhone,
        bankName: this.bank_name,
        accountNumber: this.account_number,
      };

      if (
        !this.passwordValidError ||
        !this.passwordCheckValidError ||
        !this.emailValidError ||
        !this.emailCheckError ||
        this.phoneCheckError
      ) {
        this.failText = "회원가입 입력란을 확인해주세요.";
        this.$bvModal.show("joinModalFail");
        return;
      } else if (!this.checkbox1 || !this.checkbox2) {
        this.failText = "회원가입 동의란을 확인해주세요.";
        this.$bvModal.show("joinModalFail");
        return;
      } else {
        axios.post("/api/join", params);
        this.$bvModal.show("joinModalOk");
      }
    },
    gotoMain() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
/*-----------------폰트, @media---------------------------- */
@font-face {
  font-family: "KoPubWorldDotumLight";
  src: url("../fonts/KoPubWorldDotumLight.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "KoPubWorldDotumMedium";
  src: url("../fonts/KoPubWorldDotumMedium.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "GmarketSansTTFBold";
  src: url("../fonts/GmarketSansTTFBold.ttf") format("woff");
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
  font-family: "Cafe24SsurroundAir";
  src: url("../fonts/Cafe24SsurroundAir.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}

/*-----------------회원가입 폼 전---------------------------- */
#signUp {
  margin: 5%;
  font-family: "Cafe24SsurroundAir";
}

#signUp #explain {
  border-radius: 20px;
  padding-top: 9%;
  background-color: #eaf8e19a;
  display: inline-block;
}

#signUp #explain li {
  display: inline-block;
  margin-left: 7%;
}

#signUp #explain h1 {
  font-size: 35px;
  font-family: "Cafe24Ssurround";
  color: rgb(0, 157, 255);
}

#signUp #explain img {
  float: right;
  width: 45%;
  margin-top: -7%;
  margin-right: 4%;
}

/*-----------------회원가입 폼 ---------------------------- */
.signUp_form {
  text-align: center;
  margin-top: 8%;
}

.signUp_form .card-header {
  font-family: "Cafe24Ssurround";
  color: #f89604;
  font-size: 20px;
  border-bottom: 2px solid #f89604;
}

.signUp_form .card-body {
  padding: 8%;
}

.signUp_form .input-group {
  background-color: antiquewhite;
  /* margin-bottom: 6%; */
  margin-top: 6%;
  /* padding: 2.8%; */
  border-radius: 20px;
}

.signUp_form .form-control {
  background-color: antiquewhite;
  border-radius: 20px;
  padding: 0;
  padding-left: 10px;
  padding-right: 20px;
  height: 50px;
  font-size: 15px;
}

.signUp_form .custom-select {
  background-color: antiquewhite;
  border: 0px;
  border-radius: 20px;
  padding: 0;
  padding-left: 10px;
  padding-right: 20px;
  height: 50px;
  font-size: 15px;
}

#again.form-control {
  padding-left: 52px;
}

#again2.form-control {
  padding-left: 52px;
}

.signUp_form .input-group-append {
  margin: 13px;
  display: block;
}

#error1,
#error2 {
  font-family: "KoPubWorldDotumLight";
  color: #f00000;
  font-size: 13px;
}

#emailModalOk,
#emailModalFail,
#phoneModal,
#phoneModalOk,
#phoneModalFail,
#joinModalOk,
#joinModalFail {
  width: 70%;
  margin: 0 auto;
  text-align: center;
  font-family: "KoPubWorldDotumLight";
}

#emailModalOk .modal-content,
#emailModalFail .modal-content,
#phoneModal .modal-content,
#phoneModalOk .modal-content,
#phoneModalFail .modal-content,
#joinModalOk .modal-content,
#joinModalFail .modal-content {
  border-radius: 1.3rem;
  border: 0;
  background-color: #f4fdee;
}

#emailModalOk .modal-body,
#emailModalFail .modal-body,
#phoneModal .modal-body,
#phoneModalOk .modal-body,
#phoneModalFail .modal-body,
#joinModalOk .modal-body,
#joinModalFail .modal-body {
  padding: 0;
  margin-top: 12px;
}

#emailModalOk .modal-body h5,
#emailModalFail .modal-body h5,
#phoneModal .modal-body h5,
#phoneModalOk .modal-body h5,
#phoneModalFail .modal-body h5,
#joinModalOk .modal-body h5,
#joinModalFail .modal-body h5 {
  margin-bottom: 10px;
  margin-top: 10px;
}

#emailModalOk .card-body,
#emailModalFail .card-body,
#phoneModal .card-body,
#phoneModalOk .card-body,
#phoneModalFail .card-body,
#joinModalOk .card-body,
#joinModalFail .card-body {
  padding: 0;
}

#emailModalOk .card,
#emailModalFail .card,
#phoneModal .card,
#phoneModalOk .card,
#phoneModalFail .card,
#joinModalOk .card,
#joinModalFail .card {
  background-color: #d3f8a8fb;
  border-end-end-radius: 15px;
  border-end-start-radius: 15px;
  font-size: 13px;
}

#emailModalOk .btn,
#emailModalFail .btn,
#phoneModal .btn,
#phoneModalOk .btn,
#phoneModalFail .btn,
#joinModalOk .btn,
#joinModalFail .btn {
  background: 0;
  width: 100%;
  border: 0;
}

#phoneModal,
#joinModalOk,
#joinModalFail {
  width: 80%;
}

#phoneModal .form-control {
  background-color: #def3c6fb;
  width: 80%;
  margin: 0 auto;
  border-radius: 10px;
}

/*-----------------버튼 ---------------------------- */
.signUp_form .btn {
  background-color: #f89604;
  color: #fff;
  font-size: 14px;
  border-radius: 20px;
  border-color: #f89604;
  font-family: "KoPubWorldDotumLight";
}

#signUp_btn .btn {
  width: 100%;
  margin-top: 4%;
  border-radius: 17px;
  font-weight: 600;
  font-size: 19px;
  font-family: "Cafe24Ssurround";
}

#signUp_btn2 {
  background-color: #fff;
  color: #f89604;
  border: 3px solid;
}

/* -------------------------------------동의란---------------------------- */
#point {
  color: rgb(19, 110, 38);
  font-size: 13px;
}

#Store_modal_btn,
#Store_modal_btn2 {
  padding: 1% 3%;
  font-size: 11px;
  background-color: rgb(180, 183, 199);
  border-color: rgb(180, 183, 199);
  float: right;
}

.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #f89604;
}

#signUp .custom-control {
  font-family: "KoPubWorldDotumLight";
  margin-bottom: 10px;
  margin-top: 20px;
  text-align: left;
}

#signUp .custom-control a {
  padding-left: 8px;
}

.checkbox {
  margin-top: 50px;
  margin-left: -17px;
  margin-right: -17px;
  margin-bottom: 25px;
}

.checkbox .custom-control-label {
  display: block;
}
</style>
