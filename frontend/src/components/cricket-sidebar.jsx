"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  PanelLeft,
  Home,
  Users,
  BarChart2,
  Trophy,
  Shield,
  Award,
  MessageSquare,
  Menu,
  X,

  BadgeDollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Create a context to manage sidebar state
const SidebarContext = createContext({
  isOpen: true,
  toggle: () => {},
  isMobile: false,
});

export const useSidebar = () => useContext(SidebarContext);

export function CricketSidebar({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, isMobile }}>
      <div className="flex h-screen overflow-hidden">
        <div
          className={cn(
            "bg-background border-r border-border h-screen transition-all duration-300 ease-in-out hidden md:block",
            isOpen ? "w-64" : "w-16"
          )}
        >
          <div className="h-full flex flex-col">
            <div
              className={cn(
                "p-4 font-bold text-xl border-b flex items-center",
                !isOpen && "justify-center"
              )}
            >
              {isOpen ? "Cricket Admin" : "CA"}
            </div>
            <nav className="flex-1 py-4">
              <SidebarNavItem icon={<Home />} to="/" >
                Dashboard
              </SidebarNavItem>
              <SidebarNavItem icon={<Users />} to="/players">
                Players
              </SidebarNavItem>
              <SidebarNavItem icon={<BarChart2 />} to="/player-stats">
                Player Stats
              </SidebarNavItem>
              <SidebarNavItem icon={<Trophy />} to="/tournament-summary">
                Tournament Summary
              </SidebarNavItem>
              {/* <SidebarNavItem icon={<Shield />} to="/team-management">
                Team Management
              </SidebarNavItem> */}
              <SidebarNavItem icon={<Award />} to="/leaderboard">
                Leaderboard
              </SidebarNavItem>
              <SidebarNavItem icon={<BadgeDollarSign/>}  to="/team-builder">
                BuilTeam
              </SidebarNavItem>
              {/* <SidebarNavItem icon={<MessageSquare />} to="/spiriter-ai">
                Spiriter AI
              </SidebarNavItem> */}
            </nav>
          </div>
        </div>

        {/* Mobile Sidebar (Sheet) */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 absolute left-4 top-3 z-50"
              aria-label="Open Menu"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[250px]">
            <div className="h-full flex flex-col">
              <div className="p-4 font-bold text-xl border-b flex items-center justify-between">
                Cricket Admin
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close Menu</span>
                  </Button>
                </SheetTrigger>
              </div>
              <nav className="flex-1 py-4">
                <MobileSidebarNavItem icon={<Home />} to="/">
                  Dashboard
                </MobileSidebarNavItem>
                <MobileSidebarNavItem icon={<Users />} to="/players">
                  Players
                </MobileSidebarNavItem>
                <MobileSidebarNavItem icon={<BarChart2 />} to="/player-stats">
                  Player Stats
                </MobileSidebarNavItem>
                <MobileSidebarNavItem icon={<Trophy />} to="/tournament-summary">
                  Tournament Summary
                </MobileSidebarNavItem>
                <MobileSidebarNavItem icon={<Shield />} to="/team-management">
                  Team Management
                </MobileSidebarNavItem>
                <MobileSidebarNavItem icon={<Award />} to="/leaderboard">
                  Leaderboard
                </MobileSidebarNavItem>
                <MobileSidebarNavItem icon={<MessageSquare />} to="/spiriter-ai">
                  Spiriter AI
                </MobileSidebarNavItem>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-background">
          <div className="flex items-center p-4 border-b">
            {/* Desktop Sidebar Trigger */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              className="h-8 w-8 hidden md:flex"
              aria-label="Toggle Sidebar"
            >
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>

            {/* Page title with spacing for mobile trigger */}
            <h1 className="ml-4 md:ml-4 text-xl font-semibold">Dashboard</h1>
          </div>

          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarContext.Provider>
  );
}

function SidebarNavItem({ icon, children, to }) {
  const { isOpen } = useSidebar();
  const currentPath = window.location.pathname;

  const isActive = currentPath === to; // Check if current path matches the 'to' prop

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md mx-2 transition-colors",
        isActive && "bg-accent text-accent-foreground font-medium"
      )}
    >
      <span className={cn("mr-3", !isOpen && "mr-0")}>{icon}</span>
      {isOpen && <span>{children}</span>}
    </Link>
  );
}

function MobileSidebarNavItem({ icon, children, to }) {
  return (
    <Link
      to={to}
      className="flex items-center px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md mx-2 transition-colors"
    >
      <span className="mr-3">{icon}</span>
      <span>{children}</span>
    </Link>
  );
}
