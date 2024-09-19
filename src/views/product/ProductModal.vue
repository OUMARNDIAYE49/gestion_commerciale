<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: block;">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalTitle }}</h5>
          <button type="button" class="btn-close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSave">
            <div class="form-group">
              <label for="name">Product Name</label>
              <input type="text" class="form-control" id="name" v-model="product.name" :readonly="isReadOnly">
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea class="form-control" id="description" v-model="product.description" :readonly="isReadOnly"></textarea>
            </div>
            <div class="form-group">
              <label for="price">Price</label>
              <input type="number" class="form-control" id="price" v-model="product.price" :readonly="isReadOnly">
            </div>
            <div class="form-group">
              <label for="stock">Stock</label>
              <input type="number" class="form-control" id="stock" v-model="product.stock" :readonly="isReadOnly">
            </div>
            <div class="form-group">
              <label for="category">Category</label>
              <input type="text" class="form-control" id="category" v-model="product.category" :readonly="isReadOnly">
            </div>
            <div class="form-group">
              <label for="barcode">Barcode</label>
              <input type="text" class="form-control" id="barcode" v-model="product.barcode" :readonly="isReadOnly">
            </div>
            <div class="form-group">
              <label for="status">Status</label>
              <select class="form-select" id="status" v-model="product.status" :disabled="isReadOnly">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          <button v-if="!isReadOnly" type="button" class="btn btn-primary" @click="handleSave">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue';

export default defineComponent({
  name: 'ProductModal',
  props: {
    product: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      default: 'view'
    }
  },
  setup(props, { emit }) {
    const { product, mode } = toRefs(props);

    const modalTitle = computed(() => {
      return mode.value === 'view'
        ? 'View Product'
        : mode.value === 'add'
        ? 'Add Product'
        : 'Edit Product';
    });

    const isReadOnly = computed(() => mode.value === 'view');

    const closeModal = () => {
      emit('close');
    };

    const handleSave = () => {
      emit('save', product.value);
    };

    return {
      product,
      modalTitle,
      isReadOnly,
      closeModal,
      handleSave
    };
  }
});
</script>

<style scoped>
.modal-content {
  width: 100%;
  max-width: 800px;
  margin: auto;
}
</style>
