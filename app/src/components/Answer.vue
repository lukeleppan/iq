<template>
  <div id="main-answer">
    <div class="cooldown-wrapper" v-if="onCooldown">
      <p class="points-wrapper">
        Points Available: <span class="points">{{ points }}</span>
      </p>
      <div class="cooldown">
        <span class="cooldown-text">You can answer again {{ cooldown }}</span>
      </div>
    </div>
    <div class="correct-wrapper" v-else-if="correct">
      <div class="correct">
        <i class="fas fa-check-circle fa-5x success-icon"></i>
        <p class="correct-text">Problem Solved</p>
      </div>
    </div>
    <div class="answer" v-else-if="jwt">
      <form @submit.prevent="onSubmit">
        <p class="points-wrapper">
          Points Available: <span class="points">{{ points }}</span>
        </p>
        <input
          v-model="answer"
          type="answer"
          id="answer"
          name="answer"
          placeholder="Type Answer Here"
        />
        <input type="submit" class="btn answer-btn" value="Check It" />
      </form>
    </div>

    <div class="no-auth" v-else>
      <p class="points-wrapper">
        Points Available: <span class="points">{{ points }}</span>
      </p>
      <div id="ss-buttons">
        <router-link to="/authentication" class="btn auth">Sign In</router-link>
        <router-link to="/registration" class="btn register"
          >Sign Up</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Answer",
  props: ["points"],
  emits: ["answered"],
  data() {
    return {
      onCooldown: false,
      answer: "",
      cooldown: moment(),
      correct: false,
    };
  },
  computed: {
    ...mapGetters(["jwt"]),
  },
  methods: {
    checkAnswerable() {
      const { VUE_APP_API_URL } = process.env;
      axios({
        method: "get",
        url: VUE_APP_API_URL + "/api/users/answerable",
        headers: { Authorization: this.jwt },
      })
        .then((res) => {
          if (res.data.answerable) {
            this.correct = false;
            this.onCooldown = false;
          } else if (res.data.cooldown) {
            this.correct = false;
            this.onCooldown = true;
            this.cooldown = moment(res.data.cooldown).fromNow();
          } else {
            this.onCooldown = false;
            this.correct = true;
          }
        })
        .catch((error) => {
          error;
        });
    },
    onSubmit() {
      const { VUE_APP_API_URL } = process.env;
      this.error = false;
      this.errorText = "";
      if (this.answer === "") {
        this.error = true;
        this.errorText = "Please Fill in Everything";
        return;
      }
      axios({
        method: "post",
        baseURL: VUE_APP_API_URL,
        url: "/api/users/answer",
        headers: { Authorization: this.jwt },
        data: { answer: this.answer },
      })
        .then((res) => {
          if (res.data.correct) {
            this.$emit("answered");
            this.$router.go();
          }
          this.$emit("answered");
        })
        .catch((error) => {
          error;
        });
    },
  },
  mounted() {
    this.checkAnswerable();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

#main-answer {
  width: 100%;
  max-width: 400px;
}
form {
  display: flex;
  flex-direction: column;
  padding: 0rem 1rem;
}
input#answer {
  border: 1px solid black;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  margin-top: 0.2rem;
  margin-bottom: 0.25rem;
  text-align: center;
  font-family: "Roboto Mono";
  font-size: 16px;
}
input#answer:focus {
  outline: none;
  border-color: rgba(85, 61, 192, 0.4);
  box-shadow: 0 0 0 4px rgb(85 61 192 / 10%);
}
input#answer:hover {
  outline: none;
  box-shadow: 0 0 0 4px rgb(85 61 192 / 10%);
}
.points-wrapper {
  text-align: end;
  margin-top: 20px;
  margin-right: 20px;
}
.points {
  font-weight: bold;
}
.answer-btn {
  background-color: cornflowerblue;
  border-color: cornflowerblue;
  margin: 0rem;
  margin-bottom: 1rem;
  font-family: "Roboto Mono";
  font-weight: bold;
}
.answer-btn:hover {
  background-color: rgba(100, 148, 237, 0.95);
  border-color: rgba(100, 148, 237, 0.95);
}

.cooldown {
  text-align: center;
  padding: 12px 10px;
  margin-top: 10px;
  margin-bottom: 15px;
  border: 1px black solid;
  border-radius: 0.5rem;
  background-color: hsl(0, 0%, 90%);
  margin-left: 15px;
  margin-right: 15px;
}

.correct {
  text-align: center;
  padding: 12px 10px;
  margin-top: 10px;
  margin-bottom: 15px;
  margin-left: 15px;
  margin-right: 15px;
  color: hsl(108, 100%, 33%);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.correct-text {
  margin-top: 5px;
  color: black;
}

.no-auth {
  display: grid;
  place-items: center;
}

.auth {
  border-style: solid;
  border-color: black;
  border-width: 2px;
  color: black;
  background-color: white;
}
</style>
