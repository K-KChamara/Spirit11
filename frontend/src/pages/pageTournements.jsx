"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const TournamentSummaryPage = () => {
  const [players, setPlayers] = useState([])
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAllPlayers = async () => {
      const response = await axios.get("http://localhost:3000/api/player")
      setPlayers(response.data)
    }

    const getAllTournaments = async () => {
      const response = await axios.get("http://localhost:3000/api/tournament")
      setTournaments(response.data)
    }

    Promise.all([getAllPlayers(), getAllTournaments()])
      .then(() => setLoading(false))
      .catch((error) => console.error("Error fetching data:", error))
  }, [])

  // Sort players by wickets (descending) to get top wicket takers
  const topWicketTakers = [...players].sort((a, b) => b.wickets - a.wickets).slice(0, 5)

  // Sort players by totalRuns (descending) to get top run scorers
  const topRunScorers = [...players].sort((a, b) => b.totalRuns - a.totalRuns).slice(0, 5)

  // Calculate batting average for each player
  const calculateBattingAverage = (runs, innings) => {
    return innings > 0 ? (runs / innings).toFixed(2) : 0
  }

  // Calculate bowling average for each player
  const calculateBowlingAverage = (wickets, runsConceded) => {
    return wickets > 0 ? (runsConceded / wickets).toFixed(2) : 0
  }

  // Calculate strike rate
  const calculateStrikeRate = (runs, ballsFaced) => {
    return ballsFaced > 0 ? ((runs / ballsFaced) * 100).toFixed(2) : 0
  }

  // Calculate economy rate
  const calculateEconomyRate = (runsConceded, oversBowled) => {
    return oversBowled > 0 ? (runsConceded / oversBowled).toFixed(2) : 0
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-green-700 text-xl font-semibold">
          <svg
            className="animate-spin -ml-1 mr-3 h-8 w-8 text-green-600 inline"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading tournament data...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-green-800 sm:text-5xl">Cricket Tournament Dashboard</h1>
            <p className="mt-3 text-xl text-gray-500">
              Comprehensive overview of tournament statistics and match results
            </p>
          </div>
        </header>

        {/* Tournament Stats Summary */}
        <div className="mb-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Players</dt>
                <dd className="mt-1 text-3xl font-semibold text-green-700">{players.length}</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Matches</dt>
                <dd className="mt-1 text-3xl font-semibold text-green-700">{tournaments.length}</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Completed Matches</dt>
                <dd className="mt-1 text-3xl font-semibold text-green-700">
                  {tournaments.filter((match) => match.status === "Ended").length}
                </dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Runs</dt>
                <dd className="mt-1 text-3xl font-semibold text-green-700">
                  {players.reduce((total, player) => total + player.totalRuns, 0)}
                </dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Wickets</dt>
                <dd className="mt-1 text-3xl font-semibold text-green-700">
                  {players.reduce((total, player) => total + player.wickets, 0)}
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Top Run Scorers */}
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-green-800">Top Run Scorers</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Players with the highest run totals in the tournament
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Rank
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Player
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      University
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Runs
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Avg
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      S/R
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topRunScorers.map((player, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{player.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.university}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-700">
                        {player.totalRuns}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {calculateBattingAverage(player.totalRuns, player.inningsPlayed)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {calculateStrikeRate(player.totalRuns, player.ballsFaced)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Wicket Takers */}
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-green-800">Top Wicket Takers</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Players with the highest wicket counts in the tournament
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Rank
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Player
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      University
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Wickets
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Avg
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Econ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topWicketTakers.map((player, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{player.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.university}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-700">
                        {player.wickets}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {calculateBowlingAverage(player.wickets, player.runsConceded)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {calculateEconomyRate(player.runsConceded, player.oversBowled)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Match Results */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-green-800">Match Results</h2>
            <div className="flex space-x-2">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <span className="h-2 w-2 rounded-full bg-green-400 mr-1.5"></span>
                Ended
              </span>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <span className="h-2 w-2 rounded-full bg-blue-400 mr-1.5"></span>
                Upcoming
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((match, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden shadow-sm rounded-lg border-t-4 transition-all duration-200 hover:shadow-md"
                style={{ borderTopColor: match.status === "Ended" ? "#059669" : "#3b82f6" }}
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        match.status === "Ended" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {match.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(match.timestamp).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="text-center flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{match.teamOne}</h3>
                      <div className="text-3xl font-bold text-green-700">{match.teamOneMarks}</div>
                    </div>
                    <div className="mx-4">
                      <div className="text-gray-400 font-medium text-sm mb-1">VS</div>
                      <div className="h-px w-8 bg-gray-300 mx-auto"></div>
                    </div>
                    <div className="text-center flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{match.teamTwo}</h3>
                      <div className="text-3xl font-bold text-green-700">{match.teamTwoMarks}</div>
                    </div>
                  </div>

                  {match.status === "Ended" && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Winner</span>
                        <span className="text-sm font-medium text-green-700">
                          {match.winner === "teamOne"
                            ? match.teamOne
                            : match.winner === "teamTwo"
                              ? match.teamTwo
                              : match.winner === "draw"
                                ? "Draw"
                                : "Pending"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All-Rounders Section */}
        <div className="mb-10">
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-green-800">Top All-Rounders</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Players excelling in both batting and bowling</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Player
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      University
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Runs
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Wickets
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Batting Avg
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Bowling Avg
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {players
                    .filter((player) => player.category === "All-Rounder")
                    .sort((a, b) => b.totalRuns + b.wickets * 20 - (a.totalRuns + a.wickets * 20))
                    .slice(0, 5)
                    .map((player, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{player.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.university}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.totalRuns}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.wickets}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {calculateBattingAverage(player.totalRuns, player.inningsPlayed)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {calculateBowlingAverage(player.wickets, player.runsConceded)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} University Cricket Tournament. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default TournamentSummaryPage

