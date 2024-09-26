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
  _id: string;
  content: string;
  image: string;
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture: string | null;
  };
  likes: string[];
  createdAt: Date;
  comments: string[];
}

export interface Friends {
  friends: User[];
  friendRequestsSent: User[];
  friendRequestsReceived: User[];
}
