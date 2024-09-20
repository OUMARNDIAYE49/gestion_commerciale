<template>
    <div class="container mt-5">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1>Edit Order</h1>
        <div class="d-flex justify-content-end">
          <button class="btn btn-secondary me-2" @click="goHome">Orders List</button>
          <button class="btn btn-primary" @click="submitOrder">Save Changes</button>
        </div>
      </div>
      <form @submit.prevent="submitOrder">
        <div class="row mb-3">
          <div class="col-md-3">
            <label for="date" class="form-label">Date</label>
            <input type="date" id="date" v-model="order.date" class="form-control" required>
          </div>
          <div class="col-md-3">
            <label for="customer" class="form-label">Customer Name</label>
            <input type="text" id="customer" v-model="order.customer" class="form-control" required>
          </div>
          <div class="col-md-3">
            <label for="deliveryAddress" class="form-label">Delivery Address</label>
            <input type="text" id="deliveryAddress" v-model="order.deliveryAddress" class="form-control" required>
          </div>
          <div class="col-md-3">
            <label for="trackNumber" class="form-label">Track Number</label>
            <input type="text" id="trackNumber" v-model="order.trackNumber" class="form-control" required>
          </div>
        </div>
        <div class="mb-3">
          <label for="status" class="form-label">Order Status</label>
          <select id="status" v-model="order.status" class="form-select" required>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
  
        <!-- Product Details -->
        <h3>Order Details</h3>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in order.products" :key="index">
              <td>
                <select v-model="product.name" class="form-select">
                  <option value="Product 1">Product 1</option>
                  <option value="Product 2">Product 2</option>
                  <option value="Product 3">Product 3</option>
                </select>
              </td>
              <td><input type="number" v-model="product.quantity" class="form-control" min="1"></td>
              <td><input type="number" v-model="product.price" class="form-control" min="0"></td>
              <td>
                <button type="button" class="btn btn-danger" @click="removeProduct(index)">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button" class="btn btn-success" @click="addProduct">Add New Detail</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  export default {
    name: 'EditOrderForm',
    setup() {
      const router = useRouter();
      const route = useRoute();
      const orderId = route.params.id; // Récupère l'ID de la commande via la route

      const order = ref({
        date: '',
        customer: '',
        deliveryAddress: '',
        trackNumber: '',
        status: 'Processing',
        products: []
      });

      // Chargement des données de la commande existante
      onMounted(() => {
        fetchOrderDetails(orderId);
      });

      const fetchOrderDetails = (id) => {
        // Simule la récupération des données de la commande à partir de l'ID
        // Remplace ceci par ta logique de récupération de données
        const existingOrder = {
          date: '2024-07-25',
          customer: 'John Doe',
          deliveryAddress: '123 Main St',
          trackNumber: 'TN001',
          status: 'Shipped',
          products: [
            { name: 'Product 1', quantity: 2, price: 20 },
            { name: 'Product 2', quantity: 1, price: 50 }
          ]
        };

        // Charge les données de la commande dans le formulaire
        order.value = existingOrder;
      };

      const addProduct = () => {
        order.value.products.push({ name: '', quantity: 1, price: 0 });
      };

      const removeProduct = (index) => {
        // Vérifie s'il y a plus d'un produit avant de supprimer
        if (order.value.products.length === 1) {
          alert('You cannot remove the last product from the order.');
          return;
        }
        order.value.products.splice(index, 1);
      };

      const submitOrder = () => {
        console.log('Order Updated:', order.value);
        alert('Order has been successfully updated!');
        router.push('/Orders');
      };

      const goHome = () => {
        router.push('/Orders');
      };

      return {
        order,
        addProduct,
        removeProduct,
        submitOrder,
        goHome
      };
    }
  };
</script>

  
  <style scoped>
  /* Styles identiques à ceux que tu as fournis */
  .container {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .table {
    border-collapse: separate;
    border-spacing: 0 15px;
  }
  
  .table th {
    background-color: #343a40;
    color: white;
    font-weight: bold;
  }
  
  .table td {
    background-color: #ffffff;
  }
  
  .table-hover tbody tr:hover {
    background-color: #f1f1f1;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    transition: background-color 0.3s ease;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  
  .btn-success {
    background-color: #28a745;
    border-color: #28a745;
  }
  
  .btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
  }
  </style>
  