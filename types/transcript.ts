export interface TranscriptEvent {
  id: string;
  title: string;
  date: string;
  quarter?: string;
  type: 'earnings' | 'conference' | 'meeting' | 'presentation';
  status: 'completed' | 'upcoming' | 'live';
  speakers: Speaker[];
  transcript?: TranscriptContent[];
  summary?: {
    ai: string;
    custom?: string;
  };
}

export interface Speaker {
  name: string;
  title: string;
  company: string;
}

export interface TranscriptContent {
  speaker: string;
  content: string;
  timestamp?: string;
}