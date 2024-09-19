<!-- src/components/AddOrderForm.vue -->
<template>
    <div class="container mt-5">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1>Add Order</h1>
        <div class="d-flex justify-content-end">
          <button class="btn btn-secondary me-2" @click="goHome">Back to Home</button>
          <button class="btn btn-primary" @click="submitOrder">Submit Order</button>
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
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'AddOrderForm',
    setup() {
      const router = useRouter();
      
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
  
      const addProduct = () => {
        order.value.products.push({ name: '', quantity: 1, price: 0 });
      };
  
      const removeProduct = (index) => {
        order.value.products.splice(index, 1);
      };
  
      const submitOrder = () => {
        // Here you can send the order data to the backend or manage it in your store
        console.log('Order Submitted:', order.value);
        alert('Order has been successfully added!');
        router.push('/'); // Redirect back to the orders list after submission
      };
  
      const goHome = () => {
        router.push('/'); // Redirect to the home page
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
  /* Add custom styles here */
  </style>
  