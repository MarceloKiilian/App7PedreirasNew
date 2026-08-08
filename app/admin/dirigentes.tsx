import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../constants/Colors";
import {
  UserPlus,
  Mail,
  Lock,
  Shield,
  ChevronDown,
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

const PERFIS = [
  { label: "Dirigente", value: "dirigente" },
  { label: "Administrador", value: "administrador" },
];

export default function CadastroAdministradores() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [perfil, setPerfil] = useState(PERFIS[0]);
  const [showPicker, setShowPicker] = useState(false);
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "administradores"), orderBy("email", "asc"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const docs: any[] = [];
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setAdmins(docs);
        setErrorMessage(null);
        setFetching(false);
      },
      (error) => {
        console.warn("Erro ao carregar administradores:", error);
        setErrorMessage(
          "Sem permissão para acessar os administradores. Verifique as regras do Firestore.",
        );
        setFetching(false);
      },
    );
    return () => unsubscribe();
  }, []);

  const handleAddAdmin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos corretamente.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "administradores"), {
        email: email.trim().toLowerCase(),
        perfil: perfil.label,
        createdAt: new Date().toISOString(),
      });
      setEmail("");
      setPassword("");
      Alert.alert("Sucesso", "Administrador registrado!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "Deseja remover este administrador?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: async () => await deleteDoc(doc(db, "administradores", id)),
      },
    ]);
  };

  const renderPerfilItem = ({ item }: { item: (typeof PERFIS)[0] }) => (
    <TouchableOpacity
      style={styles.pickerItem}
      onPress={() => {
        setPerfil(item);
        setShowPicker(false);
      }}
    >
      <Text
        style={[
          styles.pickerItemText,
          perfil.value === item.value && {
            color: Colors.primary,
            fontWeight: "bold",
          },
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft color={Colors.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gerenciar Administradores</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={[
            styles.card,
            { borderTopWidth: 4, borderTopColor: Colors.accent },
          ]}
        >
          <View style={styles.cardHeader}>
            <UserPlus color={Colors.primary} size={24} />
            <Text style={styles.cardTitle}>Novo Cadastro</Text>
          </View>

          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputWrapper}>
            <Mail color="#999" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="exemplo@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Senha Provisória</Text>
          <View style={styles.inputWrapper}>
            <Lock color="#999" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Text style={styles.label}>Perfil de Acesso</Text>
          <TouchableOpacity
            style={styles.pickerTrigger}
            onPress={() => setShowPicker(true)}
          >
            <Shield color="#999" size={20} style={styles.inputIcon} />
            <Text style={styles.pickerTriggerText}>{perfil.label}</Text>
            <ChevronDown color={Colors.primary} size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddAdmin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.addButtonText}>Cadastrar Administrador</Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Administradores Atuais</Text>
        {fetching ? (
          <ActivityIndicator color={Colors.primary} />
        ) : errorMessage ? (
          <Text style={styles.emptyText}>{errorMessage}</Text>
        ) : (
          admins.map((item) => (
            <View key={item.id} style={styles.adminItem}>
              <View style={styles.adminIcon}>
                <Shield color={Colors.primary} size={20} />
              </View>
              <View style={styles.adminInfo}>
                <Text style={styles.adminEmail}>{item.email}</Text>
                <Text style={styles.adminPerfil}>{item.perfil}</Text>
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
      </ScrollView>

      <Modal
        visible={showPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowPicker(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o Perfil</Text>
            <FlatList
              data={PERFIS}
              keyExtractor={(item) => item.value}
              renderItem={renderPerfilItem}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
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
  headerTitle: { color: Colors.white, fontSize: 18, fontWeight: "bold" },
  backButton: { padding: 5 },
  content: { padding: 20 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginLeft: 10,
  },
  label: { fontSize: 14, color: "#666", marginBottom: 8, fontWeight: "500" },
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
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: Colors.textDark },
  pickerTrigger: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#eee",
    height: 50,
  },
  pickerTriggerText: { flex: 1, fontSize: 16, color: Colors.textDark },
  addButton: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  addButtonText: { color: Colors.white, fontSize: 16, fontWeight: "bold" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textDark,
    marginBottom: 15,
  },
  adminItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  adminIcon: {
    backgroundColor: "#fef5e7",
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  adminInfo: { flex: 1 },
  adminEmail: { fontSize: 15, fontWeight: "600", color: Colors.textDark },
  adminPerfil: { fontSize: 13, color: Colors.primary, marginTop: 2 },
  deleteButton: { padding: 10 },
  emptyText: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    width: "100%",
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 15,
    textAlign: "center",
  },
  pickerItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  pickerItemText: { fontSize: 16, textAlign: "center", color: "#333" },
});
