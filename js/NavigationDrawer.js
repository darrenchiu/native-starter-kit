import React, { PropTypes } from 'react';
// import Drawer from 'react-native-drawer';
import { connect } from 'react-redux';
import { DefaultRenderer, Actions } from 'react-native-router-flux';
import SideBar from './components/sideBar';

import { closeDrawer } from './actions/drawer';
import { Drawer } from 'native-base';

import TabView from './TabView';

const propTypes = {
  navigationState: PropTypes.object,
};

class NavigationDrawer extends React.Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    closeDrawer: React.PropTypes.func,
  };


  componentDidUpdate () {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }

  openDrawer () {
    this._drawer._root.open();
  }

  closeDrawer () {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<SideBar />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={(ratio) => {  //eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
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

NavigationDrawer.propTypes = propTypes;

export default connect(mapStateToProps, bindAction)(NavigationDrawer);
