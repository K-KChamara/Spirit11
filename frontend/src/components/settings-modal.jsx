"use client";

import { useState } from "react";
import { Settings, Bell, Moon, User, Shield, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SettingsModal() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("account");

  // Account settings
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [transferAlerts, setTransferAlerts] = useState(true);

  // Appearance settings
  const [density, setDensity] = useState("default");
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Privacy settings
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSave = () => {
    // Here you would save the settings to your backend
    toast.success("Settings saved successfully", {
      description: "Your preferences have been updated",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" /> Settings
          </DialogTitle>
          <DialogDescription>
            Customize your Spirit11 experience. Changes are saved automatically.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="account" className="flex items-center gap-1">
              <User className="h-4 w-4" /> Account
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-1"
            >
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-1">
              <Moon className="h-4 w-4" /> Appearance
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-1">
              <Shield className="h-4 w-4" /> Privacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about your account activity
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications on your device
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              <Separator />
              <div className="space-y-3">
                <Label>Notification Types</Label>
                <div className="flex items-center justify-between">
                  <Label htmlFor="match-alerts" className="cursor-pointer">
                    Match Alerts
                  </Label>
                  <Switch
                    id="match-alerts"
                    checked={matchAlerts}
                    onCheckedChange={setMatchAlerts}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="transfer-alerts" className="cursor-pointer">
                    Transfer Alerts
                  </Label>
                  <Switch
                    id="transfer-alerts"
                    checked={transferAlerts}
                    onCheckedChange={setTransferAlerts}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Interface Density</Label>
                <RadioGroup
                  value={density}
                  onValueChange={setDensity}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="density-compact" />
                    <Label htmlFor="density-compact">Compact</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="density-default" />
                    <Label htmlFor="density-default">Default</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="comfortable"
                      id="density-comfortable"
                    />
                    <Label htmlFor="density-comfortable">Comfortable</Label>
                  </div>
                </RadioGroup>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">Animations</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable animations throughout the interface
                  </p>
                </div>
                <Switch
                  id="animations"
                  checked={animationsEnabled}
                  onCheckedChange={setAnimationsEnabled}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Profile Visibility</Label>
                <RadioGroup
                  value={profileVisibility}
                  onValueChange={setProfileVisibility}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="visibility-public" />
                    <Label htmlFor="visibility-public">Public</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="friends" id="visibility-friends" />
                    <Label htmlFor="visibility-friends">Friends Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="visibility-private" />
                    <Label htmlFor="visibility-private">Private</Label>
                  </div>
                </RadioGroup>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  id="two-factor"
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Data & Privacy</Label>
                <div className="rounded-md bg-muted p-3">
                  <p className="text-sm">
                    Your data is stored securely and never shared with third
                    parties without your consent.
                    <Button variant="link" className="h-auto p-0 ml-1">
                      View Privacy Policy
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
