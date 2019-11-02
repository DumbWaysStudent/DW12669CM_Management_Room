/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  Modal,
  AsyncStorage,
} from 'react-native';
import {Button, Header, Body, Title, Item, Input} from 'native-base';

import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('window');
// console.log(webtoons);
class Checkin extends Component {
  state = {
    roomId: '',
    room: '',
    customerId: '',
    customer: '',
    duration: '',
    orderEndTime: '',
    isEmpName: true,
    isEmpDur: true,
    modalCheckIn: false,
    modalCheckOut: false,
  };
  listAll(item) {
    return (
      <View key={item.id}>
        <TouchableOpacity
          style={item.order.length > 0 ? styles.allList2 : styles.allList}
          onPress={() => {
            if (item.order.length > 0) {
              return this.modalCheckOut(item);
            } else {
              return this.modalCheckIn(item);
            }
          }}>
          <Text
            style={item.order.length > 0 ? styles.allRoom2 : styles.allRoom}>
            {' '}
            {item.name}{' '}
          </Text>
          <Text
            style={item.order.length > 0 ? styles.duration2 : styles.duration}>
            {item.order.length > 0
              ? item.order[0].duration + ' Minutes Left'
              : 'available'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  modalCheckIn(item) {
    this.setState({modalCheckIn: true, room: item.name, roomId: item.id});
  }

  modalCheckOut(item) {
    this.setState({
      modalCheckOut: true,
      room: item.name,
      customer: item.order[0].customerId.name,
      duration: item.order[0].duration,
    });
  }

  checkCustomer(input) {
    if (input === '') {
      this.setState({isEmpName: true});
    } else {
      this.setState({isEmpName: false});
    }
    this.setState({name: input});
  }
  checkDuration(input) {
    if (input === '') {
      this.setState({isEmpDur: true});
    } else {
      this.setState({isEmpDur: false});
    }
    this.setState({duration: input});
  }
  check(name, duration) {
    if (name === false && duration === false) {
      return false;
    } else {
      return true;
    }
  }
  async checkin() {
    const {name, identity_number, phone_number, image} = this.state;
    const tok = await AsyncStorage.getItem('token');
    await this.props.handleAddCustomer(
      tok,
      name,
      identity_number,
      phone_number,
      image,
    );
    this.getData();
    this.setState({modalAdd: false});
  }
  getData = async () => {
    const tok = await AsyncStorage.getItem('token');
    await this.props.handleGetCustomer(tok);
  };

  render() {
    console.disableYellowBox = true;
    const {checkins} = this.props.checkinLocal;
    const {room, customer, duration} = this.state;
    return (
      <View style={styles.mainView}>
        <View style={{flex: 1.5}}>
          <Header style={styles.header}>
            <Body>
              <Title style={styles.titleHeader}> Checkin </Title>
            </Body>
          </Header>
        </View>
        <View flex={9}>
          <FlatList
            numColumns={3}
            style={styles.flatList}
            data={checkins}
            renderItem={({item}) => this.listAll(item)}
            keyExtractor={item => item.title}
          />
        </View>
        {/* Modal that is used to CheckIn */}
        <Modal
          visible={this.state.modalCheckIn}
          transparent={true}
          animationType={'fade'}>
          <View style={styles.dimBg}>
            <View style={styles.modalBg}>
              <View style={styles.subViewTitle}>
                <Text style={styles.titleView}> CheckIn </Text>
              </View>
              <View style={styles.subViewInput}>
                <View>
                  <Text style={styles.modalItem}> Room :</Text>
                  <Item>
                    <Input
                      style={styles.inputStyle}
                      autoCapitalize="none"
                      disabled
                      value={room}
                    />
                  </Item>
                  <Text style={styles.modalItem}> Customer :*</Text>
                  <Item>
                    <Input
                      onChangeText={input => this.checkCustomer(input)}
                      style={styles.inputStyle}
                      autoCapitalize="none"
                      keyboardType="default"
                    />
                  </Item>
                  <Text style={styles.modalItem}> Duration :*</Text>
                  <Item>
                    <Input
                      onChangeText={input => this.checkDuration(input)}
                      style={styles.inputStyle}
                      autoCapitalize="none"
                      keyboardType="number-pad"
                    />
                  </Item>
                </View>
                <View style={styles.viewModalButt}>
                  <Button
                    rounded
                    style={styles.buttonX}
                    onPress={() =>
                      this.setState({
                        modalCheckIn: false,
                        name: '',
                        duration: '',
                      })
                    }>
                    <Text style={styles.buttonTextX}> Cancel </Text>
                  </Button>
                  <Button
                    rounded
                    style={styles.buttonY}
                    onPress={() => this.checkin()}
                    disabled={this.check(
                      this.state.isEmpName,
                      this.state.isEmpDur,
                    )}>
                    <Text style={styles.buttonTextY}> CheckIn </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        {/* Modal that use to CheckOut */}
        <Modal
          visible={this.state.modalCheckOut}
          transparent={true}
          animationType={'fade'}>
          <View style={styles.dimBg}>
            <View style={styles.modalBg}>
              <View style={styles.subViewTitle}>
                <Text style={styles.titleView}> Update Customer </Text>
              </View>
              <View style={styles.subViewInput}>
                <Text style={styles.modalItem}> Room :*</Text>
                <Item>
                  <Input
                    value={room}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    disabled
                  />
                </Item>
                <Text style={styles.modalItem}> Customer :*</Text>
                <Item>
                  <Input
                    value={customer}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    disabled
                  />
                </Item>
                <Text style={styles.modalItem}> Duration :*</Text>
                <Item>
                  <Input
                    value={`${duration}`}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    disabled
                  />
                </Item>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Button
                    rounded
                    style={styles.buttonX}
                    onPress={() =>
                      this.setState({modalCheckOut: false, name: '', id: ''})
                    }>
                    <Text style={styles.buttonTextX}> Cancel </Text>
                  </Button>
                  <Button
                    rounded
                    style={styles.buttonY}
                    onPress={() => this.checkout()}>
                    <Text style={styles.buttonTextY}> CheckOut </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkinLocal: state.checkins,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkin);

const styles = StyleSheet.create({
  duration: {
    color: 'white',
  },
  duration2: {
    color: 'black',
  },
  viewToon: {
    justifyContent: 'center',
  },
  allRoom: {
    marginRight: 10,
    marginVertical: 15,
    marginLeft: 10,
    borderRadius: 5,
    fontSize: 80,
    color: 'white',
  },
  allRoom2: {
    marginRight: 10,
    marginVertical: 15,
    marginLeft: 10,
    borderRadius: 5,
    fontSize: 80,
    color: 'black',
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
    backgroundColor: 'blue',
    flexDirection: 'row',
    borderColor: 'silver',
    borderWidth: 3,
    marginTop: 20,
    height: 60,
    borderRadius: 5,
    justifyContent: 'center',
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
    alignSelf: 'center',
    fontSize: 20,
  },
  allList: {
    marginVertical: 10,
    width: 170,
    height: 170,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 30,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  allList2: {
    marginVertical: 10,
    width: 170,
    height: 170,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 30,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f1e3',
  },
  flatList2: {
    marginTop: 20,
    marginHorizontal: 15,
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
  mainView: {
    backgroundColor: '#dfe4ea',
    flex: 1,
  },
  modalItem: {
    alignItems: 'flex-start',
    fontSize: 45,
    marginTop: 10,
    fontStyle: 'italic',
  },
  fab: {
    backgroundColor: '#2f3640',
    width: 80,
    height: 80,
    borderRadius: 100,
    position: 'absolute',
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
  row: {
    backgroundColor: '#2f3640',
    flexDirection: 'row',
    marginHorizontal: 20,
    borderRadius: 15,
    paddingHorizontal: 15,
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
    width: 200,
    height: 200,
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
    height: height * 0.7,
    borderRadius: 15,
    position: 'relative',
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
    paddingLeft: 15,
    alignContent: 'center',
  },
  dimBg: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    height,
    width,
    justifyContent: 'center',
  },
  viewModalButt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
});
