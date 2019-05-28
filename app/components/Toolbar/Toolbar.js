import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
const styles = require('../../style');

export default class Toolbar extends Component {
  render() {
    return (
      <View>
        <StatusBar
          backgroundColor="coral"
          barStyle="light-content"
        />
        <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>
          {this.props.title}
        </Text>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('Toolbar', () => Toolbar);
