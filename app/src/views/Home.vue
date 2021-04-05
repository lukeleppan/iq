<template>
  <div class="home">
    <Header title="iQ" />
    <Hero />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default {
  name: "Home",
  components: { Header, Hero },
};
</script>

<style scoped></style>
