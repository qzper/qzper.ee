// app/routes/post/$postId.tsx
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Post } from "~/utils/types";

// Loader function to fetch a single post by ID
export const loader: LoaderFunction = async ({ params }) => {
  try {
    const { postId } = params;
    const response = await fetch(`https://wp.qzper.ee/wp-json/wp/v2/posts/${postId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }

    const post = await response.json();
    return json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Response("Post not found", { status: 404 });
  }
};

// React component to display a single post
export default function Post() {
  const { post } = useLoaderData<{ post: Post }>();  // Corrected to use `Post` instead of `Post[]`

  return (
    <article>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}
