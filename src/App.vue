<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item me-3">
            <router-link to="/customers" exact-active-class="active-link" class="nav-link">
              <i class="fa-solid fa-users-line"></i> Customers
            </router-link>
          </li>
          <li class="nav-item me-3">
            <router-link to="/products" exact-active-class="active-link" class="nav-link">
              <i class="fa-solid fa-box-open"></i> Products
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/orders" exact-active-class="active-link" class="nav-link">
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
