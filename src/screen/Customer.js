/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

import {FlatList} from 'react-native-gesture-handler';

import {bannersFavorite} from '../components/Banners';

export class Customer extends Component {
  listFavoriteAll(item) {
    return (
      <View>
        <TouchableOpacity
          style={styles.row}
          onPress={() => this.handleDetail()}>
          <View style={styles.row}>
            <Image source={{uri: item.image}} style={styles.listToon} />
          </View>
          <View style={styles.listDetailToon}>
            <Text style={styles.title}>Nama: {item.name} </Text>
            <Text style={styles.title}>Identity Number:{item.identity_number}</Text>
            <Text style={styles.title}>Phone Number:{item.phone_number}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  handleDetail() {
    this.props.navigation.navigate('');
  }

  handleSearch(item) {
    const data = {bannersFavorite};
  }

  render() {
    const {cust} = this.props.custLocal;
    return (
      <View marginHorizontal={20} style={{flex: 1}}>
        <View style={{flex: 1.5, marginTop: 15}}>
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
            style={styles.flatList1}
            data={cust}
            renderItem={({item}) => this.listFavoriteAll(item)}
            keyExtractor={item => item.title}
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customer);

const styles = StyleSheet.create({
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
    borderRadius: 100,
  },
  listDetailToon: {
    marginRight: 30,
  },
  title: {
    fontSize: 25,
    marginRight: 30,
  },
  favorite: {
    fontSize: 20,
    marginBottom: 20,
    color: 'grey',
  },
  row: {
    flexDirection: 'row',
  },
});
