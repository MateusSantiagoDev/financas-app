import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "../pages/Home";
import { New } from "../pages/New";
import { Profile } from "../pages/Profile";
import { CustomDrawer } from '../components/CustomDrawer';

const AppDrawer = createDrawerNavigator();

//drawerContent= indicando que voui charam um drawer personalizado
// <CustomDrawer {...props}/> passando todas as 
// propriedades para o drawer personalizado
export function AppRouter() {
  return (
    <AppDrawer.Navigator
    drawerContent={ (props) => <CustomDrawer {...props}/>}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#171717",
        },
        drawerLabelStyle: {
          fontWeight: "bold",
        },
        drawerActiveTintColor: "#fff",
        drawerActiveBackgroundColor: "#00b94a",
        drawerInactiveBackgroundColor: "#000",
        drawerInactiveTintColor: "#DDD",
        drawerItemStyle: {
          marginVertical: 5,
        },
      }}
    >
      <AppDrawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <AppDrawer.Screen
        name="Register"
        component={New}
        options={{
          headerShown: false,
        }}
      />
      <AppDrawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </AppDrawer.Navigator>
  );
}
