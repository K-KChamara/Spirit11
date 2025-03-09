"use client"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react"
import { Home, Users, BarChart2, Trophy, Award, Menu, BadgeDollarSign, RadioIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"

const navigationItems = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Players", path: "/players", icon: Users },
  { name: "Player Stats", path: "/player-stats", icon: BarChart2, adminOnly: true },
  { name: "Tournament", path: "/tournament-summary", icon: Trophy },
  { name: "Live Stream", path: "/live-stream", icon: RadioIcon },
  { name: "Leaderboard", path: "/leaderboard", icon: Award },
  { name: "Build Team", path: "/team-builder", icon: BadgeDollarSign },
]

export default function CricketNavigation({ children }) {
  const { isSignedIn, user } = useUser()
  const location = useLocation()
  const navigate = useNavigate()

  const [isMobile, setIsMobile] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if the user is admin based on metadata
    if (user && user.publicMetadata?.role === "admin") {
      setIsAdmin(true)
    }
  }, [user])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const currentPath = location.pathname

  // Filter navigation items based on admin status
  const filteredNavigationItems = navigationItems.filter(item => !item.adminOnly || isAdmin)

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 z-50">
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="mx-auto px-2 sm:px-3 flex justify-between items-center h-14">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-emerald-600 hover:bg-emerald-50">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] p-0 border-r-emerald-200">
                <div className="p-4 font-bold text-xl border-b bg-emerald-600 text-white">Cricket Admin</div>
                <SignedIn>
                  <nav className="p-2 bg-white">
                    {filteredNavigationItems.map((item) => (
                      <Button
                        key={item.path}
                        variant={currentPath === item.path ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start mb-1",
                          currentPath === item.path
                            ? "bg-emerald-100 text-emerald-800"
                            : "hover:bg-emerald-50 hover:text-emerald-700"
                        )}
                        onClick={() => navigate(item.path)}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Button>
                    ))}
                  </nav>
                </SignedIn>
              </SheetContent>
            </Sheet>
            <div className="font-bold text-xl text-emerald-700">Cricket Admin</div>
          </div>
          <div className="flex flex-row gap-2">
            <ModeToggle/>
            <SignedIn>
              <UserButton afterSignOutUrl="/sign-in" />
            </SignedIn>
            <SignedOut>
              <Button onClick={() => navigate("/sign-up")} className="text-white bg-emerald-600 hover:bg-emerald-700">
                Sign Up
              </Button>
            </SignedOut>
            <SignedOut>
              <Button onClick={() => navigate("/sign-in")} className="text-white bg-emerald-600 hover:bg-emerald-700">
                Sign In
              </Button>
            </SignedOut>
          </div>
        </div>
      </header>

      <SignedIn>
        <div className="overflow-x-auto -mb-px">
          <Tabs defaultValue={currentPath} className="w-full" onValueChange={(value) => navigate(value)}>
            <TabsList className="h-10 w-full justify-start bg-transparent p-0">
              {filteredNavigationItems.map((item) => (
                <TabsTrigger
                  key={item.path}
                  value={item.path}
                  className={cn(
                    "rounded-none px-3 h-10 text-slate-600 hover:text-emerald-600",
                    currentPath === item.path ? "border-b-2 border-emerald-600 text-emerald-700" : ""
                  )}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </SignedIn>

      <main className="flex-1 overflow-auto bg-white">
        <div className="mx-auto px-2 sm:px-3 py-4">{children}</div>
      </main>
    </div>
  )
}
