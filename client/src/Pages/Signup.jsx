import { Link } from "react-router-dom";
import prafulla from "../../public/Prafulla-ai.png";
import { Button, Label, TextInput } from "flowbite-react";

const Signup = () => {
    return (
      <div className="min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4">
          {/* left side  */}
          <div className="flex flex-col items-center">
            <Link to="/">
              <img src={prafulla} alt="" className="h-28 lg:h-52" />
            </Link>
            <h1 className="text-4xl flex items-center font-bold font-mono text-[#4c8e40]">
              Join Us Today!
            </h1>

            <p className="text-gray-500 text-justify">
              Sign up now to connect, discover, and contribute to our community.
              It only takes a moment!
            </p>
          </div>
          {/* right side  */}
          <div>
            <form className="flex flex-col gap-4 p-4 lg:p-10 bg-gradient-to-r from-[#4c8e40] to-[#81b619] rounded-lg">
              <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-mono text-center">
                Sign Up Now!
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
                <TextInput
                  id="password"
                  type="password"
                  placeholder="Password"
                />
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
                Have an account?{" "}
                <Link to="/sign-in" className="underline text-blue-700">
                  Sign-In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Signup;