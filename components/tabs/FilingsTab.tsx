// components/tabs/FilingsTab.tsx
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Stock } from '../../types';

interface FilingsTabProps {
  stock: Stock;
}

const FilingsTab: React.FC<FilingsTabProps> = ({ stock }) => {
  const [activeSection, setActiveSection] = useState('filings');

  const sections = [
    { key: 'filings', label: 'Recent Filings', icon: '📄' },
    { key: 'earnings', label: 'Earnings Reports', icon: '📊' },
    { key: 'regulatory', label: 'Regulatory', icon: '⚖️' }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatRevenue = (revenue: number) => {
    if (revenue >= 1000000) {
      return `$${(revenue / 1000000).toFixed(0)}M`;
    }
    return `$${revenue}`;
  };

  const earningsData = stock.filings.earningsReports.map(report => ({
    quarter: report.quarter,
    revenue: report.revenue / 1000, // Convert to thousands for chart
    eps: report.eps,
    beat: report.beat
  }));

  const getFilingTypeColor = (type: string) => {
    switch (type) {
      case '10-K': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case '10-Q': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case '8-K': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved': return 'bg-green-500/10 text-green-400';
      case 'ongoing': return 'bg-yellow-500/10 text-yellow-400';
      case 'pending': return 'bg-blue-500/10 text-blue-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Filings & Reports</h3>
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

      {/* Recent Filings */}
      {activeSection === 'filings' && (
        <div className="space-y-4">
          {stock.filings.recentFilings.map((filing, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getFilingTypeColor(filing.type)}`}>
                      {filing.type}
                    </span>
                    <span className="text-gray-400 text-sm">{formatDate(filing.date)}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{filing.title}</h4>
                  <p className="text-gray-400 text-sm mb-3">{filing.summary}</p>
                </div>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  View Filing
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Earnings Reports */}
      {activeSection === 'earnings' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Earnings Performance</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="quarter" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    tickFormatter={(value) => `$${value}K`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F3F4F6'
                    }}
                    formatter={(value: any) => [`$${value}K`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#10B981" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Earnings History</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-gray-400 font-medium pb-3">Quarter</th>
                    <th className="text-left text-gray-400 font-medium pb-3">Date</th>
                    <th className="text-left text-gray-400 font-medium pb-3">Revenue</th>
                    <th className="text-left text-gray-400 font-medium pb-3">EPS</th>
                    <th className="text-left text-gray-400 font-medium pb-3">Beat/Miss</th>
                    <th className="text-left text-gray-400 font-medium pb-3">Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {stock.filings.earningsReports.map((report, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-3 text-white font-medium">{report.quarter}</td>
                      <td className="py-3 text-gray-400">{formatDate(report.date)}</td>
                      <td className="py-3 text-white">{formatRevenue(report.revenue)}</td>
                      <td className="py-3 text-white">${report.eps.toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          report.beat 
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : 'bg-red-500/10 text-red-400'
                        }`}>
                          {report.beat ? 'Beat' : 'Miss'}
                        </span>
                      </td>
                      <td className="py-3 text-gray-400 text-xs max-w-xs truncate">{report.summary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Regulatory Documents */}
      {activeSection === 'regulatory' && (
        <div className="space-y-4">
          {stock.filings.regulatoryDocuments.map((document, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {document.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                      {document.status}
                    </span>
                    <span className="text-gray-400 text-sm">{formatDate(document.date)}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{document.title}</h4>
                  <p className="text-gray-400 text-sm">{document.summary}</p>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  View Document
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filing Calendar */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Upcoming Filing Calendar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-2">Next Earnings</div>
            <div className="text-white font-bold mb-1">Q2 2025</div>
            <div className="text-gray-400 text-sm">Expected: Feb 15, 2025</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-2">Annual Report</div>
            <div className="text-white font-bold mb-1">10-K Filing</div>
            <div className="text-gray-400 text-sm">Expected: Mar 1, 2025</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-2">Proxy Statement</div>
            <div className="text-white font-bold mb-1">DEF 14A</div>
            <div className="text-gray-400 text-sm">Expected: Apr 15, 2025</div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Filing Summary</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Recent Filings</div>
            <div className="text-2xl font-bold text-white">{stock.filings.recentFilings.length}</div>
            <div className="text-gray-400 text-xs">Last 12 months</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Earnings Reports</div>
            <div className="text-2xl font-bold text-emerald-400">{stock.filings.earningsReports.length}</div>
            <div className="text-gray-400 text-xs">Recent quarters</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Beat Rate</div>
            <div className="text-2xl font-bold text-green-400">
              {Math.round((stock.filings.earningsReports.filter(r => r.beat).length / stock.filings.earningsReports.length) * 100)}%
            </div>
            <div className="text-gray-400 text-xs">Earnings beats</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Regulatory Items</div>
            <div className="text-2xl font-bold text-blue-400">{stock.filings.regulatoryDocuments.length}</div>
            <div className="text-gray-400 text-xs">Active items</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilingsTab;
