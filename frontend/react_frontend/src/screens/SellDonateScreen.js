import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SellDonateScreen = () => {
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please grant camera roll permissions to upload images.',
          [{ text: 'OK', onPress: () => ImagePicker.requestMediaLibraryPermissionsAsync() }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        if (images.length >= 3) {
          Alert.alert('Maximum Images', 'You can only upload up to 3 images.');
          return;
        }
        setImages([...images, result.assets[0].uri]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const validateForm = () => {
    if (images.length === 0) {
      Alert.alert('Error', 'Please add at least one image of your item.');
      return false;
    }
    if (!productName.trim()) {
      Alert.alert('Error', 'Please enter a product name.');
      return false;
    }
    if (!category.trim()) {
      Alert.alert('Error', 'Please select a category.');
      return false;
    }
    if (!condition.trim()) {
      Alert.alert('Error', 'Please specify the condition.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 20) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      Alert.alert(
        'Success',
        'Your e-waste item has been submitted for review.',
        [{ text: 'OK', onPress: () => {
          setImages([]);
          setProductName('');
          setCategory('');
          setCondition('');
          setDescription('');
          setEstimatedValue('');
          setUploadProgress(0);
        }}]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Avatar.Image size={64} source={{ uri: user?.photoURL }} />
        <Text style={styles.loadingText}>Uploading... {uploadProgress}%</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upload Product Images</Text>
        <View style={styles.imageContainer}>
          {images.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => removeImage(index)}
              >
                <MaterialCommunityIcons name="close-circle" size={24} color="#FF5252" />
              </TouchableOpacity>
            </View>
          ))}
          {images.length < 3 && (
            <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
              <MaterialCommunityIcons name="camera-plus" size={32} color="#666666" />
              <Text style={styles.addImageText}>Add Image</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Product Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={styles.input}
          placeholder="Condition"
          value={condition}
          onChangeText={setCondition}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Valuation</Text>
        <View style={styles.valuationCard}>
          <Text style={styles.valuationTitle}>Estimated Value</Text>
          <Text style={styles.valuationAmount}>₹{estimatedValue || '--'}</Text>
          <Text style={styles.valuationNote}>
            This is an AI-powered estimation based on product details and market trends
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity 
          style={[
            styles.submitButton,
            (!productName || !category || !condition) && styles.submitButtonDisabled
          ]} 
          onPress={handleSubmit}
          disabled={!productName || !category || !condition}
        >
          <Text style={styles.submitButtonText}>Submit for Review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  addImageButton: {
    width: 100,
    height: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText: {
    color: '#666666',
    fontSize: 14,
    marginTop: 5,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  valuationCard: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  valuationTitle: {
    fontSize: 18,
    color: '#4CAF50',
    marginBottom: 10,
  },
  valuationAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  valuationNote: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SellDonateScreen; 