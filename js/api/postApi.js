import axiosClient from './axiosClient.js';

const postApi = {
  getAll: (params) => {
    const url = '/posts';
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },

  addPost: (payload) => {
    const url = '/posts';
    return axiosClient.post(url, payload);
  },

  updatePost: (newPost) => {
    if (!newPost.id) throw new Error('Missing id in post object');

    const url = `/posts/${newPost.id}`;
    return axiosClient.put(url, newPost);
  },

  deletePost: (postId) => {
    const url = `/posts/${postId}`;
    return axiosClient.delete(url);
  },
};

export default postApi;
