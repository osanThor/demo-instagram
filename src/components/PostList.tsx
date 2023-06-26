"use client";
import PostListCard from "./PostListCard";
import GridSpinner from "./ui/GridSpinner";
import usePosts from "@/hooks/posts";

export default function PostList() {
  const { posts, isLoading: loading } = usePosts();
  return (
    <section>
      {loading && (
        <div className="mt-32 text-center">
          <GridSpinner color="red" />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, idx) => (
            <li key={post.id} className="mb-4">
              <PostListCard post={post} priority={idx < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
