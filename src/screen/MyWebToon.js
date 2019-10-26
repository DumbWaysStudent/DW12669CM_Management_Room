/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image, AsyncStorage} from 'react-native';
import {Header, Left, Body, Title, Fab} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import * as actionCreation from './../redux/actions/actionWebtoons';

import {FlatList} from 'react-native-gesture-handler';

import {bannersFavorite} from '../components/Banners';

export class MyWebToon extends Component {
  componentDidMount() {
    setTimeout(async () => {
      const params = {
        token: await AsyncStorage.getItem('token'),
        userid: await AsyncStorage.getItem('userid'),
      };
      console.log('=============================');
      console.log(params.token);
      console.log('=======================');
      console.log('=============================');
      console.log(params.userid);
      console.log('=======================');
      await this.props.handleGetMyCreation(params);
    }, 1000);
  }
  listFavoriteAll(item) {
    return (
      <View style={{flexDirection: 'row'}}>
        <View>
          <TouchableOpacity onPress={() => this.handleDetail(item.title)}>
            <Image source={{uri: item.image}} style={styles.listToon} />
          </TouchableOpacity>
        </View>
        <View style={styles.listDetailToon}>
          <Text style={styles.title}> {item.title} </Text>
          <Text style={styles.favorite}> {item.ep} </Text>
        </View>
      </View>
    );
  }
  handleBack() {
    this.props.navigation.goBack();
  }
  createWebToon() {
    this.props.navigation.navigate('createWebToon');
  }
  handleDetail(title) {
    this.props.navigation.navigate('editWebtoon', {title: title});
  }

  render() {
    const {toon} = this.props.creationLocal;
    return (
      <View style={{flex: 1}}>
        <View>
          <Header style={styles.header}>
            <Left>
              <TouchableOpacity transparent onPress={() => this.handleBack()}>
                <Icon name="arrow-left" size={45} />
              </TouchableOpacity>
            </Left>
            <Body>
              <Title style={styles.titleHeader}> My Webtoon </Title>
            </Body>
          </Header>
        </View>
        <View style={{flex: 9, marginTop: 20, marginHorizontal: 20}}>
          <FlatList
            // style={styles.flatList1}
            data={toon}
            renderItem={({item}) => this.listFavoriteAll(item)}
            keyExtractor={item => item.title}
          />
        </View>
        <View>
          <Fab
            onPress={() => this.createWebToon()}
            active="true"
            containerStyle={{}}
            style={{backgroundColor: 'orange', width: 70, height: 70}}
            position="bottomRight">
            <Icon style={styles.iconProfile} name="plus" />
          </Fab>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    creationLocal: state.toon,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetMyCreation: params =>
      dispatch(actionCreation.handleGetMyCreation(params)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyWebToon);

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    height: 100,
    borderBottomColor: 'grey',
  },
  titleHeader: {
    color: 'black',
    fontSize: 40,
  },
  view: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 3,
    marginTop: 5,
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
    width: 100,
    borderWidth: 3,
    borderColor: 'black',
    marginBottom: 5,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  listDetailToon: {
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 30,
    marginTop: 20,
  },
  favorite: {
    fontSize: 20,
    marginBottom: 20,
    color: 'grey',
  },
  iconProfile: {
    fontSize: 50,
    color: 'white',
  },
});
