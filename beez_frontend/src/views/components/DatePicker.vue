<template>
  <Datepicker
    class="date"
    v-model="selectedDate"
    lang="ko"
    v-bind="sendDate(selectedDate)"
    :disabled-start-date="disabledStartDate"
    placeholder="시작날짜"
  />
</template>

<script>
// special component - vue file

import "vue-datepicker-ui/lib/vuedatepickerui.css";
import VueDatepickerUi from "vue-datepicker-ui";

export default {
  components: {
    Datepicker: VueDatepickerUi,
  },
  data() {
    return {
      selectedDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      disabledStartDate: {
        to: new Date("08.01.2021"),
        from: new Date(),
      },
    };
  },
  methods: {
    sendDate(selectedDate) {
      this.$emit("date1", Math.floor(new Date(selectedDate) / 1000));
    },
  },
};
</script>
<style>
.v-calendar .input-field input {
  padding-left: 40px;
  padding-right: 0px;
  text-align: center;
}
</style>
