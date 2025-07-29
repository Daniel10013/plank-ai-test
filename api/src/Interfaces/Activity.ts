export interface Activity {
  user_id: number;
  timestamp: Date;
  action: string;
  metadata: {
    page: string;
    duration: number;
    file_size?: number;
    file_type?: string;
    query?: string;
  };
}

export interface JsonMetadata {
  page: string;
  duration: number;
  file_size?: number;
  file_type?: string;
  query?: string;
}

export interface ActivitySummary {
  total_actions: number,
  most_frequent_action: string,
  average_metadata_duration: number,
  most_frequent_metadata_page: string
}

export interface ActionTrend {
  user_id: number;
  action: string;
  count: number;
}