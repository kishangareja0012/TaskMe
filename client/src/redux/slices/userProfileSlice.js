import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

export const userProfileSlice = createSlice({
    name: "userProfile",
    initialState: {
        profile: {},
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                apiSlice.endpoints.updateUserProfile.matchPending,
                (state) => {
                    state.status = 'loading';
                }
            )
            .addMatcher(
                apiSlice.endpoints.updateUserProfile.matchFulfilled,
                (state, { payload }) => {
                    state.status = 'succeeded';
                    state.profile = payload.user;
                }
            )
            .addMatcher(
                apiSlice.endpoints.updateUserProfile.matchRejected,
                (state, { error }) => {
                    state.status = 'failed';
                    state.error = error.message;
                }
            );
    },
});

export const selectUserProfile = (state) => state.userProfile.profile;
export const selectUserProfileStatus = (state) => state.userProfile.status;
export const selectUserProfileError = (state) => state.userProfile.error;

export default userProfileSlice.reducer;
