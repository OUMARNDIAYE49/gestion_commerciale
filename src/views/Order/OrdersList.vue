<template>
  <div class="container mt-5">
    <!-- Header section -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-start display-4">List of Orders</h1>
      <router-link to="/add-order">
        <button class="btn btn-primary shadow-lg px-4 py-2">
          <i class="bi bi-plus-lg me-2"></i>Add New Order
        </button>
      </router-link>
    </div>

    <!-- Orders table -->
    <div class="table-responsive">
      <table class="table table-hover table-bordered shadow-sm">
        <thead class="table-dark">
          <tr>
            <th scope="col" class="text-start">Date</th>
            <th scope="col" class="text-start">Customer</th>
            <th scope="col" class="text-start">Delivery Address</th>
            <th scope="col" class="text-start">Track Number</th>
            <th scope="col" class="text-start">Status</th>
            <th scope="col" class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.trackNumber">
            <td>{{ order.date }}</td>
            <td>{{ order.customer }}</td>
            <td>{{ order.deliveryAddress }}</td>
            <td>{{ order.trackNumber }}</td>
            <td>{{ order.status }}</td>
            <td>
              <router-link to="/view-order/:id">
                <button class="btn btn-info btn-sm me-2" @click="emitEvent('view-order', order.trackNumber)">
                <i class="fa-solid fa-eye"></i>
              </button>
              </router-link>
              
              <router-link to="/edit-order/:id">
                <button class="btn btn-warning btn-sm me-2" @click="emitEvent('edit-order', order.trackNumber)">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </router-link>
              
              <button class="btn btn-danger btn-sm" @click="confirmDelete(order.trackNumber)">
                <i class="fa-solid fa-trash-can"></i>
              </button>
              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'OrdersList',
  setup() {
    const router = useRouter();
    const orders = ref([
      { date: '25/07/2024', customer: 'John Doe', deliveryAddress: '123 Main St', trackNumber: 'TN001', status: 'Shipped', products: [
        { name: 'Product 1', quantity: 2, price: 20 },
        { name: 'Product 2', quantity: 1, price: 50 }
      ] },
      { date: '26/07/2024', customer: 'Jane Smith', deliveryAddress: '456 Oak St', trackNumber: 'TN002', status: 'Delivered', products: [
        { name: 'Product 1', quantity: 2, price: 20 },
        { name: 'Product 2', quantity: 1, price: 50 }
      ] },
      { date: '27/07/2024', customer: 'Alice Martin', deliveryAddress: '789 Pine St', trackNumber: 'TN003', status: 'Processing', products: [
        { name: 'Product 1', quantity: 2, price: 20 },
        { name: 'Product 2', quantity: 1, price: 50 }
      ] }
    ]);

    const emitEvent = (eventName, trackNumber) => {
      if (eventName === 'view-order') {
        router.push(`/orders/${trackNumber}`);
      } else if (eventName === 'edit-order') {
        router.push(`/orders/${trackNumber}/edit`);
      }
    };

    const confirmDelete = (trackNumber) => {
      if (confirm('Are you sure you want to delete this order?')) {
        orders.value = orders.value.filter(order => order.trackNumber !== trackNumber);
      }
    };

    return {
      orders,
      emitEvent,
      confirmDelete
    };
  }
});
</script>

<style scoped>
.container {
  margin-top: 2rem;
}

.btn {
  margin-right: 0.5rem;
}

.table-responsive {
  margin-top: 2rem;
}

.table {
  margin-bottom: 0;
}

.table-dark {
  background-color: #343a40;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
}

i {
  margin-right: 0.25rem;
}
</style>
