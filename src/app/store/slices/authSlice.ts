import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/app/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

// Load user from localStorage on initialization
const loadUserFromStorage = (): User | null => {
  try {
    const userStr = localStorage.getItem('devstruggles_user');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...initialState,
    user: loadUserFromStorage(),
    isAuthenticated: !!loadUserFromStorage(),
    loading: false,
  },
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('devstruggles_user', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      localStorage.removeItem('devstruggles_user');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;

// Supabase integration will replace these with actual API calls
// Example:
// export const loginWithSupabase = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }: { email: string; password: string }) => {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     if (error) throw error;
//     return data.user;
//   }
// );
