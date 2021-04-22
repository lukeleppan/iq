<template>
  <div class="main">
    <section v-if="hasData"></section>
    <div v-else>
      <h1 class="coming-soon-heading">Hold On...</h1>
      <h3 class="coming-coon-subtitle">
        A new problem will be here tomorrow at 15:00.
      </h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "ActiveProblemSection",
  data() {
    return {
      problem: {},
    };
  },
  computed: {
    ...mapGetters(["jwt"]),
    hasData() {
      return this.problem.problem_id;
    },
  },
  methods: {
    getProblem() {
      const { VUE_APP_API_URL } = process.env;
      axios
        .get({
          method: "get",
          url: VUE_APP_API_URL + "/api/problem/active",
        })
        .then((res) => {
          if(false){};
          this.users = res.data.users;
        })
        .catch((error) => {
          if (error) {
            this.$router.replace("/");
          }
        });
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
}

section {
  display: flex;
  flex-direction: column;
  border: 2px solid rgb(95, 95, 95);
  border-radius: 0.5rem;
  max-width: 500px;
}
</style>
