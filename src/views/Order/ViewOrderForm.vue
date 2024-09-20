<template>
    <div class="container mt-5">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1>View Order</h1>
        <div class="d-flex justify-content-end">
          <button class="btn btn-secondary me-2" @click="goHome">Orders List</button>
        </div>
      </div>
  
      <form>
        <div class="row mb-3">
          <div class="col-md-3">
            <label for="date" class="form-label">Date</label>
            <input type="date" id="date" v-model="order.date" class="form-control" readonly>
          </div>
          <div class="col-md-3">
            <label for="customer" class="form-label">Customer Name</label>
            <input type="text" id="customer" v-model="order.customer" class="form-control" readonly>
          </div>
          <div class="col-md-3">
            <label for="deliveryAddress" class="form-label">Delivery Address</label>
            <input type="text" id="deliveryAddress" v-model="order.deliveryAddress" class="form-control" readonly>
          </div>
          <div class="col-md-3">
            <label for="trackNumber" class="form-label">Track Number</label>
            <input type="text" id="trackNumber" v-model="order.trackNumber" class="form-control" readonly>
          </div>
        </div>
  
        <div class="mb-3">
          <label for="status" class="form-label">Order Status</label>
          <select id="status" v-model="order.status" class="form-select" disabled>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
  
        
        <h3>View Details</h3>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in order.products" :key="index">
              <td>
                <select v-model="product.name" class="form-select" disabled>
                  <option value="Product 1">Product 1</option>
                  <option value="Product 2">Product 2</option>
                  <option value="Product 3">Product 3</option>
                </select>
              </td>
              <td>
                <input type="number" v-model="product.quantity" class="form-control" readonly>
              </td>
              <td>
                <input type="number" v-model="product.price" class="form-control" readonly>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  
  export default {
    name: 'OrderDetails',
    setup() {
      const router = useRouter();
      const route = useRoute();
  
      const order = ref({
        date: '',
        customer: '',
        deliveryAddress: '',
        trackNumber: '',
        status: 'Processing',
        products: [
          { name: 'Product 1', quantity: 1, price: 0 }
        ]
      });
  
      // Fetch the order details based on the order ID passed in the route
      onMounted(() => {
        const orderId = route.params.id; // Get the order ID from the URL
        fetchOrderDetails(orderId);
      });
  
      const fetchOrderDetails = (id) => {
        // Simulate an API call to fetch order details
        console.log(`Fetching details for order ID: ${id}`);
  
        // Example: Hardcoded data for the demonstration
        order.value = {
          date: '2024-09-20',
          customer: 'John Doe',
          deliveryAddress: '123 Elm Street',
          trackNumber: 'TRACK12345',
          status: 'Shipped',
          products: [
            { name: 'Product 1', quantity: 2, price: 50 },
            { name: 'Product 2', quantity: 1, price: 100 }
          ]
        };
      };
  
      const goHome = () => {
        router.push('/Orders');
      };
  
      return {
        order,
        goHome,
      };
    }
  };
  </script>
  
  <style scoped>
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
  
  .btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
  }
  </style>
  