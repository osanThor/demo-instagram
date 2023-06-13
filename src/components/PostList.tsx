"use client";
import useSWR from "swr";
export default function PostList() {
  const { data, isLoading: loading } = useSWR("/api/post");
  return <div>PostList</div>;
}
