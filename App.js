import React from 'react';
import { View, StatusBar } from 'react-native';
import GalioApp from './routes';
import theme from './src/theme';

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, color: theme.COLORS.GREY, backgroundColor: theme.COLORS.GREY}}>
        <StatusBar hidden={false} />
        <GalioApp />
      </View>
    );
  }
}
