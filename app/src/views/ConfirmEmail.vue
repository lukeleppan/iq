<template>
  <div id="main">
    <div class="wrapper" v-if="success">
      <i class="fas fa-check-circle fa-9x success-icon"></i>
      <p class="success-text">Email Verified</p>
      <router-link to="/authentication" class="btn"
        >Proceed to Log in</router-link
      >
    </div>
    <div class="wrapper" v-else>
      <i class="fas fa-times-circle fa-9x fail-icon"></i>
      <p class="fail-text">Email Verification Failed</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ConfirmEmail",
  data() {
    return {
      success: false,
    };
  },
  beforeCreate() {
    const { VUE_APP_API_URL } = process.env;
    const token = this.$route.params.token;

    axios
      .post(VUE_APP_API_URL + "/api/users/confirm/" + token)
      .then((res) => {
        if (res.data.success) {
          return (this.success = true);
        }
        return (this.success = false);
      })
      .catch((error) => {
        console.log(error);
        return (this.success = false);
      });
  },
};
</script>

<style scoped>
#main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.success-icon {
  color: rgb(34, 168, 0);
  margin: 2rem;
}

.success-text {
  font-size: 25px;
  font-family: Cabin;
  font-weight: bold;
}

.fail-icon {
  color: rgb(255, 69, 69);
  margin: 2rem;
}

.fail-text {
  font-size: 25px;
  font-family: Cabin;
  font-weight: bold;
}

.btn {
  text-decoration: none;
  color: white;
}
</style>
