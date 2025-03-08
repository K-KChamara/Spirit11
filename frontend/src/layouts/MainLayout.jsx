import React from "react";
import { Outlet } from "react-router-dom";
import CricketNavigation from "@/components/cricket-navigation";

const MainLayout = () => {
  return (
    <div>
  
      <CricketNavigation children={<Outlet/>} />
      
    
      {/* This renders the current route's component */}
     
    </div>
  );
};

export default MainLayout;