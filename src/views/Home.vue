<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="movie in movies" :key="movie._id">
      <router-link v-bind:to="`/movies/${movie._id}`" class="side_bar_link">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image">
          <div style="padding: 14px;">
            <span>{{ movie.name }}</span>
            <div class="bottom">
              <time class="time">{{ movie.release_year }} ‧ {{ movie.genre }}</time>
            </div>
          </div>
        </el-card>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";

export default {
  name: "movies",
  computed: {
    movies() {
      return this.$store.getters.fetchMovies;
    }
  },
  mounted() {
    this.$store.dispatch("fetchMovies");
  }
  // mounted() {
  //   this.fetchMovies();
  // },
  // methods: {
  //   async fetchMovies() {
  //     const token = window.localStorage.getItem("auth");
  //     return axios({
  //       method: "get",
  //       url: "/movies",
  //       headers: {
  //         Authorization: `JWT ${token}`,
  //         "Content-Type": "application/json"
  //       }
  //     })
  //       .then(response => {
  //         this.movies = response.data.movies;
  //         this.current_user = response.data.current_user;
  //       })
  //       .catch(err => {
  //         console.log("error", err);
  //       });
  //   }
  // }
};
</script>
