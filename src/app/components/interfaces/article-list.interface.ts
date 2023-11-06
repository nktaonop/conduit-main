export interface ArticleInterface {
  author: {
    username: string;
    bio: null;
    image: string;
    following: boolean;
  };
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
}

export interface NewArticlesInterface {
  author: {
    bio: null;
    following: boolean;
    image: string;
    username: string;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: [];
  title: string;
  updatedAt: string;
}
