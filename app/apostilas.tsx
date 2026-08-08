import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Colors } from '../constants/Colors';
import { FileText, Download, ExternalLink } from 'lucide-react-native';

const APOSTILAS = [
  {
    titulo: "Apostila de Desenvolvimento",
    url: "https://marcelokiilian.github.io/setepedreiras/apostilas/ApostilaDesenvolvimento.pdf",
    descricao: "Conteúdo fundamental para médiuns iniciantes e em desenvolvimento."
  },
  {
    titulo: "Apostila de Ervas",
    url: "https://marcelokiilian.github.io/setepedreiras/apostilas/APOSTILA%20DE%20ERVAS.pdf",
    descricao: "Guia completo sobre o uso, coleta e fundamentos das ervas na Umbanda."
  },
  {
    titulo: "Apostila de Cambones",
    url: "https://marcelokiilian.github.io/setepedreiras/apostilas/ApostilaCambones.pdf",
    descricao: "Orientações e deveres para o trabalho de auxílio às entidades (Cambone)."
  }
];

export default function ApostilasScreen() {
  const openUrl = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerSubtitle}>
        Materiais de estudo exclusivos da Tupã Óca do Caboclo 7 Pedreiras.
      </Text>

      {APOSTILAS.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}
          onPress={() => openUrl(item.url)}
        >
          <View style={styles.iconContainer}>
            <FileText color={Colors.primary} size={32} />
          </View>
          <View style={styles.info}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.description}>{item.descricao}</Text>
            <View style={styles.linkRow}>
              <Text style={styles.linkText}>Abrir PDF</Text>
              <ExternalLink color={Colors.primary} size={16} style={{ marginLeft: 5 }} />
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.footerInfo}>
        <Text style={styles.footerText}>
          As apostilas são elaboradas pela nossa dirigente Viviane e são de uso livre para estudo.
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
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 22,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,
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
  iconContainer: {
    backgroundColor: '#fef5e7',
    padding: 12,
    borderRadius: 12,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#777',
    lineHeight: 20,
    marginBottom: 10,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  footerInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  footerText: {
    fontSize: 14,
    color: Colors.primary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
