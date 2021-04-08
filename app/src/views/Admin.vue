<template>
  <Header />
  <AdminHero />
  <div id="switcher">
    <div>
      <input
        type="radio"
        name="switcher"
        id="user-manage-btn"
        class="tab"
        value="user"
        v-model="switcher"
      />
      <label for="user-manage-btn">Users</label>
      <input
        type="radio"
        name="switcher"
        id="problem-manage-btn"
        class="tab"
        value="problem"
        v-model="switcher"
      />
      <label for="problem-manage-btn">Problems</label>
    </div>
  </div>
  <UserManager v-if="isUsers" />
  <ProblemManager v-else />
</template>

<script>
import Header from "@/components/Header";
import AdminHero from "@/components/admin/AdminHero";
import UserManager from "@/components/admin/UserManager";
import ProblemManager from "@/components/admin/ProblemManager";

export default {
  name: "Admin",
  components: {
    Header,
    AdminHero,
    UserManager,
    ProblemManager,
  },
  data() {
    return {
      switcher: "user",
    };
  },
  computed: {
    isUsers() {
      return this.switcher === "user";
    },
  },
};
</script>

<style scoped>
#switcher {
  display: grid;
  place-items: center;
  grid-auto-flow: column;
}

input.tab {
  display: none;
}

input.tab + label {
  cursor: pointer;
  float: left;
  border: 2px solid rgb(95, 95, 95);
  border-radius: 2rem;
  margin-right: 2px;
  margin-left: 2px;
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
</style>
