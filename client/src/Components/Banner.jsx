import { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import logo from "../../public/Prafulla-ai.png";

export default function Banner() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts");
        const data = await res.json();
        const bannerPost = data.posts.filter(
          (post) => post.category === "banner"
        );
        setPosts(bannerPost);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="h-56 md:h-80 lg:h-96 rounded-none relative">
        <Carousel pauseOnHover>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="relative w-full h-full">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full rounded-none"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                <div className="absolute z-10 top-1/3 w-full text-center px-4">
                  <h1 className="text-3xl font-bold lg:text-6xl font-serif text-white">
                    {post.title}
                  </h1>
                  <p className="text-white mt-4">
                    {post.content.replace(/<[^>]+>/g, '')}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="relative w-full h-full">
              <img
                src={logo}
                alt="default"
                className="object-cover w-full h-full"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
              <div className="absolute z-10 top-1/3 w-full text-center px-4">
                <h1 className="text-3xl font-bold lg:text-6xl font-serif text-white">
                  Welcome to Prafulla
                </h1>
                <p className="text-white mt-4">
                  May the world Winsome, Joyful and Blooming!
                </p>
              </div>
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
}
