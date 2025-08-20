import { useState, useEffect } from 'react';
import * as userApi from '../api/userApi';
import { User } from '../api/userApi';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const useUsers = (
  filters: Partial<Pick<User, 'name' | 'email'>> = {}
): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await userApi.getUsers(filters);
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setError('Erro ao buscar usuários.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [JSON.stringify(filters)]);

  return { users, loading, error, fetchUsers, setUsers };
};
