<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Дубильник">
    </ActionBar>
    <ScrollView>
      <StackLayout backgroundColor="#3c495e">
        <StackLayout orientation="horizontal">
          <Label class="label">Активировать будильник</Label>
          <Switch v-model="GlobalAlarm" />
        </StackLayout>
        <StackLayout v-for="(alarm, key) in alarms" :key="key" justifyContent="space-around" backgroundColor="#526170" class="card">
          <StackLayout orientation="horizontal">
            <Label @tap="alarmTap(alarm)" class="label clock">{{ alarm.time }}</Label>
            <Switch horizontalAlignment="right" v-model="alarm.enabled" />
          </StackLayout>
          <Label class="label" @tap="typeTap(alarm)">{{ alarm.type_text }}</Label>
          <Label class="label">{{ alarm.sound_text }}</Label>
        </StackLayout>
        <Fab :onTap="fabTap" horizontalAlignment="right" class="fab-button"></Fab>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
const appSettings = require("application-settings");
import Fab from "./Fab";
import DatePickerDialog from "./DatePickerDialog";
import AlarmTypeDialog from "./AlarmTypeDialog";

//const audio = require('nativescript-audio');
// const player = new audio.TNSPlayer();
import { TNSPlayer }  from "nativescript-audio";

// import LabelSelector from './LabelSelector'
// import WeekdaySelector from './WeekdaySelector.vue';

export default {
  data() {
    let time = new Date();
    return {
      GlobalAlarm: false,
      alarms: [
        {
          time:
            this.addZeros(time.getHours()) +
            ":" +
            this.addZeros(time.getMinutes()),
          enabled: true,
          type_text: "Пока никакой закономерности",
          sound_text: "Без звука. Зачем он вообще?"
        }
      ]
    };
  },
  watch: {},
  mounted() {
    if (appSettings.hasKey("alarms")) {
      this.data = JSON.parse(appSettings.getString("alarms"));
    }
  },
  methods: {
    fabTap() {
      console.log("Tap");
      let time = new Date();
      this.alarms.push({
        time:
          this.addZeros(time.getHours()) +
          ":" +
          this.addZeros(time.getMinutes()),
        enabled: true,
        type: "",
        sound: "nosound"
      });
    },
    alarmTap(alarm) {
      this.$showModal(DatePickerDialog, { context: alarm }).then(res => {
        if (!res) return;
        if (typeof res.getMonth !== "function") return;
        alarm.time =
          this.addZeros(res.getHours()) + ":" + this.addZeros(res.getMinutes());
      });
    },
    typeTap(alarm) {
      console.log("Tap");
      this.$showModal(AlarmTypeDialog, { context: alarm }).then(res => {
        if (!res) return;
        console.log(res);
        alarm.type_text = res.text;
      });
    },
    addZeros(value) {
      if (value > 9) return value;
      return "0" + value;
    }
  },
  components: {
    Fab: Fab,
    DatePickerDialog: DatePickerDialog,
    // LabelSelector:LabelSelector,
    // WeekdaySelector:WeekdaySelector
  }
};
</script>

<style scoped>
.hello-world {
  margin: 20;
}

.label {
  color: white;
  font-size: 20pt;
  margin: 5px;
}

.fab-button {
  margin: 15;
}

.clock {
  font-size: 36pt;
}
</style>
