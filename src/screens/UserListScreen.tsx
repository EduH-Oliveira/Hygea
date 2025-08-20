import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useUsers } from '../hooks/useUsers';
import { deleteUser, User } from '../api/userApi';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '../components/CustomButton';

type RootStackParamList = {
  UserList: undefined;
  UserCreate: undefined;
  UserEdit: { id: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'UserList'>;

const UserListScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState<string>('');
  const { users, loading, error,fetchUsers } = useUsers({ name: search });

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar usuário..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      {error && <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text>}
      {!loading && users.length === 0 && !error && <Text>Nenhum usuário encontrado.</Text>}
      {loading && <Text>Carregando...</Text>}
      <FlatList
        data={users}
        keyExtractor={(item) => item._id!}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <Text>{item.name}</Text>
            <View style={styles.actions}>
              <Button title="Editar" onPress={() => navigation.navigate('UserEdit', { id: item._id! })} />
              <Button title="Excluir" onPress={() => handleDelete(item._id!)} />
            </View>
          </View>
        )}
      />
      <CustomButton title='Criar usuario' onPress={()=> navigation.navigate('UserCreate') } />
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
  input: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    padding: 8,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
  },
});
