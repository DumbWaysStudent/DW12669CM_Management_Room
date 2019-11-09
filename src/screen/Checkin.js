/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Modal,
  AsyncStorage,
  Picker,
  FlatList,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import {Button, Header, Body, Title, Item, Input} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import * as actionCheckin from './../redux/actions/actionOrders';

import {connect} from 'react-redux';

const {height, width} = Dimensions.get('window');
// console.log(webtoons);
class Checkin extends Component {
  state = {
    roomId: '',
    room: '',
    orderId: '',
    customerId: '',
    customer: '',
    duration: '',
    orderEndTime: '',
    isEmpCust: true,
    isEmpDur: true,
    modalCheckIn: false,
    modalCheckOut: false,
    time: '',
  };
  componentWillMount() {
    this.getCurrentTime();
    this.getData();
  }
  getCurrentTime = () => {
    this.setState({
      time: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
    });
  };
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.getCurrentTime();
      this.autoCheckOut();
    }, 1000);
  }
  async autoCheckOut() {
    const data = this.props.checkinLocal.checkins;
    const loading = this.props.checkinLocal.isLoading;
    console.log(loading);
    await data.map(async item => {
      item.order.length > 0
        ? moment(item.order[0].order_end_time).diff(moment(), 's') <= 0
          ? loading === false
            ? await (this.setState({orderId: item.order[0].id}),
              console.log('mau checkout'),
              this.checkout())
            : null
          : null
        : null;
      // if (item.order.length > 0) {
      //   if ((moment.item.order[0].order_end_time).diff(moment(), 's') <= 0) {
      //     this.setState({orderId: item.order[0].id});
      //     await this.checkout();
      //   }
      // }
    });
  }
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
              ? item.order[0].customerId.name +
                '\n' +
                moment(item.order[0].order_end_time).diff(moment(), 'hour') +
                ' : ' +
                (moment(item.order[0].order_end_time).diff(
                  moment(),
                  'minutes',
                ) %
                  60) +
                ' : ' +
                (moment(item.order[0].order_end_time).diff(
                  moment(),
                  'seconds',
                ) %
                  60) +
                ' Left'
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
      roomId: item.id,
      room: item.name,
      orderId: item.order[0].id,
      customerId: item.order[0].customerId.id,
      customer: item.order[0].customerId.name,
      duration: item.order[0].duration,
      orderEndTime: item.order[0].order_end_time,
    });
  }
  checkCustomer(input) {
    if (input === '') {
      this.setState({isEmpCust: true});
    } else {
      this.setState({isEmpCust: false});
    }
    this.setState({customerId: input});
  }
  checkDuration(input) {
    this.setState({
      duration: Number(input),
      orderEndTime: moment()
        .add(Number(input), 's')
        .toJSON(),
    });
    let reg = /^[0-9]*$/;
    if (reg.test(input) && input !== '') {
      this.setState({isEmpDur: false});
    } else {
      this.setState({isEmpDur: true});
    }
  }
  check(cust, duration) {
    if (cust === false && duration === false) {
      return false;
    } else {
      return true;
    }
  }
  async checkin() {
    this.setState({spinner: true});
    const {roomId, customerId, duration, orderEndTime} = this.state;
    const tok = await AsyncStorage.getItem('token');
    await this.props.handleCheckIn(
      tok,
      duration,
      orderEndTime,
      customerId,
      roomId,
    );
    await this.getData();
    this.setState({
      modalCheckIn: false,
      spinner: false,
      isEmpDur: true,
      customerId: '',
    });
  }

  async checkout() {
    this.setState({spinner: true});
    const {orderId} = this.state;
    const tok = await AsyncStorage.getItem('token');
    await this.props.handleCheckOut(tok, orderId);
    await this.getData();
    this.setState({
      modalCheckOut: false,
      spinner: false,
      duration: '',
      customerId: '',
    });
    console.log('ini checkout');
  }

  getData = async () => {
    const tok = await AsyncStorage.getItem('token');
    await this.props.handleGetCheckin(tok);
  };

  render() {
    console.disableYellowBox = true;
    const {checkins} = this.props.checkinLocal;
    const {id, room, customer, duration, time} = this.state;
    const {cust} = this.props.custLocal;
    // console.log('room ID     :' + this.state.roomId);
    // console.log('customer ID :' + this.state.customerId);
    // console.log('duration    :' + this.state.duration);
    // console.log('endTime     :' + this.state.orderEndTime);
    return (
      <View style={styles.mainView}>
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
        <View style={{flex: 1.5}}>
          <Header style={styles.header}>
            <Body>
              <Title style={styles.titleHeader}> Checkin </Title>
            </Body>
          </Header>
        </View>
        {/* <ImageBackground style={styles.imgBg} source={{uri: 'https://ak3.picdn.net/shutterstock/videos/21658243/thumb/1.jpg'}}> */}
        {/* <View style={{alignItems: 'flex-end'}} flex={0.8}>
            <Text style={{color: 'blue'}}>{`${time}`}</Text>
          </View> */}
        <View flex={9}>
          <FlatList
            numColumns={3}
            style={styles.flatList}
            data={checkins}
            renderItem={({item}) => this.listAll(item)}
            keyExtractor={item => item.title}
          />
        </View>
        {/* </ImageBackground> */}
        {/* Modal that is used to CheckIn */}
        <Modal
          visible={this.state.modalCheckIn}
          transparent={true}
          animationType={'fade'}>
          <KeyboardAvoidingView style={styles.dimBg} behavior="padding" enabled>
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
                    <View style={styles.inputStyle}>
                      <Picker
                        selectedValue={this.state.customerId}
                        mode={'dropdown'}
                        style={styles.inputStyle}
                        onValueChange={item => this.checkCustomer(item)}>
                        {cust.map((item, index) => {
                          return (
                            <Picker.Item
                              label={item.name}
                              value={item.id}
                              key={index}
                            />
                          );
                        })}
                      </Picker>
                    </View>
                  </Item>
                  <Text style={styles.modalItem}> Duration :*</Text>
                  <Item>
                    <Input
                      onChangeText={input => this.checkDuration(input)}
                      style={styles.inputStyle}
                      autoCapitalize="none"
                      keyboardType="number-pad"
                      placeholder="... in Minute"
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
                        customer: '',
                        duration: '',
                        isEmpDur: false,
                      })
                    }>
                    <Text style={styles.buttonTextX}> Cancel </Text>
                  </Button>
                  <Button
                    rounded
                    style={styles.buttonY}
                    onPress={() => this.checkin()}
                    disabled={this.check(
                      this.state.isEmpCust,
                      this.state.isEmpDur,
                    )}>
                    <Text style={styles.buttonTextY}> CheckIn </Text>
                  </Button>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        {/* Modal that use to CheckOut */}
        <Modal
          visible={this.state.modalCheckOut}
          transparent={true}
          animationType={'fade'}>
          <KeyboardAvoidingView style={styles.dimBg} behavior="padding" enabled>
            <View style={styles.modalBg}>
              <View style={styles.subViewTitle}>
                <Text style={styles.titleView}> CheckOut </Text>
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
                  <View style={styles.inputStyle}>
                    <Picker
                      enabled={false}
                      selectedValue={this.state.customer}
                      style={styles.inputStyle}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({customerId: itemValue})
                      }>
                      <Picker.Item label={customer} value={id} fontSize={30} />
                    </Picker>
                  </View>
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
          </KeyboardAvoidingView>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkinLocal: state.checkins,
    custLocal: state.cust,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleCheckIn: (tok, duration, orderEndTime, customerId, roomId) =>
      dispatch(
        actionCheckin.handleCheckIn(
          tok,
          duration,
          orderEndTime,
          customerId,
          roomId,
        ),
      ),
    handleCheckOut: (token, id) =>
      dispatch(actionCheckin.handleCheckOut(token, id)),
    handleGetCheckin: tok => dispatch(actionCheckin.handleGetCheckins(tok)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkin);

const styles = StyleSheet.create({
  duration: {
    color: 'white',
    marginBottom: 5,
    fontSize: 25,
  },
  duration2: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 25,
  },
  viewToon: {
    justifyContent: 'center',
  },
  allRoom: {
    marginVertical: 1,
    borderRadius: 5,
    fontSize: 80,
    color: 'white',
  },
  allRoom2: {
    marginVertical: 1,
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
    width: width * 0.3,
    height: width * 0.3,
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
    width: width * 0.3,
    height: width * 0.3,
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
    marginTop: height * 0.03,
    alignSelf: 'center',
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
    height: height * 0.06,
    paddingLeft: 15,
    alignContent: 'center',
    width: width * 0.8,
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
  imgBg: {
    height,
    width,
    marginTop: height * 0.09,
  },
});
