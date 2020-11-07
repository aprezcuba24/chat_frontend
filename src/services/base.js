export const request = async (url, data = {}, method = 'GET') => {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}