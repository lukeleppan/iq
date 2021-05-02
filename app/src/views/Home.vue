<template>
  <div class="home">
    <Header />
    <Hero />
    <ActiveProblemSection />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ActiveProblemSection from "@/components/ActiveProblemSection.vue";
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: { Header, Hero, ActiveProblemSection },
  methods: {
    ...mapActions(["fetchJWT"]),
  },
  mounted() {
    this.fetchJWT();
  },
};
</script>

<style scoped></style>
