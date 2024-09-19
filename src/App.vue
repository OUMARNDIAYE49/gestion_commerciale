
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item me-3">
            <router-link to="/customers" class="nav-link">
              <i class="fa-solid fa-users-line"></i> Customers
            </router-link>
          </li>
          <li class="nav-item me-3">
            <router-link to="/products" class="nav-link">
              <i class="fa-solid fa-box-open"></i> Products
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/orders" class="nav-link">
              <i class="fa-solid fa-cart-shopping"></i> Orders
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <router-view></router-view>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>

.navbar {
  margin-bottom: 20px; 
}

.container {
  max-width: 1140px; 
}

.nav-link:focus {
  text-decoration: underline;
  color: #0056b3;
}
</style>
