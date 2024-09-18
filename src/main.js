// Importations nécessaires
import { createApp } from 'vue';        // Crée une application Vue
import App from './App.vue';            // Composant racine de l'application
import router from './router';          // Importer le routeur pour la navigation
import 'bootstrap/dist/css/bootstrap.min.css';  // Importation du fichier CSS Bootstrap 5
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Importation des fonctionnalités JavaScript de Bootstrap 5
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';



// Créer et monter l'application Vue en utilisant Vue Router
createApp(App)
  .use(router)   // Utiliser le routeur pour gérer les routes
  .mount('#app');  // Monter l'application sur l'élément HTML avec l'ID "app"
