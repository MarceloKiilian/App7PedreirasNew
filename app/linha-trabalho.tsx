import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';
import { LINHA_TRABALHO } from '../constants/AppTexts';

export default function LinhaTrabalhoScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.section, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.title}>Nossa Linhagem</Text>
        <Text style={styles.text}>{LINHA_TRABALHO.nossa_linha}</Text>
      </View>

      <View style={[styles.section, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.title}>Giras de Umbanda</Text>
        <Text style={styles.text}>{LINHA_TRABALHO.giras_umbanda}</Text>
      </View>

      <View style={[styles.section, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.title}>Desenvolvimento e Cursos</Text>
        <Text style={styles.text}>{LINHA_TRABALHO.desenvolvimento}</Text>
      </View>

      <View style={[styles.section, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.title}>Giras de Cura</Text>
        <Text style={styles.text}>{LINHA_TRABALHO.giras_cura}</Text>
      </View>

      <View style={[styles.section, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.title}>Deitada de Oxalá</Text>
        <Text style={styles.text}>{LINHA_TRABALHO.deitada_oxala}</Text>
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
  section: {
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
});
