import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { ORIXAS, Orixa } from '../../constants/OrixasData';
import { ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function OrixasScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.description}>
        Conheça a história, fundamentos e rituais dos nossos Orixás.
      </Text>

      {ORIXAS.map((orixa) => (
        <TouchableOpacity 
          key={orixa.id} 
          style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}
          onPress={() => router.push(`/orixas/${orixa.id}`)}
        >
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{orixa.nome}</Text>
            <Text style={styles.cardSubtitle}>Dia: {orixa.dia}</Text>
          </View>
          <ChevronRight color={Colors.primary} size={24} />
        </TouchableOpacity>
      ))}
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
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
});
