import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../pages/Home";

const AppDrawer = createStackNavigator();

export function AppRouter() {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Home" component={Home} />
    </AppDrawer.Navigator>
  );
}
