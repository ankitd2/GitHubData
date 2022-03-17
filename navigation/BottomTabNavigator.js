import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import RepositoriesScreen from '../screens/RepositoriesScreen';
import FollowerScreen from "../screens/FollowerScreen";
import FollowingScreen from "../screens/FollowingScreen";
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Profile';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-contact" />,
        }}
      />
      <BottomTab.Screen
        name="Repositories"
        component={RepositoriesScreen}
        options={{
          title: 'Repositories',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
        <BottomTab.Screen
            name="Followers"
            component={FollowerScreen}
            options={{
                title: 'Followers',
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-people" />,
            }}
        />
        <BottomTab.Screen
            name="Following"
            component={FollowingScreen}
            options={{
                title: 'Following',
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-people" />,
            }}
        />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case 'Profile':
            return 'GitHub User Profile';
        case 'Repositories':
            return 'Public Repositories';
        case 'Followers':
            return 'Followers';
        case 'Following':
            return 'Following'


    }
}
