"use client"
import { useState, useEffect } from "react"
import { Home, Users, BarChart2, Trophy, Award, Menu, BadgeDollarSign ,RadioIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Navigation structure
const navigationItems = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Players", path: "/players", icon: Users },
  { name: "Player Stats", path: "/player-stats", icon: BarChart2 },
  { name: "Tournament", path: "/tournament-summary", icon: Trophy },
  // { name: "Teams", path: "/teamt", icon: Shield },
  { name: "Live Stream", path: "/live-stream", icon: RadioIcon },

  { name: "Leaderboard", path: "/leaderboard", icon: Award },
  { name: "Build Team", path: "/team-builder", icon: BadgeDollarSign },
  // { name: "Spiriter AI", path: "/spiriter-ai", icon: MessageSquare },
]

export default function CricketNavigation({ children }) {
  const [currentPath, setCurrentPath] = useState("/")
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    // Set initial path
    setCurrentPath(window.location.pathname)

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Find current navigation item
  const currentItem = navigationItems.find((item) => item.path === currentPath) || navigationItems[0]

  // Get breadcrumb segments
  const pathSegments = currentPath.split("/").filter(Boolean)

  // Function to navigate
  const navigate = (path) => {
    window.location.href = path
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="mx-auto px-2 sm:px-3">
          {/* Top bar with logo and mobile menu */}
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-emerald-600 hover:bg-emerald-50">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[250px] p-0 border-r-emerald-200">
                  <div className="p-4 font-bold text-xl border-b bg-emerald-600 text-white">Cricket Admin</div>
                  <nav className="p-2 bg-white">
                    {navigationItems.map((item) => (
                      <Button
                        key={item.path}
                        variant={currentPath === item.path ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start mb-1",
                          currentPath === item.path
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "hover:bg-emerald-50 hover:text-emerald-700",
                        )}
                        onClick={() => navigate(item.path)}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>

              <div className="font-bold text-xl text-emerald-700">Cricket Admin</div>
            </div>
          </div>

          {/* Main navigation tabs */}
          <div className="overflow-x-auto -mb-px">
            <Tabs defaultValue={currentPath} className="w-full" onValueChange={(value) => navigate(value)}>
              <TabsList className="h-10 w-full justify-start bg-transparent p-0">
                {navigationItems.map((item) => (
                  <TabsTrigger
                    key={item.path}
                    value={item.path}
                    className={cn(
                      "data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-emerald-600 data-[state=active]:border-b-2 data-[state=active]:text-emerald-700",
                      "rounded-none px-3 h-10 text-slate-600 hover:text-emerald-600",
                      "transition-all duration-100",
                    )}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      {/* Breadcrumb subheader */}
      <div className="bg-emerald-50 border-b border-emerald-100">
        <div className="mx-auto px-2 sm:px-3">
          <Breadcrumb className="py-2 text-sm">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-emerald-600 hover:text-emerald-800">
                  <Home className="h-3.5 w-3.5 mr-1" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>

              {pathSegments.length > 0 && (
                <>
                  <BreadcrumbSeparator className="text-emerald-300" />
                  {pathSegments.length > 1 ? (
                    <>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          href={`/${pathSegments[0]}`}
                          className="text-emerald-600 hover:text-emerald-800"
                        >
                          {pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1).replace(/-/g, " ")}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="text-emerald-300" />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-slate-600 font-medium">
                          {pathSegments[1].charAt(0).toUpperCase() + pathSegments[1].slice(1).replace(/-/g, " ")}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  ) : (
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-slate-600 font-medium">
                        {pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1).replace(/-/g, " ")}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <main className="flex-1 overflow-auto bg-white">
        <div className="mx-auto px-2 sm:px-3 py-4">{children}</div>
      </main>
    </div>
  )
}

