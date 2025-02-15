<script setup lang="ts">
import CartButton from "~/components/CartButton.vue";
</script>

<template>
  <NuxtLayout>
    <v-app>
      <v-app-bar app>
        <v-toolbar-title>
          <NuxtLink :class="$style.logo" to="/">
            Test Shop
          </NuxtLink>
        </v-toolbar-title>

        <v-spacer/>

        <CartButton />
      </v-app-bar>

      <v-main>
        <v-container>
          <NuxtPage />
        </v-container>
      </v-main>

      <v-footer app>
        <v-container class="text-center">
          &copy; {{ new Date().getFullYear() }} Test Shop
        </v-container>
      </v-footer>
    </v-app>
  </NuxtLayout>
</template>

<style module lang="scss">
.logo {
  font-weight: bold;
  flood-color: #1867C0;
  text-decoration: none;

  &:visited {
    color: #1867C0;
  }
}
</style>