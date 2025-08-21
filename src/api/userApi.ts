import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  birthdate: string;
  created_at: string;
}

export const getUserFiltered = (filters?: Partial<Pick<User, 'name' | 'email'>>) => {
  const query = filters?.name ?? filters?.email ?? '';
  return api.get<User[]>('/users/search', { params: { query } });
};
export const getUserAll = () => api.get<User[]>('/users/list');
export const getUser = (id: number) => api.get<User>(`/users/${id}`);
export const createUser = (data: User) => api.post('/users/create', data);
export const editUser = (id: number, data: Partial<User>) => api.put(`/users/${id}/edit`, data);
export const deleteUser = (id: number) => api.delete(`/users/delete/${id}`);