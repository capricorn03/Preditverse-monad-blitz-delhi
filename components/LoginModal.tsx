"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { User, UserCircle, UserCog } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";

// Predefined user credentials
const USERS = [
  {
    id: "user1",
    name: "User 1",
    email: "user1@predictverse.com",
    password: "user123",
    icon: User
  },
  {
    id: "user2",
    name: "User 2",
    email: "user2@predictverse.com",
    password: "user123",
    icon: UserCircle
  },
  {
    id: "user3",
    name: "User 3",
    email: "user3@predictverse.com",
    password: "user123",
    icon: UserCog
  }
];

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = (user: typeof USERS[0]) => {
    login({
      id: user.id,
      name: user.name,
      type: 'user'
    });
    toast.success(`Logged in as ${user.name}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Choose User
          </CardTitle>
          <CardDescription className="text-center">
            Select a user to login and make predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {USERS.map((user) => {
              const Icon = user.icon;
              return (
                <Button
                  key={user.id}
                  variant={selectedUser === user.id ? "default" : "outline"}
                  className="flex flex-col items-center justify-center h-32 p-2"
                  onClick={() => {
                    setSelectedUser(user.id);
                    handleLogin(user);
                  }}
                >
                  <Icon className="h-12 w-12 mb-2" />
                  <span className="text-sm">{user.name}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 