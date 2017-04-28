import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View} from "react-native";
import { Container, Content } from 'native-base';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 2,
    borderColor: 'red',
  },
});

const TabView = (props, context) => {
  const drawer = context.drawer;
  return (
    <View style={[styles.container, props.sceneStyle ]}>
      <Text>Tab {props.title}</Text>
      {props.name === 'tab1_1' &&
      <Button onPress={Actions.tab1_2}><Text>next screen for tab1_1</Text></Button>
      }
      {props.name === 'tab2_1' &&
      <Button onPress={Actions.tab2_2}><Text>next screen for tab2_1</Text></Button>
      }
      <Button onPress={Actions.pop}><Text>Back</Text></Button>
      <Button onPress={() => { drawer.close(); Actions.tab1(); }}><Text>Switch to tab1</Text></Button>
      <Button onPress={() => { drawer.close(); Actions.tab2(); }}><Text>Switch to tab2</Text></Button>
      <Button onPress={() => { drawer.close(); Actions.tab3(); }}><Text>Switch to tab3</Text></Button>
      <Button onPress={() => { drawer.close(); Actions.tab4(); }}><Text>Switch to tab4</Text></Button>
      <Button onPress={() => { drawer.close(); Actions.tab5(); }}><Text>Switch to tab5</Text></Button>
      <Button onPress={() => { drawer.close(); Actions.echo(); }}><Text>push new scene</Text></Button>
    </View>
  );
};

TabView.contextTypes = contextTypes;
TabView.propTypes = propTypes;

export default TabView;
