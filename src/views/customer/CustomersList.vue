<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1 class="text-start">List of Customers</h1>
      <button class="btn btn-primary" @click="openModal()">Add New Customer</button>
    </div>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col" class="text-start">Name</th>
          <th scope="col" class="text-start">Address</th>
          <th scope="col" class="text-start">Email</th>
          <th scope="col" class="text-start">Phone</th>
          <th scope="col" class="text-start">Actions</th> 
        </tr>
      </thead>
      <tbody>
        <CustomerItem
          v-for="customer in customers"
          :key="customer.email"
          :customer="customer"
          @view-customer="openModal(customer, 'view')"
          @edit-customer="openModal(customer, 'edit')"
          @delete-customer="confirmDelete(customer.email)"
        />
      </tbody>
    </table>

    <!-- Modal to display, add, or edit a customer -->
    <CustomerModal
      v-if="isModalOpen"
      :customer="selectedCustomer"
      :mode="modalMode"
      @close="closeModal"
      @save="saveCustomer"
    />
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed } from 'vue';
import CustomerItem from './CustomerItem.vue';
import CustomerModal from './CustomerModal.vue';

export default defineComponent({
  components: {
    CustomerItem,
    CustomerModal
  },
  setup() {
    const customers = ref([
      { name: 'John Doe', address: '123 Main St', email: 'johndoe@example.com', phone: '123-456-7890' },
      { name: 'Jane Smith', address: '456 Oak St', email: 'janesmith@example.com', phone: '098-765-4321' },
    ]);
    
    const selectedCustomer = ref(null);
    const isModalOpen = ref(false);
    const modalMode = ref('edit');

    const openModal = (customer = null, mode = 'add') => {
      selectedCustomer.value = customer ? { ...customer } : { name: '', address: '', email: '', phone: '' };
      modalMode.value = mode;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const saveCustomer = (updatedCustomer) => {
      if (modalMode.value === 'add') {
        customers.value.push({ ...updatedCustomer, email: Date.now() + '@example.com' });
      } else {
        const index = customers.value.findIndex(c => c.email === updatedCustomer.email);
        if (index !== -1) {
          customers.value.splice(index, 1, updatedCustomer);
        }
      }
      closeModal();
    };

    const confirmDelete = (email) => {
      if (confirm('Are you sure you want to delete this customer?')) {
        customers.value = customers.value.filter(c => c.email !== email);
      }
    };

    return {
      customers,
      selectedCustomer,
      isModalOpen,
      modalMode,
      openModal,
      closeModal,
      saveCustomer,
      confirmDelete
    };
  }
});
</script>

<style scoped>
/* Aligner les colonnes Name, Address, Email et Phone à gauche */
.table th.text-start, .table td.text-start {
  text-align: left;
}

/* Alignement central pour les autres cellules */
.table th, .table td {
  text-align: center;
}
</style>
