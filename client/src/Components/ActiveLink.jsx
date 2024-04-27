import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-green-700 border-b-2 border-green-700 lg:border-green-700 lg:text-green-700 transition cursor-pointer text-xl font-bold"
          : "text-xl font-bold"
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
