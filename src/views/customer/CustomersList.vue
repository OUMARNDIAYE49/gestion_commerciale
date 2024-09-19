<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-start display-4">List of Customers</h1>
      <button class="btn btn-primary shadow-lg px-4 py-2" @click="openModal()">
        <i class="bi bi-plus-lg me-2"></i>Add New Customer
      </button>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-bordered shadow-sm">
        <thead class="table-dark">
          <tr>
            <th scope="col" class="text-start">Name</th>
            <th scope="col" class="text-start">Address</th>
            <th scope="col" class="text-start">Email</th>
            <th scope="col" class="text-start">Phone</th>
            <th scope="col" class="text-center">Actions</th> 
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
    </div>
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
import { defineComponent, ref } from 'vue';
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

.table th.text-center, .table td.text-center {
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn i {
  font-size: 1.2rem;
}
</style>
