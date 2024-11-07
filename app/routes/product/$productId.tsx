// app/routes/products/$productId.tsx
import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getProduct } from '~/utils/woocommerce'; // Function to fetch a single product
import type { Product } from '~/utils/types'; // Product type for typing

export const loader: LoaderFunction = async ({ params }) => {
  const productId = params.productId;
  const product = await getProduct(Number(productId));
  return json({ product });
};

export default function ProductPage() {
  const { product } = useLoaderData<{ product: Product }>();

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );
}
