import { createSlice } from '@reduxjs/toolkit';

// putting the user into the redux state
const initialState = {
    user: {},
    isAuthenticated: false,
    sessionId: '',
};

// actually logging in the user
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.sessionId = localStorage.getItem('session_id');

            localStorage.setItem('accountId', action.payload.id);
        },
    },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;

// this just gives only the data of the specific user in session
// it's like a full cake and you just take a piece of it.
export const userSelector = (state) => state.currentUser;
