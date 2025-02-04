<template>
    <div class="container mx-auto p-4">
        <h1 class="text-5xl font-bold text-center">Restaurant Menu</h1>
        <div
        v-for="category in menu.categories"
        :key="category.id"
        class="category-section mb-12"
        >
        <div class="flex flex-col items-center p-4">
            <h2 class="text-3xl font-semibold text-gray-800 mb-4">
            {{ category.name }}
            </h2>
            <img
            :src="`/${category.image_id}.jpg`"
            :alt="category.name"
            class="category-item-image w-full max-w-xs rounded-lg shadow-md mb-4"
            />
        </div>
        <div
            class="menu-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center"
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
        <p v-else class="text-center text-gray-500">No items available.</p>
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
</style>