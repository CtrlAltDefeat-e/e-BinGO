import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const items = [
  {
    id: 1,
    name: 'Old Laptop',
    date: '2023-05-15',
    status: 'Processing',
    currentStage: 'Sorting',
    stages: [
      { id: 1, name: 'Pickup', completed: true },
      { id: 2, name: 'Sorting', completed: true, current: true },
      { id: 3, name: 'Recycling', completed: false },
      { id: 4, name: 'Completed', completed: false },
    ],
  },
  {
    id: 2,
    name: 'Smartphone',
    date: '2023-05-10',
    status: 'Completed',
    currentStage: 'Completed',
    stages: [
      { id: 1, name: 'Pickup', completed: true },
      { id: 2, name: 'Sorting', completed: true },
      { id: 3, name: 'Recycling', completed: true },
      { id: 4, name: 'Completed', completed: true },
    ],
  },
];

const TrackStatusScreen = () => {
  const navigation = useNavigation();

  const renderStage = ({ item, index, stages }) => (
    <View style={styles.stageContainer}>
      <View
        style={[
          styles.stageDot,
          item.completed && styles.stageDotCompleted,
          item.current && styles.stageDotCurrent,
        ]}
      >
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text
        style={[
          styles.stageText,
          item.completed && styles.stageTextCompleted,
          item.current && styles.stageTextCurrent,
        ]}
      >
        {item.name}
      </Text>
      {index < stages.length - 1 && (
        <View
          style={[
            styles.stageLine,
            item.completed && styles.stageLineCompleted,
          ]}
        />
      )}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDate}>{item.date}</Text>
      </View>
      <Text style={styles.statusText}>
        Status: <Text style={styles.statusValue}>{item.status}</Text>
      </Text>
      <Text style={styles.currentStageText}>
        Current Stage: <Text style={styles.currentStageValue}>{item.currentStage}</Text>
      </Text>
      <View style={styles.stagesContainer}>
        <FlatList
          data={item.stages}
          renderItem={({ item: stage, index }) =>
            renderStage({ item: stage, index, stages: item.stages })
          }
          keyExtractor={(stage) => stage.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.stagesList}
        />
      </View>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => {
          // Navigate to detailed view
          navigation.navigate('ItemDetails', { item });
        }}
      >
        <Text style={styles.detailsButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Track Your Items</Text>
        <Text style={styles.subtitle}>Monitor the status of your e-waste items</Text>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.itemsList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  itemsList: {
    padding: 20,
  },
  itemCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  itemDate: {
    fontSize: 14,
    color: '#666666',
  },
  statusText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 5,
  },
  statusValue: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  currentStageText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 15,
  },
  currentStageValue: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  stagesContainer: {
    marginBottom: 15,
  },
  stagesList: {
    paddingRight: 20,
  },
  stageContainer: {
    alignItems: 'center',
    marginRight: 30,
  },
  stageDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  stageDotCompleted: {
    backgroundColor: '#4CAF50',
  },
  stageDotCurrent: {
    backgroundColor: '#2196F3',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stageText: {
    fontSize: 14,
    color: '#666666',
  },
  stageTextCompleted: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  stageTextCurrent: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  stageLine: {
    position: 'absolute',
    top: 15,
    left: 30,
    width: 30,
    height: 2,
    backgroundColor: '#CCCCCC',
  },
  stageLineCompleted: {
    backgroundColor: '#4CAF50',
  },
  detailsButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TrackStatusScreen; 