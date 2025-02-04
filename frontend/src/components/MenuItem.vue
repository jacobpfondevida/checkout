<template>
  <div class="menu-item border border-green-700 p-4 rounded-lg text-center bg-white shadow-md">
    <img :src="`/${item.image_id}.jpg`" :alt="item.name" class="flex justify-center" />
    <h3 class="text-xl font-semibold mt-2">{{ item.name }}</h3>
    <p class="price text-lg font-bold text-green-700 mt-1">${{ item.price.toFixed(2) }}</p>
    <div class="menu-item-buttons flex justify-center items-center gap-4 mt-2">
      <button @click="removeFromCart" class="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded px-3 py-1 transition">-</button>
      <span class="w-12 text-center font-semibold">{{ cartQuantity || 0 }}</span>
      <button @click="addToCart" class="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded px-3 py-1 transition">+</button>
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

</style>