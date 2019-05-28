import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Modal,
  TextInput
} from 'react-native';
const styles = require('./app/style');

import Toolbar from './app/components/Toolbar/Toolbar';
import AddButton from './app/components/AddButton/AddButton';

import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBDgLcwqiyrjl7TIRBScZdVQvjc5-y4WO0",
    authDomain: "itemlister-fe979.firebaseapp.com",
    databaseURL: "https://itemlister-fe979.firebaseio.com",
    storageBucket: "itemlister-fe979.appspot.com"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class itemlister extends Component {
  constructor(){
    super();
    let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    this.state = {
      text:'',
      itemDataSource: ds,
      modalVisible: false
    }

    this.itemsRef = this.getRef().child('items');

    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }

  setModalVisible(visible){
    this.setState({modalVisible:visible});
  }

  getRef(){
    return firebaseApp.database().ref();
  }

  componentWillMount(){
    this.getItems(this.itemsRef);
  }

  componentDidMount(){
    //this.getItems(this.itemsRef);
  }

  getItems(itemsRef){
    //let items = [{title:'Item One'},{title:'Item Two'}];
    itemsRef.on('value',(snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });
      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      });
    });
  }

  pressRow(item){
    this.itemsRef.child(item._key).remove();
  }

  renderRow(item){
    return (
      <TouchableHighlight onPress={() => {
        this.pressRow(item);
      }}>
        <View style={styles.li}>
          <Text style={styles.liText}>{item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  addItem(){
    this.setModalVisible(true);
  }

  render() {
    return (
      <View style={styles.container}>
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {}}
        >
       <View style={{marginTop: 22}}>
        <View>
          <Toolbar title="Add Item" />
          <TextInput
            value={this.state.text}
            placeholder="Add Item"
            onChangeText = {(value) => this.setState({text:value})}
          />
          <TouchableHighlight onPress={() => {
            this.itemsRef.push({title: this.state.text});
            this.setModalVisible(!this.state.modalVisible)
          }}>
            <Text>Save Item</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => {
            this.setModalVisible(!this.state.modalVisible)
          }}>
            <Text>Cancel</Text>
          </TouchableHighlight>

        </View>
       </View>
      </Modal>

        <Toolbar title="ItemLister" />
        <ListView
          dataSource={this.state.itemDataSource}
          renderRow={this.renderRow}
        />

        <AddButton onPress={this.addItem.bind(this)} title="Add Item" />
      </View>
    );
  }
}

AppRegistry.registerComponent('itemlister', () => itemlister);
