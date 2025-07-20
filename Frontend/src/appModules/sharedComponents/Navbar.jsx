import { Link } from "react-router-dom";
import { X, Menu } from "lucide-react";

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <nav className="fixed w-full flex justify-between items-center bg-white px-6 py-4 shadow-sm">
      <div>
        <Link to="/">
          <h1 className="text-lg font-bold font-serif">HRFusion</h1>
        </Link>
      </div>
      <div>
        <ul className="flex gap-5 sm:hidden">
          <li>
            <button
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
              }}
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
