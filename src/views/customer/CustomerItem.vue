<template>
  <tr>
    <td>{{ customer.name }}</td>
    <td>{{ customer.address }}</td>
    <td>{{ customer.email }}</td>
    <td>{{ customer.phone }}</td>
    <td>
      <button class="btn btn-info btn-sm me-2" @click="emitViewCustomer">
        <i class="fa-solid fa-eye"></i>
      </button>
      <button class="btn btn-warning btn-sm me-2" @click="emitEditCustomer">
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
  props: {
    customer: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const { customer } = toRefs(props);

    const confirmDelete = () => {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
        emit('delete-customer');
      }
    };

    const emitViewCustomer = () => {
      emit('view-customer');
    };

    const emitEditCustomer = () => {
      emit('edit-customer');
    };

    return {
      customer,
      confirmDelete,
      emitViewCustomer,
      emitEditCustomer
    };
  }
});
</script>
