<template>
  <div class="home">
    <div id='map'></div>

    <h2>All Products</h2>

    <datalist id="productTitles">
      <option v-for="product in products">{{ product.name }}</option>
    </datalist>
    <div>
      <button class="btn btn-primary" v-on:click="setSortAttribute('name')">Sort By Name 
        <span v-if="sortAttribute == 'name' && sortAscendng == 1">^</span>
        <span v-if="sortAttribute == 'name' && sortAscendng == -1">v</span>
      </button> |
      <button class="btn btn-primary" v-on:click="setSortAttribute('price')">Sort By Price
        <span v-if="sortAttribute == 'price' && sortAscendng == 1">^</span>
        <span v-if="sortAttribute == 'price' && sortAscendng == -1">v</span>
      </button>
    </div><br>
    
    
    <div class="card-columns">
      <div is="transition-group" name="fade">
      <div v-for="product in orderBy(filterBy(products, $parent.titleFilter, 'name', 'price'), sortAttribute, sortAscending)"  v-bind:key="product.id" class="col-md-4"> 
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
      </div>
    </div>
    
  </div>
</template>


<style>
  /* Vue.js fade */
/*.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}*/
  #map { 
    width: inherit; 
    height: 400px; 
  }
</style>

<script>
import axios from 'axios';
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      products: [],
      currentProduct: {},
      titleFilter: '',
      sortAttribute: 'name',
      sortAscending: 1
    };
  },
  created: function() {
    axios.get("/api/products").then(response => {
      this.products = response.data;
    });
  },
  mounted: function() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZG90bWlrMSIsImEiOiJjanNvd3NybnkwcmhzNDltcGwzdG1kdDI0In0.Skix4a-Eja2GgStkjLzjlA';

    //Historical Landmarks
    var losAngeles = [-118.2437, 34.0522];
    var places = [
      {
        lat: 34.1341,
        long: -118.3215,
        description: "Hollywood Sign"
      },
      {
        lat: 34.0913,
        long: -118.3794,
        description: "Sunset Strip"
      }
    ];

    //create the map
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
      center: [places[0].long, places[0].lat], // starting position [lng, lat]
      zoom: 8 // starting zoom
    });

    places.forEach(function(place) {
      // create the popup
      var popup = new mapboxgl.Popup({ offset: 25 })
        .setText(place.description);
      var marker = new mapboxgl.Marker()
        .setLngLat([place.long, place.lat])
        .setPopup(popup) // sets a popup on this marker
        .addTo(map);
    });

    // var directions = axios.get("'https://api.mapbox.com/directions/v5/mapbox/driving-traffic/' + ${place.long} + ',' + ${place.lat} + ';-122.4194, 37.7749?access_token=pk.eyJ1IjoiZG90bWlrMSIsImEiOiJjanNvd3NybnkwcmhzNDltcGwzdG1kdDI0In0.Skix4a-Eja2GgStkjLzjlA'").then(response => {
    //   var route = response.data;
    // });
    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    }));
  },

  methods: {
    setSortAttribute: function(attribute) {
      if (this.sortAttribute === attribute) {
        this.sortAscending = this.sortAscending * -1;
      } else {
        this.sortAscending = 1;
      } 
      this.sortAttribute = attribute; 
    }
  }
};
</script>