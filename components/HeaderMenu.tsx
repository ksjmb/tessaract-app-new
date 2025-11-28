import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  route?: string;
  destructive?: boolean;
}

interface HeaderMenuProps {
  customMenuItems?: MenuItem[];
  showLogout?: boolean;
}

export function HeaderMenu({ 
  customMenuItems = [], 
  showLogout = true 
}: HeaderMenuProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const { signOut, user } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleLogout = () => {
    setMenuVisible(false);
    
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
      ],
      { cancelable: true }
    );
  };

  const handleMenuItemPress = (item: MenuItem) => {
    setMenuVisible(false);
    
    if (item.route) {
      router.push(item.route as any);
    } else if (item.onPress) {
      item.onPress();
    }
  };

  const defaultMenuItems: MenuItem[] = [
    ...customMenuItems,
    ...(showLogout ? [
      {
        icon: 'log-out-outline' as keyof typeof Ionicons.glyphMap,
        label: 'Logout',
        onPress: handleLogout,
        destructive: true,
      },
    ] : []),
  ];

  return (
    <>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuVisible(true)}
      >
        <Ionicons 
          name="ellipsis-vertical" 
          size={24} 
          color={isDark ? '#fff' : '#000'} 
        />
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <ThemedView style={[
              styles.menu,
              { backgroundColor: isDark ? '#1c1c1e' : '#fff' }
            ]}>
              {defaultMenuItems.map((item, index) => (
                <React.Fragment key={index}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleMenuItemPress(item)}
                  >
                    <Ionicons
                      name={item.icon}
                      size={22}
                      color={item.destructive ? '#ff3b30' : isDark ? '#fff' : '#000'}
                      style={styles.menuIcon}
                    />
                    <ThemedText
                      style={[
                        styles.menuText,
                        item.destructive && styles.destructiveText,
                      ]}
                    >
                      {item.label}
                    </ThemedText>
                  </TouchableOpacity>
                  
                  {index < defaultMenuItems.length - 1 && (
                    <View style={[
                      styles.separator,
                      { backgroundColor: isDark ? '#38383a' : '#e5e5e5' }
                    ]} />
                  )}
                </React.Fragment>
              ))}
            </ThemedView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    padding: 8,
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    marginTop: 60,
    marginRight: 16,
  },
  menu: {
    borderRadius: 12,
    minWidth: 220,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    flex: 1,
  },
  destructiveText: {
    color: '#ff3b30',
  },
  separator: {
    height: 1,
    marginHorizontal: 16,
  },
});