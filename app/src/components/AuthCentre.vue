<template>
  <div>
    <div id="dropdown" v-if="jwt">
      <div id="signed-in" @click="toggleDropdown">
        <div id="profile-icon" v-html="svgLg"></div>
        <div id="user-details">
          <p class="dname-text">{{ jwtData.name }}</p>
          <p class="username-text">@{{ jwtData.sub }}</p>
        </div>
        <i class="fas fa-chevron-down" id="dropdown-details"></i>
      </div>
      <div id="dropdown-content" v-if="dropdown">
        <div id="signed-in-as">
          <p class="drop-title">SIGNED IN</p>
          <div id="drop-signed-in">
            <div id="profile-icon" v-html="svgSm"></div>
            <div id="drop-user-details">
              <p class="dname-text-drop">{{ jwtData.name }}</p>
              <p class="username-text">@{{ jwtData.sub }}</p>
            </div>
          </div>
        </div>
        <div id="admin-section" v-if="jwtData.admin">
          <p class="drop-title">ADMIN</p>
          <router-link to="/" v-if="onAdmin" class="dropdown-item">
            <i class="fas fa-arrow-left dropdown-icon"></i>
            <p class="dropdown-text">Back to Quiz</p>
          </router-link>
          <router-link to="/admin" v-else class="dropdown-item">
            <i class="fas fa-tools dropdown-icon"></i>
            <p class="dropdown-text">Admin Dashboard</p>
          </router-link>
        </div>
        <div id="general-section">
          <p class="drop-title">GENERAL</p>
          <router-link to="/help" class="dropdown-item">
            <i class="fas fa-question-circle dropdown-icon"></i>
            <p class="dropdown-text">Help</p>
          </router-link>
        </div>
        <div id="user-section">
          <p class="drop-title">USER</p>
          <router-link to="/account" class="dropdown-item">
            <i class="fas fa-user-circle dropdown-icon"></i>
            <p class="dropdown-text">Account</p>
          </router-link>
          <div class="dropdown-item" @click="logout">
            <i class="fas fa-sign-out-alt dropdown-icon"></i>
            <p class="dropdown-text">Log Out</p>
          </div>
        </div>
      </div>
    </div>
    <div id="ss-buttons" v-else>
      <router-link to="/authentication" class="btn auth">Sign In</router-link>
      <router-link to="/registration" class="btn register">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { logout } from "../utils/authService";
const jdenticon = require("jdenticon");

export default {
  name: "AuthCentre",
  data() {
    return {
      dropdown: false,
    };
  },
  computed: {
    ...mapGetters(["jwt", "jwtData"]),
    svgLg() {
      const size = 50;
      const value = this.jwtData.sub;
      return jdenticon.toSvg(value, size);
    },
    svgSm() {
      const size = 40;
      const value = this.jwtData.sub;
      return jdenticon.toSvg(value, size);
    },
    onAdmin() {
      return this.$route.name === "Admin";
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdown = !this.dropdown;
    },
    logout() {
      logout();
      this.$store.commit("logout");
      this.$router.go();
    },
  },
};
</script>

<style scoped>
.auth {
  border-style: solid;
  border-color: black;
  border-width: 2px;
  color: black;
  background-color: white;
}

#signed-in {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px;
  border-style: solid;
  border-radius: 0.5rem;
  border-color: rgb(95, 95, 95);
}

#signed-in:hover {
  background-color: rgb(250, 250, 250);
  cursor: pointer;
}

#user-details {
  display: flex;
  flex-direction: column;
  margin-left: 0.2rem;
  margin-right: 1.5rem;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#drop-user-details {
  display: flex;
  flex-direction: column;
  margin-left: 0.2rem;
  margin-right: 1.5rem;
}

.dname-text {
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 150px;
}

.dname-text-drop {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 150px;
}

.username-text {
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 120px;
}

#dropdown-details {
  margin-right: 0.8rem;
}

#dropdown {
  position: relative;
  display: inline-block;
}

#dropdown-content {
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  border: 2px solid rgb(95, 95, 95);
  width: 260px;
  border-radius: 0.5rem;
  padding-top: 12px;
  z-index: 1;
  margin-top: 5px;
}

.dropdown-item {
  display: flex;
  padding: 8px 0px;

  text-decoration: none;
  color: black;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.dropdown-item:hover {
  display: flex;
  cursor: pointer;
  padding: 8px 0px;
  background-color: rgb(199, 199, 199);
}

.dropdown-icon {
  margin-right: 10px;
  padding-left: 12px;
}

#signed-in-as {
  display: none;
  margin-bottom: 10px;
}

.drop-title {
  font-weight: bold;
  font-size: 14px;
  padding-left: 16px;
  margin-top: 7px;
  margin-bottom: 4px;
  color: rgb(109, 109, 109);

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#drop-signed-in {
  display: flex;
  align-items: center;
}

@media only screen and (max-width: 800px) {
  #user-details {
    margin-right: 0rem;
  }

  #dname-text {
    width: 100px;
  }

  #username-text {
    width: 100px;
  }

  #dropdown-content {
    width: 235px;
  }
}

@media only screen and (max-width: 500px) {
  #signed-in {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  #user-details {
    display: none;
  }

  #dropdown-content {
    position: relative;
    width: 250px;
  }

  #signed-in-as {
    display: inherit;
  }
}
</style>
