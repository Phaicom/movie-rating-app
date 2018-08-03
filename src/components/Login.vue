<template>
  <el-form :model="form" :rules="rules" ref="form" label-width="120px">
    <el-form-item label="Email" prop="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">Submit</el-button>
      <el-button @click="resetForm('form')">Clear</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
import bus from "./../bus";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          { required: true, trigger: "blur" },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"]
          }
        ],
        password: { required: true, trigger: "blur" }
      }
    };
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          return axios({
            method: "post",
            data: {
              email: this.form.email,
              password: this.form.password
            },
            url: "/users/login",
            header: {
              "Content-Type": "application/json"
            }
          })
            .then(response => {
              window.localStorage.setItem("auth", response.data.token);
              this.$alert("You are ready to start!", {
                confirmButtonText: "OK"
              });
              bus.$emit("refreshUser");
              this.$router.push({ name: "Home" });
            })
            .catch(error => {
              const message = error.response.data.message;
              this.$alert(`${message}`, {
                confirmButtonText: "OK"
              });
              this.$router.push({ name: "Login" });
            });
        }
        return true;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
