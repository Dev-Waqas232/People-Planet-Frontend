export interface ApiResponse<T> {
  message: string;
  ok: boolean;
  data?: T;
}

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  dob: Date;
  profilePicture?: string;
  email: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface PostResponse {
  post: Post[];
}

export interface Post {
  content: string;
  image: string;
  createdBy: string;
  likes: number;
  createdAt: Date;
}
