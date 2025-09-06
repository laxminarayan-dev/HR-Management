import Navbar from "./appModules/sharedComponents/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./appModules/sharedComponents/Sidebar";
import { useState } from "react";
const Root = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 h-screen ml-0 md:ml-56 mt-15 px-10 py-8 bg-neutral-100">
        <Outlet />
      </div>
    </div>
  );
};
export default Root;
