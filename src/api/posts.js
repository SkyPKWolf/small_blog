import { remove, post, put } from './api';

const endPoint = 'posts';

export const deletePost = (postId) => {
  return remove(endPoint, postId);
}

export const addPost = (body) => {
  return post(endPoint, body)
    .then(response => response.json())
}

export const updatePost = (body, postId) => {
  return put(`${endPoint}/${postId}`, body)
    .then(response => response.json())
}