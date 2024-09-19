<template>
    <tr>
      <td>{{ order.date }}</td>
      <td>{{ order.customer }}</td>
      <td>{{ order.deliveryAddress }}</td>
      <td>{{ order.trackNumber }}</td>
      <td>{{ order.status }}</td>
      <td>
        <button class="btn btn-info btn-sm me-2" @click="emitEvent('view-order')">
          <i class="fa-solid fa-eye"></i>
        </button>
        <button class="btn btn-warning btn-sm me-2" @click="emitEvent('edit-order')">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="btn btn-danger btn-sm" @click="confirmDelete">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  </template>
  
  <script>
  import { defineComponent, toRefs, computed } from 'vue';
  
  export default defineComponent({
    name: 'OrderItem',
    props: {
      order: {
        type: Object,
        required: true
      }
    },
    setup(props, { emit }) {
      const confirmDelete = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
          emit('delete-order');
        }
      };
  
      const emitEvent = (eventName) => {
        emit(eventName);
      };
  
      return {
        ...toRefs(props.order),
        confirmDelete,
        emitEvent
      };
    }
  });
  </script>
  