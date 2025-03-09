"use client";

import { Button } from "@/components/ui/button";

import { Suspense, useState } from "react";
import { Loader2 } from "lucide-react";
import { Toaster } from "sonner";
import DashboardTabs from "@/components/dashboard-tabs";
import FeatureShowcase from "@/components/feature-showcase";
import { ThemeToggle } from "@/components/theme-toggle";
import { SiteFooter } from "../components/site-footer.jsx";
import { HeroShowcase } from "../components/hero-showcase.jsx";

import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

import { useNavigate } from "react-router-dom";
import Chatbot from "@/components/chatbot.jsx";

export default function Home() {
  const [activeTab, setActiveTab] = useState("players");
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();

  if (!isSignedIn) {
    navigate("/sign-in");
    return;
  }

  // If user data is still loading, we can show a loading state

  // Shared state for active tab
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return isSignedIn ? (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/logo-img.png?height=32&width=32"
              alt="Spirit11 Logo"
              className="h-8"
            />
            <h1 className="text-xl font-bold text-primary">Spirit11</h1>
          </div>
          
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="w-full max-w-screen-xl mx-auto py-8 md:py-12 px-4 relative">
        <div className="relative">
          <div className="overflow-hidden rounded-xl border bg-gradient-to-r from-green-500/20 via-blue-500/20 to-yellow-500/20 p-6 md:p-10">
            <div className="grid gap-6 md:grid-cols-2 relative">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Build Your Dream Cricket Team
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  Select players, stay within budget, and compete with friends.
                  Our AI assistant helps you make the best choices.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button size="lg" onClick={() => navigate("/team-builder")}>
                    Get Started
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/leaderboard")}
                  >
                    View Leaderboard
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Cricket Player Image - Positioned Outside the Bordered Container */}
          <div className="absolute right-[-50px] top-[-30px] md:right-[-80px] md:top-[-50px] lg:right-[40px] lg:top-[-70px] z-10">
            <img
              src="/src/assets/cricket-player.png?height=500&width=500"
              alt="Cricket Player Illustration"
              className="h-80 w-80 md:h-[350px] md:w-[350px]"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 pb-16">
        <Suspense
          fallback={
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
        >
          {/* <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} /> */}
          {/* <Chatbot /> */}
          <FeatureShowcase />
          <HeroShowcase />
        </Suspense>

        <SiteFooter className="m-0 w-fit" />
      </main>

      {/* Sonner Toaster */}
      <Toaster position="top-right" richColors closeButton />
      <Chatbot />
    </div>
  ) : null;
}
