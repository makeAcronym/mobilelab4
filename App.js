// Họ tên: Ngô Võ Quang Minh
// MSSV: 21521129
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AuthProvider } from './screens/AuthContext.js';
import AppNavigator from './AppNavigator.js';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator/>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
