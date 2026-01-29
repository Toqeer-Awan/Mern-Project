import React from "react";
import { Link, Outlet , useLocation} from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiUploadCloud2Line, RiUserSettingsLine, RiCloudLine } from "react-icons/ri";
import { MdDriveFileMoveOutline } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";




const MainLayout = () => {
  const [open, setOpen] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(true);
  const [adminOpen, setAdminOpen] = React.useState(false);

  const location = useLocation();

const pageTitles = {
  "/": "Dashboard",
  "/upload": "Upload Files",
  "/allfiles": "All Files",
  "/roles-permissions": "Roles & Permissions",
  "/add-user": "Add User",
  "/userlist": "Users List",
  "/login": "Login",
};

const currentTitle = pageTitles[location.pathname] || "Dashboard";


  return (
    <div className="bg-gray-200 h-full flex sm:h-screen md:h-screen lg:h-screen">
      {/* Sidebar */}
      <div
        className={`fixed w-64 h-screen bg-gray-800 shadow ${
          open ? "translate-x-0" : "-translate-x-64"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static`}
      >
        {/* Logo */}
        <div className="text-xl font-bold cursor-pointer text-white flex justify-between items-center p-4 border-b border-gray-600">
          <div className="flex items-center gap-2 justify-center">
            <Link to="/">
              <RiCloudLine className="text-orange-500 text-3xl" />
            </Link>
            <Link to="/">Cloud Storage</Link>
          </div>
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <IoClose />
          </button>
        </div>

        {/* Navigation */}
        {isAdmin ? (
          <div className="p-4 space-y-2">
            {/* Dashboard */}
            <div className="flex items-center gap-3 p-2 text-gray-300 hover:bg-orange-700 rounded cursor-pointer hover:text-white">
              <AiOutlineDashboard className="text-lg" />
              <Link to="/">Dashboard</Link>
            </div>

            {/* Upload */}
            <div className="flex items-center gap-3 p-2 text-gray-300 hover:bg-orange-700 rounded cursor-pointer hover:text-white">
              <RiUploadCloud2Line className="text-lg" />
              <Link to="/upload">Upload</Link>
            </div>

            {/* All Files */}
            <div className="flex items-center gap-3 p-2 text-gray-300 hover:bg-orange-700 rounded cursor-pointer hover:text-white">
              <MdDriveFileMoveOutline className="text-lg" />
              <Link to="/allfiles">All Files</Link>
            </div>

            {/* Administration Dropdown */}
            <div className="text-gray-300">
              <div
                onClick={() => setAdminOpen(!adminOpen)}
                className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-orange-700 hover:text-white"
              >
                <RiUserSettingsLine className="text-lg" />
                <span className="text-sm font-medium flex-1">
                  Administration
                </span>
                <span
                  className={`transition-transform duration-200 ${
                    adminOpen ? "rotate-180" : ""
                  }`}
                >
                  <IoMdArrowDropdown />
                </span>
              </div>

              {adminOpen && (
                <div className="ml-8 mt-1 flex flex-col gap-1">
                  <Link
                    to="/roles-permissions"
                    className="p-2 rounded text-sm hover:bg-orange-700 hover:text-white"
                  >
                    Roles & Permissions
                  </Link>
                  <Link
                    to="/add-user"
                    className="p-2 rounded text-sm hover:bg-orange-700 hover:text-white"
                  >
                    Add Users
                  </Link>
                  <Link
                    to="/userlist"
                    className="p-2 rounded text-sm hover:bg-orange-700 hover:text-white"
                  >
                    Users List
                  </Link>
                </div>
              )}
            </div>

            {/* Logout */}
            <div className="flex items-center gap-3 p-2 text-gray-300 hover:bg-orange-700 rounded cursor-pointer hover:text-white">
              <MdLogout className="text-lg" />
              <Link to="/login">Logout</Link>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-3 p-2 text-gray-300 hover:bg-orange-700 rounded cursor-pointer hover:text-white">
              <AiOutlineDashboard className="text-lg" />
              <Link to="/">Dashboard</Link>
            </div>

            <div className="flex items-center gap-3 p-2 text-gray-300 hover:bg-orange-700 rounded cursor-pointer hover:text-white">
              <RiUploadCloud2Line className="text-lg" />
              <Link to="/upload">Upload</Link>
            </div>

            <div className="flex items-center gap-3 p-2 text-gray-300 hover:bg-orange-700 rounded cursor-pointer hover:text-white">
              <MdLogout className="text-lg" />
              <Link to="/login">Logout</Link>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <button
            className="p-2 text-xl font-bold hover:bg-orange-700 cursor-pointer lg:hidden"
            onClick={() => setOpen(true)}
          >
            <FaBars />
          </button>

          <h1 className="text-2xl font-bold cursor-pointer">
            <Link to="/">{currentTitle}</Link>
          </h1>

          <button className="text-2xl font-bold flex items-center gap-1 cursor-pointer">
            <Link to="/login">Logout</Link>
            <MdLogout />
          </button>
        </header>

        <div className="flex-1 p-4 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
