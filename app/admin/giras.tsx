import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../constants/Colors";
import {
  Calendar,
  FileText,
  Plus,
  Trash2,
  ArrowLeft,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { db } from "../../constants/firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export default function GerenciarGiras() {
  const router = useRouter();
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [giras, setGiras] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "giras"), orderBy("data", "asc"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const docs: any[] = [];
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setGiras(docs);
        setErrorMessage(null);
        setFetching(false);
      },
      (error) => {
        console.warn("Erro ao carregar giras:", error);
        setErrorMessage(
          "Sem permissão para acessar as giras. Verifique as regras do Firestore.",
        );
        setFetching(false);
      },
    );
    return () => unsubscribe();
  }, []);

  const handleAddGira = async () => {
    if (!descricao || !data) {
      Alert.alert("Erro", "Preencha todos os campos para cadastrar a gira.");
      return;
    }

    // Validação simples de formato de data YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(data)) {
      Alert.alert("Erro", "Formato de data inválido. Use AAAA-MM-DD.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "giras"), {
        descricao,
        data,
        createdAt: new Date().toISOString(),
      });
      setDescricao("");
      setData("");
      Alert.alert("Sucesso", "Gira cadastrada com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a gira.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar Exclusão", "Deseja realmente remover esta gira?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "giras", id));
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir a gira.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft color={Colors.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gerenciar Giras</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={[
            styles.card,
            { borderTopWidth: 4, borderTopColor: Colors.green },
          ]}
        >
          <View style={styles.cardHeader}>
            <Calendar color={Colors.primary} size={24} />
            <Text style={styles.cardTitle}>Nova Gira</Text>
          </View>

          <Text style={styles.label}>Descrição da Gira</Text>
          <View style={styles.inputWrapper}>
            <FileText color="#999" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ex: Festa de Oxossi, Gira de Caboclo"
              value={descricao}
              onChangeText={setDescricao}
            />
          </View>

          <Text style={styles.label}>Data (AAAA-MM-DD)</Text>
          <View style={styles.inputWrapper}>
            <Calendar color="#999" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="2026-06-20"
              value={data}
              onChangeText={setData}
            />
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddGira}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Plus color={Colors.white} size={20} />
                <Text style={styles.addButtonText}>Cadastrar Gira</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Calendário de Giras</Text>

        {fetching ? (
          <ActivityIndicator
            color={Colors.primary}
            size="large"
            style={{ marginTop: 20 }}
          />
        ) : errorMessage ? (
          <Text style={styles.emptyText}>{errorMessage}</Text>
        ) : (
          giras.map((item) => (
            <View
              key={item.id}
              style={[
                styles.itemCard,
                { borderLeftWidth: 4, borderLeftColor: Colors.green },
              ]}
            >
              <View style={styles.itemInfo}>
                <Text style={styles.itemDesc}>{item.descricao}</Text>
                <View style={styles.dateRow}>
                  <Calendar color={Colors.primary} size={14} />
                  <Text style={styles.itemData}>
                    {item.data.split("-").reverse().join("/")}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={styles.deleteButton}
              >
                <Trash2 color="#ff4444" size={20} />
              </TouchableOpacity>
            </View>
          ))
        )}

        {!fetching && !errorMessage && giras.length === 0 && (
          <Text style={styles.emptyText}>
            Nenhuma gira cadastrada no momento.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginLeft: 10,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#eee",
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textDark,
  },
  addButton: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    borderRadius: 12,
    elevation: 2,
    marginTop: 10,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textDark,
    marginBottom: 15,
  },
  itemCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  itemDesc: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textDark,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  itemData: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  deleteButton: {
    padding: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
    fontStyle: "italic",
  },
});
