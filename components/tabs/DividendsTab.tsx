// components/tabs/DividendsTab.tsx
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Stock } from '../../types';

interface DividendsTabProps {
  stock: Stock;
}

const DividendsTab: React.FC<DividendsTabProps> = ({ stock }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { key: 'overview', label: 'Dividend Overview', icon: '💰' },
    { key: 'history', label: 'Dividend History', icon: '📈' },
    { key: 'analysis', label: 'Yield Analysis', icon: '📊' }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const dividendHistoryData = stock.dividends.dividendHistory.map(dividend => ({
    date: dividend.date,
    amount: dividend.amount,
    exDate: dividend.exDate,
    payDate: dividend.payDate
  }));

  const dividendGrowthData = stock.dividends.dividendHistory.map((dividend, index) => {
    const prevDividend = index > 0 ? stock.dividends.dividendHistory[index - 1] : null;
    const growth = prevDividend ? ((dividend.amount - prevDividend.amount) / prevDividend.amount) * 100 : 0;
    
    return {
      date: dividend.date,
      amount: dividend.amount,
      growth: growth
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Dividend Analysis</h3>
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

      {/* Dividend Overview */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Current Dividend Information</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Yield</span>
                  <span className="text-emerald-400 font-bold text-xl">{stock.dividends.currentYield}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Annual Dividend</span>
                  <span className="text-white font-bold text-xl">${stock.dividends.annualDividend.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payout Ratio</span>
                  <span className="text-blue-400 font-bold">{stock.dividends.payoutRatio}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Dividend Growth</span>
                  <span className="text-green-400 font-bold">{stock.dividends.dividendGrowth}%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Next Dividend</h4>
              <div className="space-y-4">
                <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <div className="text-emerald-400 font-medium mb-2">Amount</div>
                  <div className="text-white text-2xl font-bold">${stock.dividends.nextDividend.amount.toFixed(2)}</div>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-blue-400 font-medium mb-2">Ex-Dividend Date</div>
                  <div className="text-white text-lg font-bold">{formatDate(stock.dividends.nextDividend.exDate)}</div>
                </div>
                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="text-yellow-400 font-medium mb-2">Payment Date</div>
                  <div className="text-white text-lg font-bold">{formatDate(stock.dividends.nextDividend.payDate)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Dividend Sustainability</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Payout Ratio</div>
                <div className="text-2xl font-bold text-white">{stock.dividends.payoutRatio}%</div>
                <div className={`text-xs ${stock.dividends.payoutRatio < 50 ? 'text-green-400' : stock.dividends.payoutRatio < 80 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {stock.dividends.payoutRatio < 50 ? 'Sustainable' : stock.dividends.payoutRatio < 80 ? 'Moderate' : 'High Risk'}
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Growth Rate</div>
                <div className="text-2xl font-bold text-emerald-400">{stock.dividends.dividendGrowth}%</div>
                <div className="text-gray-400 text-xs">Annual growth</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Current Yield</div>
                <div className="text-2xl font-bold text-blue-400">{stock.dividends.currentYield}%</div>
                <div className="text-gray-400 text-xs">vs market</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dividend History */}
      {activeSection === 'history' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Dividend History Chart</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dividendHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F3F4F6'
                    }}
                    formatter={(value: any) => [`$${value}`, 'Dividend']}
                    labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Dividend History Table</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-gray-400 font-medium pb-3">Date</th>
                    <th className="text-left text-gray-400 font-medium pb-3">Amount</th>
                    <th className="text-left text-gray-400 font-medium pb-3">Ex-Date</th>
                    <th className="text-left text-gray-400 font-medium pb-3">Pay Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stock.dividends.dividendHistory.map((dividend, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-3 text-white font-medium">{formatDate(dividend.date)}</td>
                      <td className="py-3 text-emerald-400 font-bold">${dividend.amount.toFixed(2)}</td>
                      <td className="py-3 text-gray-400">{formatDate(dividend.exDate)}</td>
                      <td className="py-3 text-gray-400">{formatDate(dividend.payDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Yield Analysis */}
      {activeSection === 'analysis' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Dividend Growth Analysis</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dividendGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
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
                    formatter={(value: any) => [`${value}%`, 'Growth']}
                    labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  />
                  <Bar dataKey="growth" fill="#3B82F6" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Dividend Metrics</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Yield</span>
                  <span className="text-emerald-400 font-bold">{stock.dividends.currentYield}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">5-Year Growth</span>
                  <span className="text-green-400 font-bold">{stock.dividends.dividendGrowth}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Payout Ratio</span>
                  <span className="text-blue-400 font-bold">{stock.dividends.payoutRatio}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Annual Dividend</span>
                  <span className="text-white font-bold">${stock.dividends.annualDividend.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Dividend Quality Score</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Sustainability</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${stock.dividends.payoutRatio < 50 ? 'bg-green-400' : stock.dividends.payoutRatio < 80 ? 'bg-yellow-400' : 'bg-red-400'}`}
                        style={{ width: `${Math.max(0, 100 - stock.dividends.payoutRatio)}%` }}
                      />
                    </div>
                    <span className="text-white text-sm">{Math.max(0, 100 - stock.dividends.payoutRatio)}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Growth</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-green-400"
                        style={{ width: `${Math.min(100, stock.dividends.dividendGrowth * 5)}%` }}
                      />
                    </div>
                    <span className="text-white text-sm">{stock.dividends.dividendGrowth}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Consistency</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div className="h-2 rounded-full bg-blue-400" style={{ width: '85%' }} />
                    </div>
                    <span className="text-white text-sm">85%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Dividend Summary</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Current Yield</div>
            <div className="text-2xl font-bold text-emerald-400">{stock.dividends.currentYield}%</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Annual Dividend</div>
            <div className="text-2xl font-bold text-white">${stock.dividends.annualDividend.toFixed(2)}</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Payout Ratio</div>
            <div className="text-2xl font-bold text-blue-400">{stock.dividends.payoutRatio}%</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Growth Rate</div>
            <div className="text-2xl font-bold text-green-400">{stock.dividends.dividendGrowth}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DividendsTab;

