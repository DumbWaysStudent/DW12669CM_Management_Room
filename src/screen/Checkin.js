/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {Button} from 'native-base';

import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

// console.log(webtoons);
class Checkin extends Component {
  listAll(item) {
    return (
      <View style={styles.allList}>
        <TouchableOpacity onPress={() => this.handleDetail(item)}>
          <Text style={styles.allToon}> {item.name} </Text>
        </TouchableOpacity>
      </View>
    );
  }

  handleDetail(item) {
    this.props.navigation.navigate('detailToon', {
      id: item.id,
      title: item.title,
      cover: item.cover,
      genre: item.genre,
      description: item.description,
      name: item.createdBy.name,
    });
  }

  render() {
    console.disableYellowBox = true;
    const {rooms} = this.props.roomsLocal;
    return (
      <View flex={1}>
        <View flex={9}>
          <FlatList
            style={styles.flatList}
            data={rooms}
            renderItem={({item}) => this.listAll(item)}
            keyExtractor={item => item.title}
          />
        </View>
        <View flex={1}>
          <TouchableOpacity style={styles.view}>
            <Icon name="plus" size={50} color={'white'} />
          </TouchableOpacity>
        </View>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkin);

const styles = StyleSheet.create({
  viewToon: {
    justifyContent: 'center',
  },
  allToon: {
    borderWidth: 3,
    borderColor: 'silver',
    marginRight: 10,
    marginVertical: 15,
    marginLeft: 10,
    borderRadius: 5,
    fontSize: 100,
    alignItems: 'center',
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
    marginVertical: 20,
    borderColor: 'silver',
    borderWidth: 3,
    borderRadius: 30,
  },
  flatList: {
    marginTop: 20,
  },
});
