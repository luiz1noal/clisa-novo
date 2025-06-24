import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


=======
  baseURL: 'http://localhost:5000',
});

// Token automático em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
export default api;
