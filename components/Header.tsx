// components/Header.tsx
import React from 'react';
import { Search, Bell, DollarSign, BarChart3 } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">ANNA AI</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for companies or prompt Copilot"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-white">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-700 rounded-lg">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-white text-sm">$</span>
            </div>
            <button className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">
              UPGRADE
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;