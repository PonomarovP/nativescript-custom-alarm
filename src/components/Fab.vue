<template>
    <Button @tap="onTap" textWrap="true" class="fab" text="+" />
</template>

<script>
export default {
  data() {},
  props: {
    onTap: {
      type: Function,
      required: true
    }
  }
};
</script>

<style scoped>
.fab {
  background-color: #ff4081;
  width: 70;
  height: 70;
  color: white;
  font-size: 20;
  border-radius: 35;
}
</style>