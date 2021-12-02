<template>
  <div class="keypad" @click.stop="show = true">
    <div class="text_pass">보안 비밀번호{{ text }}</div>
    <div>
      <div class="font-red">{{ errMsg }}</div>
    </div>
    <form>
      <span v-if="value.length <= 5">
        <span v-for="values in value" :key="values">
          <input
            class="input_pass"
            type="password"
            :value="values"
            readonly
            autocomplete="off"
          />
        </span>
      </span>
      <span v-else>
        <span v-for="i in 6" :key="i">
          <input
            class="input_pass"
            type="password"
            :value="value[i - 1]"
            readonly
          />
          <span v-if="i == 6" v-on="checkPass()"></span>
        </span>
      </span>
    </form>
    <VueNumericKeypad
      :value.sync="value"
      :show.sync="this.show"
      :options="this.options"
    />
  </div>
</template>

<script>
import VueNumericKeypad from "vue-numeric-keypad";
import axios from "axios";
const storage = window.sessionStorage;
const crypto = require("crypto");
export default {
  name: "keypad",
  components: {
    VueNumericKeypad,
  },
  data() {
    return {
      text: "",
      errMsg: "",
      password: "",
      value: "",
      show: 1,
      options: {
        keyRandomize: true,
        randomizeClick: true,
        fixDeleteKey: false,
      },
    };
  },
  beforeCreate() {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    );
    axios
      .get("/api/pass/confirm")
      .then((res) => {
        if (res.data.data.failCount >= 5) {
          this.$toaster.error(
            "보안 비밀번호 시도 횟수 초과입니다.\n 고객센터 문의 바랍니다."
          );
          this.$router.push("/Main");
        }
      })
      .catch(() => {
        this.text = " 설정";
        console.warn = console.error = () => {};
      });
  },
  created() {
    document.addEventListener(
      "click",
      function() {
        this.show = 0;
      }.bind(this)
    );
  },

  methods: {
    checkPass() {
      if (this.text === "") {
        (async () => {
          axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "token"
          );
          await axios
            .post("/api/pass/check", { password: this.value })
            .then(() => {
              console.warn = console.error = () => {};
              storage.setItem(
                "complete",
                crypto
                  .createHash("sha256")
                  .update("complete")
                  .digest("hex")
              );
              this.$router.push(storage.getItem("next"));
              storage.removeItem("next");
            })
            .catch((err) => {
              this.value = "";
              this.errMsg = "PASSWORD를 다시 확인해주세요";
              console.log(err);
              console.warn = console.error = () => {};
            });
        })();
      } else if (storage.getItem("passCheck")) {
        //저장시킨다. 여기서도 if(세션값이 존재) -> if(세션값과 다를 경우 err메세지 출력), else(세션값과 같은 경우 디비저장)
        if (storage.getItem("passCheck") != this.value) {
          storage.clear("passCheck");
          this.value = "";
          this.text = "설정";
          this.errMsg = "보안 비밀번호가 다릅니다. 다시 입력해주세요.";
        } else {
          //console.log("디비에저장");
          (async () => {
            axios.defaults.headers.common[
              "Authorization"
            ] = localStorage.getItem("token");
            await axios
              .post("/api/pass/storage", { passwordCheck: this.value })
              .then(() => {
                //console.log(res);
                this.$toaster.success(
                  "보안 비밀번호가 설정 되었습니다. 다시 입력해주세요."
                );
                storage.removeItem("passCheck");
                this.value = "";
                this.text = "";
                this.errMsg = "";
              })
              .catch(() => {
                this.errMsg = "다시 한번 입력해 주세요.";
                this.value = "";
                console.warn = console.error = () => {};
              });
          })();
        }
      } else {
        //else if(세션값이 존재하지 않으면 세션으로 저장 후 재입력)
        storage.setItem("passCheck", this.value);
        this.text = " 재입력";
        this.value = "";
        this.errMsg = "";
      }
    },
  },
};
</script>
<style>
/*-----------------폰트, @media---------------------------- */
@font-face {
  font-family: "BCcardB";
  src: url("../../fonts/BCcardL.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}
.keypad {
  font-family: BCcardB;
  text-align: center;
}
.text_pass {
  top: 30%;
  font-size: 35px;
  color: #fff;
}
.font-red {
  top: 150%;
  font-weight: bolder;
  color: rgb(226, 38, 38);
  font-size: 13px;
}
</style>
