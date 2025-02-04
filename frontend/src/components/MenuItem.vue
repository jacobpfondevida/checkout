<template>
  <div class="menu-item">
    <img :src="`/${item.image_id}.jpg`" :alt="item.name" class="menu-item-image" />
    <h3>{{ item.name }}</h3>
    <p class="price">${{ item.price.toFixed(2) }}</p>
    <div class="menu-item-buttons">
      <button @click="removeFromCart">-</button>
      <span>{{ cartQuantity || 0 }}</span>
      <button @click="addToCart">+</button>
    </div>
  </div>
</template>


<script lang="ts">
import { computed, defineComponent } from "vue";
import type { PropType } from "vue";
import { useCartStore } from '@/store/cartStore';
import type { MenuItemType } from "@/types/MenuItemType";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<MenuItemType>,
      required: true,
    }
  },
  setup(props, { emit }) {
    const cartStore = useCartStore();
    const cart = computed(() => cartStore.cart);

    const cartQuantity = computed(() => {
      const cartItem = cart.value.find((i) => i.id === props.item.id);
      return cartItem ? cartItem.quantity : 0;
    });

    const addToCart = () => {
      emit("add-to-cart", props.item);
    };

    const removeFromCart = () => {
      emit("remove-from-cart", props.item);
    };

    return { cartQuantity, addToCart, removeFromCart };
  },
});
</script>

<style scoped>
.menu-item {
  border: 1px solid #a0a307;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.menu-item-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.menu-item-buttons button {
  background-color: #ddd;
  border: none;
  padding: 5px;
  cursor: pointer;
}

.menu-item-image {
  max-width: 100px;
  height: auto;
}

.price {
  font-weight: bold;
  color: rgb(85, 133, 30);
}
</style>