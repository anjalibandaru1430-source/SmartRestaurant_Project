import { apiSlice } from '../api/apiSlice.js';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
      }),
      providesTags: ['Order'],
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `/orders/${orderId}/pay`,
        method: 'PUT',
        body: details,
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: '/orders/myorders',
      }),
      providesTags: ['Order'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
} = ordersApiSlice;
