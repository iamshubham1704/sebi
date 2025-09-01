// components/tabs/OverviewTab.tsx
import React from 'react';
import { Stock } from '../types/index'
import { formatNumber, formatPercentage } from '../utils/formatting';

interface OverviewTabProps {
  stock: Stock;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ stock }) => {
  return (
    <div className="space-y-6">
      {/* Company Overview */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Company Overview</h2>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {stock.description}
        </p>
        <button className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors">
          Show more
        </button>
        
        <div className="grid grid-cols-2 gap-8 mt-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Name</span>
              <span className="text-white text-sm">{stock.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">CEO</span>
              <span className="text-white text-sm">{stock.ceo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Website</span>
              <span className="text-white text-sm">{stock.website}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Sector</span>
              <span className="text-white text-sm">{stock.sector}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Year Founded</span>
              <span className="text-white text-sm">{stock.founded}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Company Statistics */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-6">Company Statistics</h2>
        
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-gray-400 text-sm mb-4">Profile</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Market Cap</span>
                <span className="text-white text-sm">{formatNumber(stock.marketCap)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">EV</span>
                <span className="text-white text-sm">{formatNumber(stock.marketCap * 1.05)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Shares Out</span>
                <span className="text-white text-sm">{stock.keyMatrics.sharesOut}B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Revenue</span>
                <span className="text-white text-sm">{formatNumber(stock.revenue)}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-gray-400 text-sm mb-4">Valuation (TTM)</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">P/E</span>
                <span className="text-white text-sm">{stock.pe}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">P/B</span>
                <span className="text-white text-sm">{stock.pb}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">EV/Sales</span>
                <span className="text-white text-sm">{stock.keyMatrics.evSales}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">EV/EBITDA</span>
                <span className="text-white text-sm">{stock.keyMatrics.evEbitda}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-gray-400 text-sm mb-4">Growth (CAGR)</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Rev 3Yr</span>
                <span className="text-white text-sm">{formatPercentage(stock.keyMatrics.rev3Yr)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Rev 5Yr</span>
                <span className="text-white text-sm">{formatPercentage(stock.keyMatrics.rev5Yr)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Rev 10Yr</span>
                <span className="text-white text-sm">{formatPercentage(stock.keyMatrics.rev10Yr)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Dil EPS 3Yr</span>
                <span className="text-white text-sm">{formatPercentage(stock.keyMatrics.dilEps3Yr)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;