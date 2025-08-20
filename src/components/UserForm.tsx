import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { User } from '../api/userApi';
import CustomButton from './CustomButton';

interface UserFormProps {
  initialData?: Partial<User>;
  onSubmit: (data: { name: string; email: string }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData = {}, onSubmit }) => {
  const [name, setName] = useState<string>(initialData.name || '');
  const [email, setEmail] = useState<string>(initialData.email || '');

  return (
    <View>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <CustomButton title='Salvar' onPress={()=> {}} />
      {/* <Button title="Salvar" onPress={() => onSubmit({ name, email })} /> */}
    </View>
  );
};

export default UserForm;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 8,
    padding: 8,
  },
});
