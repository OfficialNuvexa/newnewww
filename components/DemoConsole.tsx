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

  const handleScan = async () => {
    setIsScanning(true);
    setResult(null);
    setShowResult(false);
    setSelectedSample(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate a realistic result
    const mockResult: NarrativeResult = {
      id: `scan-${Date.now()}`,
      title: "AlienDoge Resurgence",
      summary: "A surreal alien-dog hybrid meme gaining massive traction after mysterious UFO sightings coincide with major NFT drops.",
      score: 91,
      rationale: "The AlienDoge narrative represents a unique convergence of extraterrestrial mystique and proven canine meme appeal. Our advanced sentiment analysis reveals 89% positive engagement with particularly strong resonance among sci-fi enthusiasts and dog lovers. The timing coincides perfectly with renewed public interest in UFO phenomena and space exploration.\n\nEngagement velocity analysis shows exponential growth patterns similar to early DOGE and SHIB movements, but with added narrative depth from the alien angle. The mysterious, otherworldly positioning creates natural scarcity psychology while the familiar dog element provides accessibility. Cross-platform momentum is building rapidly across Twitter, Reddit, and TikTok.\n\nRisk assessment indicates high volatility potential but exceptional community-building prospects. The alien theme provides endless creative content opportunities, while the dog foundation ensures broad appeal. Technical indicators suggest we're witnessing the early stages of a major narrative breakthrough with significant upside potential.",
      sentiment_analysis: {
        positive: 89,
        negative: 7,
        neutral: 4
      },
      engagement_metrics: {
        mentions: 15623,
        impressions: 3200000,
        retweets: 11247,
        trending_velocity: "Exponential"
      },
      references: [
        {
          handle: "@AlienHunter2024",
          url: "https://x.com/AlienHunter2024/status/123456",
          snippet: "The UFO sightings + dog memes convergence is not a coincidence. AlienDoge is the signal we've been waiting for 🛸🐕",
          engagement: 4521
        },
        {
          handle: "@CryptoSpaceX",
          url: "https://x.com/CryptoSpaceX/status/123457",
          snippet: "When Elon tweets about aliens and dogs in the same week... AlienDoge to Mars confirmed 🚀👽",
          engagement: 7834
        },
        {
          handle: "@MemeLordAlpha",
          url: "https://x.com/MemeLordAlpha/status/123458",
          snippet: "This AlienDoge narrative has everything: mystery, dogs, space, perfect meme combo. Going all in 💎🙌",
          engagement: 3247
        }
      ],
      action: "create_token",
      suggested_token_symbol: "ALDOGE",
      example_token_name: "AlienDoge",
      timestamp: new Date().toISOString()
    };

    setResult(mockResult);
    setIsScanning(false);
    setShowResult(true);
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
    <section className="py-20 px-4 relative">
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
                  <span>Scanning...</span>
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
              <div className="space-y-2">
                <TypewriterText text="Initializing SpectraAI neural networks..." delay={50} />
                <TypewriterText text="Scanning Crypto Twitter streams..." delay={100} startDelay={1000} />
                <TypewriterText text="Analyzing sentiment patterns..." delay={50} startDelay={2000} />
                <TypewriterText text="Processing viral indicators..." delay={50} startDelay={2500} />
                <TypewriterText text="Generating narrative synthesis..." delay={50} startDelay={3000} />
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