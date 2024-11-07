import { json, LoaderFunction } from '@remix-run/cloudflare'
import { useLoaderData } from "@remix-run/react";
import type { Post } from "~/utils/types";  // Assuming you have the Post type defined in types.ts

// Loader function to fetch posts directly from the WordPress API
export const loader: LoaderFunction = async () => {
  try {
    // Make a request to the WordPress REST API
    const response = await fetch("https://wp.qzper.ee/wp-json/wp/v2/posts?per_page=5");

    // Check if the response is okay
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
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
  // Fix the type for the posts as an array of Post
  const { posts } = useLoaderData<{ posts: Post[] }>();

  return (
    <div>
      <h1>Latest Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title.rendered}</h2>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            <a href={`/post/${post.id}`}>Read More</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
