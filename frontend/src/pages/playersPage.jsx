import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Edit, Trash2, Filter, Download } from "lucide-react";
import { AddPlayerForm } from "@/components/add-player-form";
import { EditplayerForm } from "@/components/edit-player-form";

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [universityFilter, setUniversityFilter] = useState("all");
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [editPlayerId, setEditPlayerId] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/sign-in");
      return;
    }
    setAdmin(user?.publicMetadata?.role === "admin");
  }, [isSignedIn, user, navigate]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/player");
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    fetchPlayers();
  }, [trigger]);

  const handleDeletePlayer = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/player/${id}`);
      setTrigger((prev) => !prev);
      alert("Player deleted successfully");
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === "all" || player.category === categoryFilter) &&
    (universityFilter === "all" || player.university === universityFilter)
  );

  const categories = [...new Set(players.map((player) => player.category))];
  const universities = [...new Set(players.map((player) => player.university))];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Players Management</h1>
          <p className="text-muted-foreground">Manage player information efficiently.</p>
        </div>
        {admin && (
          <Dialog open={isAddPlayerOpen} onOpenChange={setIsAddPlayerOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Player
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Player</DialogTitle>
                <DialogDescription>Enter player details.</DialogDescription>
              </DialogHeader>
              <AddPlayerForm setTrigger={setTrigger} onSuccess={() => setIsAddPlayerOpen(false)} />
            </DialogContent>
          </Dialog>
        )}
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search players..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={universityFilter} onValueChange={setUniversityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="University" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Universities</SelectItem>
              {universities.map((university) => (
                <SelectItem key={university} value={university}>{university}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>University</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Value</TableHead>
              {admin && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player) => (
                <TableRow key={player._id}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.university}</TableCell>
                  <TableCell>{player.category}</TableCell>
                  <TableCell className="text-right">{player.points}</TableCell>
                  <TableCell className="text-right">{player.value}</TableCell>
                  {admin && (
                    <TableCell className="text-right">
                      <Button onClick={() => handleDeletePlayer(player._id)} variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={admin ? 6 : 5} className="text-center py-6">
                  No players found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}