import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-green-200 underline md:no-underline md:text-green-200 border-b-2 border-green-200 transition cursor-pointer font-bold"
          : "font-bold text-green-200"
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
