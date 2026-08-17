import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { ORIXAS } from '../../constants/OrixasData';

export function generateStaticParams() {
  return ORIXAS.map(({ id }) => ({ id }));
}

export default function OrixaDetailScreen() {
  const { id } = useLocalSearchParams();
  const orixa = ORIXAS.find(o => o.id === id);

  if (!orixa) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen 
        options={{ 
          title: orixa.nome,
        }} 
      />
      
      <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.sectionTitle}>História e Fundamentos</Text>
        <Text style={styles.text}>{orixa.descricao}</Text>
      </View>

      <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.sectionTitle}>Informações Gerais</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Dia da Semana</Text>
            <Text style={styles.infoValue}>{orixa.dia}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Cores</Text>
            <Text style={styles.infoValue}>{orixa.cores}</Text>
          </View>
        </View>
      </View>

      {orixa.reino && (
        <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
          <Text style={styles.sectionTitle}>Reino</Text>
          <Text style={styles.text}>{orixa.reino}</Text>
        </View>
      )}

      {orixa.comida && (
        <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
          <Text style={styles.sectionTitle}>Comidas</Text>
          <Text style={styles.text}>{orixa.comida}</Text>
        </View>
      )}

      {orixa.bebida && (
        <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
          <Text style={styles.sectionTitle}>Bebidas</Text>
          <Text style={styles.text}>{orixa.bebida}</Text>
        </View>
      )}

      {orixa.flores && (
        <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
          <Text style={styles.sectionTitle}>Flores</Text>
          <Text style={styles.text}>{orixa.flores}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingBottom: 5,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
  },
  infoItem: {
    width: '50%',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 16,
    color: Colors.textDark,
    fontWeight: '600',
  },
});
