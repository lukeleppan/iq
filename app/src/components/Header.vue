<template>
  <header>
    <DLModeSwitcher />
    <AuthCentre />
  </header>
</template>

<script>
import DLModeSwitcher from "@/components/DLModeSwitcher";
import AuthCentre from "@/components/AuthCentre";

export default {
  name: "Header",
  props: {
    title: String,
  },
  components: {
    DLModeSwitcher,
    AuthCentre,
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 10px;
}
</style>
