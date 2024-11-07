export interface Product {
    id: number;
    title: {
      rendered: string;
    };
    price: string;
    description: string;
    images: { src: string }[];
    [key: string]: any;
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