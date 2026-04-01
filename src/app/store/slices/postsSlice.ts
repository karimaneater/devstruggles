import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, ReactionType } from '@/app/types';

interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
  sortBy: 'hot' | 'new' | 'top' | 'trending';
  selectedTags: string[];
  searchQuery: string;
}

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  sortBy: 'hot',
  selectedTags: [],
  searchQuery: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.loading = false;
    },
    setCurrentPost: (state, action: PayloadAction<Post | null>) => {
      state.currentPost = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      if (state.currentPost?.id === action.payload.id) {
        state.currentPost = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(p => p.id !== action.payload);
      if (state.currentPost?.id === action.payload) {
        state.currentPost = null;
      }
    },
    toggleReaction: (state, action: PayloadAction<{ postId: string; reactionType: ReactionType }>) => {
      const { postId, reactionType } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      
      if (post) {
        // Remove previous reaction if exists
        if (post.user_reaction) {
          post.reactions[post.user_reaction] = Math.max(0, post.reactions[post.user_reaction] - 1);
        }
        
        // Toggle new reaction
        if (post.user_reaction === reactionType) {
          post.user_reaction = null;
        } else {
          post.reactions[reactionType] = (post.reactions[reactionType] || 0) + 1;
          post.user_reaction = reactionType;
        }
      }
      
      // Update currentPost if it matches
      if (state.currentPost?.id === postId && post) {
        state.currentPost = { ...post };
      }
    },
    setSortBy: (state, action: PayloadAction<'hot' | 'new' | 'top' | 'trending'>) => {
      state.sortBy = action.payload;
    },
    setSelectedTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setPosts,
  setCurrentPost,
  addPost,
  updatePost,
  deletePost,
  toggleReaction,
  setSortBy,
  setSelectedTags,
  setSearchQuery,
  setLoading,
  setError,
} = postsSlice.actions;

export default postsSlice.reducer;

// Supabase integration examples:
// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//   const { data, error } = await supabase
//     .from('posts')
//     .select('*, author:users(*)')
//     .order('created_at', { ascending: false });
//   if (error) throw error;
//   return data;
// });
