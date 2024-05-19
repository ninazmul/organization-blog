import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Comment({ comment, onLike }) {
  const { currenUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="w-10 h-10 rounded-full bg-gray-500"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <p className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "Anonymous user"}
          </p>
          <p className="text-xs text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </p>
        </div>
        <p className="pb-2 text-justify">{comment.content}</p>
        <div className="flex items-center text-xs gap-2 pt-2 border-t dark:border-gray-700 max-w-fit">
          <button
            onClick={() => onLike(comment._id)}
            className={`hover:text-green-500 ${
              currenUser && comment.likes.includes(currenUser._id)
                ? "text-green-500"
                : "text-gray-400"
            }`}
          >
            <FaThumbsUp />
          </button>

          <p className="text-gray-400">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
          </p>
        </div>
      </div>
    </div>
  );
}
