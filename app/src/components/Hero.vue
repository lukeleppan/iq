<template>
  <div>
    <h1 class="ikhwezi-title" :style="{ color: color }">iKhwezi</h1>
    <h1 class="quiz-title">Quiz</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Hero",
  data() {
    return {
      color: "rgb(70, 70, 255)",
    };
  },
  computed: {
    ...mapGetters(["jwt", "jwtData"]),
  },
  mounted() {
    this.setColor();
  },
  methods: {
    setColor() {
      if (this.jwt) {
        switch (this.jwtData.house) {
          case 1:
            this.color = "rgb(255, 50, 50)";
            break;
          case 2:
            this.color = "rgb(70, 70, 255)";
            break;
          case 3:
            this.color = "rgb(0, 0, 0)";
            break;

          default:
            break;
        }
      } else {
        const randInt = Math.floor(Math.random() * 3);
        switch (randInt) {
          case 0:
            this.color = "rgb(255, 50, 50)";
            break;
          case 1:
            this.color = "rgb(70, 70, 255)";
            break;
          case 2:
            this.color = "rgb(0, 0, 0)";
            break;

          default:
            break;
        }
      }
    },
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
