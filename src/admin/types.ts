export interface AdminToastItem {
  id: string;
  type: 'success' | 'error' | 'info';
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface RecentlyEditedItem {
  id: string;
  title: string;
  section: string;
  timestamp: string;
  user: string;
  summary: string;
}

export interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  route: string;
}

export interface ReorderableItem {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  meta?: string;
}
