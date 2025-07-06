import logo from "./asset/logo.png";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get("query");
    if (q) setQuery(q);
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  const handleSort = (sortType) => {
    const searchParams = new URLSearchParams();
    if (query.trim()) searchParams.set("query", query);
    searchParams.set("sort", sortType);
    navigate(`/search?${searchParams.toString()}`);
    setDropdownOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/95 fixed w-full z-20 top-0 border-b border-gray-200 shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 shrink-1">
          <img src={logo} className="h-10 w-auto" alt="Logo" />
        </Link>

        {/* Mobile - Search + Filter + Hamburger */}
        <div className="flex items-center gap-2 md:hidden flex-grow px-2">
          {/* Search + Filter */}
          <form onSubmit={handleSearch} className="flex flex-grow max-w-[70%]">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded-l-md focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700"
            >
              Go
            </button>
          </form>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="px-2 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
            >
              ▼
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                <button
                  onClick={() => handleSort("nutrition")}
                  className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  By Nutrition
                </button>
                <button
                  onClick={() => handleSort("ingredients")}
                  className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  By Ingredients
                </button>
                <button
                  onClick={() => handleSort("cuisine")}
                  className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  By Cuisine
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop - Search + Sort Dropdown */}
        <div className="hidden md:flex items-start gap-2 md:ml-4">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center px-3 py-[10px] text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              SORT ▼
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg">
                <button
                  onClick={() => handleSort("popularity")}
                  className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  By Popularity
                </button>
                <button
                  onClick={() => handleSort("healthiness")}
                  className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  By Healthiness
                </button>
                <button
                  onClick={() => handleSort("price")}
                  className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  By Price
                </button>
              </div>
            )}
          </div>

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

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
          <Link
            to="/"
            className={`px-4 py-2 rounded-md ${
              location.pathname === "/"
                ? "text-white bg-red-600"
                : "hover:text-red-600 hover:bg-gray-100"
            }`}
          >
            Home
          </Link>
          <Link
            to="/bestrecipe"
            className={`px-4 py-2 rounded-md ${
              location.pathname === "/bestrecipe"
                ? "text-white bg-red-600"
                : "hover:text-red-600 hover:bg-gray-100"
            }`}
          >
            Best Recipes
          </Link>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {isOpen && (
        <div className="md:hidden px-4 pb-3">
          <ul className="flex flex-col gap-2 text-sm font-medium text-gray-700">
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
      )}
    </nav>
  );
};

export default Navbar;
