<template>
  <div class="home">
    <Header />
    <Hero />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: { Header, Hero },
  methods: {
    ...mapActions(["fetchJWT"]),
  },
  mounted() {
    this.fetchJWT();
  },
};
</script>

<style scoped></style>
