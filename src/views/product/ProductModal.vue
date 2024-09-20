<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: block;">
    <div class="modal-dialog" role="document">
      <div class="modal-content shadow-lg rounded">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">{{ modalTitle }}</h5>
          <button type="button" class="btn-close text-white" @click="emitClose" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSave">
            <div class="form-group mb-3">
              <label for="name" class="form-label">Product Name</label>
              <input type="text" class="form-control" id="name" v-model="product.name" :readonly="isReadOnly">
            </div>
            <div class="form-group mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" id="description" v-model="product.description" :readonly="isReadOnly" rows="2"></textarea>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label for="price" class="form-label">Price</label>
                  <input type="number" class="form-control" id="price" v-model="product.price" :readonly="isReadOnly">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label for="stock" class="form-label">Stock</label>
                  <input type="number" class="form-control" id="stock" v-model="product.stock" :readonly="isReadOnly">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label for="barcode" class="form-label">Barcode</label>
                  <input type="text" class="form-control" id="barcode" v-model="product.barcode" :readonly="isReadOnly">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label for="status" class="form-label">Status</label>
                  <select class="form-select" id="status" v-model="product.status" :disabled="isReadOnly">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group mb-3">
              <label for="category" class="form-label">Category</label>
              <input type="text" class="form-control" id="category" v-model="product.category" :readonly="isReadOnly">
            </div>
          </form>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <button type="button" class="btn btn-secondary" @click="emitClose">Close</button>
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
      required: true
    }
  },
  setup(props, { emit }) {
    const { product, mode } = toRefs(props);

    const modalTitle = computed(() => {
      if (mode.value === 'view') return 'View Product';
      if (mode.value === 'add') return 'Create New Product';
      return 'Edit Product';
    });

    const isReadOnly = computed(() => mode.value === 'view');

    const handleSave = () => {
      emit('save', product.value);
    };

    const emitClose = () => {
      emit('close');
    };

    return {
      product,
      modalTitle,
      isReadOnly,
      handleSave,
      emitClose
    };
  }
});
</script>

<style scoped>
.modal-content {
  width: 100%;
  max-width: 500px; /* Reducing width */
  margin: auto;
  border-radius: 15px;
  border: none;
  padding: 15px; /* Reduced padding */
  background-color: #f8f9fa;
}

.modal-header {
  border-bottom: 1px solid #dee2e6;
  border-radius: 15px 15px 0 0;
}

.modal-footer {
  border-top: 1px solid #dee2e6;
}

.form-label {
  font-weight: 500;
}

.form-control {
  border-radius: 8px;
}

.btn-close {
  background-color: transparent;
  border: none;
}

.btn-primary {
  padding: 0.4rem 1.2rem;
  border-radius: 8px;
}

.btn-secondary {
  padding: 0.4rem 1.2rem;
  border-radius: 8px;
}

.modal-body {
  padding: 1rem; /* Reduced padding */
}

.modal-footer {
  padding: 0.75rem; /* Reduced padding */
}
</style>
