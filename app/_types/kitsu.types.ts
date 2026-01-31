export interface AnimeTitles {
  en: string;
  en_jp: string;
  en_us: string;
  ja_jp: string;
}

export interface AnimeAttributes {
  titles: AnimeTitles;
  synopsis: string;
  description: string;
  averageRating: string | null;
  canonicalTitle: string;
  userCount: number;
  subtype: string;
  episodeCount: number;
  startDate: string;
  endDate: string;
  coverImage: {
    small: string;
    medium: string;
    large: string;
    original: string;
  };
  posterImage: {
    small: string;
    medium: string;
    large: string;
    original: string;
  };
}

export interface Anime {
  id: string;
  attributes: AnimeAttributes;
}

export interface AnimeMeta {
  count: number;
}

export interface AnimeListResponse {
  data: Anime[];
  meta: AnimeMeta;
}

export interface AnimeDetailResponse {
  data: Anime;
}
