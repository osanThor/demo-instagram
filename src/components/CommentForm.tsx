import SmileIcons from "./ui/icons/SmileIcons";

export default function CommentForm(){
    return(
        <form className="flex items-center border-t border-neutral-300">
        <SmileIcons />
        <input
          className="w-full p-3 ml-2 border-none outline-none"
          type="text"
          placeholder="Add a comment..."
        />
        <button className="ml-2 font-bold text-sky-500">Post</button>
      </form>
    )
}