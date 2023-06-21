import { SimplePost } from "@/model/post";
import Image from "next/image";
import { useState } from "react";
import PostDetail from "./PostDetail";
import PostModal from "./PostModal";
import ModalPortal from "./ui/ModalPortal";

type Props = {
  post: SimplePost;
  priority: boolean;
};
export default function PostGridCard({ post, priority = false }: Props) {
  const { image, username } = post;
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <Image
        src={image}
        alt={`Photo by ${username}`}
        fill
        sizes="650px"
        priority={priority}
      />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
