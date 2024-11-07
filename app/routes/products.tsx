// app/routes/products.tsx
import { json, LoaderFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react';
import { getProducts } from '~/utils/woocommerce';
import type { Product } from '~/utils/types';

export const loader: LoaderFunction = async ({ context }) => {
  const products: Product[] = await getProducts({ context });
  return json({ products });
};

export default function ProductsPage() {
  const { products } = useLoaderData<{ products: Product[] }>();

  return (
    <div className="product-page">
      <h1 className="page-title">Our Products </h1>
      <div className="product-grid">
        {products.map((product) => {
          // Check if product has images and set a fallback image if not
          const imageSrc = product.images && product.images.length > 0 
            ? product.images[0].src
            : 'https://via.placeholder.com/300x300?text=No+Image'; // Replace with your fallback image URL

          return (
            <div key={product.id} className="product-card">
              <img
                src={imageSrc}
                alt={product.title?.rendered || 'Product Image'}  // Use optional chaining here
                className="product-image"
              />
              <h2 className="product-title">{product.name || 'No Title'}</h2>  {/* Optional chaining for title */}
              <p className="product-price">${product.price}</p>
              <div
                className="product-description"
                dangerouslySetInnerHTML={{ __html: product.description }}  // Use dangerouslySetInnerHTML
              />
              <button className="add-to-cart">Add to Cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
