import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ProductsNew from './views/ProductsNew.vue';
import ProductsShow from './views/ProductsShow.vue';
import ProductsEdit from './views/ProductsEdit.vue';
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/products/new',
      name: 'products-new',
      component: ProductsNew
    },
    {
      path: '/products/:id',
      name: 'products-show',
      component: ProductsShow
    },
    {
      path: '/products/:id/edit',
      name: 'products-edit',
      component: ProductsEdit
    },
    { path: "/signup", 
      name: "signup",   
      component: Signup 
    },
    { path: "/login", 
      name: "login",   
      component: Login 
    },
    { path: "/logout", 
      name: "logout",   
      component: Logout 
    }

  ]
});
