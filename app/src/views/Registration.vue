<template>
  <div id="main">
    <AuthResHeader />
    <section>
      <div class="register-wrapper">
        <div class="register-block">
          <h3 class="register-title">Create An Account</h3>
          <form @submit.prevent="onSubmit">
            <label for="dname">Full Name</label>
            <input v-model="displayName" type="text" id="dname" name="dname" />
            <h6 class="tip-text">This name can be seen by the public</h6>
            <label for="house">Choose your house</label>
            <div class="house-wrapper">
              <input
                v-model="house"
                type="radio"
                class="tab"
                name="house"
                id="dalberg"
                value="1"
              />
              <label for="dalberg" id="dalberg">Dalberg</label>
              <input
                v-model="house"
                type="radio"
                class="tab"
                name="house"
                id="savory"
                value="2"
              />
              <label for="savory" id="savory">Savory</label>
              <input
                v-model="house"
                type="radio"
                class="tab"
                name="house"
                id="hurley"
                value="3"
              />
              <label for="hurley" id="hurley">Hurley</label>
            </div>
            <label for="username">Username</label>
            <input
              v-model="username"
              type="text"
              id="username"
              name="username"
            />
            <h6 class="tip-text">
              Use your school username. If you don't, you won't get an email.
            </h6>
            <label for="password">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              name="password"
            />
            <input type="submit" value="Register" class="btn register-btn" />
            <div>
              <p id="error" v-if="error">{{ errorText }}</p>
              <p id="success" v-if="success">
                Successfully Registered. Check your school email to verify you
                account.
              </p>
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

export default {
  name: "Registration",
  metaInfo: {
    title: "Create an account | iKhwezi Quiz",
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
      displayName: "",
      house: 0,
      username: "",
      password: "",

      success: false,
      error: false,
      errorText: "",
    };
  },
  methods: {
    onSubmit() {
      const { VUE_APP_API_URL } = process.env;
      this.success = false;
      this.error = false;
      this.errorText = "";

      if (this.displayName === "") {
        this.error = true;
        this.errorText = "Please Enter your Full Name";
        return;
      }

      if (this.house === 0) {
        this.error = true;
        this.errorText = "Please Select your House";
        return;
      }

      if (this.username === "") {
        this.error = true;
        this.errorText = "Please Enter Username";
        return;
      }

      if (this.password === "") {
        this.error = true;
        this.errorText = "Please Enter a Password";
        return;
      }

      axios
        .post(VUE_APP_API_URL + "/api/users/register", {
          displayname: this.displayName,
          house: this.house,
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          if (res.data.success) {
            this.success = true;
          } else if (res.data.userExists) {
            this.error = true;
            this.errorText = "User already exists. Log in instead.";
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
  max-width: 450px;
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

input#password {
  border: 1px solid black;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  margin-top: 0.2rem;
  margin-bottom: 1rem;
}

input#dname,
input#username {
  border: 1px solid black;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  margin-top: 0.2rem;
  margin-bottom: 0rem;
}

input#dname:focus,
input#username:focus,
input#password:focus {
  outline: none;
  border-color: rgba(85, 61, 192, 0.4);
  box-shadow: 0 0 0 4px rgb(85 61 192 / 10%);
}

input#dname:hover,
input#username:hover,
input#password:hover {
  outline: none;
  box-shadow: 0 0 0 4px rgb(85 61 192 / 10%);
}

.house-wrapper {
  display: flex;
  flex-direction: row;
  margin-top: 0.2rem;
  margin-bottom: 1rem;
}

.register-btn {
  background-color: cornflowerblue;
  border-color: cornflowerblue;
  margin-left: 0rem;
  margin-right: 0rem;
}

.register-btn:hover {
  background-color: rgba(100, 148, 237, 0.95);
  border-color: rgba(100, 148, 237, 0.95);
}

input.tab {
  display: none;
}

input.tab + label {
  cursor: pointer;
  float: left;
  text-align: center;
  border: 2px solid rgb(95, 95, 95);
  border-radius: 2rem;
  margin-right: 2px;
  margin-left: 2px;
  margin-top: 2px;
  margin-bottom: 2px;
  padding: 0.5em 1em;
  position: relative;
}

[type="radio"]:checked + label {
  background-color: rgb(199, 199, 199);
  z-index: 1;
}

input.tab + label:hover {
  background-color: rgb(199, 199, 199);
}

[type="radio"]:checked + #dalberg {
  border-color: rgb(255, 50, 50);
  background-color: rgb(255, 50, 50);
  color: white;
}

[type="radio"]:checked + #savory {
  border-color: rgb(70, 70, 255);
  background-color: rgb(70, 70, 255);
  color: white;
}

[type="radio"]:checked + #hurley {
  border-color: rgb(0, 0, 0);
  background-color: rgb(0, 0, 0);
  color: white;
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

#success {
  border: 2px solid green;
  border-radius: 1rem;
  background-color: rgb(34, 168, 0);
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

@media only screen and (max-width: 385px) {
  .house-wrapper {
    flex-direction: column;
  }
}
</style>
