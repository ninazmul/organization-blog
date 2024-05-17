import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"


export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [postSlug]);

    if(loading) return <div className="flex justify-center items-center min-h-screen"><Spinner size="xl" color="success"/></div>
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
          <img src={post && post.image} alt={post && post.title} className="mt-10 max-h-[600px] w-full object-cover bg-gray-500" />
          <div className="flex justify-between items-center p-4 border-b border-green-900 mx-auto w-full text-xs ">
              <p>{post && new Date(post.createdAt).toLocaleDateString()}</p>
              <p className="italic">{post && (post.content.length / 1000).toFixed(0)} mins read</p>
          </div>
          <div className="p-3 mx-auto w-full post-content text-justify" dangerouslySetInnerHTML={{__html: post && post.content}}>
              
          </div>
    </main>
  );
}
