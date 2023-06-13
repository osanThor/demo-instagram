import { SimplePost } from "@/model/post";
import { client, urlFor } from "./sanity";
const simplePostProjection = `
    ...,
    "username": author->username,
    "userImage": author->image,
    "image": photo,
    "likes": likes[]->username,
    "text": comments[0].comment,
    "comments": count(comments),
    "id":_id,
    "createAt":_createAt
`;
export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"
          || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
          | order(_createAt desc){${simplePostProjection}}`
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) }))
    );
}
