// components/tabs/FinancialsTab.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Stock } from '../../types';
import { formatPercentage } from '../../utils/formatting';

interface FinancialsTabProps {
  stock: Stock;
}

const FinancialsTab: React.FC<FinancialsTabProps> = ({ stock }) => {
  return (
    <div className="space-y-6">
      {/* Revenue Chart */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Quarterly Revenue</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stock.financials.revenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="quarter" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
                formatter={(value) => [`$${value}M`, 'Revenue']}
              />
              <Bar dataKey="value" fill="#10B981" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Financial Metrics Grid */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Profitability</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">ROE</span>
              <span className="text-emerald-400 text-sm">{formatPercentage(stock.keyMatrics.roe)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">ROA</span>
              <span className="text-emerald-400 text-sm">{formatPercentage(stock.keyMatrics.roa)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Gross Margin</span>
              <span className="text-white text-sm">{formatPercentage(stock.keyMatrics.grossMargin)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Operating Margin</span>
              <span className="text-white text-sm">{formatPercentage(stock.keyMatrics.operatingMargin)}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Liquidity</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Current Ratio</span>
              <span className="text-white text-sm">{stock.keyMatrics.currentRatio.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Quick Ratio</span>
              <span className="text-white text-sm">{stock.keyMatrics.quickRatio.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Debt/Equity</span>
              <span className="text-white text-sm">{stock.keyMatrics.debtToEquity.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialsTab;