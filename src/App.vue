<template>
  <div id="app">
    <el-container>
      <el-header style="text-align: right">
        <router-link :to="{ name : 'AddMovie'}">
          <el-button type="text" v-if="current_user">ADD MOVIE</el-button>
        </router-link>
        <el-button type="text" v-if="current_user">{{ current_user.email }}</el-button>
        <router-link :to="{ name : 'Register'}">
          <el-button type="text" v-if="!current_user">Register</el-button>
        </router-link>
        <router-link :to="{ name : 'Login'}">
          <el-button type="text" v-if="!current_user" class="login">Login</el-button>
        </router-link>
        <el-button type="text" v-if="current_user" @click="logout">Logout</el-button>
      </el-header>
      <el-container>
        <el-aside class="el-aside" width="auto">
          <el-menu default-active="2" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-menu-item index="1" @click="isCollapse=!isCollapse">
              <i :class="[isCollapse ? 'el-icon-plus' : 'el-icon-close']"></i>
            </el-menu-item>
            <router-link v-bind:to="{ name: 'Home' }" class="side_bar_link">
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">Home</span>
              </el-menu-item>
            </router-link>
            <router-link v-bind:to="{ name: 'Contacts' }" class="side_bar_link">
              <el-menu-item index="3">
                <i class="el-icon-message"></i>
                <span slot="title">Contacts</span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
      <el-footer>&copy; 2018</el-footer>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import "./assets/stylesheets/main.css";
import bus from "./bus";

export default {
  data() {
    return {
      isCollapse: true,
      current_user: null
    };
  },
  mounted() {
    this.fetchUser();
    this.listenToEvents();
  },
  methods: {
    listenToEvents() {
      bus.$on("refreshUser", () => {
        this.fetchUser();
      });
    },
    async fetchUser() {
      return axios({
        method: "get",
        url: "/api/current_user"
      })
        .then(response => {
          this.current_user = response.data.current_user;
        })
        .catch(() => {});
    },
    logout() {
      return axios({
        method: "get",
        url: "/api/logout"
      })
        .then(() => {
          bus.$emit("refreshUser");
          this.$router.push({ name: "Home" });
        })
        .catch(() => {});
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
