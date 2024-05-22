import { useEffect, useState } from "react";
import { Avatar } from "flowbite-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Committee() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getCommittee`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUsers();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-semibold text-center pb-4">Executive committee</h2>
      <Slider {...settings}>
        {users.map((user) => (
          <div key={user._id}>
            <div className="flex flex-col items-center pb-10">
              <img
                src={
                  user.profilePicture || "/images/people/profile-picture-3.jpg"
                }
                alt={user.username}
                className="w-32 h-32 rounded-full border-4 border-lime-700 bg-gray-500"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user.name ? user.name : "Name"}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user.designation ? user.designation : "Designation"}
              </span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
