import axiosInstance from '../utils/axiosInstance';
import { ApiResponse, Friends, User } from './types';

export const getSuggestions = async (): Promise<ApiResponse<User[]>> => {
  const response = await axiosInstance.get('/friends');

  return response.data;
};

export const sendFriendRequest = async (
  friendId: string
): Promise<ApiResponse<User[]>> => {
  const response = await axiosInstance.post('/friends/send-request', {
    friendId,
  });

  return response.data;
};

export const fetchFriends = async (): Promise<ApiResponse<Friends>> => {
  const response = await axiosInstance.get<Promise<ApiResponse<Friends>>>(
    '/friends/fetch-friends'
  );
  return response.data;
};

export const cancelRequest = async (
  friendId: string
): Promise<ApiResponse<{ friendId: string }>> => {
  const response = await axiosInstance.post('/friends/cancel-request', {
    friendId,
  });
  return response.data;
};

export const acceptFriend = async (
  friendId: string
): Promise<ApiResponse<User[]>> => {
  const response = await axiosInstance.post('/friends/accept-request', {
    friendId,
  });
  return response.data;
};

export const removeFriend = async (
  friendId: string
): Promise<ApiResponse<string>> => {
  const response = await axiosInstance.post('/friends/remove-friend', {
    friendId,
  });
  return response.data;
};
