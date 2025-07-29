export type TrendDataItem = {
  user_id: number;
  action: string;
  count: number;
};

export type TrendsReponse = {
  message?: string;
  trending_actions?: TrendDataItem[];
  status: boolean
}