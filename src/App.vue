<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item me-3">
            <router-link
              to="/customers"
              class="nav-link"
              :class="{ 'active-link': activeRoute === 'customers' }"
              @click="setActiveRoute('customers')"
            >
              <i class="fa-solid fa-users-line"></i> Customers
            </router-link>
          </li>
          <li class="nav-item me-3">
            <router-link
              to="/products"
              class="nav-link"
              :class="{ 'active-link': activeRoute === 'products' }"
              @click="setActiveRoute('products')"
            >
              <i class="fa-solid fa-box-open"></i> Products
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/orders"
              class="nav-link"
              :class="{ 'active-link': activeRoute === 'orders' }"
              @click="setActiveRoute('orders')"
            >
              <i class="fa-solid fa-cart-shopping"></i> Orders
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <router-view></router-view>
</template>

<script setup>
import { ref } from 'vue';

const activeRoute = ref('customers'); 
const setActiveRoute = (route) => {
  activeRoute.value = route; 
};
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}

.container {
  max-width: 1140px;
}

.nav-link {
  color: black;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #0056b3;
}

.active-link {
  color: #0056b3 !important; 
}
</style>
