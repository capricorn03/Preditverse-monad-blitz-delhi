'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PredictionMarket from '@/components/PredictionMarket';
import { 
  Orbit, 
  Filter, 
  Search, 
  TrendingUp,
  Users,
  DollarSign,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function MarketsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const markets = [
    {
      title: 'Bitcoin to reach $100K by 2025',
      category: 'Cryptocurrency',
      participants: 2847,
      volume: '$1.2M',
      probability: 67,
      aiScore: 84,
      icon: '₿'
    },
    {
      title: 'AI will pass the Turing Test in 2024',
      category: 'Technology',
      participants: 1923,
      volume: '$850K',
      probability: 43,
      aiScore: 76,
      icon: '🤖'
    },
    {
      title: 'Mars colony established by 2030',
      category: 'Space',
      participants: 3412,
      volume: '$2.1M',
      probability: 23,
      aiScore: 91,
      icon: '🚀'
    },
    {
      title: 'Renewable energy reaches 80% by 2030',
      category: 'Environment',
      participants: 1567,
      volume: '$650K',
      probability: 58,
      aiScore: 82,
      icon: '🌱'
    },
    {
      title: 'Next US President will be under 50',
      category: 'Politics',
      participants: 4123,
      volume: '$1.8M',
      probability: 34,
      aiScore: 73,
      icon: '🏛️'
    },
    {
      title: 'Quantum computer breaks RSA encryption',
      category: 'Technology',
      participants: 892,
      volume: '$420K',
      probability: 28,
      aiScore: 88,
      icon: '⚛️'
    }
  ];

  const categories = [
    'all',
    'Technology',
    'Cryptocurrency', 
    'Space',
    'Environment',
    'Politics'
  ];

  const filteredMarkets = selectedCategory === 'all' 
    ? markets 
    : markets.filter(market => market.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated Background Stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <Orbit className="w-8 h-8 text-yellow-400 animate-spin" style={{ animationDuration: '10s' }} />
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-pulse" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              PredictVerse
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:text-yellow-400 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Page Header */}
      <section className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent">
            Prediction Markets
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore active prediction markets powered by collective intelligence and AI analysis
          </p>
        </div>

        {/* Market Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-black/40 border-blue-500/30 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                ${markets.reduce((sum, market) => sum + parseFloat(market.volume.replace(/[^0-9.]/g, '')), 0).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-300">Total Volume</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {markets.reduce((sum, market) => sum + market.participants, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-300">Active Participants</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-green-500/30 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{markets.length}</div>
              <div className="text-sm text-gray-300">Live Markets</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Browse Markets</h2>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'border-white/30 text-white hover:bg-white/10'
                } transition-all duration-300 capitalize`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Markets Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredMarkets.map((market, index) => (
            <PredictionMarket key={index} market={market} />
          ))}
        </div>

        {filteredMarkets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              No markets found for the selected category.
            </div>
          </div>
        )}
      </section>
    </div>
  );
}