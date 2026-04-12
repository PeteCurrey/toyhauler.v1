export interface JournalPost {
  id: string;
  source_site: 'jpc' | 'toyhauler' | 'alkota' | 'both';
  title: string;
  slug: string;
  excerpt: string;
  content_html?: string;
  category: string;
  image_url: string;
  published_at: string;
  created_at?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  build_number: string;
  category: string;
  source_site: 'jpc' | 'toyhauler' | 'both';
  created_at?: string;
}

export interface ConfiguratorState {
  baseModel: 'JPC-CH' | 'JPC-EX' | 'JPC-BESPOKE';
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  axleConfig: 'single' | 'twin-std' | 'twin-hd' | 'triple';
  exteriorFinish: string;
  doors: {
    rear: 'ramp' | 'barn';
    side: boolean;
    front: 'v-nose' | 'flat';
  };
  interiorPackage: 'bare' | 'workshop' | 'motorsport' | 'luxury';
  accessories: string[];
  estimatedPrice: number;
}

export interface SavedConfig {
  id: string;
  config_ref: string;
  base_model: string;
  config_data: ConfiguratorState;
  source_domain: string;
  created_at?: string;
}

export interface Commission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source_site: string;
  config_ref?: string;
  message: string;
  status: 'pending' | 'contacted' | 'won' | 'lost';
  created_at?: string;
}
