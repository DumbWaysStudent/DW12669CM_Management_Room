/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, TouchableOpacity, Text, AsyncStorage, Image} from 'react-native';
import {Header, Title, Right, Body} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
// const image= this.props.navigation.getParam('image');
// const profName= this.props.navigation.getParam('name');
export class Profile extends Component {
  state = {
    // image: this.props.navigation.getParam('image'),
    // name: this.props.navigation.getParam('name'),
    image: '',
    name: '',
  };
  async componentDidMount() {
    const img = await AsyncStorage.getItem('image');
    const username = await AsyncStorage.getItem('name');
    console.log('=============');
    console.log(img);
    console.log('=============');
    this.setState({name: username, image: img});
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
    console.log('================');
    console.log(this.state.image);
    console.log('================');
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Header style={styles.header}>
            <Body>
              <Title style={styles.titleHeader}> Profile </Title>
            </Body>
            <Right>
              <TouchableOpacity onPress={() => this.handleEditProfile()}>
                <Icon name="pencil" style={styles.iconHeader} />
              </TouchableOpacity>
            </Right>
          </Header>
        </View>
        <View style={styles.profile}>
          <Image source={{uri: this.state.image}} style={styles.iconProfile} />
          <Text style={styles.iconName}>{this.state.name}</Text>
        </View>
        <View style={{flex: 5.2}}>
          <View style={styles.viewButtonText}>
            <TouchableOpacity
              style={styles.opacity}
              onPress={() => this.handleMytoon()}>
              <Text style={styles.text}> My Webtoon Creation </Text>
              <Icon name="angle-right" style={styles.iconButtonText} />
            </TouchableOpacity>
          </View>
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

export default Profile;

const styles = {
  header: {
    backgroundColor: 'white',
    height: 100,
  },
  titleHeader: {
    color: 'black',
    fontSize: 40,
  },
  iconHeader: {
    color: 'orange',
    fontSize: 50,
    marginRight: 10,
  },
  profile: {
    alignSelf: 'center',
    flex: 3.8,
    marginTop: 40,
  },
  iconProfile: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 40,
    color: 'grey',
    alignSelf: 'center',
  },
  iconName: {
    fontSize: 50,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  viewButtonText: {
    borderColor: 'black',
    borderWidth: 1.1,
    flex: 0.13,
  },
  opacity: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    fontSize: 40,
    marginBottom: 10,
    flex: 9,
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
