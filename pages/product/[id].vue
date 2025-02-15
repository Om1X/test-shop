<script setup lang="ts">
import type {ProductData} from "~/types/products";

const productsStore = useProductsStore();
const cartStore = useCartStore();
const route = useRoute();

const productId = +route.params.id;
const inCartQuantity = computed(() => {
  const inCartProduct = cartStore.cartData
      .find((productInCart: ProductData) => productInCart.id === productId);
  return inCartProduct?.quantity || 0;
});

await productsStore.fetchProductById(+route.params.id);
await cartStore.fetchCart();

useHead({
  title: () => `Test Shop / ${ productsStore.selectedProductData.title }`,
});

function addToCart() {
  cartStore.addToCart(productId);
}
</script>

<template>
  <v-container class="product-page">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto">
          <v-img :src="productsStore.selectedProductData.image" alt="Изображение товара" height="300px" contain/>
          <v-card-title>{{ productsStore.selectedProductData.title }}</v-card-title>
          <v-card-subtitle>${{ productsStore.selectedProductData.price }}</v-card-subtitle>
          <v-card-text>
            <p>{{ productsStore.selectedProductData.description }}</p>
            <p><strong>Category:</strong> {{ productsStore.selectedProductData.category }}</p>
            <p><strong>Rating:</strong> {{ productsStore.selectedProductData.rating.rate }} ⭐ ({{ productsStore.selectedProductData.rating.count }} отзывов)</p>
          </v-card-text>
          <v-card-actions>
            <v-btn
                color="primary" :class="$style['buy-button']"
                @click.prevent="addToCart"
            >
              <v-icon icon="mdi-cart"/>
              {{ inCartQuantity ? `(${ inCartQuantity })` : '' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" module>
.product-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 16px;
}
.buy-button {
  width: 100%;
}
</style>
