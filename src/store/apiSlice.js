import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '../services/customBaseQuery';

/**
 * Production-grade RTK Query API slice for Urban Clothing.
 *
 * Features:
 * - Custom baseQuery with timeout, retry, 401 auto-logout, dev logging
 * - Granular cache tags for precise invalidation
 * - Optimistic updates for order mutations
 * - Response normalization where needed
 * - All 22 documented endpoints covered
 */

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,

  // Keep cached data warm for 5 minutes after last subscription ends
  keepUnusedDataFor: 300,

  // Refetch on reconnect / refocus for real-time freshness
  refetchOnReconnect: true,
  refetchOnFocus: false,

  tagTypes: ['Product', 'Order', 'User', 'AdminStats'],

  endpoints: (builder) => ({
    // ================================================================
    // PRODUCTS (6 endpoints)
    // ================================================================

    getProducts: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        searchParams.append('page', String(params.page ?? 1));
        searchParams.append('limit', String(params.limit ?? 20));
        if (params.category) searchParams.append('category', params.category);
        if (params.search) searchParams.append('search', params.search);
        if (params.sort) searchParams.append('sort', params.sort);
        if (params.minPrice != null) searchParams.append('minPrice', String(params.minPrice));
        if (params.maxPrice != null) searchParams.append('maxPrice', String(params.maxPrice));
        const qs = searchParams.toString();
        return `/products?${qs}`;
      },
      providesTags: (result) =>
        result?.products
          ? [
              ...result.products.map((p) => ({ type: 'Product', id: p._id || p.id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    getFeaturedProducts: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.limit) searchParams.append('limit', String(params.limit));
        const qs = searchParams.toString();
        return qs ? `/products/featured?${qs}` : '/products/featured';
      },
      providesTags: [{ type: 'Product', id: 'FEATURED' }],
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    createProduct: builder.mutation({
      query: (formData) => ({
        url: '/products',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [
        { type: 'Product', id: 'LIST' },
        { type: 'Product', id: 'FEATURED' },
      ],
    }),

    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
        { type: 'Product', id: 'FEATURED' },
      ],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
        { type: 'Product', id: 'FEATURED' },
      ],
    }),

    // ================================================================
    // ORDERS (7 endpoints)
    // ================================================================

    getOrders: builder.query({
      query: () => '/orders',
      providesTags: (result) =>
        result?.orders
          ? [
              ...result.orders.map((o) => ({ type: 'Order', id: o._id || o.orderId })),
              { type: 'Order', id: 'LIST' },
            ]
          : [{ type: 'Order', id: 'LIST' }],
      transformResponse: (response) => {
        if (response && Array.isArray(response.orders)) {
          return response;
        }
        return { orders: Array.isArray(response) ? response : [], count: 0 };
      },
    }),

    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),

    createOrder: builder.mutation({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'Order', id: 'LIST' },
        { type: 'AdminStats', id: 'STATS' },
      ],
    }),

    trackOrder: builder.query({
      query: (orderId) => `/orders/${orderId}/track`,
      providesTags: (result, error, orderId) => [{ type: 'Order', id: orderId }],
    }),

    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/cancel`,
        method: 'PUT',
      }),
      // Optimistic update: immediately mark order as cancelled in cache
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getOrders', undefined, (draft) => {
            if (!draft?.orders) return;
            const order = draft.orders.find((o) => (o._id || o.id) === id);
            if (order) {
              order.status = 'cancelled';
            }
          })
        );
        const patchAll = dispatch(
          apiSlice.util.updateQueryData('getAllOrders', undefined, (draft) => {
            if (!draft?.orders) return;
            const order = draft.orders.find((o) => (o._id || o.id) === id);
            if (order) {
              order.status = 'cancelled';
            }
          })
        );
        const patchAdmin = dispatch(
          apiSlice.util.updateQueryData('getAdminOrders', undefined, (draft) => {
            if (!draft?.orders) return;
            const order = draft.orders.find((o) => (o._id || o.id) === id);
            if (order) {
              order.status = 'cancelled';
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          patchAll.undo();
          patchAdmin.undo();
        }
      },
      invalidatesTags: (result, error, id) => [
        { type: 'Order', id },
        { type: 'Order', id: 'LIST' },
        { type: 'AdminStats', id: 'STATS' },
      ],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: 'PUT',
        body: { status },
      }),
      // Optimistic update: immediately reflect status change in all order lists
      async onQueryStarted({ orderId, status }, { dispatch, queryFulfilled }) {
        const patches = [];
        const updateOrderInDraft = (draft) => {
          if (!draft?.orders) return;
          const order = draft.orders.find(
            (o) => (o._id || o.id || o.orderId) === orderId
          );
          if (order) {
            order.status = status;
            if (!order.statusTimestamps) order.statusTimestamps = {};
            order.statusTimestamps[status] = new Date().toISOString();
          }
        };

        patches.push(
          dispatch(apiSlice.util.updateQueryData('getOrders', undefined, updateOrderInDraft))
        );
        patches.push(
          dispatch(apiSlice.util.updateQueryData('getAllOrders', undefined, updateOrderInDraft))
        );
        patches.push(
          dispatch(apiSlice.util.updateQueryData('getAdminOrders', undefined, updateOrderInDraft))
        );
        // Also invalidate specific order detail if cached
        patches.push(
          dispatch(
            apiSlice.util.updateQueryData('getOrderById', orderId, (draft) => {
              if (draft?.order || draft) {
                const order = draft.order || draft;
                order.status = status;
                if (!order.statusTimestamps) order.statusTimestamps = {};
                order.statusTimestamps[status] = new Date().toISOString();
              }
            })
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patches.forEach((p) => p.undo());
        }
      },
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Order', id: orderId },
        { type: 'Order', id: 'LIST' },
        { type: 'AdminStats', id: 'STATS' },
      ],
    }),

    getAllOrders: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', String(params.page));
        if (params.limit) searchParams.append('limit', String(params.limit));
        const qs = searchParams.toString();
        return qs ? `/orders/all?${qs}` : '/orders/all';
      },
      providesTags: (result) =>
        result?.orders
          ? [
              ...result.orders.map((o) => ({ type: 'Order', id: o._id || o.orderId })),
              { type: 'Order', id: 'LIST' },
            ]
          : [{ type: 'Order', id: 'LIST' }],
    }),

    // ================================================================
    // AUTH (5 endpoints)
    // ================================================================

    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: '/auth/profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    updatePassword: builder.mutation({
      query: (body) => ({
        url: '/auth/password',
        method: 'PUT',
        body,
      }),
    }),

    // ================================================================
    // ADMIN (4 endpoints)
    // ================================================================

    getAdminStats: builder.query({
      query: () => '/admin/stats',
      providesTags: [{ type: 'AdminStats', id: 'STATS' }],
    }),

    getAdminUsers: builder.query({
      query: () => '/admin/users',
      providesTags: ['User'],
    }),

    getAdminRecentOrders: builder.query({
      query: () => '/admin/recent-orders',
      providesTags: ['Order'],
    }),

    getAdminOrders: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', String(params.page));
        if (params.limit) searchParams.append('limit', String(params.limit));
        const qs = searchParams.toString();
        return qs ? `/admin/orders?${qs}` : '/admin/orders';
      },
      providesTags: (result) =>
        result?.orders
          ? [
              ...result.orders.map((o) => ({ type: 'Order', id: o._id || o.orderId })),
              { type: 'Order', id: 'LIST' },
            ]
          : [{ type: 'Order', id: 'LIST' }],
    }),
  }),
});

// ====================================================================
// Exports — identical surface to before, so consumers need zero changes
// ====================================================================

export const {
  // Products
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetFeaturedProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,

  // Orders
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useTrackOrderQuery,
  useLazyTrackOrderQuery,
  useCancelOrderMutation,
  useUpdateOrderStatusMutation,
  useGetAllOrdersQuery,

  // Auth
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,

  // Admin
  useGetAdminStatsQuery,
  useGetAdminUsersQuery,
  useGetAdminRecentOrdersQuery,
  useGetAdminOrdersQuery,
} = apiSlice;
