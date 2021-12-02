<template>
  <!-- 결제 완료 모달 -->
  <div centered id="finish">
    <div>
      <div class="div_text">
        <table>
          <tr>
            <td>종이 대신</td>
            <td rowspan="2" class="tb_text">
              <FontAwesomeIcon :icon="faUser" />
            </td>
          </tr>
          <tr>
            <td>스마트 폰으로</td>
          </tr>
        </table>
      </div>
      <b-card class="end_start">
        <li>
          <h4>
            카드결제정보<FontAwesomeIcon
              :icon="faAngleRight"
              style="float:right"
            />
          </h4>
        </li>
        <li>
          <h4>
            현금영수증정보<FontAwesomeIcon
              :icon="faAngleRight"
              style="float:right"
            />
          </h4>
        </li>
      </b-card>
    </div>
    <b-card id="card_main2">
      <b-card class="title_bz">
        <h2>
          전자영수증
        </h2>
      </b-card>
      <div class="detail_bz">
        <table class="table_align">
          <!-- <tbody class="table_tbody">
            <tr>
              <td class="text">주문번호</td>
              <td class="amount">
                <a>
                   {{ $route.params.tx }} 
                </a>
              </td>
            </tr>
          </tbody> -->

          <tbody class="table_tbody">
            <tr>
              <td class="text">날짜</td>
              <td class="amount">
                <a>
                  {{ today }}
                </a>
              </td>
            </tr>
          </tbody>

          <tbody class="table_margin">
            <tr>
              <td class="text">빈</td>
            </tr>
          </tbody>
          <tbody class="table_tbody">
            <tr>
              <td class="text">현금</td>
              <td class="amount">
                <a> {{ $route.params.won | comma }} 원 </a>
              </td>
            </tr>
            <tr>
              <td class="text">BEEZ</td>
              <td class="amount">
                <a v-if="$route.params.beez == 0"> 0 BZ</a>
                <a v-else> {{ $route.params.beez | comma }} BZ </a>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="bar"></td>
            </tr>
            <tr>
              <td class="text">총 결제금액</td>
              <td class="amount">
                <a>
                  {{
                    ($route.params.won + $route.params.beez * 100) | comma
                  }}
                  원
                </a>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <FontAwesomeIcon :icon="faBarcode" class="barcode" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-card>
    <div class="note"></div>
    <div class="complete_btn">
      <b-button class="mt-3" href="/Main">완료</b-button>
    </div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "loading",
  props: {
    won: {
      type: String,
      default: "0",
    },
    beez: {
      type: String,
      default: "0",
    },
    price: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      faAngleRight,
      faUser,
      faBarcode,
      today:
        new Date().getFullYear() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getDate(),
    };
  },
  components: { FontAwesomeIcon },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
<style>
@font-face {
  font-family: "BCcardB";
  src: url("../../fonts/BCcardL.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "GmarketSansTTFMedium";
  src: url("../../fonts/GmarketSansTTFMedium.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}
#finish {
  font-family: GmarketSansTTFMedium;
  background-color: #ffde028c;
  color: #76512c;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
}

#finish .btn {
  color: #fff;
  background-color: #76512c93;
  width: 23%;
}
/* -------------------------------모달창 css------------------------------------- */

#finish .btn {
  color: #76512c;
  background-color: #ffde028c;
  width: 25%;
  margin: 10%;
  font-size: 14px;
  font-weight: 700;
  border-radius: 15px;
}
.note h4 {
  color: red;
  font-size: 12px;
  font-weight: 600;
  padding-top: 10px;
}

.note {
  color: red;
  font-weight: 600;
  font-size: 12px;
  padding: 5px 0 5px 0;
  margin: 7% 12% 0 12%;
  border-radius: 15px;
}

/* 비즈 */
#card_main2 {
  font-family: GmarketSansTTFMedium;
  background-color: fff;
  margin: 7% 12% 0 12%;
}

.detail_bz {
  color: #3a39308c;
  font-weight: 700;
  padding: 15px 20px;
}

.amount {
  text-align: right;
  padding-right: 10%;
}

.text {
  text-align: left;
  padding-left: 10%;
}

.title_bz h2 {
  font-size: 15px;
  font-weight: 900;
  color: #76512c;
  padding: 0;
  text-align: left;
}

.title_bz {
  background-color: #fff;
  padding: 4%;
  height: 45px;
}

.title_bz img {
  width: 10%;
  margin-right: 5px;
}

.card-body {
  padding: 0;
}

.table_align {
  text-align: center;
  width: 100%;
  height: 100%;
}
.td {
  text-align: right;
}
.barcode {
  width: 25%;
  font-size: 150px;
}
.table_margin {
  visibility: hidden;
}
.bar {
  border-bottom: 2px dashed #3a39308c;
  padding: 2%;
}
.complete_btn {
  background-color: #fff;
}
/*--------------------------공지사항/q&a-------------------------- */
.end_start {
  font-family: "GmarketSansTTFMedium";
  background-color: #fff;
}

.end_start .card-body {
  font-weight: 600;
  padding: 0;
}

.end_start li {
  padding: 6% 6% 4% 4%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  width: 80%;
  text-align: left;
  display: inline-block;
  color: black;
}

.end_start h4 {
  padding: 0;
}
/*--------------------------종이대신스마트폰으로-------------------------- */
.div_text {
  background-color: #fff;
  font-size: 20px;
  color: rgb(230, 178, 38);
  padding: 0px 15%;
  text-align: left;
  margin: auto;
}
.tb_text {
  width: 55%;
  text-align: right;
  color: rgb(230, 178, 38);
}
</style>
