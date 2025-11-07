import axios from './axios';

export const courseApi = {
  getAll: (search = '') => axios.get(`/courses${search ? `?search=${search}` : ''}`),
  getById: (id) => axios.get(`/courses/${id}`),
  create: (data) => axios.post('/courses', data),
  update: (id, data) => axios.put(`/courses/${id}`, data),
  delete: (id) => axios.delete(`/courses/${id}`),
};
