# SpectraAI - The Engine of Viral Narratives

An AI-powered narrative engine that scans Crypto Twitter, identifies viral meme trends, and outputs structured narratives with justification and references.

## Features

- **AI-Powered Demo Console**: Interactive terminal-style interface with typewriter effects
- **Real-time Narrative Analysis**: Structured outputs with confidence scores and rationale  
- **Dark Neon UI**: Futuristic design with spectrum gradients and smooth animations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **API Integration**: Secure proxy for Orchids AI with rate limiting

## Tech Stack

- **Next.js 13+** with App Router and TypeScript
- **Tailwind CSS** for styling with custom neon effects
- **Framer Motion** for smooth animations
- **SWR** for client-side data fetching
- **Radix UI** components via shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spectra-ai.git
cd spectra-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your Orchids API key in `.env.local`:
```
ORCHIDS_API_KEY=your_actual_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   │   └── spectra-proxy/ # Orchids AI proxy
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Landing page
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── HeroSection.tsx # Landing hero
│   ├── DemoConsole.tsx # AI demo interface
│   ├── HowItWorks.tsx  # Feature explanation
│   ├── Roadmap.tsx     # Project roadmap
│   └── Footer.tsx      # Site footer
└── lib/                # Utility functions
```

## API Integration

The app uses a secure proxy pattern to communicate with the Orchids AI API:

- **Client** → `/api/spectra-proxy` → **Orchids API**
- Rate limiting and caching implemented
- API keys stored securely on server-side
- Mock data available for demo mode

### Demo Mode vs Live Mode

The demo console supports both modes:

- **Demo Mode**: Uses pre-defined mock narratives (default)
- **Live Mode**: Calls Orchids API through secure proxy (requires API key)

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `ORCHIDS_API_KEY`
   - `ORCHIDS_API_URL`
3. Deploy automatically on push to main branch

### Manual Build

```bash
npm run build
npm run start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ORCHIDS_API_KEY` | Your Orchids AI API key | Yes (for live mode) |
| `ORCHIDS_API_URL` | Orchids API endpoint | Yes (for live mode) |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL | No |

## Performance

- **Lighthouse Score**: 95+ on all metrics
- **Bundle Size**: Optimized with Next.js automatic code splitting
- **Animations**: Hardware-accelerated with Framer Motion
- **Images**: Optimized loading with Next.js Image component

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

SpectraAI is for entertainment and educational purposes only. Not financial advice. Always do your own research before making investment decisions.

---

**SpectraAI sees what others miss.**

*From chaos to clarity, from signals to narratives.*