// app/routes/post/$postId.tsx
import { json, LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData } from "@remix-run/react";
import type { Post } from "~/utils/types";

// Loader function to fetch a single post by ID
export const loader: LoaderFunction = async ({ params }) => {
  try {
    const { postId } = params;

    // Check if postId is provided and is a valid number
    if (!postId || isNaN(Number(postId))) {
      throw new Response("Invalid post ID", { status: 400 });
    }

    const response = await fetch(`https://wp.qzper.ee/wp-json/wp/v2/posts/${postId}`, {
      headers: {
        'Cache-Control': 'max-age=300, s-maxage=600, stale-while-revalidate=120',
      },
    });

    if (!response.ok) {
      throw new Response("Post not found", { status: 404 });
    }

    const post = await response.json();
    return json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Response("Failed to load post", { status: 500 });
  }
};

// React component to display a single post
export default function PostPage() {
  const { post } = useLoaderData<{ post: Post }>();

  return (
    <article>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}

// Error boundary for handling errors on the single post page
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>Error loading post</h1>
      <p>{error.message}</p>
    </div>
  );
}
