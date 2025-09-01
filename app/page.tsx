"use client"
import React, { useState } from 'react';
import { Stock } from '../types';
import { mockStocks } from '../data/mockData';
import Header from '../components/Header';
import StockHeader from '../components/StockHeader';
import Tabs from '../components/Tabs';
import OverviewTab from '../components/OverviewTab';
import FinancialsTab from '../components/tabs/FinancialsTab';
import ChartSidebar from '../components/ChartSidebar';
import InvestorRelationsTab from '../components/tabs/InvestorRelationsTab';
import EstimatesTab from '../components/tabs/EstimatesTab';
import ResearchTab from '../components/tabs/ResearchTab';
import OwnershipTab from '../components/tabs/OwnershipTab';
import IndustryTab from '../components/tabs/IndustryTab';
import DividendsTab from '../components/tabs/DividendsTab';
import ModelingTab from '../components/tabs/ModelingTab';
import FilingsTab from '../components/tabs/FilingsTab';

const FiscalPlatform: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<Stock>(mockStocks[0]);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('5Y');
  const [searchTerm, setSearchTerm] = useState('');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab stock={selectedStock} />;
      case 'financials':
        return <FinancialsTab stock={selectedStock} />;
      case 'investorrelations':
        return <InvestorRelationsTab stock={selectedStock} />;
      case 'research':
        return <ResearchTab stock={selectedStock} />;
      case 'estimates':
        return <EstimatesTab stock={selectedStock} />;
      case 'ownership':
        return <OwnershipTab stock={selectedStock} />;
      case 'industry':
        return <IndustryTab stock={selectedStock} />;
      case 'dividends':
        return <DividendsTab stock={selectedStock} />;
      case 'modeling':
        return <ModelingTab stock={selectedStock} />;
      case 'filings':
        return <FilingsTab stock={selectedStock} />;
      default:
        return <OverviewTab stock={selectedStock} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <StockHeader stock={selectedStock} />

        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderTabContent()}
          </div>

          <ChartSidebar
            stock={selectedStock}
            timeframe={timeframe}
            setTimeframe={setTimeframe}
            stocks={mockStocks}
            onStockChange={setSelectedStock}
          />
        </div>
      </div>
    </div>
  );
};

export default FiscalPlatform;