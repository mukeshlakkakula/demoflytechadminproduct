import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <>
      {/* Burger menu for mobile */}
      <button
        onClick={toggleSidebar}
        className="p-3 bg-blue-600 text-white fixed top-4 left-4 z-50 md:hidden"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 ease-in-out overflow-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64`}
      >
        <div className="p-4 text-2xl font-semibold bg-blue-700">My Sidebar</div>

        <nav className="mt-4">
          {/* Main menu items */}
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleMenuClick("menu1")}
                className="flex items-center justify-between w-full p-3 text-left hover:bg-blue-600"
              >
                Add Product
                <span>{activeMenu === "menu1" ? "-" : "+"}</span>
              </button>
              {activeMenu === "menu1" && (
                <ul className="pl-6 space-y-2">
                  <li>
                    <Link
                      to="/grocery"
                      className={`block p-2 ${
                        isActiveLink("/grocery")
                          ? "bg-blue-500"
                          : "hover:bg-blue-500"
                      }`}
                    >
                      1. Grocery
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/mobiles"
                      className={`block p-2 ${
                        isActiveLink("/mobiles")
                          ? "bg-blue-500"
                          : "hover:bg-blue-500"
                      }`}
                    >
                      2. Mobiles
                    </Link>
                  </li>
                  {/* Repeat similar <Link> components for other items */}
                </ul>
              )}
            </li>
            <li>
              <button
                onClick={() => handleMenuClick("menu2")}
                className="flex items-center justify-between w-full p-3 text-left hover:bg-blue-600"
              >
                Menu 2 <span>{activeMenu === "menu2" ? "-" : "+"}</span>
              </button>
              {activeMenu === "menu2" && (
                <ul className="pl-6 space-y-2">
                  <li>
                    <Link
                      to="/submenu2.1"
                      className={`block p-2 ${
                        isActiveLink("/submenu2.1")
                          ? "bg-blue-500"
                          : "hover:bg-blue-500"
                      }`}
                    >
                      Submenu 2.1
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/submenu2.2"
                      className={`block p-2 ${
                        isActiveLink("/submenu2.2")
                          ? "bg-blue-500"
                          : "hover:bg-blue-500"
                      }`}
                    >
                      Submenu 2.2
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/addproduct"
                className={`block p-3 ${
                  isActiveLink("/addproduct")
                    ? "bg-blue-500"
                    : "hover:bg-blue-600"
                }`}
              >
                Product Management
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
