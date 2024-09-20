<template>
    <div class="container mt-5">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1>Add Order</h1>
        <div class="d-flex justify-content-end">
          <button class="btn btn-secondary me-2" @click="goHome">Orders List</button>
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
        if (order.value.products.length === 1) {
          alert('You cannot remove the last product from the order.');
          return;
        }
        order.value.products.splice(index, 1);
      };

      const submitOrder = () => {
        if (order.value.products.length === 0) {
          alert('The order must contain at least one product.');
          return;
        }

        console.log('Order Submitted:', order.value);
        alert('Order has been successfully added!');
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
