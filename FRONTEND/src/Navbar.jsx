import logo from "./asset/logo.png";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Set query from ?query= on page load
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get("query");
    if (q) setQuery(q);
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav className="bg-white/95 fixed w-full z-20 top-0 border-b border-gray-200 shadow-md">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} className="h-10" alt="Logo" />
        </Link>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop - Search + Dropdown */}
        <div className="hidden md:flex items-center gap-2 md:ml-4">
             {/* Filter Dropdown */}
           <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center px-3 py-[10px] text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              SORT ▼
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg">
                <Link
                  to="/search/popularity"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  By Popularity
                </Link>
                <Link
                  to="/search/healthiness"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  By Healthiness
                </Link>
                <Link
                  to="/search/price"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  By Price
                </Link>
              </div>
            )}
          </div>
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search recipes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-64 px-4 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-red-600 rounded-r-md hover:bg-red-700"
            >
              Go
            </button>
          </form>

       
         
        </div>

        {/* Navigation Links (Right) */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:w-auto md:space-x-6 mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 text-sm font-medium text-gray-700 items-center">
            <li>
              <Link
                to="/"
                className={`block px-4 py-2 rounded-md ${
                  location.pathname === "/"
                    ? "text-white bg-red-600"
                    : "hover:text-red-600 hover:bg-gray-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/bestrecipe"
                className={`block px-4 py-2 rounded-md ${
                  location.pathname === "/bestrecipe"
                    ? "text-white bg-red-600"
                    : "hover:text-red-600 hover:bg-gray-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Best Recipes
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Search + Filter */}
      <div className="md:hidden px-4 pb-3 flex flex-col gap-2">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none"
            required
          />
          <button
            type="submit"
            className="px-3 py-2 text-sm text-white bg-red-600 rounded-r-md hover:bg-red-700"
          >
            Go
          </button>
        </form>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full text-left px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Filter ▼
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              <Link
                to="/search/nutrition"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                By Nutrition
              </Link>
              <Link
                to="/search/ingredients"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                By Ingredients
              </Link>
              <Link
                to="/search/cuisine"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                By Cuisine
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
