import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';


import Login from './components/login/';
import Home from './components/home/';
import BlankPage from './components/blankPage';
import { statusBarColor } from './themes/base-theme';
import NavigationDrawer from './NavigationDrawer';
import TabIcon from './TabIcon';
import TabView from './TabView';

const RouterWithRedux = connect()(Router);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

class AppNavigator extends Component {

  _renderScene (props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'login':
        return <Login />;
      case 'home':
        return <Home />;
      case 'blankPage':
        return <BlankPage />;
      case 'tabbar':
        return <NavigationDrawer />;
      default :
        return <Login />;
    }
  }

  render() {
    return (
      <RouterWithRedux>
        <Scene key="root">
          <Scene key="login" component={Login} hideNavBar hideTabBar initial />
          <Scene key="tabbar" component={NavigationDrawer}>
            <Scene
              key="main"
              tabs
              tabBarStyle={styles.tabBarStyle}
              tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
            >
              <Scene
                key="tab1"
                title="Tab #1"
                icon={TabIcon}
                navigationBarStyle={{ backgroundColor: 'red' }}
                titleStyle={{ color: 'white' }}
              >
                <Scene
                  key="tab1_1"
                  component={Home}
                  title="Tab #1_1"
                  onRight={() => alert('Right button')}
                  rightTitle="Right"
                />
                <Scene
                  key="blankPage"
                  component={BlankPage}
                  title="Tab #1_2"
                  titleStyle={{ color: 'black' }}
                />
              </Scene>
              <Scene key="tab2" initial title="Tab #2" icon={TabIcon}>
                <Scene
                  key="tab2_1"
                  component={TabView}
                  title="Tab #2_1"
                  renderRightButton={() => <Text>Right</Text>}
                />
                <Scene
                  key="tab2_2"
                  component={TabView}
                  title="Tab #2_2"
                  hideBackImage
                  onBack={() => alert('Left button!')}
                  backTitle="Left"
                  duration={1}
                  panHandlers={null}
                />
              </Scene>
            </Scene>
          </Scene>

        </Scene>
      </RouterWithRedux>
    );
  }
}

function bindAction (dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
