// src/utils/woocommerce.ts
import axios from 'axios';
import { LoaderFunctionArgs } from '@remix-run/cloudflare';

// Using the context to access Cloudflare environment variables
export const getProducts = async ({ context }: LoaderFunctionArgs) => {
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

// Fetch a single product by Slug
export const getProductBySlug = async (slug: string, { context }: LoaderFunctionArgs) => {
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
    const response = await woocommerceAPI.get(`/products`, {
      params: {
        slug,
      },
    });

    if (response.data.length === 0) {
      throw new Error(`Product with slug "${slug}" not found`);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    throw error;
  }
};
