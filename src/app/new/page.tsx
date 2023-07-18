import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import NewPost from "@/components/NewPost";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const metadata: Metadata = {
  title: "New Post",
  description: "Create at New Post",
};
export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }
  return <NewPost user={session.user} />;
}
