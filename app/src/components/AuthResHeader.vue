<template>
  <header>
    <router-link to="/" class="back">
      <i class="fas fa-arrow-left"></i>Back to Quiz
    </router-link>
  </header>
</template>

<script>
export default {
  name: "AuthResHeader",
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 10px;
}

.back {
  border: 2px solid rgb(95, 95, 95);
  border-radius: 0.5rem;
  padding: 0.8rem 1.5rem;

  color: black;
  text-decoration: none;
}

.back:hover {
  background-color: rgb(240, 240, 240);
}

.fas {
  margin-right: 5px;
}
</style>
