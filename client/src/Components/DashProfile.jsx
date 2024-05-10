import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux"

export default function DashProfile() {
    const { currentUser } = useSelector(state => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-center my-4 font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[#81b619]"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="example@email.com"
          defaultValue={currentUser.email}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          defaultValue={currentUser.password}
        />
        <Button
          outline
          gradientDuoTone="greenToBlue"
          type="submit"
          className="text-xl font-semibold"
        >
          Update
        </Button>
          </form>
          <div className="flex justify-between text-red-500 my-4">
              <Button className="text-red-500 font-semibold" color="none">Delete Account</Button>
              <Button className="text-red-500 font-semibold" color="none">Sign Out</Button>
          </div>
    </div>
  );
}
