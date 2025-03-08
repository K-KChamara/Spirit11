import { useState } from "react";
import { Check, ChevronsUpDown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const leagues = [
  { value: "global", label: "Global League" },
  { value: "friends", label: "Friends League" },
  { value: "university", label: "University League" },
  { value: "work", label: "Work Colleagues" },
];

export function CreateTeamModal() {
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState("");

  const handleCreateTeam = () => {
    // Here you would handle the team creation logic
    console.log("Creating team:", { teamName, league: selectedLeague });
    setOpen(false);
    // Reset form
    setTeamName("");
    setSelectedLeague("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          Create Team
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
          <DialogDescription>
            Set up your fantasy cricket team. Choose a name and league to get
            started.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="team-name" className="text-right">
              Team Name
            </Label>
            <Input
              id="team-name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Cricket Titans"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="league" className="text-right">
              League
            </Label>
            <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCombobox}
                  className="col-span-3 justify-between"
                >
                  {selectedLeague
                    ? leagues.find((league) => league.value === selectedLeague)
                        ?.label
                    : "Select league..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search league..." />
                  <CommandList>
                    <CommandEmpty>No league found.</CommandEmpty>
                    <CommandGroup>
                      {leagues.map((league) => (
                        <CommandItem
                          key={league.value}
                          value={league.value}
                          onSelect={(currentValue) => {
                            setSelectedLeague(
                              currentValue === selectedLeague
                                ? ""
                                : currentValue
                            );
                            setOpenCombobox(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedLeague === league.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {league.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleCreateTeam}
            disabled={!teamName.trim()}
          >
            <Users className="mr-2 h-4 w-4" />
            Create Team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
