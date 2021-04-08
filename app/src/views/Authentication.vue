<template>
  <div>
    <AuthResHeader />
    <section>
      <div class="register-wrapper">
        <div class="register-block">
          <h3 class="register-title">Sign in</h3>
          <form @submit.prevent="onSubmit">
            <label for="username">Username</label>
            <input
              v-model="username"
              type="text"
              id="username"
              name="username"
            />
            <label for="password">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              name="password"
            />
            <input type="submit" class="btn sign-in-btn" value="Log in" />
            <div>
              <p id="error" v-if="error">{{ errorText }}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import AuthResHeader from "@/components/AuthResHeader";
import { setLocalStorage } from "../utils/authService";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Authentication",
  data() {
    return {
      username: "",
      password: "",

      error: false,
      errorText: "",
    };
  },
  computed: {
    ...mapGetters(["jwt"]),
  },
  methods: {
    ...mapActions(["fetchJWT"]),
    onSubmit() {
      const { VUE_APP_API_URL } = process.env;
      this.error = false;
      this.errorText = "";

      console.log(VUE_APP_API_URL);

      if (this.username === "") {
        this.error = true;
        this.errorText = "Please Enter Username";
        return;
      }

      if (this.password === "") {
        this.error = true;
        this.errorText = "Please Enter password";
        return;
      }

      axios
        .post(VUE_APP_API_URL + "/api/users/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          if (res.data.success) {
            this.success = true;
            setLocalStorage(res);
            this.fetchJWT();
            this.$router.push("/");
          } else if (res.data.user_error) {
            console.log(res.data);
            this.error = true;
            this.errorText = "Username or Password Incorrect";
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
          this.errorText = "Unknown Server Error Occured";
        });
    },
  },
  components: {
    AuthResHeader,
  },
  created() {
    this.fetchJWT();
    if (this.jwt) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
  margin: 1rem;
}

.register-wrapper {
  border: 2px solid rgb(95, 95, 95);
  border-radius: 1rem;
  padding: 1rem;
  width: 100%;
  max-width: 500px;
}

.register-title {
  text-align: center;
  font-size: 22px;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

form {
  display: flex;
  flex-direction: column;
  padding: 0rem 1rem;
}

label {
  font-weight: bold;
}

input#username,
input#password {
  border: 1px solid black;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  margin-top: 0.2rem;
  margin-bottom: 1rem;
}

input#username:focus,
input#password:focus {
  outline: none;
  border-color: rgba(85, 61, 192, 0.4);
  box-shadow: 0 0 0 4px rgb(85 61 192 / 10%);
}

input#username:hover,
input#password:hover {
  outline: none;
  box-shadow: 0 0 0 4px rgb(85 61 192 / 10%);
}

.sign-in-btn {
  background-color: cornflowerblue;
  border-color: cornflowerblue;
}

.sign-in-btn:hover {
  background-color: rgba(100, 148, 237, 0.95);
  border-color: rgba(100, 148, 237, 0.95);
}
</style>
