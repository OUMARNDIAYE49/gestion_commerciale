<template>
  <tr>
    <td>{{ product.name }}</td>
    <td>{{ product.description }}</td>
    <td>{{ product.price }}</td>
    <td>{{ product.stock }}</td>
    <td>{{ product.category }}</td>
    <td>{{ product.barcode }}</td>
    <td>{{ product.status }}</td>
    <td>
      <button class="btn btn-info btn-sm me-2" @click="emitEvent('view-product')">
        <i class="fa-solid fa-eye"></i>
      </button>
      <button class="btn btn-warning btn-sm me-2" @click="emitEvent('edit-product')">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="btn btn-danger btn-sm" @click="confirmDelete">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </td>
  </tr>
</template>

<script>
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const { product } = toRefs(props);

    const emitEvent = (eventName) => {
      emit(eventName);
    };

    const confirmDelete = () => {
      if (confirm('Are you sure you want to delete this order?')) {
        emit('delete-product');
      }
    };

    const emitViewProduct = () => {
      emit('view-product');
    };

    const emitEditProduct = () => {
      emit('edit-product');
    };


    return {
      product,
      emitEvent,
      confirmDelete,
      emitViewProduct,
      emitEditProduct
    };
  }
});
</script>
