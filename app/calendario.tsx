import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../constants/Colors";
import type { Gira } from "../types/Gira";
import {
  formatarData,
  formatarHorario,
  subscribeToPublishedGiras,
} from "../services/girasService";

export default function CalendarioScreen() {
  const [eventosFuturos, setEventosFuturos] = useState<Gira[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToPublishedGiras(
      (giras) => {
        setEventosFuturos(giras);
        setError(null);
        setLoading(false);
      },
      () => {
        setEventosFuturos([]);
        setError("Não foi possível carregar o calendário de giras.");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator color={Colors.primary} size="large" />
        <Text style={{ marginTop: 10, color: "#666" }}>
          Carregando calendário...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={eventosFuturos}
        keyExtractor={(item) => item.id ?? item.titulo}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
          <Text style={styles.headerTitle}>Agenda de Giras</Text>
        )}
        renderItem={({ item }) => (
          <View
            style={[
              styles.item,
              { borderTopWidth: 4, borderTopColor: Colors.green },
            ]}
          >
            <View style={styles.dateBadge}>
              <Text style={styles.dateText}>{formatarData(item.inicio)}</Text>
              <Text style={styles.timeText}>
                {formatarHorario(item.inicio)}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>{item.titulo}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            {error ?? "Nenhuma gira programada no momento."}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 25,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 3,
  },
  dateBadge: {
    backgroundColor: "#fef5e7",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 15,
    minWidth: 90,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fce4c4",
  },
  dateText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
  timeText: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 12,
    marginTop: 2,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    color: Colors.primary,
    fontWeight: "bold",
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    color: Colors.textDark,
    lineHeight: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
    fontSize: 16,
    fontStyle: "italic",
  },
});
