import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/Mainlayout";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Allfiles from "./pages/Allfiles";
import Login from "./pages/Login";
import Manageusers from "./pages/Manageusers";
import Signup from "./pages/Signup";

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
          <Route path="/manageusers" element={<Manageusers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
