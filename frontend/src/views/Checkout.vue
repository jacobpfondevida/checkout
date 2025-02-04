<template>
  <div class="checkout">
    <h1>Checkout</h1>
    <Cart/>
    <form @submit.prevent="submitPayment">
      <div>
        <label for="name">Name on Card</label>
        <input type="text" id="name" v-model="payment.name" required />
      </div>
      <div>
        <label for="cardNumber">Card Number</label>
        <input type="text" id="cardNumber" v-model="payment.cardNumber" required />
      </div>
      <div>
        <label for="expiryMonth">Expiry Month</label>
        <select id="expiryMonth" v-model="payment.expiryMonth" required>
          <option v-for="month in months" :key="month.value" :value="month.value">
            {{ month.label }}
          </option>
        </select>
      </div>
      <div>
        <label for="expiryYear">Expiry Year</label>
        <select id="expiryYear" v-model="payment.expiryYear" required>
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
      <div>
        <label for="cvv">CVV</label>
        <input type="text" id="cvv" v-model="payment.cvv" required />
      </div>
      <button type="submit">Submit Payment</button>
    </form>
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
.checkout {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.checkout form > div {
  margin-bottom: 1rem;
}
.checkout label {
  display: block;
  margin-bottom: 0.5rem;
}
.checkout input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}
</style>
