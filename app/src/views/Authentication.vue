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
            <h6 class="tip-text">This is your school username</h6>
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
              <form v-if="needVerifiy" @submit.prevent="resend">
                <label for="verify-username">Username</label>
                <input
                  type="text"
                  v-model="verifyUsername"
                  id="verify-username"
                />
                <input
                  type="submit"
                  class="btn resend-btn"
                  value="Resend Email"
                />
              </form>
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
  metaInfo: {
    title: "Sign in to your account | iKhwezi Quiz",
    htmlAttrs: {
      lang: "en-US",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "description",
        content: "The Interhouse iKhwezi Quiz!",
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },
  data() {
    return {
      username: "",
      password: "",
      verifyUsername: "",

      error: false,
      errorText: "",
      needVerifiy: false,
    };
  },
  computed: {
    ...mapGetters(["jwt"]),
  },
  methods: {
    ...mapActions(["fetchJWT"]),
    resend() {
      const { VUE_APP_API_URL } = process.env;
      if (this.verifyUsername === "") {
        this.error = true;
        this.errorText = "Please Fill in Everything";
        return;
      }
      axios({
        method: "post",
        baseURL: VUE_APP_API_URL,
        url: "/api/users/resend",
        data: { username: this.verifyUsername },
      })
        .then((res) => {
          res;
          this.needVerifiy = false;
        })
        .catch((error) => {
          error;
          this.needVerifiy = false;
        });
    },
    onSubmit() {
      const { VUE_APP_API_URL } = process.env;
      this.error = false;
      this.errorText = "";
      if (this.username === "") {
        this.error = true;
        this.errorText = "Please Fill in Everything";
        return;
      }
      if (this.password === "") {
        this.error = true;
        this.errorText = "Please Fill in Everything";
        return;
      }
      axios({
        method: "post",
        baseURL: VUE_APP_API_URL,
        url: "/api/users/login",
        data: { username: this.username, password: this.password },
      })
        .then((res) => {
          if (res.data.success) {
            this.success = true;
            setLocalStorage(res);
            this.fetchJWT();
            this.$router.push("/");
          } else if (res.data.user_error) {
            this.error = true;
            this.errorText = "Username or Password Incorrect";
          } else {
            this.error = true;
            this.errorText = "Please Verify using Email";
            this.needVerifiy = true;
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
  max-width: 400px;
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

input#verify-username,
input#password {
  border: 1px solid black;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  margin-top: 0.2rem;
  margin-bottom: 1rem;
}

input#username {
  border: 1px solid black;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  margin-top: 0.2rem;
  margin-bottom: 0rem;
}

input#verify-username:focus,
input#username:focus,
input#password:focus {
  outline: none;
  border-color: rgba(85, 61, 192, 0.4);
  box-shadow: 0 0 0 4px rgb(85 61 192 / 10%);
}

input#verify-username:hover,
input#username:hover,
input#password:hover {
  outline: none;
  box-shadow: 0 0 0 4px rgb(85 61 192 / 10%);
}

.sign-in-btn {
  background-color: cornflowerblue;
  border-color: cornflowerblue;
  margin: 0rem;
}

.sign-in-btn:hover {
  background-color: rgba(100, 148, 237, 0.95);
  border-color: rgba(100, 148, 237, 0.95);
}

.resend-btn {
  background-color: rgb(219, 106, 0);
  border-color: rgb(219, 106, 0);
  margin: 0rem;
}

.resend-btn:hover {
  background-color: rgba(219, 106, 0, 0.9);
  border-color: rgba(219, 106, 0, 0.9);
}

#error {
  border: 2px solid rgb(194, 0, 0);
  border-radius: 1rem;
  background-color: rgb(255, 69, 69);
  text-align: center;
  font-weight: bold;
  color: white;
  padding: 1rem;
  margin: 1rem 0rem;
}

.tip-text {
  margin-top: 0.2rem;
  margin-bottom: 1rem;
}
</style>
