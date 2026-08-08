import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';
import { DOACOES } from '../constants/AppTexts';
import { Heart } from 'lucide-react-native';

export default function DoacoesScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Heart color={Colors.primary} size={48} fill={Colors.primary} />
        <Text style={styles.title}>Caridade e Doações</Text>
      </View>

      <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.cardTitle}>Doações para o Asilo</Text>
        <Text style={styles.sectionSubtitle}>Itens Necessários:</Text>
        <Text style={styles.listText}>{DOACOES.lista_asilo}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.infoText}>{DOACOES.dados_asilo}</Text>
      </View>

      <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.cardTitle}>Doações para o Sopão</Text>
        <Text style={styles.text}>
          Nossa casa também realiza a entrega de sopas para pessoas em situação de rua. 
          Sua ajuda com legumes, descartáveis ou voluntariado é muito bem-vinda.
        </Text>
        <Text style={styles.footerNote}>
          Procure a secretaria do terreiro aos sábados para mais informações.
        </Text>
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
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 10,
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
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  listText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  text: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  footerNote: {
    marginTop: 15,
    fontSize: 14,
    color: Colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
