"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Calendar, 
  Users, 
  Coins, 
  Brain, 
  Building2, 
  Clock, 
  TrendingUp, 
  ArrowLeft,
  Search,
  Filter,
  Sparkles,
  Star,
  Trophy,
  Target,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Updated events data structure with company info and status
const EVENTS = [
  {
    id: 1,
    title: "Will Bitcoin's Price Reach $200,000 by the End of 2026?",
    category: "Cryptocurrency",
    participants: 2847,
    volume: "$1.2M",
    probability: 67,
    aiScore: 84,
    icon: "₿",
    description: "Bitcoin is a digital currency that's not controlled by any bank or government. Some people think its value could soar to $200,000 per Bitcoin by the end of 2026 because more businesses and investors are using it.",
    endDate: "2026-12-31",
    company: {
      name: "CryptoAnalytics Inc",
      logo: "🏢",
      verified: true
    },
    status: "live",
    timeLeft: "2 years",
    trending: true
  },
  {
    id: 2,
    title: "Will Artificial Intelligence Pass the Turing Test by 2026?",
    category: "Technology",
    participants: 1923,
    volume: "$850K",
    probability: 43,
    aiScore: 76,
    icon: "🤖",
    description: "The Turing Test checks if a computer can act so human-like that people can't tell it's a machine. For example, could an AI chat with you and seem like a real person?",
    endDate: "2026-12-31",
    company: {
      name: "TechVision Labs",
      logo: "🔬",
      verified: true
    },
    status: "live",
    timeLeft: "2 years",
    trending: false
  },
  {
    id: 3,
    title: "Will Humans Establish a Colony on Mars by 2030?",
    category: "Space",
    participants: 3412,
    volume: "$2.1M",
    probability: 23,
    aiScore: 91,
    icon: "🚀",
    description: "A Mars colony would mean people living on the Red Planet, maybe in special habitats or bases. Companies like SpaceX are working hard to make this dream real by 2030.",
    endDate: "2030-12-31",
    company: {
      name: "SpaceFuture Corp",
      logo: "🌌",
      verified: true
    },
    status: "live",
    timeLeft: "6 years",
    trending: true
  }
];

export default function EventsPage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof EVENTS[0] | null>(null);
  const [prediction, setPrediction] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [stars, setStars] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([]);

  const categories = Array.from(new Set(EVENTS.map(event => event.category)));

  const filteredEvents = EVENTS.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    // Generate stars for background
    const generatedStars = Array.from({ length: 30 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 2}s`
    }));
    setStars(generatedStars);
  }, []);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle event creation
    setIsAddEventOpen(false);
  };

  const handleSubmitPrediction = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle prediction submission
    console.log("Submitting prediction:", prediction);
    setSelectedEvent(null);
    setShowCommentForm(false);
    setPrediction(""); // Clear the prediction input
  };

  const handleCommentPrediction = (event: typeof EVENTS[0]) => {
    console.log("Opening comment form for event:", event.title);
    setSelectedEvent(event);
    setShowCommentForm(true);
    setPrediction(""); // Clear any existing prediction
  };

  const handleMakePrediction = (event: typeof EVENTS[0]) => {
    console.log("Opening prediction form for event:", event.title);
    setSelectedEvent(event);
    setShowCommentForm(false);
    setPrediction(""); // Clear any existing prediction
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setShowCommentForm(false);
    setPrediction("");
  };

  // Debug logging
  useEffect(() => {
    console.log("Selected Event:", selectedEvent);
    console.log("Show Comment Form:", showCommentForm);
  }, [selectedEvent, showCommentForm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated Background Stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
              animationDuration: star.duration
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-8 py-16 relative">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-8">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:text-yellow-400 transition-colors group">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent">
                Live Events
              </h1>
              <p className="text-gray-300 mt-3 text-lg">Discover and participate in exciting prediction events</p>
            </div>
          </div>
          {currentUser?.type === 'company' && (
            <Button
              onClick={() => setIsAddEventOpen(true)}
              className="bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-300 hover:to-purple-400 transform hover:scale-105 transition-all duration-300 px-6 py-2"
            >
              <Plus className="w-5 h-5 mr-2" />
              Post New Event
            </Button>
          )}
        </div>

        {/* Search and Filter Section */}
        <div className="mb-16 space-y-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 bg-black/40 border-purple-500/30 focus:border-purple-500/50 transition-colors text-gray-200 placeholder-gray-400"
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer hover:bg-purple-500/20 px-5 py-2 text-gray-200"
                onClick={() => setSelectedCategory(null)}
              >
                <Filter className="w-4 h-4 mr-2" />
                All
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-purple-500/20 px-5 py-2 text-gray-200"
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-purple-500 to-blue-500/20 border-purple-500/30">
            <CardContent className="p-8">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-purple-500 rounded-full">
                  <Trophy className="w-7 h-7 text-purple-400" />
                </div>
                <div>
                  <p className="text-base text-gray-300">Total Events</p>
                  <p className="text-md font-bold text-white">{EVENTS.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-500 to-orange-500/20 border-yellow-500/30">
            <CardContent className="p-8">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-yellow-800 rounded-full">
                  <Users className="w-7 h-7 text-yellow-400" />
                </div>
                <div>
                  <p className="text-base text-gray-300">Total Participants</p>
                  <p className="text-md font-bold text-white">
                    {EVENTS.reduce((sum, event) => sum + event.participants, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-500/20 border-blue-500/30">
            <CardContent className="p-8">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-blue-800 rounded-full">
                  <Coins className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <p className="text-base text-gray-300">Total Volume</p>
                  <p className="text-md font-bold text-white">
                    ${EVENTS.reduce((sum, event) => sum + parseFloat(event.volume.replace('$', '').replace('M', '000000').replace('K', '000')), 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-emerald-500/20 border-green-500/30">
            <CardContent className="p-8">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-green-800 rounded-full">
                  <Target className="w-7 h-7 text-green-400" />
                </div>
                <div>
                  <p className="text-base text-gray-300">Active Predictions</p>
                  <p className="text-md font-bold text-white">
                    {EVENTS.filter(e => e.status === 'live').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Card 
              key={event.id} 
              className="bg-black/40 border-purple-500/30 backdrop-blur-lg hover:border-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20 group"
            >
              <CardHeader className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl group-hover:text-yellow-400 transition-colors text-white">
                      {event.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Building2 className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300">{event.company.name}</span>
                      {event.company.verified && (
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                          <Star className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  {event.trending && (
                    <Badge className="bg-orange-500/20 text-orange-400">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-gray-300 mt-2 line-clamp-2">
                  {event.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Category</span>
                    <Badge variant="outline" className="text-purple-400 border-purple-500/30">
                      {event.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Participants</span>
                    <span className="text-white flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {event.participants.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Volume</span>
                    <span className="text-white flex items-center">
                      <Coins className="w-4 h-4 mr-1" />
                      {event.volume}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Time Left</span>
                    <span className="text-white flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {event.timeLeft}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">AI Score</span>
                    <span className="text-purple-400 flex items-center">
                      <Brain className="w-4 h-4 mr-1" />
                      {event.aiScore}%
                    </span>
                  </div>
                  {currentUser?.type === 'user' && (
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMakePrediction(event);
                        }}
                        className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 py-6"
                      >
                        Make Prediction
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCommentPrediction(event);
                        }}
                        className="flex-1 bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-300 hover:to-purple-400 transform hover:scale-105 transition-all duration-300 py-6"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Comment
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Event Modal */}
        {isAddEventOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-[600px]">
              <CardHeader>
                <CardTitle>Post New Event</CardTitle>
                <CardDescription>Create a new prediction event</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Event Title</label>
                    <Input placeholder="Enter event title" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Input placeholder="Enter category" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea placeholder="Enter event description" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input type="date" required />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddEventOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Create Event</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Make Prediction Modal */}
        {selectedEvent && !showCommentForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-[600px]">
              <CardHeader>
                <CardTitle>Make Prediction</CardTitle>
                <CardDescription>{selectedEvent.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPrediction} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Prediction</label>
                    <Textarea
                      placeholder="Enter your prediction and reasoning"
                      value={prediction}
                      onChange={(e) => setPrediction(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Submit Prediction</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Comment Form Modal */}
        {selectedEvent && showCommentForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-[600px]">
              <CardHeader>
                <CardTitle>Add Comment</CardTitle>
                <CardDescription>{selectedEvent.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPrediction} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Comment</label>
                    <Textarea
                      placeholder="Enter your comment about this prediction"
                      value={prediction}
                      onChange={(e) => setPrediction(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Submit Comment</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
} 