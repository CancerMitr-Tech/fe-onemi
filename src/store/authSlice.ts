import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userName: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  userName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
    clearToken(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.userName = null;
    },
  },
});

export const { setToken, setUserName, clearToken } = authSlice.actions;
export default authSlice.reducer;
