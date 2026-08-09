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
  Switch,
} from "react-native";
import { Colors } from "../../constants/Colors";
import {
  Calendar,
  FileText,
  Plus,
  Trash2,
  ArrowLeft,
  MapPin,
  Pencil,
  CheckCircle2,
  XCircle,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { auth } from "../../constants/firebaseConfig";
import type { Gira, GiraStatus } from "../../types/Gira";
import {
  createGira,
  formatarData,
  formatarHorario,
  getGiraStatusLabel,
  subscribeToGirasForAdmin,
  toggleGiraPublicacao,
  updateGira,
  updateGiraStatus,
} from "../../services/girasService";

export default function GerenciarGiras() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [local, setLocal] = useState("");
  const [publicada, setPublicada] = useState(false);
  const [giras, setGiras] = useState<Gira[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToGirasForAdmin(
      (docs) => {
        setGiras(docs);
        setFetching(false);
      },
      () => {
        setFetching(false);
        Alert.alert("Erro", "Não foi possível carregar as giras no momento.");
      },
    );

    return () => unsubscribe();
  }, []);

  const resetForm = () => {
    setTitulo("");
    setDescricao("");
    setData("");
    setHorario("");
    setLocal("");
    setPublicada(false);
    setEditingId(null);
  };

  const parseGiraDate = (): Date | null => {
    if (!data || !horario) {
      return null;
    }

    const dateMatch = /^\d{4}-\d{2}-\d{2}$/.test(data);
    const timeMatch = /^\d{2}:\d{2}$/.test(horario);

    if (!dateMatch || !timeMatch) {
      return null;
    }

    const [ano, mes, dia] = data.split("-").map(Number);
    const [hora, minuto] = horario.split(":").map(Number);

    const parsedDate = new Date(ano, mes - 1, dia, hora, minuto);

    if (Number.isNaN(parsedDate.getTime())) {
      return null;
    }

    return parsedDate;
  };

  const handleSaveGira = async () => {
    if (
      !titulo.trim() ||
      !descricao.trim() ||
      !data ||
      !horario ||
      !local.trim()
    ) {
      Alert.alert(
        "Erro",
        "Preencha título, descrição, data, horário e local para salvar a gira.",
      );
      return;
    }

    const inicio = parseGiraDate();
    if (!inicio) {
      Alert.alert(
        "Erro",
        "Informe uma data e horário válidos. Use o formato AAAA-MM-DD e HH:MM.",
      );
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert(
        "Erro",
        "Você precisa estar autenticado para cadastrar ou editar giras.",
      );
      return;
    }

    setLoading(true);

    try {
      if (editingId) {
        await updateGira(editingId, {
          titulo: titulo.trim(),
          descricao: descricao.trim(),
          inicio,
          local: local.trim(),
          publicada,
        });
        Alert.alert("Sucesso", "Gira atualizada com sucesso.");
      } else {
        await createGira({
          titulo: titulo.trim(),
          descricao: descricao.trim(),
          inicio,
          local: local.trim(),
          publicada,
          status: "agendada",
          createdBy: user.uid,
        });
        Alert.alert("Sucesso", "Gira cadastrada com sucesso.");
      }

      resetForm();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a gira.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Gira) => {
    setEditingId(item.id ?? null);
    setTitulo(item.titulo);
    setDescricao(item.descricao);
    setData(formatarData(item.inicio).split("/").reverse().join("-"));
    setHorario(formatarHorario(item.inicio));
    setLocal(item.local);
    setPublicada(item.publicada);
  };

  const handleCancelStatus = async (item: Gira) => {
    if (!item.id) {
      return;
    }

    try {
      await updateGiraStatus(item.id, "cancelada");
      Alert.alert("Sucesso", "Gira cancelada com sucesso.");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cancelar a gira.");
    }
  };

  const handleTogglePublicacao = async (item: Gira) => {
    if (!item.id) {
      return;
    }

    try {
      await toggleGiraPublicacao(item.id, !item.publicada);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível alterar a publicação da gira.");
    }
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
            <Text style={styles.cardTitle}>
              {editingId ? "Editar Gira" : "Nova Gira"}
            </Text>
          </View>

          <Text style={styles.label}>Título</Text>
          <View style={styles.inputWrapper}>
            <FileText color="#999" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ex: Gira de Caboclo"
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>

          <Text style={styles.label}>Descrição</Text>
          <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
            <FileText color="#999" size={20} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, styles.textAreaInput]}
              placeholder="Descreva a gira, presença, atendimento ou especialidade."
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={4}
            />
          </View>

          <Text style={styles.label}>Data (AAAA-MM-DD)</Text>
          <View style={styles.inputWrapper}>
            <Calendar color="#999" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="2026-08-15"
              value={data}
              onChangeText={setData}
            />
          </View>

          <Text style={styles.label}>Horário (HH:MM)</Text>
          <View style={styles.inputWrapper}>
            <Calendar color="#999" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="18:00"
              value={horario}
              onChangeText={setHorario}
            />
          </View>

          <Text style={styles.label}>Local</Text>
          <View style={styles.inputWrapper}>
            <MapPin color="#999" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ex: Sede do Terreiro"
              value={local}
              onChangeText={setLocal}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.label}>Publicada</Text>
            <Switch
              value={publicada}
              onValueChange={setPublicada}
              trackColor={{ false: "#d9d9d9", true: Colors.green }}
            />
          </View>

          <View style={styles.formActions}>
            {editingId && (
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={resetForm}
              >
                <Text style={styles.secondaryButtonText}>Cancelar Edição</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleSaveGira}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  {editingId ? (
                    <Pencil color={Colors.white} size={20} />
                  ) : (
                    <Plus color={Colors.white} size={20} />
                  )}
                  <Text style={styles.addButtonText}>
                    {editingId ? "Salvar Alterações" : "Cadastrar Gira"}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Calendário de Giras</Text>

        {fetching ? (
          <ActivityIndicator
            color={Colors.primary}
            size="large"
            style={{ marginTop: 20 }}
          />
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
                <Text style={styles.itemTitle}>{item.titulo}</Text>
                <Text style={styles.itemMeta}>
                  {formatarData(item.inicio)} • {formatarHorario(item.inicio)}
                </Text>
                <Text style={styles.itemMeta}>{item.local}</Text>
                <Text style={styles.itemMeta}>
                  Status: {getGiraStatusLabel(item.status)}
                </Text>
                <Text style={styles.itemMeta}>
                  Publicada: {item.publicada ? "Sim" : "Não"}
                </Text>
              </View>

              <View style={styles.itemActions}>
                <TouchableOpacity
                  onPress={() => handleEdit(item)}
                  style={styles.actionButton}
                >
                  <Pencil color={Colors.primary} size={18} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleCancelStatus(item)}
                  style={styles.actionButton}
                >
                  <XCircle color="#b00020" size={18} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleTogglePublicacao(item)}
                  style={styles.actionButton}
                >
                  <CheckCircle2
                    color={item.publicada ? Colors.accent : "#999"}
                    size={18}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Manter histórico",
                      "A gira foi mantida no histórico e não removida permanentemente.",
                    )
                  }
                  style={styles.actionButton}
                >
                  <Trash2 color="#999" size={18} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {!fetching && giras.length === 0 && (
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
    minHeight: 50,
  },
  textAreaWrapper: {
    alignItems: "flex-start",
    minHeight: 110,
  },
  inputIcon: {
    marginRight: 10,
    marginTop: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textDark,
    paddingVertical: 12,
  },
  textAreaInput: {
    minHeight: 92,
    textAlignVertical: "top",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  formActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  addButton: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 12,
    elevation: 2,
    flex: 1,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: Colors.textDark,
    fontWeight: "600",
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
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textDark,
    marginBottom: 6,
  },
  itemMeta: {
    fontSize: 12,
    color: "#666",
    marginBottom: 3,
  },
  itemActions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    gap: 6,
  },
  actionButton: {
    padding: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 30,
    fontSize: 16,
    fontStyle: "italic",
  },
});
