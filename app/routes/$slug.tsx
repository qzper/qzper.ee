// app/routes/$slug.tsx
import { LoaderFunctionArgs, LinksFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

// Adding the Elementor stylesheet for the page's styling
export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://wp.qzper.ee/wp-content/plugins/elementor/assets/css/frontend.min.css',
    },
  ];
};


// Loader function to fetch data from WordPress API
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;

  // Fetch the WordPress page data using the slug
  const res = await fetch(`https://wp.qzper.ee/wp-json/wp/v2/pages?slug=${slug}`);
  
  if (!res.ok) {
    throw new Response("Page not found", { status: 404 });
  }

  const data = await res.json();

  // Check if the page was found
  if (!data || data.length === 0) {
    throw new Response("Page not found", { status: 404 });
  }

  const page = data[0];
  return { page };
};

// Component to render the WordPress page content
export default function WordPressPage() {
  const { page } = useLoaderData();

  return (
    <div style={{ padding: "20px" }}>
      <h1>{page.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
}
