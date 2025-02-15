<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';

useHead({
  title: () => `Test Shop / Cart`,
});

const cartStore = useCartStore();
await cartStore.fetchCart();

const isDialogOpen = ref(false);

const handleOrder = () => {
  isDialogOpen.value = true;
};
</script>

<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title class="text-h6 text-md-h5">Корзина</v-card-title>
      <v-divider />
      <v-list v-if="cartStore.cartData.length">
        <v-list-item
            v-for="(item, index) in cartStore.cartData"
            :key="item.id"
            :class="{ [$style['row-even']]: index % 2 === 0 }"
        >
          <v-row align="center" dense>
            <v-col cols="12" sm="4" class="text-sm-left text-center">{{ item.title }}</v-col>
            <v-col cols="4" sm="2" class="text-center">{{ item.quantity }} pcs.</v-col>
            <v-col cols="4" sm="2" class="text-center">${{ item.price.toFixed(2) }} / pcs.</v-col>
            <v-col cols="4" sm="2" class="text-center font-weight-bold">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </v-col>
            <v-col cols="12" sm="2" class="text-center mt-2 mt-sm-0">
              <v-btn color="error" size="small" @click="cartStore.removeItem(item.id)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
      <v-alert v-else type="info" class="my-4 text-center">Корзина пуста</v-alert>
      <v-divider />
      <v-row class="mt-4" justify="space-between" align="center">
        <v-col cols="12" sm="6" class="text-center text-sm-left font-weight-bold">
          Итого: ${{ cartStore.totalPrice }}
        </v-col>
        <v-col cols="12" sm="6" class="text-center text-sm-right mt-2 mt-sm-0">
          <v-btn color="primary" :disabled="!cartStore.cartData.length" @click="handleOrder">
            Оформить заказ
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Modal dialog -->
    <v-dialog v-model="isDialogOpen" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Congratulations!</v-card-title>
        <v-card-text>
          Your order has been successfully placed. Thank you for shopping with us!
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="isDialogOpen = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style module lang="scss">
.row-even {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
