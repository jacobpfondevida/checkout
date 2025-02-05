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
          <label for="card_number" class="block text-gray-700 text-sm font-bold mb-2">
            Card Number
          </label>
          <input
            type="text"
            id="card_number"
            v-model="payment.card_number"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="flex mb-4 space-x-4">
          <div class="w-3/5">
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
          <div class="w-1/5">
            <label for="expiry_month" class="block text-gray-700 text-sm font-bold mb-2">
              Expiry Month
            </label>
            <select
              id="expiry_month"
              v-model="payment.expiry_month"
              required
              class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option v-for="month in months" :key="month.value" :value="month.value">
                {{ month.label }}
              </option>
            </select>
          </div>
          <div class="w-1/5">
            <label for="expiry_year" class="block text-gray-700 text-sm font-bold mb-2">
              Expiry Year
            </label>
            <select
              id="expiry_year"
              v-model="payment.expiry_year"
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
import { handleApiError } from '@/utils/axiosErrorHandler';

import { useCartStore } from '@/store/cartStore';
import Cart from "@/components/Cart.vue";
import type { PaymentInfo } from '@/types/PaymentInfo.ts';

import apiClient from "@/services/apiClient";

export default defineComponent({
  name: 'Checkout',
  components: {
    Cart,
  },
  setup() {
    const payment = ref<PaymentInfo>({
      name: '',
      card_number: '',
      expiry_month: '',
      expiry_year: '',
      cvv: '',
    });

    const months = Array.from({ length: 12 }, (_, i) => ({
      value: (i + 1).toString(),
      label: (i + 1).toString().padStart(2, '0'), 
    }));

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString());

    const cartStore = useCartStore();
    const cart = computed(() => cartStore.cart);

    const total = computed(() => {
      return cart.value.reduce((sum, cartItem) => {
        return sum + (cartItem.price * (cartItem.quantity || 1));
      }, 0);
    });

    const validatePaymentForm = () => {
      if (!payment.value.name || !payment.value.card_number || !payment.value.cvv || !payment.value.expiry_month || !payment.value.expiry_year) {
        return 'All fields are required.';
      }
   
      const cardNumberRegex: RegExp = new RegExp(`^[0-9]{13,19}$`);
      if (!cardNumberRegex.test(payment.value.card_number)) {
        return 'Invalid card number.';
      }

      const cvvRegex: RegExp = new RegExp(`[0-9]{3,4}`);
      if (!cvvRegex.test(payment.value.cvv)) {
        return 'Invalid CVV.';
      }

      const currentDate = new Date();
      const expiryDate = new Date(`${payment.value.expiry_year}-${payment.value.expiry_month}-01`);
      if (expiryDate <= currentDate) {
        return 'Card has expired.';
      }

      return '';
    };

    const submitPayment = async () => {
      const validationError = validatePaymentForm();
      if (validationError) {
        alert(validationError);
        return;
      }

      try {
        const order = {
          items: cart.value.map(item => ({
            category_id: item.category_id, 
            id: item.id,
            image_id: item.image_id,  
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          total: total.value,
          payment: payment.value,
        };

        console.log(order);

        const response = await apiClient.post('/order', order);

        if (response.status === 200) {
          alert('Payment submitted successfully!');
        } else {
          alert('Payment submission failed with status: ${response.status}');
        }
      } catch (error) {
        handleApiError(error);
      }
    };

    return { payment, months, years, total, submitPayment };
  }
});
</script>

<style scoped>

</style>
