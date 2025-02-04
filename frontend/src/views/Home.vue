<template>
  <div class="flex min-h-screen min-w-screen justify-center bg-gray-100">
    <div class="container mx-auto px-4 py-8 max-w-screen-xl">
      <Menu v-if="menu" :menu="menu" @add-to-cart="handleAddToCart" @remove-from-cart="handleRemoveFromCart" />
      <Cart />
      <div class="flex justify-center mt-8">
        <button 
          @click="handleCheckout" 
          class="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/store/cartStore";

import Menu from "@/components/Menu.vue";
import Cart from "@/components/Cart.vue";
import type { MenuItemType } from "@/types/MenuItemType";

import apiClient from "@/services/apiClient";
import { handleApiError } from "@/utils/axiosErrorHandler";

export default defineComponent({
  name: "Home",
  components: {
    Menu,
    Cart,
  },
  setup() {
    const router = useRouter();
    const cartStore = useCartStore();

    const menu = ref(null);

    const fetchMenu = async () => {
      try {
        const response = await apiClient.get("/menu");
        menu.value = response.data;
      } catch (error) {
        handleApiError(error);
      }
    };

    onMounted(fetchMenu);

    const handleAddToCart = (item: MenuItemType) => {
      cartStore.addToCart(item);
    };

    const handleRemoveFromCart = (item: MenuItemType) => {
      cartStore.removeFromCart(item);
    };

    const handleCheckout = () => {
      router.push("/checkout");
    };

    return { menu, handleAddToCart, handleRemoveFromCart, handleCheckout };
  },
});
</script>

<style scoped>
</style>