<template>
  <div class="display-main">
    <div id="main">
      <div id="search">
        <i class="fas fa-search fa-lg search-icon"></i>
        <input
          type="text"
          name="search"
          id="search-input"
          placeholder="Search for a user"
          v-model="searchText"
          @keypress.enter="search"
        />
      </div>
      <div class="info-text" v-if="loading">Loading...</div>
      <div class="info-text" v-else-if="noUsers">No Results</div>
      <ul id="table" v-else>
        <li class="user-item" v-for="user in users" :key="user.username">
          <div class="first-user-info">
            <div class="profile-icon" v-html="svgs[user.index]"></div>
            <div class="user-details">
              <p class="dname-text">{{ user.displayname }}</p>
              <p class="username-text">@{{ user.username }}</p>
            </div>
            <i class="fas fa-crown admin-icon" v-if="user.admin"></i>
            <i class="fas fa-user-check verified-icon" v-if="user.verified"></i>
          </div>
          <div class="action-buttons" v-if="!user.admin">
            <button class="btn admin-button" @click="adminify(user.username)">
              Adminify
            </button>
            <button
              class="btn delete-button"
              @click="deleteUser(user.username)"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
const jdenticon = require("jdenticon");

export default {
  name: "UserManager",
  data() {
    return {
      searchText: "",
      loading: false,
      users: [],
    };
  },
  computed: {
    ...mapGetters(["jwt"]),
    noUsers() {
      return this.users.length === 0;
    },
    svgs() {
      const size = 40;
      let svgs = [];
      this.users.forEach((user) => {
        svgs.push(jdenticon.toSvg(user.username, size));
      });

      return svgs;
    },
  },
  methods: {
    search() {
      const { VUE_APP_API_URL } = process.env;

      axios({
        method: "post",
        url: VUE_APP_API_URL + "/api/admin/users/search",
        headers: { Authorization: this.jwt },
        data: { search: this.searchText },
      })
        .then((res) => {
          this.users = res.data.users;
        })
        .catch((error) => {
          if (error) {
            this.$router.replace("/");
          }
        });
    },
    adminify(username) {
      const { VUE_APP_API_URL } = process.env;

      axios({
        method: "put",
        url: VUE_APP_API_URL + "/api/admin/users/adminify/" + username,
        headers: { Authorization: this.jwt },
      })
        .then((res) => {
          if (res.data.success === true) {
            this.search();
          }
        })
        .catch((error) => {
          if (error) {
            alert("Error during adminification");
          }
        });
    },
    deleteUser(username) {
      const { VUE_APP_API_URL } = process.env;
      const deleteIt = confirm("Are you sure you want to delete?");

      if (!deleteIt) {
        return;
      }

      axios({
        method: "delete",
        url: VUE_APP_API_URL + "/api/admin/users/delete/" + username,
        headers: { Authorization: this.jwt },
      })
        .then((res) => {
          if (res.data.success === true) {
            this.users = [];
            this.search();
          }
        })
        .catch((error) => {
          if (error) {
            alert("Error during deletion");
          }
        });
    },
  },
  mounted() {
    this.loading = true;
    this.search();
    this.loading = false;
  },
};
</script>

<style scoped>
.display-main {
  display: flex;
  justify-content: center;
}

#main {
  border: 2px solid rgb(95, 95, 95);
  border-radius: 0.5rem;
  margin: 1rem;
  padding: 1rem 2rem;
  width: 100%;
  max-width: 800px;
}

#search {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 2px solid rgb(95, 95, 95);
  border-radius: 2rem;
  padding: 1rem 0.5rem;
}

input#search-input {
  width: 100%;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 18px;
}

input#search-input:focus {
  outline: none;
}

.search-icon {
  margin-left: 1rem;
}

.info-text {
  display: grid;
  place-items: center;
  margin: 5rem;
}

#table {
  list-style-type: none;
}

.user-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding: 1rem 0rem;
}

.first-user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.dname-text {
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100px;
}

.username-text {
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 120px;
}

.admin-icon {
  color: rgb(230, 195, 0);
  margin-right: 4px;
}

.verified-icon {
  color: rgb(0, 111, 175);
}

.admin-button {
  background-color: rgb(0, 140, 0);
  border: 2px solid rgb(0, 140, 0);
  padding: 0.5rem 1rem;
  color: white;
}

.delete-button {
  background-color: rgb(200, 0, 0);
  border: 2px solid rgb(200, 0, 0);
  padding: 0.5rem 1rem;
  color: white;
}
</style>
