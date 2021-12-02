<template>
  <footer>
    <div class="footer">
      <div class="footer_wrap">
        <div class="tel_box">
          <div class="ly_inner">
            <ul>
              <li>
                <a>고객센터</a>
                <br />
                <a>1544-5000</a>
              </li>
              <li>
                <a>카드문의</a>
                <br />
                <a> 1544-6000</a>
              </li>
              <li>
                <a>카드분실신고</a>
                <br />
                <a>1544-7000</a>
              </li>
              <li>
                <a>카드신청</a>
                <br />
                <a>1544-8000</a>
              </li>
            </ul>
            <li>
              <p>(주말, 공휴일 제외 09:00~16:00)</p>
            </li>
          </div>
        </div>
      </div>
      <div class="customer_wrap">
        <div class="ly_inner">
          <div class="customer_link">
            <ul class="customer_list">
              <li>
                <a href="javascript:void(0)" role="button" v-b-modal.modal1>
                  이용약관
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" role="button" v-b-modal.modal2>
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a href="#" role="button">
                  소비자보호포털
                </a>
              </li>
              <li>
                <a href="#" role="button">
                  Q&A
                </a>
              </li>
            </ul>
            <div class="sns_wrap">
              <ul class="snsbox">
                <li class="sns01">
                  <a
                    href="https://www.facebook.com"
                    role="button"
                    target="_blank"
                    onClick="openAppUrl(this.href);return false;"
                    >페이스북</a
                  >
                </li>
                <li class="sns02">
                  <a
                    href="https://section.blog.naver.com/"
                    role="button"
                    onClick="openAppUrl(this.href);return false;"
                    >블로그</a
                  >
                </li>
                <li class="sns03">
                  <a
                    href="https://pf.kakao.com"
                    role="button"
                    onClick="openAppUrl(this.href);return false;"
                    >카카오톡</a
                  >
                </li>
                <li class="sns04">
                  <a
                    href="https://www.youtube.com"
                    role="button"
                    onClick="openAppUrl(this.href);return false;"
                    >유튜브</a
                  >
                </li>
                <li class="sns05">
                  <a
                    href="https://www.twitter.com"
                    role="button"
                    onClick="openAppUrl(this.href);return false;"
                    >트위터</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="footer_group">
        <address class="address_wrap">
          <div class="ly_inner">
            <div class="address_section">
              <p class="address">
                서울특별시 금천구 가산디지털1로 168 (우림라이온스밸리 A동 8층
                804호)
              </p>
              <p class="company_num">
                사업자등록번호 205-47-13465
              </p>
              <p class="copyright">
                Copyright 2021 All Right Reserved By BlockB | (주)BlockB
              </p>
            </div>
          </div>
        </address>
      </div>
    </div>
    <useConditions />
    <privacyPolicy />
  </footer>
</template>
<script>
import useConditions from "@/views/components/UseConditions.vue";
import privacyPolicy from "@/views/components/PrivacyPolicy.vue";
export default {
  components: {
    useConditions,
    privacyPolicy,
  },
};
</script>

<style>
/* ----------------------------폰트---------------------------------- */
@font-face {
  font-family: "BCcardL";
  src: url("../fonts/BCcardL.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}
.footer {
  background-color: #f7f8f9;
  color: #000;
}
.footer_group {
  font-family: "BCcardB";
}

@media (max-width: 650px) {
  .tel_box ul li a {
    font-size: 12px;
  }
  .tel_box li p {
    font-size: 12px;
  }

  .address_section p {
    font-size: 11px;
  }

  .customer_link ul li a {
    font-size: 12px;
  }
}

/* ---------------------------footer_wrap-------------------------- */
.footer {
  margin-top: 30px;
}

.footer_wrap {
  width: 100%;
  font-family: "BCcardB";
  display: block;
  position: relative;
  margin: 0;
  padding-bottom: 0 0 40px 0;
}

.tel_box {
  display: block;
  position: relative;
  padding-top: 17px;
  text-align: center;
}

.tel_box::before {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  z-index: 0;
  left: 0;
  top: -1px;
  border-top: solid #ddd 1px;
}

/* .tel_box::after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  z-index: 0;
  left: 0;
  bottom: -1px;
  border-top: solid #ddd 1px;
} */

/* .tel_box ul li::before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: calc(50% - 6px);
  width: 1px;
  height: 11px;
  border-top: #ddd;
} */

.ly_inner {
  width: 100%;
  display: block;
  position: relative;
  margin: 0 auto;
  padding: 0;
}

.tel_box ul {
  display: -webkit-flex;
  position: relative;
  width: 100%;
  /* margin: 0 -19px; */
  padding: 0;
}

.tel_box li {
  /* padding: 10px 0px 0px; */
  display: inline-block;
  position: relative;
  width: 100%;
  margin: 0;
  text-align: center;
  flex: 1 1 auto;
}
.tel_box li a {
  font-size: 16px;
  /* font-weight: 700; */
  display: inline;
  position: relative;
}

.tel_box p {
  font-size: 14px;
}
/* ---------------------------address_section-------------------------- */
.address_wrap {
  display: block;
  position: relative;
  padding: 0;
  font-style: normal;
  padding-top: 60px;
}
.address_section {
  display: block;
  position: relative;
  margin: 0 0 0 0;
  padding: 0;
  text-align: center;
}
.address {
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  font-size: 14px;
}
.company_num {
  display: inline-block;
  position: relative;
  margin: 0;
  padding: 0;
  font-size: 14px;
}
.copyright {
  display: block;
  position: relative;
  margin: 2px 0 0 0;
  padding-bottom: 20px;
  font-size: 13px;
  color: #999;
}

/* ---------------------------customer_wrap-------------------------- */
.customer_wrap {
  font-family: "BCcardB";
}

.customer_link {
  display: block;
  position: relative;
  width: 100%;
  margin: 0;
  padding: 10px 0 26px;
  text-align: center;
}

.customer_link ul {
  display: block;
  position: relative;
}

.customer_list li::before {
  content: "";
  display: block;
  position: absolute;
  right: 0;
  top: calc(50% - 6px);
  width: 1px;
  height: 11px;
  background-color: #ddd;
}

.customer_link li {
  display: inline-block;
  position: relative;
  width: auto;
  margin: 0;
  text-align: center;
}
.customer_link li a {
  display: block;
  position: relative;
  margin: 0;
  padding: 0 10px;
  font-size: 16px;
}

/*------------------------sns------------------------------ */
.sns_wrap {
  display: block;
  position: absolute;
  padding-top: 10px;
  left: 47%;
  margin-left: -65px;
}

.snsbox {
  padding: 0;
  top: 5px;
}

.snsbox li {
  display: block;
  position: relative;
  float: left;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
}

.snsbox li + li {
  margin-left: 19px;
}

.snsbox li a {
  background-size: 100% auto;
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  text-indent: -9999px;
}

.sns01 a {
  background-image: url("../assets/footer/sns01.png");
  width: 24px;
  height: 100%;
}
.sns02 a {
  background-image: url("../assets/footer/sns02.png");
  width: 24px;
  height: 100%;
}
.sns03 a {
  background-image: url("../assets/footer/sns04.png");
  width: 24px;
  height: 88%;
}
.sns04 a {
  background-image: url("../assets/footer/sns05.png");
  width: 24px;
  height: 100%;
}
.sns05 a {
  background-image: url("../assets/footer/sns06.png");
  width: 24px;
  height: 100%;
}
</style>
