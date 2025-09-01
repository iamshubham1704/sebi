// data/mockData.ts
import { Stock } from '../types';

export const mockStocks: Stock[] = [
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 506.69,
    change: -2.95,
    changePercent: -0.6,
    afterHoursPrice: 506.80,
    afterHoursChange: 0.11,
    afterHoursPercent: 0.0,
    marketCap: 3771000000000,
    volume: 21450000,
    pe: 37.4,
    pb: 11.0,
    dividend: 3.00,
    yield: 0.70,
    beta: 0.89,
    eps: 12.54,
    revenue: 281720000000,
    sector: 'Software',
    industry: 'Technology',
    employees: 228000,
    founded: 1975,
    headquarters: 'Redmond, WA',
    website: 'www.microsoft.com',
    ceo: 'Satya Nadella',
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates in three segments: Productivity and Business Processes, Intelligent Cloud, and More Personal Computing.',
    priceData: [
      { date: 'Jan \'22', price: 280.12, volume: 28000000 },
      { date: 'Jul \'22', price: 245.67, volume: 31000000 },
      { date: 'Jan \'23', price: 320.15, volume: 25000000 },
      { date: 'Jul \'23', price: 395.84, volume: 33000000 },
      { date: 'Jan \'24', price: 456.26, volume: 22000000 },
      { date: 'Sep \'24', price: 506.69, volume: 21000000 }
    ],
    financials: {
      revenue: [
        { quarter: 'Q1 2024', value: 65585 },
        { quarter: 'Q2 2024', value: 62020 },
        { quarter: 'Q3 2024', value: 61858 },
        { quarter: 'Q4 2023', value: 56517 }
      ],
      profit: [
        { quarter: 'Q1 2024', value: 22291 },
        { quarter: 'Q2 2024', value: 21870 },
        { quarter: 'Q3 2024', value: 21939 },
        { quarter: 'Q4 2023', value: 18299 }
      ],
      cashFlow: [
        { quarter: 'Q1 2024', value: 25626 },
        { quarter: 'Q2 2024', value: 24701 },
        { quarter: 'Q3 2024', value: 25040 },
        { quarter: 'Q4 2023', value: 21563 }
      ]
    },
    keyMatrics: {
      roe: 36.05,
      roa: 16.53,
      debtToEquity: 0.35,
      currentRatio: 1.70,
      quickRatio: 1.65,
      grossMargin: 69.72,
      operatingMargin: 42.05,
      netMargin: 36.69,
      evSales: 13.4,
      evEbitda: 24.2,
      sharesOut: 7.4,
      rev3Yr: 12.4,
      rev5Yr: 14.5,
      rev10Yr: 11.7,
      dilEps3Yr: 12.2
    },
    estimates: {
      revenue: [
        { year: '2024 (A)', actual: 281720, estimate: null, low: null, high: null },
        { year: '2025 (E)', actual: null, estimate: 298500, low: 285000, high: 315000 },
        { year: '2026 (E)', actual: null, estimate: 315000, low: 295000, high: 335000 },
        { year: '2027 (E)', actual: null, estimate: 332000, low: 310000, high: 355000 },
        { year: '2028 (E)', actual: null, estimate: 350000, low: 325000, high: 375000 }
      ],
      eps: [
        { year: '2024 (A)', actual: 12.54, estimate: null, low: null, high: null },
        { year: '2025 (E)', actual: null, estimate: 13.85, low: 13.20, high: 14.50 },
        { year: '2026 (E)', actual: null, estimate: 15.20, low: 14.40, high: 16.00 },
        { year: '2027 (E)', actual: null, estimate: 16.80, low: 15.80, high: 17.80 },
        { year: '2028 (E)', actual: null, estimate: 18.50, low: 17.30, high: 19.70 }
      ],
      ebitda: [
        { year: '2024 (A)', actual: 125000, estimate: null, low: null, high: null },
        { year: '2025 (E)', actual: null, estimate: 138000, low: 132000, high: 145000 },
        { year: '2026 (E)', actual: null, estimate: 152000, low: 145000, high: 160000 },
        { year: '2027 (E)', actual: null, estimate: 167000, low: 158000, high: 176000 },
        { year: '2028 (E)', actual: null, estimate: 183000, low: 172000, high: 194000 }
      ],
      priceTargets: [
        { analyst: 'Morgan Stanley', target: 550, rating: 'Overweight', date: '2024-12-01' },
        { analyst: 'Goldman Sachs', target: 540, rating: 'Buy', date: '2024-11-28' },
        { analyst: 'JP Morgan', target: 535, rating: 'Overweight', date: '2024-11-25' },
        { analyst: 'Bank of America', target: 530, rating: 'Buy', date: '2024-11-20' }
      ]
    },
    research: {
      analystReports: [
        { title: 'Microsoft: AI Leadership Drives Growth', analyst: 'Morgan Stanley', rating: 'Overweight', target: 550, date: '2024-12-01', summary: 'Strong AI integration across Azure and Office 365 positions Microsoft for sustained growth.' },
        { title: 'Cloud Dominance Continues', analyst: 'Goldman Sachs', rating: 'Buy', target: 540, date: '2024-11-28', summary: 'Azure growth remains robust with enterprise adoption accelerating.' },
        { title: 'Gaming and Surface Recovery', analyst: 'JP Morgan', rating: 'Overweight', target: 535, date: '2024-11-25', summary: 'Gaming segment showing signs of recovery with new console cycle.' }
      ],
      news: [
        { title: 'Microsoft Announces New AI Copilot Features', source: 'TechCrunch', date: '2024-12-01', sentiment: 'positive', summary: 'Microsoft expands AI capabilities across its productivity suite.' },
        { title: 'Azure Revenue Growth Slows', source: 'Reuters', date: '2024-11-28', sentiment: 'negative', summary: 'Cloud growth deceleration concerns investors despite strong fundamentals.' },
        { title: 'Microsoft Partners with OpenAI', source: 'Bloomberg', date: '2024-11-25', sentiment: 'positive', summary: 'Extended partnership strengthens AI competitive position.' }
      ],
      insights: [
        { category: 'AI', insight: 'Leading position in enterprise AI adoption', impact: 'high', date: '2024-12-01' },
        { category: 'Cloud', insight: 'Azure market share continues to grow', impact: 'high', date: '2024-11-28' },
        { category: 'Productivity', insight: 'Office 365 penetration reaching saturation', impact: 'medium', date: '2024-11-25' }
      ]
    },
    ownership: {
      institutionalHoldings: [
        { institution: 'Vanguard Group', shares: 650000000, percentage: 8.7, change: 0.2, date: '2024-11-30' },
        { institution: 'BlackRock', shares: 520000000, percentage: 7.0, change: -0.1, date: '2024-11-30' },
        { institution: 'State Street Corp', shares: 380000000, percentage: 5.1, change: 0.0, date: '2024-11-30' },
        { institution: 'Fidelity Management', shares: 290000000, percentage: 3.9, change: 0.3, date: '2024-11-30' }
      ],
      insiderTrading: [
        { insider: 'Satya Nadella', position: 'CEO', transaction: 'sell', shares: 50000, price: 505.20, date: '2024-11-15' },
        { insider: 'Amy Hood', position: 'CFO', transaction: 'sell', shares: 25000, price: 508.50, date: '2024-11-10' },
        { insider: 'Brad Smith', position: 'President', transaction: 'buy', shares: 10000, price: 502.30, date: '2024-11-05' }
      ],
      ownershipStructure: {
        institutional: 75.2,
        insider: 0.8,
        public: 24.0
      }
    },
    industryAnalysis: {
      sector: 'Technology',
      industry: 'Software',
      marketCap: 3771000000000,
      peers: [
        { symbol: 'AAPL', name: 'Apple Inc.', marketCap: 3020000000000, pe: 28.7, revenue: 394328000000 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', marketCap: 1850000000000, pe: 25.4, revenue: 282836000000 },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', marketCap: 1650000000000, pe: 52.8, revenue: 574785000000 },
        { symbol: 'META', name: 'Meta Platforms Inc.', marketCap: 850000000000, pe: 22.1, revenue: 134902000000 }
      ],
      marketPosition: 'Market Leader',
      competitiveAdvantages: [
        'Dominant enterprise software ecosystem',
        'Strong cloud infrastructure with Azure',
        'AI integration across all products',
        'High switching costs for enterprise customers'
      ],
      risks: [
        'Regulatory scrutiny on AI and cloud dominance',
        'Competition from AWS and Google Cloud',
        'Economic sensitivity in enterprise spending',
        'Cybersecurity threats'
      ]
    },
    dividends: {
      currentYield: 0.70,
      annualDividend: 3.00,
      dividendHistory: [
        { date: '2024-11-15', amount: 0.75, exDate: '2024-11-14', payDate: '2024-12-12' },
        { date: '2024-08-15', amount: 0.75, exDate: '2024-08-14', payDate: '2024-09-12' },
        { date: '2024-05-15', amount: 0.75, exDate: '2024-05-14', payDate: '2024-06-12' },
        { date: '2024-02-15', amount: 0.75, exDate: '2024-02-14', payDate: '2024-03-12' }
      ],
      payoutRatio: 24.0,
      dividendGrowth: 8.5,
      nextDividend: { amount: 0.75, exDate: '2025-02-14', payDate: '2025-03-12' }
    },
    modeling: {
      dcf: {
        wacc: 8.5,
        terminalGrowth: 3.0,
        fairValue: 520.00,
        assumptions: [
          { metric: 'Revenue Growth', value: 12.0, description: '5-year average revenue growth' },
          { metric: 'Operating Margin', value: 42.0, description: 'Current operating margin maintained' },
          { metric: 'Tax Rate', value: 15.0, description: 'Effective tax rate' },
          { metric: 'CapEx/Revenue', value: 8.0, description: 'Capital expenditure as % of revenue' }
        ]
      },
      valuation: {
        pe: 37.4,
        pb: 11.0,
        ps: 13.4,
        evEbitda: 24.2,
        peg: 3.1
      },
      scenarios: [
        { scenario: 'Bull Case', probability: 25, targetPrice: 580, description: 'AI adoption accelerates, cloud growth exceeds expectations' },
        { scenario: 'Base Case', probability: 50, targetPrice: 520, description: 'Current growth trajectory continues' },
        { scenario: 'Bear Case', probability: 25, targetPrice: 420, description: 'Economic slowdown impacts enterprise spending' }
      ]
    },
    filings: {
      recentFilings: [
        { type: '10-Q', title: 'Quarterly Report Q1 2025', date: '2024-11-15', url: '#', summary: 'Strong revenue growth driven by Azure and Office 365' },
        { type: '8-K', title: 'Current Report - AI Partnership', date: '2024-11-10', url: '#', summary: 'Announcement of extended OpenAI partnership' },
        { type: '10-K', title: 'Annual Report 2024', date: '2024-08-15', url: '#', summary: 'Comprehensive annual financial results' }
      ],
      earningsReports: [
        { quarter: 'Q1 2025', date: '2024-11-15', revenue: 65585, eps: 2.93, beat: true, summary: 'Beat estimates on strong cloud growth' },
        { quarter: 'Q4 2024', date: '2024-08-15', revenue: 62020, eps: 2.69, beat: false, summary: 'Missed on gaming segment weakness' },
        { quarter: 'Q3 2024', date: '2024-05-15', revenue: 61858, eps: 2.94, beat: true, summary: 'Strong performance across all segments' }
      ],
      regulatoryDocuments: [
        { type: 'SEC Investigation', title: 'AI Competition Review', date: '2024-11-20', status: 'Ongoing', summary: 'SEC reviewing AI market competition practices' },
        { type: 'Antitrust', title: 'Cloud Services Investigation', date: '2024-10-15', status: 'Resolved', summary: 'EU investigation into cloud services concluded' }
      ]
    }
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 192.75,
    change: 2.85,
    changePercent: 1.5,
    afterHoursPrice: 193.12,
    afterHoursChange: 0.37,
    afterHoursPercent: 0.2,
    marketCap: 3020000000000,
    volume: 45820000,
    pe: 28.7,
    pb: 35.2,
    dividend: 0.96,
    yield: 0.50,
    beta: 1.21,
    eps: 6.72,
    revenue: 394328000000,
    sector: 'Technology',
    industry: 'Consumer Electronics',
    employees: 164000,
    founded: 1976,
    headquarters: 'Cupertino, CA',
    website: 'www.apple.com',
    ceo: 'Tim Cook',
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company operates through iPhone, Mac, iPad, Wearables segments.',
    priceData: [
      { date: 'Jan \'22', price: 165.92, volume: 52000000 },
      { date: 'Jul \'22', price: 142.31, volume: 48000000 },
      { date: 'Jan \'23', price: 155.10, volume: 55000000 },
      { date: 'Jul \'23', price: 169.89, volume: 62000000 },
      { date: 'Jan \'24', price: 189.98, volume: 58000000 },
      { date: 'Sep \'24', price: 192.75, volume: 45000000 }
    ],
    financials: {
      revenue: [
        { quarter: 'Q1 2024', value: 119575 },
        { quarter: 'Q2 2024', value: 90753 },
        { quarter: 'Q3 2024', value: 94836 },
        { quarter: 'Q4 2023', value: 89498 }
      ],
      profit: [
        { quarter: 'Q1 2024', value: 23636 },
        { quarter: 'Q2 2024', value: 21448 },
        { quarter: 'Q3 2024', value: 22956 },
        { quarter: 'Q4 2023', value: 20687 }
      ],
      cashFlow: [
        { quarter: 'Q1 2024', value: 28558 },
        { quarter: 'Q2 2024', value: 26777 },
        { quarter: 'Q3 2024', value: 29963 },
        { quarter: 'Q4 2023', value: 25635 }
      ]
    },
    keyMatrics: {
      roe: 56.87,
      roa: 22.61,
      debtToEquity: 1.73,
      currentRatio: 1.00,
      quickRatio: 0.85,
      grossMargin: 45.96,
      operatingMargin: 30.74,
      netMargin: 26.31,
      evSales: 7.8,
      evEbitda: 22.1,
      sharesOut: 15.2,
      rev3Yr: 8.9,
      rev5Yr: 9.2,
      rev10Yr: 15.4,
      dilEps3Yr: 14.8
    },
    estimates: {
      revenue: [
        { year: '2024 (A)', actual: 394328, estimate: null, low: null, high: null },
        { year: '2025 (E)', actual: null, estimate: 420000, low: 405000, high: 435000 },
        { year: '2026 (E)', actual: null, estimate: 445000, low: 425000, high: 465000 },
        { year: '2027 (E)', actual: null, estimate: 470000, low: 445000, high: 495000 },
        { year: '2028 (E)', actual: null, estimate: 495000, low: 465000, high: 525000 }
      ],
      eps: [
        { year: '2024 (A)', actual: 6.72, estimate: null, low: null, high: null },
        { year: '2025 (E)', actual: null, estimate: 7.40, low: 7.10, high: 7.70 },
        { year: '2026 (E)', actual: null, estimate: 8.10, low: 7.80, high: 8.40 },
        { year: '2027 (E)', actual: null, estimate: 8.90, low: 8.50, high: 9.30 },
        { year: '2028 (E)', actual: null, estimate: 9.70, low: 9.20, high: 10.20 }
      ],
      ebitda: [
        { year: '2024 (A)', actual: 119575, estimate: null, low: null, high: null },
        { year: '2025 (E)', actual: null, estimate: 126000, low: 123000, high: 129000 },
        { year: '2026 (E)', actual: null, estimate: 132000, low: 128000, high: 136000 },
        { year: '2027 (E)', actual: null, estimate: 138000, low: 134000, high: 142000 },
        { year: '2028 (E)', actual: null, estimate: 144000, low: 139000, high: 149000 }
      ],
      priceTargets: [
        { analyst: 'Morgan Stanley', target: 220, rating: 'Overweight', date: '2024-12-01' },
        { analyst: 'Goldman Sachs', target: 215, rating: 'Buy', date: '2024-11-28' },
        { analyst: 'JP Morgan', target: 210, rating: 'Overweight', date: '2024-11-25' },
        { analyst: 'Bank of America', target: 205, rating: 'Buy', date: '2024-11-20' }
      ]
    },
    research: {
      analystReports: [
        { title: 'Apple: Services Growth Drives Valuation', analyst: 'Morgan Stanley', rating: 'Overweight', target: 220, date: '2024-12-01', summary: 'Services revenue growth and iPhone 15 success drive positive outlook.' },
        { title: 'iPhone 15 Pro Max Demand Strong', analyst: 'Goldman Sachs', rating: 'Buy', target: 215, date: '2024-11-28', summary: 'Premium iPhone models showing strong demand in key markets.' },
        { title: 'China Market Recovery', analyst: 'JP Morgan', rating: 'Overweight', target: 210, date: '2024-11-25', summary: 'China market showing signs of recovery with new iPhone adoption.' }
      ],
      news: [
        { title: 'Apple Reports Record Services Revenue', source: 'Apple Newsroom', date: '2024-12-01', sentiment: 'positive', summary: 'Services segment reaches new quarterly revenue record.' },
        { title: 'iPhone 15 Supply Chain Issues', source: 'Reuters', date: '2024-11-28', sentiment: 'negative', summary: 'Production delays affecting iPhone 15 Pro availability.' },
        { title: 'Apple Vision Pro Launch Delayed', source: 'Bloomberg', date: '2024-11-25', sentiment: 'negative', summary: 'Mixed reality headset launch pushed to early 2025.' }
      ],
      insights: [
        { category: 'Services', insight: 'App Store and subscription revenue growing rapidly', impact: 'high', date: '2024-12-01' },
        { category: 'iPhone', insight: 'Premium segment driving ASP growth', impact: 'high', date: '2024-11-28' },
        { category: 'China', insight: 'Market share recovery in premium segment', impact: 'medium', date: '2024-11-25' }
      ]
    },
    ownership: {
      institutionalHoldings: [
        { institution: 'Vanguard Group', shares: 1200000000, percentage: 7.9, change: 0.1, date: '2024-11-30' },
        { institution: 'BlackRock', shares: 950000000, percentage: 6.2, change: -0.2, date: '2024-11-30' },
        { institution: 'Berkshire Hathaway', shares: 915000000, percentage: 6.0, change: 0.0, date: '2024-11-30' },
        { institution: 'State Street Corp', shares: 650000000, percentage: 4.3, change: 0.1, date: '2024-11-30' }
      ],
      insiderTrading: [
        { insider: 'Tim Cook', position: 'CEO', transaction: 'sell', shares: 100000, price: 192.50, date: '2024-11-20' },
        { insider: 'Luca Maestri', position: 'CFO', transaction: 'sell', shares: 50000, price: 195.20, date: '2024-11-15' },
        { insider: 'Jeff Williams', position: 'COO', transaction: 'buy', shares: 20000, price: 188.30, date: '2024-11-10' }
      ],
      ownershipStructure: {
        institutional: 60.1,
        insider: 0.1,
        public: 39.8
      }
    },
    industryAnalysis: {
      sector: 'Technology',
      industry: 'Consumer Electronics',
      marketCap: 3020000000000,
      peers: [
        { symbol: 'MSFT', name: 'Microsoft Corporation', marketCap: 3771000000000, pe: 37.4, revenue: 281720000000 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', marketCap: 1850000000000, pe: 25.4, revenue: 282836000000 },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', marketCap: 1650000000000, pe: 52.8, revenue: 574785000000 },
        { symbol: 'TSLA', name: 'Tesla Inc.', marketCap: 750000000000, pe: 65.2, revenue: 96773000000 }
      ],
      marketPosition: 'Market Leader',
      competitiveAdvantages: [
        'Premium brand positioning and ecosystem lock-in',
        'Strong services revenue growth',
        'Innovation in hardware and software integration',
        'Global supply chain and manufacturing expertise'
      ],
      risks: [
        'Dependence on iPhone for majority of revenue',
        'China market regulatory risks',
        'Intense competition in smartphone market',
        'Supply chain concentration risks'
      ]
    },
    dividends: {
      currentYield: 0.50,
      annualDividend: 0.96,
      dividendHistory: [
        { date: '2024-11-15', amount: 0.24, exDate: '2024-11-14', payDate: '2024-12-12' },
        { date: '2024-08-15', amount: 0.24, exDate: '2024-08-14', payDate: '2024-09-12' },
        { date: '2024-05-15', amount: 0.24, exDate: '2024-05-14', payDate: '2024-06-12' },
        { date: '2024-02-15', amount: 0.24, exDate: '2024-02-14', payDate: '2024-03-12' }
      ],
      payoutRatio: 14.3,
      dividendGrowth: 4.2,
      nextDividend: { amount: 0.24, exDate: '2025-02-14', payDate: '2025-03-12' }
    },
    modeling: {
      dcf: {
        wacc: 9.2,
        terminalGrowth: 2.5,
        fairValue: 210.00,
        assumptions: [
          { metric: 'Revenue Growth', value: 5.0, description: 'Moderate growth in mature markets' },
          { metric: 'Operating Margin', value: 30.0, description: 'Services margin improvement' },
          { metric: 'Tax Rate', value: 16.0, description: 'Effective tax rate' },
          { metric: 'CapEx/Revenue', value: 6.0, description: 'Capital expenditure as % of revenue' }
        ]
      },
      valuation: {
        pe: 28.7,
        pb: 35.2,
        ps: 7.8,
        evEbitda: 22.1,
        peg: 5.7
      },
      scenarios: [
        { scenario: 'Bull Case', probability: 30, targetPrice: 240, description: 'Services growth accelerates, new product categories succeed' },
        { scenario: 'Base Case', probability: 50, targetPrice: 210, description: 'Steady iPhone growth with services expansion' },
        { scenario: 'Bear Case', probability: 20, targetPrice: 160, description: 'iPhone sales decline, China market challenges' }
      ]
    },
    filings: {
      recentFilings: [
        { type: '10-Q', title: 'Quarterly Report Q1 2025', date: '2024-11-15', url: '#', summary: 'Strong iPhone 15 sales and services growth' },
        { type: '8-K', title: 'Current Report - Vision Pro', date: '2024-11-10', url: '#', summary: 'Apple Vision Pro launch timeline update' },
        { type: '10-K', title: 'Annual Report 2024', date: '2024-08-15', url: '#', summary: 'Record annual revenue and services growth' }
      ],
      earningsReports: [
        { quarter: 'Q1 2025', date: '2024-11-15', revenue: 119575, eps: 2.18, beat: true, summary: 'Beat estimates on strong iPhone 15 sales' },
        { quarter: 'Q4 2024', date: '2024-08-15', revenue: 90753, eps: 1.26, beat: false, summary: 'Missed on China market weakness' },
        { quarter: 'Q3 2024', date: '2024-05-15', revenue: 94836, eps: 1.52, beat: true, summary: 'Services revenue growth exceeded expectations' }
      ],
      regulatoryDocuments: [
        { type: 'Antitrust', title: 'App Store Investigation', date: '2024-11-20', status: 'Ongoing', summary: 'EU investigating App Store competition practices' },
        { type: 'Privacy', title: 'Data Protection Compliance', date: '2024-10-15', status: 'Resolved', summary: 'GDPR compliance review completed' }
      ]
    }
  },
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Limited',
    price: 1357.20,
    change: -28.10,
    changePercent: -2.07,
    afterHoursPrice: 1358.50,
    afterHoursChange: 1.30,
    afterHoursPercent: 0.10,
    marketCap: 18366270000000, // ₹18,36,627 Crores
    volume: 8500000,
    pe: 28.76,
    pb: 2.8,
    dividend: 10.00, // ₹10 per share
    yield: 0.41,
    beta: 1.15,
    eps: 47.25, // Based on PE and price
    revenue: 9765410000000, // ₹9,76,541 Crores
    sector: 'Energy',
    industry: 'Oil & Gas Refining & Marketing',
    employees: 347000,
    founded: 1966,
    headquarters: 'Mumbai, India',
    website: 'www.ril.com',
    ceo: 'Mukesh D. Ambani',
    description: 'Reliance Industries Limited is committed to innovation-led, exponential growth in the areas of hydrocarbon exploration and production, petroleum refining and marketing, petrochemicals, retail and telecommunications. The company operates across energy, petrochemicals, oil & gas, telecom and retail segments.',
    priceData: [
      { date: 'Jan \'22', price: 2450.15, volume: 12000000 },
      { date: 'Jul \'22', price: 2280.50, volume: 15000000 },
      { date: 'Jan \'23', price: 2520.75, volume: 11000000 },
      { date: 'Jul \'23', price: 2680.30, volume: 9500000 },
      { date: 'Jan \'24', price: 2850.40, volume: 8800000 },
      { date: 'Sep \'24', price: 1357.20, volume: 8500000 }
    ],
    financials: {
      revenue: [
        { quarter: 'Q1 2024', value: 244350 }, 
        { quarter: 'Q2 2024', value: 238750 },
        { quarter: 'Q3 2024', value: 252850 },
        { quarter: 'Q4 2023', value: 240505 }
      ],
      profit: [
        { quarter: 'Q1 2024', value: 24662 }, 
        { quarter: 'Q2 2024', value: 22850 },
        { quarter: 'Q3 2024', value: 25475 },
        { quarter: 'Q4 2023', value: 21660 }
      ],
      cashFlow: [
        { quarter: 'Q1 2024', value: 28500 },
        { quarter: 'Q2 2024', value: 26850 },
        { quarter: 'Q3 2024', value: 29750 },
        { quarter: 'Q4 2023', value: 27200 }
      ]
    },
    keyMatrics: {
      roe: 8.79, 
      roa: 5.45,
      debtToEquity: 0.95,
      currentRatio: 1.35,
      quickRatio: 0.95,
      grossMargin: 28.50,
      operatingMargin: 15.20,
      netMargin: 9.70,
      evSales: 4.2,
      evEbitda: 12.8,
      sharesOut: 6.76,
      rev3Yr: 10.0, 
      rev5Yr: 12.5,
      rev10Yr: 15.8,
      dilEps3Yr: 8.5
    },
    estimates: {
      revenue: [
        { year: '2024 (A)', actual: 9765410, estimate: null, low: null, high: null },
        { year: '2025 (E)', actual: null, estimate: 10500000, low: 10200000, high: 10800000 },
        { year: '2026 (E)', actual: null, estimate: 11200000, low: 10800000, high: 11600000 },
        { year: '2027 (E)', actual: null, estimate: 11900000, low: 11400000, high: 12400000 },
        { year: '2028 (E)', actual: null, estimate: 12600000, low: 12000000, high: 13200000 }
      ],
      eps: [
        { year: '2024 (A)', actual: 47.25, estimate: null, low: null, high: null },
        { year: '2025 (E)', actual: null, estimate: 52.00, low: 50.00, high: 54.00 },
        { year: '2026 (E)', actual: null, estimate: 57.00, low: 54.00, high: 60.00 },
        { year: '2027 (E)', actual: null, estimate: 62.00, low: 58.00, high: 66.00 },
        { year: '2028 (E)', actual: null, estimate: 67.00, low: 62.00, high: 72.00 }
      ],
      ebitda: [
        { year: '2024 (A)', actual: 244350, estimate: null, low: null, high: null },
        { year: '2025 (E)', actual: null, estimate: 264000, low: 258000, high: 270000 },
        { year: '2026 (E)', actual: null, estimate: 283000, low: 275000, high: 291000 },
        { year: '2027 (E)', actual: null, estimate: 302000, low: 292000, high: 312000 },
        { year: '2028 (E)', actual: null, estimate: 321000, low: 309000, high: 333000 }
      ],
      priceTargets: [
        { analyst: 'Morgan Stanley', target: 1500, rating: 'Overweight', date: '2024-12-01' },
        { analyst: 'Goldman Sachs', target: 1450, rating: 'Buy', date: '2024-11-28' },
        { analyst: 'JP Morgan', target: 1400, rating: 'Overweight', date: '2024-11-25' },
        { analyst: 'Bank of America', target: 1350, rating: 'Buy', date: '2024-11-20' }
      ]
    },
    research: {
      analystReports: [
        { title: 'Reliance: Digital Transformation Drives Growth', analyst: 'Morgan Stanley', rating: 'Overweight', target: 1500, date: '2024-12-01', summary: 'Jio and retail segments showing strong growth momentum.' },
        { title: 'Petrochemicals Recovery', analyst: 'Goldman Sachs', rating: 'Buy', target: 1450, date: '2024-11-28', summary: 'Petrochemical margins improving with demand recovery.' },
        { title: '5G Rollout Accelerates', analyst: 'JP Morgan', rating: 'Overweight', target: 1400, date: '2024-11-25', summary: 'Jio 5G network expansion driving subscriber growth.' }
      ],
      news: [
        { title: 'Reliance Jio Reports Strong Q2 Results', source: 'Economic Times', date: '2024-12-01', sentiment: 'positive', summary: 'Jio subscriber base grows with 5G adoption accelerating.' },
        { title: 'Petrochemical Margins Under Pressure', source: 'Business Standard', date: '2024-11-28', sentiment: 'negative', summary: 'Global petrochemical demand slowdown impacts margins.' },
        { title: 'Reliance Retail Expands Footprint', source: 'Mint', date: '2024-11-25', sentiment: 'positive', summary: 'Retail segment continues aggressive expansion strategy.' }
      ],
      insights: [
        { category: 'Digital', insight: 'Jio 5G rollout driving ARPU growth', impact: 'high', date: '2024-12-01' },
        { category: 'Retail', insight: 'Omnichannel strategy gaining traction', impact: 'high', date: '2024-11-28' },
        { category: 'Petrochemicals', insight: 'New capacity coming online', impact: 'medium', date: '2024-11-25' }
      ]
    },
    ownership: {
      institutionalHoldings: [
        { institution: 'Life Insurance Corp', shares: 450000000, percentage: 6.7, change: 0.0, date: '2024-11-30' },
        { institution: 'HDFC Mutual Fund', shares: 180000000, percentage: 2.7, change: 0.1, date: '2024-11-30' },
        { institution: 'SBI Mutual Fund', shares: 150000000, percentage: 2.2, change: -0.1, date: '2024-11-30' },
        { institution: 'ICICI Prudential', shares: 120000000, percentage: 1.8, change: 0.2, date: '2024-11-30' }
      ],
      insiderTrading: [
        { insider: 'Mukesh Ambani', position: 'Chairman', transaction: 'buy', shares: 1000000, price: 1350.00, date: '2024-11-20' },
        { insider: 'Akash Ambani', position: 'Director', transaction: 'buy', shares: 500000, price: 1355.50, date: '2024-11-15' },
        { insider: 'Isha Ambani', position: 'Director', transaction: 'buy', shares: 500000, price: 1352.30, date: '2024-11-10' }
      ],
      ownershipStructure: {
        institutional: 45.2,
        insider: 47.3,
        public: 7.5
      }
    },
    industryAnalysis: {
      sector: 'Energy',
      industry: 'Oil & Gas Refining & Marketing',
      marketCap: 18366270000000,
      peers: [
        { symbol: 'ONGC', name: 'Oil & Natural Gas Corp', marketCap: 2500000000000, pe: 8.5, revenue: 1200000000000 },
        { symbol: 'IOC', name: 'Indian Oil Corporation', marketCap: 1200000000000, pe: 6.2, revenue: 800000000000 },
        { symbol: 'BPCL', name: 'Bharat Petroleum Corp', marketCap: 800000000000, pe: 7.8, revenue: 450000000000 },
        { symbol: 'HPCL', name: 'Hindustan Petroleum Corp', marketCap: 600000000000, pe: 9.1, revenue: 350000000000 }
      ],
      marketPosition: 'Market Leader',
      competitiveAdvantages: [
        'Integrated energy value chain',
        'Dominant position in telecom and retail',
        'Strong balance sheet and cash generation',
        'Strategic partnerships and acquisitions'
      ],
      risks: [
        'Oil price volatility',
        'Regulatory changes in telecom',
        'Competition in retail segment',
        'Environmental regulations'
      ]
    },
    dividends: {
      currentYield: 0.41,
      annualDividend: 10.00,
      dividendHistory: [
        { date: '2024-11-15', amount: 2.50, exDate: '2024-11-14', payDate: '2024-12-12' },
        { date: '2024-08-15', amount: 2.50, exDate: '2024-08-14', payDate: '2024-09-12' },
        { date: '2024-05-15', amount: 2.50, exDate: '2024-05-14', payDate: '2024-06-12' },
        { date: '2024-02-15', amount: 2.50, exDate: '2024-02-14', payDate: '2024-03-12' }
      ],
      payoutRatio: 21.2,
      dividendGrowth: 5.0,
      nextDividend: { amount: 2.50, exDate: '2025-02-14', payDate: '2025-03-12' }
    },
    modeling: {
      dcf: {
        wacc: 12.5,
        terminalGrowth: 4.0,
        fairValue: 1450.00,
        assumptions: [
          { metric: 'Revenue Growth', value: 8.0, description: 'Moderate growth across segments' },
          { metric: 'Operating Margin', value: 15.0, description: 'Stable margins with efficiency gains' },
          { metric: 'Tax Rate', value: 25.0, description: 'Effective tax rate' },
          { metric: 'CapEx/Revenue', value: 12.0, description: 'Capital expenditure as % of revenue' }
        ]
      },
      valuation: {
        pe: 28.76,
        pb: 2.8,
        ps: 1.9,
        evEbitda: 12.8,
        peg: 3.6
      },
      scenarios: [
        { scenario: 'Bull Case', probability: 30, targetPrice: 1650, description: 'Strong growth in digital and retail segments' },
        { scenario: 'Base Case', probability: 50, targetPrice: 1450, description: 'Steady growth across all segments' },
        { scenario: 'Bear Case', probability: 20, targetPrice: 1200, description: 'Oil price volatility and regulatory challenges' }
      ]
    },
    filings: {
      recentFilings: [
        { type: '10-Q', title: 'Quarterly Report Q1 2025', date: '2024-11-15', url: '#', summary: 'Strong performance across all business segments' },
        { type: '8-K', title: 'Current Report - Jio Partnership', date: '2024-11-10', url: '#', summary: 'Strategic partnership announcement for 5G expansion' },
        { type: '10-K', title: 'Annual Report 2024', date: '2024-08-15', url: '#', summary: 'Record annual revenue and profit growth' }
      ],
      earningsReports: [
        { quarter: 'Q1 2025', date: '2024-11-15', revenue: 244350, eps: 3.65, beat: true, summary: 'Beat estimates on strong petrochemical margins' },
        { quarter: 'Q4 2024', date: '2024-08-15', revenue: 238750, eps: 3.38, beat: false, summary: 'Missed on retail segment weakness' },
        { quarter: 'Q3 2024', date: '2024-05-15', revenue: 252850, eps: 3.77, beat: true, summary: 'Strong performance across all segments' }
      ],
      regulatoryDocuments: [
        { type: 'SEBI', title: 'Insider Trading Investigation', date: '2024-11-20', status: 'Ongoing', summary: 'SEBI reviewing insider trading compliance' },
        { type: 'TRAI', title: 'Telecom License Renewal', date: '2024-10-15', status: 'Resolved', summary: 'Jio telecom license renewal completed' }
      ]
    }
  }
];