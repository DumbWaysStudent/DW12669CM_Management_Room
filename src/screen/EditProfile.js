/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Input, Header, Title, Right, Body} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
  },
};
export class EditProfile extends Component {
  state = {
    avatarSource: '',
    name: '',
    profilename: this.props.navigation.getParam('name'),
  };
  imageProfile() {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        // You can also display the image using data:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data};

        this.setState({
          avatarSource: source,
        });
      }
    });
  }
  handleEditProfile(a, b) {
    this.props.navigation.navigate('Profile', {name: 'b'}, {image: 'a'});
  }
  inputText(item) {
    this.setState({
      profilename: item,
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Header style={styles.header}>
            <Body>
              <Title style={styles.titleHeader}> Edit Profile </Title>
            </Body>
            <Right>
              <TouchableOpacity
                onPress={() =>
                  this.handleEditProfile(
                    this.state.avatarSource,
                    this.state.profilename,
                  )
                }>
                <Icon name="check" style={styles.iconHeader} />
              </TouchableOpacity>
            </Right>
          </Header>
        </View>
        <View style={styles.profile}>
          <View>
            <TouchableOpacity onPress={() => this.imageProfile()}>
              {this.state.avatarSource === '' ? (
                <Image
                  style={styles.imageProfile}
                  source={{
                    uri:
                      'https://p7.hiclipart.com/preview/858/581/271/user-computer-icons-system-chinese-wind-title-column.jpg',
                  }}
                />
              ) : (
                <Image
                  source={this.state.avatarSource}
                  style={styles.imageProfile}
                />
              )}
              <Icon name="camera" style={styles.iconProfile} />
            </TouchableOpacity>
          </View>
          <View style={styles.view}>
            <Input
              style={styles.search}
              autoCapitalize="none"
              placeholder="Type your name"
              value={this.state.profilename}
              onChangeText={text => this.inputText(text)}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default EditProfile;

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
    flex: 4,
  },
  iconProfile: {
    marginLeft: 130,
    marginTop: -45,
    fontSize: 50,
    color: 'orange',
    alignSelf: 'center',
  },
  iconName: {
    fontSize: 50,
    fontWeight: 'bold',
    placeholder: 'Cerkhachacu',
  },
  search: {
    marginRight: 5,
    marginTop: 4,
    fontSize: 45,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  view: {
    borderColor: 'black',
    borderWidth: 3,
    marginTop: 10,
    height: 80,
    borderRadius: 5,
    width: 500,
  },
  imageProfile: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    marginTop: 25,
    borderRadius: 100,
  },
  viewButtonText: {
    borderColor: 'black',
    borderWidth: 1.5,
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
};
