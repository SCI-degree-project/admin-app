import { Bars3Icon } from "@heroicons/react/24/outline";

function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <header className="bg-white shadow-sm p-4 fixed w-full z-50 lg:hidden">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center relative">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          <Bars3Icon className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </header>
  );
}

export { Header };