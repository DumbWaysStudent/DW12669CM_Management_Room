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

import {FlatList} from 'react-native-gesture-handler';

import * as actionCustomer from './../redux/actions/actionCustomers';

const {height, width} = Dimensions.get('window');
export class Customer extends Component {
  state = {
    search: '',
    id: '',
    name: '',
    identity_number: '',
    phone_number: '',
    image:
      'https://pm1.narvii.com/6543/8de18197fc46b84818413a197bf52c78d91eb9e7_hq.jpg',
    isEmpName: true,
    isEmpIdCard: true,
    isEmpPhoneNum: true,
    modalAdd: false,
    modalEdit: false,
  };
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
      modalEdit: true,
      isEmpName: false,
      isEmpIdCard: false,
      isEmpPhoneNum: false,
    });
  }
  async editCustomer() {
    const {id, name, identity_number, phone_number, image} = this.state;
    const tok = await AsyncStorage.getItem('token');
    await this.props.handleEditCustomer(
      tok,
      id,
      name,
      identity_number,
      phone_number,
      image,
    );
    this.getData();
    this.setState({modalEdit: false});
  }
  async addCustomer() {
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

  handleSearch(item) {
    this.setState({search: item.toLowerCase()});
  }

  render() {
    const {cust} = this.props.custLocal;
    const {name, identity_number, phone_number, image} = this.state;
    return (
      <View style={styles.mainView}>
        <View style={{flex: 1.5}}>
          <Header style={styles.header}>
            <Body>
              <Title style={styles.titleHeader}> Customers </Title>
            </Body>
          </Header>
        </View>
        <View style={{flex: 9, marginHorizontal: 20}}>
          <View style={{flex: 1.5}}>
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
          <View style={{flex: 9.2}}>
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
            containerStyle={{}}
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
          <View style={styles.dimBg}>
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
                    keyboardType="email-address"
                    placeholder="Input Customer Identity Number"
                  />
                </Item>
                <Text style={styles.modalItem}> Phone Number :*</Text>
                <Item>
                  <Input
                    onChangeText={input => this.checkPhoneNum(input)}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Input Customer Phone Number"
                  />
                </Item>
                <TouchableOpacity>
                  <Image
                    source={this.state.avatarSource}
                    style={styles.imageProfile}
                  />
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
          </View>
        </Modal>
        {/* Modal that use to Edit an existing room */}
        <Modal
          visible={this.state.modalEdit}
          transparent={true}
          animationType={'fade'}>
          <View style={styles.dimBg}>
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
                    keyboardType="email-address"
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
                    keyboardType="email-address"
                    placeholder="Input Customer Phone Number"
                  />
                </Item>
                <TouchableOpacity>
                  <Image source={{uri: image}} style={styles.imageProfile} />
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
          </View>
        </Modal>
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
  fab: {
    backgroundColor: '#2f3640',
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
