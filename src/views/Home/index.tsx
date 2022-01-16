import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Notes } from "../Notes";
import { Social } from "../Social";
import { Reminders } from "../Reminders";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Account } from "../Account";

const Tab = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tab.Navigator initialRouteName="Notes">
      <Tab.Screen
        name="Notes"
        component={Notes}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Reminders"
        component={Reminders}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name={focused ? "bell" : "bell-o"}
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Social"
        component={Social}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "people-sharp" : "people-outline"}
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "people-sharp" : "people-outline"}
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
