export type Product = {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    regular_price: string;
    sale_price: string;
    status: string;
    images: Array<{ src: string; alt: string }>;
  };

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