<template>
  <div class="password">
    <div class="div_space"></div>
    <keypad />
  </div>
</template>

<script>
import keypad from "@/views/components/Keypad.vue";
export default {
  name: "password",
  data() {
    return {};
  },
  components: { keypad },
  methods: {},
};
</script>
<style>
.password {
  width: 100vw;
  height: 100vh;
  background-color: #ffde02;
}
.div_space {
  height: 23vh;
}
.input_pass {
  background-color: #ffde02;
  color: #fff;
  border: none;
  text-align: center;
  width: 10%;
  font-size: 18px;
}
</style>
