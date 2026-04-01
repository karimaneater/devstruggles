// Supabase-ready types for DevStruggles

export type ReactionType = 'like' | 'heart' | 'laugh' | 'wow' | 'star';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  // Supabase will auto-generate these timestamps
}

export interface Post {
  id: string;
  title: string;
  content: string;
  code_snippet?: string;
  language?: string;
  author_id: string;
  author?: User;
  tags: string[];
  difficulty?: DifficultyLevel;
  image_url?: string;
  reactions: Record<ReactionType, number>;
  user_reaction?: ReactionType | null;
  comment_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  author?: User;
  content: string;
  code_snippet?: string;
  parent_id?: string | null;
  reactions: Record<ReactionType, number>;
  user_reaction?: ReactionType | null;
  replies?: Comment[];
  created_at: string;
  updated_at: string;
}

export interface Reaction {
  id: string;
  user_id: string;
  post_id?: string;
  comment_id?: string;
  type: ReactionType;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  post_count: number;
}

// Supabase Database Schema (for reference)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at'>>;
      };
      posts: {
        Row: Post;
        Insert: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'reactions' | 'comment_count' | 'view_count'>;
        Update: Partial<Omit<Post, 'id' | 'created_at' | 'author_id'>>;
      };
      comments: {
        Row: Comment;
        Insert: Omit<Comment, 'id' | 'created_at' | 'updated_at' | 'reactions'>;
        Update: Partial<Omit<Comment, 'id' | 'created_at' | 'author_id' | 'post_id'>>;
      };
      reactions: {
        Row: Reaction;
        Insert: Omit<Reaction, 'id' | 'created_at'>;
        Update: Partial<Omit<Reaction, 'id' | 'user_id'>>;
      };
      tags: {
        Row: Tag;
        Insert: Omit<Tag, 'id' | 'post_count'>;
        Update: Partial<Omit<Tag, 'id'>>;
      };
    };
  };
}
