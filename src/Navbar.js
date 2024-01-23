// Navbar.js

import React, { useEffect, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { NavLink, Link } from "react-router-dom";
import LogoutLogic from "./Logout";
import Brand from "./Brand";
import { useAuth } from './AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [toggleMenu, setToggleMenu] = useState(false);

  const [navData, setNavData] = useState([]);

  useEffect(() => {
    setNavData((prev) => [
        {
            title: "Home",
            link: "/",
            show: true,
          },
      {
        title: "Explore",
        link: "/explore",
        show: true,
      },
      {
        title: "Login",
        link: "/Login",
        show: !isAuthenticated,
      },
      {
        title: "Signup",
        link: "/SignUp",
        show: !isAuthenticated,
      },
    ]);
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="app">
      <nav className="text-white w-full bg-secondary text-sm">
        <div className="container">
          <div className="flex mx-auto justify-between ">
            {/* Primary menu and logo */}
            <div className="flex items-center justify-between w-full gap-16 my-8 font-poppins">
              {/* logo */}
              <div>
                <Brand />
              </div>
              {/* primary */}
              <div className="hidden lg:flex gap-8">
                {navData?.map(
                  (item, index) =>
                    item.show && (
                      <NavLink
                        onClick={() => setToggleMenu((prev) => false)}
                        key={index}
                        to={item.link}
                        className="hover:text-accent"
                      >
                        {item.title}
                      </NavLink>
                    )
                )}
                {isAuthenticated && (
                  <Link
                    to="/logout"
                    onClick={handleLogout}
                    className="logout-link hover:text-accent"
                  >
                    Logout
                  </Link>
                )}
              </div>
            </div>
            {/* secondary */}
            <div className="flex gap-6">
              {/* Mobile navigation toggle */}
              <div className="lg:hidden flex items-center">
                <button onClick={() => setToggleMenu(!toggleMenu)}>
                  <RiMenu3Line size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* mobile navigation */}
        <div
          className={`fixed z-40 w-full bg-secondary overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 font-poppins ${
            !toggleMenu ? "h-0" : "h-full"
          }`}
        >
          <div className="px-8">
            <div className="flex flex-col gap-8 tracking-wider">
              {navData?.map(
                (item, index) =>
                  item.show && (
                    <NavLink
                      onClick={() => setToggleMenu((prev) => false)}
                      key={index}
                      to={item.link}
                      className="hover:text-accent"
                    >
                      {item.title}
                    </NavLink>
                  )
              )}
              {isAuthenticated && (
                <Link
                  to="/logout"
                  onClick={handleLogout}
                  className="logout-link hover:text-accent"
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
