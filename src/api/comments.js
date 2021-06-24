import { post } from './api';

const endPoint = 'comments';

export const addComment = (body) => {
  return post(endPoint, body)
    .then(response => response.json())
}

