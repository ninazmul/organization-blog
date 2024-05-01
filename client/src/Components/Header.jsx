import { Avatar, Button, Dropdown, Navbar, Modal } from "flowbite-react";
import { useState } from "react";

import logo from "../../public/Prafulla-ai white.webp";
import { Link } from "react-router-dom";
import ActiveLink from "./ActiveLink";

const Header = () => {
    const [openModal, setOpenModal] = useState(false);

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
      className="bg-gradient-to-r from-[#4c8e40] to-[#81b619] rounded-b-md"
    >
      <Link to="/">
        <img src={logo} className="mr-3 h-12 sm:h-20" alt="Prafulla Logo" />
      </Link>
      <div className="flex md:order-2 gap-4">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
        <Button
          onClick={() => setOpenModal(true)}
          outline
          gradientDuoTone="greenToBlue"
          className="text-xl font-semibold"
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
        </Modal>
      </div>
      <Navbar.Collapse>{navBtn}</Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
