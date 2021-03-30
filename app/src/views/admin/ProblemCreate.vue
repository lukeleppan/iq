<template>
  <div id="main">
    <form class="form">
      <label for="title">Title</label>
      <input type="text" name="title" id="title" />

      <label for="description">Description</label>
      <input type="text" name="description" id="description" />

      <label for="type">Type</label>
      <input type="text" name="type" id="type" />

      <label>Difficulty</label>
      <input type="radio" name="diff" id="easy" value="easy" />
      <label for="easy">Easy</label>
      <input type="radio" name="diff" id="moderate" value="moderate" />
      <label for="moderate">Moderate</label>
      <input type="radio" name="diff" id="hard" value="hard" />
      <label for="hard">Hard</label>
      <input type="radio" name="diff" id="extreme" value="extreme" />
      <label for="extreme">Extreme</label>

      <label for="image-url">Image URL</label>
      <input type="text" name="image-url" id="image-url" />

      <label for="answer">Answer</label>
      <input type="text" name="answer" id="answer" />
    </form>
    <div id="card"></div>
  </div>
</template>

<style scoped>
#main {
  display: flex;
  flex-direction: row;
}
input[type="text"],
input[type="text"]:focus {
  padding: 1rem;
  border: 2px solid rgb(240, 240, 240);
  border-radius: 0.5rem;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
}

form {
  border: 2px solid rgb(245, 0, 0);
  border-radius: 0.5rem;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
}

#card {
  border: 2px solid rgb(245, 0, 0);
  border-radius: 0.5rem;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
}

#description {
  resize: vertical;
  border-radius: 15px;
  border: 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.06);
}
</style>

<script>
export default {
  name: "ProblemCreate",
  components: {},
};
</script>
