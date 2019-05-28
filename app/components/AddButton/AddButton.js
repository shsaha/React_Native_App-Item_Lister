import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableHighlight
} from 'react-native';
const styles = require('../../style');
const constants = styles.constants;

export default class AddButton extends Component {
  render() {
    return (
      <View style={styles.action}>
        <TouchableHighlight
          underlayColor="#24ce84"
          onPress={this.props.onPress}
        >
          <Text style={styles.actionText}>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

AppRegistry.registerComponent('AddButton', () => AddButton);
