## Gestion Commerciale

## Description du Projet

ABC Corporation souhaite développer une application Frontend dynamique avec Vue.js pour gérer des données commerciales via des opérations CRUD (Créer, Lire, Mettre à jour, Supprimer). l'entreprise s'inspire d'une application concurrente et vise à créer une interface ergonomique axée sur l'expérience utilisateur .

## Objectifs du Projet

- Développer une application Vue.js avec des interfaces dynamiques et intuitives.
- Implémenter les fonctionnalités CRUD pour la gestion des données.
- Optimiser l'expérience utilisateur avec une interface ergonomique et réactive.
- S'inspirer de l'application concurrente fournie pour le design et l'architecture fonctionnelle.

## Technologies Utilisées

- **Vue.js** : Le framework JavaScript principal pour le développement de l'application frontend.
- **Vue Router** : Pour la gestion des différentes vues/pages de l'application.
- **Bootstrap** : Pour une mise en page et un design moderne et réactif (ou autre framework CSS selon les besoins).

## Installation et Lancement

### Prérequis

- **Node.js** : Assurez-vous d'avoir installé [Node.js](https://nodejs.org/) sur votre machine.

### Étapes d'installation

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/OUMARNDIAYE49/gestion_commerciale.git
   ```

2. **Accéder au répertoire du projet**

   ```bash
   cd gestion-commerciale
   ```

3. **Installer les dépendances**

   ```bash
   npm install
   ```

4. **Lancer l'application**

```bash
   npm run dev
```

## Fonctionnalités CRUD (Create, Read, Update, Delete)

### Gestion des Produits

-- **Ajouter un produit** : Le formulaire permet d'entrer les informations du produit, telles que le nom, le prix et la quantité en stock.
-- **Lister les produits** : Affichage dynamique de la liste des produits avec une fenetre modal pour faciliter la navigation.
-- **Modifier un produit** : Une vue détaillée permet de modifier les informations d'un produit existant.
-- **Supprimer un produit** : Suppression de produit avec une boîte de confirmation pour éviter les suppressions accidentelles.

### Gestion des Clients

-- **Ajouter un client** : Le formulaire permet d'ajouter un nouveau client en renseignant des informations comme le nom, l'adresse ,l'email et le numéro de téléphone.
-- **Lister les clients** : Affichage d'une liste des clients avec pagination pour une gestion facile.
-- **Modifier un client** : Possibilité de mettre à jour les informations d'un client spécifique via une interface de modification intuitive.
-- **Supprimer un client**: Suppression d'un client après confirmation, avec mise à jour instantanée de la liste.

### Gestion des Commandes

-- **Ajouter une commande** : Enregistrement des nouvelles commandes avec les produits associés.
-- **Lister les commandes** : Affichage de toutes les commandes avec pagination pour une vue claire des transactions.
-- **Modifier une commande** : Mise à jour des détails d'une commande, y compris la commande.
-- **Supprimer une commande** : Fonction de suppression de commande avec confirmation.

## Améliorations Futures

- Intégration d'une API backend pour rendre les opérations CRUD persistantes.
- Implémentation d'un système d'authentification pour gérer les utilisateurs et leurs permissions.

## Auteur

- [Oumar Djiby Ndiaye](https://github.com/OUMARNDIAYE49/gestion_commerciale.git)
 