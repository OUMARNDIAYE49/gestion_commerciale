<template>
  <div class="container mt-5">
    <div>
      <h1>Product List</h1>
      <div class="text-end mb-3">
        <button class="btn btn-primary" @click="openModal()">Add New Product</button>
      </div>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Category</th>
            <th scope="col">Barcode</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <ProductItem
            v-for="product in products"
            :key="product.id"
            :product="product"
            @edit-product="openModal(product)"
            @view-product="openModal(product, 'view')"
            @delete-product="deleteProduct(product.id)"
          />
        </tbody>
      </table>

      <!-- Modal to view or edit a product -->
      <ProductModal
        v-if="isModalOpen"
        :product="selectedProduct"
        :mode="modalMode"
        @close="closeModal"
        @save="saveProduct"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
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
    const modalMode = ref('edit'); // or 'view' or 'add'

    const openModal = (product = null, mode = 'edit') => {
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
.table th, .table td {
  text-align: center;
}
</style>
