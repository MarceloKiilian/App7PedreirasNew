import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLayout() {
  const { isAdmin, canManageUsers, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAdmin}>
        <Stack.Screen name="login" />
      </Stack.Protected>
      <Stack.Protected guard={isAdmin}>
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="giras" />
      </Stack.Protected>
      <Stack.Protected guard={canManageUsers}>
        <Stack.Screen name="obrigacoes" />
        <Stack.Screen name="dirigentes" />
      </Stack.Protected>
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
});
