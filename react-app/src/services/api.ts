const API_URL = 'http://localhost:4000/api';

export const fetchState = async () => {
  const response = await fetch(`${API_URL}/state`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const sendTransition = async (event: string) => {
  const response = await fetch(`${API_URL}/transition`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const sendReset = async () => {
  const response = await fetch(`${API_URL}/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
