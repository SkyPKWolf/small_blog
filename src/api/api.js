export const BASE_URL = 'https://bloggy-api.herokuapp.com/';

export const getData = async(endPoint) => {
  const response = await fetch(`${BASE_URL}${endPoint}`);
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const result = await response.json();

  return result;
};

export const remove = (url, id) => {
  return fetch(`${BASE_URL}${url}/${id}`, {
    method: 'DELETE',
  });
}

export const post = (url, body) => {
  return fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(body),
  });
}

export const put = (url, body) => {
  return fetch(`${BASE_URL}${url}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(body),
  });
}