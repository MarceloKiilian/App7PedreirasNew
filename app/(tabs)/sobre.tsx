import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Info } from 'lucide-react-native';

export default function SobreScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Banner/Header */}
      <View style={styles.headerCard}>
        <Text style={styles.title}>Tupã Óca do Caboclo 7 Pedreiras</Text>
      </View>

      {/* Nossa História */}
      <View style={[styles.section, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <View style={styles.sectionHeader}>
          <Info color={Colors.primary} size={22} />
          <Text style={styles.sectionTitle}>Sobre o App</Text>
        </View>
        <Text style={styles.text}>
          A ideia inicial do aplicativo era simples: oferecer ao médium um calendário de giras sempre à mão, de forma prática e acessível, sem a necessidade de consultar sites ou versões impressas. Com o tempo, porém, o aplicativo evoluiu e se transformou em muito mais do que uma ferramenta de consulta.
        </Text>
        <Text style={styles.text}>
          Hoje, o app se consolida como um verdadeiro ponto de apoio e estudo dentro da Umbanda. Além do calendário de giras, o usuário encontra uma rica coleção de pontos cantados, orações organizadas para o dia a dia espiritual, conteúdos sobre ervas e seus fundamentos, entre outros materiais essenciais para o desenvolvimento mediúnico.
        </Text>
        <Text style={styles.text}>
          Estamos em constante evolução, sempre buscando aprimorar a experiência e ampliar o conteúdo, com o objetivo de tornar o aplicativo uma referência confiável para todos que desejam estudar, praticar e se aprofundar cada vez mais na nossa querida Umbanda.
        </Text>
      </View>

      {/* Nossa Linha */}
      <View style={[styles.section, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <Text style={styles.sectionTitleSmall}>Nossa Linha de Trabalho</Text>
        <Text style={styles.text}>
          A Tupã Óca do Caboclo 7 Pedreiras é uma mistura de muitos ensinamentos, fundamentos, base e alicerce da Tenda São Luis Aldeia do Caboclo Ventania como a organização, disciplina limpeza e a presteza com os cuidados dos orixás da Tupã Óca do Caboclo Irajé.
        </Text>
        <Text style={styles.text}>
          Esta mistura logicamente teve que ter um tempero, e este tempero foi o amor! Que nossos dirigentes padrinho Junior e madrinha Viviane colocaram pra finalizar!
        </Text>
        <View style={styles.pillars}>
          {['Amor', 'Respeito', 'Disciplina', 'Organização', 'Conhecimento', 'Tradição', 'Ensinamentos'].map((item) => (
            <View key={item} style={styles.pillarTag}>
              <Text style={styles.pillarText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Saravá Umbanda!</Text>
        <Text style={styles.version}>Versão 2.0 - 2026</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    padding: 20,
  },
  headerCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginLeft: 10,
  },
  sectionTitleSmall: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 10,
    textAlign: 'justify',
  },
  pillars: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  pillarTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pillarText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    opacity: 0.8,
  },
  version: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});
