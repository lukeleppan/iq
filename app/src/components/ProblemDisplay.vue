<template>
  <div id="main">
    <div class="top-problem">
      <img class="image" :src="problemImageUrl" alt="image" />
      <div class="info">
        <div class="title-author-wrapper">
          <h1 class="title">
            <span>{{ problemTitle }}</span>
            <span v-if="easy" class="easy">Easy {{ problemType }}</span>
            <span v-else-if="moderate" class="moderate"
              >Moderate {{ problemType }}
            </span>
            <span v-else-if="hard" class="hard">Hard {{ problemType }}</span>
            <span v-else-if="extreme" class="extreme"
              >Extreme {{ problemType }}
            </span>
          </h1>
          <h3 class="author">by {{ problemAuthor }}</h3>
        </div>
        <p class="description">{{ problemDescription }}</p>
      </div>
    </div>
    <div class="answer-wrapper">
      <Answer />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Answer from "./Answer.vue";
export default {
  name: "ProblemDisplay",
  computed: {
    ...mapGetters([
      "problemID",
      "problemTitle",
      "problemDescription",
      "problemType",
      "problemDifficulty",
      "problemImageUrl",
      "problemAuthor",
      "problemActiveDate",
    ]),
    easy() {
      return this.problemDifficulty === 0 ? true : false;
    },
    moderate() {
      return this.problemDifficulty === 1 ? true : false;
    },
    hard() {
      return this.problemDifficulty === 2 ? true : false;
    },
    extreme() {
      return this.problemDifficulty === 3 ? true : false;
    },
  },
  components: { Answer },
};
</script>

<style scoped>
#main {
  display: flex;
  flex-direction: column;
  border: 2px solid rgb(95, 95, 95);
  border-radius: 0.5rem;
  width: 100%;
  min-width: 200px;
  max-width: 500px;
  margin: 0px 5px;
  justify-content: space-between;
}

.image {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}
.difficulty-wrapper {
  display: flex;
  flex-direction: row;
}
.info {
  padding: 0.5rem;
}
.title-author-wrapper {
  margin-bottom: 20px;
}
.title {
  font-size: 24px;
  margin-bottom: 5px;
}
.author {
  font-size: 16px;
  color: hsl(0, 0%, 10%);
}
.easy {
  padding: 5px 10px;
  margin-left: 5px;
  border-radius: 0.2rem;
  border-color: #01b051;
  background-color: #01b051;
  color: white;
  font-size: 14px;
  word-wrap: nowrap;
  white-space: nowrap;
}
.moderate {
  padding: 5px 10px;
  margin-left: 5px;
  border-radius: 0.2rem;
  border-color: #e6e600;
  background-color: #e6e600;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  word-wrap: nowrap;
  white-space: nowrap;
}
.hard {
  padding: 5px 10px;
  margin-left: 5px;
  border-radius: 0.2rem;
  border-color: rgb(255, 145, 0);
  background-color: rgb(255, 145, 0);
  color: rgba(0, 0, 0, 0.863);
  font-size: 14px;
  word-wrap: nowrap;
  white-space: nowrap;
}
.extreme {
  padding: 5px 7px;
  margin-left: 5px;
  border-radius: 0.2rem;
  border-color: #ff0100;
  background-color: #ff0100;
  color: white;
  font-size: 14px;
  word-wrap: nowrap;
  white-space: nowrap;
}

.points-wrapper {
  text-align: end;
  padding: 10px 25px;
}
.points {
  font-weight: bold;
}
.answer-wrapper {
  display: flex;
  justify-content: center;
}
.top-problem {
  display: flex;
  flex-direction: column;
}

@media only screen and (max-width: 850px) {
  #main {
    margin-bottom: 5px;
  }
}
</style>
