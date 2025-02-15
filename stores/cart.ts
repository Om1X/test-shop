import { defineStore } from "pinia";
import { BASE_URL } from "~/consts/api";
import type {ProductData, ProductInCart} from "~/types/products";

export const useCartStore = defineStore('cart', () => {
    const initialCart = useState<ProductInCart[]>('initialCart', () => []);
    const cartData = useState<ProductData[]>('cartData', () => []);
    const loading = ref<boolean>(false);
    const isCartLoaded = useState<boolean>('isCartLoaded', () => false);
    const error = ref<string | null>(null);
    const productsCount = computed<number>(() => cartData.value
        .reduce((count: number, product: ProductData) => count + product.quantity, 0));
    const totalPrice = computed<number>(() => cartData.value
        .reduce((price: number, product: ProductData) => price + product.quantity * product.price, 0));

    const fetchCart = async (): Promise<void> => {
        loading.value = true;
        error.value = null;
        try {
            if (isCartLoaded.value) return;

            initialCart.value = (await $fetch<ProductInCart[]>(`${BASE_URL}/carts/5`)).products;
            cartData.value = await Promise.all(
                initialCart.value.map(async (productInCart: ProductInCart) => {
                    const productData = await $fetch(`${BASE_URL}/products/${productInCart.productId}`);
                    return {
                        ...productData,
                        quantity: productInCart.quantity,
                    }
                })
            );
            isCartLoaded.value = true;
        } catch (err) {
            error.value = 'Ошибка загрузки корзины';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    const addToCart = async (id: number): void => {
        const inCartProduct: ProductData | null = cartData.value
            .find((product: ProductData) => product.id === id);

        if (inCartProduct) {
            inCartProduct.quantity += 1;
        } else {
            try {
                const productData = await $fetch(`${BASE_URL}/products/${id}`);

                cartData.value.push({
                    ...productData,
                    quantity: 1
                });
            } catch (err) {
                error.value = 'Ошибка добавления в корзину';
                console.error(err);
            }
        }
    }

    const removeFromCart = async (id: number): void => {
        const inCartProductIndex: number = cartData.value
            .findIndex((product: ProductData) => product.id === id);

        if (inCartProductIndex > -1) {
            cartData.value.splice(inCartProductIndex, 1);
        }
    }

    return { initialCart, productsCount, totalPrice, cartData, loading, error, fetchCart, addToCart, removeFromCart };
});