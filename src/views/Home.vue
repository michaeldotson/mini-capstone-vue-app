<template>
  <div class="home">
    <h1>{{ message }}</h1>
    
    <h1>New Product</h1>
      
    <div>
      Name: <input type="text" v-model="newProductName"><br>
      Price: <input type="text" v-model="newProductPrice"><br>
      Description: <input type="text" v-model="newProductDescription">
      <br>
      Supplier: <input type="text" v-model="newProductSupplier"><br>
      Image Url: <input type="text" v-model="newProductImageUrl">
      <br>
      <div>{{ newProductName }}</div>
      <button v-on:click="createProduct()">Create</button>
    </div>

    <h2>All Products</h2>

    <div> {{ currentProduct }} </div>

    <div v-for="product in products">
      <h3>Name: {{product.name }}</h3>
        <div v-for="image in product.images">
          <img :src="image.url" :alt="product.name">
        </div>
        <div>
          <button v-on:click="showProduct(product)">More Info</button>
        </div>
        <div v-if="currentProduct === product">
          <p>Price: {{ product.formatted.price }}</p>
          <p>Description: {{ product.description }}</p>
          <h4> Edit Product</h4>
          <div>
            Name: <input type="text" v-model="product.name"><br>
            Price: <input type="text" v-model="product.price"><br>
            Description: <input type="text" v-model="product.description"><br>
            Supplier: <input type="text" v-model="product.supplier_id"><br>
            Image URL: <input type="text" v-model="product.images[0].url"><br>
            <button v-on:click="updateProduct(product)">Update</button>
            <button v-on:click="destroyProduct(product)">Destroy</button>
          </div>
        </div>
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
      message: "Marty Mar's Specialty Shop",
      products: [],
      currentProduct: {},
      newProductName: "",
      newProductPrice: "",
      newProductDescription: "",
      newProductSupplier: "",
      newProductImageUrl: ""
    };
  },
  created: function() {
    axios.get("/api/products").then(response => {
      this.products = response.data;
    });
  },
  methods: {
    createProduct: function() {
      var productParams = {
        name: this.newProductName,
        price: this.newProductPrice,
        description: this.newProductDescription,
        supplier_id: this.newProductSupplier,
        image_url: this.newProductImageUrl

      };
      axios.post("/api/products", productParams).then(response => {
        console.log("Success!", response.data);
        this.products.push(response.data);
      });
    },
    showProduct: function(product) {
      if (this.currentProduct === product) {
        this.currentProduct = {}; 
      } else {
        this.currentProduct = product;
      }
    },
    updateProduct: function(product) {
      var productParams = {
        name: product.name,
        price: product.price,
        description: product.description,
        supplier_id: product.supplier_id
      };
      axios.patch("/api/products/" + product.id, productParams).then(response => {
        console.log("Success!", response.data);
        product = response.data;
      });
    },
    destroyProduct: function(product) {
      axios.delete("/api/products/" + product.id).then(response => {
        console.log("BOOM! It's gone.", response.data);
        var index = this.products.indexOf(product);
        this.products.splice(index, 1);
      });
    }
  }
};
</script>