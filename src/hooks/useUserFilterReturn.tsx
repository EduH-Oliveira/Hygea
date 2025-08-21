import { useState, useEffect } from 'react';
import * as userApi from '../api/userApi';
import { User } from '../api/userApi';

interface UseUserFilterReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  setQuery: (query: string) => void;
  fetchFilteredUsers: () => Promise<void>;
}

export const useUserFilter = (initialQuery = ''): UseUserFilterReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Debounce de 300ms
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(handler);
  }, [query]);

  const fetchFilteredUsers = async () => {
    if (!debouncedQuery) {
      setUsers([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await userApi.getUserFiltered({ name: debouncedQuery });
      setUsers(response.data);
    } catch (err) {
      console.error('Erro ao buscar usuários filtrados:', err);
      setError('Erro ao buscar usuários.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredUsers();
  }, [debouncedQuery]);

  return { users, loading, error, setQuery, fetchFilteredUsers };
};
