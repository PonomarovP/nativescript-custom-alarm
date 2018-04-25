<template>
  <StackLayout orientation="horizontal">
    <LabelSelector v-for="(day, index) in weekdays" :key="index" v-model="day.isChecked" :text="day.name" :ref="day.ref" :checked="day.isChecked" />
  </StackLayout>
</template>

<script>
import LabelSelector from "./LabelSelector";

export default {
  data() {
    return {
      weekdays: [
        { name: "Пн", isChecked: false, ref: "Monday" },
        { name: "Вт", isChecked: false, ref: "Tuesday" },
        { name: "Ср", isChecked: false, ref: "Wednesday" },
        { name: "Чт", isChecked: false, ref: "Thursday" },
        { name: "Пт", isChecked: false, ref: "Friday" },
        { name: "Сб", isChecked: false, ref: "Saturday" },
        { name: "Вс", isChecked: false, ref: "Sunday" }
      ],
      day_number: {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
        Sunday: 7
      }
    };
  },
  props: {
    checked: []
  },
  beforeMount() {
    if (this.$props.checked) {
      let checked_array = this.$props.checked;
      if (checked_array.length === 7) {
        for (let i = 0; i < checked_array.length; i++) {
          this.weekdays[i].isChecked = checked_array[i] === 1 ? true : false;
        }
      }
    }
  },
  watch: {
    weekdays: {
      handler: function(value) {
        let result = this.weekdays.map(a => a.isChecked);
        this.$emit("input", result);
      },
      deep: true
    }
  },
  methods: {
    setStates(states) {}
  },
  components: {
    LabelSelector: LabelSelector
  }
};
</script>

<style>

</style>


