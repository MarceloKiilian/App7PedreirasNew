import React, { useEffect, useState } from "react";
import {
  ActivityIndicator, Alert, FlatList, Modal, ScrollView, StyleSheet, Switch,
  Text, TextInput, TouchableOpacity, View,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, ChevronDown, Lock, Mail, Shield, Trash2, UserPlus } from "lucide-react-native";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../contexts/AuthContext";
import { createAdministrador, deleteAdministrador, subscribeToAdministradores, updateAdministrador } from "../../services/administradoresService";
import type { Administrador, PerfilAdministrador } from "../../types/Administrador";

const PERFIS: { label: string; value: PerfilAdministrador }[] = [
  { label: "Dirigente", value: "dirigente" },
  { label: "Administrador", value: "administrador" },
];

const getCreateErrorMessage = (error: unknown): string => {
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
  if (code.includes("email-already-in-use")) return "J\u00e1 existe uma conta cadastrada com este e-mail.";
  if (code.includes("email-already-exists")) return "J\u00e1 existe uma conta cadastrada com este e-mail.";
  if (code.includes("already-exists")) return "J\u00e1 existe uma conta cadastrada com este e-mail.";
  if (code.includes("invalid-email")) return "Informe um endere\u00e7o de e-mail v\u00e1lido.";
  if (code.includes("invalid-password")) return "A senha provis\u00f3ria deve ter pelo menos 6 caracteres.";
  if (code.includes("invalid-argument")) return "Confira o e-mail, a senha e o perfil informados.";
  if (code.includes("permission-denied")) return "Seu perfil n\u00e3o possui permiss\u00e3o para gerenciar usu\u00e1rios.";
  return "N\u00e3o foi poss\u00edvel criar o usu\u00e1rio.";
};

export default function CadastroAdministradores() {
  const router = useRouter();
  const { user, canManageUsers } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [perfil, setPerfil] = useState<PerfilAdministrador>("dirigente");
  const [showPicker, setShowPicker] = useState(false);
  const [admins, setAdmins] = useState<Administrador[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingUid, setUpdatingUid] = useState<string | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => subscribeToAdministradores(
    (items) => { setAdmins(items); setFetching(false); },
    () => { setFetching(false); Alert.alert("Erro", "N\u00e3o foi poss\u00edvel carregar os usu\u00e1rios."); },
  ), []);

  const handleAddAdmin = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || password.length < 6) {
      Alert.alert("Dados inv\u00e1lidos", "Informe um e-mail v\u00e1lido e uma senha provis\u00f3ria com pelo menos 6 caracteres.");
      return;
    }
    setLoading(true);
    try {
      await createAdministrador({ email: normalizedEmail, password, perfil });
      setEmail(""); setPassword(""); setPerfil("dirigente");
      Alert.alert("Sucesso", "Usu\u00e1rio salvo com sucesso.");
    } catch (error) { Alert.alert("Erro", getCreateErrorMessage(error)); }
    finally { setLoading(false); }
  };

  const handleUpdate = async (admin: Administrador, changes: Partial<Pick<Administrador, "perfil" | "ativo">>) => {
    if (admin.id === user?.uid && changes.ativo === false) {
      Alert.alert("Opera\u00e7\u00e3o bloqueada", "Voc\u00ea n\u00e3o pode desativar a pr\u00f3pria conta."); return;
    }
    setUpdatingUid(admin.id);
    try {
      await updateAdministrador({ uid: admin.id, perfil: changes.perfil ?? admin.perfil, ativo: changes.ativo ?? admin.ativo });
    } catch { Alert.alert("Erro", "N\u00e3o foi poss\u00edvel atualizar este usu\u00e1rio."); }
    finally { setUpdatingUid(null); }
  };

  const handleDelete = (admin: Administrador) => {
    if (admin.id === user?.uid) {
      Alert.alert("Opera\u00e7\u00e3o bloqueada", "Voc\u00ea n\u00e3o pode excluir a pr\u00f3pria conta."); return;
    }
    Alert.alert("Remover acesso", `Deseja remover o acesso administrativo de ${admin.email}? A conta continuar\u00e1 no Authentication durante os testes.`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Remover", style: "destructive", onPress: async () => {
        setUpdatingUid(admin.id);
        try { await deleteAdministrador(admin.id); }
        catch { Alert.alert("Erro", "N\u00e3o foi poss\u00edvel remover o acesso do usu\u00e1rio."); }
        finally { setUpdatingUid(null); }
      } },
    ]);
  };

  if (!canManageUsers) {
    return <View style={styles.centered}>
      <Text style={styles.permissionText}>{"Somente dirigentes podem gerenciar usu\u00e1rios."}</Text>
      <TouchableOpacity onPress={() => router.back()} style={styles.addButton}><Text style={styles.addButtonText}>Voltar</Text></TouchableOpacity>
    </View>;
  }

  return <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}><ArrowLeft color={Colors.white} size={24} /></TouchableOpacity>
      <Text style={styles.headerTitle}>{"Gerenciar Usu\u00e1rios"}</Text><View style={{ width: 24 }} />
    </View>
    <ScrollView contentContainerStyle={styles.content}>
      <View style={[styles.card, styles.cardAccent]}>
        <View style={styles.cardHeader}><UserPlus color={Colors.primary} size={24} /><Text style={styles.cardTitle}>Novo Cadastro</Text></View>
        <Text style={styles.label}>E-mail</Text>
        <View style={styles.inputWrapper}><Mail color="#999" size={20} style={styles.inputIcon} /><TextInput style={styles.input} placeholder="exemplo@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} editable={!loading} /></View>
        <Text style={styles.label}>{"Senha provis\u00f3ria"}</Text>
        <View style={styles.inputWrapper}><Lock color="#999" size={20} style={styles.inputIcon} /><TextInput style={styles.input} placeholder={"M\u00ednimo 6 caracteres"} value={password} onChangeText={setPassword} secureTextEntry editable={!loading} /></View>
        <Text style={styles.label}>Perfil de acesso</Text>
        <TouchableOpacity style={styles.pickerTrigger} onPress={() => setShowPicker(true)} disabled={loading}>
          <Shield color="#999" size={20} style={styles.inputIcon} /><Text style={styles.pickerTriggerText}>{PERFIS.find((item) => item.value === perfil)?.label}</Text><ChevronDown color={Colors.primary} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.addButton, loading && styles.disabledButton]} onPress={handleAddAdmin} disabled={loading}>
          {loading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.addButtonText}>{"Cadastrar usu\u00e1rio"}</Text>}
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>{"Usu\u00e1rios atuais"}</Text>
      {fetching ? <ActivityIndicator color={Colors.primary} /> : admins.length === 0 ? <Text style={styles.emptyText}>{"Nenhum usu\u00e1rio cadastrado."}</Text> : admins.map((admin) => {
        const isUpdating = updatingUid === admin.id;
        return <View key={admin.id} style={styles.adminItem}>
          <View style={styles.adminIcon}><Shield color={Colors.primary} size={20} /></View>
          <View style={styles.adminInfo}>
            <Text style={styles.adminEmail}>{admin.email}</Text>
            <View style={styles.adminControls}>
              <TouchableOpacity disabled={isUpdating || admin.id === user?.uid} onPress={() => handleUpdate(admin, { perfil: admin.perfil === "administrador" ? "dirigente" : "administrador" })}>
                <Text style={styles.adminPerfil}>{admin.perfil === "administrador" ? "Administrador" : "Dirigente"}</Text>
              </TouchableOpacity>
              <Switch value={admin.ativo} onValueChange={(ativo) => handleUpdate(admin, { ativo })} disabled={isUpdating || admin.id === user?.uid} trackColor={{ false: "#d9d9d9", true: Colors.green }} />
            </View>
          </View>
          {isUpdating ? <ActivityIndicator color={Colors.primary} /> : <TouchableOpacity onPress={() => handleDelete(admin)} style={styles.deleteButton} disabled={admin.id === user?.uid}><Trash2 color={admin.id === user?.uid ? "#bbb" : "#ff4444"} size={20} /></TouchableOpacity>}
        </View>;
      })}
    </ScrollView>
    <Modal visible={showPicker} transparent animationType="fade" onRequestClose={() => setShowPicker(false)}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowPicker(false)}><View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Selecione o perfil</Text>
        <FlatList data={PERFIS} keyExtractor={(item) => item.value} renderItem={({ item }) => <TouchableOpacity style={styles.pickerItem} onPress={() => { setPerfil(item.value); setShowPicker(false); }}><Text style={[styles.pickerItemText, perfil === item.value && styles.selectedPickerItem]}>{item.label}</Text></TouchableOpacity>} />
      </View></TouchableOpacity>
    </Modal>
  </View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" }, centered: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }, permissionText: { color: Colors.textDark, marginBottom: 20, textAlign: "center" },
  header: { backgroundColor: Colors.primary, paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }, headerTitle: { color: Colors.white, fontSize: 18, fontWeight: "bold" }, backButton: { padding: 5 }, content: { padding: 20, paddingBottom: 40 },
  card: { backgroundColor: Colors.white, borderRadius: 15, padding: 20, marginBottom: 30, elevation: 3, borderWidth: 1, borderColor: Colors.border }, cardAccent: { borderTopWidth: 4, borderTopColor: Colors.accent }, cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 20 }, cardTitle: { fontSize: 18, fontWeight: "bold", color: Colors.primary, marginLeft: 10 },
  label: { fontSize: 14, color: "#666", marginBottom: 8, fontWeight: "500" }, inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: "#f5f5f5", borderRadius: 10, paddingHorizontal: 12, marginBottom: 20, borderWidth: 1, borderColor: "#eee", height: 50 }, inputIcon: { marginRight: 10 }, input: { flex: 1, fontSize: 16, color: Colors.textDark },
  pickerTrigger: { flexDirection: "row", alignItems: "center", backgroundColor: "#f5f5f5", borderRadius: 10, paddingHorizontal: 12, marginBottom: 25, borderWidth: 1, borderColor: "#eee", height: 50 }, pickerTriggerText: { flex: 1, fontSize: 16, color: Colors.textDark }, addButton: { backgroundColor: Colors.primary, padding: 18, borderRadius: 12, alignItems: "center", elevation: 2 }, disabledButton: { opacity: 0.7 }, addButtonText: { color: Colors.white, fontSize: 16, fontWeight: "bold" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: Colors.textDark, marginBottom: 15 }, adminItem: { backgroundColor: Colors.white, borderRadius: 12, padding: 15, marginBottom: 10, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: Colors.border }, adminIcon: { backgroundColor: "#fef5e7", padding: 10, borderRadius: 10, marginRight: 15 }, adminInfo: { flex: 1 }, adminEmail: { fontSize: 15, fontWeight: "600", color: Colors.textDark }, adminControls: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 4 }, adminPerfil: { fontSize: 13, color: Colors.primary, textDecorationLine: "underline" }, deleteButton: { padding: 10, marginLeft: 6 }, emptyText: { textAlign: "center", color: "#999", marginTop: 20 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 40 }, modalContent: { backgroundColor: Colors.white, borderRadius: 20, width: "100%", padding: 20, elevation: 10 }, modalTitle: { fontSize: 18, fontWeight: "bold", color: Colors.primary, marginBottom: 15, textAlign: "center" }, pickerItem: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "#eee" }, pickerItemText: { fontSize: 16, textAlign: "center", color: "#333" }, selectedPickerItem: { color: Colors.primary, fontWeight: "bold" },
});
