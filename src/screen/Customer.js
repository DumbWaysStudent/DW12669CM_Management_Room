/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  Dimensions,
  AsyncStorage,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Header,
  Body,
  Title,
  Button,
  Input,
  Item,
  Fab,
  Card,
  CardItem,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import * as firebase from 'firebase';
import * as actionCustomer from './../redux/actions/actionCustomers';
import moment from 'moment';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
  },
};
var firebaseConfig = {
  apiKey: 'AIzaSyAggiEF8xiE5k4OsJVWza9imk5KNJ6xMp8',
  authDomain: 'https://managementroom-cfe36.firebaseapp.com',
  databaseURL: 'https://managementroom-cfe36.firebaseio.com',
  projectId: 'managementroom-cfe36',
  storageBucket: 'gs://managementroom-cfe36.appspot.com',
  messagingSenderId: '786203632527',
  appId: '1:786203632527:web:70f7bc64e85830327521fa',
  measurementId: 'G-4RTZEJEZPB',
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const {height, width} = Dimensions.get('window');
export class Customer extends Component {
  state = {
    search: '',
    id: '',
    name: '',
    identity_number: '',
    phone_number: '',
    image: '',
    isEmpName: true,
    isEmpIdCard: true,
    isEmpPhoneNum: true,
    modalAdd: false,
    modalEdit: false,
    avatarSource: '',
    spinner: false,
    spinnerImage: false,
  };
  async uploadImageAsync(uri) {
    this.setState({spinner: true});
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    const ref = firebase
      .storage()
      .ref()
      .child(moment().toISOString());
    const snapshot = await ref.put(blob);
    // We're done with the blob, close and release it
    blob.close();
    console.log('link', await snapshot.ref.getDownloadURL());
    this.setState({avatarSource: await snapshot.ref.getDownloadURL()});
    console.log(this.state.avatarSource);
    this.setState({spinner: false});
    return await snapshot.ref.getDownloadURL();
  }
  imagePicker() {
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
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: source.uri,
        });
        this.uploadImageAsync(this.state.avatarSource);
      }
    });
  }
  listFavoriteAll(item) {
    return (
      <View key={item.id}>
        <Card style={styles.row}>
          <CardItem
            style={styles.listDetailToon}
            button
            onPress={() => this.showEdit(item)}>
            <View>
              <Image source={{uri: item.image}} style={styles.listToon} />
            </View>
            <View>
              <Text style={styles.title}>
                {'Name                   : '}
                {item.name}
              </Text>
              <Text style={styles.title}>
                {'Identity Number  : '}
                {item.identity_number}
              </Text>
              <Text style={styles.title}>
                {'Phone Number      : '}
                {item.phone_number}
              </Text>
            </View>
          </CardItem>
        </Card>
      </View>
    );
  }

  checkName(input) {
    if (input === '') {
      this.setState({isEmpName: true});
    } else {
      this.setState({isEmpName: false});
    }
    this.setState({name: input});
  }
  checkIdCard(input) {
    if (input === '') {
      this.setState({isEmpIdCard: true});
    } else {
      this.setState({isEmpIdCard: false});
    }
    this.setState({identity_number: input});
  }
  checkPhoneNum(input) {
    if (input === '') {
      this.setState({isEmpPhoneNum: true});
    } else {
      this.setState({isEmpPhoneNum: false});
    }
    this.setState({phone_number: input});
  }
  check(name, idCard, phoneNum) {
    if (name === false && idCard === false && phoneNum === false) {
      return false;
    } else {
      return true;
    }
  }
  showEdit(item) {
    this.setState({
      id: item.id,
      name: item.name,
      identity_number: item.identity_number,
      phone_number: item.phone_number,
      image: item.image,
      avatarSource: item.image,
      modalEdit: true,
      isEmpName: false,
      isEmpIdCard: false,
      isEmpPhoneNum: false,
    });
  }
  editCustomer() {
    setTimeout(async () => {
      this.setState({spinner: true});
      const {
        id,
        name,
        identity_number,
        phone_number,
        avatarSource,
      } = this.state;
      const tok = await AsyncStorage.getItem('token');
      await this.props.handleEditCustomer(
        tok,
        id,
        name,
        identity_number,
        phone_number,
        avatarSource,
      );
      this.getData();
      this.setState({modalEdit: false, avatarSource: '', spinner: false});
    }, 1500);
  }
  addCustomer() {
    setTimeout(async () => {
      this.setState({spinner: true});
      const {name, identity_number, phone_number, avatarSource} = this.state;
      const tok = await AsyncStorage.getItem('token');
      await this.props.handleAddCustomer(
        tok,
        name,
        identity_number,
        phone_number,
        avatarSource,
      );
      this.getData();
      this.setState({modalAdd: false, avatarSource: '', spinner: false});
    }, 1500);
  }
  getData = async () => {
    const tok = await AsyncStorage.getItem('token');
    await this.props.handleGetCustomer(tok);
  };

  handleSearch(item) {
    this.setState({search: item.toLowerCase()});
  }

  render() {
    console.disableYellowBox = true;
    const {cust} = this.props.custLocal;
    const {name, identity_number, phone_number, image} = this.state;
    return (
      <View style={styles.mainView}>
        <View style={{flex: 1.2}}>
          <Header style={styles.header}>
            <Body>
              <Title style={styles.titleHeader}> Customers </Title>
            </Body>
          </Header>
        </View>
        <View style={{flex: 9, marginHorizontal: 20}}>
          <View style={{flex: 0.8}}>
            <View style={styles.view}>
              <Input
                style={styles.searchBar}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Looking for something ..."
                onChangeText={item => this.handleSearch(item)}
              />
              <TouchableOpacity>
                <Icon name="search" size={40} style={styles.search} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 10}}>
            <FlatList
              // style={styles.flatList1}
              data={cust.filter(item =>
                item.name.toLowerCase().includes(this.state.search),
              )}
              renderItem={({item}) => this.listFavoriteAll(item)}
              keyExtractor={item => item.title}
            />
          </View>
        </View>
        <View style={{position: 'relative'}}>
          <Fab
            onPress={() => this.setState({modalAdd: true})}
            active="true"
            style={styles.fab}
            position="bottomRight">
            <Icon style={styles.fabIcon} name="plus" />
          </Fab>
        </View>
        {/* Modal that is used to Add a New Room */}
        <Modal
          visible={this.state.modalAdd}
          transparent={true}
          animationType={'fade'}>
          <KeyboardAvoidingView style={styles.dimBg} behavior="padding" enabled>
            <View style={styles.modalBg}>
              <View style={styles.subViewTitle}>
                <Text style={styles.titleView}> Add New Customer </Text>
              </View>
              <View style={styles.subViewInput}>
                <Text style={styles.modalItem}> Name :*</Text>
                <Item>
                  <Input
                    onChangeText={input => this.checkName(input)}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Input Customer Name"
                  />
                </Item>
                <Text style={styles.modalItem}> Identity number :*</Text>
                <Item>
                  <Input
                    onChangeText={input => this.checkIdCard(input)}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    placeholder="Input Customer Identity Number"
                  />
                </Item>
                <Text style={styles.modalItem}> Phone Number :*</Text>
                <Item>
                  <Input
                    onChangeText={input => this.checkPhoneNum(input)}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    keyboardType="phone-pad"
                    placeholder="Input Customer Phone Number"
                  />
                </Item>
                <TouchableOpacity onPress={() => this.imagePicker()}>
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
                      source={{uri: this.state.avatarSource}}
                      style={styles.imageProfile}
                    />
                  )}
                  <Icon name="camera" style={styles.iconProfile} />
                </TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Button
                    rounded
                    style={styles.buttonX}
                    onPress={() =>
                      this.setState({
                        modalAdd: false,
                        name: '',
                        id: '',
                        identity_number: '',
                        phone_number: '',
                        isEmpName: true,
                        isEmpIdCard: true,
                        isEmpPhoneNum: true,
                        avatarSource: '',
                      })
                    }
                    disabled={false}>
                    <Text style={styles.buttonTextX}> Cancel </Text>
                  </Button>
                  <Button
                    rounded
                    style={styles.buttonY}
                    onPress={() => this.addCustomer()}
                    disabled={this.check(
                      this.state.isEmpName,
                      this.state.isEmpIdCard,
                      this.state.isEmpPhoneNum,
                    )}>
                    <Text style={styles.buttonTextY}> Add </Text>
                  </Button>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        {/* Modal that use to Edit an existing room */}
        <Modal
          visible={this.state.modalEdit}
          transparent={true}
          animationType={'fade'}>
          <KeyboardAvoidingView style={styles.dimBg} behavior="padding" enabled>
            <View style={styles.modalBg}>
              <View style={styles.subViewTitle}>
                <Text style={styles.titleView}> Update Customer </Text>
              </View>
              <View style={styles.subViewInput}>
                <Text style={styles.modalItem}> Name :*</Text>
                <Item>
                  <Input
                    onChangeText={input => this.checkName(input)}
                    value={name}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Input Customer Name"
                  />
                </Item>
                <Text style={styles.modalItem}> Identity number :*</Text>
                <Item>
                  <Input
                    onChangeText={input => this.checkIdCard(input)}
                    value={identity_number}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    keyboardType="phone-pad"
                    placeholder="Input Customer Identity Number"
                  />
                </Item>
                <Text style={styles.modalItem}> Phone Number :*</Text>
                <Item>
                  <Input
                    onChangeText={input => this.checkPhoneNum(input)}
                    value={phone_number}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    placeholder="Input Customer Phone Number"
                  />
                </Item>
                <TouchableOpacity onPress={() => this.imagePicker()}>
                  {this.state.avatarSource === '' ? (
                    <Image
                      style={styles.imageProfile}
                      source={{
                        uri: image,
                      }}
                    />
                  ) : (
                    <Image
                      source={{uri: this.state.avatarSource}}
                      style={styles.imageProfile}
                    />
                  )}
                  <Icon name="camera" style={styles.iconProfile} />
                </TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Button
                    rounded
                    style={styles.buttonX}
                    onPress={() =>
                      this.setState({
                        modalEdit: false,
                        name: '',
                        id: '',
                        identity_number: '',
                        phone_number: '',
                        isEmpName: true,
                        isEmpIdCard: true,
                        isEmpPhoneNum: true,
                        avatarSource: '',
                      })
                    }
                    disabled={false}>
                    <Text style={styles.buttonTextX}> Cancel </Text>
                  </Button>
                  <Button
                    rounded
                    style={styles.buttonY}
                    onPress={() => this.editCustomer()}
                    disabled={this.check(
                      this.state.isEmpName,
                      this.state.isEmpIdCard,
                      this.state.isEmpPhoneNum,
                    )}>
                    <Text style={styles.buttonTextY}> Edit </Text>
                  </Button>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    custLocal: state.cust,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetCustomer: tok => dispatch(actionCustomer.handleGetCust(tok)),
    handleAddCustomer: (tok, name, idCard, phoNum, image) =>
      dispatch(actionCustomer.handleAddCust(tok, name, idCard, phoNum, image)),
    handleEditCustomer: (tok, id, name, idCard, PhoNum, image) =>
      dispatch(
        actionCustomer.handleUpdateCust(tok, id, name, idCard, PhoNum, image),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customer);

const styles = StyleSheet.create({
  modalItem: {
    alignItems: 'flex-start',
    fontSize: 45,
    marginTop: 10,
    fontStyle: 'italic',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  fab: {
    backgroundColor: '#7f8fa6',
    width: 80,
    height: 80,
    borderRadius: 100,
    position: 'absolute',
  },
  view: {
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 3,
    height: 60,
    borderRadius: 5,
  },
  viewToon: {
    marginBottom: 5,
    borderColor: 'black',
    borderWidth: 4,
    flex: 4.25,
  },
  search: {
    justifyContent: 'center',
    marginRight: 5,
    marginTop: 4,
  },
  toon: {
    justifyContent: 'center',
    width: '100%',
    height: 400,
  },
  listToon: {
    height: 120,
    width: 120,
    borderWidth: 1,
    borderColor: '#f1f2f6',
    marginBottom: 5,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 100,
  },
  listDetailToon: {
    marginRight: 30,
    justifyContent: 'center',
    backgroundColor: '#2f3640',
  },
  title: {
    fontSize: 25,
    marginRight: 30,
    color: 'white',
  },
  favorite: {
    fontSize: 20,
    marginBottom: 20,
    color: 'grey',
  },
  row: {
    backgroundColor: '#2f3640',
    flexDirection: 'row',
    marginHorizontal: 20,
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  header: {
    backgroundColor: '#718093',
    height: 100,
    justifyContent: 'center',
  },
  titleHeader: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 40,
  },
  iconProfile: {
    marginLeft: 130,
    marginTop: -45,
    fontSize: 50,
    color: 'grey',
    alignSelf: 'center',
  },
  imageProfile: {
    borderWidth: 2,
    borderColor: 'silver',
    alignSelf: 'center',
    width: width * 0.25,
    height: height * 0.15,
    marginTop: 25,
    borderRadius: 100,
  },
  button: {
    marginTop: 20,
    justifyContent: 'center',
    marginBottom: 100,
    marginHorizontal: 20,
    width: 100,
  },
  fabIcon: {
    fontSize: 40,
    color: 'white',
  },
  mainView: {
    backgroundColor: '#dfe4ea',
    flex: 1,
  },
  buttonX: {
    marginTop: 20,
    justifyContent: 'center',
    marginBottom: 100,
    marginHorizontal: 20,
    width: 200,
    height: 60,
    backgroundColor: '#f1f2f6',
  },
  buttonY: {
    marginTop: 20,
    justifyContent: 'center',
    marginBottom: 100,
    marginHorizontal: 20,
    width: 200,
    height: 60,
  },
  buttonTextX: {
    fontSize: 35,
    color: 'black',
  },
  buttonTextY: {
    fontSize: 35,
    color: 'white',
  },
  modalBg: {
    backgroundColor: 'white',
    alignSelf: 'center',
    width: width * 0.9,
    height: height * 0.85,
    borderRadius: 15,
  },
  allToon: {
    backgroundColor: '#2f3542',
    borderWidth: 3,
    borderColor: '#2f3542',
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  favoriteToon: {
    height: 200,
    width: 170,
    borderWidth: 3,
    borderColor: 'silver',
    marginRight: 10,
    borderRadius: 5,
  },
  icon: {
    width: 40,
    height: 40,
  },
  showSize: {
    height: '100%',
  },
  text: {
    color: '#ecf0f1',
    alignSelf: 'center',
    fontSize: 45,
  },
  allList: {
    backgroundColor: '#2f3542',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
    borderColor: '#f1f2f6',
    borderWidth: 3,
    borderRadius: 30,
    width: 140,
    height: 140,
  },
  flatList: {
    marginTop: 20,
    marginHorizontal: 40,
  },
  subViewInput: {
    marginTop: 10,
    marginHorizontal: 25,
    justifyContent: 'center',
  },
  subViewTitle: {
    marginTop: 40,
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  titleView: {
    fontSize: 60,
    fontWeight: 'bold',
    // backgroundColor: '#dfe4ea',
  },
  inputStyle: {
    borderColor: 'silver',
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 35,
    height: 60,
    alignContent: 'center',
  },
  dimBg: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    height,
    width,
    justifyContent: 'center',
  },
});
