import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useUsers } from '../hooks/useUsers';
import { useUserFilter } from '../hooks/useUserFilterReturn';
import { deleteUser } from '../api/userApi';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  UserList: undefined;
  UserCreate: undefined;
  UserEdit: { id: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'UserList'>;

const UserListScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState<string>('');
  const { users: allUsers, loading: loadingAll, error: errorAll, fetchUsers } = useUsers();
  const { users: filteredUsers, loading: loadingFilter, error: errorFilter, setQuery } = useUserFilter('');

  const users = search.trim() ? filteredUsers : allUsers;
  const loading = search.trim() ? loadingFilter : loadingAll;
  const error = search.trim() ? errorFilter : errorAll;

  useEffect(() => {
    setQuery(search);
  }, [search]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUsers();
      setQuery(search);
    });
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    if (search.trim()) {
      setQuery(search);
    } else {
      fetchUsers();
    }
  };

  const confirmDelete = (id: number) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir este usuário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => handleDelete(id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar usuário..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {error && <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text>}
      {!loading && users.length === 0 && !error && <Text>Nenhum usuário encontrado.</Text>}
      {loading && <Text>Carregando...</Text>}

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <Text>{item.name}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => navigation.navigate('UserEdit', { id: item.id })}>
                <Ionicons name="create-outline" size={24} color="blue" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => confirmDelete(item.id)} style={{ marginLeft: 16 }}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <CustomButton title="Criar usuário" onPress={() => navigation.navigate('UserCreate')} />
    </View>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 30,
  },
  search: {
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    padding: 8,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  actions: {
    flexDirection: 'row',
  },
});
