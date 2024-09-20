<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: block;">
    <div class="modal-dialog" role="document">
      <div class="modal-content shadow-lg rounded">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">{{ modalTitle }}</h5>
          <button type="button" class="btn-close text-white" @click="emitClose" aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSave">
            <div class="form-group mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" v-model="customer.name" :readonly="isReadOnly">
            </div>
            <div class="form-group mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="customer.email" :readonly="isReadOnly">
            </div>
            <div class="form-group mb-3">
              <label for="address" class="form-label">Address</label>
              <textarea class="form-control" id="address" v-model="customer.address" :readonly="isReadOnly" rows="3"></textarea>
            </div>
            <div class="form-group mb-3">
              <label for="phone" class="form-label">Phone</label>
              <input type="text" class="form-control" id="phone" v-model="customer.phone" :readonly="isReadOnly">
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
  props: {
    customer: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const { customer, mode } = toRefs(props);

    const modalTitle = computed(() => {
      if (mode.value === 'view') return 'View Customer';
      if (mode.value === 'add') return 'Create New Customer';
      return 'Edit Customer';
    });

    const isReadOnly = computed(() => mode.value === 'view');

    const handleSave = () => {
      emit('save', customer.value);
    };

    const emitClose = () => {
      emit('close');
    };

    return {
      customer,
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
  max-width: 700px;
  margin: auto;
  border-radius: 15px;
  border: none;
  padding: 20px;
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
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
}

.btn-secondary {
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem;
}
</style>
