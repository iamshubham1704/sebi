// components/tabs/ResearchTab.tsx
import React, { useState } from 'react';
import { Stock } from '../../types';

interface ResearchTabProps {
  stock: Stock;
}

const ResearchTab: React.FC<ResearchTabProps> = ({ stock }) => {
  const [activeSection, setActiveSection] = useState('reports');

  const sections = [
    { key: 'reports', label: 'Analyst Reports', icon: '📊' },
    { key: 'news', label: 'News & Updates', icon: '📰' },
    { key: 'insights', label: 'Key Insights', icon: '💡' }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-emerald-400 bg-emerald-500/10';
      case 'negative': return 'text-red-400 bg-red-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-500/10';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'low': return 'text-green-400 bg-green-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating.toLowerCase()) {
      case 'buy':
      case 'overweight': return 'text-emerald-400 bg-emerald-500/10';
      case 'hold':
      case 'neutral': return 'text-yellow-400 bg-yellow-500/10';
      case 'sell':
      case 'underweight': return 'text-red-400 bg-red-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Research & Analysis</h3>
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

      {/* Analyst Reports */}
      {activeSection === 'reports' && (
        <div className="space-y-4">
          {stock.research.analystReports.map((report, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2">{report.title}</h4>
                  <p className="text-gray-400 text-sm mb-3">{report.summary}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-400">Analyst: <span className="text-white">{report.analyst}</span></span>
                    <span className="text-gray-400">Date: <span className="text-white">{report.date}</span></span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRatingColor(report.rating)}`}>
                    {report.rating}
                  </span>
                  <div className="text-2xl font-bold text-emerald-400">${report.target}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* News & Updates */}
      {activeSection === 'news' && (
        <div className="space-y-4">
          {stock.research.news.map((article, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2">{article.title}</h4>
                  <p className="text-gray-400 text-sm mb-3">{article.summary}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-400">Source: <span className="text-white">{article.source}</span></span>
                    <span className="text-gray-400">Date: <span className="text-white">{article.date}</span></span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSentimentColor(article.sentiment)}`}>
                  {article.sentiment}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Key Insights */}
      {activeSection === 'insights' && (
        <div className="space-y-4">
          {stock.research.insights.map((insight, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/10 text-blue-400">
                      {insight.category}
                    </span>
                    <span className="text-gray-400 text-sm">{insight.date}</span>
                  </div>
                  <p className="text-white text-sm">{insight.insight}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                  {insight.impact} impact
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Research Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Analyst Reports</div>
            <div className="text-2xl font-bold text-white">{stock.research.analystReports.length}</div>
            <div className="text-gray-400 text-xs">Active coverage</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Recent News</div>
            <div className="text-2xl font-bold text-white">{stock.research.news.length}</div>
            <div className="text-gray-400 text-xs">Last 30 days</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Key Insights</div>
            <div className="text-2xl font-bold text-white">{stock.research.insights.length}</div>
            <div className="text-gray-400 text-xs">Critical factors</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchTab;

