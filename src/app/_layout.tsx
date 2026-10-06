import React from 'react';
import { Stack } from 'expo-router';
import '../global.css';
import { View, Text, Platform } from 'react-native';

class ErrorBoundary extends React.Component<any, { hasError: boolean, error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, height: Platform.OS === 'web' ? '100vh' : '100%', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'red', marginBottom: 10 }}>Runtime Error!</Text>
          <Text>{this.state.error?.message || 'Unknown error'}</Text>
          <Text style={{ marginTop: 20, color: 'gray' }}>{this.state.error?.stack}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function RootLayout() {
  return (
    <View style={{ flex: 1, height: Platform.OS === 'web' ? '100vh' : '100%', width: '100%' }}>
      <ErrorBoundary>
        <Stack screenOptions={{ headerShown: false }} />
      </ErrorBoundary>
    </View>
  );
}
