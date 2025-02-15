<script setup lang="ts">
import type { Product, ProductData } from "~/types/products.js";

const props = defineProps<{ product: Product }>();
const cartStore = useCartStore();
const inCartQuantity = computed(() => {
  const inCartProduct = cartStore.cartData
      .find((productInCart: ProductData) => productInCart.id === props.product.id);
  return inCartProduct?.quantity || 0;
});
const emit = defineEmits<{
  (event: 'addToCart', payload: number): void;
}>();
</script>

<template>
  <NuxtLink
      :to="`/product/${product.id}`"
      class="text-decoration-none"
  >
    <v-card>
      <v-img :src="product.image" height="150px"/>
      <v-card-title>{{ product.title }}</v-card-title>
      <v-card-title :class="$style.price">${{ product.price }}</v-card-title>
      <v-btn
          color="primary" :class="$style['buy-button']"
          @click.prevent="emit('addToCart', product.id)"
      >
        <v-icon icon="mdi-cart"/>
        {{ inCartQuantity ? `(${ inCartQuantity })` : '' }}
      </v-btn>
    </v-card>
  </NuxtLink>
</template>

<style lang="scss" module>
.price {
  font-weight: bold;
}

.buy-button {
  width: 100%;
}
</style>
