<template>
  <div id="main">
    <div class="trophy">
      <i class="fas fa-trophy fa-5x"></i>
    </div>
    <h1 class="header">Leaderboard</h1>
    <p class="no-users" v-if="hasUsers">
      No one has solved this problem yet. Be the First!
    </p>
    <ul v-else>
      <div v-if="users.length > 0">
        <li>
          <div class="left-wrapper">
            <span class="number">1st</span>
            <div class="name-wrapper">
              <span class="username-text">{{ users[0].displayname }}</span>
              <div class="dalberg" v-if="users[0].house == 1">Dalberg</div>
              <div class="savory" v-if="users[0].house == 2">Savory</div>
              <div class="hurley" v-if="users[0].house == 3">Hurley</div>
            </div>
          </div>
          <div class="right-wrapper">
            <span class="points">{{ users[0].points }}</span>
            <span class="points-text">Points</span>
          </div>
        </li>
        <div class="break"></div>
      </div>
      <div v-if="users.length > 1">
        <li>
          <div class="left-wrapper">
            <span class="number">2nd</span>
            <div class="name-wrapper">
              <span class="username-text">{{ users[1].displayname }}</span>
              <div class="dalberg" v-if="users[1].house == 1">Dalberg</div>
              <div class="savory" v-if="users[1].house == 2">Savory</div>
              <div class="hurley" v-if="users[1].house == 3">Hurley</div>
            </div>
          </div>
          <div class="right-wrapper">
            <span class="points">{{ users[1].points }}</span>
            <span class="points-text">Points</span>
          </div>
        </li>
        <div class="break"></div>
      </div>
      <div v-if="users.length > 2">
        <li>
          <div class="left-wrapper">
            <span class="number">3rd</span>
            <div class="name-wrapper">
              <span class="username-text">{{ users[2].displayname }}</span>
              <div class="dalberg" v-if="users[2].house == 1">Dalberg</div>
              <div class="savory" v-if="users[2].house == 2">Savory</div>
              <div class="hurley" v-if="users[2].house == 3">Hurley</div>
            </div>
          </div>
          <div class="right-wrapper">
            <span class="points">{{ users[2].points }}</span>
            <span class="points-text">Points</span>
          </div>
        </li>
        <div class="break"></div>
      </div>
      <div v-if="users.length > 3">
        <li>
          <div class="left-wrapper">
            <span class="number">4th</span>
            <div class="name-wrapper">
              <span class="username-text">{{ users[3].displayname }}</span>
              <div class="dalberg" v-if="users[3].house == 1">Dalberg</div>
              <div class="savory" v-if="users[3].house == 2">Savory</div>
              <div class="hurley" v-if="users[3].house == 3">Hurley</div>
            </div>
          </div>
          <div class="right-wrapper">
            <span class="points">{{ users[3].points }}</span>
            <span class="points-text">Points</span>
          </div>
        </li>
        <div class="break"></div>
      </div>
      <div v-if="users.length > 4">
        <li>
          <div class="left-wrapper">
            <span class="number">5th</span>
            <div class="name-wrapper">
              <span class="username-text">{{ users[4].displayname }}</span>
              <div class="dalberg" v-if="users[4].house == 1">Dalberg</div>
              <div class="savory" v-if="users[4].house == 2">Savory</div>
              <div class="hurley" v-if="users[4].house == 3">Hurley</div>
            </div>
          </div>
          <div class="right-wrapper">
            <span class="points">{{ users[4].points }}</span>
            <span class="points-text">Points</span>
          </div>
        </li>
        <div class="break"></div>
      </div>
      <div v-if="users.length > 5">
        <li>
          <div class="left-wrapper">
            <span class="number">6th</span>
            <div class="name-wrapper">
              <span class="username-text">{{ users[5].displayname }}</span>
              <div class="dalberg" v-if="users[5].house == 1">Dalberg</div>
              <div class="savory" v-if="users[5].house == 2">Savory</div>
              <div class="hurley" v-if="users[5].house == 3">Hurley</div>
            </div>
          </div>
          <div class="right-wrapper">
            <span class="points">{{ users[5].points }}</span>
            <span class="points-text">Points</span>
          </div>
        </li>
        <div class="break"></div>
      </div>
      <div v-if="users.length > 6">
        <li>
          <div class="left-wrapper">
            <span class="number">7th</span>
            <div class="name-wrapper">
              <span class="username-text">{{ users[6].displayname }}</span>
              <div class="dalberg" v-if="users[6].house == 1">Dalberg</div>
              <div class="savory" v-if="users[6].house == 2">Savory</div>
              <div class="hurley" v-if="users[6].house == 3">Hurley</div>
            </div>
          </div>
          <div class="right-wrapper">
            <span class="points">{{ users[6].points }}</span>
            <span class="points-text">Points</span>
          </div>
        </li>
        <div class="break"></div>
      </div>
      <div v-if="users.length > 7">
        <li>
          <div class="left-wrapper">
            <span class="number">8th</span>
            <div class="name-wrapper">
              <span class="username-text">{{ users[7].displayname }}</span>
              <div class="dalberg" v-if="users[7].house == 1">Dalberg</div>
              <div class="savory" v-if="users[7].house == 2">Savory</div>
              <div class="hurley" v-if="users[7].house == 3">Hurley</div>
            </div>
          </div>
          <div class="right-wrapper">
            <span class="points">{{ users[7].points }}</span>
            <span class="points-text">Points</span>
          </div>
        </li>
        <div class="break"></div>
      </div>
      <div v-if="users.length > 8">
        <li>
          <div class="left-wrapper">
            <span class="number">9th</span>
            <div class="name-wrapper">
              <span class="username-text">{{ users[8].displayname }}</span>
              <div class="dalberg" v-if="users[8].house == 1">Dalberg</div>
              <div class="savory" v-if="users[8].house == 2">Savory</div>
              <div class="hurley" v-if="users[8].house == 3">Hurley</div>
            </div>
          </div>
          <div class="right-wrapper">
            <span class="points">{{ users[8].points }}</span>
            <span class="points-text">Points</span>
          </div>
        </li>
        <div class="break"></div>
      </div>
      <div v-if="users.length > 9">
        <li>
          <div class="left-wrapper">
            <span class="number">10th</span>
            <div class="name-wrapper">
              <span class="username-text">{{ users[9].displayname }}</span>
              <div class="dalberg" v-if="users[9].house == 1">Dalberg</div>
              <div class="savory" v-if="users[9].house == 2">Savory</div>
              <div class="hurley" v-if="users[9].house == 3">Hurley</div>
            </div>
          </div>
          <div class="right-wrapper">
            <span class="points">{{ users[9].points }}</span>
            <span class="points-text">Points</span>
          </div>
        </li>
        <div class="break"></div>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LeaderUsers",
  props: ["users"],
  // data() {
  //   return {
  //     user
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
@import url("https://fonts.googleapis.com/css2?family=Cabin&display=swap");

#main {
  display: flex;
  flex-direction: column;
  border: 2px solid rgb(95, 95, 95);
  border-radius: 0.5rem;
  width: 100%;
  min-width: 200px;
  max-width: 400px;
  margin: 0px 5px;
}
ul {
  list-style: none;
  margin: 0px 0px;
}
li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.header {
  text-align: center;
  margin: 0.5rem;
  margin-bottom: 20px;
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
  margin-top: 25px;
}
.number {
  margin-right: 25px;
  font-size: 24px;
}
.dalberg {
  padding: 4px 12px;
  border-color: rgb(255, 50, 50);
  background-color: rgb(255, 50, 50);
  color: white;
  border-radius: 0.5rem;
  font-size: 14px;
  width: 70px;
}
.savory {
  padding: 4px 12px;
  border-color: rgb(70, 70, 255);
  background-color: rgb(70, 70, 255);
  color: white;
  border-radius: 0.5rem;
  font-size: 14px;
  width: 70px;
}
.hurley {
  padding: 4px 12px;
  border-color: rgb(0, 0, 0);
  background-color: rgb(0, 0, 0);
  color: white;
  border-radius: 0.5rem;
  font-size: 14px;
  width: 65px;
}
.trophy {
  display: flex;
  justify-content: center;
}
.username-text {
  font-size: 24px;
  font-family: Cabin;
  margin-right: 5px;
}
.name-wrapper {
  display: flex;
  flex-direction: column;
}
.left-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.right-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}
.break {
  border: 1px hsl(0, 0%, 90%) solid;
}
.points {
  font-weight: bold;
}

@media only screen and (max-width: 400px) {
  .username-text {
    font-size: 18px;
  }
}

@media only screen and (max-width: 850px) {
  #main {
    max-width: 500px;
    margin-top: 5px;
  }
}
</style>
