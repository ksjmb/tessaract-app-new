
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, TouchableOpacity, useColorScheme } from 'react-native';

export function HeaderMenuButton() {
  const { signOut } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handlePress = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      style={{ padding: 8, marginRight: 8 }}
    >
      <Ionicons 
        name="log-out-outline" 
        size={24} 
        color={isDark ? '#fff' : '#000'} 
      />
    </TouchableOpacity>
  );
}