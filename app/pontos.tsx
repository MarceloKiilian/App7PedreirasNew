import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Colors } from '../constants/Colors';
import { PONTOS, Ponto } from '../constants/PontosData';
import { Search, ChevronRight, X } from 'lucide-react-native';

export default function PontosScreen() {
  const [search, setSearch] = useState('');
  const [selectedPonto, setSelectedPonto] = useState<Ponto | null>(null);

  const filteredPontos = PONTOS.filter(
    ponto =>
      ponto.titulo.toLowerCase().includes(search.toLowerCase()) ||
      ponto.categoria.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: Ponto }) => (
    <TouchableOpacity style={[styles.pontoItem, { borderTopWidth: 4, borderTopColor: Colors.green }]} onPress={() => setSelectedPonto(item)}>
      <View style={styles.pontoInfo}>
        <Text style={styles.pontoTitulo}>{item.titulo}</Text>
        <Text style={styles.pontoCategoria}>{item.categoria}</Text>
      </View>
      <ChevronRight color={Colors.primary} size={20} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, { borderBottomWidth: 4, borderBottomColor: Colors.green }]}>
        <Search color={Colors.primary} size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar ponto ou entidade..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredPontos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Modal para ver a letra do ponto */}
      <Modal
        visible={!!selectedPonto}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedPonto(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedPonto?.titulo}</Text>
              <TouchableOpacity onPress={() => setSelectedPonto(null)}>
                <X color={Colors.primary} size={24} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>{selectedPonto?.categoria}</Text>
            <View style={styles.divider} />
            <FlatList
              data={[selectedPonto?.letra]}
              renderItem={({ item }) => <Text style={styles.letraText}>{item}</Text>}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 50,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  pontoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 2,
  },
  pontoInfo: {
    flex: 1,
  },
  pontoTitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textDark,
  },
  pontoCategoria: {
    fontSize: 14,
    color: Colors.primary,
    marginTop: 4,
    fontWeight: '500',
  },
  separator: {
    height: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  divider: {
    height: 2,
    backgroundColor: Colors.primary,
    marginBottom: 20,
    opacity: 0.2,
  },
  letraText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingBottom: 40,
  },
});
