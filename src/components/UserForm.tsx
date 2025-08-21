import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { User } from '../api/userApi';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomButton from './CustomButton';

interface UserFormProps {
  initialData?: Partial<User>;
  onSubmit: (data: { name: string; email: string; address: string; birthdate: string }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData = {}, onSubmit }) => {
  const [name, setName] = useState<string>(initialData.name || '');
  const [email, setEmail] = useState<string>(initialData.email || '');
  const [address, setAddress] = useState<string>(initialData.address || '');
  const [birthDate, setBirthDate] = useState<Date | null>(
    initialData.birthdate ? new Date(initialData.birthdate + 'T00:00:00') : null
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    setBirthDate(date);
    hideDatePicker();
  };

  
  const handleSave = () => {
    if (!birthDate) return; // opcional: você pode avisar se não tiver data
    const birthdateString = birthDate.toISOString().split('T')[0];
    onSubmit({ name, email, address, birthdate: birthdateString });
  };

   const formatDate = (date: Date | null) => {
    if (!date) return 'Data de nascimento';
    return date.toLocaleDateString('pt-BR');
  };

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
       <TextInput
        placeholder="Endereço"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <TouchableOpacity onPress={showDatePicker} style={styles.input}>
        <Text>{formatDate(birthDate)}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={birthDate || new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />
       
      <CustomButton title="Salvar" onPress={handleSave} />
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
