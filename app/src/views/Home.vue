<template>
  <div class="home">
    <Header />
    <Hero />
    <ActiveProblemSection />
    <Leaderboard />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ActiveProblemSection from "@/components/ActiveProblemSection";
import Leaderboard from "@/components/Leaderboard";
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: { Header, Hero, ActiveProblemSection, Leaderboard },
  methods: {
    ...mapActions(["fetchJWT"]),
  },
  mounted() {
    this.fetchJWT();
  },
};
</script>

<style scoped></style>
