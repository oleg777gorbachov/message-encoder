export interface MessageI {
  code: string;
  author: string;
  maxViews: number;
  views: number;
  isEditableByOther: boolean;
  id: string;
  message: string;
  date: number;
}
