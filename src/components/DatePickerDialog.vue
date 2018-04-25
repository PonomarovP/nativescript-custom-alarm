<template>
  <Page>
    <ActionBar title="Pick a date" />
    <StackLayout>
      <TimePicker v-model="selectedTime" @loaded="onPickerLoaded"/>
      <StackLayout orientation="horizontal" horizontalAlignment="center">
        <Button text="Ok" @tap="accept()" style="margin-right: 20px;" />
        <Button text="Cancel" @tap="$modal.close(false)" />
      </StackLayout>
    </StackLayout>
  </Page>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    accept() {
      this.$modal.close(this.selectedTime);
    },
    onPickerLoaded(args) {
      let time = this.$options.time.split(":");
      this.hour = Number(time[0]);
      this.minute = Number(time[1]);
      let timePicker = args.object;
      timePicker.hour = this.hour;
      timePicker.minute = this.minute;
    }
  }
};
</script>
<style scoped>

</style>

