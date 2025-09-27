import { NextRequest, NextResponse } from 'next/server';

// Rate limiting (in-memory for demo - use Redis in production)
const rateLimiter = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;

  const current = rateLimiter.get(ip);
  if (!current || now > current.resetTime) {
    rateLimiter.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count < maxRequests) {
    current.count++;
    return true;
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // For demo purposes, return mock data
    // In production, you would:
    // 1. Get ORCHIDS_API_KEY from environment
    // 2. Make actual API call to Orchids
    // 3. Parse and validate response
    
    const mockResponses = [
      {
        id: `narrative-${Date.now()}`,
        title: "Galactic Shiba Revolution",
        summary: "Space-themed Shiba Inu meme combining cosmic aesthetics with dog coin nostalgia.",
        score: Math.floor(Math.random() * 15) + 85,
        rationale: `
          Galactic Shiba has emerged as a powerful narrative fusion, combining the proven success of dog-themed memes with the aspirational space exploration theme. Social sentiment analysis reveals 89% positive engagement across 23,000+ mentions in the last 48 hours.
          
          The cosmic aesthetic appeals to both crypto veterans nostalgic for DOGE's early days and newer participants drawn to space-themed narratives. Key opinion leaders in the meme coin space are actively promoting derivatives, with @SpaceMemeKing's collaboration receiving 3.2M impressions and 45,000 retweets.
          
          Risk assessment indicates moderate competition from other space-themed memes, but the Shiba Inu foundation provides strong memetic stability. The combination of proven dog coin psychology with fresh cosmic branding creates compelling viral potential. Recommended immediate tokenization with 72-hour launch window for maximum momentum capture.
        `.trim(),
        references: [
          {
            handle: "@SpaceMemeKing",
            url: "https://x.com/spacememeking/status/123",
            snippet: "Galactic Shiba is taking us beyond the moon 🚀🐕 This is the evolution we needed #GalacticShiba"
          },
          {
            handle: "@CryptoWhaleTracker",
            url: "https://x.com/whaletracker/status/124",
            snippet: "Major wallets accumulating Galactic Shiba NFTs. Smart money is positioning early 📊"
          },
          {
            handle: "@MemeAnalytics",
            url: "https://x.com/memeanalytics/status/125",
            snippet: "Galactic Shiba trending velocity: +340% in 24h. This has all the signals of a breakout narrative 📈"
          }
        ],
        action: "create_token",
        suggested_token_symbol: "GALSHIB",
        example_token_name: "GalacticShiba",
        trending_score: 92,
        timestamp: new Date().toISOString()
      },
      {
        id: `narrative-${Date.now() + 1}`,
        title: "Neon Genesis Pepe",
        summary: "Cyberpunk-inspired Pepe variant gaining traction in tech and anime communities.",
        score: Math.floor(Math.random() * 12) + 88,
        rationale: `
          Neon Genesis Pepe represents a sophisticated evolution of the classic Pepe meme, incorporating cyberpunk aesthetics that resonate strongly with tech-savvy crypto audiences. The anime reference creates cross-cultural appeal, particularly in Asian markets where both anime and crypto adoption are high.
          
          Engagement metrics show 67,000+ interactions across platforms with 91% positive sentiment. The visual style is highly distinctive and memeable, with community-generated derivatives appearing at 4x normal rates. Celebrity endorsements from anime voice actors and tech influencers are driving mainstream crossover potential.
          
          Competitive landscape analysis reveals limited direct competition in the cyberpunk-anime-meme intersection. The Pepe foundation provides proven memetic durability, while the neon aesthetic offers fresh visual appeal. High confidence in sustained engagement due to strong community building around the aesthetic. Immediate tokenization recommended with focus on anime and tech community partnerships.
        `.trim(),
        references: [
          {
            handle: "@CyberpunkMemes",
            url: "https://x.com/cyberpunkmemes/status/126",
            snippet: "Neon Genesis Pepe is the crossover we didn't know we needed 🤖✨ #NeonPepe #Cyberpunk"
          },
          {
            handle: "@AnimeInfluencer",
            url: "https://x.com/animeinfluencer/status/127",
            snippet: "This Neon Genesis Pepe art is incredible. The attention to detail is amazing 🎨"
          },
          {
            handle: "@TechMemeLord",
            url: "https://x.com/techmemelord/status/128",
            snippet: "Neon Genesis Pepe perfectly captures the cyberpunk crypto aesthetic. Bullish on this narrative 🚀"
          }
        ],
        action: "create_token",
        suggested_token_symbol: "NEONPEPE",
        example_token_name: "NeonGenesisPepe",
        trending_score: 88,
        timestamp: new Date().toISOString()
      }
    ];

    const mockResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    // Add artificial delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    return NextResponse.json(mockResponse);

  } catch (error) {
    console.error('Spectra proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'SpectraAI Proxy Online',
    version: '1.0.0',
    endpoints: ['/api/spectra-proxy']
  });
}