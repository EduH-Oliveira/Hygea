import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserForm from '../components/UserForm';
import { createUser, User } from '../api/userApi';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  UserList: undefined;
  UserCreate: undefined;
  UserEdit: { id: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'UserCreate'>;

const UserCreateScreen: React.FC<Props> = ({ navigation }) => {
  const handleSubmit = async (data: { name: string; email: string }) => {
    await createUser(data as User);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <UserForm onSubmit={handleSubmit} />
    </View>
  );
};

export default UserCreateScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
