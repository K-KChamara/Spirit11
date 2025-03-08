import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homePage";
import MainLayout from "./layouts/MainLayout";
import PlayersPage from "./pages/playersPage";
import PlayerStatsPage from "./pages/pagePlayerStats";
import TournamentSummaryPage from "./pages/pageTournements";
import LeaderboardPage from "./pages/pageLeaderBoard";
import TeamBuilder from "./pages/pageTeamBuilder";
import LiveStreamPage from "./pages/pageStream";
import PageSignIn from "./pages/pageSignIn";
import { ClerkProvider } from "@clerk/clerk-react";
import SignUpPage from "./pages/signUp";

function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/sign-in">
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/sign-in" element={<PageSignIn />} />

            <Route path="/sign-up" element={<SignUpPage />} />

            <Route path="/" element={<Home />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/player-stats" element={<PlayerStatsPage />} />
            <Route
              path="/tournament-summary"
              element={<TournamentSummaryPage />}
            />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/team-builder" element={<TeamBuilder />} />
            <Route path="/live-stream" element={<LiveStreamPage />} />
          </Route>
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;
