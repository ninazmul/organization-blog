import { Avatar, Button, Dropdown, Navbar, Modal } from "flowbite-react";
import { useState } from "react";
import logo from "../../public/Prafulla-ai white.webp";
import { Link } from "react-router-dom";
import ActiveLink from "./ActiveLink";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { FaMoon, FaSun } from "react-icons/fa";
import { signOutSuccess } from "../redux/user/userSlice";

const Header = () => {
  // const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

    const navBtn = (
        <ul className="md:flex md:gap-4 lg:gap-10 font-bold uppercase">
            
        <ActiveLink spy="true" smooth="true" to="/">
          <li>Home </li>
        </ActiveLink>

        <ActiveLink spy="true" smooth="true" to="/events">
          <li>Events</li>
        </ActiveLink>

        <ActiveLink spy="true" smooth="true" to="/media">
          <li>Media</li>
        </ActiveLink>

        <ActiveLink spy="true" smooth="true" to="/about">
          <li>About Us</li>
        </ActiveLink>
      </ul>
    );

  return (
    <Navbar
      fluid
      className="bg-gradient-to-r from-[#4c8e40] to-[#81b619] rounded-none"
    >
      <Link to="/">
        <img src={logo} className="mr-3 h-10 sm:h-14" alt="Prafulla Logo" />
      </Link>
      <div className="flex md:order-2 gap-4">
        <Button
          className=""
          color="none"
          pill
          onClick={() => dispatch(toggleTheme())}
          rounded
        >
          {theme === "light" ? <FaSun size={24} /> : <FaMoon size={24} />}
        </Button>
        {currentUser ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block truncate text-sm font-medium">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Button
                  onClick={handleSignout}
                  outline
                  gradientDuoTone="greenToBlue"
                  className="text-xl font-semibold w-full"
                >
                  Sign Out
                </Button>
              </Dropdown.Item>
            </Dropdown>
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <Button
                outline
                gradientDuoTone="greenToBlue"
                className="font-semibold"
                size="sm"
              >
                Sign In
              </Button>
            </Link>
          </>
        )}

        <Navbar.Toggle />
        {/* <Button
          onClick={() => setOpenModal(true)}
          outline
          gradientDuoTone="greenToBlue"
          className="font-semibold"
          size="sm"
        >
          Donation
        </Button>
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Support Our Cause</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Dear Friend, We're so glad you've taken a step to make a
                difference! Your generous donation will help us continue our
                work and make a significant impact in the lives of those we
                serve.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Thank you for your generosity and support!
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpenModal(false)} color="failure">
              Close
            </Button>
          </Modal.Footer>
        </Modal> */}
      </div>
      <Navbar.Collapse>{navBtn}</Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
