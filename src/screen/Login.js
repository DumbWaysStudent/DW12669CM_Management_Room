/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, StyleSheet, AsyncStorage} from 'react-native';
import {Button, Input, Item} from 'native-base';
import {StackActions, NavigationActions} from 'react-navigation';
import PasswordInputText from 'react-native-hide-show-password-input';
import * as actionUsers from './../redux/actions/actionUsers';
import {connect} from 'react-redux';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isPasswordValid: false,
      isMailValid: false,
    };
  }

  checkPassword(pass) {
    if (pass === '') {
      this.setState({isPasswordValid: false});
    } else {
      this.setState({isPasswordValid: true});
    }
    this.setState({password: pass});
  }
  checkMail(mail) {
    this.setState({email: mail});
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(mail)) {
      return this.setState({isMailValid: true});
    } else {
      return this.setState({isMailValid: false});
    }
  }
  check(mail, pass) {
    if (mail === true && pass === true) {
      return false;
    } else {
      return true;
    }
  }
  async handleLogin() {
    const email = this.state.email;
    const password = this.state.password;
    await this.props.handleLogin(email, password);
    const users = this.props.userLocal.login;
    if (users.token) {
      await AsyncStorage.multiSet([
        ['token', users.token],
        ['userid', `${users.id}`],
        ['name', users.name],
        ['email', users.email],
        ['image', users.image],
      ]);
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'loading'})],
      });
      this.props.navigation.dispatch(resetAction);
    } else {
      alert('Invalid email or password!');
    }
  }

  render() {
    console.disableYellowBox = true;
    return (
      <View style={{flex: 1}}>
        <View style={styles.subViewTitle}>
          <Text style={styles.title}> Log In </Text>
          <Text style={styles.subTitle}> Login with your WEBTOON account </Text>
        </View>
        <View style={styles.subViewInput}>
          <Text style={{alignItems: 'flex-start'}}> Email </Text>
          <Item>
            <Input
              onChangeText={text => this.checkMail(text)}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Input your email"
            />
          </Item>

          <PasswordInputText
            placeholder="input your password"
            style={{borderColor: 'black'}}
            onChangeText={password => this.checkPassword(password)}
          />

          <Button
            rounded
            style={{marginTop: 20, justifyContent: 'center'}}
            onPress={() => this.handleLogin()}
            disabled={this.check(
              this.state.isMailValid,
              this.state.isPasswordValid,
            )}>
            <Text>Login</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLocal: state.login,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: (email, password) =>
      dispatch(actionUsers.handleLogin(email, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

const styles = StyleSheet.create({
  title: {
    fontSize: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  subViewTitle: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 100,
  },
  subViewInput: {
    flex: 2,
    marginHorizontal: 25,
  },
  subViewLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
