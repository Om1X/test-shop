import { defineStore } from "pinia";
import type { Category } from "~/types/category";
import { BASE_URL } from "~/consts/api";

export const useCategoriesStore = defineStore('categories', () => {
    const categories = useState<Category[]>('categories', () => []);
    const loading = ref<boolean>(false);
    const isCategoriesLoaded = useState<boolean>('isCategoriesLoaded', () => false);
    const error = ref<string | null>(null);

    const fetchCategories = async (): Promise<void> => {
        loading.value = true;
        error.value = null;
        try {
            if (isCategoriesLoaded.value) return;

            categories.value = await $fetch<Category[]>(`${BASE_URL}/products/categories`);
            isCategoriesLoaded.value = true;
        } catch (err) {
            error.value = 'Ошибка загрузки категорий';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    return { categories, loading, error, fetchCategories };
});