import { Link } from "react-router-dom";
import prafulla from "../../public/Prafulla-ai.png";
import { Button, Label, TextInput } from "flowbite-react";

const Signin = () => {
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4">
        {/* left side  */}
        <div className="flex flex-col items-center">
          <Link to="/">
            <img src={prafulla} alt="" className="h-28 lg:h-52" />
          </Link>
          <h1 className="text-4xl flex items-center font-bold font-mono text-[#4c8e40]">
            Welcome Back!
          </h1>

          <p className="text-gray-500 text-justify">
            Sign in to access your account and dive back into our community.
            Let's continue the journey together.
          </p>
        </div>
        {/* right side  */}
        <div>
          <form className="flex flex-col gap-4 p-4 lg:p-10 bg-gradient-to-r from-[#4c8e40] to-[#81b619] rounded-lg">
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-mono text-center">
              Sign In Now!
            </h1>
            <div>
              <Label value="Your username" className="text-white" />
              <TextInput id="username" type="text" placeholder="Username" />
            </div>
            <div>
              <Label value="Your email" className="text-white" />
              <TextInput id="email" type="text" placeholder="your@email.com" />
            </div>
            <div>
              <Label value="Your password" className="text-white" />
              <TextInput id="password" type="password" placeholder="Password" />
            </div>
            <Button
              outline
              gradientDuoTone="greenToBlue"
              type="submit"
              className="text-xl font-semibold"
            >
              Sign Up
            </Button>
          </form>
          <div>
            <p className="text-center p-2 text-sm">
              If you're new here, you can <Link to="/sign-up" className="underline text-blue-700">
                              Sign-Up
              </Link>{" "}
              for an account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
