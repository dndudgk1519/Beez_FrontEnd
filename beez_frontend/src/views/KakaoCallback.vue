<script>
export default {
  name: "KakaoCallback",
  methods: {
    getParameterByName: function(name) {
      name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
      return results == null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    // kakaoLogin() {
    //   window.Kakao.Auth.login({
    //     scope: "profile_nickname, account_email",
    //     success: function(authObj) {
    //       console.log(authObj);
    //       window.Kakao.API.request({
    //         url: "/v2/user/me",
    //         success: (res) => {
    //           const kakao_account = res.kakao_account;
    //           console.log(kakao_account);
    //         },
    //       });
    //     },
    //   });
    // },
  },
  beforeMount() {
    const code = this.getParameterByName("code");
    alert(code);

    var details = {
      grant_type: "authorization_code",
      client_id: "f365b9be89b19c81976ff70e7c19b2b6",
      redirect_uri: "https://192.168.219.153:8081/kakao/callback",
      code: code,
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        alert(JSON.stringify(data));
        window.Kakao.Auth.setAccessToken(data.access_token);
        // test : Token
        alert(window.Kakao.Auth.getAccessToken());
        location.href = "/Main";
      });
  },
};
</script>
