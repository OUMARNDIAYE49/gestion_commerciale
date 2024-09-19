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
          <OrderItem
            v-for="order in orders"
            :key="order.trackNumber"
            :order="order"
            @view-order="openModal(order, 'view')"
            @edit-order="openModal(order, 'edit')"
            @delete-order="confirmDelete(order.trackNumber)"
          />
        </tbody>
      </table>
    </div>

    <!-- Modal to display, add, or edit an order -->
    <OrderModal
      v-if="isModalOpen"
      :order="selectedOrder"
      :mode="modalMode"
      @close="closeModal"
      @save="saveOrder"
    />
  </div>
</template>

<script>
// Importations nécessaires
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import OrderItem from './OrderItem.vue';
import OrderModal from './OrderModal.vue';

export default defineComponent({
  components: {
    OrderItem,
    OrderModal
  },
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
      { date: '27/07/2024', customer: 'Alice Martin', deliveryAddress: '789 Pine St, Chicago, IL', trackNumber: 'TN003', status: 'Processing', products: [
        { name: 'Product 1', quantity: 2, price: 20 },
        { name: 'Product 2', quantity: 1, price: 50 }
      ] }
    ]);

    const selectedOrder = ref(null);
    const isModalOpen = ref(false);
    const modalMode = ref('view');

    const openModal = (order = null, mode = 'add') => {
      selectedOrder.value = order ? { ...order } : { date: '', customer: '', deliveryAddress: '', trackNumber: '', status: '' };
      modalMode.value = mode;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const saveOrder = (updatedOrder) => {
      if (modalMode.value === 'add') {
        orders.value.push({ ...updatedOrder, trackNumber: `TN${Date.now()}` });
      } else {
        const index = orders.value.findIndex(o => o.trackNumber === updatedOrder.trackNumber);
        if (index !== -1) {
          orders.value.splice(index, 1, updatedOrder);
        }
      }
      closeModal();
    };

    const confirmDelete = (trackNumber) => {
      if (confirm('Are you sure you want to delete this order?')) {
        orders.value = orders.value.filter(o => o.trackNumber !== trackNumber);
      }
    };

    return {
      orders,
      selectedOrder,
      isModalOpen,
      modalMode,
      openModal,
      closeModal,
      saveOrder,
      confirmDelete
    };
  }
});
</script>

<style scoped>
/* Stylize the header and add space around the table */
.container {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Styling for table */
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

/* Spacing and alignment for actions column */
.table th.text-center, .table td.text-center {
  text-align: center;
}

/* Adjust buttons style */
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* Icon inside the add button */
.btn i {
  font-size: 1.2rem;
}
</style>
