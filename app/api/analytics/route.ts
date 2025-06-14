import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // Dummy analytics data
  const analytics = {
    totalEvents: 42,
    totalPredictions: 1234,
    topEvent: {
      title: "Will Bitcoin's Price Reach $200,000 by the End of 2026?",
      participants: 2847,
      volume: "$1.2M"
    },
    activeUsers: 312,
    trendingCategory: "Cryptocurrency"
  };
  return NextResponse.json({ success: true, analytics });
} 