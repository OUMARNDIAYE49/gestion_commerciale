<template>
  <div class="container mt-5">
    <!-- Barre de navigation centrée et alignée avec le contenu -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid justify-content-start">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/customers" class="nav-link"><i class="fa-solid fa-users-line"></i>Customers</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/products" class="nav-link"><i class="fa-solid fa-box-open"></i>Products</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/orders" class="nav-link">  <i class="fa-solid fa-cart-shopping">  </i>Orders</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Contenu dynamique selon la route -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Styles pour aligner la barre de navigation avec le contenu */
.container {
  /* margin-top: 50px; */
  max-width: 960px; /* Ajuster la largeur du conteneur pour qu'elle corresponde à la table */
}


.nav-link {
  font-weight: bold;
  color: #007bff;
}

.nav-link:hover {
  text-decoration: underline;
  color: #0056b3;
}
</style>
