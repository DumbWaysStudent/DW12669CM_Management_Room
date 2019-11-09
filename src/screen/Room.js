/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
  AsyncStorage,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import {Header, Body, Title, Button, Input, Item} from 'native-base';

import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as actionRoom from './../redux/actions/actionRooms';
import * as actionCheckin from './../redux/actions/actionOrders';

const {height, width} = Dimensions.get('window');
// console.log(webtoons);
class Room extends Component {
  state = {
    id: '',
    name: '',
    modalAdd: false,
    modalEdit: false,
    isEmpty: true,
    state: false,
    spinner: false,
  };
  // async componentDidMount() {
  //   const tok = await AsyncStorage.getItem('token');
  //   await this.props.handleGetRooms(tok);
  // }
  listAll(item) {
    return (
      <View style={styles.allList} key={item.id}>
        <TouchableOpacity
          style={styles.allToon}
          onPress={() => this.showEdit(item)}>
          <Text style={styles.text}> {item.name} </Text>
        </TouchableOpacity>
      </View>
    );
  }
  checkInput(input) {
    if (input === '') {
      this.setState({isEmpty: true});
    } else {
      this.setState({isEmpty: false, name: input});
    }
    this.setState({name: input});
  }
  async showEdit(item) {
    this.setState({
      id: item.id,
      name: item.name,
      modalEdit: true,
      isEmpty: true,
    });
  }
  editRoom() {
    setTimeout(async () => {
      this.setState({spinner: true});
      const id = this.state.id;
      const name = this.state.name;
      const tok = await AsyncStorage.getItem('token');
      await this.props.handleEditRoom(tok, name, id);
      console.log(id, tok, name);
      this.getData();
      this.setState({modalEdit: false, spinner: false});
    }, 1500);
  }
  async addRoom() {
    setTimeout(async () => {
      this.setState({spinner: true});
      const name = this.state.name;
      const tok = await AsyncStorage.getItem('token');
      await this.props.handleAddRoom(tok, name);
      console.log(tok, name);
      this.getData();
      this.setState({modalAdd: false, spinner: false});
    }, 1500);
  }
  getData = async () => {
    const tok = await AsyncStorage.getItem('token');
    await this.props.handleGetRooms(tok);
    await this.props.handleGetCheckin(tok);
  };
  render() {
    console.disableYellowBox = true;
    const {rooms} = this.props.roomsLocal;
    const {name} = this.state;
    return (
      <View style={styles.mainView}>
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
        <View style={{flex: 1.3}}>
          <Header style={styles.header}>
            <Body>
              <Title style={styles.titleHeader}> Rooms </Title>
            </Body>
          </Header>
        </View>
        <View style={{flex: 9, marginHorizontal: 20}}>
          <FlatList
            numColumns={3}
            style={styles.flatList}
            data={rooms}
            renderItem={({item}) => this.listAll(item)}
            keyExtractor={item => item.title}
          />
        </View>
        <View flex={1.3}>
          <TouchableOpacity
            style={styles.view}
            onPress={() => this.setState({modalAdd: true, isEmpty: true})}>
            <Icon name="plus" size={50} color={'white'} />
          </TouchableOpacity>
        </View>
        {/* Modal that is used to Add a New Room */}
        <Modal
          visible={this.state.modalAdd}
          transparent={true}
          animationType={'fade'}>
          <KeyboardAvoidingView style={styles.dimBg} behavior="padding" enabled>
            <View style={styles.modalBg}>
              <View style={styles.subViewTitle}>
                <Text style={styles.titleView}> Add New Room </Text>
              </View>
              <View style={styles.subViewInput}>
                <View>
                  <Text style={styles.modalText}> Room Name :*</Text>
                  <Item>
                    <Input
                      onChangeText={input => this.checkInput(input)}
                      style={{fontSize: 25}}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      placeholder="Input Room Name"
                    />
                  </Item>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Button
                    rounded
                    style={styles.buttonX}
                    onPress={() =>
                      this.setState({modalAdd: false, name: '', id: ''})
                    }
                    disabled={false}>
                    <Text style={styles.buttonTextX}> Cancel </Text>
                  </Button>
                  <Button
                    rounded
                    style={styles.buttonY}
                    onPress={() => this.addRoom()}
                    disabled={this.state.isEmpty}>
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
                <Text style={styles.titleView}> Edit Room </Text>
              </View>
              <View style={styles.subViewInput}>
                <Text style={styles.modalText}> Room Name :*</Text>
                <Item>
                  <Input
                    onChangeText={input => this.checkInput(input)}
                    value={name}
                    style={{fontSize: 25}}
                    autoCapitalize="none"
                    keyboardType="name-phone-pad"
                  />
                </Item>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Button
                    rounded
                    style={styles.buttonX}
                    onPress={() =>
                      this.setState({modalEdit: false, name: '', id: ''})
                    }
                    disabled={false}>
                    <Text style={styles.buttonTextX}> Cancel </Text>
                  </Button>
                  <Button
                    rounded
                    style={styles.buttonY}
                    onPress={() => this.editRoom()}
                    disabled={this.state.isEmpty}>
                    <Text style={styles.buttonTextY}> Edit </Text>
                  </Button>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    roomsLocal: state.rooms,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleEditRoom: (tok, name, id) =>
      dispatch(actionRoom.handleUpdateRooms(tok, name, id)),
    handleAddRoom: (tok, name) =>
      dispatch(actionRoom.handleAddRooms(tok, name)),
    handleGetRooms: tok => dispatch(actionRoom.handleGetRooms(tok)),
    handleGetCheckin: tok => dispatch(actionCheckin.handleGetCheckins(tok)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Room);

const styles = StyleSheet.create({
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
    height: height * 0.4,
    borderRadius: 15,
  },
  viewToon: {
    justifyContent: 'center',
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
  search: {
    justifyContent: 'center',
    marginRight: 5,
    marginTop: 4,
    fontSize: 30,
  },
  view: {
    marginHorizontal: 20,
    backgroundColor: '#2f3542',
    borderColor: '#2f3542',
    borderWidth: 3,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 85,
    marginVertical: 15,
  },
  icon: {
    width: 40,
    height: 40,
  },
  showSize: {
    height: '100%',
  },
  favorite: {
    fontSize: 40,
    marginVertical: 15,
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
  header: {
    backgroundColor: '#718093',
    height: 100,
    justifyContent: 'center',
  },
  mainView: {
    backgroundColor: '#dfe4ea',
    flex: 1,
  },
  titleHeader: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 40,
  },
  subViewInput: {
    marginTop: 40,
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
  modalText: {
    alignItems: 'flex-start',
    fontSize: 45,
    fontStyle: 'italic',
  },
  dimBg: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    height,
    width,
    justifyContent: 'center',
  },
});
