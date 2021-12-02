<template>
  <b-modal id="modal1" hide-footer title="BEEZ 서비스 이용약관 내용">
    <ul>
      <p>BEEZ 서비스를 이용 하실 고객 여러분을 환영합니다.</p>
      <p>
        BEEZ 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은
        다양한 BEEZ 서비스의 이용과 관련하여 서비스 회원가입 시 상황을 설명하며,
        아울러 여러분의 BEEZ 서비스 이용에 도움이 될 수 있는 유익한 정보를
        포함하고 있습니다.
      </p>
      <p>
        BEEZ 서비스를 이용하시거나 BEEZ 서비스 회원으로 가입하실 경우 여러분은
        본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을
        내시어 주의 깊게 살펴봐 주시기 바랍니다.
      </p>
      <p>
        BEEZ는 소상공인과 소비자의 거래 서비스를 제공하고 여러분의 생활에
        편리함을 더할 수 있는 다양한 서비스를 제공하고 있습니다. 여러분은 PC,
        휴대폰 등 인터넷 이용이 가능한 각종 단말기를 통해 각양각색의 서비스를
        자유롭게 이용하실 수 있으며, 개별 서비스들의 구체적인 내용은 각 서비스
        상의 안내, 공지사항, Q&A, 웹고객센터(이하 ‘고객센터’) 도움말 등에서 쉽게
        확인하실 수 있습니다.
      </p>
      <p>반드시 회원으로 가입하셔야 BEEZ 서비스를 이용할 수 있습니다.</p>
      <p>
        여러분은 본 약관을 읽고 동의하신 후 회원 가입을 신청하실 수 있으며,
        BEEZ는 이에 대한 승낙을 통해 회원 가입 절차를 완료하고 여러분께 서비스
        이용 계정(이하 ‘계정’)을 부여합니다. 계정이란 회원이 서비스에 로그인한
        이후 이용하는 각종 서비스 이용 이력을 회원 별로 관리하기 위해 설정한
        회원 식별 단위를 말합니다. 회원은 자신의 계정을 통해 좀더 다양한
        서비스를 보다 편리하게 이용할 수 있습니다.
      </p>
    </ul>
    <b-button class="modal_checkbox_back" @click="$bvModal.hide('modal1')"
      >확 인</b-button
    >
  </b-modal>
</template>
<script>
export default {};
</script>
<style>
/* -------------------------------모달창 css------------------------------------- */
#modal1,
#modal2 {
  font-family: "KoPubWorldDotumLight";
}

.modal_checkbox_back {
  padding: 1% 45%;
  display: block;
  background-color: rgb(180, 183, 199);
  border-color: rgb(180, 183, 199);
  color: #fff;
  margin-top: 40px;
}
.modal-header {
  margin: 3%;
  text-align: center;
}
.modal-body {
  font-size: 12px;
}
</style>
