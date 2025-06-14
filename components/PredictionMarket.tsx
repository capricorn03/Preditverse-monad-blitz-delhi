'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  Target,
  Zap,
  Star
} from 'lucide-react';

interface MarketData {
  title: string;
  category: string;
  participants: number;
  volume: string;
  probability: number;
  aiScore: number;
  icon: string;
}

interface PredictionScore {
  score: number;
  confidence: number;
  factors: {
    marketActivity: number;
    volumeIndicator: number;
    historicalTrends: number;
    socialSentiment: number;
  };
  recommendation: string;
  aiInsights: string[];
}

export default function PredictionMarket({ market }: { market: MarketData }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictionScore, setPredictionScore] = useState<PredictionScore | null>(null);
  const [userPosition, setUserPosition] = useState<'yes' | 'no' | null>(null);

  const analyzePrediction = async () => {
    setIsAnalyzing(true);
    
    try {
      const response = await fetch('/api/prediction-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          marketData: market,
          userInput: { position: userPosition }
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setPredictionScore(result.data);
      }
    } catch (error) {
      console.error('Failed to analyze prediction:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePositionSelect = (position: 'yes' | 'no') => {
    setUserPosition(position);
    setPredictionScore(null);
  };

  return (
    <Card className="bg-black/40 border-blue-500/30 backdrop-blur-lg hover:border-blue-400/50 transition-all duration-300">
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
        <CardDescription className="text-gray-300">
          Community prediction powered by AI analysis
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Market Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-400">
              <Users className="w-4 h-4 mr-1" />
              Participants
            </div>
            <div className="text-white font-semibold">
              {market.participants.toLocaleString()}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-400">
              <DollarSign className="w-4 h-4 mr-1" />
              Volume
            </div>
            <div className="text-white font-semibold">{market.volume}</div>
          </div>
        </div>

        {/* Probability */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">Market Probability</span>
            <span className="text-green-400 font-semibold">{market.probability}%</span>
          </div>
          <Progress value={market.probability} className="h-3" />
        </div>

        {/* Position Selection */}
        <div className="space-y-3">
          <div className="text-sm text-gray-300 font-medium">Your Position</div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={userPosition === 'yes' ? 'default' : 'outline'}
              onClick={() => handlePositionSelect('yes')}
              className={`${
                userPosition === 'yes' 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'border-green-500/30 text-green-400 hover:bg-green-500/10'
              } transition-all`}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Yes
            </Button>
            <Button
              variant={userPosition === 'no' ? 'default' : 'outline'}
              onClick={() => handlePositionSelect('no')}
              className={`${
                userPosition === 'no' 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'border-red-500/30 text-red-400 hover:bg-red-500/10'
              } transition-all`}
            >
              <Activity className="w-4 h-4 mr-2" />
              No
            </Button>
          </div>
        </div>

        {/* AI Analysis */}
        {userPosition && (
          <div className="space-y-4">
            <Button
              onClick={analyzePrediction}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="w-4 h-4 mr-2 animate-pulse" />
                  Analyzing with Gemini AI...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Get AI Analysis
                </>
              )}
            </Button>

            {predictionScore && (
              <Card className="bg-purple-900/20 border-purple-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-base flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-purple-400" />
                    AI Prediction Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">AI Score</div>
                      <div className="text-2xl font-bold text-purple-400">
                        {predictionScore.score.toFixed(1)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Confidence</div>
                      <div className="text-2xl font-bold text-blue-400">
                        {(predictionScore.confidence * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-white">
                      Recommendation: 
                      <Badge 
                        variant="secondary" 
                        className={`ml-2 ${
                          predictionScore.recommendation === 'Strong Buy' ? 'bg-green-500/20 text-green-300' :
                          predictionScore.recommendation === 'Moderate Buy' ? 'bg-yellow-500/20 text-yellow-300' :
                          predictionScore.recommendation === 'Hold' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {predictionScore.recommendation}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-white">Analysis Factors</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Market Activity</span>
                        <span className="text-white">{predictionScore.factors.marketActivity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Volume</span>
                        <span className="text-white">{predictionScore.factors.volumeIndicator}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Trends</span>
                        <span className="text-white">{predictionScore.factors.historicalTrends}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sentiment</span>
                        <span className="text-white">{predictionScore.factors.socialSentiment}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-white">AI Insights</div>
                    <div className="space-y-1">
                      {predictionScore.aiInsights.slice(0, 2).map((insight, index) => (
                        <div key={index} className="flex items-start text-xs text-gray-300">
                          <Star className="w-3 h-3 mr-1 mt-0.5 text-yellow-400 flex-shrink-0" />
                          {insight}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Place Prediction
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}