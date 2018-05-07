import React from 'react';
import { View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Expo from 'expo';
import { Provider } from 'react-redux';


import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import MapScreen from './src/screens/MapScreen';
import DeckScreen from './src/screens/DeckScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import SettingScreen from './src/screens/SettingScreen';
import WebScreen from './src/screens/WebScreen';
import store from './src/store';

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({ // buat Tab, taroh dulu di variabel
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({  //tab di dalam tab
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              setting: { screen: SettingScreen },
              web: { screen: WebScreen }
            })
          }
        }, {
          tabBarPosition: 'bottom'
        })
      }
    }, {
      tabBarPosition: 'bottom',
      lazy: true, //ngatasi bug tab didalam tab ga bisa dipencet
      swipeEnabled: false,
      animationEnabled: false,
      navigationOptions: {
        tabBarVisible: false
      }
    });

    return (
      <Provider store={store}>
        <View style={{ flex: 1, paddingTop: Expo.Constants.statusBarHeight }}> 
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

