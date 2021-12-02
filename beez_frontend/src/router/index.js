import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const storage = window.sessionStorage;

const routes = [
  {
    //시작 페이지
    path: "/",
    name: "Start",
    components: {
      default: () => import("@/views/Start.vue"),
      header: () => import("@/layout/StartHeader.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
  },
  //가입하지 않은 회원도 리뷰 볼 수 있는 페이지 하나 만들기
  {
    //리뷰LIST
    path: "/nonUserReviewList",
    components: {
      default: () => import("@/views/ReviewList.vue"),
      header: () => import("@/layout/StartHeader.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
    name: "nonUserReviewList",
    props: true,
  },
  {
    //맵
    path: "/nonUserStoreList",
    components: {
      default: () => import("@/views/StoreList.vue"),
      header: () => import("@/layout/StartHeader.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
  },
  //회원가입 페이지
  {
    path: "/SignUp",
    components: {
      default: () => import("@/views/SignUp.vue"),
      header: () => import("@/layout/StartHeader.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
  },
  //사용자 페이지
  {
    path: "/Main",
    components: {
      default: () => import("@/views/Main.vue"),
      header: () => import("@/layout/Header.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/ChargeList",
    components: {
      default: () => import("@/views/ChargeList.vue"),
      header: () => import("@/layout/Header.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
  },
  {
    path: "/PaymentList",
    components: {
      default: () => import("@/views/PaymentList.vue"),
      header: () => import("@/layout/Header.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
  },
  {
    path: "/PasswordCheck",
    components: {
      default: () => import("@/views/PasswordCheck.vue"),
    },
    beforeEnter: function(to, from, next) {
      if (
        storage.getItem("complete") !==
        "eebbf6457e46a7f63acdf9b97390f790ba443d60cfa44b607da7e5c40aa1cc1d"
      ) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/Charge",
    components: {
      default: () => import("@/views/Charge.vue"),
      header: () => import("@/layout/Header.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
    beforeEnter: function(to, from, next) {
      if (
        storage.getItem("complete") !==
        "eebbf6457e46a7f63acdf9b97390f790ba443d60cfa44b607da7e5c40aa1cc1d"
      ) {
        storage.setItem("next", "/Charge");
        next("/PasswordCheck");
      } else {
        next();
      }
    },
  },
  {
    path: "/Payment",
    components: {
      default: () => import("@/views/Payment.vue"),
      header: () => import("@/layout/Header.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
    beforeEnter: function(to, from, next) {
      if (
        storage.getItem("complete") !==
        "eebbf6457e46a7f63acdf9b97390f790ba443d60cfa44b607da7e5c40aa1cc1d"
      ) {
        storage.setItem("next", "/Payment");
        next("/PasswordCheck");
      } else {
        next();
      }
    },
  },
  {
    path: "/PaymentCompleted",
    components: {
      default: () => import("@/views/components/PaymentCompleted.vue"),
      header: () => import("@/layout/Header.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
    name: "paymentCompleted",
    props: true,
  },
  {
    path: "/StoreList",
    components: {
      default: () => import("@/views/StoreList.vue"),
      header: () => import("@/layout/Header.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
  },
  {
    //리뷰LIST
    path: "/ReviewList",
    components: {
      default: () => import("@/views/ReviewList.vue"),
      header: () => import("@/layout/Header.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
    name: "ReviewList",
    props: true,
  },
  // 소상공인 페이지
  {
    path: "/StoreMain",
    components: {
      default: () => import("@/views/StoreMain.vue"),
      header: () => import("@/layout/StoreHeader.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
  },
  {
    path: "/StoreReviewList",
    components: {
      default: () => import("@/views/StoreReviewList.vue"),
      header: () => import("@/layout/StoreHeader.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
  },
  {
    path: "/StoreQR",
    components: {
      default: () => import("@/views/StoreQR.vue"),
      header: () => import("@/layout/StoreHeader.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
  },
  {
    path: "/StorePasswordCheck",
    components: {
      default: () => import("@/views/StorePasswordCheck.vue"),
    },
    beforeEnter: function(to, from, next) {
      if (
        storage.getItem("complete") !==
        "eebbf6457e46a7f63acdf9b97390f790ba443d60cfa44b607da7e5c40aa1cc1d"
      ) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/StoreExchangeToken",
    components: {
      default: () => import("@/views/StoreExchangeToken.vue"),
      header: () => import("@/layout/StoreHeader.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
    beforeEnter: function(to, from, next) {
      if (
        storage.getItem("complete") !==
        "eebbf6457e46a7f63acdf9b97390f790ba443d60cfa44b607da7e5c40aa1cc1d"
      ) {
        storage.setItem("next", "/StoreExchangeToken");
        next("/StorePasswordCheck");
      } else {
        next();
      }
    },
  },
  {
    path: "/StoreWithdrawal",
    components: {
      default: () => import("@/views/StoreWithdrawal.vue"),
      header: () => import("@/layout/StoreHeader.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
    beforeEnter: function(to, from, next) {
      if (
        storage.getItem("complete") !==
        "eebbf6457e46a7f63acdf9b97390f790ba443d60cfa44b607da7e5c40aa1cc1d"
      ) {
        storage.setItem("next", "/StoreWithdrawal");
        next("/StorePasswordCheck");
      } else {
        next();
      }
    },
  },
  {
    path: "/StoreWithdrawalList",
    components: {
      default: () => import("@/views/StoreWithdrawalList.vue"),
      header: () => import("@/layout/StoreHeader.vue"),
      footer: () => import("@/layout/Footer.vue"),
    },
  },
  { path: "*", redirect: "/" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
