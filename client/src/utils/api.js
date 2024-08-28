import axios from 'axios';

// const API_URL = 'http://localhost:5000/api'; 
const API_URL = 'https://job-app-1sfa.onrender.com/api'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

 api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = (email, password) => api.post('/auth/login', { email, password });

export const signup = (email, password) => api.post('/auth/signup', { email, password });

export const getCurrentUser = () => api.get('/auth/me');

export const fetchJobs = () => api.get('/jobs');

export const createJob = (jobData) => api.post('/jobs', jobData);

export const updateJob = (jobId, jobData) => api.put(`/jobs/${jobId}`, jobData);

export const deleteJob = (jobId) => api.delete(`/jobs/${jobId}`);

export const applyForJob = (jobId) => api.post(`/jobs/${jobId}/apply`);

 
export default api;