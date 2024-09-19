<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: block;">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalTitle }}</h5>
          <button type="button" class="close" @click="emitClose">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSave">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" id="name" v-model="customer.name" :readonly="isReadOnly">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" v-model="customer.email" :readonly="isReadOnly">
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <textarea class="form-control" id="address" v-model="customer.address" :readonly="isReadOnly"></textarea>
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input type="text" class="form-control" id="phone" v-model="customer.phone" :readonly="isReadOnly">
            </div>
          </form>
        </div>
        <div class="modal-footer">
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
      if (mode.value === 'add') return 'Add Customer';
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
  max-width: 800px;
  margin: auto;
}
</style>
