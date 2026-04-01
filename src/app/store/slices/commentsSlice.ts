import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, ReactionType } from '@/app/types';

interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
      state.loading = false;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    updateComment: (state, action: PayloadAction<Comment>) => {
      const index = state.comments.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.comments[index] = action.payload;
      }
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter(c => c.id !== action.payload);
    },
    toggleCommentReaction: (state, action: PayloadAction<{ commentId: string; reactionType: ReactionType }>) => {
      const { commentId, reactionType } = action.payload;
      const comment = state.comments.find(c => c.id === commentId);
      
      if (comment) {
        // Remove previous reaction if exists
        if (comment.user_reaction) {
          comment.reactions[comment.user_reaction] = Math.max(0, comment.reactions[comment.user_reaction] - 1);
        }
        
        // Toggle new reaction
        if (comment.user_reaction === reactionType) {
          comment.user_reaction = null;
        } else {
          comment.reactions[reactionType] = (comment.reactions[reactionType] || 0) + 1;
          comment.user_reaction = reactionType;
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearComments: (state) => {
      state.comments = [];
    },
  },
});

export const {
  setComments,
  addComment,
  updateComment,
  deleteComment,
  toggleCommentReaction,
  setLoading,
  setError,
  clearComments,
} = commentsSlice.actions;

export default commentsSlice.reducer;
