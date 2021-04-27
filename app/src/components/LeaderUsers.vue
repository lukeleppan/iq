<template>
  <div id="main">
    <h1 class="header">Leaderboard</h1>
    <p class="no-users" v-if="hasUsers">
      <i class="fas fa-trophy fa-5x"></i>
      No one has solved this problem yet. Be the First!
    </p>
    <ul>
      <li class="user-item" v-for="user in users" :key="user.username">
        <i class="fas fa-award"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LeaderUsers",
  props: ["users"],
  // data() {
  //   return {

  //   }
  // }
  computed: {
    hasUsers() {
      return this.users.length === 0;
    },
  },
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
  max-width: 300px;
  margin-right: 5px;
}

ul {
  list-style: none;
  width: 100%;
}

.header {
  text-align: center;
  margin: 0.5rem;
}

.no-users {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 1rem;
  font-size: 20px;
}

i {
  color: #fd7e14;
  margin-bottom: 25px;
}

@media only screen and (max-width: 850px) {
  #main {
    max-width: 500px;
    margin-right: none;
    margin-top: 5px;
  }
}
</style>
