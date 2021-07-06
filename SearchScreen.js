import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import db from '../config'


export default class Searchscreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      allTransactions: [],
      lastVisibleTransaction: null,
    }

  }
  componentDidMount = async ()=>{
    const query = await db.collection("transactions").limit(10).get()
    query.docs.map((doc)=>{
      this.setState({
        allTransactions: [],
        lastVisibleTransaction: doc
      })
    })
  }
  
  render() {
    <FlatList
    data={this.state.allTransactions}
    renderItem={({item})=>(
      <View style={{borderBottomWidth: 2}}>
        <Text>{"Book Id: " + item.bookId}</Text>
        <Text>{"Student id: " + item.studentId}</Text>
        <Text>{"Transaction Type: " + item.transactionType}</Text>
        <Text>{"Date: " + item.date.toDate()}</Text>
      </View>
    )}
    keyExtractor= {(item, index)=> index.toString()}
    onEndReached ={this.fetchMoreTransactions}
    onEndReachedThreshold={0.7}
  /> 
  </View>
);
}
}