<template>
  <div class="home">

    <h2>All Products</h2>

    <!-- <div> {{ currentProduct }} </div> -->
    
    <!-- <div class="card-columns"> -->
    <div class="card-deck">
      <!-- <div class="card"> -->
      <div v-for="product in products">
        
        <router-link v-bind:to="'/products/' + product.id">
          <div class="card" style="width: 18rem;">
            <div v-for="image in product.images">
              <img :src="image.url" class="card-img-top" :alt="product.name">
            </div>

            <div class="card-body">
              <p class="card-text">{{ product.name }}</p>
            </div>
          </div>
        </router-link> 

          <div v-if="currentProduct === product">
            <p>Price: {{ product.formatted.price }}</p>
            <p>Description: {{ product.description }}</p>
            <h4> Edit Product</h4>
            <div>
              Name: <input type="text" v-model="product.name"><br>
              Price: <input type="text" v-model="product.price"><br>
              Description: <input type="text" v-model="product.description"><br>
              Image URL: <input type="text" v-model="product.images[0].url"><br>
              <button v-on:click="updateProduct(product)">Update</button>
              <button v-on:click="destroyProduct(product)">Destroy</button>
            </div>
          </div>
      </div>
    </div> <!--remove this one if going back to card-columns above -->
    </div>
  </div>

</template>

<style>
img {
  width: 300px;
}
</style>

<script>

var axios = require("axios");

export default {
  data: function() {
    return {
      products: [],
      currentProduct: {},
    };
  },
  created: function() {
    axios.get("/api/products").then(response => {
      this.products = response.data;
    });
  },
  methods: {
    
  }
};
</script>