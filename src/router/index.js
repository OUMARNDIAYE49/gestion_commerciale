import { createRouter, createWebHistory } from 'vue-router';
import CustomersList from '../views/customer/CustomersList.vue'; 
import ProductsList from '../views/product/ProductsList.vue';   
import OrdersList from '../views/Order/OrdersList.vue';      
import AddOrderForm from '../views/Order/AddOrderForm.vue';          
import EditOrderForm from '../views/Order/EditOrderForm.vue';  
import ViewOrderForm from '../views/Order/ViewOrderForm.vue';


              

const routes = [
  { path: '/Customers', name: 'Customers', component: CustomersList },
  { path: '/Products', name: 'Products', component: ProductsList },
  { path: '/Orders', name: 'Orders', component: OrdersList },
  { path: '/add-order', name: 'AddOrderForm', component: AddOrderForm },
  { path: '/edit-order/:id', name: 'EditOrderForm', component: EditOrderForm },
  { path: '/view-order/:id', name: 'ViewOrderForm', component: ViewOrderForm},
  { path: '/', redirect: '/Customers' } 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
