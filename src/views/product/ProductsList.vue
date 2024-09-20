<template>
  <div class="container mt-5">
    <!-- Header section -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-start display-4">List of Products</h1>
      <button class="btn btn-primary shadow-lg px-4 py-2" @click="openModal()">
        <i class="bi bi-plus-lg me-2"></i>Add New Product
      </button>
    </div>

    <!-- Products table -->
    <div class="table-responsive">
      <table class="table table-hover table-bordered shadow-sm">
        <thead class="table-dark">
          <tr>
            <th scope="col" class="text-start">Product Name</th>
            <th scope="col" class="text-start">Description</th>
            <th scope="col" class="text-start">Price</th>
            <th scope="col" class="text-start">Stock</th>
            <th scope="col" class="text-start">Category</th>
            <th scope="col" class="text-start">Barcode</th>
            <th scope="col" class="text-start">Status</th>
            <th scope="col" class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <ProductItem
            v-for="product in products"
            :key="product.id"
            :product="product"
            @edit-product="openModal(product, 'edit')"
            @view-product="openModal(product, 'view')"

            @delete-product="deleteProduct(product.id)"
          />
        </tbody>
      </table>
    </div>

    <!-- Modal to view or edit a product -->
    <ProductModal
      v-if="isModalOpen"
      :product="selectedProduct"
      :mode="modalMode"
      @close="closeModal"
      @save="saveProduct"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ProductItem from './ProductItem.vue';
import ProductModal from './ProductModal.vue';

export default defineComponent({
  components: {
    ProductItem,
    ProductModal
  },
  setup() {
    const products = ref([
      { id: 1, name: 'Product 001', description: 'High-quality product.', price: 100, stock: 50, category: 'Electronics', barcode: '123456789012', status: 'Active' },
      { id: 2, name: 'Product 002', description: 'Affordable product.', price: 50, stock: 100, category: 'Home Appliances', barcode: '987654321098', status: 'Inactive' },
      { id: 3, name: 'Product 003', description: 'Durable product.', price: 75, stock: 75, category: 'Sports', barcode: '234567890123', status: 'Active' }
    ]);

    const selectedProduct = ref(null);
    const isModalOpen = ref(false);
    const modalMode = ref('edit');

    const openModal = (product = null, mode = 'add') => {
      selectedProduct.value = product ? { ...product } : { name: '', description: '', price: 0, stock: 0, category: '', barcode: '', status: '' };
      modalMode.value = mode;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const saveProduct = (updatedProduct) => {
      if (modalMode.value === 'add') {
        products.value.push({ ...updatedProduct, id: Date.now() });
      } else {
        const index = products.value.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          products.value.splice(index, 1, updatedProduct);
        }
      }
      closeModal();
    };

    const deleteProduct = (productId) => {
      products.value = products.value.filter(p => p.id !== productId);
    };

    return {
      products,
      selectedProduct,
      isModalOpen,
      modalMode,
      openModal,
      closeModal,
      saveProduct,
      deleteProduct
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
