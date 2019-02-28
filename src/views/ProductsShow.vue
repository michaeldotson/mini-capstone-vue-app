<template>
  <div class="products-show">

    <h2> {{ product.name }} </h2>
    <img :src="product.images[0].url" alt="">
    <p>Price: ${{ product.price }} </p>
    <p>Description: {{ product.desription }} </p>

    <router-link to="/">Back to All Products</router-link><br>
    <router-link v-bind:to="'/products/' + product.id + '/edit'" >Edit</router-link><br>
    <button v-on:click="destroyRecipe()">Destroy</button><br>
  
  <p>{{$parent.user.name}}</p>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data: function() {
    return {
      product: {}
    };
  },
  created: function() {
    axios.get("/api/products/" + this.$route.params.id).then(response => {
      console.log(response.data);
      this.product = response.data;
    });
  },
  methods: {
    destroyProduct: function() {
      axios.delete("/api/products/" + this.product.id).then(response => {
        console.log("BOOM! It's gone.", response.data);
        this.$router.push("/");
      });
    }
  }
};
</script>