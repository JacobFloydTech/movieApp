export interface MovieDiscover {
  page: number
  results: MovieDiscoverResult[]
  total_pages: number
  total_results: number
}

export interface MovieDiscoverResult {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}


export interface ImagesResponse {
  backdrops: Backdrop[]
  id: number
  logos: any[]
  posters: Poster[]
}

export interface Backdrop {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface Poster {
  aspect_ratio: number
  height: number
  iso_639_1?: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}


export interface MovieImages {
  backdrops: Backdrop[]
  id: number
  logos: Logo[]
  posters: Poster[]
}

export interface Backdrop {
  aspect_ratio: number
  height: number
  iso_639_1?: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface Logo {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface Poster {
  aspect_ratio: number
  height: number
  iso_639_1?: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}



export interface CastCollection {
  id: number
  cast: Cast[]
  crew: Crew[]
}

export interface Cast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface Crew {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  credit_id: string
  department: string
  job: string
}


export interface VideoCollection {
  id: number
  results: Video[]
}

export interface Video {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}


export interface serverData  {
		basicMovieData: MovieDiscoverResult;
		images: MovieImages;
		cast: CastCollection;
		trailer: Video;
};
  
export interface GenreResponse { 
  categories: Genre[]
}

export interface Genre {
  id: number
  name: string
}



export interface ReviewResponse {
  id: number
  page: number
  results: Review[]
  total_pages: number
  total_results: number
}

export interface Review {
  author: string
  author_details: AuthorDetails
  content: string
  created_at: string
  id: string
  updated_at: string
  url: string
}

export interface AuthorDetails {
  name: string
  username: string
  avatar_path?: string
  rating?: number
}


export interface RecommendationResponse {
  page: number
  results: MovieDiscoverResult[]
  total_pages: number
  total_results: number
}




export interface User {
  avatar: Avatar
  id: number
  iso_639_1: string
  iso_3166_1: string
  name: string
  include_adult: boolean
  username: string
}

export interface Avatar {
  gravatar: Gravatar
  tmdb: Tmdb
}

export interface Gravatar {
  hash: string
}

export interface Tmdb {
  avatar_path: any
}

export interface FavouriteResult {
  page: number
  results: MovieDiscoverResult[]
  total_pages: number
  total_results: number
}


export interface KeywordResponse {
  id: number
  keywords: Keyword[]
}

export interface Keyword {
  id: number
  name: string
}

