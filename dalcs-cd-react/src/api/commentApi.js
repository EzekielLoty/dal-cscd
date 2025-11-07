import axios from './axios';

export const commentApi = {
  getAll: (courseId) => axios.get(`/courses/${courseId}/comments`),
  create: (courseId, data) => axios.post(`/courses/${courseId}/comments`, data),
};
