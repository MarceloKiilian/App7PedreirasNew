import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';
import { ERVAS_INFO } from '../constants/ErvasData';

export default function ErvasScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.title}>Ervas por Orixá</Text>
        {ERVAS_INFO.por_orixa.map((item, index) => (
          <View key={index} style={styles.banhoItem}>
            <Text style={styles.banhoNome}>{item.orixa}</Text>
            <Text style={styles.banhoErvas}>{item.ervas}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.title}>Fundamentos das Ervas</Text>
        <Text style={styles.text}>{ERVAS_INFO.usar_ervas}</Text>
      </View>

      <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.title}>Cuidados e Coleta</Text>
        <Text style={styles.text}>{ERVAS_INFO.cuidados}</Text>
      </View>

      <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.title}>Uso Externo (Banhos)</Text>
        <Text style={styles.text}>{ERVAS_INFO.uso_externo}</Text>
      </View>

      <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.title}>Banhos Específicos</Text>
        {ERVAS_INFO.banhos_especificos.map((banho, index) => (
          <View key={index} style={styles.banhoItem}>
            <Text style={styles.banhoNome}>{banho.nome}</Text>
            <Text style={styles.banhoErvas}>{banho.ervas}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.title}>Propriedades Medicinais</Text>
        <Text style={styles.text}>{ERVAS_INFO.propriedades}</Text>
      </View>

      <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.title}>Curiosidades</Text>
        <Text style={styles.text}>{ERVAS_INFO.curiosidades}</Text>
      </View>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    paddingLeft: 10,
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
