<template>
  <div id="app">
    <div id="nav">
      <div class="nav-left"></div>
      <div class="nav-centre">
        <button id="home-btn" v-on:click="SwitchToHome">
          <img
            id="home-icon"
            src="../src/assets/lightbulb.svg"
            alt="Home Icon"
          />
        </button>
        <button id="lb-btn" v-on:click="SwitchToLeaderboard">
          <img
            id="lb-icon"
            src="../src/assets/leaderboard.svg"
            alt="Leader Board Icon"
          />
          <div v-if="activeLeaderboard">Leaderboard</div>
        </button>
      </div>
      <div class="nav-right"></div>
    </div>
    <router-view />
  </div>
</template>

<style>
#nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.nav-left {
  display: flex;
}

.mlc-cred {
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.dev-cred {
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.nav-centre {
  box-shadow: 0rem 0.2rem 0.5rem rgb(63, 63, 63);
  padding: 1rem;
  border-radius: 3rem;
}

#home-btn {
  padding: 0;
  border: none;
  background: none;
}

#home-btn:focus {
  outline: none;
}

#home-icon {
  margin-right: 0.5rem;
  width: 25px;
  height: 25px;
}

#lb-btn {
  padding: 0;
  border: none;
  background: none;
}

#lb-btn:focus {
  outline: none;
}

#lb-icon {
  margin-left: 0.5rem;
  width: 20px;
  height: 20px;
}

#github {
  width: 50px;
  height: 50px;
}
</style>

<script>
export default {
  name: "App",
  data() {
    activeLeaderboard: false;
  },
  methods: {
    SwitchToLeaderboard() {
      this.activeLeaderboard = true;
    },

    SwitchToHome() {
      this.activeLeaderboard = false;
    }
  }
};
</script>
