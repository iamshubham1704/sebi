// components/tabs/EstimatesTab.tsx
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Stock } from '../../types';

interface EstimatesTabProps {
  stock: Stock;
}

const EstimatesTab: React.FC<EstimatesTabProps> = ({ stock }) => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [showPercentChange, setShowPercentChange] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('M');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Annual');

  const metrics = [
    { key: 'revenue', label: 'Revenue', color: '#3B82F6' },
    { key: 'eps', label: 'EPS', color: '#10B981' },
    { key: 'ebitda', label: 'EBITDA', color: '#F59E0B' }
  ];

  const units = [
    { key: 'K', label: 'K', multiplier: 0.001 },
    { key: 'M', label: 'M', multiplier: 1 },
    { key: 'B', label: 'B', multiplier: 1000 }
  ];

  const timeframes = ['Annual', 'Semi-Annual', 'Quarterly'];

  type EstimatePoint = {
    year: number | string;
    value: number;
    low: number | null;
    high: number | null;
    isEstimate: boolean;
  };

  const getMetricData = (): EstimatePoint[] => {
    // Only allow metrics that have the expected structure (exclude priceTargets)
    const validMetrics = ['revenue', 'eps', 'ebitda'];
    if (!validMetrics.includes(selectedMetric)) return [];
    
    const metric = stock.estimates[selectedMetric as keyof typeof stock.estimates];
    if (!metric || !Array.isArray(metric)) return [];

    const mapped = metric.map((item, index) => {
      // Type guard to ensure item has the expected structure
      if (!('actual' in item) || !('estimate' in item)) return null;
      
      const value = item.actual || item.estimate;
      const low = item.low;
      const high = item.high;
      
      if (showPercentChange && index > 0) {
        const prevItem = metric[index - 1];
        if (prevItem && 'actual' in prevItem) {
          const prevValue = prevItem.actual || prevItem.estimate;
          if (prevValue && value) {
            const percentChange = ((value - prevValue) / prevValue) * 100;
            return {
              year: item.year,
              value: percentChange,
              low: low && prevValue ? ((low - prevValue) / prevValue) * 100 : null,
              high: high && prevValue ? ((high - prevValue) / prevValue) * 100 : null,
              isEstimate: !item.actual
            };
          }
        }
      }

      return {
        year: item.year,
        value: value,
        low: low,
        high: high,
        isEstimate: !item.actual
      };
    });

    // Filter out nulls and ensure value is non-null, then coerce type
    return mapped
      .filter((item): item is NonNullable<typeof item> & { value: number } => item !== null && item.value !== null)
      .map((item) => ({
        year: item.year,
        value: item.value as number,
        low: item.low ?? null,
        high: item.high ?? null,
        isEstimate: item.isEstimate
      }));
  };

  const formatValue = (value: number) => {
    const unit = units.find(u => u.key === selectedUnit);
    if (!unit) return value.toFixed(2);
    
    const adjustedValue = value / unit.multiplier;
    return adjustedValue.toFixed(2);
  };

  const getYAxisDomain = () => {
    const data = getMetricData();
    if (data.length === 0) return [0, 100];
    
    const values = data.map(item => item.value).filter(v => v !== null) as number[];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    
    return [min - range * 0.1, max + range * 0.1];
  };

  const renderChart = () => {
    const data = getMetricData();
    if (data.length === 0) return null;

    const metric = metrics.find(m => m.key === selectedMetric);
    if (!metric) return null;

    return (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="year" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              domain={getYAxisDomain()}
              tickFormatter={(value) => showPercentChange ? `${value.toFixed(1)}%` : `$${formatValue(value)}${selectedUnit}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F3F4F6'
              }}
              formatter={(value: any) => [
                showPercentChange ? `${value.toFixed(2)}%` : `$${formatValue(value)}${selectedUnit}`,
                metric.label
              ]}
              labelStyle={{ color: '#9CA3AF' }}
            />
            
            {/* Main line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke={metric.color}
              strokeWidth={3}
              dot={(props) => {
                const { cx, cy, payload } = props;
                if (!cx || !cy) return <g />;
                
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={payload.isEstimate ? 4 : 6}
                    fill={metric.color}
                    stroke="#1F2937"
                    strokeWidth={2}
                  />
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Consensus Analyst Estimates
          </h3>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download
          </button>
        </div>

        {/* Metric Tabs */}
        <div className="flex gap-6 mb-6">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedMetric === metric.key
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {metric.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">% Chg.</span>
            <button
              onClick={() => setShowPercentChange(!showPercentChange)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showPercentChange ? 'bg-emerald-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showPercentChange ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Units:</span>
            {units.map((unit) => (
              <button
                key={unit.key}
                onClick={() => setSelectedUnit(unit.key)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedUnit === unit.key
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {unit.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Timeframe:</span>
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedTimeframe === tf
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        {/* Summary Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Current Year</div>
            <div className="text-2xl font-bold text-white">
              {(() => {
                const validMetrics = ['revenue', 'eps', 'ebitda'];
                if (!validMetrics.includes(selectedMetric)) return `$0${selectedUnit}`;
                
                const metricData = stock.estimates[selectedMetric as keyof typeof stock.estimates];
                if (!metricData || !Array.isArray(metricData) || metricData.length < 1) return `$0${selectedUnit}`;
                
                const actual = metricData[0] && 'actual' in metricData[0] ? (metricData[0].actual ?? 0) : 0;
                return `$${formatValue(actual)}${selectedUnit}`;
              })()}
            </div>
            <div className="text-gray-400 text-xs">Actual</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Next Year Est.</div>
            <div className="text-2xl font-bold text-emerald-400">
              {(() => {
                const validMetrics = ['revenue', 'eps', 'ebitda'];
                if (!validMetrics.includes(selectedMetric)) return `$0${selectedUnit}`;
                
                const metricData = stock.estimates[selectedMetric as keyof typeof stock.estimates];
                if (!metricData || !Array.isArray(metricData) || metricData.length < 2) return `$0${selectedUnit}`;
                
                const estimate = metricData[1] && 'estimate' in metricData[1] ? (metricData[1].estimate ?? 0) : 0;
                return `$${formatValue(estimate)}${selectedUnit}`;
              })()}
            </div>
            <div className="text-gray-400 text-xs">Consensus</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">5-Year Growth</div>
            <div className="text-2xl font-bold text-blue-400">
              {(() => {
                const validMetrics = ['revenue', 'eps', 'ebitda'];
                if (!validMetrics.includes(selectedMetric)) return '0%';
                
                const metricData = stock.estimates[selectedMetric as keyof typeof stock.estimates];
                if (!metricData || !Array.isArray(metricData) || metricData.length < 5) return '0%';
                
                const current = metricData[0] && 'actual' in metricData[0] ? (metricData[0].actual ?? 0) : 0;
                const future = metricData[4] && 'estimate' in metricData[4] ? (metricData[4].estimate ?? 0) : 0;
                if (current === 0) return '0%';
                return `${(((future - current) / current) * 100).toFixed(1)}%`;
              })()}
            </div>
            <div className="text-gray-400 text-xs">CAGR</div>
          </div>
        </div>
        
        {renderChart()}
      </div>

      {/* Estimates Table */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Detailed Estimates</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-medium pb-3">Year</th>
                <th className="text-left text-gray-400 font-medium pb-3">Actual</th>
                <th className="text-left text-gray-400 font-medium pb-3">Estimate</th>
                <th className="text-left text-gray-400 font-medium pb-3">Low</th>
                <th className="text-left text-gray-400 font-medium pb-3">High</th>
                <th className="text-left text-gray-400 font-medium pb-3">YoY Change</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const validMetrics = ['revenue', 'eps', 'ebitda'];
                if (!validMetrics.includes(selectedMetric)) return null;
                
                const metricData = stock.estimates[selectedMetric as keyof typeof stock.estimates];
                if (!metricData || !Array.isArray(metricData)) return null;
                
                return metricData.map((item, index) => {
                  // Type guard to ensure item has the expected structure
                  if (!('actual' in item) || !('estimate' in item)) return null;
                  
                  const value = item.actual || item.estimate;
                  const prevValue = index > 0 ? 
                    (metricData[index - 1] && 'actual' in metricData[index - 1] ? 
                     (metricData[index - 1] as any).actual || (metricData[index - 1] as any).estimate : null) : null;
                  const yoyChange = prevValue && value ? ((value - prevValue) / prevValue) * 100 : null;
                
                return (
                  <tr key={item.year} className="border-b border-gray-700">
                    <td className="py-3 text-white font-medium">{item.year}</td>
                    <td className="py-3 text-white">
                      {item.actual ? `$${formatValue(item.actual)}${selectedUnit}` : '-'}
                    </td>
                    <td className="py-3 text-emerald-400">
                      {item.estimate ? `$${formatValue(item.estimate)}${selectedUnit}` : '-'}
                    </td>
                    <td className="py-3 text-gray-400">
                      {item.low ? `$${formatValue(item.low)}${selectedUnit}` : '-'}
                    </td>
                    <td className="py-3 text-gray-400">
                      {item.high ? `$${formatValue(item.high)}${selectedUnit}` : '-'}
                    </td>
                    <td className="py-3">
                      {yoyChange !== null ? (
                        <span className={yoyChange >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                          {yoyChange >= 0 ? '+' : ''}{yoyChange.toFixed(1)}%
                        </span>
                      ) : '-'}
                    </td>
                  </tr>
                );
              }).filter(item => item !== null);
              })()}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price Targets */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Analyst Price Targets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stock.estimates.priceTargets.map((target, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{target.analyst}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  target.rating === 'Buy' || target.rating === 'Overweight'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-red-500 text-white'
                }`}>
                  {target.rating}
                </span>
              </div>
              <div className="text-2xl font-bold text-emerald-400">${target.target}</div>
              <div className="text-gray-400 text-sm">{target.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm">
        Powered by Fiscal.ai
      </div>
    </div>
  );
};

export default EstimatesTab;
