export interface JournalPost {
  id: string;
  source_site: string; // 'jpc' or 'toyhauler' or 'alkota'
  title: string;
  slug: string;
  excerpt: string;
  content_html?: string;
  category: string;
  image_url: string;
  published_at: string;
  created_at?: string;
  updated_at?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  build_number: string;
  category: string;
  created_at?: string;
}

export interface SavedConfig {
  id: string;
  config_id: string;
  source_site: string;
  config_data: any; // JSONb from configurator
  created_at?: string;
}

export interface Commission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source_site: string;
  config_id?: string;
  message: string;
  status: string; // 'pending', 'contacted', 'won', 'lost'
  created_at?: string;
}
