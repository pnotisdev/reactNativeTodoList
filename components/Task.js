// Task.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ebcb8b';
      case 'medium':
        return '#a3be8c';
      case 'low':
        return '#98FB98'; // PaleGreen
      default:
        return '#b48ead';
    }
  };

  return (
    <View style={[styles.item, { borderColor: getPriorityColor(props.priority) }]}>
      <View style={styles.itemLeft}>
        <TouchableOpacity onPress={props.onPress}>
          <View style={[styles.square, { backgroundColor: getPriorityColor(props.priority) }]}></View>
        </TouchableOpacity>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    opacity: 0.8,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
});

export default Task;
