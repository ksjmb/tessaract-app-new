import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [notifications, setNotifications] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(isDark);

  const SettingItem = ({
    icon,
    title,
    subtitle,
    onPress,
    showChevron = true,
    rightElement,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showChevron?: boolean;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={[
        styles.settingItem,
        { borderBottomColor: isDark ? "#38383a" : "#e5e5e5" },
      ]}
      onPress={onPress}
      disabled={!onPress && !rightElement}
    >
      <View style={styles.settingLeft}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: isDark ? "#2c2c2e" : "#f0f0f0" },
          ]}
        >
          <Ionicons name={icon} size={24} color="#007AFF" />
        </View>
        <View style={styles.settingText}>
          <ThemedText style={styles.settingTitle}>{title}</ThemedText>
          {subtitle && (
            <ThemedText style={styles.settingSubtitle}>{subtitle}</ThemedText>
          )}
        </View>
      </View>
      {rightElement ||
        (showChevron && (
          <Ionicons
            name="chevron-forward"
            size={24}
            color={isDark ? "#666" : "#999"}
          />
        ))}
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Settings",
          headerShown: true,
          headerBackTitle: "Back",
        }}
      />

      <ScrollView
        style={[
          styles.container,
          { backgroundColor: isDark ? "#000" : "#f5f5f5" },
        ]}
      >
        {/* Account Section */}
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>ACCOUNT</ThemedText>
        </View>
        <ThemedView style={styles.section}>
          <SettingItem
            icon="person-outline"
            title="Profile Information"
            subtitle="Name, email, phone"
            onPress={() => Alert.alert("Info", "Navigate to profile")}
          />
          <SettingItem
            icon="key-outline"
            title="Change Password"
            subtitle="Update your password"
            onPress={() => Alert.alert("Info", "Change password screen")}
          />
          <SettingItem
            icon="shield-checkmark-outline"
            title="Privacy & Security"
            subtitle="Control your privacy"
            onPress={() => Alert.alert("Info", "Privacy settings")}
          />
        </ThemedView>

        {/* Notifications Section */}
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>NOTIFICATIONS</ThemedText>
        </View>
        <ThemedView style={styles.section}>
          <SettingItem
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="Receive push notifications"
            showChevron={false}
            rightElement={
              <Switch
                value={pushNotif}
                onValueChange={setPushNotif}
                trackColor={{ false: "#767577", true: "#007AFF" }}
              />
            }
          />
          <SettingItem
            icon="mail-outline"
            title="Email Notifications"
            subtitle="Receive email updates"
            showChevron={false}
            rightElement={
              <Switch
                value={emailNotif}
                onValueChange={setEmailNotif}
                trackColor={{ false: "#767577", true: "#007AFF" }}
              />
            }
          />
        </ThemedView>

        {/* Other Section */}
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>OTHER</ThemedText>
        </View>
        <ThemedView style={styles.section}>
          {/* <SettingItem
            icon="language-outline"
            title="Language"
            subtitle="English"
            onPress={() => Alert.alert('Info', 'Language selection')}
          /> */}
          <SettingItem
            icon="help-circle-outline"
            title="Help & Support"
            subtitle="Get help with the app"
            onPress={() => Alert.alert("Info", "Help center")}
          />
          <SettingItem
            icon="document-text-outline"
            title="Terms & Conditions"
            onPress={() => Alert.alert("Info", "Terms & Conditions")}
          />
          <SettingItem
            icon="information-circle-outline"
            title="About"
            subtitle="Version 1.0.0"
            onPress={() => Alert.alert("About", "App Version 1.0.0")}
          />
        </ThemedView>

        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>Version 1.0.0</ThemedText>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    opacity: 0.6,
  },
  section: {
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    opacity: 0.6,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 13,
    opacity: 0.5,
  },
});

/*
        // Appearance Section 
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>APPEARANCE</ThemedText>
        </View>
        <ThemedView style={styles.section}>
          <SettingItem
            icon="moon-outline"
            title="Dark Mode"
            subtitle="Enable dark theme"
            showChevron={false}
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#767577', true: '#007AFF' }}
              />
            }
          />
          <SettingItem
            icon="color-palette-outline"
            title="Theme"
            subtitle="Customize app appearance"
            onPress={() => Alert.alert('Info', 'Theme customization')}
          />
        </ThemedView>
*/
