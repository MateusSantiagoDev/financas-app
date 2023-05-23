import { View, Text, Button } from "react-native";
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export function Home() {
  const { signOut } = useContext<any>(AuthContext)


  return (
    <View>
      <Text>Home</Text>
      <Button
      title="sair"
      onPress={() => signOut()}
      />
    </View>
  );
}
