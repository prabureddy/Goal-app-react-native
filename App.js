import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, TouchableOpacity, Keyboard } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
// import { Button, ThemeProvider, Header } from 'react-native-elements';

export default function App() {

  const [enteredGoal, setEnteredGoal] = useState('');
  const [goals, allGoals] = useState([]);

  const inputGoalHandler = (text) => {
    setEnteredGoal(text);
    console.log("Entered Text : " + text);
  }

  const addGoal = () => {
    // allGoals([]);
    if (enteredGoal.length !== 0) {
      allGoals([...goals, { id: Math.random().toString(), value: enteredGoal }]);
      console.log("Added Goal : " + enteredGoal);
      console.log("All Goals : " + JSON.stringify(goals));
      setEnteredGoal('');
      Keyboard.dismiss();
    } else {
      console.log("Enter Valid Text");
    }
  }


  const removeGoalHandler = (goalId) => {
    allGoals(goals => {
      // if goal.id !== goalId is false it is deleted
      return goals.filter((goal) => goal.id !== goalId);
    });
    console.log("Deleted Item");
  }

  return (

    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.heading}>Enter Your Goal</Text>
        <TextInput style={styles.input} placeholder='Enter Goal Here' placeholderTextColor="black" onChangeText={inputGoalHandler} value={enteredGoal} />
        <Button onPress={addGoal} style={styles.add} title='Add' />
      </View>
      <View style={styles.displayContainer}>
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={goals}
          renderItem={itemData => (
            <TouchableOpacity onPress={removeGoalHandler.bind(this, itemData.item.id)}>
              <View style={styles.listItem}>
                <Text style={styles.goalText}>{itemData.item.value}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  inputContainer: {
    padding: 15,
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'lightblue'
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 5
  },
  input: {
    borderColor: 'lightgreen',
    elevation: 10,
    flexDirection: 'row',
    textAlign: 'center',
    color: 'black',
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  add: {

  },
  displayContainer: {
    flex: 3,
    borderColor: 'green',
    borderWidth: 3,
    width: '100%',
  },
  listItem: {
    padding: 10,
    margin: 10,
    backgroundColor: 'lightblue',
    borderColor: 'blue',
    borderWidth: 2,
  },
  goalText: {
    fontSize: 15,
    color: 'blue',
  },
});

