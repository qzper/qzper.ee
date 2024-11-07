export interface Product {
    id: number;
    name: string;
    title: {
      rendered: string;
    };
    price: string;
    description: string;
    images: { src: string }[];
    [key: string]: unknown;
}

export interface Post {
    id: number;
    title: {
      rendered: string;
    };
    content: {
      rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    date: string;
    [key: string]: unknown;
}

export interface CloudflareContext {
    cloudflare: {
        env: {
            WOOCOMMERCE_BASE_URL: string;
            WOOCOMMERCE_CONSUMER_KEY: string;
            WOOCOMMERCE_CONSUMER_SECRET: string;
        };
    };
  }