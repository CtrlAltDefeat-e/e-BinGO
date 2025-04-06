import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const rewards = [
  {
    id: 1,
    title: 'Eco-Friendly Shopping Bag',
    points: 500,
    icon: 'shopping',
  },
  {
    id: 2,
    title: 'Reusable Water Bottle',
    points: 1000,
    icon: 'bottle-water',
  },
  {
    id: 3,
    title: 'Solar Charger',
    points: 2000,
    icon: 'solar-power',
  },
  {
    id: 4,
    title: 'Eco-Friendly Kit',
    points: 5000,
    icon: 'leaf',
  },
];

const transactions = [
  {
    id: 1,
    type: 'Earned',
    points: 100,
    description: 'Recycling old laptop',
    date: '2023-05-15',
  },
  {
    id: 2,
    type: 'Redeemed',
    points: -500,
    description: 'Eco-Friendly Shopping Bag',
    date: '2023-05-10',
  },
  {
    id: 3,
    type: 'Earned',
    points: 200,
    description: 'Donating smartphone',
    date: '2023-05-05',
  },
];

const RewardsScreen = () => {
  const navigation = useNavigation();
  const totalPoints = 1500;

  const renderReward = ({ item }) => (
    <TouchableOpacity
      style={styles.rewardCard}
      onPress={() => {
        Alert.alert('Redeem Reward', `Do you want to redeem ${item.title} for ${item.points} points?`);
      }}
    >
      <View style={styles.rewardImageContainer}>
        <MaterialCommunityIcons 
          name={item.icon} 
          size={50} 
          color="#4CAF50" 
        />
      </View>
      <View style={styles.rewardInfo}>
        <Text style={styles.rewardTitle}>{item.title}</Text>
        <Text style={styles.rewardPoints}>{item.points} points</Text>
      </View>
    </TouchableOpacity>
  );

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionType}>{item.type}</Text>
        <Text
          style={[
            styles.transactionPoints,
            item.type === 'Earned' ? styles.pointsEarned : styles.pointsRedeemed,
          ]}
        >
          {item.type === 'Earned' ? '+' : '-'}
          {Math.abs(item.points)} points
        </Text>
      </View>
      <Text style={styles.transactionDescription}>{item.description}</Text>
      <Text style={styles.transactionDate}>{item.date}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pointsCard}>
        <Text style={styles.pointsLabel}>Your Points</Text>
        <Text style={styles.pointsValue}>{totalPoints}</Text>
        <Text style={styles.pointsSubtitle}>Keep recycling to earn more points!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        <FlatList
          data={rewards}
          renderItem={renderReward}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rewardsList}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  pointsCard: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  pointsSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
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
  rewardsList: {
    paddingRight: 20,
  },
  rewardCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: 200,
  },
  rewardImageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardInfo: {
    alignItems: 'center',
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  rewardPoints: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  transactionItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  transactionPoints: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pointsEarned: {
    color: '#4CAF50',
  },
  pointsRedeemed: {
    color: '#FF5252',
  },
  transactionDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  transactionDate: {
    fontSize: 12,
    color: '#999999',
  },
});

export default RewardsScreen; 