<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">Marty Mar's Shop</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li><router-link to="/">Home</router-link> | </li>
            <li><router-link to="/products/new">New Product</router-link> | </li>
            <span v-if="isLoggedIn()">
                <li><router-link to="/logout">Logout</router-link></li>
                <li><router-link to="/users/me"><img :src="user.avatar_url" alt=""></router-link></li>
              </span>
            <span v-else>
            <li><router-link to="/login">Login</router-link> | </li>
            <li class="cta"><router-link to="/signup">Signup</router-link></li>
            </span>
            <li><input type="text" class="form-control" placeholder="Search" v-model="titleFilter"></li>
          </ul>
        </div>
      </nav>
      
    </div>
    <div>
      <router-view/>
    </div>
    
  </div>
</template>
<style>
  li a.router-link-exact-active {
    color: #27E1CE !important;
  }
  li img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
</style>



<script>
import axios from 'axios';

export default {
  data: function() {
    return {
      titleFilter: "",
      user: {}
    };
  },
  created: function() {
    axios.get("/api/users/me").then(response => {
      this.user = response.data;
      console.log(this.user);
    });
  },
  methods: {
    isLoggedIn: function() {
      return localStorage.getItem('jwt');
    }
  }
};
</script>
