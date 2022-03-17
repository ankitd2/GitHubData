import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


import Parser from "../Parser";

export default function HomeScreen() {
  /**
   * Displays the Profile screen of the App, which is the default Home Screen
   */
  return (
      /**
       * Top of the container will display the GitHub Logo stored in the assets folder
       * Uses Parser render() to display the information parsed in that class
       */
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
              style={{flex:1, height: 150, width: 500, resizeMode : 'contain', margin: -10}}
              source={require('../assets/images/githubIcon.png')}
          />
        </View>
        <View style = {styles.container}>
          <Parser />
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  }
});
