// src/utils/woocommerce.ts
import axios from 'axios';

const BASE_URL = process.env.WOOCOMMERCE_BASE_URL || '';
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

const woocommerceAPI = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: CONSUMER_KEY,
    password: CONSUMER_SECRET,
  },
});

// Fetch products from WooCommerce
export const getProducts = async () => {
  try {
    const response = await woocommerceAPI.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Fetch a single product by ID
export const getProduct = async (id: number) => {
  try {
    const response = await woocommerceAPI.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};