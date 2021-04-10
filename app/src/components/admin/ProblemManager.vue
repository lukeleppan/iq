<template>
  <div class="display-main">
    <div id="main">
      <div id="create-problem">
        <div class="header">
          <p class="create-problem-text">Problem Creation</p>
          <button class="btn create-problem-button" @click="toggleCreating">
            Create Problem
          </button>
        </div>
        <div id="create-problem-section" v-if="creating">
          <form id="create-problem-form" @submit.prevent="createProblem">
            <label for="title">Title</label>
            <input
              v-model="title"
              class="create-input"
              type="text"
              id="title"
              name="title"
            />
            <label for="description">Description</label>
            <textarea
              v-model="description"
              name="description"
              class="create-input"
              id="description"
              cols="27"
              rows="3"
            ></textarea>
            <label for="type">Type</label>
            <input
              v-model="type"
              class="create-input"
              type="text"
              id="type"
              name="type"
            />
            <label for="difficulty">Difficulty</label>
            <input
              v-model="difficulty"
              type="radio"
              value="0"
              class="tab"
              name="difficulty"
              id="easy"
            />
            <label for="easy" id="easy">Easy</label>
            <input
              v-model="difficulty"
              type="radio"
              value="1"
              class="tab"
              name="difficulty"
              id="moderate"
            />
            <label for="moderate" id="moderate">Moderate</label>
            <input
              v-model="difficulty"
              type="radio"
              value="2"
              class="tab"
              name="difficulty"
              id="hard"
            />
            <label for="hard" id="hard">Hard</label>
            <input
              v-model="difficulty"
              type="radio"
              value="3"
              class="tab"
              name="difficulty"
              id="extreme"
            />
            <label for="extreme" id="extreme">Extreme</label>
            <label for="image-url">Image URL</label>
            <input
              v-model="imageUrl"
              class="create-input"
              type="text"
              name="image-url"
              id="image-url"
            />
            <label for="author">Author</label>
            <input
              v-model="author"
              class="create-input"
              type="text"
              name="author"
              id="author"
            />
            <label for="answer">Answer</label>
            <input
              v-model="answer"
              class="create-input"
              type="text"
              name="answer"
              id="answer"
            />
            <input type="submit" class="btn" />
          </form>
          <div id="problem-preview">
            <div id="waiting-preview-text" v-if="waiting">
              Waiting for data...
            </div>
            <div id="problem-preview-main" v-else>
              <h3 id="problem-number">Preview:</h3>
              <img :src="imageUrl" alt="preview" />
              <p id="title-preview">{{ title }}</p>
              <p id="author-preview">By {{ author }}</p>
              <p id="description-preview">{{ description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="problems-view">
        <div class="info-text" v-if="loading">Loading...</div>
        <div class="info-text" v-else-if="noProblems">No Problems</div>
        <ul id="table" v-else>
          <li
            class="problem-item"
            v-for="problem in problems"
            :key="problem.problem_id"
          >
            <div class="first-problem-info">
              <div class="profile-icon" v-html="svgs[problem.index]"></div>
              <div class="problem-details">
                <p class="title-text">
                  #{{ problem.index }} {{ problem.title }}
                </p>
                <p class="author-text">By {{ problem.author }}</p>
              </div>
            </div>
            <div class="action-buttons">
              <button
                v-if="!problem.active"
                class="btn activate-btn"
                @click="activateProblem(problem.problem_id)"
              >
                Activate
              </button>
              <button
                class="btn edit-btn"
                @click="editProblem(problem.problem_id)"
              >
                Edit
              </button>
              <button
                class="btn delete-btn"
                @click="deleteProblem(problem.problem_id)"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
const jdenticon = require("jdenticon");

export default {
  name: "ProblemManager",
  data() {
    return {
      title: "",
      description: "",
      type: "",
      difficulty: 0,
      imageUrl: "",
      author: "",
      answer: "",

      searchText: "",
      loading: false,
      creating: false,
      editing: false,
      edit_id: 0,
      problems: [],
    };
  },
  computed: {
    ...mapGetters(["jwt"]),
    noProblems() {
      return this.problems.length === 0;
    },
    svgs() {
      const size = 40;
      let svgs = [];
      this.problems.forEach((problem) => {
        svgs.push(jdenticon.toSvg(problem.problem_id, size));
      });

      return svgs;
    },
    waiting() {
      if (
        this.title === "" ||
        this.description === "" ||
        this.type === "" ||
        this.imageUrl === "" ||
        this.author === ""
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    toggleCreating() {
      this.creating = !this.creating;
    },
    getProblems() {
      const { VUE_APP_API_URL } = process.env;

      axios({
        method: "get",
        url: VUE_APP_API_URL + "/api/admin/problems",
        headers: { Authorization: this.jwt },
      })
        .then((res) => {
          if (res.data.success === true) {
            this.problems = res.data.problems;
          }
        })
        .catch((error) => {
          if (error) {
            this.$router.replace("/");
          }
        });
    },
    createProblem() {
      const { VUE_APP_API_URL } = process.env;

      axios({
        method: "post",
        url: VUE_APP_API_URL + "/api/admin/problems",
        headers: { Authorization: this.jwt },
        data: {
          title: this.title,
          description: this.description,
          type: this.type,
          difficulty: this.difficulty,
          image_url: this.imageUrl,
          author: this.author,
          answer: this.answer,
        },
      })
        .then((res) => {
          if (res.data.success === true) {
            alert("Problem Created");
            this.problems = [];
            this.getProblems();
          }
        })
        .catch((error) => {
          if (error) {
            alert("Error During Problem Creation");
          }
        });
    },
    activateProblem(id) {
      const { VUE_APP_API_URL } = process.env;

      axios({
        method: "put",
        url: VUE_APP_API_URL + "/api/admin/problem/activate/" + id,
        headers: { Authorization: this.jwt },
      })
        .then((res) => {
          if (res.data.success === true) {
            alert("Problem Activated");
            this.problems = [];
            this.getProblems();
          }
        })
        .catch((error) => {
          if (error) {
            alert("Error During Problem Creation");
          }
        });
    },
    deleteProblem(id) {
      const { VUE_APP_API_URL } = process.env;

      axios({
        method: "delete",
        url: VUE_APP_API_URL + "/api/admin/problems/" + id,
        headers: { Authorization: this.jwt },
      })
        .then((res) => {
          if (res.data.success === true) {
            alert("Problem Deleted");
            this.problems = [];
            this.getProblems();
          }
        })
        .catch((error) => {
          if (error) {
            alert("Error During Problem Deletion");
          }
        });
    },
  },
  mounted() {
    this.loading = true;
    this.getProblems();
    this.loading = false;
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cabin&display=swap");

.display-main {
  display: flex;
  justify-content: center;
}

#main {
  padding: 1rem 1rem;
  width: 100%;
  max-width: 800px;
}

#problems-view {
  border: 2px solid rgb(95, 95, 95);
  border-radius: 0.5rem;
}

#create-problem {
  border: 2px solid rgb(95, 95, 95);
  border-radius: 0.5rem;
  margin-bottom: 10px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.create-problem-text {
  font-size: 20px;
  font-family: Cabin;
  font-weight: 500;
  margin-left: 1rem;
}

.create-problem-button {
  padding: 0.5rem 1rem;
  margin-right: 1rem;
}

.info-text {
  display: grid;
  place-items: center;
  margin: 5rem;
}

#create-problem-section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: auto;
  min-width: 250px;
}

#create-problem-form {
  display: flex;
  flex-direction: column;
  border: 2px solid rgb(95, 95, 95);
  border-radius: 0.5rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
  margin-right: 1rem;
  padding: 0.5rem;
}

#problem-preview {
  border: 2px solid rgb(95, 95, 95);
  border-radius: 0.5rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  padding: 0.5rem;
  max-width: auto;
  min-width: 250px;
}

textarea {
  resize: vertical;
}

.create-input {
  border: 2px solid rgb(80, 80, 80);
  border-radius: 0.4rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.create-input:focus {
  outline: none;
  border-color: black;
}

img {
  border-radius: 0.5rem;
  width: 250px;
  height: auto;
}

#title-preview {
  font-size: 1rem;
  font-weight: bold;
}

#author-preview {
  font-size: 0.8rem;
  margin-bottom: 0.4rem;
}

#description-preview {
  width: 250px;
  word-wrap: break-word;
}

.problem-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding: 1rem 0.5rem;
}

.first-problem-info {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.problem-details {
  margin-left: 0.5rem;
}

input.tab {
  display: none;
}

input.tab + label {
  cursor: pointer;
  float: left;
  text-align: center;
  border: 2px solid rgb(95, 95, 95);
  border-radius: 2rem;
  margin-right: 2px;
  margin-left: 2px;
  margin-top: 2px;
  margin-bottom: 2px;
  padding: 0.5em 1em;
  position: relative;
}

[type="radio"]:checked + label {
  background-color: rgb(199, 199, 199);
  z-index: 1;
}

input.tab + label:hover {
  background-color: rgb(199, 199, 199);
}

[type="radio"]:checked + #easy {
  border-color: rgb(34, 168, 0);
  background-color: rgb(34, 168, 0);
  color: white;
}

[type="radio"]:checked + #moderate {
  border-color: rgb(255, 237, 73);
  background-color: rgb(255, 237, 73);
  color: black;
}

[type="radio"]:checked + #hard {
  border-color: rgb(255, 145, 0);
  background-color: rgb(255, 145, 0);
  color: white;
}

[type="radio"]:checked + #extreme {
  border-color: rgb(255, 50, 50);
  background-color: rgb(255, 50, 50);
  color: white;
  margin-bottom: 1rem;
}

.title-text {
  font-size: 16px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  widows: 200px;
}

.author-text {
  font-size: 14px;
}

.activate-btn {
  background-color: rgb(0, 140, 0);
  border: 2px solid rgb(0, 140, 0);
  padding: 0.5rem 1rem;
  color: white;
}

.edit-btn {
  padding: 0.5rem 1rem;
  color: white;
}

.delete-btn {
  background-color: rgb(200, 0, 0);
  border: 2px solid rgb(200, 0, 0);
  padding: 0.5rem 1rem;
  color: white;
}

@media only screen and (max-width: 500px) {
  .create-problem-text {
    font-size: 15px;
  }

  .create-problem-button {
    padding: 0.5rem 0.5rem;
    font-size: 12px;
  }
}
</style>
