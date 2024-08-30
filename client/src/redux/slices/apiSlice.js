import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8800/api',
    prepareHeaders: (headers, { getState }) => {
      // Retrieve the token from the state
      const token = getState().auth.user?.token;

      // If the token exists, include it in the headers for `createTask`
      if (token) {
        headers.set('authorization', `${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/user/register',
        method: 'POST',
        body: userData,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (profileData) => ({
        url: '/user/profile',
        method: 'PUT',
        body: profileData,
      }),
    }),
    createTask: builder.mutation({
      query: (taskData) => ({
        url: '/task/create',
        method: 'POST',
        body: taskData,
      }),
    }),
    GetTask: builder.mutation({
      query: (getTaskData) => ({
        url: '/task',
        method: 'GET',
        body: getTaskData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserProfileMutation,
  useCreateTaskMutation,
  useGetTaskMutation,
} = apiSlice;
