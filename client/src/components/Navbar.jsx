import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { user,logout } = useAuth();
  const navItems = user && user._id ? ["Chat", "Profile"] : ["Login", "Signup"];
  console.log("User in Navbar:", user);

  const handleLogout = () => {
    if (user) {
      console.log("Logging out user:", user);
      logout();
      setMenuOpen(false);
    }
  };

  const handleTheme=()=>{
    toggleTheme();
    setMenuOpen(false);
  }

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5, // 50% visible
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-colors duration-500 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } shadow-lg`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2 ">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight select-none">
          <a href="/">
            <h1 className="text-2xl text-gray-900">
              <svg
                width="60"
                height="60"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left code bracket */}
                <path
                  className="bg-slate-900 dark:bg-slate-200"
                  d="M15.6583 14.9391C15.9512 15.232 15.9512 15.7069 15.6583 15.9998L9.71893 21.9391L15.6583 27.8785C15.9512 28.1714 15.9512 28.6463 15.6583 28.9392C15.3654 29.2321 14.8905 29.2321 14.5976 28.9392L7.59761 21.9392C7.30472 21.6463 7.30472 21.1714 7.59761 20.8785L14.5976 13.8785C14.8905 13.5856 15.3654 13.5856 15.6583 13.8785V14.9391Z"
                  fill={isDarkMode ? "#fff" : "#000"}
                />
                {/* Right code bracket */}
                <path
                  className="bg-slate-900 dark:bg-slate-200"
                  d="M32.3417 14.9391C32.0488 15.232 32.0488 15.7069 32.3417 15.9998L38.2811 21.9391L32.3417 27.8785C32.0488 28.1714 32.0488 28.6463 32.3417 28.9392C32.6346 29.2321 33.1095 29.2321 33.4024 28.9392L40.4024 21.9392C40.6953 21.6463 40.6953 21.1714 40.4024 20.8785L33.4024 13.8785C33.1095 13.5856 32.6346 13.5856 32.3417 13.8785V14.9391Z"
                  fill={isDarkMode ? "#fff" : "#000"}
                />
                {/* Chat bubble */}
                <path
                  className="bg-slate-900 dark:bg-slate-200"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 8C7.02944 8 3 12.0294 3 17C3 19.7789 4.1895 22.2872 6.11816 24.063L4.05713 26.1484C3.79342 26.4251 3.72288 26.8385 3.87197 27.204C4.02107 27.5695 4.36361 27.8095 4.75058 27.8095H14C19.5228 27.8095 24 23.3323 24 17.8095C24 12.2867 19.5228 8 14 8H12Z"
                  fill={isDarkMode ? "#fff" : "#000"}
                  transform="translate(13 8) scale(0.8)"
                />
              </svg>
            </h1>
          </a>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, idx) => {
            const itemId = item.toLowerCase();
            const isActive = activeSection === itemId;
            return (
              <a
                key={idx}
                href={`/${itemId}`}
                className={`relative px-2 py-1 font-medium text-base group transition-colors duration-300 ease-in-out ${
                  isActive
                    ? "text-blue-500"
                    : "text-gray-800 dark:text-gray-300"
                }`}
              >
                <span className="group-hover:text-blue-500 transition-colors duration-300">
                  {item}
                </span>
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-blue-500 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}
          {user && user._id &&
          <button
            onClick={handleLogout}
            className="group px-4 py-2 bg-slate-900  text-white font-semibold rounded-lg shadow-lg hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            aria-label="Toggle Theme"
          >
            Logout
          </button>
          }
          {/* Theme Toggle Button */}
          <button
            onClick={handleTheme}
            className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <svg
                className="w-6 h-6 text-yellow-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.95 7.07l-.71-.71M4.05 4.93l-.71-.71" />
                <circle cx="12" cy="12" r="5" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center p-2 rounded focus:outline-none transition-transform duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className={`w-7 h-7 stroke-black dark:stroke-white ${
              menuOpen ? "rotate-180" : ""
            }`}
            fill="none"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }mb-6`}
      >
        <div className="flex flex-col items-center gap-6 py-4 bg-inherit">
          {navItems.map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-lg font-medium text-gray-800 dark:text-neutral-200 transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          {user && user._id &&
          <button
            onClick={handleLogout}
            className="group px-4 py-2 bg-slate-900  text-white font-semibold rounded-lg shadow-lg hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            aria-label="Toggle Theme"
          >
            Logout
          </button>
          }
          <button
            onClick={handleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <svg
                className="w-6 h-6 text-yellow-400 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.95 7.07l-.71-.71M4.05 4.93l-.71-.71" />
                <circle cx="12" cy="12" r="5" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
