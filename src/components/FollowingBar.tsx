"use client";
import Link from "next/link";
import { PropagateLoader } from "react-spinners";
import Avatar from "./Avatar";
import ScrollerableBar from "./ui/ScrollerableBar";
import useMe from "@/hooks/me";

export default function FollowingBar() {
  const { user, isLoading: loading } = useMe();
  const users = user?.following;

  return (
    <section className="flex items-center justify-center w-full px-2 py-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto z-0 relative">
      {loading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`Tou don't have Followings`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollerableBar>
          {users.map(({ username, image }) => (
            <Link
              key={username}
              href={`/user/${username}`}
              className="flex flex-col items-center w-20"
            >
              <Avatar image={image} highlight />
              <p className="w-full overflow-hidden text-sm text-center text-ellipsis">
                {username}
              </p>
            </Link>
          ))}
        </ScrollerableBar>
      )}
    </section>
  );
}
