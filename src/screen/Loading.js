import React, {Component} from 'react';
import {View, AsyncStorage} from 'react-native';
import {Text} from 'native-base';
import {StackActions, NavigationActions} from 'react-navigation';
import * as actionCustomer from './../redux/actions/actionCustomers';
import * as actionRoom from './../redux/actions/actionRooms';
import * as actionCheckin from './../redux/actions/actionOrders';
import {connect} from 'react-redux';

class Loading extends Component {
  componentDidMount() {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem('token');
      if (token === null) {
        this.props.navigation.navigate('login');
      } else {
        await this.props.handleGetRooms(token);
        await this.props.handleGetCust(token);
        await this.props.handleGetCheckin(token);
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'home'})],
        });
        this.props.navigation.dispatch(resetAction);
      }
    }, 1000);
  }
  render() {
    console.disableYellowBox = true;
    return (
      <View style={styles.view}>
        <Text style={styles.text}>Lagi Loading ...</Text>
      </View>
    );
  }
}

const styles = {
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 80,
  },
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetRooms: tok => dispatch(actionRoom.handleGetRooms(tok)),
    handleGetCust: tok => dispatch(actionCustomer.handleGetCust(tok)),
    handleGetCheckin: tok => dispatch(actionCheckin.handleGetCheckins(tok)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Loading);
