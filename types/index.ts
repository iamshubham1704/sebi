export interface Stock{
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    afterHoursPrice: number;
    afterHoursChange: number;
    afterHoursPercent: number;
    marketCap: number;
    volume: number;
    pe: number;
    pb: number;
    dividend: number;
    yield: number;
    beta: number;
    eps: number;
    revenue: number;
    sector: string;
    industry: string;
    employees: number;
    founded: number;
    headquarters: string;
    website: string;
    ceo: string;
    description: string;
    priceData: Array<{date: string; price: number; volume: number}>;
    financials: {
        revenue: Array<{quarter: string; value: number}>;
        profit: Array<{quarter: string; value: number}>;
        cashFlow: Array<{quarter: string; value: number}>;
    };
    keyMatrics: {
        roe : number;
        roa : number;
        debtToEquity : number;
        currentRatio: number;
        quickRatio: number;
        grossMargin: number;
        operatingMargin: number;
        netMargin: number;
        evSales: number;
        evEbitda: number;
        sharesOut: number;
        rev3Yr: number;
        rev5Yr: number;
        rev10Yr: number;
        dilEps3Yr: number;
    };
    estimates: {
        revenue: Array<{year: string; actual: number | null; estimate: number | null; low: number | null; high: number | null}>;
        eps: Array<{year: string; actual: number | null; estimate: number | null; low: number | null; high: number | null}>;
        ebitda: Array<{year: string; actual: number | null; estimate: number | null; low: number | null; high: number | null}>;
        priceTargets: Array<{analyst: string; target: number; rating: string; date: string}>;
    };
    research: {
        analystReports: Array<{title: string; analyst: string; rating: string; target: number; date: string; summary: string}>;
        news: Array<{title: string; source: string; date: string; sentiment: 'positive' | 'negative' | 'neutral'; summary: string}>;
        insights: Array<{category: string; insight: string; impact: 'high' | 'medium' | 'low'; date: string}>;
    };
    ownership: {
        institutionalHoldings: Array<{institution: string; shares: number; percentage: number; change: number; date: string}>;
        insiderTrading: Array<{insider: string; position: string; transaction: 'buy' | 'sell'; shares: number; price: number; date: string}>;
        ownershipStructure: {
            institutional: number;
            insider: number;
            public: number;
        };
    };
    industryAnalysis: {
        sector: string;
        industry: string;
        marketCap: number;
        peers: Array<{symbol: string; name: string; marketCap: number; pe: number; revenue: number}>;
        marketPosition: string;
        competitiveAdvantages: string[];
        risks: string[];
    };
    dividends: {
        currentYield: number;
        annualDividend: number;
        dividendHistory: Array<{date: string; amount: number; exDate: string; payDate: string}>;
        payoutRatio: number;
        dividendGrowth: number;
        nextDividend: {amount: number; exDate: string; payDate: string};
    };
    modeling: {
        dcf: {
            wacc: number;
            terminalGrowth: number;
            fairValue: number;
            assumptions: Array<{metric: string; value: number; description: string}>;
        };
        valuation: {
            pe: number;
            pb: number;
            ps: number;
            evEbitda: number;
            peg: number;
        };
        scenarios: Array<{scenario: string; probability: number; targetPrice: number; description: string}>;
    };
    filings: {
        recentFilings: Array<{type: string; title: string; date: string; url: string; summary: string}>;
        earningsReports: Array<{quarter: string; date: string; revenue: number; eps: number; beat: boolean; summary: string}>;
        regulatoryDocuments: Array<{type: string; title: string; date: string; status: string; summary: string}>;
    };
}