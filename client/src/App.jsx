import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/Mainlayout";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Allfiles from "./pages/Allfiles";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Add_User from "./pages/Add_User";
import Roles_Permissions from "./pages/Roles_Permissions";
import Userlist from "./pages/Userlist";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/allfiles" element={<Allfiles />} />
          <Route path="/add-user" element={<Add_User/>} />
          <Route path="/roles-permissions" element={<Roles_Permissions/>} />
          <Route path="/userlist" element={<Userlist/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
