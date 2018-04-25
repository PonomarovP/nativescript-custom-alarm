<template>
    <Label @tap="onTapEvent()" v-bind:style="{ background: bgColor, color: textColor }">{{ text }}</Label>
</template>

<script>
export default {
  data() {
    return {
      isChecked: false,
      text: "Empty",
      bgColor: "rgba(0,0,0,0)",
      textColor: "black",
      active: "#73a5e7",
      inactive: "rgba(0,0,0,0)",
      setState:{
        type: Function,
        required: false
      }
    };
  },
  props: {
    checked: "",
    text: "",
    color: "",
    activeColor: "",
    inactiveColor: ""
  },
  mounted() {
    this.text = this.$props.text || this.text;
    this.$props.checked ? this.setActive() : this.setInactive();
    this.textColor = this.$props.color || this.textColor;
  },
  methods: {
    onTapEvent() {
      if (this.isChecked) {
        this.setInactive();
      } else {
        this.setActive();
      }
      this.$emit('input', this.isChecked);
    },
    setActive() {
      this.isChecked = true;
      this.bgColor = this.$props.activeColor || this.active;
    },
    setInactive() {
      this.isChecked = false;
      this.bgColor = this.$props.inactiveColor || this.inactive;
    },
    setState(state){
      if(state){
        this.setActive();
      }else{
        this.setInactive();
      }
    }
  }
};
</script>

<style scoped>
Label {
  color: black;
  width: 100px;
  font-size: 20pt;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0); /*transparent*/
}
.checked {
  background: #73a5e7;
}
</style>