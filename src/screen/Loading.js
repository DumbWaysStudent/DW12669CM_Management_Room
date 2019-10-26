import React, {Component} from 'react';
import {View, AsyncStorage} from 'react-native';
import {Text} from 'native-base';
import {StackActions, NavigationActions} from 'react-navigation';
import * as actionWebtoons from './../redux/actions/actionWebtoons';
import {connect} from 'react-redux';

class Loading extends Component {
  componentDidMount() {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      if (token === null) {
        this.props.navigation.navigate('login');
      } else {
        const tok = await AsyncStorage.getItem('token');
        await this.props.handleGetRooms(tok);
        await this.props.handleGetCust(tok);
        // await this.props.handleGetEps();
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'home'})],
        });
        this.props.navigation.dispatch(resetAction);
      }
    }, 1000);
  }
  render() {
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
    handleGetRooms: tok => dispatch(actionWebtoons.handleGetRooms(tok)),
    handleGetCust: tok => dispatch(actionWebtoons.handleGetCust(tok)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Loading);
