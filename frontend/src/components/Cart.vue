<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <ul v-if="cart.length">
      <li v-for="(cartItem, index) in cart" :key="cartItem.id" class="cart-item">
        <span>
          {{ cartItem.name }} - 
          ${{ (cartItem.price * cartItem.quantity!).toFixed(2) }}
          <div class="quantity-buttons">
            <button @click="decrementQuantity(cartItem)">-</button>
            <span>{{ cartItem.quantity }}</span>
            <button @click="incrementQuantity(cartItem)">+</button>
          </div>
        </span>
      </li>
    </ul>
    <p v-else>Your cart is empty.</p>
    <p v-if="cart.length">Total: ${{ total.toFixed(2) }}</p>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useCartStore } from '@/store/cartStore';
  import type { MenuItemType } from '@/types/MenuItemType';
  
  export default defineComponent({
    name: 'Cart',
    emits: ['remove-item'],
    setup() {

      const cartStore = useCartStore();
      const cart = computed(() => cartStore.cart);

      const total = computed(() => {
        return cart.value.reduce((sum, cartItem) => {
          return sum + (cartItem.price * cartItem.quantity!);
        }, 0);
      });

      const incrementQuantity = (item: MenuItemType) => {
        cartStore.addToCart(item);
      };

      const decrementQuantity = (item: MenuItemType) => {
        cartStore.removeFromCart(item);
      };

      const updateQuantity = (item: MenuItemType) => {
        cartStore.updateQuantity(item);
      };
  
      return { cart, total, incrementQuantity, decrementQuantity, updateQuantity };
    }
  });
  </script>
  
  <style scoped>
  .cart {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  margin-top: 1rem;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.cart-item-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.cart-item-info span {
  margin-right: 10px;
}
.price {
  font-weight: bold;
  color: rgb(85, 133, 30);
}
.quantity-buttons {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.quantity-buttons button {
  background-color: #ddd;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
}
.cart-item button {
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}
  </style>
  