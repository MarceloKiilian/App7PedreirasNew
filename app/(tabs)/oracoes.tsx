import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Colors } from '../../constants/Colors';
import { ORACOES, Oracao } from '../../constants/OracoesData';
import { Search, ChevronRight, X, BookOpen } from 'lucide-react-native';

export default function OracoesScreen() {
  const [search, setSearch] = useState('');
  const [selectedOracao, setSelectedOracao] = useState<Oracao | null>(null);

  const filteredOracoes = ORACOES.filter(
    oracao =>
      oracao.titulo.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: Oracao }) => (
    <TouchableOpacity style={[styles.item, { borderTopWidth: 4, borderTopColor: Colors.green }]} onPress={() => setSelectedOracao(item)}>
      <View style={styles.iconContainer}>
        <BookOpen color={Colors.primary} size={24} />
      </View>
      <View style={styles.info}>
        <Text style={styles.titulo}>{item.titulo}</Text>
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
          placeholder="Buscar oração..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredOracoes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Modal para ver a oração */}
      <Modal
        visible={!!selectedOracao}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedOracao(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedOracao?.titulo}</Text>
              <TouchableOpacity onPress={() => setSelectedOracao(null)}>
                <X color={Colors.primary} size={24} />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <FlatList
              data={[selectedOracao?.texto]}
              renderItem={({ item }) => <Text style={styles.textoOracao}>{item}</Text>}
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
  item: {
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
  iconContainer: {
    backgroundColor: '#fef5e7',
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textDark,
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
    maxHeight: '85%',
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
  divider: {
    height: 2,
    backgroundColor: Colors.primary,
    marginBottom: 20,
    opacity: 0.2,
  },
  textoOracao: {
    fontSize: 18,
    lineHeight: 28,
    color: '#333',
    textAlign: 'center',
    paddingBottom: 40,
    whiteSpace: 'pre-wrap',
  },
});
