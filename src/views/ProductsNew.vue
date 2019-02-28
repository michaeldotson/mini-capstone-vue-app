<template>
  <div class="products-new">
    <h1>New Product</h1>

    <ul>
      <li v-for="error in errors"> {{ error }}</li>
    </ul>

    <form v-on:submit.prevent="submit()">
      <div>
        Name: <input type="text" v-model="newProductName">
      </div>
      <div>
        Price: <input type="text" v-model="newProductPrice">
      </div>
      <div>
        Description: <input type="text" v-model="newProductDescription">
      </div>
      <div>
        Image Url: <input type="text" v-model="newProductImageUrl">
      </div>

      <div>{{ newProductName }}</div>

      <div>
        <input type="submit" value="Create">
      </div>
    </form>
    
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data: function() {
    return {
      message: "Marty Mar's Specialty Shop",
      newProductName: "",
      newProductPrice: "",
      newProductDescription: "",
      newProductImageUrl: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var productParams = {
        name: this.newProductName,
        price: this.newProductPrice,
        description: this.newProductDescription,
        supplier_id: 1,
        image_url: this.newProductImageUrl

      };
      axios.post("/api/products", productParams).then(response => {
        console.log("Success!", response.data);
        this.$router.push("/");
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    },
  }
};
</script>