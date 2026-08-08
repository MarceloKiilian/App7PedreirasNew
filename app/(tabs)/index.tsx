import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Calendar, MapPin, Leaf, Heart, Users, Sparkles, Music, FileText, Gamepad2, ArrowRight, BookOpen } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { db } from '../../constants/firebaseConfig';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';

export default function HomeScreen() {
  const router = useRouter();
  const [proximaGira, setProximaGira] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const hoje = new Date().toISOString().split('T')[0];
    const q = query(
      collection(db, "giras"),
      where("data", ">=", hoje),
      orderBy("data", "asc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        setProximaGira({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() });
      } else {
        setProximaGira(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const formatarData = (dataStr: string) => {
    if (!dataStr) return "";
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const MenuButton = ({ icon: Icon, label, route }: { icon: any, label: string, route: string }) => (
    <TouchableOpacity style={[styles.menuButton, { borderTopWidth: 4, borderTopColor: Colors.green }]} onPress={() => router.push(route)}>
      <View style={styles.menuIconContainer}>
        <Icon color={Colors.primary} size={28} />
      </View>
      <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {loading ? (
        <View style={styles.loadingCard}>
          <ActivityIndicator color={Colors.primary} />
          <Text style={styles.loadingText}>Carregando próxima gira...</Text>
        </View>
      ) : proximaGira ? (
        <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
          <Text style={styles.cardTitle}>Próxima Gira</Text>
          
          <View style={styles.infoRow}>
            <Calendar color={Colors.primary} size={24} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Data</Text>
              <Text style={styles.infoValue}>{formatarData(proximaGira.data)} às 18:00</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <MapPin color={Colors.primary} size={24} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Localização</Text>
              <Text style={styles.infoValue}>Sede do Terreiro</Text>
            </View>
          </View>

          <Text style={styles.description}>
            {proximaGira.descricao}
          </Text>
        </View>
      ) : (
        <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
          <Text style={styles.cardTitle}>Próxima Gira</Text>
          
          <View style={styles.infoRow}>
            <Calendar color={Colors.primary} size={24} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Data</Text>
              <Text style={styles.infoValue}>Em breve às 18:00</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <MapPin color={Colors.primary} size={24} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Localização</Text>
              <Text style={styles.infoValue}>Sede do Terreiro</Text>
            </View>
          </View>

          <Text style={styles.description}>
            Aguardando definição da próxima gira.
          </Text>
        </View>
      )}

      <TouchableOpacity 
        style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.accent }]} 
        onPress={() => router.push('/localizacao')}
      >
        <View style={styles.locationSummaryHeader}>
          <MapPin color={Colors.primary} size={32} />
          <Text style={styles.cardTitleNoMargin}>Localização</Text>
        </View>
        <Text style={styles.locationSummaryText}>
          Rua Altair, 8 - Vila Carrão. Clique para ver detalhes e contatos.
        </Text>
      </TouchableOpacity>

      <View style={styles.gridContainer}>
        <MenuButton icon={Users} label="Orixás" route="/orixas" />
        <MenuButton icon={Leaf} label="Ervas" route="/ervas" />
        <MenuButton icon={Sparkles} label="Banhos" route="/banhos" />
        <MenuButton icon={Sparkles} label="Sincretismo" route="/sincretismo" />
        <MenuButton icon={BookOpen} label="Nossa Linha" route="/linha-trabalho" />
        <MenuButton icon={Heart} label="Doações" route="/doacoes" />
        <MenuButton icon={FileText} label="Apostilas" route="/apostilas" />
        <MenuButton icon={Gamepad2} label="Jogos" route="/jogos" />
        <MenuButton icon={Music} label="Pontos Áudio" route="/musicas" />
        <MenuButton icon={BookOpen} label="Pontos Cantados" route="/pontos" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  cardTitleNoMargin: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginLeft: 15,
  },
  locationSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationSummaryText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoTextContainer: {
    marginLeft: 15,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
  },
  description: {
    fontSize: 18,
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 15,
    fontStyle: 'italic',
    paddingVertical: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuButton: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 1,
  },
  menuIconContainer: {
    backgroundColor: '#fef5e7',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textDark,
    textAlign: 'center',
  },
});
