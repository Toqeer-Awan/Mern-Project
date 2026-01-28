import React from "react";
import { Link, Outlet } from "react-router-dom"; // Add this import
import { FaBars } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { IoClose } from "react-icons/io5";
// Icons for navigation items
import { AiOutlineDashboard } from "react-icons/ai";
import { RiUploadCloud2Line } from "react-icons/ri";
import { MdDriveFileMoveOutline } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { RiCloudLine } from 'react-icons/ri';

const MainLayout = () => {
  const [open, setOpen] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(true);
  return (
    <div className="bg-gray-200 h-full flex sm:h-screen md:h-screen lg:h-screen">
      {/* Sidebar */}
      <div
        className={`fixed w-64 h-screen bg-gray-800 shadow ${open ? "translate-x-0" : "-translate-x-64"} lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static`}
      >
        <div className="text-xl font-bold cursor-pointer text-white flex justify-between items-center p-4 border-b border-gray-600">
          <div className="flex items-center gap-2 justify-center"><Link to="/"><RiCloudLine className="text-orange-500 text-3xl"/></Link><Link to="/">Cloud Storage</Link> </div>
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <IoClose />
          </button>
        </div>
        {/* Navigation Items */}
        {isAdmin ? (
          <div className="p-4 space-y-2 ">
          <div className ="flex items-center gap-3 p-2 text-gray-300 hover:bg-orange-700 rounded cursor-pointer hover:text-white">
              <div className="text-lg"><Link to="/"> <AiOutlineDashboard /> </Link></div>
              <div className="text-lg"><Link to="/">Dashboard</Link></div>
          </div>
          <div className ="flex items-center gap-3 p-2 text-gray-300 hover:bg-orange-700 rounded cursor-pointer hover:text-white">
              <div className="text-lg"><Link to="/upload"> <RiUploadCloud2Line /> </Link></div>
              <div className="text-lg"><Link to="/upload">Upload</Link></div>
          </div>
          <div className ="flex items-center gap-3 p-2 text-gray-300 hover:bg-orange-700 rounded cursor-pointer hover:text-white">
              <div className="text-lg"><Link to="/allfiles"> <MdDriveFileMoveOutline /> </Link></div>
              <div className="text-lg"><Link to="/allfiles">All Files</Link></div>
          </div>
          <div className ="flex items-center gap-3 p-2 text-gray-300 hover:bg-orange-700 rounded cursor-pointer hover:text-white">
              <div className="text-lg"><Link to="/manageusers"> <RiUserSettingsLine /> </Link></div>
              <div className="text-lg"><Link to="/manageusers">Manage Users</Link></div>
          </div>
          <div className ="flex items-center gap-3 p-2 text-gray-300 hover:bg-orange-700 rounded cursor-pointer hover:text-white">
              <div className="text-lg"> <Link to="/login"> <MdLogout /> </Link></div>
              <div className="text-lg"><Link to="/login">Logout</Link></div>
          </div>
        </div>
        ) : (<div className="p-4 space-y-2 ">
          <div className ="flex items-center gap-3 p-2 text-gray-300 hover:bg-orange-700 rounded cursor-pointer hover:text-white">
              <div className="text-lg"><Link to="/"> <AiOutlineDashboard /> </Link></div>
              <div className="text-lg"><Link to="/">Dashboard</Link></div>
          </div>
          <div className ="flex items-center gap-3 p-2 text-gray-300 hover:bg-orange-700 rounded cursor-pointer hover:text-white">
              <div className="text-lg"><Link to="/upload"> <RiUploadCloud2Line /> </Link></div>
              <div className="text-lg"><Link to="/upload">Upload</Link></div>
          </div>
          <div className ="flex items-center gap-3 p-2 text-gray-300 hover:bg-orange-700 rounded cursor-pointer hover:text-white">
              <div className="text-lg"><Link to="/login"> <MdLogout /> </Link></div>
              <div className="text-lg"><Link to="/login">Logout</Link></div>
          </div>
        </div>)}
      </div>

      {/* Top Bar and Main Content Area */}
      <main className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <button
            className="p-2 text-xl font-bold hover:bg-orange-700 cursor-pointer lg:hidden "
            onClick={() => setOpen(true)}
          >
            <FaBars />
          </button>
          <h1 className="text-2xl font-bold cursor-pointer"> <Link to="/">Dashboard</Link> </h1>
          <button className="text-2xl font-bold flex items-center gap-1 cursor-pointer">
           <Link to="/login"> Logout</Link>
            <MdLogout />
          </button>
        </header>
        
        {/* Add this Outlet - This is where Dashboard/Cards will render */}
        <div className="flex-1 p-4 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;