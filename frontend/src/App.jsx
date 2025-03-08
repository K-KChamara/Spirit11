import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homePage";
import MainLayout from "./layouts/MainLayout";
import PlayersPage from "./pages/playersPage";
import PlayerStatsPage from "./pages/pagePlayerStats";
import TournamentSummaryPage from "./pages/pageTournements";
import LeaderboardPage from "./pages/pageLeaderBoard";
import TeamBuilder from "./pages/pageTeamBuilder";

function App() {
  return (
    <Router>
      
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<PlayersPage/>} />
          <Route path="/player-stats" element={<PlayerStatsPage/>} />
          <Route path="/tournament-summary" element={<TournamentSummaryPage/>} />
          <Route path="/leaderboard" element={<LeaderboardPage/>} />
          <Route path="/team-builder" element={<TeamBuilder/>} />

          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
