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
export default {
  name: "ActiveProblemSection",
  data() {
    return {
      problem: {},
    };
  },
  computed: {
    hasData() {
      return this.problem.problem_id;
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
