<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>List of Orders</h1>
      <!-- Le bouton Add New Order reste ici mais ne fait pas partie de la fenêtre modale -->
      <button class="btn btn-primary" @click="addOrder">Add New Order</button>
    </div>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col" class="text-start">Date</th>
          <th scope="col" class="text-start">Customer</th>
          <th scope="col" class="text-start">Delivery Address</th>
          <th scope="col" class="text-start">Track Number</th>
          <th scope="col" class="text-start">Status</th>
          <th scope="col" class="text-start">Actions</th>
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

    <!-- La fenêtre modale est utilisée pour Voir et Modifier les commandes -->
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
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import OrderItem from './OrderItem.vue';
import OrderModal from './OrderModal.vue';

export default defineComponent({
  name: 'OrderList',
  components: {
    OrderItem,
    OrderModal
  },
  setup() {
    const router = useRouter();
    
    const orders = ref([
      { date: '25/07/2024', customer: 'John Doe', deliveryAddress: '123 Main St, New York, NY', trackNumber: 'TN001', status: 'Shipped', products: [
        { name: 'Product 1', quantity: 2, price: 20 },
        { name: 'Product 2', quantity: 1, price: 50 }
      ]},
      { date: '26/07/2024', customer: 'Jane Smith', deliveryAddress: '456 Oak St, Los Angeles, CA', trackNumber: 'TN002', status: 'Delivered', products: [
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

    const addOrder = () => {
      router.push('/add-order');
    };

    const openModal = (order = null, mode = 'view') => {
      selectedOrder.value = order ? { ...order } : { date: '', customer: '', deliveryAddress: '', trackNumber: '', status: '' };
      modalMode.value = mode;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const saveOrder = (updatedOrder) => {
      const index = orders.value.findIndex(o => o.trackNumber === updatedOrder.trackNumber);
      if (index !== -1) {
        orders.value.splice(index, 1, updatedOrder);
      }
      closeModal();
    };

    const confirmDelete = (trackNumber) => {
      if (confirm('Are you sure you want to delete this order?')) {
        orders.value = orders.value.filter(order => order.trackNumber !== trackNumber);
      }
    };

    return {
      orders,
      selectedOrder,
      isModalOpen,
      modalMode,
      addOrder,
      openModal,
      closeModal,
      saveOrder,
      confirmDelete
    };
  }
});
</script>

<style scoped>
.table th, .table td {
  text-align: center;
}
</style>
