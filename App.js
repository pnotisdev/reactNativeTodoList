import React, { useState, useRef, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Animated, TouchableOpacity, Picker } from 'react-native';
import Task from './components/Task';
import { KeyboardAvoidingView } from 'react-native-web';

export default function App() {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium'); // Default priority is medium
  const [taskItems, setTaskItems] = useState([]);
  const animatedColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const colorAnimation = Animated.loop(
      Animated.timing(animatedColor, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: false,
      })
    );

    colorAnimation.start();

    return () => {
      colorAnimation.stop();
    };
  }, [animatedColor]);

  const handleAddTask = () => {
    setTaskItems([...taskItems, { text: task, priority }]);
    setTask('');
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  const backgroundColor = animatedColor.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: ['#a3be8c', '#b48ead', '#88c0d0', '#a3be8c'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks, {formattedDate}</Text>
        <View style={styles.items}>
          {taskItems.map((item, index) => (
            <Task key={index} text={item.text} priority={item.priority} onPress={() => completeTask(index)} />
          ))}
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={"What are today's tasks?"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <Picker
          selectedValue={priority}
          style={styles.picker}
          onValueChange={(itemValue) => setPriority(itemValue)}
        >
          <Picker.Item label="High" value="high" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Low" value="low" />
        </Picker>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop:30
  },
  writeTaskWrapper:{
    position: 'absolute',
    bottom:60,
    width:'100%',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input:{
    paddingVertical:15,
    width:300,
    paddingHorizontal:15,
    backgroundColor: '#fff',
    borderRadius:75,
    borderColor:'#C0C0C0',
    borderWidth:1
  },
  addWrapper:{
    width:60,
    height:60,
    backgroundColor:'#fff',
    borderRadius:75,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'#C0C0C0',
    borderWidth:1
  },
  addText:{},
});
