import React, { useState, useRef, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Animated, TouchableOpacity, Picker, SafeAreaView, Modal, TouchableWithoutFeedback, } from 'react-native';
import Task from './components/Task';
import { KeyboardAvoidingView } from 'react-native-web';

export default function App() {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('personal');
  const [taskItems, setTaskItems] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
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
    if (task.trim() === '') {
      // Do nothing if the task is empty or contains only whitespace
      return;
    }
  
    setTaskItems([...taskItems, { text: task, priority, category }]);
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
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.background, { backgroundColor }]}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setShowHelp(true)}>
            <Text style={styles.helpButton}>?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks, {formattedDate}</Text>
          <View style={styles.dropdownsContainer}>
          <Picker
            selectedValue={priority}
            style={styles.picker}
            onValueChange={(itemValue) => setPriority(itemValue)}
          >
            <Picker.Item label="High" value="high" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Low" value="low" />
          </Picker>
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Personal" value="personal" />
            <Picker.Item label="Work/School" value="workSchool" />
            <Picker.Item label="Home" value="home" />
          </Picker>
        </View>
          <View style={styles.items}>
            {taskItems.map((item, index) => (
              <Task key={index} text={item.text} priority={item.priority} category={item.category} onPress={() => completeTask(index)} />
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
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <Modal transparent={true} visible={showHelp} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setShowHelp(false)}>
            <View style={styles.modalOverlay}></View>
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Help</Text>
            <Text style={styles.modalText}>
              - Click on the square icon to delete a task.
              {'\n'}
              - Use the dropdowns to set task priority and category.
              {'\n'}
              - Press the "+" button to add a new task.
              {'\n'}
              - For task priority: High, Medium, Low.
              {'\n'}
              - For task categories: Personal, Work/School, Home.
            </Text>
            <TouchableOpacity onPress={() => setShowHelp(false)}>
              <Text style={styles.modalCloseButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
  },
  helpButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e3440',
  },
  picker: {
    width: 150,
    height: 40,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  tasksWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e3440',
    textAlign: 'center',
    paddingTop: 20,
  },
  dropdownsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  items: {
    marginTop: 20,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    marginRight: 10,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 24,
    color: '#000000',
    textAlign: 'center'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e3440',
  },
  modalText: {
    fontSize: 16,
    color: '#2e3440',
  },
  modalCloseButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a3be8c',
    marginTop: 10,
  },
  Text:{}
});
