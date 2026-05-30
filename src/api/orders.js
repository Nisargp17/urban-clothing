import api from './client';

export const ordersApi = {
  create: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/my-orders'),
  getById: (id) => api.get(`/orders/${id}`),
  getAll: () => api.get('/orders/admin/all'),
  updateStatus: (id, data) => api.put(`/orders/${id}/status`, data),
};
