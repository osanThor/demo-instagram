import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
  image: string;
  username: string;
};

export default function PostUserAvatar({ image, username }: Props) {
  return (
    <div className="flex items-center p-2">
      <Link href={`/user/${username}`}>
        <Avatar image={image} highlight size="medium" />
      </Link>
      <span className="ml-2 font-bold text-gray-900">{username}</span>
    </div>
  );
}
