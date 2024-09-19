<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="orderModalLabel" aria-hidden="true" style="display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content shadow-lg rounded">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close text-white" @click="emitClose" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Affichage des détails de la commande -->
            <div v-if="isViewMode">
              <p><strong>Date:</strong> {{ order.date }}</p>
              <p><strong>Customer:</strong> {{ order.customer }}</p>
              <p><strong>Delivery Address:</strong> {{ order.deliveryAddress }}</p>
              <p><strong>Tracking Number:</strong> {{ order.trackNumber }}</p>
              <p><strong>Status:</strong> {{ order.status }}</p>
  
              <!-- Liste des produits -->
              <div v-if="order.products && order.products.length">
                <h5><strong>Order Details:</strong></h5>
                <ul class="list-group">
                  <li v-for="(product, index) in order.products" :key="index" class="list-group-item">
                    <strong>{{ product.name }}</strong> - Quantity: {{ product.quantity }} - Price: {{ product.price }}$
                  </li>
                </ul>
              </div>
            </div>
  
            <!-- Formulaire d'édition -->
            <div v-else>
              <form @submit.prevent="handleSave">
                <div class="row g-2">
                  <div class="col">
                    <label for="date" class="form-label">Date</label>
                    <input type="text" class="form-control" id="date" v-model="order.date" />
                  </div>
                  <div class="col">
                    <label for="customer" class="form-label">Customer</label>
                    <input type="text" class="form-control" id="customer" v-model="order.customer" />
                  </div>
                </div>
                <div class="row g-2 mt-3">
                  <div class="col">
                    <label for="trackingNumber" class="form-label">Tracking Number</label>
                    <input type="text" class="form-control" id="trackingNumber" v-model="order.trackNumber" />
                  </div>
                  <div class="col">
                    <label for="status" class="form-label">Status</label>
                    <select v-model="order.status" class="form-select" id="status">
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
  
                <!-- Liste modifiable des produits -->
                <div class="mt-4">
                  <h5>Order Details:</h5>
                  <div v-for="(product, index) in order.products" :key="index" class="mb-3">
                    <div class="row g-2">
                      <div class="col">
                        <input type="text" class="form-control" v-model="product.name" placeholder="Product Name" />
                      </div>
                      <div class="col">
                        <input type="number" class="form-control" v-model="product.quantity" placeholder="Quantity" />
                      </div>
                      <div class="col">
                        <input type="number" class="form-control" v-model="product.price" placeholder="Price" />
                      </div>
                      <div class="col-auto">
                        <button type="button" class="btn btn-danger" @click="removeProduct(index)">Remove</button>
                      </div>
                    </div>
                  </div>
                  <button type="button" class="btn btn-success mt-3" @click="addProduct">Add Product</button>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <button type="button" class="btn btn-secondary" @click="emitClose">Close</button>
            <button v-if="!isViewMode" type="button" class="btn btn-primary" @click="handleSave">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, computed, toRefs } from 'vue';
  
  export default defineComponent({
    props: {
      order: {
        type: Object,
        required: true
      },
      mode: {
        type: String,
        required: true
      }
    },
    setup(props, { emit }) {
      const { order, mode } = toRefs(props);
  
      const modalTitle = computed(() => {
        if (mode.value === 'view') return 'View Order';
        if (mode.value === 'edit') return 'Edit Order';
        return 'Order';
      });
  
      const isViewMode = computed(() => mode.value === 'view');
  
      const handleSave = () => {
        emit('save', order.value);
      };
  
      const emitClose = () => {
        emit('close');
      };
  
      const addProduct = () => {
        if (!order.value.products) {
          order.value.products = [];
        }
        order.value.products.push({ name: '', quantity: 1, price: 0 });
      };
  
      const removeProduct = (index) => {
        if (order.value.products) {
          order.value.products.splice(index, 1);
        }
      };
  
      return {
        order,
        modalTitle,
        isViewMode,
        handleSave,
        emitClose,
        addProduct,
        removeProduct
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
  