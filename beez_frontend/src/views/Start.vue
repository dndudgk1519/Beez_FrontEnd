<template>
  <div id="start">
    <div>
      <div class="li_btn text-center">
        <div id="login_tab">
          <b-tabs content-class="mt-3" justified>
            <!-- 지역주민 로그인 탭 -->
            <b-tab title="지역주민 시작하기" active id="user_tab">
              <ul id="explain">
                <li>
                  <h1>WELCOME TO</h1>
                  <h1 id="ex_title">
                    BEEZ
                    <FontAwesomeIcon :icon="faBitcoin" id="user_icon" />
                  </h1>
                </li>
                <li>
                  <h5>끝이 없는 혜택, BZ 토큰이 와르르!</h5>
                  <h5>BEEZ와 함께 지역 상권을 맘껏 이용해보세요.</h5>
                </li>
              </ul>

              <b-form class="user_login">
                <b-input-group>
                  <b-input-group-append>
                    <FontAwesomeIcon
                      :icon="faUserCheck"
                      style="color:#ffbd07"
                      size="lg"
                    />
                  </b-input-group-append>
                  <b-form-input
                    class="enter_form"
                    placeholder="EMAIL"
                    type="email"
                    v-model="id"
                  ></b-form-input>
                </b-input-group>
              </b-form>

              <b-form class="user_login">
                <b-input-group>
                  <b-input-group-append>
                    <FontAwesomeIcon
                      :icon="faLock"
                      style="color:#ffbd07"
                      size="lg"
                    />
                  </b-input-group-append>
                  <b-form-input
                    class="enter_form"
                    placeholder="PASSWORD"
                    type="password"
                    v-model="password"
                    autocomplete="off"
                  />
                </b-input-group>
              </b-form>

              <li>
                <b-button id="login_btn" @click="loginBtn">
                  Login
                </b-button>
              </li>
              <li>
                <b-button href="/SignUp" id="join_btn">
                  Sign-up
                </b-button>
              </li>
              <li>
                <a id="font-red">{{ errMsg }}</a>
              </li>
              <!-- <a @click="kakaoLogin">
                <img src="../assets/start_main/kakao_login.png" />
              </a> -->
            </b-tab>

            <!-- 소상공인 로그인 탭 -->
            <b-tab title="소상공인 시작하기" id="store_tab">
              <ul id="explain">
                <li>
                  <h1>WELCOME TO</h1>
                  <h1 id="ex_title">
                    BEEZ
                    <FontAwesomeIcon :icon="faBitcoin" id="user_icon" />
                  </h1>
                </li>
                <li>
                  <h5>
                    소상공인을 위한 지역화폐, BEEZ
                  </h5>
                  <h5>꿀 떨어지는 혜택 가득한 BEEZ를 이용해보세요.</h5>
                </li>
              </ul>

              <b-form class="store_login">
                <b-input-group>
                  <b-input-group-append>
                    <FontAwesomeIcon
                      :icon="faUserCheck"
                      style="color:#0d4890"
                      size="lg"
                    />
                  </b-input-group-append>
                  <b-form-input
                    class="enter_form"
                    placeholder="EMAIL"
                    type="email"
                    v-model="storeId"
                  ></b-form-input>
                  <!-- v-model="store_id" -->
                </b-input-group>
              </b-form>

              <b-form class="store_login">
                <b-input-group>
                  <b-input-group-append>
                    <FontAwesomeIcon
                      :icon="faLock"
                      style="color:#0d4890"
                      size="lg"
                    />
                  </b-input-group-append>
                  <b-form-input
                    class="enter_form"
                    placeholder="PASSWORD"
                    type="password"
                    v-model="storePassword"
                    autocomplete="off"
                  />
                  <!-- v-model="store_password" -->

                  <!-- @click="storeLoginBtn" -->
                </b-input-group>
              </b-form>

              <li>
                <b-button id="login_btn" @click="storeLoginBtn">
                  Login
                </b-button>
              </li>

              <li>
                <a id="font-red">{{ StoreErrMsg }}</a>
              </li>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>

    <div id="explain_btn">
      <b-card class="ex_01" @click="loadNonUserStore">
        <li>
          <a>
            BEEZ 지역화폐
          </a>
          <a id="highlight">
            가맹점 찾기
          </a>
        </li>
        <img src="../assets/start_main/icon01.png" />
      </b-card>
      <b-card class="ex_02" @click="apply">
        <li>
          <a>
            국민지원금
          </a>
          <a id="highlight">
            온라인 신청하기
          </a>
        </li>
        <img src="../assets/start_main/icon02.png" />
      </b-card>
    </div>

    <div>
      <b-carousel
        id="start_carousel"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide>
          <img src="../assets/start_main/start3.png" style="width:100%" />
        </b-carousel-slide>

        <b-carousel-slide>
          <img src="../assets/start_main/start4.png" style="width:100%" />
        </b-carousel-slide>

        <b-carousel-slide>
          <img src="../assets/start_main/start2.png" style="width:100%" />
        </b-carousel-slide>

        <b-carousel-slide>
          <img src="../assets/start_main/start5.png" style="width:100%" />
        </b-carousel-slide>
      </b-carousel>
    </div>

    <div class="explain_bz">
      <b-card-group deck>
        <b-card header="BEEZ 지역화폐 소식">
          <ul>
            <li>
              <p>충전, 구매, 리뷰 모두 혜택이?</p>
              <h4>BEEZ지역화폐 지역주민 활용 가이드</h4>
            </li>
            <img src="../assets/start_main/icon07.png" />
          </ul>

          <ul>
            <li>
              <p>골목 상권의 활성화를 위한,</p>
              <h4>BEEZ지역화폐 소상공인 활용 가이드</h4>
            </li>
            <img src="../assets/start_main/icon08.png" />
          </ul>
        </b-card>
      </b-card-group>
    </div>

    <div>
      <b-card class="end_start">
        <li>
          <h4>
            공지사항<FontAwesomeIcon :icon="faAngleRight" style="float:right" />
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
import axios from "axios";
import "url-search-params-polyfill";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "start",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      id: "",
      password: "",
      userRole: "USER",
      showAlert: false,
      errMsg: "",
      storeId: "",
      storePassword: "",
      storeRole: "STORE",
      StoreShowAlert: false,
      StoreErrMsg: "",

      //아이콘
      faUserCheck,
      faLock,
      faBitcoin,
      faAngleRight,
    };
  },
  methods: {
    //사용자 로그인 화면
    async loginBtn() {
      if (this.id == "") {
        this.showAlert = true;
        this.errMsg = "이메일을 입력해주세요";
        return;
      } else if (this.password == "") {
        this.showAlert = true;
        this.errMsg = "비밀번호를 입력해주세요";
        return;
      } else {
        var params = {
          email: this.id,
          password: this.password,
          role: this.userRole,
        };
        //세션 초기화
        localStorage.clear();
        await axios
          .post("/api/login", params)
          .then((res) => {
            localStorage.setItem("token", res.headers.authorization);
            localStorage.setItem("email", params.email);
            localStorage.setItem("nickName", res.data.data[1]);
            localStorage.setItem("address", res.data.data[2]);
            localStorage.setItem("role", this.userRole);
            if (this.$route.path !== "/Main") this.$router.push("/Main");
          })
          .catch(() => {
            this.showAlert = true;
            this.errMsg = "EMAIL 또는 PASSWORD를 다시 확인해주세요";
          });
      }
    },
    //소상공인 로그인 화면
    async storeLoginBtn() {
      if (this.storeId == "") {
        this.StoreShowAlert = true;
        this.StoreErrMsg = "아이디를 입력해주세요";
        return;
      } else if (this.storePassword == "") {
        this.StoreShowAlert = true;
        this.StoreErrMsg = "비밀번호를 입력해주세요";
        return;
      } else {
        var params = {
          email: this.storeId,
          password: this.storePassword,
          role: this.storeRole,
        };
        //세션 초기화
        localStorage.clear();
        await axios
          .post("/api/login", params)
          .then((res) => {
            //여기서 로그인 했을때 존재하지 않으면 존재하지 않는 아이디 입니다.라는 노티 띄우고 존재하면 쿠키 삽입 후 페이지 이동.
            localStorage.setItem("token", res.headers.authorization);
            localStorage.setItem("email", params.email);
            localStorage.setItem("nickName", res.data.data[1]);
            localStorage.setItem("address", res.data.data[2]);
            localStorage.setItem("role", this.storeRole);
            if (this.$route.path !== "/StoreMain")
              this.$router.push("/StoreMain");
          })
          .catch(() => {
            this.StoreShowAlert = true;
            this.StoreErrMsg = "ID 또는 PASSWORD를 다시 확인해주세요";
          });
      }
    },

    // 카카오 로그인
    // async kakaoLogin() {
    //   Kakao.init("e88cd6b095840bc1ac80ea68b145d702");
    //   Kakao.isInitialized();

    //   console.log("Kakao.isInitialized()", Kakao.isInitialized());

    //   await Kakao.Auth.login({
    //     scope: "profile_nickname, account_email",
    //     success: function(authObj) {
    //       // const kakao_token = authObj.access_token;
    //       // console.log(kakao_token);
    //       Kakao.API.request({
    //         url: "/v2/user/me",
    //         success: (res) => {
    //           const kakao_account = res.kakao_account;
    //           const kakao_email = kakao_account.email;
    //           // console.log(kakao_account);
    //           // console.log(kakao_token);

    //           var params = {
    //             email: kakao_email,
    //             role: "USER",
    //             // token: kakao_token,
    //           };
    //           axios
    //             .post("/api/login/kakao", params)
    //             .then((res) => {
    //               // console.log(res);
    //               localStorage.clear();
    //               localStorage.setItem("token", res.headers.authorization);
    //               localStorage.setItem("email", params.email);
    //               localStorage.setItem("nickName", res.data.data[1]);
    //               localStorage.setItem("address", res.data.data[2]);
    //               localStorage.setItem("role", params.role);
    //               if (this.$router.path !== "/Main") this.$router.push("/Main");
    //             })
    //             .catch(() => {
    //               this.showAlert = true;
    //               this.errMsg = "EMAIL 또는 PASSWORD를 다시 확인해주세요";
    //             });
    //         },
    //       });
    //     },
    //   });
    // },

    //슬라이드
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    loadNonUserStore() {
      this.$router.push("/nonUserStoreList");
    },
    apply() {
      window.open("https://www.mois.go.kr/2021emgnc/main.html");
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
@font-face {
  font-family: "GmarketSansTTFLight";
  src: url("../fonts/GmarketSansTTFLight.ttf") format("woff");
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
  font-family: "GmarketSansTTFBold";
  src: url("../fonts/GmarketSansTTFBold.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}
/*--------------------------로그인-------------------------- */
/*----지역/소상 탭 */
#login_tab {
  margin: 5%;
  font-family: "GmarketSansTTFBold";
}

.nav-tabs .nav-link {
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
}

.nav-tabs .nav-link.active {
  border-color: #aba8a2 #aba8a2 #fff;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  color: #ffbd07;
  font-weight: 600;
}
.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link {
  color: #0d4890;
}

/*----로그인 전 beez 설명-- */
#explain {
  border-radius: 20px;
  padding-top: 15px;
}

#user_tab #explain {
  background-color: #f8f3e19a;
}

#store_tab #explain {
  background-color: #e6ecf79a;
}

#login_tab h1 {
  font-family: "Cafe24Ssurround";
  font-weight: bold;
  display: flex;
  margin-left: 5%;
}

#login_tab h5 {
  font-family: "GmarketSansTTFMedium";
  /* font-weight: bolder; */
  display: flex;
  margin-left: 4%;
  font-size: 14px;
}

#ex_title {
  font-size: 35px;
  -webkit-text-stroke-width: 0.4mm;
}

#user_tab #ex_title {
  color: #ffbd07;
  -webkit-text-stroke-color: #ffbd07;
}

#store_tab #ex_title {
  color: #0d4890;
  -webkit-text-stroke-color: #0d4890;
}

#user_icon {
  margin-left: 10px;
}

/*----로그인 폼-- */
.user_login {
  padding-top: 5%;
  padding-left: 6%;
  padding-right: 6%;
  font-family: Cafe24SsurroundAir;
}

.store_login {
  padding-top: 5%;
  padding-left: 7%;
  padding-right: 7%;
  font-family: Cafe24SsurroundAir;
}

.user_login .input-group {
  background-color: #fff3c5;
  /* border: #fbca47 solid 2px; */
  border-radius: 20px;
}

.store_login .input-group {
  background-color: #b9d9ff;
  /* border: #fbca47 solid 2px; */
  border-radius: 20px;
}

.user_login .input-group-append {
  margin: 12px;
  display: block;
}

.store_login .input-group-append {
  margin: 12px;
  display: block;
}

.user_login .enter_form {
  height: 50px;
  padding: 0 20px;
  background-color: #fff3c5;
  font-size: 15px;
  width: 77%;
}

.store_login .enter_form {
  height: 50px;
  padding: 0 20px;
  background-color: #b9d9ff;
  font-size: 15px;
  width: 77%;
}

.user_login .form-control {
  background-color: #fff3c5;
}

.store_login .form-control {
  background-color: #b9d9ff;
}

#login_btn {
  width: 55%;
  font-size: 17px;
  /* padding: 2px 0; */
  border-radius: 17px;
  margin-top: 30px;
}

#user_tab #login_btn {
  color: #fff;
  background-color: #ffbd07;
}

#store_tab #login_btn {
  color: #fff;
  background-color: #0d4890;
}

#join_btn {
  width: 55%;
  font-size: 17px;
  /* padding: 2px 0; */
  border-radius: 17px;
}

#user_tab #join_btn {
  color: #ffbd07;
  background-color: #fff;
  border: 2px solid #ffbd07;
}

#store_tab #join_btn {
  color: #0d4890;
  background-color: #fff;
  border: 2px solid #0d4890;
}

#font-red {
  font-family: "GmarketSansTTFLight";
  font-weight: bolder;
  color: rgb(226, 38, 38);
  font-size: 13px;
}

/*--------------------------지역화폐 관련 정보 버튼-------------------------- */
#explain_btn {
  padding-left: 4.5%;
  padding-right: 4.5%;
  color: #fff;
  font-family: "Cafe24SsurroundAir";
  font-size: 17px;
  margin-top: 17%;
  margin-bottom: 3%;
}

#highlight {
  font-family: "Cafe24Ssurround";
  margin-left: 6px;
  font-size: 19px;
}

#explain_btn img {
  width: 12%;
  float: right;
}

#explain_btn li {
  display: inline-block;
}

.ex_01 {
  margin-bottom: 3%;
}

.ex_01 .card-body:hover,
.ex_01 .card-body:focus {
  box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
  transform: translateY(-0.25em);
}
.ex_01 .card-body {
  padding: 0%;
  padding-top: 2%;
  padding-left: 5%;
  padding-right: 5%;
  background-color: #6d36f8;
  border-radius: 8px;
}

.ex_02 .card-body:hover,
.ex_02 .card-body:focus {
  box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
  transform: translateY(-0.25em);
}
.ex_02 .card-body {
  padding: 0%;
  padding-top: 2%;
  padding-left: 5%;
  padding-right: 5%;
  background-color: #f3a600;
  border-radius: 8px;
}
/*--------------------------지역화폐 소식-------------------------- */
.explain_bz {
  margin-top: 15%;
  margin-bottom: 10%;
  font-family: "GmarketSansTTFLight";
  position: relative;
  padding-left: 4.5%;
  padding-right: 4.5%;
}

.explain_bz .card {
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.explain_bz img {
  width: 15%;
  float: right;
  margin-right: 5px;
}

.explain_bz .card-header {
  padding-left: 7%;
  padding-right: 6%;
  font-family: "GmarketSansTTFMedium";
  font-size: 16px;
}

.explain_bz .card-body {
  padding: 2%;
}

.explain_bz p {
  margin-bottom: 0;
}

.explain_bz h4 {
  padding: 0;
  font-family: "GmarketSansTTFMedium";
}

.explain_bz li {
  display: inline-block;
}

.explain_bz ul {
  display: inline-block;
  margin-top: 15px;
  margin-bottom: 15px;
}
/*--------------------------하단 슬라이드-------------------------- */
#start_carousel img {
  width: 100%;
  display: inline-block;
  border-radius: 10px;
}

#start_carousel {
  margin-bottom: 10%;
  padding-left: 4.5%;
  padding-right: 4.5%;
}

/*--------------------------공지사항/q&a-------------------------- */
.end_start {
  font-family: "GmarketSansTTFMedium";
}

.end_start .card-body {
  font-weight: 600;
  padding: 0;
}

.end_start li {
  padding-left: 6%;
  padding-right: 6%;
  padding-top: 4%;
  padding-bottom: 4%;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}

.end_start h4 {
  padding: 0;
}
</style>
