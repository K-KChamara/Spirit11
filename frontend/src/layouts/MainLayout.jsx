import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/NavBar"; // Ensure the correct path

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="mt-16 px-10">
        <Outlet /> {/* This renders the current route's component */}
      </main>
    </div>
  );
};

export default MainLayout;
