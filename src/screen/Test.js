/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {SafeAreaView, Text, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import * as actionTodos from '../redux/actions/actionTodos';
import {View} from 'native-base';

class ReduxTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      name: 'LorHan',
      description: 'nae yoshin',
    };
  }

  componentDidMount() {
    this.props.handleGetTodos();
  }

  handleAdd = () => {
    this.props.handleAddTodos({
      id: this.state.id + 1,
      name: this.state.name,
      description: this.state.description,
    });
  };
  handleUpdate = item => () => {
    this.props.handleUpdateTodos({
      id: item.id,
      name: 'LorNdut',
      description: 'still nae yoshin',
    });
  };
  handleDelete = item => {
    this.props.handleDeleteTodos(item);
  };

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.props.todosLocal.todos}
          renderItem={({item}) => (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <TouchableOpacity onPress={this.handleUpdate(item)}>
                <Text> {item.name}</Text>
                <Text> {item.description}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleDelete(item)}>
                <Text> Delete </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
          style={{
            padding: 20,
            borderBottomWidth: 1,
            borderColor: '#d1d8e0',
          }}
        />
        <Text onPress={this.handleAdd}> Add Todo </Text>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    todosLocal: state.todos,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetTodos: () => dispatch(actionTodos.handleGetTodos()),
    handleAddTodos: params => dispatch(actionTodos.handleAddTodos(params)),
    handleUpdateTodos: params =>
      dispatch(actionTodos.handleUpdateTodos(params)),
    handleDeleteTodos: params =>
      dispatch(actionTodos.handleDeleteTodos(params)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxTest);

// import React, { Component } from 'react'
// import { SafeAreaView, Text, FlatList, TouchableOpacity } from 'react-native'
// import { connect } from 'react-redux'
// import * as actionTodos from './../redux/actions/actionTodos'

// class Home extends Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       name: 'Muhammad Rio'
//     }
//   }

//   componentDidMount() {
//     this.props.handleGetTodos()
//   }

//   handleAdd = () => {
//     this.props.handleAddTodos(
//       {
//         id: 2,
//         name: this.state.name
//       }
//     )
//   }

//   handleUpdate = (item) => () => {
//     this.props.handleUpdateTodos({
//       id: item.id,
//       name: 'Rio Purba'
//     })
//   }

//   handleDelete = (item) => {
//     this.props.handleDeleteTodos(item)
//   }

//   render() {
//     return (
//       <SafeAreaView>
//         <FlatList
//           data={this.props.todosLocal.todos}
//           renderItem={({ item }) =>

//             <TouchableOpacity
//               style={{
//                 padding: 20,
//                 borderBottomWidth: 1,
//                 borderColor: '#d1d8e0',
//                 flexDirection: 'row',
//                 justifyContent: 'space-between'
//               }}
//               onPress={this.handleUpdate(item)}>

//               <Text> {item.name} </Text>
//               <Text onPress={() => this.handleDelete(item)}>DELETE</Text>
//             </TouchableOpacity>}
//           keyExtractor={item => item.id} />

//         <Text onPress={this.handleAdd}>ADD TODO</Text>

//       </SafeAreaView>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     todosLocal: state.todos
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     handleGetTodos: () => dispatch(actionTodos.handleGetTodos()),
//     handleAddTodos: (params) => dispatch(actionTodos.handleAddTodos(params)),
//     handleUpdateTodos: (params) => dispatch(actionTodos.handleUpdateTodos(params)),
//     handleDeleteTodos: (params) => dispatch(actionTodos.handleDeleteTodos(params)),

//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Home);
