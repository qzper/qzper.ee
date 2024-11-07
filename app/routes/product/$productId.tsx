// app/routes/products/$productId.tsx
import { LoaderFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react';
import { getProduct } from '~/utils/woocommerce'; // Function to fetch a single product
import type { Product } from '~/utils/types'; // Product type for typing

export const loader: LoaderFunction = async ({ params, context }) => {
    const { productId } = params; // Extract the productId from URL params
    const product = await getProduct(Number(productId), { context }); // Pass the context to getProduct
    return { product };
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
