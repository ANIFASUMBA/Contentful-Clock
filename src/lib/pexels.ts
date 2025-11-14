const PEXELS_API_KEY = 'Iey7fvIfV8Bg1LfwxzUxEIk161BF9AznFK3KqMF7D6V4HhZgrOwt3Ovi';
const PEXELS_BASE_URL = 'https://api.pexels.com/v1';

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  duration: number;
  full_res: string | null;
  tags: string[];
  url: string;
  image: string;
  avg_color: string;
  user: {
    id: number;
    name: string;
    url: string;
  };
  video_files: Array<{
    id: number;
    quality: string;
    file_type: string;
    width: number;
    height: number;
    fps: number;
    link: string;
    size: number;
  }>;
  video_pictures: Array<{
    id: number;
    nr: number;
    picture: string;
  }>;
}

export interface PexelsSearchResponse<T> {
  page: number;
  per_page: number;
  total_results: number;
  next_page?: string;
  photos?: T[];
  videos?: T[];
}

class PexelsService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = PEXELS_API_KEY;
    this.baseUrl = PEXELS_BASE_URL;
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Authorization': this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async searchPhotos(
    query: string,
    page: number = 1,
    perPage: number = 15
  ): Promise<PexelsSearchResponse<PexelsPhoto>> {
    const endpoint = `/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
    return this.makeRequest<PexelsSearchResponse<PexelsPhoto>>(endpoint);
  }

  async searchVideos(
    query: string,
    page: number = 1,
    perPage: number = 15
  ): Promise<PexelsSearchResponse<PexelsVideo>> {
    const endpoint = `/videos/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
    return this.makeRequest<PexelsSearchResponse<PexelsVideo>>(endpoint);
  }

  async getCuratedPhotos(
    page: number = 1,
    perPage: number = 15
  ): Promise<PexelsSearchResponse<PexelsPhoto>> {
    const endpoint = `/curated?page=${page}&per_page=${perPage}`;
    return this.makeRequest<PexelsSearchResponse<PexelsPhoto>>(endpoint);
  }

  async getPopularVideos(
    page: number = 1,
    perPage: number = 15
  ): Promise<PexelsSearchResponse<PexelsVideo>> {
    const endpoint = `/videos/popular?page=${page}&per_page=${perPage}`;
    return this.makeRequest<PexelsSearchResponse<PexelsVideo>>(endpoint);
  }

  // Get the best video file for background use (preferably HD and MP4)
  getBestVideoFile(video: PexelsVideo): string {
    // Prefer HD quality MP4 files
    const preferredFile = video.video_files.find(
      file => file.quality === 'hd' && file.file_type === 'video/mp4'
    );
    
    if (preferredFile) return preferredFile.link;

    // Fallback to any MP4 file
    const mp4File = video.video_files.find(
      file => file.file_type === 'video/mp4'
    );
    
    if (mp4File) return mp4File.link;

    // Last resort - use the first available file
    return video.video_files[0]?.link || '';
  }
}

export const pexelsService = new PexelsService();