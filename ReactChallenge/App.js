import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import RootNavigation from './navigations/RootNavigation'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Provider } from 'react-redux'
import { store } from './store/index'

export default function App() {

  const [ fontLoaded, setFontLoaded ] = useState(false)

  const fetchFont = () => {
    return Font.loadAsync({
        'pokemon-font': require('./assets/font/Press_Start_2P/PressStart2P-Regular.ttf')
    })
  }

  if(!fontLoaded) {
      return (
          <AppLoading
              startAsync={fetchFont}
              onFinish={() => setFontLoaded(true)}
          />
      )
  }

  return (
      <NavigationContainer>
          <Provider store={store}>
            <RootNavigation />
          </Provider>
      </NavigationContainer>
  );
}
