// components/tabs/ModelingTab.tsx
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Stock } from '../../types';

interface ModelingTabProps {
  stock: Stock;
}

const ModelingTab: React.FC<ModelingTabProps> = ({ stock }) => {
  const [activeSection, setActiveSection] = useState('dcf');

  const sections = [
    { key: 'dcf', label: 'DCF Model', icon: '📊' },
    { key: 'valuation', label: 'Valuation Metrics', icon: '💰' },
    { key: 'scenarios', label: 'Scenario Analysis', icon: '🎯' }
  ];

  const scenarioData = stock.modeling.scenarios.map(scenario => ({
    name: scenario.scenario,
    probability: scenario.probability,
    targetPrice: scenario.targetPrice
  }));

  const valuationData = [
    { name: 'P/E', value: stock.modeling.valuation.pe },
    { name: 'P/B', value: stock.modeling.valuation.pb },
    { name: 'P/S', value: stock.modeling.valuation.ps },
    { name: 'EV/EBITDA', value: stock.modeling.valuation.evEbitda },
    { name: 'PEG', value: stock.modeling.valuation.peg }
  ];

  const scenarioColors = ['#10B981', '#3B82F6', '#F59E0B'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Financial Modeling</h3>
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

      {/* DCF Model */}
      {activeSection === 'dcf' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">DCF Model Summary</h4>
              <div className="space-y-4">
                <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <div className="text-emerald-400 font-medium mb-2">Fair Value</div>
                  <div className="text-white text-3xl font-bold">${stock.modeling.dcf.fairValue.toFixed(2)}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-700 rounded-lg">
                    <div className="text-gray-400 text-sm">WACC</div>
                    <div className="text-white font-bold">{stock.modeling.dcf.wacc}%</div>
                  </div>
                  <div className="p-3 bg-gray-700 rounded-lg">
                    <div className="text-gray-400 text-sm">Terminal Growth</div>
                    <div className="text-white font-bold">{stock.modeling.dcf.terminalGrowth}%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Key Assumptions</h4>
              <div className="space-y-3">
                {stock.modeling.dcf.assumptions.map((assumption, index) => (
                  <div key={index} className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-white font-medium text-sm">{assumption.metric}</span>
                      <span className="text-emerald-400 font-bold">{assumption.value}%</span>
                    </div>
                    <p className="text-gray-400 text-xs">{assumption.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">DCF Sensitivity Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-2">WACC Sensitivity</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">7.5%</span>
                    <span className="text-emerald-400">${(stock.modeling.dcf.fairValue * 1.1).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">8.5%</span>
                    <span className="text-white">${stock.modeling.dcf.fairValue.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">9.5%</span>
                    <span className="text-red-400">${(stock.modeling.dcf.fairValue * 0.9).toFixed(0)}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-2">Growth Sensitivity</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">2.5%</span>
                    <span className="text-red-400">${(stock.modeling.dcf.fairValue * 0.95).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">3.0%</span>
                    <span className="text-white">${stock.modeling.dcf.fairValue.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">3.5%</span>
                    <span className="text-emerald-400">${(stock.modeling.dcf.fairValue * 1.05).toFixed(0)}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-2">Margin Sensitivity</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">40%</span>
                    <span className="text-red-400">${(stock.modeling.dcf.fairValue * 0.9).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">42%</span>
                    <span className="text-white">${stock.modeling.dcf.fairValue.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">44%</span>
                    <span className="text-emerald-400">${(stock.modeling.dcf.fairValue * 1.1).toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Valuation Metrics */}
      {activeSection === 'valuation' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Valuation Metrics Comparison</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={valuationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F3F4F6'
                    }}
                    formatter={(value: any) => [value.toFixed(1), 'Ratio']}
                  />
                  <Bar dataKey="value" fill="#3B82F6" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h5 className="text-white font-medium mb-3">Price-to-Earnings</h5>
              <div className="text-3xl font-bold text-emerald-400 mb-2">{stock.modeling.valuation.pe.toFixed(1)}</div>
              <div className="text-gray-400 text-sm">Current P/E ratio</div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h5 className="text-white font-medium mb-3">Price-to-Book</h5>
              <div className="text-3xl font-bold text-blue-400 mb-2">{stock.modeling.valuation.pb.toFixed(1)}</div>
              <div className="text-gray-400 text-sm">Book value multiple</div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h5 className="text-white font-medium mb-3">Price-to-Sales</h5>
              <div className="text-3xl font-bold text-yellow-400 mb-2">{stock.modeling.valuation.ps.toFixed(1)}</div>
              <div className="text-gray-400 text-sm">Revenue multiple</div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h5 className="text-white font-medium mb-3">EV/EBITDA</h5>
              <div className="text-3xl font-bold text-purple-400 mb-2">{stock.modeling.valuation.evEbitda.toFixed(1)}</div>
              <div className="text-gray-400 text-sm">Enterprise multiple</div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h5 className="text-white font-medium mb-3">PEG Ratio</h5>
              <div className="text-3xl font-bold text-red-400 mb-2">{stock.modeling.valuation.peg.toFixed(1)}</div>
              <div className="text-gray-400 text-sm">Growth-adjusted P/E</div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h5 className="text-white font-medium mb-3">Current Price</h5>
              <div className="text-3xl font-bold text-white mb-2">${stock.price.toFixed(2)}</div>
              <div className="text-gray-400 text-sm">Market price</div>
            </div>
          </div>
        </div>
      )}

      {/* Scenario Analysis */}
      {activeSection === 'scenarios' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Scenario Probability</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={scenarioData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="probability"
                    >
                      {scenarioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={scenarioColors[index]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F3F4F6'
                      }}
                      formatter={(value: any) => [`${value}%`, 'Probability']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Scenario Details</h4>
              <div className="space-y-4">
                {stock.modeling.scenarios.map((scenario, index) => (
                  <div key={index} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{scenario.scenario}</span>
                      <span className="text-emerald-400 font-bold">${scenario.targetPrice}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Probability</span>
                      <span className="text-white text-sm">{scenario.probability}%</span>
                    </div>
                    <p className="text-gray-300 text-sm">{scenario.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Expected Value Calculation</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stock.modeling.scenarios.map((scenario, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-2">{scenario.scenario}</div>
                  <div className="text-2xl font-bold text-white mb-1">${scenario.targetPrice}</div>
                  <div className="text-gray-400 text-sm mb-2">× {scenario.probability}%</div>
                  <div className="text-emerald-400 font-bold">
                    ${(scenario.targetPrice * scenario.probability / 100).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <div className="flex justify-between items-center">
                <span className="text-emerald-400 font-medium">Expected Value</span>
                <span className="text-white text-2xl font-bold">
                  ${stock.modeling.scenarios.reduce((sum, scenario) => sum + (scenario.targetPrice * scenario.probability / 100), 0).toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Modeling Summary</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">DCF Fair Value</div>
            <div className="text-2xl font-bold text-emerald-400">${stock.modeling.dcf.fairValue.toFixed(0)}</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Current Price</div>
            <div className="text-2xl font-bold text-white">${stock.price.toFixed(0)}</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Upside/Downside</div>
            <div className={`text-2xl font-bold ${stock.modeling.dcf.fairValue > stock.price ? 'text-emerald-400' : 'text-red-400'}`}>
              {((stock.modeling.dcf.fairValue - stock.price) / stock.price * 100).toFixed(1)}%
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">P/E Ratio</div>
            <div className="text-2xl font-bold text-blue-400">{stock.modeling.valuation.pe.toFixed(1)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelingTab;

