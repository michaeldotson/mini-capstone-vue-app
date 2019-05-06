<template>
  <div class="signup">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Signup</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Name" v-model="name">
          <span v-if="name.length > 0" class="text-primary">{{ 50 - name.length }} characters remaining</span>
        </div>
        <div class="form-group">
          <input type="email" class="form-control" placeholder="Email" v-model="email">
        </div>
        <div class="form-group">
          <input type="password" v-bind:class="{ 'form-control-danger': (password.length > 0 && password.length < 8) || password.length > 20 }" class="form-control" placeholder="Password" v-model="password">
          <!-- <span v-if="(password.length > 0 && password.length < 8) || password.length > 20" class="text-danger">Password must be between 8 and 20 characters</span> -->
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Password Confirmation" v-model="passwordConfirmation">
          <span v-if="passwordConfirmation.length > 0 && passwordConfirmation !== password" class="text-danger">Must match password</span>
        </div>
        <div class="form-group">
          <input type="file" class="form-control" v-on:change="setFile($event)" ref="fileInput">
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </div>
  </div>
</template>

<style>
  .form-control-danger, .form-control-danger:active {
    border: 2px solid red;
  }
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      avatar: "",
      errors: []
    };
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.avatar = event.target.files[0];
      }
    },
    submit: function() {
      var formData = new FormData();
      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("password_confirmation", this.passwordConfirmation);
      formData.append("avatar", this.avatar);

      axios
        .post("/api/users", formData)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>