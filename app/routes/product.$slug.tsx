import { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react';
import { getProductBySlug } from '~/utils/woocommerce'; // Function to fetch a single product
import type { Product } from '~/utils/types'; // Product type for typing
import '~/styles/productsSlug.css';

// Loader function to fetch a product by slug
export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const { slug } = params; // Extract the slug from URL params
  if (!slug) {
    throw new Response('Slug not provided', { status: 400 });
  }

  try {
    const products = await getProductBySlug(slug, { context }); // Get the product by slug
    const product = products[0]; // Get the first product from the array
    return { product }; // Return the product
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Response('Product not found', { status: 404 });
  }
};

// Product page component
export default function ProductPage() {
  const { product } = useLoaderData<{ product: Product }>();

  return (
    <div className="product-page">
      <div className="product-container">
        {/* Product Image */}
        <div className="product-image">
          <img src={product.images[0]?.src} alt={product.name} />
        </div>

        {/* Product Details */}
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-description" dangerouslySetInnerHTML={{ __html: product.description }} />
          <div className="product-price">
            <span className="price-label">Price: </span>
            <span className="price">{product.price} €</span>
          </div>
          <div className="product-actions">
            <button className="add-to-cart-btn">Add to Cart</button>
            <a href={product.permalink} className="view-product-btn">View Product</a>
          </div>
        </div>
      </div>
    </div>
  );
}
