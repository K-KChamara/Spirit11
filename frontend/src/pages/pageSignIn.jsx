import { SignIn } from "@clerk/clerk-react"
import { Trophy, Calendar, Users, Flag } from "lucide-react"
import { useEffect, useState } from "react"

export default function SignInPage() {
  const [stars, setStars] = useState([])
  const [activeTab, setActiveTab] = useState("players");
  

//   useEffect(() => {
//     // Generate stars once
//     const generateStars = () => {
//       const newStars = []
//       for (let i = 0; i < 50; i++) {
//         newStars.push({
//           id: i,
//           size: Math.random() * 3 + 1,
//           left: `${Math.random() * 100}%`,
//           top: `${Math.random() * 100}%`,
//           animationDuration: `${Math.random() * 3 + 2}s`,
//         })
//       }
//       setStars(newStars)
//     }

//     generateStars()
//   }, [])  // Empty dependency array ensures this effect runs only once

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Star background effect */}
      {/* <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white opacity-0 animate-pulse"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: star.left,
              top: star.top,
              animationDuration: star.animationDuration,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div> */}

      {/* Glow effects */}
      {/* <div
        className="absolute top-1/4 -left-20 w-60 h-60 bg-green-400 rounded-full filter blur-[100px] opacity-20 animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div
        className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-400 rounded-full filter blur-[100px] opacity-20 animate-pulse"
        style={{ animationDuration: "6s" }}
      /> */}

      <div className="max-w-5xl w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden relative z-10">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Hero Content */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-green-600 to-green-800 p-8 md:p-10 text-white">
            <div className="h-full flex flex-col justify-between">
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                  Manage Your Cricket Tournament Seamlessly
                </h1>
                <p className="text-green-100 text-lg">
                  Our platform allows you to efficiently manage teams, fixtures, scores, and player statistics in real
                  time.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg transition-all hover:bg-white/20 hover:shadow-lg hover:shadow-green-900/20">
                  <Trophy className="h-5 w-5 text-green-200" />
                  <span className="text-sm font-medium">Track Tournaments</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg transition-all hover:bg-white/20 hover:shadow-lg hover:shadow-green-900/20">
                  <Calendar className="h-5 w-5 text-green-200" />
                  <span className="text-sm font-medium">Manage Fixtures</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg transition-all hover:bg-white/20 hover:shadow-lg hover:shadow-green-900/20">
                  <Users className="h-5 w-5 text-green-200" />
                  <span className="text-sm font-medium">Team Management</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg transition-all hover:bg-white/20 hover:shadow-lg hover:shadow-green-900/20">
                  <Flag className="h-5 w-5 text-green-200" />
                  <span className="text-sm font-medium">Live Score Updates</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Sign In */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10">
            <SignIn
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none p-0 bg-transparent w-full",
                  headerTitle: "text-2xl font-bold text-gray-900",
                  headerSubtitle: "text-base text-gray-600 mt-2 mb-6",
                  socialButtonsBlockButton:
                    "w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg mb-2 relative transition-colors",
                  socialButtonsBlockButtonText: "font-medium text-gray-700",
                  dividerLine: "bg-gray-200",
                  dividerText: "text-gray-500 mx-4 bg-white px-3",
                  formFieldLabel: "text-sm font-medium text-gray-700 mb-1.5",
                  formFieldInput:
                    "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all",
                  formButtonPrimary:
                    "w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg mt-6 transition-colors shadow-sm",
                  footerActionText: "text-sm text-gray-600 mt-6",
                  footerActionLink: "text-green-600 hover:text-green-700 font-medium",
                  formFieldAction: "text-sm text-green-600 hover:text-green-700",
                  identityPreviewText: "text-gray-700",
                  identityPreviewEditButton: "text-green-600 hover:text-green-700",
                  formField: "mb-4",
                },
                layout: {
                  socialButtonsPlacement: "top",
                  socialButtonsVariant: "blockButton",
                  shimmer: true,
                },
                variables: {
                  borderRadius: "8px",
                  spacingUnit: "4px",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
