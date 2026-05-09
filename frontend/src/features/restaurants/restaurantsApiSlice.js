import { apiSlice } from '../api/apiSlice.js';

export const restaurantsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurants: builder.query({
      query: () => ({
        url: '/restaurants',
      }),
      providesTags: ['Restaurant'],
    }),
    getRestaurantById: builder.query({
      query: (id) => ({
        url: `/restaurants/${id}`,
      }),
      providesTags: ['Restaurant'],
    }),
  }),
});

export const { useGetRestaurantsQuery, useGetRestaurantByIdQuery } = restaurantsApiSlice;
