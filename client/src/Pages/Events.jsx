import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";


const Events = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const res = await fetch("/api/post/getposts");
          const data = await res.json();
          const bannerEvent = data.posts.filter(
            (post) => post.category === "event"
          );
          setPosts(bannerEvent);
        } catch (error) {
          console.error("Failed to fetch posts:", error);
        }
      };
      fetchPosts();
    }, []);
    return (
      <div className="min-h-screen">
        <h1 className="text-3xl font-semibold p-3 mt-5 text-center">
          All Events:
        </h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    );
};

export default Events;