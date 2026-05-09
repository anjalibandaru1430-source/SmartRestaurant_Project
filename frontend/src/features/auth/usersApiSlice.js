import { apiSlice } from '../api/apiSlice.js';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: '/auth/profile',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useProfileQuery } = usersApiSlice;
