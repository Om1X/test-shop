<script setup lang="ts">
const route = useRoute();
const category = computed<string>(() => route.params.category || 'default');
const productsStore = useProductsStore();
const cartStore = useCartStore();
await cartStore.fetchCart();

function addToCart(id) {
  cartStore.addToCart(id);
}
useHead({
  title: () => `Test Shop / ${ category.value }`,
});

if (route.params.category) {
  await productsStore.fetchProductsByCategory(category.value);
}
</script>

<template>
  <v-container>
    <v-row>
      <CategoryList />
    </v-row>
    <v-row>
      <v-col
          v-for="product in productsStore.products"
          :key="product.id"
          cols="6"
      >
        <ProductCard
          :product="product"
          @add-to-cart="addToCart"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
