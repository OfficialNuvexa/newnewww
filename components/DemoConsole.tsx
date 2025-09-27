'use client';

import React, { useState, useEffect } from 'react';
import { Play, Zap, TrendingUp, ExternalLink } from 'lucide-react';
import TypewriterText from './TypewriterText';

interface NarrativeResult {
  id: string;
  title: string;
  summary: string;
  score: number;
  rationale: string;
  sentiment_analysis: {
    positive: number;
    negative: number;
    neutral: number;
  };
  engagement_metrics: {
    mentions: number;
    impressions: number;
    retweets: number;
    trending_velocity: string;
  };
  references: Array<{
    handle: string;
    url: string;
    snippet: string;
    engagement: number;
  }>;
  action: string;
  suggested_token_symbol: string;
  example_token_name: string;
  timestamp: string;
}

// Expanded narrative templates for true randomization
const narrativeTemplates = [
  {
    themes: ["Galactic", "Cosmic", "Space", "Stellar", "Nebula", "Quantum", "Astro"],
    animals: ["Shiba", "Doge", "Cat", "Frog", "Hamster", "Penguin", "Llama", "Otter"],
    adjectives: ["Neon", "Cyber", "Digital", "Electric", "Plasma", "Holographic", "Prismatic"],
    concepts: ["Revolution", "Renaissance", "Uprising", "Collective", "Dynasty", "Empire", "Legion"]
  },
  {
    themes: ["Retro", "Vintage", "Classic", "Ancient", "Mythic", "Legendary", "Epic"],
    animals: ["Dragon", "Phoenix", "Wolf", "Eagle", "Tiger", "Lion", "Bear", "Shark"],
    adjectives: ["Golden", "Silver", "Diamond", "Crystal", "Emerald", "Ruby", "Sapphire"],
    concepts: ["Warriors", "Guardians", "Knights", "Champions", "Heroes", "Legends", "Masters"]
  },
  {
    themes: ["Cyber", "Tech", "AI", "Robot", "Mech", "Digital", "Virtual"],
    animals: ["Monkey", "Ape", "Gorilla", "Chimp", "Orangutan", "Baboon", "Lemur"],
    adjectives: ["Chrome", "Steel", "Titanium", "Carbon", "Plasma", "Laser", "Photon"],
    concepts: ["Protocol", "Network", "System", "Matrix", "Grid", "Core", "Engine"]
  }
];

const velocityOptions = ["Exponential", "Accelerating", "Steady", "Explosive", "Viral", "Parabolic"];
const actionOptions = ["create_token", "monitor", "hold", "accumulate"];

const generateRandomNarrative = (): NarrativeResult => {
  const template = narrativeTemplates[Math.floor(Math.random() * narrativeTemplates.length)];
  const theme = template.themes[Math.floor(Math.random() * template.themes.length)];
  const animal = template.animals[Math.floor(Math.random() * template.animals.length)];
  const adjective = template.adjectives[Math.floor(Math.random() * template.adjectives.length)];
  const concept = template.concepts[Math.floor(Math.random() * template.concepts.length)];
  
  const title = `${adjective} ${animal} ${concept}`;
  const score = Math.floor(Math.random() * 20) + 75; // 75-95
  const mentions = Math.floor(Math.random() * 20000) + 5000;
  const impressions = Math.floor(Math.random() * 3000000) + 500000;
  const retweets = Math.floor(Math.random() * 15000) + 2000;
  const velocity = velocityOptions[Math.floor(Math.random() * velocityOptions.length)];
  const action = actionOptions[Math.floor(Math.random() * actionOptions.length)];
  
  const positive = Math.floor(Math.random() * 25) + 70; // 70-95
  const negative = Math.floor(Math.random() * 15) + 3; // 3-18
  const neutral = 100 - positive - negative;

  // Generate dynamic rationale
  const rationales = [
    `The ${title} narrative represents a powerful convergence of ${theme.toLowerCase()} aesthetics and proven ${animal.toLowerCase()} meme appeal. Our sentiment analysis reveals ${positive}% positive engagement with particularly strong resonance among crypto natives and meme enthusiasts.

The timing aligns perfectly with broader market sentiment and the growing trend toward ${adjective.toLowerCase()} aesthetics in digital culture. Engagement velocity has increased dramatically over the past 48 hours, with key influencers beginning organic adoption across multiple platforms.

Cross-platform momentum is building rapidly, with derivative content appearing at ${Math.floor(Math.random() * 5) + 2}x normal rates. The narrative taps into both nostalgic elements and forward-looking themes, creating natural viral mechanics. Risk assessment indicates ${action === 'create_token' ? 'high' : 'moderate'} volatility potential but exceptional community-building prospects.`,

    `${title} demonstrates the evolution of meme culture into more sophisticated narrative frameworks. The ${adjective.toLowerCase()} aesthetic combined with ${animal.toLowerCase()} imagery creates a unique positioning that resonates across multiple demographics.

Our advanced pattern recognition algorithms detect strong correlation with previous successful narratives, but with sufficient differentiation to avoid saturation. The ${concept.toLowerCase()} theme provides natural expansion opportunities into gaming, NFTs, and broader cultural movements.

Technical indicators suggest we're witnessing the early stages of a major narrative breakthrough. Community formation patterns show ${Math.floor(Math.random() * 40) + 60}% retention rates, significantly above average for emerging memes. The ${theme.toLowerCase()} angle provides natural partnership opportunities with related brands and communities.`,

    `The emergence of ${title} represents a fascinating intersection of ${theme.toLowerCase()} culture and digital asset speculation. Social listening tools indicate organic growth patterns with minimal artificial amplification, suggesting authentic community interest.

Engagement analysis reveals particularly strong performance in the 18-35 demographic, with cross-generational appeal through the ${animal.toLowerCase()} element. The narrative benefits from both immediate memetic appeal and deeper cultural resonance through ${adjective.toLowerCase()} aesthetics.

Market positioning analysis shows minimal direct competition in this specific intersection, providing clear differentiation opportunities. The ${concept.toLowerCase()} framing creates natural scarcity psychology while maintaining broad accessibility. Recommended ${action.replace('_', ' ')} with focus on community building and organic growth.`
  ];

  const selectedRationale = rationales[Math.floor(Math.random() * rationales.length)];

  // Generate random handles and snippets
  const handles = [
    "@CryptoMemeKing", "@DigitalNomadTrader", "@BlockchainBuzz", "@MemeLordSupreme", 
    "@CryptoWhaleAlert", "@DeFiDegen", "@NFTCollector", "@TokenHunter",
    "@CryptoInfluencer", "@MemeAnalytics", "@TrendSpotter", "@ViralSignals"
  ];

  const snippetTemplates = [
    `${title} is the evolution we needed! This ${adjective.toLowerCase()} aesthetic hits different 🚀`,
    `The ${animal.toLowerCase()} + ${theme.toLowerCase()} combo is pure genius. Going all in on this narrative 💎`,
    `${title} trending velocity is insane. This has all the signals of a breakout 📈`,
    `Finally, a ${animal.toLowerCase()} meme with actual depth. The ${adjective.toLowerCase()} angle is chef's kiss 👨‍🍳💋`,
    `When ${theme.toLowerCase()} meets ${animal.toLowerCase()}... this is going parabolic 🌙`,
    `${title} community is building fast. Early ${concept.toLowerCase()} vibes are strong 🔥`
  ];

  const references = Array.from({ length: 3 }, (_, i) => ({
    handle: handles[Math.floor(Math.random() * handles.length)],
    url: `https://x.com/${handles[Math.floor(Math.random() * handles.length)].slice(1).toLowerCase()}/status/${Math.floor(Math.random() * 900000) + 100000}`,
    snippet: snippetTemplates[Math.floor(Math.random() * snippetTemplates.length)],
    engagement: Math.floor(Math.random() * 5000) + 1000
  }));

  const tokenSymbol = `${theme.slice(0, 2).toUpperCase()}${animal.slice(0, 3).toUpperCase()}`;
  const tokenName = title.replace(/\s+/g, '');

  return {
    id: `narrative-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title,
    summary: `A ${adjective.toLowerCase()} ${animal.toLowerCase()} narrative combining ${theme.toLowerCase()} aesthetics with ${concept.toLowerCase().slice(0, -1)} culture, gaining massive traction across crypto communities.`,
    score,
    rationale: selectedRationale,
    sentiment_analysis: {
      positive,
      negative,
      neutral
    },
    engagement_metrics: {
      mentions,
      impressions,
      retweets,
      trending_velocity: velocity
    },
    references,
    action,
    suggested_token_symbol: tokenSymbol,
    example_token_name: tokenName,
    timestamp: new Date().toISOString()
  };
};

const sampleNarratives: NarrativeResult[] = [
  {
    id: "sample-1",
    title: "CyberFrog Renaissance",
    summary: "A nostalgic meme revival combining Y2K aesthetics with amphibian culture, gaining massive traction among Gen-Z crypto natives.",
    score: 94,
    rationale: "The CyberFrog narrative represents a perfect storm of nostalgia marketing and meme culture convergence. Our sentiment analysis reveals 87% positive engagement with particularly strong resonance in the 18-25 demographic. The aesthetic combines retro-futuristic elements with the proven appeal of frog-based memes, creating a unique positioning in the current market landscape.\n\nEngagement velocity has increased 340% over the past 48 hours, with key influencers beginning organic adoption. The narrative taps into both the proven success of amphibian-themed tokens and the growing Y2K revival trend across social platforms. Risk assessment indicates moderate volatility but strong community-building potential.\n\nTechnical indicators suggest this narrative is entering its viral acceleration phase, with cross-platform momentum building across Twitter, TikTok, and Discord communities. The timing aligns perfectly with broader market sentiment recovery and increased retail participation.",
    sentiment_analysis: {
      positive: 87,
      negative: 8,
      neutral: 5
    },
    engagement_metrics: {
      mentions: 12847,
      impressions: 2340000,
      retweets: 8934,
      trending_velocity: "Exponential"
    },
    references: [
      {
        handle: "@CryptoFrogKing",
        url: "https://x.com/CryptoFrogKing/status/123",
        snippet: "The cyber aesthetic is back and frogs are leading the charge 🐸⚡ This feels like early PEPE energy but with actual utility",
        engagement: 2847
      },
      {
        handle: "@Y2KCrypto",
        url: "https://x.com/Y2KCrypto/status/124",
        snippet: "CyberFrog hitting different. The nostalgia + meme combo is chef's kiss 👨‍🍳💋",
        engagement: 1923
      },
      {
        handle: "@MemeLordSupreme",
        url: "https://x.com/MemeLordSupreme/status/125",
        snippet: "When the frog meets the matrix... 🐸💊 This is going parabolic",
        engagement: 3421
      }
    ],
    action: "create_token",
    suggested_token_symbol: "CFROG",
    example_token_name: "CyberFrog",
    timestamp: "2025-01-27T15:30:00Z"
  },
  {
    id: "sample-2",
    title: "Quantum Hamster Uprising",
    summary: "A physics-meets-pets narrative where hamsters represent quantum superposition states, resonating with both science and pet communities.",
    score: 89,
    rationale: "The Quantum Hamster phenomenon demonstrates the power of educational memes in the crypto space. By combining complex physics concepts with universally beloved pet imagery, this narrative has achieved remarkable cross-demographic appeal. Our analysis shows particularly strong engagement from both STEM-educated users and pet enthusiast communities.\n\nThe narrative's strength lies in its dual-layer accessibility - surface-level cute hamster content for casual users, with deeper quantum physics references for educated audiences. This creates natural viral mechanics as users feel smart sharing content that operates on multiple intellectual levels. Engagement patterns show sustained growth rather than typical meme spike-and-crash behavior.\n\nMarket positioning analysis reveals minimal direct competition in the physics-pet intersection, providing clear blue ocean opportunity. The educational angle also provides natural partnership opportunities with science communication channels and pet-focused brands, creating multiple monetization pathways beyond pure speculation.",
    sentiment_analysis: {
      positive: 82,
      negative: 12,
      neutral: 6
    },
    engagement_metrics: {
      mentions: 8934,
      impressions: 1890000,
      retweets: 5672,
      trending_velocity: "Accelerating"
    },
    references: [
      {
        handle: "@QuantumMemes",
        url: "https://x.com/QuantumMemes/status/126",
        snippet: "Schrödinger's hamster is both rich and poor until you check your portfolio 🐹📦",
        engagement: 4521
      },
      {
        handle: "@PetCoinCollector",
        url: "https://x.com/PetCoinCollector/status/127",
        snippet: "Finally, a pet coin with actual intellectual depth. The quantum mechanics angle is genius",
        engagement: 2134
      }
    ],
    action: "monitor",
    suggested_token_symbol: "QHAM",
    example_token_name: "QuantumHamster",
    timestamp: "2025-01-27T14:15:00Z"
  },
  {
    id: "sample-3",
    title: "Neon Cactus Collective",
    summary: "Desert plant aesthetics merged with cyberpunk visuals, appealing to both plant parents and tech enthusiasts in urban environments.",
    score: 76,
    rationale: "The Neon Cactus narrative taps into the intersection of plant parent culture and cyberpunk aesthetics, creating a unique positioning in the lifestyle-crypto space. Our sentiment tracking reveals strong organic growth within urban millennial demographics, particularly those interested in both houseplants and futuristic design elements.\n\nThe narrative benefits from the proven staying power of plant-based communities, which tend to form stronger, more sustainable engagement patterns compared to pure meme plays. The cyberpunk overlay adds speculative appeal while the plant foundation provides community stability. This dual nature creates natural resistance to typical meme volatility.\n\nRisk assessment indicates moderate growth potential with lower downside risk due to the established plant enthusiast base. The aesthetic appeal translates well across visual platforms, providing natural expansion opportunities into NFT and merchandise markets. However, the niche positioning may limit explosive growth potential compared to broader appeal narratives.",
    sentiment_analysis: {
      positive: 74,
      negative: 18,
      neutral: 8
    },
    engagement_metrics: {
      mentions: 5621,
      impressions: 980000,
      retweets: 3247,
      trending_velocity: "Steady"
    },
    references: [
      {
        handle: "@PlantDadCrypto",
        url: "https://x.com/PlantDadCrypto/status/128",
        snippet: "My succulent collection needs some neon upgrades 🌵⚡ This aesthetic hits different",
        engagement: 1876
      },
      {
        handle: "@CyberpunkGardener",
        url: "https://x.com/CyberpunkGardener/status/129",
        snippet: "Desert punk meets crypto. The future is spiky and glowing 🌵💫",
        engagement: 2341
      }
    ],
    action: "hold",
    suggested_token_symbol: "NCACT",
    example_token_name: "NeonCactus",
    timestamp: "2025-01-27T13:45:00Z"
  }
];

export default function DemoConsole() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<NarrativeResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedSample, setSelectedSample] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  const handleScan = async () => {
    setIsScanning(true);
    setResult(null);
    setShowResult(false);
    setSelectedSample(null);
    setScanProgress(0);

    // Realistic scanning duration: 30-40 seconds
    const scanDuration = Math.floor(Math.random() * 10000) + 30000; // 30-40 seconds
    const progressInterval = scanDuration / 100;

    // Progress animation
    const progressTimer = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        // Non-linear progress for realism
        const increment = prev < 20 ? 2 : prev < 60 ? 1.5 : prev < 90 ? 1 : 0.5;
        return Math.min(prev + increment, 100);
      });
    }, progressInterval);

    // Wait for scan completion
    await new Promise(resolve => setTimeout(resolve, scanDuration));

    // Generate completely random result
    const randomResult = generateRandomNarrative();

    setResult(randomResult);
    setIsScanning(false);
    setShowResult(true);
    setScanProgress(0);
  };

  const handleSampleClick = (sample: NarrativeResult) => {
    setSelectedSample(sample.id);
    setResult(sample);
    setShowResult(true);
    setIsScanning(false);
  };

  const handleTokenize = (result: NarrativeResult) => {
    const pumpFunUrl = `https://pump.fun/create?name=${encodeURIComponent(result.example_token_name)}&symbol=${encodeURIComponent(result.suggested_token_symbol)}&description=${encodeURIComponent(result.summary)}`;
    window.open(pumpFunUrl, '_blank');
  };

  return (
    <section id="demo" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
            Narrative Scanner Console
          </h2>
          <p className="text-gray-400 text-lg">
            Real-time AI analysis of viral crypto narratives
          </p>
        </div>

        {/* Main Console */}
        <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 mb-8 font-mono">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-cyan-400 ml-4">spectra-ai@narrative-scanner:~$</span>
            </div>
            <button
              onClick={handleScan}
              disabled={isScanning}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 px-6 py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isScanning ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Scanning... {Math.floor(scanProgress)}%</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Try Now</span>
                </>
              )}
            </button>
          </div>

          <div className="min-h-[400px] bg-black/60 rounded-lg p-4 overflow-y-auto">
            {isScanning && (
              <div className="space-y-3">
                <TypewriterText text="Initializing SpectraAI neural networks..." delay={50} />
                <TypewriterText text="Connecting to Twitter API streams..." delay={40} startDelay={2000} />
                <TypewriterText text="Scanning 847,392 tweets for narrative patterns..." delay={30} startDelay={4000} />
                <TypewriterText text="Analyzing sentiment across 23 active communities..." delay={35} startDelay={8000} />
                <TypewriterText text="Processing viral indicators and engagement metrics..." delay={40} startDelay={12000} />
                <TypewriterText text="Cross-referencing with historical meme performance..." delay={45} startDelay={16000} />
                <TypewriterText text="Evaluating narrative coherence and market fit..." delay={50} startDelay={20000} />
                <TypewriterText text="Calculating confidence scores and risk assessments..." delay={40} startDelay={24000} />
                <TypewriterText text="Generating comprehensive narrative synthesis..." delay={60} startDelay={28000} />
                
                {/* Progress bar */}
                <div className="mt-6 bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-300 ease-out"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
                <div className="text-center text-cyan-400 text-sm">
                  Processing... {Math.floor(scanProgress)}% complete
                </div>
              </div>
            )}

            {showResult && result && (
              <div className="space-y-4 animate-fade-in">
                <div className="border-l-4 border-cyan-400 pl-4">
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">{result.title}</h3>
                  <p className="text-gray-300 mb-4">{result.summary}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-violet-500/20 p-3 rounded">
                      <div className="text-violet-400 text-sm">Confidence</div>
                      <div className="text-2xl font-bold">{result.score}%</div>
                    </div>
                    <div className="bg-green-500/20 p-3 rounded">
                      <div className="text-green-400 text-sm">Mentions</div>
                      <div className="text-2xl font-bold">{result.engagement_metrics.mentions.toLocaleString()}</div>
                    </div>
                    <div className="bg-blue-500/20 p-3 rounded">
                      <div className="text-blue-400 text-sm">Impressions</div>
                      <div className="text-2xl font-bold">{(result.engagement_metrics.impressions / 1000000).toFixed(1)}M</div>
                    </div>
                    <div className="bg-pink-500/20 p-3 rounded">
                      <div className="text-pink-400 text-sm">Velocity</div>
                      <div className="text-lg font-bold">{result.engagement_metrics.trending_velocity}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-cyan-400 font-semibold mb-2">AI Rationale:</h4>
                    <div className="text-gray-300 space-y-2">
                      {result.rationale.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-cyan-400 font-semibold mb-2">Sentiment Analysis:</h4>
                    <div className="flex space-x-4">
                      <span className="text-green-400">Positive: {result.sentiment_analysis.positive}%</span>
                      <span className="text-red-400">Negative: {result.sentiment_analysis.negative}%</span>
                      <span className="text-gray-400">Neutral: {result.sentiment_analysis.neutral}%</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-cyan-400 font-semibold mb-2">Key References:</h4>
                    <div className="space-y-2">
                      {result.references.map((ref, index) => (
                        <div key={index} className="bg-gray-800/50 p-3 rounded flex justify-between items-start">
                          <div className="flex-1">
                            <div className="text-violet-400 font-semibold">{ref.handle}</div>
                            <div className="text-gray-300 text-sm mb-1">"{ref.snippet}"</div>
                            <div className="text-gray-500 text-xs">{ref.engagement.toLocaleString()} engagements</div>
                          </div>
                          <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 ml-2">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-cyan-400 font-semibold">Recommended Action: <span className="text-white">{result.action.replace('_', ' ').toUpperCase()}</span></div>
                      <div className="text-gray-400 text-sm">Token: {result.suggested_token_symbol} ({result.example_token_name})</div>
                    </div>
                    <button
                      onClick={() => handleTokenize(result)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Tokenize on Pump.fun</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!isScanning && !showResult && (
              <div className="text-center text-gray-500 py-20">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Click "Try Now" to scan for viral narratives</p>
                <p className="text-sm mt-2 text-gray-600">Analysis takes 30-40 seconds for comprehensive results</p>
              </div>
            )}
          </div>
        </div>

        {/* Sample Narratives */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Recent Discoveries
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {sampleNarratives.map((sample) => (
              <div
                key={sample.id}
                onClick={() => handleSampleClick(sample)}
                className={`bg-black/40 backdrop-blur-sm border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:border-cyan-400/50 hover:bg-black/60 transform hover:scale-105 ${
                  selectedSample === sample.id ? 'border-cyan-400 bg-black/60' : 'border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-cyan-400">{sample.title}</h4>
                  <div className="text-sm bg-violet-500/20 text-violet-400 px-2 py-1 rounded">
                    {sample.score}%
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{sample.summary}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{sample.engagement_metrics.mentions.toLocaleString()} mentions</span>
                  <span className="text-cyan-400">{sample.action.replace('_', ' ')}</span>
                </div>
                {selectedSample === sample.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTokenize(sample);
                    }}
                    className="w-full mt-4 flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Tokenize on Pump.fun</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}