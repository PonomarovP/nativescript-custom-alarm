<template>
  <Page>
    <ActionBar title="Pick a type" />
    <StackLayout width="300">
      <ListPicker :items="types" @selectedIndexChange="selectedIndexChanged" />
      <StackLayout v-if="itemIndex < 3" orientation="horizontal">
        <WeekdaySelector :checked="weekdaysChecked" v-model="weekdays" />
      </StackLayout>
      <StackLayout v-else-if="itemIndex == 3" orientation="horizontal" horizontalAlignment="center">
        <ListPicker :items="numbers" @selectedIndexChange="intervalChanged" style="height: 70;" />
        <Label class="label"> дней</Label>
      </StackLayout>
      <StackLayout v-else-if="itemIndex == 4" orientation="horizontal" horizontalAlignment="center">
        <ListPicker :items="numbers" @selectedIndexChange="quantityChanged" style="height: 70" />
        <Label class="label"> через</Label>
        <ListPicker :items="numbers" @selectedIndexChange="intervalChanged" style="height: 70" />
        <Label class="label"> дней</Label>
      </StackLayout>
      <StackLayout orientation="horizontal" horizontalAlignment="center" style="margin-top: 15px">
        <Button text="Ok" @tap="accept()" style="margin-right: 20px;" />
        <Button text="Cancel" @tap="$modal.close(false)" />
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script>
import WeekdaySelector from "./WeekdaySelector";

const alarmTypes = [
  "По определенным дням недели",
  "По будням",
  "По выходным",
  "Каждые ...",
  "Каждые ... через ..."
];

export default {
  data() {
    return {
      types: alarmTypes,
      numbers: Array.from(Array(31).keys()).splice(1),
      weekdays: [],
      itemIndex: 0,
      weekdaysChecked: [0, 0, 0, 0, 0, 0, 0],
      interval: 0,
      quantity: 0
    };
  },
  methods: {
    selectedIndexChanged(e) {
      this.itemIndex = e.value;
      if (this.itemIndex == 1) {
        //Working days
        this.weekdaysChecked = [1, 1, 1, 1, 1, 0, 0];
      }
      if (this.itemIndex == 2) {
        //Holidays
        this.weekdaysChecked = [0, 0, 0, 0, 0, 1, 1];
      }
    },
    intervalChanged(e) {
      this.interval = e.value+1;
    },
    quantityChanged(e) {
      this.quantity = e.value+1;
    },
    accept() {
      let text = "";
      if (this.itemIndex < 3) {
        text = this.toWords(this.weekdaysChecked);
        this.$modal.close({
          type: this.itemIndex,
          text: text,
          weekdays: this.weekdaysChecked
        });
      } else if (this.itemIndex == 3) {
        text = `Каждые ${this.interval} дней`;
        this.$modal.close({
          type: this.itemIndex,
          text: text,
          interval: this.interval
        });
      } else {
        text = `${this.quantity} через ${this.interval}`;
        this.$modal.close({
          type: this.itemIndex,
          text: text,
          interval: this.interval,
          quantity: this.quantity
        });
      }
    },
    toWords(arr) {
      let words = ["Пн", ", Вт", ", Ср", ", Чт", ", Пт", ", Сб", ", Вс"];
      let result = "";
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
          result += words[i];
        }
      }
      return result;
    }
  },
  components: {
    WeekdaySelector: WeekdaySelector
  }
};
</script>

<style scoped>
.label {
  font-size: 16pt;
  height: 70px;
}
</style>