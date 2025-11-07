import axios from './axios';

export const ratingApi = {
  addOrUpdate: (courseId, data) => axios.post(`/courses/${courseId}/ratings`, data),
};
