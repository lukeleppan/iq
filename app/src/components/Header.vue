<template>
  <header>
    <GithubLink />
    <AuthCentre />
  </header>
</template>

<script>
import GithubLink from "@/components/GithubLink";
import AuthCentre from "@/components/AuthCentre";

export default {
  name: "Header",
  props: {
    title: String,
  },
  components: {
    GithubLink,
    AuthCentre,
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 10px;
}
</style>
