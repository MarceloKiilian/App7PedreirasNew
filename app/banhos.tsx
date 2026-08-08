import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';
import { ERVAS_INFO } from '../constants/ErvasData';
import { Sparkles, Leaf, Info } from 'lucide-react-native';

export default function BanhosScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <View style={styles.headerRow}>
          <Sparkles color={Colors.primary} size={28} />
          <Text style={styles.cardTitle}>Fundamentos</Text>
        </View>
        <Text style={styles.text}>{ERVAS_INFO.uso_externo}</Text>
      </View>

      <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <View style={styles.headerRow}>
          <Leaf color={Colors.primary} size={28} />
          <Text style={styles.cardTitle}>Banhos Específicos</Text>
        </View>
        {ERVAS_INFO.banhos_especificos.map((banho, index) => (
          <View key={index} style={styles.banhoItem}>
            <Text style={styles.banhoNome}>{banho.nome}</Text>
            <Text style={styles.banhoErvas}>{banho.ervas}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <View style={styles.headerRow}>
          <Info color={Colors.primary} size={28} />
          <Text style={styles.cardTitle}>Dicas e Preparo</Text>
        </View>
        <Text style={styles.text}>
          • Banhos de ervas verdes: Devem ser maceradas na água e nunca fervidas.{"\n\n"}
          • Banhos de ervas secas: Misturar em água fria e levar ao fogo até ferver.{"\n\n"}
          • Obs: Sempre acenda uma vela ao lado para combinar as energias.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  banhoItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  banhoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  banhoErvas: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
  },
});
