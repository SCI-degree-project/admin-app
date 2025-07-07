import { useState } from "react";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { logout } from "../../auth/services/authService";

function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="bg-white shadow-sm p-4 fixed w-full z-50">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center relative">
        <button
          onClick={onToggleSidebar}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <Bars3Icon className="w-6 h-6 text-gray-700" />
        </button>

        <div className="ml-auto relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2"
          >
            <img
              src="/placeholder-user.png"
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg py-2 z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export { Header };
