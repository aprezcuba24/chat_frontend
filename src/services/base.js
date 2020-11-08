export const request = async (url, data, method = 'GET', getJson = true) => {
  const headers = {
    'Content-Type': 'application/ld+json',
  };
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const requestData = { method, headers };
  if (data) {
    requestData['body'] = JSON.stringify(data);
  }
  const response = await fetch(url, requestData);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  if (getJson) {
    return response.json();
  }

  return response;
}