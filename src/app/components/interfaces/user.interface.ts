export interface UserInterface {
  email: string;
  username: string;
  bio: null;
  image: string;
  token: string;
}

export interface UserPayloadInterface {
  email: string;
  password: string;
  username: string;
}

export interface UserProfileInterface {
  username: string;
  bio: null;
  image: string;
  following: boolean;
}
