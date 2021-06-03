import axios from 'axios';
let url;
if (process.env.NODE_ENV === 'production') {
  url = 'add_your_production_url';
} else {
  url = 'http://localhost:3000';
}

const instance = axios.create({
  baseURL: url
});

instance.interceptors.request.use(
  async config => {
    const token = await window.localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default instance;
