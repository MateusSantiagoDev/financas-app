import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "../pages/Home";

const AppDrawer = createDrawerNavigator();

export function AppRouter() {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Home" component={Home} />
    </AppDrawer.Navigator>
  );
}
