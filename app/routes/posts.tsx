// app/routes/posts.tsx
import { json, LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData } from "@remix-run/react";
import type { Post } from "~/utils/types";

// Loader function to fetch posts directly from the WordPress API
export const loader: LoaderFunction = async () => {
  try {
    // Make a request to the WordPress REST API
    const response = await fetch("https://wp.qzper.ee/wp-json/wp/v2/posts?per_page=5", {
      headers: {
        'Cache-Control': 'max-age=300, s-maxage=600, stale-while-revalidate=120',
      },
    });

    // Check if the response is okay
    if (!response.ok) {
      throw new Response("Failed to fetch posts", { status: 500 });
    }

    // Parse the JSON response
    const posts = await response.json();
    return json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Response("Failed to load posts", { status: 500 });
  }
};

// React component to display the posts
export default function Posts() {
  const { posts } = useLoaderData<{ posts: Post[] }>();

  return (
    <div>
      <h1>Latest Posts</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title.rendered}</h2>
              <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              <a href={`/post/${post.id}`}>Read More</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

// Error boundary for handling errors on the posts page
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>Error loading posts</h1>
      <p>{error.message}</p>
    </div>
  );
}
