/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {SafeAreaView, View, TouchableOpacity, Text, Image} from 'react-native';
import {Header, Left, Body, Title, Input, Right} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import {FlatList} from 'react-native-gesture-handler';

import {bannersAddEp} from '../components/Banners';

export class CreateEps extends Component {
  listFavoriteAll(item) {
    return (
      <View style={{flexDirection: 'row'}}>
        <View>
          <TouchableOpacity onPress={() => this.handleDetail()}>
            <Image source={{uri: item.url}} style={styles.listToon} />
          </TouchableOpacity>
        </View>
        <View style={styles.listDetailToon}>
          <Text style={styles.title}> {item.title} </Text>
          <TouchableOpacity style={styles.delBut}>
            <Text style={styles.favorite}> Delete </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  handleDetail() {}
  handleBack() {
    this.props.navigation.goBack();
  }
  handleFinishAdd() {
    this.props.navigation.navigate('createWebToon');
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Header style={styles.header}>
          <Left style={{flex: 1}}>
            <TouchableOpacity onPress={() => this.handleBack()}>
              <Icon name="arrow-left" style={styles.iconHeader} />
            </TouchableOpacity>
          </Left>
          <Body style={{flex: 8}}>
            <Title style={styles.titleHeader}> Create Episode </Title>
          </Body>
          <Right style={{flex: 1}}>
            <TouchableOpacity onPress={() => this.handleFinishAdd()}>
              <Icon name="check" style={styles.iconHeader} color={'orange'} />
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={{flex: 1}}>
          <View>
            <Text style={styles.textTitle}> Name </Text>
          </View>
          <View style={styles.view}>
            <Input
              style={styles.search}
              autoCapitalize="none"
              placeholder="Type your webtoon title"
            />
          </View>
        </View>
        <View style={{flex: 4, marginTop: 20, marginHorizontal: 20}}>
          <Text style={styles.textEpisode} paddingTop={20}>
            {' '}
            Add Images{' '}
          </Text>
          <FlatList
            // style={styles.flatList1}
            data={bannersAddEp}
            renderItem={({item}) => this.listFavoriteAll(item)}
            keyExtractor={item => item.title}
          />
        </View>
        <View style={{flex: 3.1, marginTop: 20, marginHorizontal: 20}}>
          <TouchableOpacity style={styles.buttonAdd}>
            <Text style={styles.buttonAddText}> + Image </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default CreateEps;

const styles = {
  header: {
    backgroundColor: 'white',
    height: 100,
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
    marginHorizontal: 20,
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
  delBut: {
    marginHorizontal: 10,
    width: 140,
    height: 45,
    marginBottom: 20,
    backgroundColor: 'red',
    borderColor: 'black',
    borderWidth: 2,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  favorite: {
    color: 'white',
    fontSize: 28,
  },
  buttonAdd: {
    borderColor: 'black',
    width: 580,
    height: 60,
    borderWidth: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    borderBottomWidth: 7,
    borderRightWidth: 7,
    borderRadius: 10,
  },
  buttonAddText: {
    fontSize: 40,
  },
  iconHeader: {
    fontSize: 45,
  },
  textTitle: {
    fontSize: 45,
    marginRight: 20,
  },
  textEpisode: {
    fontSize: 45,
    marginRight: -20,
  },
};
