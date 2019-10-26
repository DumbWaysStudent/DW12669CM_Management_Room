/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, Image, Share} from 'react-native';
import {Button, Header, Left, Title, Right, Body} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import * as actionImg from './../redux/actions/actionWebtoons';
import {FlatList} from 'react-native-gesture-handler';
import {banners} from '../components/Banners';

const shareOptions = {
  title: 'Title',
  message: 'Message',
  url: 'www.youtube.com',
  subject: 'file',
};

export class DetailToonEps extends Component {
  componentDidMount() {
    setTimeout(async () => {
      const id = this.props.navigation.getParam('webtoonId');
      const idImg = this.props.navigation.getParam('id');
      await this.props.handleGetImg(id, idImg);
    }, 1000);
  }
  listAllEp(item) {
    return (
      <View>
        <View>
          <Image source={{uri: item.image}} style={styles.viewToon} />
        </View>
      </View>
    );
  }
  handleBack() {
    this.props.navigation.navigate('detailToon');
  }

  render() {
    const {img} = this.props.imgLocal;
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
                {this.props.navigation.getParam('webtoonName')}{' '}
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
        <FlatList
          // style={styles.flatList1}
          data={img}
          renderItem={({item}) => this.listAllEp(item)}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    imgLocal: state.img,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetImg: (id, idImg) => dispatch(actionImg.handleGetImg(id, idImg)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailToonEps);

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    height: 70,
  },
  viewToon: {
    marginTop: 2.5,
    marginBottom: 2.5,
    marginHorizontal: 20,
    width: null,
    height: 2480,
  },
});
