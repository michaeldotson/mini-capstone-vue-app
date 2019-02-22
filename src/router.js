import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import ProductNew from './views/ProductNew.vue';
import ProductShow from './views/ProductShow.vue';
import ProductEdit from './views/ProductEdit.vue';

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
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/product/new',
      name: 'products-new',
      component: ProductNew
    },
    {
      path: '/products/:id',
      name: 'products-show',
      component: ProductShow
    },
    {
      path: '/products/:id/edit',
      name: 'products-edit',
      component: ProductEdit
    }

  ]
});
