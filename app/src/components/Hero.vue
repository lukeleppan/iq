<template>
  <div>
    <h1 class="ikhwezi-title">iKhwezi</h1>
    <h1 class="quiz-title">Quiz</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Hero",
  computed: {
    ...mapGetters(["jwt", "jwtData"]),
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cabin&display=swap");

div {
  display: grid;
  place-items: center;

  margin: 3rem;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.ikhwezi-title {
  font-family: Cabin;
  font-size: 3rem;
  color: cornflowerblue;
}

.quiz-title {
  font-family: Cabin;
  font-weight: bolder;
  font-size: 5rem;

  line-height: 0.65;
}
</style>
