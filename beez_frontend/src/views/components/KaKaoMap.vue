<template>
  <div class="Map_font">
    <div id="map"></div>
    <div class="button-group">
      <button @click="myLocation" style="mapButton">내 현재위치 찾기</button>
    </div>

    <div>
      <!-- 받아온 loadedStoreList 반복문으로 뿌림 -->
      <ul
        id="User_information"
        v-for="(store, i) in this.loadedStoreList"
        :key="i"
      >
        <table class="reviewTable">
          <tr>
            <td class="td_box">
              <li>가게이름: {{ store.nickName }}</li>

              <!-- 0.1이 100미터 인듯 -->
              <li v-if="store.distance < 0.1">
                거리가 100m미만 입니다.
              </li>
              <li v-else>거리: 약 {{ Math.ceil(store.distance * 1000) }}m</li>
            </td>

            <td>
              <tr rowspan="2" class="ReviewGoBtn">
                <button class="reviewLoadBtn" @click="reviewLoad(i)">
                  리뷰보기
                </button>
              </tr>
            </td>
          </tr>
        </table>
      </ul>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "KakaoMap",
  components: {

  },
  data() {
    return {
      map: null,
      storeList: [],
      markers: [],
      infowindow: null,
      loadedStoreList: [],
      storeAddress: "",
      storeNickName: "",
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=e88cd6b095840bc1ac80ea68b145d702";
      document.head.appendChild(script);
    }
    /*------------------------------------------------------------*/
  },
  methods: {
    /*맵생성*/
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 7,
        // 500m 기준 6이어야함
      };
      this.map = new kakao.maps.Map(container, options);
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      this.map.relayout();
    },
    /*주변 가게찾기*/

    // mylat은 내위치 mylon은 내경도 백엔드(mapController랑 통신함)
    async findStore(mylat, mylon) {
      //  카카오에서 제공하는 기본마커 구성
      var imgSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      var imgSize = new kakao.maps.Size(24, 35);
      var markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

      // 이거 지우면 안됌
      let self = this;

      // 백엔드에 들어갈 파라미터
      var params = {
        lat: mylat,
        lon: mylon,
      };

      await axios
        .post("/api/StoreList", params)
        .then((res) => {
          //db에서 받아온 store정보 저장하는 부분
          res.data.forEach(function(pos) {
            var storeName = pos.nickName;
            var latlng = new kakao.maps.LatLng(pos.lat, pos.lon);
            var storeAddress = pos.walletAddress;
            var storeNickName = pos.nickName;
            self.loadedStoreList = res.data;

            //카카오에서 제공하는 마커 구성
            var marker = new kakao.maps.Marker({
              map: self.map,
              position: latlng,
              title: storeName,
              image: markerImage,
            });

            //카카오에서 마커 클릭 시 뜨는 오버레이 구성
            var customOverlay = new kakao.maps.CustomOverlay({
              position: latlng,
              xAnchor: 0.5,
              yAnchor: 1.05,
            });

            /*마커클릭 시 오버레이 구성 정의*/
            var content = document.createElement("div");
            content.className = "overlaybox";

            /* <div class="overlaybox"> 
    <div id = "storesName">

    </div>  

    <div class = "overlaycontent"> 

    </div>
</div> */
            var contentName = document.createElement("div");
            contentName.id = "storesName";
            contentName.appendChild(document.createTextNode(storeName));
            content.appendChild(contentName);

            // var buttonContainer = document.createElement("div");
            // buttonContainer.className = "overlaycontent";
            // content.appendChild(buttonContainer);

            var closeBtn = document.createElement("button");
            closeBtn.id = "closeBtn";
            closeBtn.appendChild(document.createTextNode("닫기"));

            // buttonContainer.appendChild(reviewBtn);
            content.appendChild(closeBtn);

            // var content = document.createElement("div");
            // content.className = "overlaybox";
            // content.appendChild(document.createTextNode(storeName));

            // var buttonContainer = document.createElement("div");
            // buttonContainer.className = "overlaycontent";
            // // buttonContainer.appendChild(document.createTextNode(storeReview)))db에 저장한 리뷰변수로 이름만 바꾸면됨
            // content.appendChild(buttonContainer);

            // var reviewBtn = document.createElement("button");
            // reviewBtn.appendChild(document.createTextNode("리뷰보러가기"));
            // var closeBtn = document.createElement("button");
            // closeBtn.appendChild(document.createTextNode("닫기"));

            // buttonContainer.appendChild(reviewBtn);
            // buttonContainer.appendChild(closeBtn);

            //닫기버튼 클릭 시 overlay값 null로 설정
            closeBtn.onclick = function() {
              customOverlay.setMap(null);
            };

            //review보러가기 버튼 클릭 시 이동할 페이지 정의
            // reviewBtn.onclick = function() {
            //   self.$router.push({
            //     name: "ReviewList",
            //     params: {
            //       storeAddress: storeAddress,
            //       storeNickName: storeName,
            //     },
            //   });
            // };

            //맵 클릭 시 오버레이 지우는 함수

            if (!customOverlay.setMap(null)) {
               kakao.maps.event.addListener(self.map, "click", function() {
                 closeBtn.onclick();
               });
            }

            //마커클릭 시 오버레이 띄우는 함수
            kakao.maps.event.addListener(marker, "click", function() {
              customOverlay.setMap(self.map);
            });
            customOverlay.setContent(content);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /*내위치 찾기 */
    // displayMarker(locPosition, message)
    displayMarker(locPosition) {
      const marker = new kakao.maps.Marker({
        map: this.map,
        position: locPosition,
      });

      // const iwContent = message,
      const iwRemoveable = true;

      // const infowindow = new kakao.maps.InfoWindow({
      // content: iwContent,
      // removeable: iwRemoveable,
      // });

      // infowindow.open(this.map, marker);
      this.map.setCenter(locPosition);
    },
    reviewLoad(key) {
      if(window.location.pathname === "/StoreList"){
        this.$router.push({
          name: "ReviewList",
          params: {
            storeNickName: this.loadedStoreList[key].nickName,
            storeAddress: this.loadedStoreList[key].walletAddress,
          },
        });
      }
      else if(window.location.pathname === "/nonUserStoreList"){
        this.$router.push({
          name: "nonUserReviewList",
          params: {
            storeNickName: this.loadedStoreList[key].nickName,
            storeAddress: this.loadedStoreList[key].walletAddress,
          },
        });
      }
    },
    myLocation() {
      // this가 안먹어서 이거 지우면 안됨
      let self = this;

      // 내 위도 경도 받아서 kakao에 세팅하는 함수
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          const lat = position.coords.latitude,
            lon = position.coords.longitude;
          var mylat = lat;
          var mylon = lon;
          const locPosition = new kakao.maps.LatLng(mylat, mylon);
          // message =
          //   '<div class = "location" style = "padding:5px; "> 현재위치 </div>';

          // self.displayMarker(locPosition, message);
          self.displayMarker(locPosition);
          self.findStore(mylat, mylon);
        });
      } else {
        // 내 위도경도 못받아왔을대는 기본으로 세팅된 맵위치로 띄워줌
        const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
        // message = "현재 위치를 찾을 수 없습니다.";
        this.displayMarker(locPosition, message);
        this.displayMArker(locPostion);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*-----------------폰트, @media---------------------------- */
@font-face {
  font-family: "BCcardB";
  src: url("../../fonts/BCcardL.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}
.Map_font {
  font-family: BCcardB;
}
/*----------------지도 css---------------------------- */

#map {
  position: relative;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 56.25%;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: auto;
  color: #fff;
  background-color: #ffbd07d8;
  font-size: 17px;
  width: 40%;
  display: block;
  border: #fff solid;
  font-weight: 900;
  margin-bottom: 8%;
  margin-top: 8%;
}
#User_information {
  font-size: 14px;
  font-weight: 900;
  color: #76512c;
  padding: 1.5% 4%;
  background-color: #fdfded;
  box-shadow: 1px 1px 2px 2px rgb(235, 231, 231);
  width: 70%;
  margin: 2% auto;
  border-radius: 10px;
}

#User_information .reviewTable {
  width: 100%;
}
.ReviewGoBtn {
  margin-left: 50px;
}
.reviewLoadBtn {
  font-size: 14px;
  font-weight: 900;
  color: #76512c;
  background-color: #ffde02;
  box-shadow: 1px 1px 2px 2px rgb(235, 231, 231);
  border-radius: 15px;
  width: 108%;
  margin-left: 5%;
  border: 3px solid #ffde02;
  margin-top: 15%;
  float: right;
}
.td_box {
  width: 80%;
}

/* .overlaycontent {

} */
</style>
