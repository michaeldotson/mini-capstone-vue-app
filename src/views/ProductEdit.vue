<template>
  <div class="products-edit">

    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>

    <h4> Edit Product</h4>
    <form v-on:submit.prevent="submit()">
      <div>
        Name: <input type="text" v-model="product.name">
      </div>
      <div>
        Price: <input type="text" v-model="product.price">
      </div>
      <div>
        Description: <input type="text" v-model="product.description">
      </div>
      <div>
        Image Url: <input type="text" v-model="product.images[0].url">
      </div>

      <div>
        <input type="submit" value="Update">
      </div>
      
    </form>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data: function() {
    return {
      product: {},
      errors: [],
      status: ""
    };
  },
  created: function() {
    axios.get("/api/products/" + this.$route.params.id).then(response => {
      console.log(response.data);
      this.product = response.data;
    });
  },
  methods: {
    submit: function(product) {
      var productParams = {
        name: this.product.name,
        price: this.product.price,
        description: this.product.description,
        image_url: this.product.images[0].url,
        supplier_id: 1
      };
      axios.patch("/api/products/" + this.product.id, productParams).then(response => {
        console.log("BOOM!! It's been updated.", response.data);
        this.$router.push("/products/" + this.product.id);
      }).catch(error => {
        this.errors = error.response.data.errors;
        this.status = error.response.status;
      });
    },
  }
};
</script>