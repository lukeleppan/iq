<template>
  <router-view />
</template>

<script>
import { useToast } from "vue-toastification";
import { mapActions, mapGetters } from "vuex";

export default {
  sockets: {
    connect() {
      if (this.jwt) {
        this.$socket.client.emit("join_main", {
          username: this.jwtData.sub,
          name: this.jwtData.name,
          room: "main",
        });
      } else {
        this.$socket.client.emit("join_guest", {});
      }
      this.$socket.client.on("show_message", (payload) => {
        const toast = useToast();
        toast(payload.text);
      });
      this.$socket.client.on("info_message", (payload) => {
        const toast = useToast();
        toast.info(payload.text);
      });
      this.$socket.client.on("success_message", (payload) => {
        const toast = useToast();
        toast.success(payload.text);
      });
      this.$socket.client.on("error_message", (payload) => {
        const toast = useToast();
        toast.error(payload.text);
      });
    },
  },
  computed: {
    ...mapGetters(["jwt", "jwtData"]),
  },
  methods: {
    ...mapActions(["fetchJWT"]),
  },
  created() {
    this.fetchJWT();
    this.$socket.client.open();
  },
  unmounted() {
    this.$socket.client.close();
  },
};
</script>

<style>
@font-face {
  font-family: "Cabin";
  font-weight: normal;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local("Cabin"), url("/fonts/Cabin/Cabin-Bold.ttf") format("ttf"),
    url("/fonts/Cabin/Cabin-BoldItalic.ttf") format("ttf"),
    url("/fonts/Cabin/Cabin-Italic.ttf") format("ttf"),
    url("/fonts/Cabin/Cabin-Medium.ttf") format("ttf"),
    url("/fonts/Cabin/Cabin-MediumItalic.ttf") format("ttf"),
    url("/fonts/Cabin/Cabin-Regular.ttf") format("ttf"),
    url("/fonts/Cabin/Cabin-SemiBold.ttf") format("ttf"),
    url("/fonts/Cabin/Cabin-SemiBoldItalic.ttf") format("ttf");
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Poppins", sans-serif;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border-style: solid;
  border-color: black;
  border-width: 2px;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
