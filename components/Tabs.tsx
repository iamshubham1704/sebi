// components/Tabs.tsx
import React from 'react';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    'Overview', 'Financials', 'Investor Relations', 'Research', 
    'Estimates', 'Ownership', 'Industry', 'Dividends', 'Modeling', 'Filings'
  ];

  return (
    <div className="mb-6">
      <div className="border-b border-gray-700">
        <nav className="flex gap-8">
          {tabs.map((tab) => {
            const tabId = tab.toLowerCase().replace(' ', '');
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tabId)}
                className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tabId || (tabId === 'overview' && activeTab === 'overview')
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Tabs;