<template>
  <div id="main">
    <section>
      <div class="register-wrapper">
        <div class="register-block">
          <h3 class="register-title">Create An Account</h3>
          <form @submit.prevent="onSubmit">
            <label for="dname">Display Name</label><br />
            <input
              v-model="displayName"
              type="text"
              id="dname"
              name="dname"
            /><br />
            <label for="house">Choose your house</label><br />
            <input
              v-model="house"
              type="radio"
              name="house"
              id="dalburg"
              value="1"
            />
            <label for="dalburg">Dalburg</label>
            <input
              v-model="house"
              type="radio"
              name="house"
              id="savory"
              value="2"
            />
            <label for="savory">Savory</label>
            <input
              v-model="house"
              type="radio"
              name="house"
              id="hurley"
              value="3"
            />
            <label for="hurley">Hurley</label><br />
            <label for="username">Username</label><br />
            <input
              v-model="username"
              type="text"
              id="username"
              name="username"
            /><br />
            <label for="password">Password</label><br />
            <input
              v-model="password"
              type="password"
              id="password"
              name="password"
            /><br />
            <input type="submit" /><br />
            <div>
              <p id="error" v-if="error">{{ errorText }}</p>
              <p id="success" v-if="success">Successfully Registered</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Registration",
  data() {
    return {
      displayName: "",
      house: 1,
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
        this.errorText = "Please Enter display name";
        return;
      }

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
};
</script>

<style scoped></style>
