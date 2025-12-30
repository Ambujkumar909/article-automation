export interface Article {
  id: number;
  title: string;
  summary: string;
  original_content: string;
  updated_content: string;
  image_url?: string;
  category?: string;
  author?: string;
  created_at?: string;
}

export type AppView = 'landing' | 'list' | 'comparison';

export interface ViewState {
  currentView: AppView;
  selectedArticleId?: number;
}
