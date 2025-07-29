export type SummaryData = {
  total_actions: number;
  most_frequent_action: string;
  average_metadata_duration: number;
  most_frequent_metadata_page: string;
};

export type SummaryResponse = {
  message?: string;
  summary?: SummaryData;
  status: boolean
}