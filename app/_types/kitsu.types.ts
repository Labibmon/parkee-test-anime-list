export interface AnimeTitles {
  en?: string;
  ja_jp?: string;
  en_jp?: string;
}

export interface AnimeAttributes {
  titles: AnimeTitles;
  synopsis: string;
  averageRating: string | null;
  canonicalTitle: string;
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
