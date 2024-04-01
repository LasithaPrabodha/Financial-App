import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  return (
    <View style={{padding: 16}}>
      <TextInput
        mode="outlined"
        label="Company"
        value={text}
        onChangeText={text => setText(text)}
      />
      <TextInput
        mode="outlined"
        label="Type"
        value={text}
        onChangeText={text => setText(text)}
      />
      <TextInput
        mode="outlined"
        label="Product"
        value={text}
        onChangeText={text => setText(text)}
      />
      <TextInput
        mode="outlined"
        label="Location"
        value={text}
        onChangeText={text => setText(text)}
      />
      <TextInput
        mode="outlined"
        label="Amount"
        keyboardType="number-pad"
        value={text}
        onChangeText={text => setText(text)}
      />
      <TextInput
        mode="outlined"
        label="Currency"
        value={text}
        onChangeText={text => setText(text)}
      />
      <Button
        style={{width: 200, marginTop: 16, marginLeft: 'auto'}}
        icon="save"
        mode="contained"
        onPress={() => console.log('Pressed')}>
        Save Transaction
      </Button>
    </View>
  );
};
