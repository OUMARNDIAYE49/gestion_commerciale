import { createRouter, createWebHistory } from 'vue-router';
import CustomersList from '../views/customer/CustomersList.vue';  // Composant des clients
import ProductsList from '../views/product/ProductsList.vue';   // Composant des produits
import OrdersList from '../views/Order/OrdersList.vue';       // Composant des commandes
// import CustomersList from '../views/customer/CustomersList.vue';
              

const routes = [
  { path: '/Customers', name: 'Customers', component: CustomersList },
  { path: '/Products', name: 'Products', component: ProductsList },
  { path: '/Orders', name: 'Orders', component: OrdersList },
  { path: '/', redirect: '/customers' }  // Redirection vers la page clients par défaut

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
