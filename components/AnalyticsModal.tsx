"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Trophy, Award, Calendar, Users, Coins } from "lucide-react";

// Dummy data for leaderboard
const LEADERBOARD_DATA = [
  { rank: 1, name: "User 1", points: 2500, correctPredictions: 15 },
  { rank: 2, name: "User 2", points: 2100, correctPredictions: 12 },
  { rank: 3, name: "User 3", points: 1800, correctPredictions: 10 },
  { rank: 4, name: "User 4", points: 1500, correctPredictions: 8 },
  { rank: 5, name: "User 5", points: 1200, correctPredictions: 7 },
];

// Dummy stats
const STATS = {
  totalPrizeDistributed: "50,000",
  totalEventsCompleted: 25,
  activeUsers: 150,
  averagePrizePerEvent: "2,000"
};

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnalyticsModal({ isOpen, onClose }: AnalyticsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-[800px] max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Analytics Dashboard
          </CardTitle>
          <CardDescription className="text-center">
            Community Performance Metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-purple-500/20 to-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-400">Total Prize</span>
                </div>
                <p className="text-2xl font-bold">${STATS.totalPrizeDistributed}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-400">Events</span>
                </div>
                <p className="text-2xl font-bold">{STATS.totalEventsCompleted}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-400">Active Users</span>
                </div>
                <p className="text-2xl font-bold">{STATS.activeUsers}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-orange-400" />
                  <span className="text-sm text-gray-400">Avg Prize/Event</span>
                </div>
                <p className="text-2xl font-bold">${STATS.averagePrizePerEvent}</p>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Top Predictors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {LEADERBOARD_DATA.map((user) => (
                  <div
                    key={user.rank}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        user.rank === 1 ? 'bg-yellow-400/20 text-yellow-400' :
                        user.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                        'bg-orange-400/20 text-orange-400'
                      }`}>
                        {user.rank}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Points</p>
                        <p className="font-medium">{user.points}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Correct</p>
                        <p className="font-medium">{user.correctPredictions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 