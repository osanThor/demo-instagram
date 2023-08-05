"use client";
import { AuthUser } from "@/model/user";
import PostUserAvatar from "./PostUserAvatar";
import FilesIcon from "./ui/icons/FilesIcon";
import Button from "./ui/Button";
import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GridLoader } from "react-spinners";

type Props = {
  user: AuthUser;
};
export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleDrag = (e: DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");

    fetch("/api/posts/", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push("/");
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <section className="flex flex-col items-center w-full px-4 mt-6 man-w-xl">
      {loading && (
        <div className="absolute inset-0 pt-[30%] z-20 text-center bg-sky-500/20">
          <GridLoader />
        </div>
      )}
      {error && (
        <p className="w-full p-4 mb-4 font-bold text-center text-red-600 bg-red-100">
          {error}
        </p>
      )}
      <PostUserAvatar username={username} image={image ?? ""} />
      <form className="flex flex-col w-full mt-2" onSubmit={handleSubmit}>
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`flex flex-col items-center justify-center w-full h-60 ${
            !file && "border-2 border-sky-500 border-dashed"
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 pointer-events-none bg-sky-500/20" />
          )}
          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <FilesIcon />
              <p>Drag and Drop your image here ot click</p>
            </div>
          )}
          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          className="text-lg border outline-none border-neutral-300"
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder="Write a Caption..."
          ref={textRef}
        />
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
