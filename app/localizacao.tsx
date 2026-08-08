import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Colors } from '../constants/Colors';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react-native';

export default function LocalizacaoScreen() {
  const openMaps = () => {
    const address = "Rua Altair, 8, Chácara Califórnia, São Paulo - SP";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  const makeCall = (number: string) => {
    Linking.openURL(`tel:${number.replace(/\D/g, '')}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <View style={styles.headerRow}>
          <MapPin color={Colors.primary} size={28} />
          <Text style={styles.cardTitle}>Endereço</Text>
        </View>
        <Text style={styles.addressText}>Rua Altair, nº 8</Text>
        <Text style={styles.subAddressText}>Chácara Califórnia - Vila Carrão - São Paulo/SP</Text>
        
        <TouchableOpacity style={styles.mapButton} onPress={openMaps}>
          <Text style={styles.mapButtonText}>Abrir no Google Maps</Text>
          <ExternalLink color={Colors.white} size={18} />
        </TouchableOpacity>
      </View>

      <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <View style={styles.headerRow}>
          <Clock color={Colors.primary} size={28} />
          <Text style={styles.cardTitle}>Atendimento</Text>
        </View>
        <Text style={styles.text}>
          Nosso atendimento acontece aos sábados a partir das 18:30h.
        </Text>
        <Text style={styles.note}>
          * Com exceções de algumas festas que acontecem no domingo a partir das 14:00h.
        </Text>
      </View>

      <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.green }]}>
        <View style={styles.headerRow}>
          <Phone color={Colors.primary} size={28} />
          <Text style={styles.cardTitle}>Contato</Text>
        </View>
        
        <TouchableOpacity style={styles.contactItem} onPress={() => makeCall("11972166578")}>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Viviane</Text>
            <Text style={styles.contactValue}>(11) 97216-6578</Text>
          </View>
          <Phone color={Colors.accent} size={20} />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.contactItem} onPress={() => makeCall("11983677422")}>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Cristiane</Text>
            <Text style={styles.contactValue}>(11) 98367-7422</Text>
          </View>
          <Phone color={Colors.accent} size={20} />
        </TouchableOpacity>
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
  addressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 5,
  },
  subAddressText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.textDark,
    lineHeight: 24,
  },
  note: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 10,
  },
  mapButton: {
    backgroundColor: Colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  mapButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: '#888',
    textTransform: 'uppercase',
  },
  contactValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 5,
  },
});
