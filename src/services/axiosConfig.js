import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://deca-dashboard-capstone-581238473076.us-central1.run.app', // Your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
