
export interface Article {
  id: string;
  title: string;
  description: string;
  originalContent: string;
  updatedContent: string;
  imageUrl: string;
  category: string;
  author: string;
  date: string;
}

export type AppView = 'landing' | 'list' | 'comparison';

export interface ViewState {
  currentView: AppView;
  selectedArticleId?: string;
}
