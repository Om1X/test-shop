<script setup>
import ProductCard from "~/components/ProductCard.vue";
import CategoryList from "~/components/CategoryList.vue";

const productsStore = useProductsStore();
const cartStore = useCartStore();

await productsStore.fetchAllProducts();
await cartStore.fetchCart();

function addToCart(id) {
  cartStore.addToCart(id);
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
          cols="12"
          sm="6"
          md="4"
      >
        <ProductCard
            :product="product"
            @add-to-cart="addToCart"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

