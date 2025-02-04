<template>
  <div class="flex min-w-screen justify-center">
    <div class="bg-gray-100 w-full px-4 py-8 max-w-screen-lg">
      <h1 class="text-3xl font-bold text-center mb-8">Checkout</h1>
      
      <!-- Cart Summary Section -->
      <div class="mb-8">
        <Cart />
      </div>
      
      <!-- Payment Form -->
      <form @submit.prevent="submitPayment" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">
            Name on Card
          </label>
          <input
            type="text"
            id="name"
            v-model="payment.name"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="mb-4">
          <label for="cardNumber" class="block text-gray-700 text-sm font-bold mb-2">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            v-model="payment.cardNumber"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="flex mb-4 space-x-4">
          <div class="w-1/2">
          <label for="cvv" class="block text-gray-700 text-sm font-bold mb-2">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            v-model="payment.cvv"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          </div>
          <div class="w-1/4">
            <label for="expiryMonth" class="block text-gray-700 text-sm font-bold mb-2">
              Expiry Month
            </label>
            <select
              id="expiryMonth"
              v-model="payment.expiryMonth"
              required
              class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option v-for="month in months" :key="month.value" :value="month.value">
                {{ month.label }}
              </option>
            </select>
          </div>
          <div class="w-1/4">
            <label for="expiryYear" class="block text-gray-700 text-sm font-bold mb-2">
              Expiry Year
            </label>
            <select
              id="expiryYear"
              v-model="payment.expiryYear"
              required
              class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>
        
        <div class="flex items-center justify-center">
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition"
          >
            Submit Payment
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useCartStore } from '@/store/cartStore';
import Cart from "@/components/Cart.vue";
import type { PaymentInfo } from '@/types/PaymentInfo.ts';

export default defineComponent({
  name: 'Checkout',
  components: {
    Cart,
  },
  setup() {
    const payment = ref<PaymentInfo>({
      name: '',
      cardNumber: '',
      expiryMonth: 0,
      expiryYear: 0,
      cvv: '',
    });

    const months = Array.from({ length: 12 }, (_, i) => ({
      value: i + 1,
      label: (i + 1).toString().padStart(2, '0'), 
    }));

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

    const cartStore = useCartStore();
    const cart = computed(() => cartStore.cart);

    const total = computed(() => {
      return cart.value.reduce((sum, cartItem) => {
        return sum + (cartItem.price * (cartItem.quantity || 1));
      }, 0);
    });

    const submitPayment = () => {
      // TODO: API Call to save payment
      console.log("Payment submitted:", payment.value);
      alert(`"Payment submitted successfully! Payment: ${payment.value.expiryMonth}/${payment.value.expiryYear}"`);
    };

    return { payment, months, years, total, submitPayment };
  }
});
</script>

<style scoped>

</style>
