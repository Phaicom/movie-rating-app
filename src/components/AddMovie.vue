<template>
  <el-form :model="movieForm" :rules="rules" ref="movieForm" label-width="120px" class="movieForm">
    <el-form-item label="Movie name" prop="name">
      <el-input v-model="movieForm.name"></el-input>
    </el-form-item>
    <el-form-item label="Description" prop="description">
      <el-input type="textarea" v-model="movieForm.description"></el-input>
    </el-form-item>
    <el-form-item label="Release year" prop="release_year">
      <el-select v-model="movieForm.release_year" placeholder="Release year" style="width:100%;">
        <el-option v-for="year in years" :key="year" :value="year"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Genre" prop="genre">
      <el-input v-model="movieForm.genre"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('movieForm')">Create</el-button>
      <el-button @click="resetForm('movieForm')">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      movieForm: {
        name: "",
        description: "",
        release_year: "",
        genre: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Movie name",
            trigger: "blur"
          },
          {
            min: 5,
            max: 20,
            message: "Length should be 5 to 20",
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: "Please input Description",
            trigger: "blur"
          }
        ],
        release_year: [
          {
            required: true,
            message: "Please select Release year",
            trigger: "change"
          }
        ],
        genre: [
          {
            required: true,
            message: "Please input Genre",
            trigger: "blur"
          }
        ]
      },
      years: ["2018", "2017", "2016", "2015"]
    };
  },
  methods: {
    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       return axios({
    //         method: "post",
    //         data: {
    //           name: this.movieForm.name,
    //           description: this.movieForm.description,
    //           release_year: this.movieForm.release_year,
    //           genre: this.movieForm.genre
    //         },
    //         url: "/movies",
    //         headers: {
    //           "Content-Type": "application/json"
    //         }
    //       })
    //         .then(() => {
    //           this.$alert("Movie added successfully!", {
    //             confirmButtonText: "OK"
    //           });
    //           this.$router.push({ name: "Home" });
    //           this.$refs[formName].resetFields();
    //         })
    //         .catch(() => {
    //           this.$alert("Could not add the movie!", {
    //             confirmButtonText: "OK"
    //           });
    //         });
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const movie = {
            name: this.movieForm.name,
            description: this.movieForm.description,
            release_year: this.movieForm.release_year,
            genre: this.movieForm.genre
          };
          this.$store.dispatch("addMovie", movie);
          this.$refs[formName].resetFields();
          this.$router.push({ name: "Home" });
        }
      });
      return true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
