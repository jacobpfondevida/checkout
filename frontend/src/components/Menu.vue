<template>
    <div class="menu">
      <h1>Restaurant Menu</h1>
      <div
        v-for="category in menu.categories"
        :key="category.id"
        class="category-section"
      >
        <h2>{{ category.name }}</h2>
        <img
          :src="`/${category.image_id}.jpg`"
          :alt="category.name"
          class="category-item-image"
        />
        <div
          class="menu-list"
          v-if="groupedItems[category.id] && groupedItems[category.id].length"
        >
          <MenuItem
            v-for="item in groupedItems[category.id]"
            :key="item.id"
            :item="item"
            @add-to-cart="handleAddToCart"
            @remove-from-cart="handleRemoveFromCart"
          />
        </div>
        <p v-else>No items available.</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from "vue";
  import type { PropType } from "vue";
  import MenuItem from "@/components/MenuItem.vue";
  import type { MenuItemType } from "@/types/MenuItemType";
  import type { Category } from "@/types/Category";
  
  export default defineComponent({
    name: "Menu",
    components: {
      MenuItem,
    },
    props: {
      menu: {
        type: Object as PropType<{
          categories: Category[];
          items: MenuItemType[];
        }>,
        required: true,
      },
    },
    emits: ["add-to-cart", "remove-from-cart"],
    setup(props, { emit }) {
      const groupedItems = computed(() => {
        const groups: Record<number, MenuItemType[]> = {};
        props.menu.items.forEach((item: MenuItemType) => {
          if (!groups[item.category_id]) {
            groups[item.category_id] = [];
          }
          groups[item.category_id].push(item);
        });
        return groups;
      });
  
      const handleAddToCart = (item: MenuItemType) => {
        emit("add-to-cart", item);
      };
  
      const handleRemoveFromCart = (item: MenuItemType) => {
        emit("remove-from-cart", item);
      };
  
      return { groupedItems, handleAddToCart, handleRemoveFromCart };
    },
  });
  </script>
  
  <style scoped>
  .menu {
    padding: 1rem;
  }
  .category-section {
    margin-bottom: 2rem;
  }
  .category-item-image {
    max-width: 150px;
    display: block;
    margin-bottom: 0.5rem;
  }
  .menu-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  </style>
  