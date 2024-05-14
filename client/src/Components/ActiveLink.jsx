import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "dark:border-green-200 border-green-900 border-b-2 transition cursor-pointer font-bold"
          : "font-bold"
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
