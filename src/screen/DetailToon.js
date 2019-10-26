/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Share,
  Dimensions,
} from 'react-native';
import {Button, Header, Left, Title, Right, Body} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as actionEps from './../redux/actions/actionWebtoons';
import {connect} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';

const shareOptions = {
  title: 'Title',
  message: 'Message',
  url: 'www.youtube.com',
  subject: 'file',
};
const {height, width} = Dimensions.get('window');
export class DetailToon extends Component {
  componentDidMount() {
    setTimeout(async () => {
      const id = this.props.navigation.getParam('id');
      await this.props.handleGetEps(id);
    }, 1000);
  }
  listAllEp(item) {
    const date = item.createdAt.substring(0, 10);
    date
      .split('-')
      .reverse()
      .join('/');
    return (
      <View style={styles.listEps}>
        <View>
          <TouchableOpacity onPress={() => this.handleDetail(item)}>
            <Image source={{uri: item.image}} style={styles.listToon} />
          </TouchableOpacity>
        </View>
        <View style={styles.listDetailToonToon}>
          <Text style={styles.titleNDate}> {item.title} </Text>
          <Text> {date} </Text>
        </View>
      </View>
    );
  }
  handleBack() {
    this.props.navigation.navigate('home');
  }
  handleDetail(item) {
    console.log(item.webToon.title);
    this.props.navigation.navigate('detailToonEps', {
      title: item.title,
      id: item.id,
      webtoonId: item.webToon.id,
      webtoonName: item.webToon.title,
    });
  }

  render() {
    const {eps} = this.props.epsLocal;
    return (
      <View style={{flex: 1}}>
        <View>
          <Header style={styles.header}>
            <Left>
              <Button transparent onPress={() => this.handleBack()}>
                <Icon name="arrow-left" size={40} />
              </Button>
            </Left>
            <Body>
              <Title style={{color: 'black', fontSize: 40, fontWeight: 'bold'}}>
                {this.props.navigation.getParam('title')}
              </Title>
            </Body>
            <Right>
              <Button transparent onPress={() => Share.share(shareOptions)}>
                <Icon name="share-alt-square" size={40} />
              </Button>
            </Right>
          </Header>
        </View>
        <Image
          name="image"
          source={{uri: this.props.navigation.getParam('cover')}}
          style={styles.toon}
        />
        <View style={styles.descripton}>
          <Text style={styles.descTitle}>
            {this.props.navigation.getParam('genre')}
          </Text>
          <Text style={styles.descSis}>
            {this.props.navigation.getParam('description')}
          </Text>
          <Text style={styles.descTitle}>
            Created By: {this.props.navigation.getParam('name')}
          </Text>
        </View>
        <View style={{flex: 5.75}}>
          <FlatList
            style={styles.flatList}
            data={eps}
            renderItem={({item}) => this.listAllEp(item)}
            keyExtractor={item => item.title}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    epsLocal: state.eps,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetEps: id => dispatch(actionEps.handleGetEps(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailToon);

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    height: 70,
  },
  viewToon: {
    marginHorizontal: 5,
    marginBottom: 5,
    borderColor: 'silver',
    borderBottomWidth: 7,
    borderRightWidth: 7,
    flex: 4.25,
  },
  toon: {
    marginTop: 15,
    alignSelf: 'center',
    width: width * 0.96,
    height: height * 0.3,
    borderColor: 'silver',
    borderWidth: 2,
    borderRadius: 20,
  },
  listToon: {
    height: 120,
    width: 90,
    borderWidth: 3,
    borderColor: 'silver',
    marginBottom: 5,
    marginRight: 10,
    marginLeft: 20,
    marginTop: 5,
    borderRadius: 3,
  },
  listDetailToon: {
    height: 100,
    width: 70,
    marginRight: 10,
    marginVertical: 30,
  },
  titleNDate: {
    fontSize: 25,
    marginBottom: 20,
    marginTop: 15,
  },
  descripton: {
    borderColor: 'silver',
    borderWidth: 3,
    borderRadius: 20,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  descTitle: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  descSis: {
    fontSize: 15,
    marginHorizontal: 5,
  },
  listEps: {
    flexDirection: 'row',
    marginHorizontal: 35,
  },
  flatList: {
    marginTop: 20,
  },
});
