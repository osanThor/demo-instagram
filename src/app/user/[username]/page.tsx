import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { gertuserForProfile } from "@/service/user";
import { notFound } from "next/navigation";

type Props = {
  params: {
    username: string;
  };
};
export default async function UserPage({ params: { username } }: Props) {
  const user = await gertuserForProfile(username);
  if (!user) {
    notFound();
  }
  return (
    <>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </>
  );
}
