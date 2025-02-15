<script setup lang="ts">
const cartStore = useCartStore();

await cartStore.fetchCart();

</script>

<template>
  <v-btn to="/cart">
    <v-badge
        :content="cartStore.productsCount"
        color="red"
    >
        <v-icon size="42">mdi-cart</v-icon>
    </v-badge>
  </v-btn>
</template>

<style scoped lang="scss">

</style>