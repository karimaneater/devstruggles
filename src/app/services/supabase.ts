// Supabase client configuration
// This file is ready for Supabase integration

// import { createClient } from '@supabase/supabase-js';
// import { Database } from '@/app/types';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth helpers (ready for Supabase)
export const authService = {
  async signUp(email: string, password: string, username: string) {
    // Mock implementation - replace with Supabase
    // const { data, error } = await supabase.auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     data: { username }
    //   }
    // });
    
    // Mock response
    return {
      data: {
        user: {
          id: Math.random().toString(36).substr(2, 9),
          email,
          username,
          created_at: new Date().toISOString(),
        }
      },
      error: null
    };
  },

  async signIn(email: string, password: string) {
    // Mock implementation - replace with Supabase
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });
    
    // Mock response
    const mockUsers: any = {
      'test@example.com': {
        id: 'user-1',
        email: 'test@example.com',
        username: 'testuser',
        created_at: new Date().toISOString(),
      }
    };

    const user = mockUsers[email];
    
    if (password === 'password123' && user) {
      return { data: { user }, error: null };
    }
    
    return { data: null, error: { message: 'Invalid credentials' } };
  },

  async signOut() {
    // await supabase.auth.signOut();
    return { error: null };
  },

  async getCurrentUser() {
    // const { data: { user } } = await supabase.auth.getUser();
    // return user;
    return null;
  }
};

// Posts service (ready for Supabase)
export const postsService = {
  async fetchPosts() {
    // const { data, error } = await supabase
    //   .from('posts')
    //   .select('*, author:users(*), reactions:reactions(type)')
    //   .order('created_at', { ascending: false });
    // return { data, error };
    
    return { data: [], error: null };
  },

  async fetchPostById(id: string) {
    // const { data, error } = await supabase
    //   .from('posts')
    //   .select('*, author:users(*)')
    //   .eq('id', id)
    //   .single();
    // return { data, error };
    
    return { data: null, error: null };
  },

  async createPost(post: any) {
    // const { data, error } = await supabase
    //   .from('posts')
    //   .insert(post)
    //   .select('*, author:users(*)')
    //   .single();
    // return { data, error };
    
    return { data: null, error: null };
  },

  async updatePost(id: string, updates: any) {
    // const { data, error } = await supabase
    //   .from('posts')
    //   .update(updates)
    //   .eq('id', id)
    //   .select('*, author:users(*)')
    //   .single();
    // return { data, error };
    
    return { data: null, error: null };
  },

  async deletePost(id: string) {
    // const { error } = await supabase
    //   .from('posts')
    //   .delete()
    //   .eq('id', id);
    // return { error };
    
    return { error: null };
  },

  async toggleReaction(postId: string, userId: string, reactionType: string) {
    // Check if reaction exists
    // const { data: existing } = await supabase
    //   .from('reactions')
    //   .select('*')
    //   .eq('post_id', postId)
    //   .eq('user_id', userId)
    //   .single();
    
    // if (existing) {
    //   if (existing.type === reactionType) {
    //     // Remove reaction
    //     await supabase.from('reactions').delete().eq('id', existing.id);
    //   } else {
    //     // Update reaction type
    //     await supabase.from('reactions').update({ type: reactionType }).eq('id', existing.id);
    //   }
    // } else {
    //   // Create new reaction
    //   await supabase.from('reactions').insert({ post_id: postId, user_id: userId, type: reactionType });
    // }
    
    return { error: null };
  }
};

// Comments service (ready for Supabase)
export const commentsService = {
  async fetchCommentsByPostId(postId: string) {
    // const { data, error } = await supabase
    //   .from('comments')
    //   .select('*, author:users(*)')
    //   .eq('post_id', postId)
    //   .order('created_at', { ascending: true });
    // return { data, error };
    
    return { data: [], error: null };
  },

  async createComment(comment: any) {
    // const { data, error } = await supabase
    //   .from('comments')
    //   .insert(comment)
    //   .select('*, author:users(*)')
    //   .single();
    // return { data, error };
    
    return { data: null, error: null };
  },

  async updateComment(id: string, content: string) {
    // const { data, error } = await supabase
    //   .from('comments')
    //   .update({ content })
    //   .eq('id', id)
    //   .select('*, author:users(*)')
    //   .single();
    // return { data, error };
    
    return { data: null, error: null };
  },

  async deleteComment(id: string) {
    // const { error } = await supabase
    //   .from('comments')
    //   .delete()
    //   .eq('id', id);
    // return { error };
    
    return { error: null };
  }
};
