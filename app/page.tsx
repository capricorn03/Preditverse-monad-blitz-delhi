'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LoginModal } from '@/components/LoginModal';
import { CompanyLoginModal } from '@/components/CompanyLoginModal';
import { AnalyticsModal } from '@/components/AnalyticsModal';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { 
  Orbit, 
  Stars, 
  TrendingUp, 
  Users, 
  Brain, 
  Zap,
  Globe,
  Sparkles,
  Target,
  Award,
  Activity,
  ArrowRight,
  LogIn,
  Building2,
  LogOut,
  User,
  Building,
  BarChart
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [activeOrbit, setActiveOrbit] = useState(0);
  const [predictionScore, setPredictionScore] = useState(0);
  const [isUserLoginOpen, setIsUserLoginOpen] = useState(false);
  const [isCompanyLoginOpen, setIsCompanyLoginOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [stars, setStars] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([]);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    // Generate stars only on client side
    const generatedStars = Array.from({ length: 50 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 2}s`
    }));
    setStars(generatedStars);

    const interval = setInterval(() => {
      setActiveOrbit((prev) => (prev + 1) % 3);
    }, 3000);
    
    // Simulate AI prediction score calculation
    const scoreInterval = setInterval(() => {
      setPredictionScore((prev) => Math.min(prev + Math.random() * 10, 100));
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(scoreInterval);
    };
  }, []);

  const orbitPlanets = [
    { name: 'Mercury', color: 'bg-orange-400', size: 'w-3 h-3' },
    { name: 'Venus', color: 'bg-yellow-300', size: 'w-4 h-4' },
    { name: 'Earth', color: 'bg-blue-400', size: 'w-5 h-5' },
  ];

 const featuredMarkets = [
  {
    title: "Will Bitcoin's Price Reach $200,000 by the End of 2026?",
    category: "Cryptocurrency",
    participants: 2847,
    volume: "$1.2M",
    probability: 67,
    aiScore: 84,
    icon: "₿",
    description: "Bitcoin is a digital currency that's not controlled by any bank or government. Some people think its value could soar to $200,000 per Bitcoin by the end of 2026 because more businesses and investors are using it. Others believe it might stay lower due to market changes or regulations. Join this prediction to share your thoughts on whether Bitcoin's price will hit this milestone, test related products, and have a chance to win rewards!"
  },
  {
    title: "Will Artificial Intelligence Pass the Turing Test by 2026?",
    category: "Technology",
    participants: 1923,
    volume: "$850K",
    probability: 43,
    aiScore: 76,
    icon: "🤖",
    description: "The Turing Test checks if a computer can act so human-like that people can't tell it's a machine. For example, could an AI chat with you and seem like a real person? Some experts think AI will get smart enough to pass this test by 2026, while others believe it's still too hard. Predict whether this will happen, explore cutting-edge AI tools, and earn rewards for your insights!"
  },
  {
    title: "Will Humans Establish a Colony on Mars by 2030?",
    category: "Space",
    participants: 3412,
    volume: "$2.1M",
    probability: 23,
    aiScore: 91,
    icon: "🚀",
    description: "A Mars colony would mean people living on the Red Planet, maybe in special habitats or bases. Companies like SpaceX are working hard to make this dream real by 2030, but it's a huge challenge with risks like long space travel and harsh conditions. Do you think humans will set up a colony on Mars by then? Make your prediction, try out space-related tech, and win exciting rewards!"
  }
];

  const handleEventsClick = () => {
    router.push('/events');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
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

      {/* Header */}
      <header className="relative z-10 container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Orbit className="w-8 h-8 text-yellow-400 animate-spin" style={{ animationDuration: '10s' }} />
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-pulse" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              PredictVerse
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <Button 
              variant="ghost" 
              className="text-white hover:text-yellow-400 transition-colors"
              onClick={handleEventsClick}
            >
              Events
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-yellow-400 transition-colors"
              onClick={() => setIsAnalyticsOpen(true)}
            >
              <BarChart className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  {currentUser.type === 'user' ? (
                    <User className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <Building className="w-4 h-4 text-blue-400" />
                  )}
                  <span className="text-sm">
                    {currentUser.name}
                  </span>
                </div>
                <Button 
                  onClick={logout}
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-400 hover:to-orange-400 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsUserLoginOpen(true)}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400 transition-all duration-300"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  User Login
                </Button>
                <Button 
                  onClick={() => setIsCompanyLoginOpen(true)}
                  className="bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-300 hover:to-purple-400 transition-all duration-300"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Company Login
                </Button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Login Modals */}
      <LoginModal 
        isOpen={isUserLoginOpen} 
        onClose={() => setIsUserLoginOpen(false)} 
      />
      <CompanyLoginModal 
        isOpen={isCompanyLoginOpen} 
        onClose={() => setIsCompanyLoginOpen(false)} 
      />
      <AnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            {/* Central Sun */}
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg shadow-yellow-400/50" />
            
            {/* Orbital Rings */}
            {[1, 2, 3].map((ring, index) => (
              <div
                key={ring}
                className="absolute inset-0 border border-white/20 rounded-full animate-spin"
                style={{
                  width: `${80 + ring * 30}px`,
                  height: `${80 + ring * 30}px`,
                  left: `${-ring * 15}px`,
                  top: `${-ring * 15}px`,
                  animationDuration: `${20 + ring * 10}s`,
                  animationDirection: ring % 2 === 0 ? 'reverse' : 'normal'
                }}
              >
                <div
                  className={`absolute ${orbitPlanets[index]?.color} ${orbitPlanets[index]?.size} rounded-full shadow-lg ${
                    activeOrbit === index ? 'animate-bounce' : ''
                  }`}
                  style={{
                    top: '50%',
                    right: '0',
                    transform: 'translateY(-50%)'
                  }}
                />
              </div>
            ))}
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent leading-tight">
            The Future of<br />community engagement
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">Predictverse reimagines community engagement, combining Monad's high-performance blockchain with GenAI capabilities to create a self-sustaining community of forward-thinking individuals. Users can predict event outcomes posted by companies, test their products and technological innovations, and earn rewards.</p>
          
          <div className="flex items-center justify-center space-x-6 mb-12">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Predicting to get the rewards.
            </Button>
          </div>

         
        </div>
      </section>

      {/* Featured Markets */}
      <section className="relative z-10 container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Featured Prediction Markets
          </h2>
          <p className="text-gray-300 text-lg">
            Explore the most engaging predictions powered by collective intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredMarkets.map((market, index) => (
            <Card key={index} className="bg-black/40 border-blue-500/30 backdrop-blur-lg hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{market.icon}</span>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    {market.category}
                  </Badge>
                </div>
                <CardTitle className="text-white text-lg leading-tight">
                  {market.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Probability</span>
                  <span className="text-green-400 font-semibold">{market.probability}%</span>
                </div>
                <Progress value={market.probability} className="h-2" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Participants</div>
                    <div className="text-white font-semibold flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {market.participants.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Volume</div>
                    <div className="text-white font-semibold">{market.volume}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-600">
                  <div className="flex items-center text-sm">
                    <Brain className="w-4 h-4 mr-1 text-purple-400" />
                    <span className="text-gray-300">AI Score: </span>
                    <span className="text-purple-400 font-semibold ml-1">{market.aiScore}</span>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400">
                    Predict
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Why Choose PredictVerse?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Experience the next generation of community engagement with cutting-edge technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Zap className="w-8 h-8 text-yellow-400" />,
              title: 'Lightning Fast',
              description: 'Powered by Monad blockchain for instant transactions'
            },
            {
              icon: <Brain className="w-8 h-8 text-purple-400" />,
              title: 'AI Enhanced',
              description: 'Gemini AI provides intelligent prediction scoring'
            },
            {
              icon: <Users className="w-8 h-8 text-blue-400" />,
              title: 'Social First',
              description: 'Build communities around shared predictions'
            },
            {
              icon: <Award className="w-8 h-8 text-green-400" />,
              title: 'Rewarding',
              description: 'Earn tokens for meaningful participation'
            }
          ].map((feature, index) => (
            <Card key={index} className="bg-black/40 border-gray-600/30 backdrop-blur-lg text-center hover:border-gray-500/50 transition-all duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30 backdrop-blur-lg">
          <CardContent className="text-center py-16">
            <Globe className="w-16 h-16 text-blue-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Join the PredictVerse Community
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Connect with future-focused thinkers, make predictions that matter, 
              and earn rewards for your insights in our cosmic prediction ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400 px-8 py-3 rounded-full">
                <Stars className="w-5 h-5 mr-2" />
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-blue/30 text-white hover:bg-white/10 px-8 py-3 rounded-full">
                <TrendingUp className="w-5 h-5 mr-2" />
                Explore Events
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-6 py-12 border-t border-gray-800">
        <div className="text-center text-gray-400">
          <div className="flex items-center justify-center mb-4">
            <Orbit className="w-6 h-6 text-yellow-400 mr-2 animate-spin" style={{ animationDuration: '10s' }} />
            <span className="text-lg font-semibold text-white">PredictVerse</span>
          </div>
          <p className="text-sm">
            Reimagining community engagement based on predictions. Powered by Monad & Gemini AI.
          </p>
        </div>
      </footer>
    </div>
  );
}