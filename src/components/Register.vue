<template>
  <el-form :model="form" :rules="rules" ref="form" label-width="120px">
    <el-form-item label="Name" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="Confirm Password" prop="confirm_password">
      <el-input v-model="form.confirm_password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">Submit</el-button>
      <el-button @click="resetForm('form')">Clear</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        confirm_password: ""
      },
      rules: {
        name: { required: true, trigger: "blur" },
        email: [
          { required: true, trigger: "blur" },
          { type: "email", message: "Please input correct email address", trigger: ["blur", "change"] }],
        password: { required: true, trigger: "blur" },
        confirm_password: { required: true, trigger: "blur" }
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
              name: this.form.name,
              email: this.form.email,
              password: this.form.password
            },
            url: "/users/register",
            header: {
              "Content-Type": "application/json"
            }
          })
            .then(() => {
              this.$alert("You have been successfully registered!", {
                confirmButtonText: "OK"
              });
              this.$router.push({ name: "Login" });
            })
            .catch(error => {
              const message = error.response.data.message;
              this.$alert(`${message}`, {
                confirmButtonText: "OK"
              });
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
