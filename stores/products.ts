import { defineStore } from "pinia";
import type {Product, ProductData} from "~/types/products";
import { BASE_URL } from "~/consts/api";

export const useProductsStore = defineStore('products', () => {
    const products = useState<Product[]>('products', () => []);
    const loading = ref(false);
    const isDataLoaded = useState<boolean>('isDataLoaded', () => false);
    const selectedCategory = useState<string | null>('selectedCategory', () => 'all');
    const selectedProductId = useState<number | null>('selectedProductId', () => null);
    const selectedProductData = useState<ProductData | null>('selectedProductData', () => null);
    const error = ref<string | null>(null);

    const fetchAllProducts = async (): Promise<void> => {
        loading.value = true;
        error.value = null;
        try {
            if (isDataLoaded.value) return;
            products.value = await $fetch<Product[]>(`${BASE_URL}/products`);
            isDataLoaded.value = true;
        } catch (err) {
            error.value = 'Ошибка загрузки товаров';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
        loading.value = true;
        error.value = null;
        try {
            if (category === selectedCategory.value) return;
            products.value = await $fetch<Product[]>(`${BASE_URL}/products/category/${category}`);

            selectedCategory.value = category;
        } catch (err) {
            error.value = 'Ошибка загрузки товаров';
            console.error(err);
        } finally {
            loading.value = false;
            isDataLoaded.value = false;
        }
    };

    const fetchProductById = async (id: number): Promise<void> => {
        loading.value = true;
        error.value = null;

        try {
            if (selectedProductId.value === id) return;

            selectedProductData.value = await $fetch<ProductData[]>(`${BASE_URL}/products/${id}`);
            selectedProductId.value = id;
        } catch (err) {
            error.value = 'Ошибка загрузки товара';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    return {
        products,
        loading,
        error,
        selectedProductData,
        fetchAllProducts,
        fetchProductsByCategory,
        fetchProductById
    };
});