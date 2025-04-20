import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800 order-2 md:order-1">
          DecorAR
        </div>

        <button
          className="md:hidden order-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <div>Close</div> : <div>Menu</div>}
        </button>

        <nav
          className={`${menuOpen ? "block" : "hidden"
            } absolute top-full left-0 w-full bg-white shadow-md md:shadow-none md:static md:block md:w-auto md:bg-transparent order-3`}
        >
          <ul className="flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-0">
            <li>
              <a href="/" className="text-gray-700 hover:text-black">
                Catalog
              </a>
            </li>
            <li>
              <a href="/metrics" className="text-gray-700 hover:text-black">
                Metrics
              </a>
            </li>
            <li>
              <a href="#profile" className="text-gray-700 hover:text-black">
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export { Header };
