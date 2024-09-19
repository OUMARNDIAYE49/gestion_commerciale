<!-- src/components/Navbar.vue -->
<template>
  <!-- Barre de navigation centrée et alignée avec le contenu -->
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

  <!-- Contenu dynamique selon la route -->
  <router-view></router-view>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
/* Styles pour aligner la barre de navigation avec le contenu */
.navbar {
  margin-bottom: 20px; /* Espace sous la barre de navigation */
}

.container {
  max-width: 1140px; /* Largeur du conteneur ajustée pour plus d'espace */
}

/* .nav-link {
  font-weight: bold;
  color: #007bff;
} */

.nav-link:hover {
  text-decoration: underline;
  color: #0056b3;
}
</style>
