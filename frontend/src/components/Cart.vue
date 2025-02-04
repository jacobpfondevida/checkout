<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <ul v-if="cart.length">
      <li v-for="(cartItem, index) in cart" :key="cartItem.id" class="cart-item">
        <div class="item-info">
        <span class="item-name">{{ cartItem.name }}</span>
          <span class="price">
            ${{ (cartItem.price * cartItem.quantity!).toFixed(2) }}
          </span>
          <div class="quantity-controls">
            <button @click="decrementQuantity(cartItem)">-</button>
            <span>{{ cartItem.quantity }}</span>
            <button @click="incrementQuantity(cartItem)">+</button>
          </div>
        </div>
      </li>
    </ul>
    <p v-else>Your cart is empty.</p>
    <div class="total" v-if="cart.length">
      <p>Total: ${{ total.toFixed(2) }}</p>
    </div>
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
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: var(--font-family, sans-serif);
}

.cart h2 {
  text-align: center;
  color: var(--primary-color, #4a90e2);
}

.cart ul {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.item-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  flex: 1;
}

.item-name {
  font-weight: bold;
}

.price {
  color: var(--secondary-color, #50e370);
  margin-right: 1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-controls input {
  width: 50px;
  text-align: center;
  padding: 0.2rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  cursor: pointer;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

button:hover {
  opacity: 0.9;
}

.total {
  text-align: right;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1rem;
}
</style>