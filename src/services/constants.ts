export interface IPagination {
  current_page: number;
  page_size: number;
  total_pages: number;
  total_records: number;
}
export interface IStream {
  is_online: boolean;
  last_updated_at: number;
  stream_name: string;
  viewer_count: number;
  translation_url: string;
  stream_category: string;
  stream_tags: string[];
}
