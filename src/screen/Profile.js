/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  AsyncStorage,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import {Header, Title, Body, Card} from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
// const image= this.props.navigation.getParam('image');
// const profName= this.props.navigation.getParam('name');
const {width} = Dimensions.get('window');
export class Profile extends Component {
  state = {
    // image: this.props.adminsLocal.login.image,
    // name: this.props.adminsLocal.login.name,
    // email: this.props.adminsLocal.login.email,
    image: '',
    name: '',
    email: '',
  };
  async componentDidMount() {
    const image = await AsyncStorage.getItem('image');
    const name = await AsyncStorage.getItem('name');
    const email = await AsyncStorage.getItem('email');
    this.setState({name, image, email});
  }
  async handleLogOut() {
    await AsyncStorage.removeItem('token');
    await this.props.navigation.navigate('login');
  }
  handleEditProfile(item) {
    this.props.navigation.navigate('editProfile', {name: item});
  }
  handleMytoon() {
    this.props.navigation.navigate('myWebToon');
  }
  render() {
    return (
      <View style={styles.mainView}>
        <View style={{flex: 1}}>
          <Header style={styles.header}>
            <Body>
              <Title style={styles.titleHeader}> Admins </Title>
            </Body>
          </Header>
        </View>
        <Card style={styles.profile}>
          <View style={{justifyContent: 'center'}}>
            <Image
              source={{uri: this.state.image}}
              style={styles.iconProfile}
            />
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.iconName}>
              {'Email   : '}
              {this.state.email}
            </Text>
            <Text style={styles.iconName}>
              {'Name   : '}
              {this.state.name}
            </Text>
          </View>
        </Card>
        <View style={styles.logout}>
          <View style={styles.viewButtonText}>
            <TouchableOpacity
              style={styles.opacity}
              onPress={() => this.handleLogOut()}>
              <Text style={styles.text}> Log Out </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     adminsLocal: state.login,
//   };
// };
export default connect(/*mapStateToProps}*/)(Profile);

const styles = {
  header: {
    backgroundColor: '#718093',
    height: 100,
  },
  titleHeader: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'center',
  },
  iconHeader: {
    color: 'orange',
    fontSize: 50,
    marginRight: 10,
  },
  profile: {
    marginTop: 40,
    alignSelf: 'center',
    flex: 2,
    width: width * 0.95,
    flexDirection: 'row',
    borderRadius: 100,
    paddingLeft: 10,
    backgroundColor: '#2f3640',
  },
  mainView: {
    backgroundColor: '#dfe4ea',
    flex: 1,
  },
  iconProfile: {
    borderWidth: 1,
    borderColor: '#f1f2f6',
    width: 180,
    height: 180,
    borderRadius: 100,
    alignSelf: 'center',
  },
  iconName: {
    fontSize: 34,
    marginLeft: 20,
    color: 'white',
  },
  viewButtonText: {
    paddingTop: 10,
    backgroundColor: '#353b48',
    alignSelf: 'center',
    flex: 0.14,
    width: width * 0.4,
    borderRadius: 15,
  },
  logout: {
    marginTop: 40,
    flex: 5.2,
  },
  opacity: {
    flex: 1,
    alignSelf: 'center',
  },
  text: {
    fontSize: 40,
    marginBottom: 10,
    flex: 9,
    color: 'white',
  },
  iconButtonText: {
    flex: 1,
    marginTop: 5,
    fontSize: 40,
  },
  imageProfile: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    marginTop: 25,
    borderRadius: 100,
  },
};
