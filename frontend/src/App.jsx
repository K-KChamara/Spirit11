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

function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  return (
    
      <Router>
        <Routes>

          <Route element={<MainLayout />}>
          <Route path="/sign-in" element={<PageSignIn />} />

          {/* <Route path="/sign-up" element={<SignUp />} /> */}

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
    
  );
}

export default App;
