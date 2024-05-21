import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import prafulla from "../../public/Prafulla-ai white.webp";
import { Link } from "react-router-dom";

const Footers = () => {
  return (
    <Footer
      container
      className="bg-gradient-to-r from-[#4c8e40] to-[#81b619] text-white dark:text-green-200 rounded-none"
    >
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <Link to="/">
            <img src={prafulla} alt="Prafulla Logo" className="w-64 py-4" />
          </Link>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title
                title="Organization"
                className="text-white dark:text-green-200"
              />
              <Footer.LinkGroup col className="text-white dark:text-green-200">
                <Link to="/">Home</Link>
                <Link to="/events">Events</Link>
                <Link to="/about">About Us</Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title
                title="Follow us"
                className="text-white dark:text-green-200"
              />
              <Footer.LinkGroup col className="text-white dark:text-green-200">
                <Footer.Link href="#">Facebook</Footer.Link>
                <Footer.Link href="#">Instagram</Footer.Link>
                <Footer.Link href="#">YouTube</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title
                title="Legal"
                className="text-white dark:text-green-200"
              />
              <Footer.LinkGroup col className="text-white dark:text-green-200">
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <p>
            Copyright © 2025 - All right reserved by{" "}
            <Link to="/">Prafulla</Link>
          </p>{" "}
          <p className="flex items-center gap-2">
            Developed by -{" "}
            <Link
              to="https://artistycode-studio.web.app"
              target="_blank"
              className="underline"
            >
              {/* <img src={acs} alt="" className="w-12" /> */} ArtistyCode
              Studio
            </Link>
          </p>
        </div>
      </div>
    </Footer>
  );
};

export default Footers;
