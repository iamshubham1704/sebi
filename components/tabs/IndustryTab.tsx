// components/tabs/IndustryTab.tsx
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { Stock } from '../../types';

interface IndustryTabProps {
  stock: Stock;
}

const IndustryTab: React.FC<IndustryTabProps> = ({ stock }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { key: 'overview', label: 'Industry Overview', icon: '🏭' },
    { key: 'peers', label: 'Peer Comparison', icon: '📊' },
    { key: 'position', label: 'Market Position', icon: '🎯' }
  ];

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000000000) {
      return `$${(marketCap / 1000000000000).toFixed(1)}T`;
    } else if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(1)}B`;
    } else if (marketCap >= 1000000) {
      return `$${(marketCap / 1000000).toFixed(1)}M`;
    }
    return `$${marketCap}`;
  };

  const formatRevenue = (revenue: number) => {
    if (revenue >= 1000000000000) {
      return `$${(revenue / 1000000000000).toFixed(1)}T`;
    } else if (revenue >= 1000000000) {
      return `$${(revenue / 1000000000).toFixed(1)}B`;
    } else if (revenue >= 1000000) {
      return `$${(revenue / 1000000).toFixed(1)}M`;
    }
    return `$${revenue}`;
  };

  const peerData = stock.industryAnalysis.peers.map(peer => ({
    name: peer.symbol,
    marketCap: peer.marketCap / 1000000000, // Convert to billions for chart
    pe: peer.pe,
    revenue: peer.revenue / 1000000000 // Convert to billions for chart
  }));

  const marketCapData = stock.industryAnalysis.peers.map(peer => ({
    name: peer.symbol,
    value: peer.marketCap / 1000000000
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Industry Analysis</h3>
          <div className="flex gap-2">
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeSection === section.key
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Industry Overview */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Industry Information</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Sector</span>
                  <span className="text-white font-medium">{stock.industryAnalysis.sector}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Industry</span>
                  <span className="text-white font-medium">{stock.industryAnalysis.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Market Cap</span>
                  <span className="text-emerald-400 font-bold">{formatMarketCap(stock.industryAnalysis.marketCap)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Market Position</span>
                  <span className="text-blue-400 font-medium">{stock.industryAnalysis.marketPosition}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Competitive Advantages</h4>
              <div className="space-y-3">
                {stock.industryAnalysis.competitiveAdvantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Key Risks</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stock.industryAnalysis.risks.map((risk, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{risk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Peer Comparison */}
      {activeSection === 'peers' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Market Cap Comparison</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketCapData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    tickFormatter={(value) => `$${value}B`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F3F4F6'
                    }}
                    formatter={(value: any) => [`$${value}B`, 'Market Cap']}
                  />
                  <Bar dataKey="value" fill="#10B981" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Peer Comparison Table</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-gray-400 font-medium pb-3">Company</th>
                    <th className="text-left text-gray-400 font-medium pb-3">Market Cap</th>
                    <th className="text-left text-gray-400 font-medium pb-3">P/E Ratio</th>
                    <th className="text-left text-gray-400 font-medium pb-3">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {stock.industryAnalysis.peers.map((peer, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-3">
                        <div>
                          <div className="text-white font-medium">{peer.symbol}</div>
                          <div className="text-gray-400 text-xs">{peer.name}</div>
                        </div>
                      </td>
                      <td className="py-3 text-emerald-400 font-medium">{formatMarketCap(peer.marketCap)}</td>
                      <td className="py-3 text-white">{peer.pe.toFixed(1)}</td>
                      <td className="py-3 text-white">{formatRevenue(peer.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Market Position */}
      {activeSection === 'position' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Market Position Analysis</h4>
              <div className="space-y-4">
                <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <div className="text-emerald-400 font-medium mb-2">Market Position</div>
                  <div className="text-white text-lg font-bold">{stock.industryAnalysis.marketPosition}</div>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-blue-400 font-medium mb-2">Market Cap</div>
                  <div className="text-white text-lg font-bold">{formatMarketCap(stock.industryAnalysis.marketCap)}</div>
                </div>
                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="text-yellow-400 font-medium mb-2">Industry</div>
                  <div className="text-white text-lg font-bold">{stock.industryAnalysis.industry}</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Competitive Landscape</h4>
              <div className="space-y-3">
                <div className="text-gray-400 text-sm mb-3">Key Competitors:</div>
                {stock.industryAnalysis.peers.slice(0, 3).map((peer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div>
                      <div className="text-white font-medium">{peer.symbol}</div>
                      <div className="text-gray-400 text-xs">{peer.name}</div>
                    </div>
                    <div className="text-emerald-400 font-medium">{formatMarketCap(peer.marketCap)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Strategic Position</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-emerald-400 font-medium mb-3">Strengths</h5>
                <div className="space-y-2">
                  {stock.industryAnalysis.competitiveAdvantages.slice(0, 3).map((advantage, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-red-400 font-medium mb-3">Challenges</h5>
                <div className="space-y-2">
                  {stock.industryAnalysis.risks.slice(0, 3).map((risk, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Industry Summary</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Sector</div>
            <div className="text-lg font-bold text-white">{stock.industryAnalysis.sector}</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Market Position</div>
            <div className="text-lg font-bold text-emerald-400">{stock.industryAnalysis.marketPosition}</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Competitors</div>
            <div className="text-lg font-bold text-blue-400">{stock.industryAnalysis.peers.length}</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Key Risks</div>
            <div className="text-lg font-bold text-red-400">{stock.industryAnalysis.risks.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryTab;
