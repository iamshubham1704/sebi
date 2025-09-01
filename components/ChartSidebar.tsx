// components/ChartSidebar.tsx
import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Search, ChevronDown, Maximize2, Download } from 'lucide-react';
import { Stock } from '../types';
import { formatNumber, formatPercentage } from '../utils/formatting';

interface ChartSidebarProps {
  stock: Stock;
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
  stocks: Stock[];
  onStockChange: (stock: Stock) => void;
}

const ChartSidebar: React.FC<ChartSidebarProps> = ({ 
  stock, 
  timeframe, 
  setTimeframe, 
  stocks, 
  onStockChange 
}) => {
  return (
    <div className="w-96">
      <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700 sticky top-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <div className="px-2 py-1 bg-emerald-500 text-white text-xs rounded-lg">
              NASDAQ:GS-{stock.symbol} ✕
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">Price</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
            <button className="p-1 text-gray-400 hover:text-white">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-1 mb-4">
          {['5D', '1M', '3M', '6M', 'YTD', '1Y', '3Y', '5Y', 'MAX'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                timeframe === period
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        <div className="relative mb-4">
          <div className="absolute top-4 right-4 z-10 bg-gray-700 px-3 py-2 rounded-lg">
            <div className="text-white font-bold">NASDAQ:GS-{stock.symbol}</div>
            <div className="text-2xl font-bold text-white">${stock.price.toFixed(2)}</div>
            <div className={`text-sm ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} ({formatPercentage(stock.changePercent)})
            </div>
            <div className="text-xs text-gray-400">After Hours ${stock.afterHoursPrice.toFixed(2)} ${stock.afterHoursChange >= 0 ? '+' : ''}${stock.afterHoursChange.toFixed(2)}({formatPercentage(stock.afterHoursPercent)})</div>
          </div>
          
          <div className="h-64 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-lg relative overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stock.priceData}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#10B981" 
                  strokeWidth={2} 
                  fill="url(#priceGradient)" 
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="absolute bottom-4 left-4 text-xs text-gray-400 space-x-6">
              <span>Jan '22</span>
              <span className="ml-8">Jul '22</span>
              <span className="ml-8">Jan '23</span>
              <span className="ml-8">Jul '23</span>
              <span className="ml-8">Jan '24</span>
            </div>
            <div className="absolute bottom-0 right-4 text-right">
              <div className="text-emerald-400 text-xl font-bold">$520.95</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>

        <div className="mt-6">
          <h4 className="text-white font-semibold mb-3">Quick Stats</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Market Cap</span>
              <span className="text-white text-sm">{formatNumber(stock.marketCap)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Volume</span>
              <span className="text-white text-sm">{(stock.volume / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">P/E Ratio</span>
              <span className="text-white text-sm">{stock.pe}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">EPS</span>
              <span className="text-white text-sm">${stock.eps.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Beta</span>
              <span className="text-white text-sm">{stock.beta}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700">
          <h4 className="text-white font-semibold mb-3">Switch Stock</h4>
          <div className="space-y-2">
            {stocks.map((stockItem) => (
              <button
                key={stockItem.symbol}
                onClick={() => onStockChange(stockItem)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  stock.symbol === stockItem.symbol
                    ? 'bg-emerald-500/20 border border-emerald-500/30'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-white">{stockItem.symbol}</div>
                    <div className="text-xs text-gray-400">{stockItem.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-white">${stockItem.price.toFixed(2)}</div>
                    <div className={`text-xs ${
                      stockItem.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {stockItem.change >= 0 ? '+' : ''}{formatPercentage(stockItem.changePercent)}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSidebar;