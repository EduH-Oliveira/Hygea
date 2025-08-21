import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserForm from '../components/UserForm';
import { getUser, editUser, User } from '../api/userApi';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  UserList: undefined;
  UserCreate: undefined;
  UserEdit: { id: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'UserEdit'>;

const UserEditScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const [user, setUser] = useState<User | null>(null);

  console.log(id);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser(id);
      setUser(response.data);
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (data: { name: string; email: string }) => {
    if (!user) return;
    await editUser(id, data);
    navigation.goBack();
  };

  if (!user) return <Text>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <UserForm initialData={user} onSubmit={handleSubmit} />
    </View>
  );
};

export default UserEditScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
