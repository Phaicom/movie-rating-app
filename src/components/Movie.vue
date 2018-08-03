<template>
  <el-container style="text-align:center;">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image">
      <div style="padding: 14px;">
        <span>{{ movie.name }}</span>
        <div class="bottom">
          <time class="time">{{ movie.release_year }} ‧ {{ movie.genre }}</time>
          <p>{{ movie.description }}</p>
          <h6 v-if="!isRate" @click="isRate=!isRate">Rate this movie</h6>
          <span @click="rate">
            <el-rate v-if="isRate" v-model="rating"></el-rate>
          </span>
        </div>
      </div>
    </el-card>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Movie",
  data() {
    return {
      movie: [],
      rating: 0,
      isRate: false
    };
  },
  mounted() {
    this.fetchMovie();
  },
  methods: {
    async rate() {
      const movieId = this.$route.params.id;
      return axios({
        method: "post",
        data: {
          rate: this.rating
        },
        url: `/movies/rate/${movieId}`,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(() => {
          this.$alert(`Thank you for rating! ${this.rating}`, {
            confirmButtonText: "OK"
          });
        })
        .catch(error => {
          const message = error.response.data.message;
          this.$alert(`${message}`, "Oh oo!", {
            confirmButtonText: "OK"
          });
        });
    },
    async fetchMovie() {
      return axios({
        method: "get",
        url: `/movies/${this.$route.params.id}`
      })
        .then(response => {
          this.movie = response.data;
        })
        .catch(() => {});
    }
  }
};
</script>
