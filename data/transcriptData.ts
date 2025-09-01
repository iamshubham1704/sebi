import { TranscriptEvent } from '../types/transcript';

export const mockTranscripts: TranscriptEvent[] = [
  /* ---------------------- MICROSOFT (3) ---------------------- */
  {
    id: 'MSFT-1',
    title: "Microsoft Q4 2025 Earnings Call",
    date: 'Jul 25, 2025',
    quarter: 'Q4 2025',
    type: 'earnings',
    status: 'completed',
    speakers: [
      { name: 'Satya Nadella', title: 'CEO', company: 'Microsoft' },
      { name: 'Amy Hood', title: 'CFO', company: 'Microsoft' }
    ],
    transcript: [
      { speaker: 'Satya Nadella', content: "This was a record quarter for Microsoft, with Azure and AI leading growth.", timestamp: '00:01:05' },
      { speaker: 'Amy Hood', content: "Revenue grew 15% year-over-year, with Azure up 28%. Copilot adoption remains strong.", timestamp: '00:02:10' }
    ],
    summary: {
      ai: "Microsoft reported record Q4 2025 results, with Azure revenue up 28% and Copilot adoption accelerating across enterprises."
    }
  },
  {
    id: 'MSFT-2',
    title: "SNUG Silicon Valley 2025",
    date: 'Mar 15, 2025',
    type: 'conference',
    status: 'completed',
    speakers: [
      { name: 'Scott Guthrie', title: 'EVP Cloud + AI', company: 'Microsoft' }
    ],
    transcript: [
      { speaker: 'Scott Guthrie', content: "Enterprises are accelerating digital transformation with Azure AI services.", timestamp: '00:01:20' },
      { speaker: 'Scott Guthrie', content: "We introduced new developer tools, enhanced security, and advanced cloud integration.", timestamp: '00:02:15' }
    ],
    summary: {
      ai: "Microsoft showcased its latest cloud and AI services, emphasizing developer productivity, enhanced security, and enterprise integration."
    }
  },
  {
    id: 'MSFT-3',
    title: "Deutsche Bank's 2025 Technology Conference",
    date: 'Aug 28, 2025',
    type: 'conference',
    status: 'completed',
    speakers: [
      { name: 'Vasu Jakkal', title: 'Corporate VP, Security & Compliance', company: 'Microsoft' }
    ],
    transcript: [
      { speaker: 'Vasu Jakkal', content: "We see AI as fundamental in cybersecurity. Our goal is proactive defense at scale.", timestamp: '00:02:00' }
    ],
    summary: {
      ai: "Microsoft highlighted AI-driven cybersecurity and compliance strategies, underscoring enterprise defense as a top priority."
    }
  },

  /* ---------------------- APPLE (2) ---------------------- */
  {
    id: 'AAPL-1',
    title: "Apple Q3 2025 Earnings Call",
    date: 'Jul 20, 2025',
    quarter: 'Q3 2025',
    type: 'earnings',
    status: 'completed',
    speakers: [
      { name: 'Tim Cook', title: 'CEO', company: 'Apple' },
      { name: 'Luca Maestri', title: 'CFO', company: 'Apple' }
    ],
    transcript: [
      { speaker: 'Tim Cook', content: "We achieved record iPhone and Services revenue this quarter.", timestamp: '00:01:10' },
      { speaker: 'Luca Maestri', content: "Revenue grew 12% year-over-year, with Services now exceeding $25B in the quarter.", timestamp: '00:02:05' }
    ],
    summary: {
      ai: "Apple posted strong Q3 2025 results, led by iPhone sales and record Services revenue surpassing $25B."
    }
  },
  {
    id: 'AAPL-2',
    title: "Apple Worldwide Developers Conference (WWDC) 2025",
    date: 'Jun 10, 2025',
    type: 'conference',
    status: 'completed',
    speakers: [
      { name: 'Tim Cook', title: 'CEO', company: 'Apple' },
      { name: 'Craig Federighi', title: 'SVP Software Engineering', company: 'Apple' }
    ],
    transcript: [
      { speaker: 'Tim Cook', content: "WWDC is all about empowering developers to innovate.", timestamp: '00:00:45' },
      { speaker: 'Craig Federighi', content: "We are introducing AI-powered developer tools and enhancements to Swift and Xcode.", timestamp: '00:02:00' }
    ],
    summary: {
      ai: "Apple announced new AI-powered developer tools, iOS enhancements, and updates to Swift and Xcode at WWDC 2025."
    }
  },

  /* ---------------------- RELIANCE (3) ---------------------- */
  {
    id: 'RIL-1',
    title: "Reliance Q4 2025 Earnings Call",
    date: 'Jul 22, 2025',
    quarter: 'Q4 2025',
    type: 'earnings',
    status: 'completed',
    speakers: [
      { name: 'Mukesh D. Ambani', title: 'Chairman & MD', company: 'Reliance Industries' }
    ],
    transcript: [
      { speaker: 'Mukesh D. Ambani', content: "Reliance delivered strong results with growth across digital, retail, and energy.", timestamp: '00:01:00' }
    ],
    summary: {
      ai: "Reliance posted strong Q4 2025 earnings, led by digital services and retail growth, alongside steady performance in energy."
    }
  },
  {
    id: 'RIL-2',
    title: "Morgan Stanley Asia Pacific Summit 2025",
    date: 'Sep 15, 2025',
    type: 'conference',
    status: 'completed',
    speakers: [
      { name: 'Ridham Desai', title: 'Managing Director', company: 'Morgan Stanley' },
      { name: 'Mukesh D. Ambani', title: 'Chairman & MD', company: 'Reliance Industries' }
    ],
    transcript: [
      { speaker: 'Mukesh D. Ambani', content: "We are investing $75 billion over 15 years to build a complete green energy ecosystem.", timestamp: '00:01:50' },
      { speaker: 'Mukesh D. Ambani', content: "Jio has built the world's largest 5G rollout, covering 90% of India.", timestamp: '00:03:05' }
    ],
    summary: {
      ai: "Mukesh Ambani outlined Reliance's green energy roadmap and Jio's leadership in 5G and AI integration."
    }
  },
  {
    id: 'RIL-3',
    title: "Reliance Annual General Meeting 2025",
    date: 'Aug 30, 2025',
    type: 'meeting',
    status: 'completed',
    speakers: [
      { name: 'Mukesh D. Ambani', title: 'Chairman & MD', company: 'Reliance Industries' }
    ],
    transcript: [
      { speaker: 'Mukesh D. Ambani', content: "Reliance is committed to a sustainable future with investments in green hydrogen and solar.", timestamp: '00:02:30' }
    ],
    summary: {
      ai: "Reliance AGM 2025 emphasized sustainability, with major commitments to green hydrogen, solar energy, and digital ecosystem expansion."
    }
  }
];
