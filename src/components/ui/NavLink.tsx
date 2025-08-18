import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";

export function NavLink(props: NavLinkProps) {
  return (
    <RouterNavLink
      {...props}
      className={({ isActive }) =>
        `px-3 py-2 rounded-lg font-medium transition-colors ${
          isActive
            ? "bg-blue-100 text-blue-700"
            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
        }`
      }
    />
  );
}
