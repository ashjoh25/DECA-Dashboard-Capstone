import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://deca-dashboard-capstone-581238473076.us-central1.run.app',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchWithAuth = async (getAccessTokenSilently, url, method = 'GET', data = null) => {
  try {
    const token = await getAccessTokenSilently();
    const response = await instance({
      method,
      url,
      data,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching API:", error);
    return null;
  }
};

export default instance;
