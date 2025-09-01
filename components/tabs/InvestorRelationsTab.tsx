import React, { useState, useMemo } from 'react';
import { 
  Play, 
  Download, 
  List, 
  FileText, 
  Sparkles, 
  Edit3, 
  Calendar, 
  Users, 
  ChevronDown, 
  ChevronRight,
  Bot,
  User
} from 'lucide-react';
import { TranscriptEvent } from '../../types/transcript';
import { mockTranscripts } from '../../data/transcriptData';

interface InvestorRelationsTabProps {
  stock: any;
}

const InvestorRelationsTab: React.FC<InvestorRelationsTabProps> = ({ stock }) => {
  const [selectedEvent, setSelectedEvent] = useState<TranscriptEvent | null>(null);
  const [activeView, setActiveView] = useState<'transcript' | 'summary'>('transcript');
  const [summaryType, setSummaryType] = useState<'ai' | 'custom'>('ai');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [expandedTranscript, setExpandedTranscript] = useState(false);

  // Filter transcripts based on the selected company
  const filteredTranscripts = useMemo(() => {
    if (!stock || !stock.symbol) return mockTranscripts;
    
    // Map stock symbols to company names for filtering
    const companyMapping: { [key: string]: string[] } = {
      'MSFT': ['microsoft'],
      'AAPL': ['apple'],
      'RIL': ['reliance industries', 'reliance'],
      'RELIANCE': ['reliance industries', 'reliance']
    };
    
    const companyNames = companyMapping[stock.symbol] || [];
    
    return mockTranscripts.filter(transcript => 
      transcript.speakers.some(speaker => 
        companyNames.some(companyName => 
          speaker.company.toLowerCase().includes(companyName)
        )
      )
    );
  }, [stock]);

  // Reset selected event if it's no longer in filtered results
  React.useEffect(() => {
    if (selectedEvent && !filteredTranscripts.find(t => t.id === selectedEvent.id)) {
      setSelectedEvent(null);
    }
  }, [filteredTranscripts, selectedEvent]);

  const handleGenerateAISummary = async (eventId: string) => {
    setIsGeneratingSummary(true);

    setTimeout(() => {
      const event = filteredTranscripts.find(t => t.id === eventId);
      if (event && event.transcript) {
        const newSummary = "AI-generated summary: This session covered key strategic initiatives, financial performance metrics, and future outlook. The discussion highlighted strong growth in cloud services, increased market penetration, and continued investment in emerging technologies. Key stakeholders expressed confidence in the company's strategic direction and competitive positioning.";
        
        console.log('Generated AI summary:', newSummary);
      }
      setIsGeneratingSummary(false);
    }, 3000);
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'earnings': return <Calendar className="w-4 h-4" />;
      case 'conference': return <Users className="w-4 h-4" />;
      case 'meeting': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'earnings': return 'bg-blue-500/20 text-blue-400';
      case 'conference': return 'bg-emerald-500/20 text-emerald-400';
      case 'meeting': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getCompanyDisplayName = () => {
    if (!stock || !stock.symbol) return 'All Companies';
    const companyNames: { [key: string]: string } = {
      'MSFT': 'Microsoft',
      'AAPL': 'Apple',
      'RIL': 'Reliance Industries'
    };
    return companyNames[stock.symbol] || stock.symbol;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            Investor Relations Events - {getCompanyDisplayName()}
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-700 rounded-lg">
              <span className="text-gray-400 text-sm">
                {filteredTranscripts.length} Events
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            <button className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600 transition-colors">
              Transcript
            </button>
          </div>
        </div>
        
        <p className="text-gray-300 text-sm">
          Access earnings calls, conference presentations, and meeting transcripts with AI-powered summaries for {getCompanyDisplayName()}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Events List */}
        <div className="col-span-1">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 max-h-[600px] overflow-y-auto">
            <div className="p-4 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
              <h3 className="text-lg font-semibold text-white">Recent Events</h3>
            </div>
            <div className="space-y-1 p-2">
              {filteredTranscripts.length > 0 ? (
                filteredTranscripts.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedEvent?.id === event.id
                        ? 'bg-emerald-500/20 border border-emerald-500/30'
                        : 'hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getEventTypeColor(event.type)}`}>
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium truncate">
                          {event.title}
                        </div>
                        <div className="text-gray-400 text-xs mt-1">
                          {event.date}
                        </div>
                        {event.quarter && (
                          <div className="text-emerald-400 text-xs mt-1">
                            {event.quarter}
                          </div>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-6 text-center">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">
                    No events found for {getCompanyDisplayName()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="col-span-2">
          {selectedEvent ? (
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              {/* Event Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-700 rounded-lg">
                    <Play className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {selectedEvent.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{selectedEvent.date}</span>
                      {selectedEvent.quarter && (
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">
                          {selectedEvent.quarter}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-white">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white">
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Speakers */}
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">Speakers</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedEvent.speakers.map((speaker, index) => (
                    <div key={index} className="px-3 py-2 bg-gray-700 rounded-lg">
                      <div className="text-white text-sm font-medium">{speaker.name}</div>
                      <div className="text-gray-400 text-xs">{speaker.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex items-center gap-4 mb-6 border-b border-gray-700">
                <button
                  onClick={() => setActiveView('transcript')}
                  className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeView === 'transcript'
                      ? 'border-emerald-400 text-emerald-400'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  Transcript
                </button>
                <button
                  onClick={() => setActiveView('summary')}
                  className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeView === 'summary'
                      ? 'border-emerald-400 text-emerald-400'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    AI Summary
                  </div>
                </button>
              </div>

              {/* Content */}
              {activeView === 'transcript' && selectedEvent.transcript ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">Transcript</h4>
                    <button
                      onClick={() => setExpandedTranscript(!expandedTranscript)}
                      className="text-emerald-400 text-sm hover:text-emerald-300"
                    >
                      {expandedTranscript ? 'Show Less' : 'Expand Full Transcript'}
                    </button>
                  </div>
                  
                  <div className={`space-y-4 ${!expandedTranscript ? 'max-h-96 overflow-y-auto' : ''}`}>
                    {selectedEvent.transcript.map((item, index) => (
                      <div key={index} className="p-4 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-white font-medium">{item.speaker}</span>
                          {item.timestamp && (
                            <span className="text-gray-400 text-sm">{item.timestamp}</span>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed ml-11">
                          {item.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : activeView === 'summary' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-medium">Summary</h4>
                      {selectedEvent.summary && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSummaryType('ai')}
                            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                              summaryType === 'ai'
                                ? 'bg-emerald-500 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                          >
                            <Bot className="w-3 h-3 inline mr-1" />
                            AI Summary
                          </button>
                          <button
                            onClick={() => setSummaryType('custom')}
                            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                              summaryType === 'custom'
                                ? 'bg-emerald-500 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                          >
                            <Edit3 className="w-3 h-3 inline mr-1" />
                            Custom Summary
                          </button>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleGenerateAISummary(selectedEvent.id)}
                      disabled={isGeneratingSummary}
                      className="flex items-center gap-2 px-3 py-2 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600 transition-colors disabled:opacity-50"
                    >
                      {isGeneratingSummary ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Generate AI Summary
                        </>
                      )}
                    </button>
                  </div>

                  {selectedEvent.summary ? (
                    <div className="p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        {summaryType === 'ai' ? (
                          <Bot className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Edit3 className="w-5 h-5 text-blue-400" />
                        )}
                        <span className="text-white font-medium">
                          {summaryType === 'ai' ? 'AI Generated Summary' : 'Custom Summary'}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {summaryType === 'ai' ? selectedEvent.summary.ai : selectedEvent.summary.custom}
                      </p>
                      {summaryType === 'custom' && (
                        <button className="mt-3 text-emerald-400 text-sm hover:text-emerald-300">
                          Edit Summary
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 mb-4">No summary available yet</p>
                      <p className="text-gray-500 text-sm">
                        Click "Generate AI Summary" to create an intelligent summary of this event
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No transcript available for this event</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">
                Select an event to view transcript and AI summary
                {filteredTranscripts.length === 0 && (
                  <span className="block mt-2 text-sm">
                    No events available for {getCompanyDisplayName()}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestorRelationsTab;