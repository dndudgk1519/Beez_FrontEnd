<template>
  <Datepicker
    class="date"
    v-model="selectedDate"
    lang="ko"
    v-bind="sendDate(selectedDate)"
    :disabled-start-date="disabledStartDate"
    placeholder="마지막 날짜"
    position="right"
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
  props: {
    propsDate1: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedDate: new Date(),
      disabledStartDate: {
        to: new Date(),
        from: new Date(),
      },
    };
  },
  methods: {
    sendDate(selectedDate) {
      this.disabledStartDate.to = this.propsDate1;
      this.$emit("date2", Math.floor(new Date(selectedDate) / 1000) + 86399);
    },
  },
};
</script>
<style>
.v-calendar .input-field input {
  padding-left: 40px;
  padding-right: 0px;
}
</style>
