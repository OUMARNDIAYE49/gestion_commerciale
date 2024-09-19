<template>
    <div class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ mode === 'view' ? 'Order' : 'Edit Order' }}</h5>
            <button type="button" class="btn-close" @click="close"></button>
          </div>
          <div class="modal-body">
            <!-- Afficher les détails de la commande -->
            <div v-if="mode === 'view'">
              <p><strong>Date:</strong> {{ order.date }}</p>
              <p><strong>Customer:</strong> {{ order.customer }}</p>
              <p><strong>Delivery Address:</strong> {{ order.deliveryAddress }}</p>
              <p><strong>Tracking Number:</strong> {{ order.trackNumber }}</p>
              <p><strong>Status:</strong> {{ order.status }}</p>
  
              <!-- Liste des produits -->
              <div v-if="order.products && order.products.length">
                <h5><strong>Order details:</strong></h5>
                <ul class="list-group">
                  <li v-for="(product, index) in order.products" :key="index" class="list-group-item">
                    <strong>{{ product.name }}</strong> - Quantity: {{ product.quantity }} - Price: {{ product.price }}$
                  </li>
                </ul>
              </div>
            </div>
  
            <!-- Formulaire pour éditer la commande -->
            <div v-else>
              <div class="row g-2">
                <div class="col">
                  <label for="date" class="form-label">Date</label>
                  <input type="text" v-model="order.date" class="form-control" id="date" />
                </div>
                <div class="col">
                  <label for="customer" class="form-label">Customer</label>
                  <input type="text" v-model="order.customer" class="form-control" id="customer" />
                </div>
              </div>
              <div class="row g-2 mt-3">
                <div class="col">
                  <label for="trackingNumber" class="form-label">Tracking Number</label>
                  <input type="text" v-model="order.trackNumber" class="form-control" id="trackingNumber" />
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
                <h5>Order details:</h5>
                <div v-for="(product, index) in order.products" :key="index" class="mb-3">
                  <div class="row g-2">
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        v-model="product.name"
                        placeholder="Product Name"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="number"
                        class="form-control"
                        v-model="product.quantity"
                        placeholder="Quantity"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="number"
                        class="form-control"
                        v-model="product.price"
                        placeholder="Price"
                      />
                    </div>
                    <div class="col-auto">
                      <button type="button" class="btn btn-danger" @click="removeProduct(index)">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <!-- Bouton pour ajouter un nouveau produit -->
                <button type="button" class="btn btn-success mt-3" @click="addProduct">Add Product</button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="close">Close</button>
            <button type="button" v-if="mode === 'edit'" class="btn btn-primary" @click="save">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, toRefs, computed } from 'vue';
  
  export default defineComponent({
    name: 'OrderModal',
    props: {
      order: {
        type: Object,
        required: true
      },
      mode: {
        type: String,
        default: 'view'
      }
    },
    setup(props, { emit }) {
      const close = () => {
        emit('close');
      };
  
      const save = () => {
        emit('save', props.order);
      };
  
      const addProduct = () => {
        props.order.products.push({ name: '', quantity: 1, price: 0 });
      };
  
      const removeProduct = (index) => {
        props.order.products.splice(index, 1);
      };
  
      return {
        ...toRefs(props),
        close,
        save,
        addProduct,
        removeProduct
      };
    }
  });
  </script>
  
  <style scoped>
  .modal {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
  }
  </style>
  