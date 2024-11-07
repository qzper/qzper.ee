// src/utils/woocommerce.ts
import axios from 'axios';
import { CloudflareContext } from './types';

// Using the context to access Cloudflare environment variables
export const getProducts = async ({ context }: { context: CloudflareContext }) => {
  const BASE_URL = context.cloudflare.env.WOOCOMMERCE_BASE_URL;
  const CONSUMER_KEY = context.cloudflare.env.WOOCOMMERCE_CONSUMER_KEY;
  const CONSUMER_SECRET = context.cloudflare.env.WOOCOMMERCE_CONSUMER_SECRET;

  const woocommerceAPI = axios.create({
    baseURL: BASE_URL,
    auth: {
      username: CONSUMER_KEY,
      password: CONSUMER_SECRET,
    },
  });

  try {
    const response = await woocommerceAPI.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Fetch a single product by ID
export const getProduct = async (id: number, { context }: { context: CloudflareContext }) => {
  const BASE_URL = context.cloudflare.env.WOOCOMMERCE_BASE_URL;
  const CONSUMER_KEY = context.cloudflare.env.WOOCOMMERCE_CONSUMER_KEY;
  const CONSUMER_SECRET = context.cloudflare.env.WOOCOMMERCE_CONSUMER_SECRET;

  const woocommerceAPI = axios.create({
    baseURL: BASE_URL,
    auth: {
      username: CONSUMER_KEY,
      password: CONSUMER_SECRET,
    },
  });

  try {
    const response = await woocommerceAPI.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};
