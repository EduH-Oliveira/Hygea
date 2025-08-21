import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserListScreen from "../screens/UserListScreen";
import UserCreateScreen from "../screens/UserCreateScreen";
import UserEditScreen from "../screens/UserEditScreen";

export type RootStackParamList = {
  UserList: undefined;
  UserCreate: undefined;
  UserEdit: {id: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
        <Stack.Screen name="UserList" component={UserListScreen} options={{title: "Usuarios"}} />
        <Stack.Screen name="UserCreate" component={UserCreateScreen} options={{ title: 'Criar Usuário' }} />
        <Stack.Screen name="UserEdit" component={UserEditScreen} options={{ title: 'Editar Usuário' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}