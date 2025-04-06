import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
  Platform,
  Linking,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

const collectionCenters = [
  {
    id: 1,
    name: 'Green Earth Recycling Center',
    address: '123 Eco Street, Green City',
    distance: '2.5 km',
    openHours: '9:00 AM - 6:00 PM',
    types: ['Electronics', 'Batteries', 'Appliances'],
    coordinates: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 2,
    name: 'Eco Tech Collection Point',
    address: '456 Green Avenue, Eco Town',
    distance: '3.8 km',
    openHours: '8:00 AM - 7:00 PM',
    types: ['Electronics', 'Batteries'],
    coordinates: {
      latitude: 37.78925,
      longitude: -122.4334,
    },
  },
  // Add more centers as needed
];

const CollectionCentersScreen = () => {
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setIsLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Could not get your location');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const renderCenter = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.centerCard,
        selectedCenter?.id === item.id && styles.centerCardSelected,
      ]}
      onPress={() => setSelectedCenter(item)}
    >
      <Text style={styles.centerName}>{item.name}</Text>
      <Text style={styles.centerAddress}>{item.address}</Text>
      <View style={styles.centerDetails}>
        <Text style={styles.centerDetail}>Distance: {item.distance}</Text>
        <Text style={styles.centerDetail}>Hours: {item.openHours}</Text>
      </View>
      <View style={styles.typesContainer}>
        {item.types.map((type, index) => (
          <View key={index} style={styles.typeTag}>
            <Text style={styles.typeText}>{type}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Avatar.Image size={64} source={{ uri: user?.photoURL }} />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.replace('Centers')}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const initialRegion = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  } : {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
            pinColor="#4CAF50"
          />
        )}
        {collectionCenters.map((center) => (
          <Marker
            key={center.id}
            coordinate={center.coordinates}
            title={center.name}
            description={center.address}
            onPress={() => setSelectedCenter(center)}
          />
        ))}
      </MapView>

      <View style={styles.centersList}>
        <Text style={styles.sectionTitle}>Nearby Collection Centers</Text>
        <FlatList
          data={collectionCenters}
          renderItem={renderCenter}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {selectedCenter && (
        <TouchableOpacity
          style={styles.directionsButton}
          onPress={() => {
            const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
            const latLng = `${selectedCenter.coordinates.latitude},${selectedCenter.coordinates.longitude}`;
            const label = selectedCenter.name;
            const url = Platform.select({
              ios: `${scheme}${label}@${latLng}`,
              android: `${scheme}${latLng}(${label})`
            });
            Linking.openURL(url);
          }}
        >
          <Text style={styles.directionsButtonText}>Get Directions</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF5252',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  centersList: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  centerCard: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  centerCardSelected: {
    backgroundColor: '#E8F5E9',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  centerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  centerAddress: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  centerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  centerDetail: {
    fontSize: 14,
    color: '#666666',
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  typeTag: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  directionsButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  directionsButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CollectionCentersScreen; 