import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import RepositoriesData from "./RepositoriesData";
export default function RepositoriesScreen() {
  /**
   * Uses the data and render() in RepositoriesData.js to display the list of public repositories for a user
   */
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <RepositoriesData />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
});
