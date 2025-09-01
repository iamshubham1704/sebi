// components/tabs/OwnershipTab.tsx
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Stock } from '../../types';

interface OwnershipTabProps {
  stock: Stock;
}

const OwnershipTab: React.FC<OwnershipTabProps> = ({ stock }) => {
  const [activeSection, setActiveSection] = useState('structure');

  const sections = [
    { key: 'structure', label: 'Ownership Structure', icon: '🏗️' },
    { key: 'institutional', label: 'Institutional Holdings', icon: '🏛️' },
    { key: 'insider', label: 'Insider Trading', icon: '👤' }
  ];

  const ownershipData = [
    { name: 'Institutional', value: stock.ownership.ownershipStructure.institutional, color: '#10B981' },
    { name: 'Insider', value: stock.ownership.ownershipStructure.insider, color: '#3B82F6' },
    { name: 'Public', value: stock.ownership.ownershipStructure.public, color: '#F59E0B' }
  ];

  const institutionalData = stock.ownership.institutionalHoldings.map(holding => ({
    name: holding.institution,
    percentage: holding.percentage,
    change: holding.change
  }));

  const formatShares = (shares: number) => {
    if (shares >= 1000000000) {
      return `${(shares / 1000000000).toFixed(1)}B`;
    } else if (shares >= 1000000) {
      return `${(shares / 1000000).toFixed(1)}M`;
    } else if (shares >= 1000) {
      return `${(shares / 1000).toFixed(1)}K`;
    }
    return shares.toString();
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Ownership Analysis</h3>
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

      {/* Ownership Structure */}
      {activeSection === 'structure' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Ownership Distribution</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ownershipData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {ownershipData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F3F4F6'
                    }}
                    formatter={(value: any) => [`${value}%`, 'Ownership']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Ownership Breakdown</h4>
            <div className="space-y-4">
              {ownershipData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-white font-medium">{item.name}</span>
                  </div>
                  <span className="text-emerald-400 font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Institutional Holdings */}
      {activeSection === 'institutional' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Top Institutional Holders</h4>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={institutionalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F3F4F6'
                    }}
                    formatter={(value: any) => [`${value}%`, 'Ownership']}
                  />
                  <Bar dataKey="percentage" fill="#10B981" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-gray-400 font-medium pb-3">Institution</th>
                    <th className="text-left text-gray-400 font-medium pb-3">Shares</th>
                    <th className="text-left text-gray-400 font-medium pb-3">Percentage</th>
                    <th className="text-left text-gray-400 font-medium pb-3">Change</th>
                    <th className="text-left text-gray-400 font-medium pb-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stock.ownership.institutionalHoldings.map((holding, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-3 text-white font-medium">{holding.institution}</td>
                      <td className="py-3 text-white">{formatShares(holding.shares)}</td>
                      <td className="py-3 text-emerald-400">{holding.percentage}%</td>
                      <td className="py-3">
                        <span className={holding.change >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                          {holding.change >= 0 ? '+' : ''}{holding.change}%
                        </span>
                      </td>
                      <td className="py-3 text-gray-400">{holding.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Insider Trading */}
      {activeSection === 'insider' && (
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h4 className="text-lg font-semibold text-white mb-4">Recent Insider Trading</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 font-medium pb-3">Insider</th>
                  <th className="text-left text-gray-400 font-medium pb-3">Position</th>
                  <th className="text-left text-gray-400 font-medium pb-3">Transaction</th>
                  <th className="text-left text-gray-400 font-medium pb-3">Shares</th>
                  <th className="text-left text-gray-400 font-medium pb-3">Price</th>
                  <th className="text-left text-gray-400 font-medium pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {stock.ownership.insiderTrading.map((trade, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-3 text-white font-medium">{trade.insider}</td>
                    <td className="py-3 text-gray-400">{trade.position}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        trade.transaction === 'buy' 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        {trade.transaction.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-white">{formatShares(trade.shares)}</td>
                    <td className="py-3 text-white">{formatPrice(trade.price)}</td>
                    <td className="py-3 text-gray-400">{trade.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Ownership Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Institutional Ownership</div>
            <div className="text-2xl font-bold text-emerald-400">{stock.ownership.ownershipStructure.institutional}%</div>
            <div className="text-gray-400 text-xs">Major holders</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Insider Ownership</div>
            <div className="text-2xl font-bold text-blue-400">{stock.ownership.ownershipStructure.insider}%</div>
            <div className="text-gray-400 text-xs">Management & insiders</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Public Float</div>
            <div className="text-2xl font-bold text-yellow-400">{stock.ownership.ownershipStructure.public}%</div>
            <div className="text-gray-400 text-xs">Retail investors</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnershipTab;

