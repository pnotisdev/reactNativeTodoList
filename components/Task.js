import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Task = (props) => {
  const [isHovered, setIsHovered] = useState(false);

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

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'personal':
        return 'person';
      case 'workSchool':
        return 'work';
      case 'home':
        return 'home';
      default:
        return 'circle';
    }
  };

  return (
    <View style={[styles.item, { borderColor: getPriorityColor(props.priority) }]}>
      <View
        style={styles.itemLeft}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Pressable onPress={props.onPress}>
          <View
            style={[
              styles.square,
              { backgroundColor: getPriorityColor(props.priority), opacity: isHovered ? 1 : 0.8 },
            ]}
          ></View>
        </Pressable>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      {isHovered && (
        <Text style={styles.tooltipText}>
          Click to delete
        </Text>
      )}
      <MaterialIcons name={getCategoryIcon(props.category)} size={24} color={getPriorityColor(props.priority)} />
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
    position: 'relative', // Required for positioning tooltip
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    borderRadius: 5,
    marginRight: 15,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
    }),
  },
  itemText: {
    maxWidth: '80%',
  },
  tooltipText: {
    position: 'absolute',
    top: 0,
    right: '100%',
    padding: 5,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 5,
    zIndex: 1,
  },
});

export default Task;