<template>
  <div id="app">
    <div id="nav">
      <div class="nav-left">
        <div class="mlc-cred">
          Presented by<br /><strong>2021 Tutoring MLC</strong>
        </div>
        <div class="dev-cred">
          Developed by<br /><strong>Luke Leppan</strong>
        </div>
      </div>
      <div class="nav-centre">
        <button id="home-btn">
          <img id="home-icon" src="../src/assets/home.svg" alt="Home Icon" />
        </button>
        <button id="lb-btn">
          <img
            id="lb-icon"
            src="../src/assets/leaderboard.svg"
            alt="Leader Board Icon"
          />
        </button>
      </div>
      <div class="nav-right">
        <a
          href="https://github.com/lukeleppan/untitled-logic-game"
          class="github-link"
        >
          <img
            src="../src/assets/GitHub-Mark-120px-plus.png"
            alt="Github Logo"
            id="github"
          />
        </a>
      </div>
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
  box-shadow: 0.1rem 0.1rem 0.5rem rgb(63, 63, 63);
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
  margin-right: 1rem;
  width: 40px;
  height: 40px;
}

#github {
  width: 50px;
  height: 50px;
}
</style>
