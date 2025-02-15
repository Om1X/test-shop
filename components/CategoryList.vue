<script setup lang="ts">
import { CATEGORY_ICONS_MAP } from "~/consts/products";
import {useCategoriesStore} from "~/stores/categories";

const categoriesStore = useCategoriesStore();

const route = useRoute();
const selectedCategory = ref<string | null>(route.params.category || null);
await categoriesStore.fetchCategories();

</script>

<template>
  <v-col
      v-for="category in categoriesStore.categories"
      :key="category"
      cols="12"
      sm="6"
      md="4"
      lg="3"
  >
    <NuxtLink
        :to="`/category/${category}`"
        class="text-decoration-none"
    >
      <v-card
          :class="{
          [$style['category__selected']]: selectedCategory === category,
        }"
          background-color="blue"
      >
        {{ category.id }}
        <v-img
            :src="CATEGORY_ICONS_MAP[category]"
            height="150px"
            class="d-none d-sm-flex"
        />
        <v-card-title :class="$style['category-title']">
          {{ category }}
        </v-card-title>
      </v-card>
    </NuxtLink>
  </v-col>
</template>

<style module lang="scss">
.category {
  &-title {
    text-align: center;
  }

  &__selected {
    background-color: #F5F5F5 !important;
  }
}
</style>
