import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/Colors';
import { ShieldCheck, Calendar, User, FileText, Plus, Trash2, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { db } from '../../constants/firebaseConfig';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function GerenciarObrigacoes() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [obrigacao, setObrigacao] = useState('');
  const [listaObrigacoes, setListaObrigacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "obrigacoes"), orderBy("data", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs: any[] = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setListaObrigacoes(docs);
      setFetching(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAddObrigacao = async () => {
    if (!nome || !data || !obrigacao) {
      Alert.alert("Erro", "Preencha todos os campos para cadastrar a obrigação.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "obrigacoes"), {
        nome,
        data,
        obrigacao,
        createdAt: new Date().toISOString()
      });
      setNome('');
      setData('');
      setObrigacao('');
      Alert.alert("Sucesso", "Obrigação cadastrada com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a obrigação.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Deseja realmente remover esta obrigação?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive", 
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "obrigacoes", id));
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={Colors.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gerenciar Obrigações</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, { borderTopWidth: 4, borderTopColor: Colors.gold }]}>
          <View style={styles.cardHeader}>
            <ShieldCheck color={Colors.primary} size={24} />
            <Text style={styles.cardTitle}>Nova Obrigação</Text>
          </View>

          <Text style={styles.label}>Nome do Médium</Text>
          <View style={styles.inputWrapper}>
            <User color="#999" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Digite o nome completo"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <Text style={styles.label}>Data da Obrigação</Text>
          <View style={styles.inputWrapper}>
            <Calendar color="#999" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA ou AAAA-MM-DD"
              value={data}
              onChangeText={setData}
            />
          </View>

          <Text style={styles.label}>Descrição da Obrigação</Text>
          <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
            <FileText color="#999" size={20} style={[styles.inputIcon, { marginTop: 12 }]} />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ex: Obrigação de 3 anos, Amaci, etc."
              value={obrigacao}
              onChangeText={setObrigacao}
              multiline
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddObrigacao} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : (
              <>
                <Plus color={Colors.white} size={20} />
                <Text style={styles.addButtonText}>Cadastrar Obrigação</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Próximas Obrigações</Text>
        
        {fetching ? (
          <ActivityIndicator color={Colors.primary} size="large" style={{ marginTop: 20 }} />
        ) : (
          listaObrigacoes.map((item) => (
            <View key={item.id} style={[styles.itemCard, { borderLeftWidth: 4, borderLeftColor: Colors.gold }]}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.nome}</Text>
                <Text style={styles.itemObrigacao}>{item.obrigacao}</Text>
                <View style={styles.dateRow}>
                  <Calendar color={Colors.primary} size={14} />
                  <Text style={styles.itemData}>
                    {item.data.includes('-') ? item.data.split('-').reverse().join('/') : item.data}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                <Trash2 color="#ff4444" size={20} />
              </TouchableOpacity>
            </View>
          ))
        )}

        {!fetching && listaObrigacoes.length === 0 && (
          <Text style={styles.emptyText}>Nenhuma obrigação cadastrada.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 5,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginLeft: 10,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
    height: 50,
  },
  textAreaWrapper: {
    height: 100,
    alignItems: 'flex-start',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textDark,
  },
  textArea: {
    height: '100%',
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    elevation: 2,
    marginTop: 10,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 15,
  },
  itemCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  itemObrigacao: {
    fontSize: 14,
    color: Colors.primary,
    marginTop: 2,
    fontWeight: '500',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  itemData: {
    fontSize: 13,
    color: '#888',
    marginLeft: 5,
  },
  deleteButton: {
    padding: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
