import type { User } from "@/services/user";

export type Story = {
  id: number;
  text: string;
  user: User;
  createdAt: string;
};

export type Comment = {
  id: number;
  user: User;
  text: string;
  createdAt: string;
};

export type GetStoriesParams = {
  page: number;
  limit: number;
};

export type GetStoriesResponse = {
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
  stories: Story[];
};

export type AddNewStoryBody = {
  text: string;
};

export type AddNewStoryResponse = {
  text: string;
};

export type GetSingleStoryParams = {
  id: number;
};

export type DeleteStoryParams = {
  id: string;
};

export type DeleteStoryResponse = {
  id: string;
};

export type GetStoryCommentsParams = {
  id: string;
  page?: number;
  limit?: number;
};

export type GetStoryCommentsResponse = {
  pagination: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
  comments: Comment[];
};

export type AddStoryCommentBody = {
  id: string;
  text: string;
};
