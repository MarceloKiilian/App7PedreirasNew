import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#8b4513',
        },
        headerTintColor: '#ffffff',
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="admin" options={{ headerShown: false }} />
      <Stack.Screen 
        name="orixas/index" 
        options={{ 
          title: 'Orixás',
        }} 
      />
      <Stack.Screen 
        name="orixas/[id]" 
        options={{ 
          title: 'Orixá',
        }} 
      />
      <Stack.Screen 
        name="apostilas" 
        options={{ 
          title: 'Apostilas',
        }} 
      />
      <Stack.Screen 
        name="banhos" 
        options={{ 
          title: 'Banhos de Ervas',
        }} 
      />
      <Stack.Screen 
        name="calendario" 
        options={{ 
          title: 'Calendário',
        }} 
      />
      <Stack.Screen 
        name="doacoes" 
        options={{ 
          title: 'Doações',
        }} 
      />
      <Stack.Screen 
        name="ervas" 
        options={{ 
          title: 'Ervas',
        }} 
      />
      <Stack.Screen 
        name="jogos" 
        options={{ 
          title: 'Jogos',
        }} 
      />
      <Stack.Screen 
        name="linha-trabalho" 
        options={{ 
          title: 'Linha de Trabalho',
        }} 
      />
      <Stack.Screen 
        name="localizacao" 
        options={{ 
          title: 'Localização',
        }} 
      />
      <Stack.Screen 
        name="musicas" 
        options={{ 
          title: 'Músicas',
        }} 
      />
      <Stack.Screen 
        name="sincretismo" 
        options={{ 
          title: 'Sincretismo',
        }} 
      />
    </Stack>
  );
}
