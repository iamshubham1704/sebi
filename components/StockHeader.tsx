// components/StockHeader.tsx
import React from 'react';
import { Bookmark, Edit3 } from 'lucide-react';
import { Stock } from '../types';
import { formatPercentage } from '../utils/formatting';

interface StockHeaderProps {
  stock: Stock;
}

const StockHeader: React.FC<StockHeaderProps> = ({ stock }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">
          {stock.symbol === 'MSFT' ? '⊞' : ''}
          {stock.symbol === 'AAPL' ? '' : ''}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">{stock.name}</h1>
          <button className="p-1 text-gray-400 hover:text-white">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="p-1 text-gray-400 hover:text-white">
            <Edit3 className="w-5 h-5" />
          </button>
        </div>
        <div className="text-gray-400 text-sm">NASDAQ:GS-{stock.symbol}</div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-3xl font-bold text-white">${stock.price.toFixed(2)}</div>
            <div className={`flex items-center justify-end gap-1 ${
              stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              <span className="text-lg font-semibold">
                {stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}
              </span>
              <span className="px-2 py-1 rounded text-sm">
                ({stock.change >= 0 ? '+' : ''}{formatPercentage(stock.changePercent)})
              </span>
            </div>
          </div>
          <div className="text-right text-sm">
            <div className="text-gray-400">After Hours</div>
            <div className="text-white">${stock.afterHoursPrice.toFixed(2)}</div>
            <div className={`${stock.afterHoursChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              ${stock.afterHoursChange.toFixed(2)}({formatPercentage(stock.afterHoursPercent)})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockHeader;