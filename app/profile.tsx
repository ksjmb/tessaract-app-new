import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(() => (user as any)?.name ?? '');
  const [email, setEmail] = useState<string>(() => (user as any)?.email ?? '');
  const [phone, setPhone] = useState<string>(() => (user as any)?.phone ?? '');
  const [bio, setBio] = useState<string>(() => (user as any)?.bio ?? '');

  const handleSave = () => {
    // Here you would typically call an API to update user profile
    Alert.alert('Success', 'Profile updated successfully!');
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            await signOut();
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profile',
          headerShown: true,
          headerBackTitle: "Back",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setIsEditing(!isEditing)}
              style={{ marginRight: 16 }}
            >
              <ThemedText style={{ color: '#007AFF', fontSize: 16 }}>
                {isEditing ? 'Cancel' : 'Edit'}
              </ThemedText>
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000' : '#f5f5f5' }]}>
        <ThemedView style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: isDark ? '#2c2c2e' : '#e5e5e5' }]}>
              <Ionicons name="person" size={60} color={isDark ? '#fff' : '#666'} />
            </View>
            {isEditing && (
              <TouchableOpacity style={styles.changePhotoButton}>
                <Ionicons name="camera" size={20} color="#007AFF" />
              </TouchableOpacity>
            )}
          </View>
          {!isEditing && (
            <ThemedText style={styles.userName}>{(user as any)?.name || 'User Name'}</ThemedText>
          )}
        </ThemedView>

        <ThemedView style={styles.section}>
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Name</ThemedText>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDark ? '#1c1c1e' : '#fff',
                  color: isDark ? '#fff' : '#000',
                  borderColor: isDark ? '#38383a' : '#e5e5e5',
                },
              ]}
              value={name}
              onChangeText={setName}
              editable={isEditing}
              placeholder="Enter your name"
              placeholderTextColor={isDark ? '#666' : '#999'}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDark ? '#1c1c1e' : '#fff',
                  color: isDark ? '#fff' : '#000',
                  borderColor: isDark ? '#38383a' : '#e5e5e5',
                },
              ]}
              value={email}
              onChangeText={setEmail}
              editable={isEditing}
              keyboardType="email-address"
              placeholder="Enter your email"
              placeholderTextColor={isDark ? '#666' : '#999'}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Phone</ThemedText>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDark ? '#1c1c1e' : '#fff',
                  color: isDark ? '#fff' : '#000',
                  borderColor: isDark ? '#38383a' : '#e5e5e5',
                },
              ]}
              value={phone}
              onChangeText={setPhone}
              editable={isEditing}
              keyboardType="phone-pad"
              placeholder="Enter your phone"
              placeholderTextColor={isDark ? '#666' : '#999'}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Bio</ThemedText>
            <TextInput
              style={[
                styles.input,
                styles.bioInput,
                {
                  backgroundColor: isDark ? '#1c1c1e' : '#fff',
                  color: isDark ? '#fff' : '#000',
                  borderColor: isDark ? '#38383a' : '#e5e5e5',
                },
              ]}
              value={bio}
              onChangeText={setBio}
              editable={isEditing}
              multiline
              numberOfLines={4}
              placeholder="Tell us about yourself"
              placeholderTextColor={isDark ? '#666' : '#999'}
            />
          </View>

          {isEditing && (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>

        <ThemedView style={styles.section}>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => Alert.alert('Info', 'Change password feature')}
          >
            <Ionicons name="key-outline" size={24} color={isDark ? '#fff' : '#000'} />
            <ThemedText style={styles.listItemText}>Change Password</ThemedText>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listItem}
            onPress={() => Alert.alert('Info', 'Privacy settings feature')}
          >
            <Ionicons name="shield-outline" size={24} color={isDark ? '#fff' : '#000'} />
            <ThemedText style={styles.listItemText}>Privacy</ThemedText>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#ff3b30" />
            <ThemedText style={[styles.listItemText, { color: '#ff3b30' }]}>
              Logout
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.7,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
});