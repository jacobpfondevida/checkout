// src/stores/cartStore.ts
import { defineStore } from 'pinia';
import type { MenuItemType } from '@/types/MenuItemType';

const MAX_QUANTITY = 99;
const MIN_QUANTITY = 0;

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cart: [] as MenuItemType[],
    };
  },
  actions: {
    addToCart(item: MenuItemType) {
      const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity! += 1;
      } else {
        this.cart.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart(item: MenuItemType) {
      const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        if (existingItem.quantity! > 1) {
          existingItem.quantity!--;
        } else {
          this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
        }
      }
    },
    updateQuantity(item: MenuItemType) {
        const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
        if(item.quantity! < MIN_QUANTITY || item.quantity! > MAX_QUANTITY) {
            return;
        }

        if (existingItem) {
          existingItem.quantity = item.quantity;
        }
        else {
            this.cart.push({ ...item, quantity: item.quantity })
        }
      },
  },
});
