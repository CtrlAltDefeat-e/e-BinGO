import React, { useState } from 'react';
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

const timeSlots = [
  { id: 1, time: '9:00 AM - 11:00 AM', available: true },
  { id: 2, time: '11:00 AM - 1:00 PM', available: true },
  { id: 3, time: '1:00 PM - 3:00 PM', available: false },
  { id: 4, time: '3:00 PM - 5:00 PM', available: true },
  { id: 5, time: '5:00 PM - 7:00 PM', available: true },
];

const pickupStatus = {
  scheduled: 'Scheduled',
  inProgress: 'In Progress',
  completed: 'Completed',
};

const SchedulePickupScreen = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [pickupStatus, setPickupStatus] = useState('scheduled');
  const navigation = useNavigation();

  const renderTimeSlot = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.timeSlot,
        !item.available && styles.timeSlotUnavailable,
        selectedSlot?.id === item.id && styles.timeSlotSelected,
      ]}
      onPress={() => item.available && setSelectedSlot(item)}
      disabled={!item.available}
    >
      <Text
        style={[
          styles.timeSlotText,
          !item.available && styles.timeSlotTextUnavailable,
          selectedSlot?.id === item.id && styles.timeSlotTextSelected,
        ]}
      >
        {item.time}
      </Text>
      {!item.available && (
        <Text style={styles.slotUnavailableText}>Unavailable</Text>
      )}
    </TouchableOpacity>
  );

  const handleSchedule = () => {
    if (!selectedSlot) {
      Alert.alert('Error', 'Please select a time slot');
      return;
    }
    setPickupStatus('scheduled');
    Alert.alert('Success', 'Pickup scheduled successfully!');
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Pickup',
      'Are you sure you want to cancel this pickup?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            setSelectedSlot(null);
            Alert.alert('Success', 'Pickup cancelled successfully');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Pickup Time</Text>
        <FlatList
          data={timeSlots}
          renderItem={renderTimeSlot}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pickup Status</Text>
        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <View
              style={[
                styles.statusDot,
                pickupStatus === 'scheduled' && styles.statusDotActive,
              ]}
            />
            <Text style={styles.statusText}>Scheduled</Text>
          </View>
          <View style={styles.statusLine} />
          <View style={styles.statusItem}>
            <View
              style={[
                styles.statusDot,
                pickupStatus === 'inProgress' && styles.statusDotActive,
              ]}
            />
            <Text style={styles.statusText}>In Progress</Text>
          </View>
          <View style={styles.statusLine} />
          <View style={styles.statusItem}>
            <View
              style={[
                styles.statusDot,
                pickupStatus === 'completed' && styles.statusDotActive,
              ]}
            />
            <Text style={styles.statusText}>Completed</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.scheduleButton}
          onPress={handleSchedule}
        >
          <Text style={styles.scheduleButtonText}>Schedule Pickup</Text>
        </TouchableOpacity>

        {selectedSlot && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel Pickup</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  timeSlot: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  timeSlotUnavailable: {
    backgroundColor: '#EEEEEE',
  },
  timeSlotSelected: {
    backgroundColor: '#E8F5E9',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  timeSlotText: {
    fontSize: 16,
    color: '#333333',
  },
  timeSlotTextUnavailable: {
    color: '#999999',
  },
  timeSlotTextSelected: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  slotUnavailableText: {
    fontSize: 12,
    color: '#FF5252',
    marginTop: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  statusItem: {
    alignItems: 'center',
  },
  statusDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#CCCCCC',
    marginBottom: 5,
  },
  statusDotActive: {
    backgroundColor: '#4CAF50',
  },
  statusLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#CCCCCC',
    marginHorizontal: 10,
  },
  statusText: {
    fontSize: 14,
    color: '#666666',
  },
  scheduleButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  scheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FF5252',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SchedulePickupScreen; 