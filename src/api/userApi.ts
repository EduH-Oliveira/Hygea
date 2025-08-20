import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3306',
});

export interface User {
  _id?: string;
  name: string;
  email: string;
}

export const getUsers = (filters?: Partial<Pick<User, 'name' | 'email'>>) =>
  api.get<User[]>('/user/list', { params: filters });
export const getUser = (id: string) => api.get<User>(`/user/${id}`);
export const createUser = (data: User) => api.post('/user/create', data);
export const editUser = (id: string, data: Partial<User>) => api.put(`/user/${id}/edit`, data);
export const deleteUser = (id: string) => api.delete(`/user/delete/${id}`);