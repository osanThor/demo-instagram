import { ProfileUser } from "@/model/user";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

type Props = {
  user: ProfileUser;
};
export default function UserProfile({ user }: Props) {
  const { image, username, name, following, followers, posts } = user;
  const info = [
    { title: "posts", data: posts },
    { title: "followers", number: followers },
    { title: "following", number: following },
  ];
  return (
    <section>
      <Avatar image={image} highlight />
      <div>
        <h1>{username}</h1>
        <FollowButton user={user} />
        <ul>
          {info.map(({ title, data }, idx) => (
            <li key={idx}>
              <span>{data}</span>
              {title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
