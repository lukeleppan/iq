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
  metaInfo: {
    title: "iKhwezi Quiz",
    htmlAttrs: {
      lang: "en-US",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "description",
        content: "The Interhouse iKhwezi Quiz!",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },
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
