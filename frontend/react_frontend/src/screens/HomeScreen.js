import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const categories = [
  {
    id: 1,
    title: 'Home Appliances',
    icon: 'washing-machine',
  },
  {
    id: 2,
    title: 'Electronics',
    icon: 'laptop',
  },
  {
    id: 3,
    title: 'Batteries',
    icon: 'battery',
  },
  {
    id: 4,
    title: 'Entertainment',
    icon: 'television',
  },
];

const actions = [
  {
    id: 1,
    title: 'Sell/Donate',
    icon: 'hand-coin',
    screen: 'SellDonate',
  },
  {
    id: 2,
    title: 'Schedule Pickup',
    icon: 'truck-delivery',
    screen: 'SchedulePickup',
  },
  {
    id: 3,
    title: 'Collection Centers',
    icon: 'map-marker-radius',
    screen: 'CollectionCenters',
  },
  {
    id: 4,
    title: 'Track Status',
    icon: 'map-marker-path',
    screen: 'TrackStatus',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <MaterialCommunityIcons 
        name={item.icon} 
        size={40} 
        color="#4CAF50" 
      />
      <Text style={styles.categoryName}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderQuickAction = ({ item }) => (
    <TouchableOpacity
      style={styles.quickActionItem}
      onPress={() => navigation.navigate(item.screen)}
    >
      <MaterialCommunityIcons 
        name={item.icon} 
        size={30} 
        color="#4CAF50" 
      />
      <Text style={styles.quickActionTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hello, User!</Text>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>500 Points</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {actions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionItem}
              onPress={() => navigation.navigate(action.screen)}
            >
              <MaterialCommunityIcons 
                name={action.icon} 
                size={30} 
                color="#4CAF50" 
              />
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          <Text style={styles.activityText}>No recent activity</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  pointsContainer: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pointsText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  categoriesList: {
    paddingRight: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#666666',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  activityText: {
    fontSize: 16,
    color: '#666666',
  },
});

export default HomeScreen; 