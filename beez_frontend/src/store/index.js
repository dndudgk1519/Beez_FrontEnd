import Vue from "vue";
import Vuex from "vuex";
import { PAYMENT_ABI } from "@/contract/ContractABI.js";
import { CONTRACT_ADDRESS } from "@/contract/ContractAddress.js";
import { PROVIDER } from "@/contract/Provider.js";
import { ethers } from "ethers";
import axios from "axios";

const provider = PROVIDER;
Vue.use(Vuex);

export default new Vuex.Store({
  //vue의 data
  state: {
    nickName: localStorage.getItem("nickName"),
    //사용자 Main 화면
    wonBalace: 0,
    wonOfMon: 0,
    incOfMon: 0,
    bzOfMon: 0,
    bzBalace: 0,
    //한달 충전, 혜택 가능 금액(금액 변경 용이하게)
    maxWonCharge: 2000000, //한달 충전가능금액
    maxIncentive: 500000, //한달 혜택가능금액
    incentiveRate: 100,
    //paymentList
    reviewContents: [],
    storeList: [],
    //소상공인 Main 화면
    cashSales: 0,
    myCash: 0,
    tokenSales: 0,
    exchangeOfMon: 0,
    tokenSalesMon: 0,
    myBz: 0,
  },
  //mutations : 상태값을 변경시키는 로직 state를 수정
  mutations: {
    //사용자 Main 화면
    main: async (state) => {
      const address = localStorage.getItem("address");

      const contracts = new ethers.Contract(
        CONTRACT_ADDRESS,
        PAYMENT_ABI,
        provider
      );
      await contracts
        .userMainLoad(address)
        .then((res) => {
          state.wonBalace = res["wonBalace"];
          state.wonOfMon = res["WonOfMon"];
          state.incOfMon = res["IncOfMon"];
          state.bzOfMon = res["BzOfMon"] / state.incentiveRate;
          state.bzBalace = res["BzBalace"] / state.incentiveRate;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //사용자 리뷰 리스트
    paymentList: async (state, payload) => {
      //const contract = new web3.eth.Contract(PAYMENT_ABI, CONTRACT_ADDRESS);
      var visitor = "";
      if (payload.address) {
        visitor = payload.address;
      } else {
        visitor = localStorage.getItem("address");
      }
      const contracts = new ethers.Contract(
        CONTRACT_ADDRESS,
        PAYMENT_ABI,
        provider
      );
      await contracts
        .getReview(visitor, payload.start, payload.end)
        .then((reviewContents) => {
          state.reviewContents = reviewContents;
        });

      let arrJson = [];

      await state.reviewContents.map((element) => {
        arrJson.push({ address: element[payload.page] });
      });
      const retAddress = JSON.stringify(arrJson);
      //console.log("retStr", retStr);

      const params = { wallet_address: JSON.parse(retAddress) };
      //console.log(params);

      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "token"
      );

      await axios
        .post("/api/find/address", params)
        .then((res) => {
          state.storeList = res.data.data;
          //console.log(state.storeList);
        })
        .catch(() => {
          //console.log(err);
        });
    },
    //소상공인 Main 화면
    storeMain: async (state) => {
      const address = localStorage.getItem("address");

      const contracts = new ethers.Contract(
        CONTRACT_ADDRESS,
        PAYMENT_ABI,
        provider
      );
      await contracts.recipientMainLoad(address).then((res) => {
        state.cashSales = res["WonOfMon"]; //현금매출
        state.myCash = res["wonBalace"]; //출금가능 현금
        state.exchangeOfMon = res["IncOfMon"]; //이달의 출금금액
        state.tokenSales = res["BzOfMon"]; //비즈매출
        state.tokenSalesMon = res["BzOfMon"] / state.incentiveRate; //이번달비즈
        state.myBz = res["BzBalace"] / state.incentiveRate; //환전가능 비즈
      });
    },
  },
  //비동기를 사용하거나 여러 mutations 연달아 실행할때,
  actions: {},
  getters: {},
});
