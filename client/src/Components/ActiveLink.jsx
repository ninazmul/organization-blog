import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-white underline md:no-underline md:text-white border-b-2 border-white transition cursor-pointer text-xl font-bold"
          : "text-xl font-bold text-white"
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
