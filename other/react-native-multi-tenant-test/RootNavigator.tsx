import { NavigationContainer } from "@react-navigation/native";
import SettingsScreen from "./modules/core/settings/Settings";
import MatchesScreen from "./modules/matches/MatchesScreen";
import MatchDetailsScreen from "./modules/matches/MatchScreen";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { WelcomeScreen } from "./modules/matches/WelcomeScreen";

export type RootStackParamList = {
  Matches: undefined;
  MatchSingle: {
    matchId: string;
  };
  Settings: undefined;
  Welcome: undefined;
};

const Drawer = createDrawerNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Welcome" component={WelcomeScreen} />
        <Drawer.Screen name="Matches" component={MatchesScreen} />
        <Drawer.Screen
          name="MatchSingle"
          component={MatchDetailsScreen}
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
